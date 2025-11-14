# 🚀 Guia de Deploy - Althion

## 📋 Variáveis de Ambiente para Vercel

Configure as seguintes variáveis de ambiente no painel da Vercel:

### Sanity CMS
```
NEXT_PUBLIC_SANITY_PROJECT_ID=towmhciw
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skZekUpKdhU1uPRH4eQrEIJMd74MH5JBYfhQ9eDlhlpF3aERFJ43R1R0189DN97Oa2txUTIXhRTu54klW8NDkmtRkaD1iJm6eExvTkSFdO3qGcZo06NZrr7OSbb6ZHOJvf135yEfBfm0BLmmgQfk1HXKQjIJhxTz5DjiZeEzsv2Ad29DLul4
```

### Medusa Backend (se necessário no frontend)
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://seu-backend.railway.app
```

## 🔧 Como Configurar na Vercel

1. Acesse seu projeto na Vercel: https://vercel.com/dashboard
2. Vá em **Settings** → **Environment Variables**
3. Adicione cada variável acima
4. Certifique-se de selecionar os ambientes corretos (Production, Preview, Development)
5. Clique em **Save**

## 📝 Deploy

### Deploy via Git
```bash
git push origin main
```

A Vercel fará o deploy automaticamente.

### Deploy Manual
```bash
vercel --prod
```

## ✅ Sanity Studio

O Sanity Studio estará disponível em:
```
https://seu-dominio.vercel.app/studio
```

## 🔒 Segurança

⚠️ **IMPORTANTE**: 
- O `SANITY_API_TOKEN` deve ter permissões de **Editor** ou **Viewer** (não Admin)
- Nunca commite o `.env.local` no Git
- Use variáveis de ambiente da Vercel para produção

## 📚 Links Úteis

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Sanity Studio](https://www.sanity.io/manage)
- [Railway Dashboard](https://railway.app/dashboard) (para o backend)
