# Instalação do Docker

O Docker não está instalado no seu sistema. Aqui estão as opções:

## Opção 1: Instalar Docker Desktop (Recomendado)

### macOS:
1. Baixe Docker Desktop: https://www.docker.com/products/docker-desktop
2. Instale o arquivo `.dmg`
3. Abra Docker Desktop e aguarde inicializar
4. Execute novamente: `docker compose up -d`

### Verificar instalação:
```bash
docker --version
docker compose version
```

## Opção 2: Usar PostgreSQL Local

Se você já tem PostgreSQL instalado localmente:

1. Crie o banco de dados:
```bash
psql -U postgres
CREATE DATABASE medusa_db;
CREATE USER medusa_user WITH PASSWORD 'medusa_password';
GRANT ALL PRIVILEGES ON DATABASE medusa_db TO medusa_user;
\q
```

2. O arquivo `.env` já está configurado para usar PostgreSQL local na porta 5432.

3. Certifique-se de que PostgreSQL está rodando:
```bash
# macOS (Homebrew)
brew services start postgresql

# Ou verificar se está rodando
psql -U medusa_user -d medusa_db -h localhost
```

## Opção 3: Usar Script Automatizado

Execute o script de setup que verifica tudo automaticamente:

```bash
cd backend
./setup.sh
```

O script irá:
- Verificar se Docker está instalado
- Iniciar containers se disponível
- Instalar dependências
- Compilar TypeScript
- Executar migrações
- Popular banco de dados

## Continuar sem Docker

Se você não quiser usar Docker agora, pode:

1. Pular a inicialização do Docker
2. Usar PostgreSQL local (atualize `.env` se necessário)
3. Executar manualmente:
   ```bash
   cd backend
   npm install --legacy-peer-deps
   npm run build
   npx medusa migrations run
   npm run seed
   npm run dev
   ```

