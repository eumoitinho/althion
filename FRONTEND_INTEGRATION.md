# 🔗 Integração Frontend com Backend - Conteúdo Estático

## ✅ O que foi implementado

### 1. Hooks Customizados

#### `useCategories` (`lib/hooks/use-categories.ts`)
- Busca categorias da API Medusa
- Suporta busca por slug
- Retorna: `{ categories, category, loading, error }`

#### `useContent` (`lib/hooks/use-content.ts`)
- Busca conteúdo estático da API Medusa
- Suporta filtro por tipo e busca por slug
- Retorna: `{ content, singleContent, loading, error }`
- Hooks auxiliares:
  - `useContentByType(type)` - Busca por tipo
  - `useContentBySlug(slug)` - Busca por slug

### 2. Páginas Atualizadas

#### Página Principal (`app/page.tsx`)
- ✅ **HeroSection**: Busca conteúdo da API (`home-hero`)
- ✅ **AboutSection**: Busca conteúdo da API (`home-about`)
- ✅ **SolutionsSection**: Busca conteúdo da API (`home-solutions`)
- ✅ **ProductsSection**: Busca categorias e produtos da API

#### Página de Produtos (`app/produtos/page.tsx`)
- ✅ Busca categorias da API
- ✅ Busca produtos da API
- ✅ Filtra produtos por categoria
- ✅ Mantém funcionalidade de busca e filtros

### 3. Fallbacks

Todas as páginas têm fallbacks para dados estáticos caso a API não esteja disponível:
- Hero: Fallback para conteúdo hardcoded
- About: Fallback para conteúdo hardcoded
- Solutions: Fallback para soluções hardcoded
- Categories: Fallback vazio (mostra loading)

## 🚀 Como usar

### 1. Verificar se o backend está rodando
```bash
cd backend
npm run dev
```

### 2. Verificar se os endpoints estão disponíveis
```bash
# Listar categorias
curl http://localhost:9000/store/categories

# Listar conteúdo hero
curl http://localhost:9000/store/content?type=hero

# Buscar conteúdo por slug
curl http://localhost:9000/store/content?slug=home-hero
```

### 3. Iniciar o frontend
```bash
cd .. # Voltar para raiz do projeto
npm run dev
```

## 📝 Estrutura de Dados

### Categoria (Category)
```typescript
{
  id: string
  slug: string
  name: string
  description?: string
  icon?: string
  image?: string
  image_paths?: string[]
  is_active: boolean
  order: number
  metadata?: Record<string, any>
}
```

### Conteúdo (Content)
```typescript
{
  id: string
  slug: string
  type: string // 'hero', 'about', 'solution', etc.
  title: string
  subtitle?: string
  description?: string
  content?: Record<string, any> // Conteúdo customizado (JSON)
  image?: string
  video?: string
  is_active: boolean
  order: number
  metadata?: Record<string, any>
}
```

## 🔧 Troubleshooting

### Problema: Endpoints não encontrados
**Solução:**
1. Verificar se o servidor backend está rodando
2. Verificar se os endpoints foram compilados em `dist/api/`
3. Reiniciar o servidor backend

### Problema: Dados não aparecem
**Solução:**
1. Verificar se o seed foi executado: `npm run seed:static`
2. Verificar se as migrações foram executadas: `npm run migrate`
3. Verificar logs do servidor para erros

### Problema: Categorias vazias
**Solução:**
1. Verificar se as categorias foram criadas no banco
2. Verificar se `is_active = true` nas categorias
3. Verificar se o hook está buscando corretamente

### Problema: Conteúdo não aparece
**Solução:**
1. Verificar se o conteúdo foi criado no banco
2. Verificar se `is_active = true` no conteúdo
3. Verificar se o tipo está correto (hero, about, solution)
4. Verificar se o slug está correto (home-hero, home-about, home-solutions)

## 📊 Status da Integração

- ✅ Hooks criados
- ✅ Página principal atualizada
- ✅ Página de produtos atualizada
- ✅ Fallbacks implementados
- ✅ Loading states implementados
- ⏳ Testes de integração (pendente)
- ⏳ Error handling melhorado (pendente)

## 🎯 Próximos Passos

1. **Testar integração** com backend rodando
2. **Melhorar error handling** nos hooks
3. **Adicionar cache** para reduzir chamadas à API
4. **Adicionar retry logic** para falhas de rede
5. **Criar testes** para os hooks
6. **Documentar** estrutura de conteúdo esperada

