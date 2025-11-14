# 🐳 Deploy do Backend com Docker

Este guia explica como fazer o deploy do backend Medusa usando Docker e Docker Compose.

## 📋 Pré-requisitos

- Docker instalado (versão 20.10+)
- Docker Compose instalado (versão 2.0+)
- Porta 9000 disponível (ou configure PORT no .env)

## 🚀 Deploy Local com Docker Compose

### 1. Criar arquivo `.env` (se não existir)

```bash
cd backend
cp .env.example .env  # ou crie manualmente
```

Configure as variáveis necessárias:

```env
# Database
DATABASE_URL=postgres://medusa_user:medusa_password@postgres:5432/medusa_db

# Secrets (gere valores seguros para produção)
JWT_SECRET=your-jwt-secret-here
COOKIE_SECRET=your-cookie-secret-here

# CORS
STORE_CORS=http://localhost:3000,https://seu-dominio.vercel.app
ADMIN_CORS=http://localhost:7001,https://seu-dominio.vercel.app

# Redis
REDIS_URL=redis://redis:6379

# Server
PORT=9000
NODE_ENV=production
```

### 2. Build e iniciar todos os serviços

```bash
cd backend
docker-compose up -d --build
```

Isso irá:
- Construir a imagem do backend
- Iniciar PostgreSQL
- Iniciar Redis
- Iniciar o backend Medusa

### 3. Executar migrações do banco de dados

```bash
docker-compose exec backend npx medusa migrations run
```

### 4. Popular com dados iniciais (opcional)

```bash
docker-compose exec backend npm run seed
```

Isso criará:
- Regiões
- Produtos de exemplo
- Usuário admin (email: `admin@althion.com`, senha: `admin123`)

### 5. Verificar se está rodando

```bash
# Ver logs
docker-compose logs -f backend

# Ver status dos containers
docker-compose ps
```

O backend estará disponível em:
- **Admin Dashboard:** http://localhost:9000/app
- **Store API:** http://localhost:9000/store
- **Admin API:** http://localhost:9000/admin

## 🛑 Parar os serviços

```bash
docker-compose down
```

Para remover volumes também (⚠️ apaga dados do banco):

```bash
docker-compose down -v
```

## 🔄 Comandos úteis

### Ver logs

```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Últimas 100 linhas
docker-compose logs --tail=100 backend
```

### Reiniciar um serviço

```bash
docker-compose restart backend
```

### Rebuild e reiniciar

```bash
docker-compose up -d --build backend
```

### Executar comandos dentro do container

```bash
# Shell interativo
docker-compose exec backend sh

# Executar migrações
docker-compose exec backend npx medusa migrations run

# Executar seed
docker-compose exec backend npm run seed
```

### Limpar tudo e começar do zero

```bash
# Parar e remover containers, redes e volumes
docker-compose down -v

# Remover imagens também
docker-compose down -v --rmi all

# Reconstruir tudo
docker-compose up -d --build
```

## 🚢 Deploy no Railway

O Railway suporta Docker Compose nativamente.

### 1. Instalar Railway CLI

```bash
npm i -g @railway/cli
```

### 2. Login

```bash
railway login
```

### 3. Criar novo projeto

```bash
railway init
```

### 4. Configurar variáveis de ambiente

No dashboard do Railway ou via CLI:

```bash
railway variables set JWT_SECRET=your-secret
railway variables set COOKIE_SECRET=your-secret
railway variables set STORE_CORS=https://seu-dominio.vercel.app
railway variables set ADMIN_CORS=https://admin.althion.com
```

### 5. Deploy

```bash
railway up
```

O Railway detectará automaticamente o `docker-compose.yml` e fará o deploy de todos os serviços.

**Nota:** O Railway pode precisar de configurações adicionais no `docker-compose.yml` para serviços separados. Considere criar um `railway.json` ou usar o Railway PostgreSQL/Redis gerenciado ao invés dos containers Docker.

### Opção alternativa: Deploy apenas do backend no Railway

Se preferir usar PostgreSQL e Redis gerenciados pelo Railway:

1. Crie um serviço PostgreSQL no Railway
2. Crie um serviço Redis no Railway
3. Configure as variáveis:
   - `DATABASE_URL` (fornecido pelo Railway)
   - `REDIS_URL` (fornecido pelo Railway)
4. Deploy apenas do backend:

```bash
railway up --service backend
```

## 📝 Variáveis de ambiente para produção

⚠️ **IMPORTANTE:** Gere valores seguros para produção:

```bash
# Gerar JWT_SECRET (32 caracteres)
openssl rand -base64 32

# Gerar COOKIE_SECRET (32 caracteres)
openssl rand -base64 32
```

## 🔍 Troubleshooting

### Backend não conecta ao banco

Verifique se o PostgreSQL está saudável:
```bash
docker-compose ps postgres
docker-compose logs postgres
```

### Erro de permissão nos uploads

```bash
docker-compose exec backend chmod -R 777 uploads
```

### Rebuild completo

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Limpar cache do Docker

```bash
docker system prune -a
```

## 📚 Recursos adicionais

- [Documentação Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Railway Documentation](https://docs.railway.app/)

