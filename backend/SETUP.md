# Setup do Backend Medusa - Althion

## ✅ Arquivos Criados

Todos os arquivos necessários foram criados:
- ✅ `package.json` - Dependências e scripts
- ✅ `docker-compose.yml` - Configuração PostgreSQL + Redis
- ✅ `medusa-config.js` - Configuração do Medusa
- ✅ `index.js` - Entry point do servidor
- ✅ `tsconfig.json` - Configuração TypeScript
- ✅ `.env` - Variáveis de ambiente
- ✅ `.gitignore` - Arquivos ignorados pelo git
- ✅ `src/index.ts` - Export dos modelos
- ✅ `src/models/index.ts` - Export do modelo Product
- ✅ `src/models/product.ts` - Modelo Product customizado
- ✅ `data/seed.json` - Dados de exemplo

## 📋 Próximos Passos

### 1. Iniciar Docker (PostgreSQL + Redis)

**IMPORTANTE:** Você precisa ter Docker instalado e rodando antes de continuar.

#### Opção A: Docker Desktop (Recomendado)

Se você tem Docker instalado:
```bash
cd backend
docker-compose up -d
# ou (versão mais recente)
docker compose up -d
```

Verificar se os containers estão rodando:
```bash
docker ps
```

Você deve ver `medusa_postgres` e `medusa_redis` rodando.

#### Opção B: Script Automatizado

Execute o script que verifica tudo automaticamente:
```bash
cd backend
./setup.sh
```

#### Opção C: PostgreSQL Local

Se você não tem Docker, pode usar PostgreSQL local. Veja `DOCKER_SETUP.md` para instruções detalhadas.

### 2. Executar Migrações do Banco de Dados

```bash
cd backend
npx medusa db:migrate
```

### 3. Popular com Dados Iniciais

```bash
cd backend
npm run seed
```

Isso criará:
- Regiões (Brasil e United States)
- Opções de envio
- 5 produtos de exemplo
- Usuário admin (email: `admin@althion.com`, senha: `admin123`)

### 4. Iniciar o Servidor

```bash
cd backend
npm run dev
```

O servidor estará disponível em:
- **Admin Dashboard:** http://localhost:9000/app
- **Store API:** http://localhost:9000/store
- **Admin API:** http://localhost:9000/admin

## 🔄 Próximas Vezes (Setup Rápido)

```bash
cd backend
docker-compose up -d  # Se não estiver rodando
npm run dev
```

## 📝 Notas Importantes

1. **Docker:** Certifique-se de que o Docker está instalado e rodando antes de executar `docker-compose up -d`

2. **Portas:** 
   - PostgreSQL: 5432
   - Redis: 6379
   - Medusa Server: 9000

3. **Credenciais do Banco:**
   - Usuário: `medusa_user`
   - Senha: `medusa_password`
   - Database: `medusa_db`

4. **Credenciais Admin:**
   - Email: `admin@althion.com`
   - Senha: `admin123`

5. **Build:** O TypeScript já foi compilado com sucesso. Se fizer alterações nos arquivos `.ts`, execute `npm run build` novamente.

## 🐛 Troubleshooting

### Docker não encontrado
- Instale o Docker Desktop: https://www.docker.com/products/docker-desktop
- Ou use PostgreSQL local e atualize o `DATABASE_URL` no `.env`

### Erro de conexão com banco
- Verifique se os containers Docker estão rodando: `docker ps`
- Verifique se as portas 5432 e 6379 não estão em uso

### Erro nas migrações
- Certifique-se de que o PostgreSQL está rodando
- Verifique o `DATABASE_URL` no arquivo `.env`

