# 📦 Setup de Conteúdo Estático - Backend

## ✅ O que foi implementado

### 1. Modelos de Dados

#### Modelo `Category`
- Armazena categorias de produtos
- Campos: `id`, `slug`, `name`, `description`, `icon`, `image`, `image_paths` (JSONB), `is_active`, `order`, `metadata` (JSONB)
- Localização: `src/models/category.ts`

#### Modelo `Content`
- Armazena conteúdo estático (hero, about, solutions, etc.)
- Campos: `id`, `slug`, `type`, `title`, `subtitle`, `description`, `content` (JSONB), `image`, `video`, `is_active`, `order`, `metadata` (JSONB)
- Localização: `src/models/content.ts`

### 2. Migrações

#### Migração `CreateContentTables1732936000000`
- Cria tabelas `category` e `content`
- Adiciona índices para `slug` e `type`
- Localização: `src/migrations/CreateContentTables1732936000000.ts`

#### Migração `FixCategoryImagePaths1732936100000`
- Corrige tipo da coluna `image_paths` de `text[]` para `jsonb`
- Localização: `src/migrations/FixCategoryImagePaths1732936100000.ts`

### 3. Endpoints API

#### Store API (Pública)

##### GET `/store/categories`
- Lista todas as categorias ativas
- Query params: `slug` (opcional) - busca categoria por slug
- Response: `{ categories: Category[] }` ou `{ category: Category }`

##### GET `/store/content`
- Lista conteúdo estático
- Query params:
  - `type` (opcional) - filtra por tipo (hero, about, solution, etc.)
  - `slug` (opcional) - busca conteúdo por slug
- Response: `{ content: Content[] }` ou `{ content: Content }`

#### Admin API (Autenticada)

##### GET `/admin/categories`
- Lista todas as categorias
- Query params: `slug` (opcional) - busca categoria por slug
- Response: `{ categories: Category[] }` ou `{ category: Category }`

##### POST `/admin/categories`
- Cria nova categoria
- Body: `{ slug, name, description, icon, image, image_paths, is_active, order, metadata }`
- Response: `{ category: Category }`

##### PUT `/admin/categories`
- Atualiza categoria existente
- Body: `{ id, ...updates }`
- Response: `{ category: Category }`

##### DELETE `/admin/categories`
- Deleta categoria
- Query params: `id` - ID da categoria
- Response: `{ message: "Category deleted" }`

##### GET `/admin/content`
- Lista todo o conteúdo
- Query params: `type` (opcional), `slug` (opcional)
- Response: `{ content: Content[] }` ou `{ content: Content }`

##### POST `/admin/content`
- Cria novo conteúdo
- Body: `{ slug, type, title, subtitle, description, content, image, video, is_active, order, metadata }`
- Response: `{ content: Content }`

##### PUT `/admin/content`
- Atualiza conteúdo existente
- Body: `{ id, ...updates }`
- Response: `{ content: Content }`

##### DELETE `/admin/content`
- Deleta conteúdo
- Query params: `id` - ID do conteúdo
- Response: `{ message: "Content deleted" }`

### 4. Seed de Dados

#### Script `seed-static-content.js`
- Popula categorias e conteúdo estático do arquivo `data/static-content.json`
- Localização: `scripts/seed-static-content.js`
- Comando: `node scripts/seed-static-content.js`

#### Arquivo `static-content.json`
- Contém dados iniciais de categorias e conteúdo
- Localização: `data/static-content.json`

### 5. Dados Iniciais

#### Categorias (6)
1. CLP e Automação
2. Medidores de Vazão
3. Sensores de Temperatura
4. Sensores de Pressão
5. Sensores de Nível
6. Controle de Acesso e Telemática

#### Conteúdo (3)
1. Hero (home-hero)
2. About (home-about)
3. Solutions (home-solutions)

## 🚀 Como usar

### 1. Executar migrações
```bash
cd backend
npm run build
npm run migrate
```

### 2. Popular dados iniciais
```bash
cd backend
node scripts/seed-static-content.js
```

### 3. Reiniciar servidor
```bash
cd backend
# Parar servidor atual (Ctrl+C)
npm run dev
```

### 4. Testar endpoints
```bash
# Listar categorias
curl http://localhost:9000/store/categories

# Buscar categoria por slug
curl http://localhost:9000/store/categories?slug=clp-automacao

# Listar conteúdo por tipo
curl http://localhost:9000/store/content?type=hero

# Buscar conteúdo por slug
curl http://localhost:9000/store/content?slug=home-hero
```

## 📝 Próximos passos

1. **Atualizar frontend** para buscar categorias e conteúdo da API
2. **Criar hooks** para gerenciar estado de categorias e conteúdo
3. **Atualizar páginas** para usar dados da API em vez de dados estáticos
4. **Adicionar serviços e preços** se necessário

## 🔧 Troubleshooting

### Endpoints não encontrados
- Verificar se o servidor foi reiniciado após criar os endpoints
- Verificar se os arquivos foram compilados em `dist/api/`
- Verificar se os modelos estão sendo exportados em `src/index.ts`

### Erro ao buscar dados
- Verificar se as migrações foram executadas
- Verificar se o seed foi executado
- Verificar logs do servidor para erros

### Erro ao parsear JSON
- Verificar se os campos JSONB estão no formato correto
- Verificar se os dados foram inseridos corretamente no banco

