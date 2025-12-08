# Althion Lab - Deploy na Azure

Este guia descreve como fazer o deploy completo do projeto Althion Lab na Azure.

## Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        Azure Cloud                               │
│                                                                  │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │   App Service    │    │   App Service    │                   │
│  │   (Frontend)     │────│   (Backend)      │                   │
│  │   Next.js        │    │   Medusa.js      │                   │
│  │   Port 3000      │    │   Port 9000      │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           │                       │                              │
│           │    ┌──────────────────┴──────────────────┐          │
│           │    │                                     │          │
│           │    ▼                                     ▼          │
│           │  ┌──────────────────┐  ┌──────────────────┐         │
│           │  │   PostgreSQL     │  │   Redis Cache    │         │
│           │  │   Flexible       │  │                  │         │
│           │  │   Server         │  │                  │         │
│           │  └──────────────────┘  └──────────────────┘         │
│           │                                                      │
│           │  ┌──────────────────┐                               │
│           └──│   Container      │                               │
│              │   Registry       │                               │
│              │   (ACR)          │                               │
│              └──────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ CDN (Sanity)
                              ▼
                    ┌──────────────────┐
                    │   Sanity CMS     │
                    │   (External)     │
                    └──────────────────┘
```

## Recursos Azure Provisionados

| Recurso | Tipo | Propósito |
|---------|------|-----------|
| Container Registry | ACR | Armazenar imagens Docker |
| PostgreSQL Flexible Server | Database | Banco de dados do Medusa |
| Redis Cache | Cache | Cache e filas do Medusa |
| App Service Plan | Compute | Hospedagem dos containers |
| App Service (Backend) | Web App | API Medusa.js |
| App Service (Frontend) | Web App | Next.js SSR |

## Pré-requisitos

1. **Azure CLI** instalado e configurado
2. **GitHub** repository com acesso para criar secrets
3. **Azure Subscription** ativa
4. Conta no **Sanity.io** (já configurada)

## Configuração Passo a Passo

### 1. Criar Service Principal no Azure

```bash
# Login no Azure
az login

# Criar Service Principal para GitHub Actions
az ad sp create-for-rbac \
  --name "althion-github-actions" \
  --role contributor \
  --scopes /subscriptions/{subscription-id} \
  --sdk-auth
```

O output será algo como:
```json
{
  "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  ...
}
```

### 2. Configurar Secrets no GitHub

Vá em **Settings > Secrets and variables > Actions** e adicione:

| Secret | Descrição |
|--------|-----------|
| `AZURE_CREDENTIALS` | JSON completo do Service Principal |
| `POSTGRES_ADMIN_PASSWORD` | Senha forte para PostgreSQL |
| `JWT_SECRET` | Secret para JWT do Medusa |
| `COOKIE_SECRET` | Secret para cookies do Medusa |
| `SANITY_PROJECT_ID` | `towmhciw` |
| `SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | Token de API do Sanity |

### 3. Deploy da Infraestrutura

Execute o workflow de infraestrutura manualmente:

```bash
# Ou via GitHub Actions UI:
# Actions > Deploy Infrastructure > Run workflow
```

Isso criará todos os recursos na Azure:
- Resource Group: `althion-prod-rg`
- Container Registry
- PostgreSQL
- Redis
- App Services

### 4. Deploy Inicial Manual (Primeira vez)

Na primeira vez, você precisa fazer o push das imagens Docker manualmente:

```bash
# Login no ACR
az acr login --name <acr-name>

# Build e push do Backend
cd backend
docker build -t <acr-name>.azurecr.io/althion-backend:latest .
docker push <acr-name>.azurecr.io/althion-backend:latest

# Build e push do Frontend
cd ..
docker build -t <acr-name>.azurecr.io/althion-frontend:latest .
docker push <acr-name>.azurecr.io/althion-frontend:latest
```

### 5. Executar Migrations

Após o primeiro deploy do backend:

```bash
# Conectar ao container do backend
az webapp log tail --name althion-prod-backend --resource-group althion-prod-rg

# Ou executar migrations manualmente
az webapp ssh --name althion-prod-backend --resource-group althion-prod-rg
npm run migrate
```

### 6. Seed do Banco de Dados

```bash
# Via SSH no container
npm run seed
```

## CI/CD Automático

Após a configuração inicial, os deploys são automáticos:

- **Push para `main`** em arquivos do frontend → Deploy automático do frontend
- **Push para `main`** em arquivos do backend → Deploy automático do backend

## URLs de Produção

Após o deploy, os aplicativos estarão disponíveis em:

- **Frontend**: `https://althion-prod-frontend.azurewebsites.net`
- **Backend**: `https://althion-prod-backend.azurewebsites.net`
- **Admin Medusa**: `https://althion-prod-backend.azurewebsites.net/admin`

## Variáveis de Ambiente

### Frontend (App Service)

| Variável | Valor |
|----------|-------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `towmhciw` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | (do Key Vault) |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | `https://althion-prod-backend.azurewebsites.net` |

### Backend (App Service)

| Variável | Valor |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `9000` |
| `DATABASE_URL` | `postgres://...` (automático) |
| `REDIS_URL` | `rediss://...` (automático) |
| `JWT_SECRET` | (do Key Vault) |
| `COOKIE_SECRET` | (do Key Vault) |
| `STORE_CORS` | URL do frontend |
| `ADMIN_CORS` | URL do frontend |

## Custos Estimados (Mensal)

| Recurso | SKU | Custo Estimado |
|---------|-----|----------------|
| App Service Plan | B1 (Dev) / P1v3 (Prod) | $13-$100 |
| PostgreSQL | B1ms (Dev) / B2s (Prod) | $15-$30 |
| Redis | Basic C0 (Dev) / Standard C1 (Prod) | $16-$80 |
| Container Registry | Basic / Standard | $5-$20 |
| **Total (Dev)** | | ~$50/mês |
| **Total (Prod)** | | ~$200/mês |

## Monitoramento

### Application Insights

Para adicionar monitoramento, você pode habilitar Application Insights:

```bash
az monitor app-insights component create \
  --app althion-insights \
  --location brazilsouth \
  --resource-group althion-prod-rg
```

### Logs

```bash
# Ver logs do frontend
az webapp log tail --name althion-prod-frontend --resource-group althion-prod-rg

# Ver logs do backend
az webapp log tail --name althion-prod-backend --resource-group althion-prod-rg
```

## Troubleshooting

### Container não inicia

1. Verifique os logs: `az webapp log tail --name <app-name> --resource-group althion-prod-rg`
2. Verifique se a imagem existe no ACR
3. Verifique as credenciais do ACR no App Service

### Erro de conexão com PostgreSQL

1. Verifique se o firewall permite conexões do Azure
2. Verifique a string de conexão
3. Verifique se o SSL está configurado (`?sslmode=require`)

### Erro de conexão com Redis

1. Verifique se está usando `rediss://` (com SSL)
2. Verifique a porta 6380 (SSL)
3. Verifique a chave de acesso

## Comandos Úteis

```bash
# Listar recursos
az resource list --resource-group althion-prod-rg --output table

# Reiniciar App Service
az webapp restart --name althion-prod-backend --resource-group althion-prod-rg

# Ver configurações do App Service
az webapp config show --name althion-prod-backend --resource-group althion-prod-rg

# Escalar App Service
az appservice plan update --name althion-prod-plan --resource-group althion-prod-rg --sku P1v3
```

## Domínio Personalizado

Para configurar um domínio personalizado:

```bash
# Adicionar domínio personalizado
az webapp config hostname add \
  --webapp-name althion-prod-frontend \
  --resource-group althion-prod-rg \
  --hostname www.althionlab.com.br

# Configurar SSL (managed certificate)
az webapp config ssl create \
  --name althion-prod-frontend \
  --resource-group althion-prod-rg \
  --hostname www.althionlab.com.br
```

## Backup

O PostgreSQL Flexible Server tem backup automático por 7 dias. Para backups adicionais:

```bash
# Exportar banco de dados
az postgres flexible-server db export \
  --resource-group althion-prod-rg \
  --server-name althion-prod-postgres-xxx \
  --database-name medusa_db \
  --format=PostgreSQL
```
