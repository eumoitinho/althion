# Medusa Backend - Althion

Backend API construído com Medusa.js para gerenciar catálogo de produtos industriais.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Seed de Dados](#seed-de-dados)
- [Documentação da API](#documentação-da-api)
- [Integração com Frontend](#integração-com-frontend)
- [Admin Dashboard](#admin-dashboard)
- [Customizações](#customizações)

---

## 🎯 Visão Geral

Este backend fornece uma API RESTful completa para:
- Gerenciamento de catálogo de produtos industriais
- Gestão de inventário
- Carrinho de compras
- Processamento de pedidos
- Múltiplas regiões e moedas
- Upload de imagens
- Campos customizados para especificações técnicas

### Tecnologias Utilizadas

- **Medusa.js v1.20** - Framework de e-commerce headless
- **PostgreSQL** - Banco de dados principal
- **TypeScript** - Tipagem estática
- **Express** - Servidor HTTP
- **TypeORM** - ORM para banco de dados

---

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── api/              # Endpoints customizados
│   ├── models/           # Modelos de dados customizados
│   │   └── product.ts    # Extensão do modelo Product
│   ├── repositories/     # Repositórios customizados
│   ├── services/         # Serviços customizados
│   ├── subscribers/      # Event subscribers
│   ├── migrations/       # Migrações de banco de dados
│   └── index.ts          # Entry point
├── data/
│   └── seed.json         # Dados de exemplo
├── uploads/              # Arquivos enviados
├── .env                  # Variáveis de ambiente
├── medusa-config.js      # Configuração do Medusa
├── tsconfig.json         # Configuração TypeScript
├── docker-compose.yml    # Docker Compose para PostgreSQL
├── package.json
├── API_DOCUMENTATION.md  # Documentação completa da API
└── INTEGRATION_GUIDE.md  # Guia de integração com frontend
```

---

## ✅ Pré-requisitos

- **Node.js** 18+ (recomendado: 20.x)
- **npm** ou **yarn**
- **PostgreSQL** 15+ ou **Docker** (recomendado)
- **Redis** (opcional, para cache)

---

## 🚀 Instalação

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Configurar Banco de Dados

#### Opção A: Usando Docker (Recomendado)

```bash
# Iniciar PostgreSQL e Redis
docker-compose up -d

# Verificar se os containers estão rodando
docker ps
```

#### Opção B: PostgreSQL Local

Se você já tem PostgreSQL instalado localmente:

1. Criar banco de dados:
```bash
psql -U postgres
CREATE DATABASE medusa_db;
CREATE USER medusa_user WITH PASSWORD 'medusa_password';
GRANT ALL PRIVILEGES ON DATABASE medusa_db TO medusa_user;
\q
```

2. O arquivo `.env` já está configurado para o banco de dados.

### 3. Executar Migrações

```bash
npm run build
npx medusa migrations run
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

O arquivo `.env` já está criado com as seguintes configurações:

```env
# Database
DATABASE_URL=postgres://medusa_user:medusa_password@localhost:5432/medusa_db

# Secrets (já gerados automaticamente)
JWT_SECRET=...
COOKIE_SECRET=...

# CORS
STORE_CORS=http://localhost:3000,http://localhost:8000
ADMIN_CORS=http://localhost:7001,http://localhost:7000

# Server
PORT=9000
```

### Configuração de CORS

Para adicionar mais domínios permitidos, edite as variáveis `STORE_CORS` e `ADMIN_CORS` no arquivo `.env`.

### Configuração de Upload de Arquivos

Por padrão, os arquivos são salvos localmente em `uploads/`. Para usar S3:

1. Instalar plugin:
```bash
npm install @medusajs/file-s3
```

2. Editar `medusa-config.js` e adicionar configuração do S3.

---

## 🏃 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em:
- **API**: http://localhost:9000
- **Admin Dashboard**: http://localhost:9000/app
- **Store API**: http://localhost:9000/store
- **Admin API**: http://localhost:9000/admin

### Modo Produção

```bash
npm run build
npm run start
```

### Logs

Os logs serão exibidos no console. Para ambientes de produção, considere usar PM2:

```bash
npm install -g pm2
pm2 start index.js --name medusa-backend
pm2 logs medusa-backend
```

---

## 🌱 Seed de Dados

Para popular o banco de dados com dados de exemplo:

```bash
npm run seed
```

Isso criará:
- ✅ 5 produtos de exemplo (automação industrial)
- ✅ 2 regiões (Brasil e US)
- ✅ Opções de envio
- ✅ Usuário admin (admin@althion.com / admin123)

### Produtos de Exemplo

1. **Sistema de Automação Industrial Completo**
   - 3 variantes (Básica, Intermediária, Avançada)
   - Preços: R$ 250.000 - R$ 750.000

2. **Controlador Lógico Programável (PLC)**
   - 2 variantes (Compacto, Modular)
   - Preços: R$ 8.500 - R$ 15.000

3. **Sensor de Pressão Industrial**
   - 3 faixas de pressão
   - Preços: R$ 350 - R$ 850

4. **Interface HMI Touch Screen**
   - 3 tamanhos (7", 10", 15")
   - Preços: R$ 2.800 - R$ 6.800

5. **Inversor de Frequência**
   - 4 potências (2CV - 20CV)
   - Preços: R$ 1.200 - R$ 6.500

---

## 📖 Documentação da API

### Endpoints Principais

#### Store API (Pública)

```bash
# Listar produtos
GET /store/products

# Buscar produto
GET /store/products/:id

# Listar coleções
GET /store/collections

# Criar carrinho
POST /store/carts

# Adicionar item ao carrinho
POST /store/carts/:id/line-items
```

#### Admin API (Autenticada)

```bash
# Login
POST /admin/auth

# Gerenciar produtos
GET    /admin/products
POST   /admin/products
POST   /admin/products/:id
DELETE /admin/products/:id
```

Para documentação completa, veja: **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

---

## 🔗 Integração com Frontend

### Setup Rápido

1. Instalar cliente Medusa no frontend:
```bash
npm install @medusajs/medusa-js
```

2. Configurar cliente:
```typescript
import Medusa from "@medusajs/medusa-js"

const medusaClient = new Medusa({
  baseUrl: "http://localhost:9000",
  maxRetries: 3,
})

// Buscar produtos
const { products } = await medusaClient.products.list()
```

Para guia completo de integração, veja: **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)**

---

## 👨‍💼 Admin Dashboard

### Acessar Dashboard

1. Acesse: http://localhost:9000/app
2. Credenciais padrão:
   - Email: `admin@althion.com`
   - Senha: `admin123`

### Funcionalidades Disponíveis

- ✅ Gerenciar produtos e variantes
- ✅ Upload de imagens
- ✅ Gerenciar inventário
- ✅ Processar pedidos
- ✅ Gerenciar clientes
- ✅ Configurar regiões e moedas
- ✅ Configurar métodos de envio
- ✅ Analytics e relatórios

### Alterar Admin Separado (Opcional)

Se quiser rodar o admin em uma porta separada:

```bash
cd ..
mkdir admin
cd admin
npx create-medusa-admin@latest
```

Configure o backend URL em `.env`:
```env
MEDUSA_BACKEND_URL=http://localhost:9000
```

---

## 🎨 Customizações

### Campos Customizados de Produto

O modelo de produto foi estendido com os seguintes campos:

```typescript
{
  technical_specs: Record<string, any>      // Especificações técnicas
  related_product_ids: string[]             // Produtos relacionados
  industrial_category: string               // Categoria industrial
  certifications: string[]                  // Certificações (ISO, CE, etc)
  delivery_time_days: number                // Prazo de entrega
  demo_available: boolean                   // Disponibilidade de demo
  technical_doc_url: string                 // URL do manual técnico
  demo_video_url: string                    // URL do vídeo demo
  recommended_applications: string[]        // Aplicações recomendadas
  installation_complexity: number (1-5)     // Complexidade de instalação
}
```

### Adicionar Novos Campos

1. Edite `src/models/product.ts`
2. Crie uma migração:
```bash
npx medusa migrations create AddCustomFields
```
3. Execute a migração:
```bash
npx medusa migrations run
```

### Criar Endpoints Customizados

Crie arquivos em `src/api/`:

```typescript
// src/api/store/custom-route/route.ts
export default async (req, res) => {
  res.json({ message: "Custom endpoint" })
}
```

Endpoint estará disponível em: `/store/custom-route`

---

## 🧪 Testes

```bash
# Instalar dependências de teste
npm install --save-dev jest @types/jest ts-jest

# Executar testes
npm test
```

---

## 🐛 Troubleshooting

### Erro: "Cannot connect to PostgreSQL"

**Solução:**
```bash
# Verificar se PostgreSQL está rodando
docker ps

# Ou se usando PostgreSQL local
sudo systemctl status postgresql

# Reiniciar containers
docker-compose restart
```

### Erro: "Port 9000 already in use"

**Solução:**
```bash
# Mudar a porta no .env
PORT=9001

# Ou matar o processo
lsof -i :9000
kill -9 <PID>
```

### Erro ao executar migrações

**Solução:**
```bash
# Limpar banco e recriar
npm run build
npx medusa migrations run
```

---

## 📚 Recursos Adicionais

- [Documentação Oficial do Medusa](https://docs.medusajs.com)
- [Discord do Medusa](https://discord.gg/medusajs)
- [GitHub do Medusa](https://github.com/medusajs/medusa)
- [Blog do Medusa](https://medusajs.com/blog)

---

## 🔐 Segurança

### Produção Checklist

- [ ] Alterar `JWT_SECRET` e `COOKIE_SECRET`
- [ ] Alterar senha do usuário admin
- [ ] Configurar HTTPS
- [ ] Configurar rate limiting
- [ ] Configurar backup automático do banco
- [ ] Habilitar logs de auditoria
- [ ] Configurar variáveis de ambiente seguras
- [ ] Implementar autenticação 2FA para admin

---

## 📝 Scripts Disponíveis

```bash
npm run build        # Compilar TypeScript
npm run dev          # Modo desenvolvimento
npm run start        # Modo produção
npm run seed         # Popular banco com dados
npm run watch        # Watch mode para desenvolvimento
npm run build:admin  # Build do admin dashboard
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

ISC

---

## 👥 Suporte

Para questões e suporte:
- Email: dev@althion.com
- Issues: [GitHub Issues](https://github.com/seu-usuario/althion/issues)

---

## 🎉 Resultado Esperado

Após seguir este guia, você terá:

✅ Backend Medusa rodando em **localhost:9000**
✅ Admin dashboard acessível em **localhost:9000/app**
✅ API REST documentada e pronta para uso
✅ Banco de dados PostgreSQL configurado
✅ 5 produtos de exemplo cadastrados
✅ Estrutura pronta para integração com frontend
✅ Campos customizados para specs técnicas
✅ Documentação completa da API
✅ Guia de integração para o frontend

---

**Desenvolvido com ❤️ para Althion**
