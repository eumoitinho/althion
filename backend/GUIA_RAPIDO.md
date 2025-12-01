# 🚀 GUIA RÁPIDO - O QUE ESTÁ RODANDO

## ✅ O QUE ESTÁ FUNCIONANDO AGORA

### 1. Docker (PostgreSQL + Redis)
- **O que é:** Banco de dados
- **Porta:** 5432 (PostgreSQL) e 6379 (Redis)
- **Status:** ✅ Rodando em containers

### 2. Backend Medusa
- **O que é:** API do e-commerce
- **Porta:** 9000
- **Status:** ✅ Rodando

## 🌐 ONDE ACESSAR

### 👨‍💼 ADMIN (Painel Administrativo)
**URL:** http://localhost:9000/app

**Para que serve:**
- Criar/editar produtos
- Ver pedidos
- Gerenciar clientes
- Configurar loja

**Login:**
- Email: `admin@althion.com`
- Senha: `admin123`

### 🛒 API STORE (Para o Frontend)
**URL:** http://localhost:9000/store

**Para que serve:**
- Listar produtos
- Adicionar ao carrinho
- Criar pedidos
- Frontend consome essa API

**Exemplo de uso:**
```bash
# Listar produtos
curl http://localhost:9000/store/products
```

### 🔧 API ADMIN (Para Gerenciamento)
**URL:** http://localhost:9000/admin

**Para que serve:**
- Gerenciar produtos via código
- Criar usuários
- Configurações avançadas

## 📋 COMANDOS ÚTEIS

### Iniciar tudo
```bash
cd backend
docker compose up -d    # Inicia banco de dados
npm run dev             # Inicia servidor
```

### Parar tudo
```bash
# No terminal do servidor: Ctrl+C
docker compose down     # Para os containers
```

### Ver logs
```bash
docker compose logs -f   # Ver logs do banco
```

## 🎯 RESUMO

1. **Docker** = Banco de dados (não precisa mexer)
2. **Backend** = API rodando na porta 9000
3. **Admin** = http://localhost:9000/app (interface visual)
4. **API** = http://localhost:9000/store (para o frontend)

## 🆘 PROBLEMAS COMUNS

### Servidor não inicia
```bash
cd backend
docker compose up -d
npm run dev
```

### Erro de porta ocupada
```bash
# Ver o que está usando a porta 9000
lsof -i :9000
```

### Limpar tudo e começar de novo
```bash
cd backend
docker compose down -v  # Remove volumes também
docker compose up -d
npm run dev
```

## 📝 PRÓXIMOS PASSOS

1. Acesse http://localhost:9000/app
2. Faça login com admin@althion.com / admin123
3. Explore o painel administrativo
4. Crie produtos, veja pedidos, etc.


