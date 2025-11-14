# 🎨 Sanity CMS - Setup e Configuração

## 📋 Resumo

O Sanity CMS foi instalado e configurado com sucesso para gerenciar o conteúdo estático do site Althion.

---

## ✅ O que foi instalado

### Pacotes NPM
```json
{
  "sanity": "latest",
  "next-sanity": "latest",
  "@sanity/image-url": "latest",
  "@sanity/vision": "latest"
}
```

### Estrutura de Arquivos Criada

```
althion/
├── sanity.config.ts          # Configuração principal do Sanity
├── sanity/
│   └── schemas/
│       ├── index.ts           # Export de todos os schemas
│       ├── page.ts            # Schema de páginas
│       ├── solution.ts        # Schema de soluções
│       └── homeContent.ts     # Schema de conteúdo da home
├── app/
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx       # Rota do Sanity Studio
└── lib/
    ├── sanity.client.ts       # Cliente do Sanity
    ├── sanity.queries.ts      # Queries GROQ
    └── sanity.image.ts        # Helper para imagens
```

---

## 🚀 Como Configurar

### Passo 1: Criar Projeto no Sanity

1. Acesse: https://www.sanity.io/manage
2. Faça login ou crie uma conta
3. Clique em "Create New Project"
4. Nomeie o projeto: **Althion CMS**
5. Copie o **Project ID** gerado

### Passo 2: Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` e adicione:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id-aqui
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=seu-token-aqui
```

**Para obter o API Token:**
1. No painel do Sanity, vá em: **API** → **Tokens**
2. Clique em "Add API Token"
3. Nome: "Althion Frontend"
4. Permissões: **Editor** (ou **Viewer** se for apenas leitura)
5. Copie o token gerado

### Passo 3: Iniciar o Servidor

```bash
npm run dev
```

### Passo 4: Acessar o Sanity Studio

Abra no navegador:
```
http://localhost:3000/studio
```

Faça login com sua conta Sanity.

---

## 📚 Schemas Disponíveis

### 1. **Páginas** (`page`)

Gerencia páginas estáticas do site.

**Campos:**
- `title` - Título da página
- `slug` - URL slug (gerado automaticamente)
- `content` - Conteúdo principal (rich text)
- `hero` - Hero section
  - `title` - Título do hero
  - `subtitle` - Subtítulo
  - `image` - Imagem de fundo
  - `video` - URL de vídeo
- `sections` - Array de seções
  - Tipos: text, cards, stats, contact, process
- `seo` - Meta tags
  - `title` - Meta title
  - `description` - Meta description
  - `image` - Meta image
- `published` - Status de publicação

**Exemplo de uso:**
```typescript
import { getPageBySlug } from '@/lib/sanity.queries'

const page = await getPageBySlug('sobre')
```

---

### 2. **Soluções** (`solution`)

Gerencia soluções e serviços oferecidos.

**Campos:**
- `title` - Título da solução
- `slug` - URL slug
- `description` - Descrição
- `icon` - Nome do ícone (lucide-react)
- `category` - Categoria (controle, automacao, instrumentacao, validacao)
- `features` - Array de características
- `image` - Imagem da solução
- `link` - Link externo
- `order` - Ordem de exibição
- `published` - Status de publicação

**Exemplo de uso:**
```typescript
import { getSolutions } from '@/lib/sanity.queries'

const solutions = await getSolutions()
```

---

### 3. **Conteúdo da Home** (`homeContent`)

Gerencia seções da página inicial.

**Campos:**
- `slug` - Identificador (ex: home-hero)
- `type` - Tipo de conteúdo (hero, about, solutions, products, clients, testimonials)
- `title` - Título
- `subtitle` - Subtítulo
- `description` - Descrição
- `content` - Conteúdo rico (rich text)
- `customContent` - JSON customizado
- `image` - Imagem
- `video` - URL de vídeo
- `buttons` - Array de botões
  - `text` - Texto do botão
  - `link` - URL
  - `variant` - primary, secondary, outline
- `order` - Ordem de exibição
- `published` - Status de publicação

**Exemplo de uso:**
```typescript
import { getHomeContentByType } from '@/lib/sanity.queries'

const heroContent = await getHomeContentByType('hero')
```

---

## 🔍 Queries Disponíveis

### Páginas
```typescript
import {
  getPages,
  getPageBySlug
} from '@/lib/sanity.queries'

// Buscar todas as páginas publicadas
const pages = await getPages()

// Buscar página específica
const aboutPage = await getPageBySlug('sobre')
```

### Soluções
```typescript
import {
  getSolutions,
  getSolutionBySlug
} from '@/lib/sanity.queries'

// Buscar todas as soluções (ordenadas)
const solutions = await getSolutions()

// Buscar solução específica
const solution = await getSolutionBySlug('automacao-processos')
```

### Conteúdo da Home
```typescript
import {
  getHomeContent,
  getHomeContentBySlug,
  getHomeContentByType
} from '@/lib/sanity.queries'

// Buscar todo conteúdo da home
const homeContent = await getHomeContent()

// Buscar por slug
const hero = await getHomeContentBySlug('home-hero')

// Buscar por tipo
const aboutContent = await getHomeContentByType('about')
```

---

## 🖼️ Trabalhando com Imagens

```typescript
import { urlForImage } from '@/lib/sanity.image'

// Em um componente
const imageUrl = urlForImage(solution.image)
  .width(800)
  .height(600)
  .url()

// Exemplo completo
<img
  src={urlForImage(page.hero.image).width(1200).height(600).url()}
  alt={page.title}
/>
```

---

## 🎯 Próximos Passos

### 1. Criar Primeiro Conteúdo

1. Acesse http://localhost:3000/studio
2. Clique em **Home Content**
3. Crie um novo documento:
   - **Slug**: `home-hero`
   - **Type**: `hero`
   - **Title**: "Especialistas em Indústria Farmacêutica"
   - **Subtitle**: "Soluções em automação, instrumentação e controle"
   - **Published**: ✅ Marcar como publicado

### 2. Integrar com Páginas Next.js

Exemplo de página usando Sanity:

```typescript
// app/sobre/page.tsx
import { getPageBySlug } from '@/lib/sanity.queries'

export default async function SobrePage() {
  const page = await getPageBySlug('sobre')

  if (!page) {
    return <div>Página não encontrada</div>
  }

  return (
    <div>
      <h1>{page.title}</h1>
      {page.hero && (
        <section>
          <h2>{page.hero.title}</h2>
          <p>{page.hero.subtitle}</p>
        </section>
      )}
      {/* Renderizar conteúdo */}
    </div>
  )
}
```

### 3. Configurar CORS (Produção)

Quando fazer deploy, adicione o domínio em:
https://www.sanity.io/manage → **API** → **CORS Origins**

Exemplo:
- `https://althion.com.br`
- `https://www.althion.com.br`

---

## 🔧 Comandos Úteis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acessar Studio
# http://localhost:3000/studio

# Deploy do Studio (se necessário)
npx sanity deploy

# Gerenciar projeto
npx sanity manage
```

---

## 📖 Documentação Adicional

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Query Language**: https://www.sanity.io/docs/groq
- **Next.js Integration**: https://www.sanity.io/plugins/next-sanity
- **Image URLs**: https://www.sanity.io/docs/image-url

---

## 🐛 Troubleshooting

### Erro: "Invalid project ID"
**Solução**: Verifique se o `NEXT_PUBLIC_SANITY_PROJECT_ID` está correto no `.env.local`

### Erro: "Failed to fetch"
**Solução**:
1. Verifique se o dataset existe (geralmente "production")
2. Confira se o API token tem permissões adequadas

### Studio não carrega
**Solução**:
1. Limpe o cache do Next.js: `rm -rf .next`
2. Reinstale as dependências: `npm install`
3. Reinicie o servidor: `npm run dev`

### Imagens não aparecem
**Solução**:
1. Verifique se o `projectId` está correto em `lib/sanity.client.ts`
2. Confirme que a imagem foi enviada no Studio
3. Use o helper `urlForImage` corretamente

---

## ✨ Vantagens do Sanity

✅ **Estável e Confiável** - Sem bugs críticos como o Payload
✅ **Cloud-Hosted** - Não precisa de banco de dados local
✅ **Real-time** - Atualizações instantâneas
✅ **Customizável** - Schemas totalmente flexíveis
✅ **Escalável** - Usado por grandes empresas
✅ **Grátis** - Plano gratuito generoso para desenvolvimento

---

## 🎉 Pronto!

O Sanity CMS está configurado e pronto para uso. Agora você pode:

1. ✅ Criar projetos no Sanity.io
2. ✅ Configurar variáveis de ambiente
3. ✅ Acessar o Studio
4. ✅ Começar a criar conteúdo
5. ✅ Integrar com suas páginas Next.js

**Precisa de ajuda?** Consulte a documentação ou entre em contato!
