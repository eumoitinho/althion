# 🎨 Payload CMS - Integração e Setup

## 📋 Resumo

Este documento descreve como configurar e usar o Payload CMS para gerenciar conteúdo estático das páginas do site.

## 🚀 Instalação

### 1. Instalar Payload CMS

```bash
npm install payload@2.36.0
npm install @payloadcms/db-postgres @payloadcms/richtext-slate
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
DATABASE_URL=postgres://medusa_user:medusa_password@localhost:5432/medusa_db
```

### 3. Configurar Payload CMS

O arquivo `payload.config.ts` já está configurado com as seguintes collections:

- **`pages`** - Páginas estáticas (sobre, soluções, serviços)
- **`solutions`** - Soluções e serviços oferecidos
- **`home-content`** - Conteúdo da página inicial (hero, about, solutions)
- **`media`** - Upload de imagens e arquivos
- **`users`** - Usuários do CMS

## 📝 Collections Disponíveis

### 1. Pages (Páginas)

Gerencia páginas estáticas como Sobre, Soluções, Serviços.

**Campos:**
- `title` - Título da página
- `slug` - URL slug (ex: "sobre", "solucoes", "servicos")
- `content` - Conteúdo principal (rich text)
- `hero` - Hero section (título, subtítulo, imagem, vídeo)
- `sections` - Seções da página (text, cards, stats, contact, process)
- `meta` - Meta tags (title, description, image)
- `published` - Status de publicação

### 2. Solutions (Soluções)

Gerencia soluções e serviços oferecidos.

**Campos:**
- `title` - Título da solução
- `slug` - URL slug
- `description` - Descrição
- `icon` - Nome do ícone (lucide-react)
- `category` - Categoria
- `features` - Lista de características
- `image` - Imagem da solução
- `link` - Link para mais informações
- `published` - Status de publicação

### 3. Home Content (Conteúdo da Home)

Gerencia conteúdo da página inicial.

**Campos:**
- `slug` - Identificador (ex: "home-hero", "home-about", "home-solutions")
- `type` - Tipo de conteúdo (hero, about, solutions, products)
- `title` - Título
- `subtitle` - Subtítulo
- `description` - Descrição
- `content` - Conteúdo customizado (JSON)
- `image` - Imagem
- `video` - URL do vídeo
- `order` - Ordem de exibição
- `published` - Status de publicação

### 4. Media (Mídia)

Gerencia upload de imagens e arquivos.

**Campos:**
- `alt` - Texto alternativo
- Upload de arquivos

## 🎯 Como Usar

### 1. Acessar Admin do Payload CMS

1. Inicie o servidor Next.js:
```bash
npm run dev
```

2. Acesse o admin do Payload CMS:
```
http://localhost:3000/admin
```

3. Crie o primeiro usuário admin:
- Email: `admin@althion.com`
- Senha: `admin123`

### 2. Criar Páginas

1. Acesse `Pages` no admin
2. Clique em "Create New"
3. Preencha os campos:
   - **Title**: "Sobre a Althion Lab"
   - **Slug**: "sobre"
   - **Content**: Conteúdo principal da página
   - **Hero**: Título, subtítulo, imagem
   - **Sections**: Adicione seções (cards, stats, contact, etc.)
   - **Published**: Marque como publicado

### 3. Criar Soluções

1. Acesse `Solutions` no admin
2. Clique em "Create New"
3. Preencha os campos:
   - **Title**: "Automação de Processos"
   - **Slug**: "automacao-processos"
   - **Description**: Descrição da solução
   - **Icon**: "Settings" (nome do ícone do lucide-react)
   - **Category**: "Controle"
   - **Features**: Adicione características
   - **Published**: Marque como publicado

### 4. Criar Conteúdo da Home

1. Acesse `Home Content` no admin
2. Clique em "Create New"
3. Preencha os campos:
   - **Slug**: "home-hero"
   - **Type**: "hero"
   - **Title**: "Especialistas em Indústria Farmacêutica"
   - **Subtitle**: "Soluções em automação, instrumentação e controle"
   - **Content**: JSON customizado (ex: `{"video": "/video.mp4", "primaryButton": {"text": "Ver Catálogo", "link": "/produtos"}}`)
   - **Published**: Marque como publicado

## 🔗 Integração com Frontend

### 1. Criar Cliente Payload

Crie `lib/payload-client.ts`:

```typescript
import { getPayload } from 'payload'
import config from '@/payload.config'

export const payload = await getPayload({ config })
```

### 2. Buscar Páginas

```typescript
import { payload } from '@/lib/payload-client'

// Buscar página por slug
const page = await payload.find({
  collection: 'pages',
  where: {
    slug: { equals: 'sobre' },
    published: { equals: true },
  },
  limit: 1,
})

// Buscar todas as páginas publicadas
const pages = await payload.find({
  collection: 'pages',
  where: {
    published: { equals: true },
  },
})
```

### 3. Buscar Soluções

```typescript
// Buscar todas as soluções publicadas
const solutions = await payload.find({
  collection: 'solutions',
  where: {
    published: { equals: true },
  },
  sort: 'order',
})
```

### 4. Buscar Conteúdo da Home

```typescript
// Buscar conteúdo por slug
const heroContent = await payload.find({
  collection: 'home-content',
  where: {
    slug: { equals: 'home-hero' },
    published: { equals: true },
  },
  limit: 1,
})

// Buscar conteúdo por tipo
const aboutContent = await payload.find({
  collection: 'home-content',
  where: {
    type: { equals: 'about' },
    published: { equals: true },
  },
  sort: 'order',
})
```

## 📚 Próximos Passos

1. **Migrar Conteúdo Existente**
   - Criar páginas no Payload CMS com o conteúdo atual
   - Migrar soluções para o Payload CMS
   - Migrar conteúdo da home para o Payload CMS

2. **Atualizar Frontend**
   - Criar hooks para buscar dados do Payload CMS
   - Atualizar páginas para usar dados do Payload CMS
   - Remover dados estáticos hardcoded

3. **Configurar API Routes**
   - Criar API routes para buscar páginas
   - Criar API routes para buscar soluções
   - Criar API routes para buscar conteúdo da home

## 🐛 Troubleshooting

### Erro: "Cannot find module 'payload'"

**Solução:**
1. Verifique se o Payload CMS foi instalado: `npm list payload`
2. Reinstale o Payload CMS: `npm install payload@2.36.0`

### Erro: "Database connection failed"

**Solução:**
1. Verifique se o PostgreSQL está rodando: `docker ps`
2. Verifique a URL de conexão no `.env.local`
3. Verifique se o banco de dados existe

### Erro: "Payload config not found"

**Solução:**
1. Verifique se o arquivo `payload.config.ts` existe na raiz do projeto
2. Verifique se o arquivo está exportando a configuração corretamente

## 📖 Documentação Adicional

- **Payload CMS Docs**: https://payloadcms.com/docs
- **Payload CMS GitHub**: https://github.com/payloadcms/payload
- **Payload CMS + Next.js**: https://payloadcms.com/docs/getting-started/installation



