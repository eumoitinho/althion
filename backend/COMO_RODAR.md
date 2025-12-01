# ✅ SOLUÇÃO SIMPLES - COMO RODAR

## 🚀 COMANDO CORRETO

```bash
cd backend
npm run dev
```

Isso vai:
1. Compilar o TypeScript
2. Iniciar o servidor na porta 9000

## 📍 ONDE ACESSAR

Depois que aparecer:
```
Medusa server is listening on port: 9000
```

Acesse:
- **Admin:** http://localhost:9000/app
- **Login:** admin@althion.com / admin123

## ⚠️ SE DER ERRO

O erro que você está vendo é do CLI do Medusa. A solução é usar o `index.js` diretamente, que já está configurado no `package.json`.

Se ainda der problema, execute:

```bash
cd backend
npm run build
node index.js
```

## 🎯 RESUMO

1. `npm run dev` → Inicia tudo
2. Aguarde aparecer "listening on port: 9000"
3. Abra http://localhost:9000/app
4. Login: admin@althion.com / admin123

Pronto! 🎉

