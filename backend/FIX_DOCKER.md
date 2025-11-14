# 🔧 Como Corrigir Problemas com Docker

## Problema: Erro "database 'medusa_user' does not exist"

Este erro ocorre quando os containers Docker têm volumes antigos com configurações incorretas.

## Solução: Recriar Containers e Volumes

### Passo 1: Parar e Remover Containers

No Docker Desktop:
1. Pare os containers `postgres` e `redis` (botão Stop)
2. Delete os containers (ícone de lixeira)
3. Delete os volumes (Volumes → selecione `backend_postgres_data` e `backend_redis_data` → Delete)

Ou via terminal:
```bash
cd backend
docker compose down -v
```

### Passo 2: Recriar Containers

No Docker Desktop:
1. Vá para a seção "Containers"
2. Clique em "Run" ou execute o comando:

```bash
cd backend
docker compose up -d
```

### Passo 3: Verificar se Containers Estão Rodando

```bash
docker ps
```

Você deve ver:
- `medusa_postgres` rodando na porta 5432
- `medusa_redis` rodando na porta 6379

### Passo 4: Aguardar PostgreSQL Inicializar

Aguarde alguns segundos para o PostgreSQL inicializar completamente. Verifique os logs:

```bash
docker logs medusa_postgres
```

Você deve ver uma mensagem como:
```
database system is ready to accept connections
```

### Passo 5: Executar Migrações

```bash
cd backend
npm run build
npx medusa migrations run
```

### Passo 6: Popular Banco de Dados

```bash
npm run seed
```

## Verificação Final

1. Containers rodando: `docker ps`
2. Logs sem erros: `docker logs medusa_postgres`
3. Migrações executadas: `npx medusa migrations run` (deve mostrar "Nothing to execute" se já rodou)
4. Seed executado: `npm run seed` (deve criar produtos e usuário admin)

## Comandos Úteis

```bash
# Ver logs do PostgreSQL
docker logs medusa_postgres

# Ver logs do Redis
docker logs medusa_redis

# Parar containers
docker compose down

# Parar e remover volumes
docker compose down -v

# Reiniciar containers
docker compose restart

# Ver status dos containers
docker ps -a
```

## Se o Problema Persistir

1. **Verifique o docker-compose.yml:**
   - `POSTGRES_DB: medusa_db` (não `medusa_user`)
   - `POSTGRES_USER: medusa_user`
   - `POSTGRES_PASSWORD: medusa_password`

2. **Verifique o .env:**
   - `DATABASE_URL=postgres://medusa_user:medusa_password@localhost:5432/medusa_db`

3. **Limpe tudo e recomece:**
   ```bash
   docker compose down -v
   docker system prune -a --volumes  # CUIDADO: Remove todos os volumes não utilizados
   docker compose up -d
   ```


