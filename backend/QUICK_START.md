# 🚀 Quick Start Guide

Guia rápido para iniciar o backend Medusa em 5 minutos.

## 📋 Pré-requisitos

- Node.js 18+
- Docker (recomendado) ou PostgreSQL instalado

## ⚡ Passos Rápidos

### 1. Instalar Dependências
```bash
cd backend
npm install
```

### 2. Iniciar Banco de Dados
```bash
# Com Docker (recomendado)
docker-compose up -d

# OU se PostgreSQL já instalado, pule este passo
```

### 3. Executar Migrações
```bash
npm run build
npx medusa db:migrate
```

### 4. Popular com Dados de Exemplo
```bash
npm run seed
```

### 5. Iniciar Servidor
```bash
npm run dev
```

## ✅ Pronto!

- **API**: http://localhost:9000
- **Admin**: http://localhost:9000/app
  - Email: admin@althion.com
  - Senha: admin123

## 🔗 Testar API

```bash
# Listar produtos
curl http://localhost:9000/store/products

# Ou no navegador
open http://localhost:9000/store/products
```

## 📚 Próximos Passos

1. Ler [README.md](./README.md) completo
2. Consultar [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. Seguir [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) para integrar com frontend

## ❓ Problemas?

### Erro de conexão com banco
```bash
# Verificar se Docker está rodando
docker ps

# Reiniciar containers
docker-compose restart
```

### Porta 9000 em uso
```bash
# Mudar porta no .env
echo "PORT=9001" >> .env
```

### Limpar e recomeçar
```bash
docker-compose down -v
rm -rf node_modules dist
npm install
docker-compose up -d
npm run build
npx medusa db:migrate
npm run seed
npm run dev
```

---

**Tempo estimado**: 5-10 minutos ⏱️
