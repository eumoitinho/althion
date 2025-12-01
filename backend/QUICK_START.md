# 🚀 Guia Rápido de Setup

## Situação Atual

✅ **Concluído:**
- Todos os arquivos de configuração criados
- Dependências instaladas (`npm install`)
- TypeScript compilado (`npm run build`)

⚠️ **Docker não encontrado** - Mas você tem PostgreSQL instalado localmente!

## Opções para Continuar

### Opção 1: Instalar Docker (Recomendado para produção)

1. Instale Docker Desktop: https://www.docker.com/products/docker-desktop
2. Execute:
   ```bash
   cd backend
   docker compose up -d
   npx medusa db:migrate
   npm run seed
   npm run dev
   ```

### Opção 2: Usar PostgreSQL Local (Mais rápido agora)

Execute o script automatizado:
```bash
cd backend
./setup-local.sh
```

Ou manualmente:

1. **Iniciar PostgreSQL** (se não estiver rodando):
   ```bash
   brew services start postgresql
   ```

2. **Criar banco de dados**:
   ```bash
   psql -U $USER -d postgres
   ```
   Depois execute:
   ```sql
   CREATE DATABASE medusa_db;
   CREATE USER medusa_user WITH PASSWORD 'medusa_password';
   GRANT ALL PRIVILEGES ON DATABASE medusa_db TO medusa_user;
   ALTER DATABASE medusa_db OWNER TO medusa_user;
   \q
   ```

3. **Atualizar .env** (se necessário):
   O arquivo `.env` já está configurado para:
   ```
   DATABASE_URL=postgres://medusa_user:medusa_password@localhost:5432/medusa_db
   ```

4. **Executar setup**:
   ```bash
   cd backend
   npx medusa db:migrate
   npm run seed
   npm run dev
   ```

### Opção 3: Script Automatizado Completo

O script `setup.sh` detecta automaticamente se Docker está disponível:
```bash
cd backend
./setup.sh
```

## Próximas Vezes (Setup Rápido)

**Com Docker:**
```bash
cd backend
docker compose up -d
npm run dev
```

**Com PostgreSQL Local:**
```bash
cd backend
npm run dev
```

## 📝 URLs após iniciar

- **Admin Dashboard:** http://localhost:9000/app
- **Store API:** http://localhost:9000/store  
- **Admin API:** http://localhost:9000/admin

**Credenciais admin:**
- Email: `admin@althion.com`
- Senha: `admin123`

## 🆘 Precisa de ajuda?

- Veja `SETUP.md` para instruções detalhadas
- Veja `DOCKER_SETUP.md` para opções de Docker
- Execute `./setup-local.sh` para usar PostgreSQL local automaticamente

