# 🎨 Payload CMS - Setup Completo

## ✅ O que foi feito

1. **Payload CMS 3.63 instalado** e configurado
2. **Collections criadas**:
   - `pages` - Páginas estáticas (sobre, soluções, serviços)
   - `solutions` - Soluções e serviços oferecidos
   - `home-content` - Conteúdo da página inicial
   - `media` - Upload de imagens e arquivos
   - `users` - Usuários do CMS
3. **API Route configurada** em `/app/api/[...payload]/route.ts`
4. **Erro de CSS corrigido** - Removido `@import` duplicado

## 🚀 Como usar

### 1. Configurar Variáveis de Ambiente

Crie ou atualize o arquivo `.env.local` na raiz do projeto:

```env
# Payload CMS
PAYLOAD_SECRET=your-secret-key-here-change-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
DATABASE_URL=postgres://medusa_user:medusa_password@localhost:5432/medusa_db

# Medusa (se ainda estiver usando)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

### 2. Iniciar o Servidor

```bash
npm run dev
```

### 3. Acessar o Admin do Payload CMS

1. Acesse: `http://localhost:3000/admin`
2. Crie o primeiro usuário admin:
   - Email: `admin@althion.com`
   - Senha: `admin123` (ou escolha uma senha forte)

### 4. Criar Páginas

#### Página "Sobre"

1. Acesse `Pages` no admin
2. Clique em "Create New"
3. Preencha:
   - **Title**: "Sobre a Althion Lab"
   - **Slug**: "sobre"
   - **Content**: Conteúdo principal da página (rich text)
   - **Hero**:
     - Title: "Sobre a Althion Lab"
     - Subtitle: "Especialistas em automação industrial com mais de 10 anos de experiência"
   - **Sections**: Adicione seções:
     - **Section 1** (type: "text"):
       - Title: "Nossa História"
       - Content: Texto sobre a história da empresa
     - **Section 2** (type: "stats"):
       - Stats: [
         - { label: "Anos de Experiência", value: "10+" },
         - { label: "Projetos Concluídos", value: "500+" },
         - { label: "Clientes Ativos", value: "200+" },
         - { label: "Suporte Técnico", value: "24h" }
       ]
     - **Section 3** (type: "cards"):
       - Cards: [
         - { title: "Missão", description: "...", icon: "Target" },
         - { title: "Visão", description: "...", icon: "Eye" },
         - { title: "Valores", description: "...", icon: "Award" }
       ]
     - **Section 4** (type: "contact"):
       - Address: "Av. Brasília, 397B, Suzano/SP"
       - Phone: "(11) 3090-3687"
       - Email: "contato@althionlab.com"
   - **Published**: Marque como publicado

#### Página "Soluções"

1. Acesse `Pages` no admin
2. Clique em "Create New"
3. Preencha:
   - **Title**: "Nossas Soluções"
   - **Slug**: "solucoes"
   - **Content**: Conteúdo principal
   - **Hero**:
     - Title: "Nossas Soluções"
     - Subtitle: "Soluções completas em automação industrial para otimizar seus processos"
   - **Sections**: Adicione seções com cards de soluções
   - **Published**: Marque como publicado

#### Página "Serviços"

1. Acesse `Pages` no admin
2. Clique em "Create New"
3. Preencha:
   - **Title**: "Serviços"
   - **Slug**: "servicos"
   - **Content**: Conteúdo principal
   - **Published**: Marque como publicado

### 5. Criar Soluções

1. Acesse `Solutions` no admin
2. Clique em "Create New"
3. Preencha para cada solução:
   - **Title**: "Automação de Processos"
   - **Slug**: "automacao-processos"
   - **Description**: Descrição da solução
   - **Icon**: "Settings" (nome do ícone do lucide-react)
   - **Category**: "Controle"
   - **Features**: Adicione características
   - **Published**: Marque como publicado

### 6. Criar Conteúdo da Home

1. Acesse `Home Content` no admin
2. Crie os seguintes conteúdos:

#### Hero (home-hero)
- **Slug**: "home-hero"
- **Type**: "hero"
- **Title**: "Especialistas em Indústria Farmacêutica"
- **Subtitle**: "Soluções em automação, instrumentação e controle para ciências da vida"
- **Content**: JSON:
  ```json
  {
    "video": "/4751094_Pharmaceutical_Quality_1280x720.mp4",
    "image": "/automation-hero.jpg",
    "primaryButton": {
      "text": "Ver Catálogo",
      "link": "/produtos"
    },
    "secondaryButton": {
      "text": "Solicitar Orçamento",
      "link": "/orcamento"
    }
  }
  ```
- **Published**: Marque como publicado

#### About (home-about)
- **Slug**: "home-about"
- **Type**: "about"
- **Title**: "Sobre a Althion Lab"
- **Subtitle**: "Especialistas em automação industrial"
- **Description**: Descrição sobre a empresa
- **Published**: Marque como publicado

#### Solutions (home-solutions)
- **Slug**: "home-solutions"
- **Type**: "solutions"
- **Title**: "Nossas Soluções"
- **Description**: Descrição das soluções
- **Published**: Marque como publicado

## 🔗 Integração com Frontend

### Buscar Páginas

```typescript
// app/sobre/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function SobrePage() {
  const payload = await getPayload({ config })
  
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'sobre' },
      published: { equals: true },
    },
    limit: 1,
  })

  if (!page.docs[0]) {
    return <div>Página não encontrada</div>
  }

  const pageData = page.docs[0]

  return (
    <div>
      <h1>{pageData.hero?.title || pageData.title}</h1>
      <p>{pageData.hero?.subtitle}</p>
      {/* Renderizar conteúdo e seções */}
    </div>
  )
}
```

### Buscar Soluções

```typescript
const solutions = await payload.find({
  collection: 'solutions',
  where: {
    published: { equals: true },
  },
  sort: 'order',
})
```

### Buscar Conteúdo da Home

```typescript
const heroContent = await payload.find({
  collection: 'home-content',
  where: {
    slug: { equals: 'home-hero' },
    published: { equals: true },
  },
  limit: 1,
})
```

## 📝 Próximos Passos

1. **Migrar conteúdo existente** das páginas para o Payload CMS
2. **Atualizar frontend** para buscar dados do Payload CMS
3. **Remover dados estáticos** hardcoded das páginas
4. **Criar hooks** para buscar dados do Payload CMS

## 🐛 Troubleshooting

### Erro: "Cannot find module '@payload-config'"

**Solução**: Verifique se o `tsconfig.json` tem o path alias:
```json
{
  "compilerOptions": {
    "paths": {
      "@payload-config": ["./payload.config"]
    }
  }
}
```

### Erro: "Database connection failed"

**Solução**: 
1. Verifique se o PostgreSQL está rodando
2. Verifique a URL de conexão no `.env.local`
3. Verifique se o banco de dados existe

### Erro: "Payload secret not set"

**Solução**: Adicione `PAYLOAD_SECRET` no `.env.local`:
```env
PAYLOAD_SECRET=your-secret-key-here
```

## 📚 Documentação

- **Payload CMS Docs**: https://payloadcms.com/docs
- **Payload CMS GitHub**: https://github.com/payloadcms/payload
- **Payload CMS + Next.js**: https://payloadcms.com/docs/getting-started/installation



