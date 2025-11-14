# 🎨 Interface Administrativa - Gerenciamento de Conteúdo

## 📋 Resumo

Criamos uma interface administrativa customizada no frontend Next.js para gerenciar conteúdo estático e categorias que não aparecem no Medusa Admin padrão.

## 🚀 Acessar a Interface Admin

### 1. Acessar Painel Admin

```
http://localhost:3000/admin
```

### 2. Páginas Disponíveis

- **`/admin`** - Painel principal com links para todas as funcionalidades
- **`/admin/conteudo`** - Gerenciar conteúdo estático (hero, about, solutions, etc.)
- **`/admin/categorias`** - Gerenciar categorias de produtos

## 🔐 Autenticação

**⚠️ NOTA IMPORTANTE:** No momento, os endpoints `/admin/content` e `/admin/categories` **não requerem autenticação** para facilitar o desenvolvimento. 

**Para produção**, você deve adicionar autenticação aos endpoints. Veja `backend/src/api/admin/content/route.ts` e `backend/src/api/admin/categories/route.ts` para adicionar middleware de autenticação.

### Acessar Interface Admin

Você pode acessar diretamente:

- `http://localhost:3000/admin` - Painel principal
- `http://localhost:3000/admin/conteudo` - Gerenciar conteúdo
- `http://localhost:3000/admin/categorias` - Gerenciar categorias

**Não é necessário fazer login** no Medusa Admin para acessar essas páginas durante o desenvolvimento.

## 📝 Gerenciar Conteúdo

### Criar Novo Conteúdo

1. Acesse `/admin/conteudo`
2. Clique em "Novo Conteúdo"
3. Preencha os campos:
   - **Slug**: Identificador único (ex: `home-hero`)
   - **Tipo**: Tipo de conteúdo (ex: `hero`, `about`, `solutions`)
   - **Título**: Título do conteúdo
   - **Subtítulo**: Subtítulo (opcional)
   - **Descrição**: Descrição do conteúdo
   - **Imagem**: URL da imagem
   - **Vídeo**: URL do vídeo
   - **Ordem**: Ordem de exibição
   - **Ativo**: Marque se o conteúdo está ativo
   - **Conteúdo (JSON)**: Conteúdo customizado em JSON (clique no ícone de olho para editar)

4. Clique em "Salvar"

### Editar Conteúdo

1. Acesse `/admin/conteudo`
2. Clique em "Editar" no card do conteúdo
3. Faça as alterações necessárias
4. Clique em "Salvar"

### Excluir Conteúdo

1. Acesse `/admin/conteudo`
2. Clique em "Excluir" no card do conteúdo
3. Confirme a exclusão

## 🏷️ Gerenciar Categorias

### Criar Nova Categoria

1. Acesse `/admin/categorias`
2. Clique em "Nova Categoria"
3. Preencha os campos:
   - **Slug**: Identificador único (ex: `clp-automacao`)
   - **Nome**: Nome da categoria
   - **Descrição**: Descrição da categoria
   - **Ícone**: Nome do ícone (ex: `Cpu`)
   - **Imagem**: URL da imagem
   - **Ordem**: Ordem de exibição
   - **Ativo**: Marque se a categoria está ativa
   - **Caminhos de Imagens (JSON Array)**: Array de URLs de imagens (clique no ícone de olho para editar)

4. Clique em "Salvar"

### Editar Categoria

1. Acesse `/admin/categorias`
2. Clique em "Editar" no card da categoria
3. Faça as alterações necessárias
4. Clique em "Salvar"

### Excluir Categoria

1. Acesse `/admin/categorias`
2. Clique em "Excluir" no card da categoria
3. Confirme a exclusão

## 📦 Exemplo de Conteúdo JSON

### Hero Section

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

### About Section

```json
{
  "description": "Somos especialistas em automação industrial...",
  "features": [
    {
      "title": "Experiência",
      "description": "Mais de 20 anos de experiência",
      "icon": "Settings"
    }
  ]
}
```

### Solutions Section

```json
{
  "solutions": [
    {
      "title": "Automação Industrial",
      "description": "Soluções completas de automação",
      "icon": "Cpu",
      "link": "/solucoes/automacao"
    }
  ]
}
```

## 📦 Exemplo de Caminhos de Imagens (JSON Array)

```json
[
  "/produtos/Automação (CLPs, IHMs e Módulos)/CLP e IHM 1.png",
  "/produtos/Automação (CLPs, IHMs e Módulos)/CLP e IHM 2.png"
]
```

## 🔗 Links Úteis

### Medusa Admin Dashboard
- **URL**: `http://localhost:9000/app`
- **Funcionalidades**: Gerenciar produtos, pedidos, clientes, etc.
- **Credenciais**: `admin@althion.com` / `admin123`

### APIs Disponíveis

- **Store API** (Pública):
  - `GET /store/content` - Listar conteúdo
  - `GET /store/content?slug=home-hero` - Buscar conteúdo por slug
  - `GET /store/content?type=hero` - Buscar conteúdo por tipo
  - `GET /store/categories` - Listar categorias
  - `GET /store/categories?slug=clp-automacao` - Buscar categoria por slug

- **Admin API** (Desenvolvimento - Sem autenticação):
  - `GET /admin/content` - Listar conteúdo
  - `POST /admin/content` - Criar conteúdo
  - `PUT /admin/content` - Atualizar conteúdo
  - `DELETE /admin/content?id=xxx` - Excluir conteúdo
  - `GET /admin/categories` - Listar categorias
  - `POST /admin/categories` - Criar categoria
  - `PUT /admin/categories` - Atualizar categoria
  - `DELETE /admin/categories?id=xxx` - Excluir categoria

## 🐛 Solução de Problemas

### Erro: "Unauthorized" ou "401"

**Causa**: Os endpoints admin requerem autenticação (apenas em produção).

**Solução** (Desenvolvimento):
- No desenvolvimento, os endpoints não requerem autenticação.
- Se você estiver vendo este erro, verifique se o backend está rodando.

**Solução** (Produção):
- Adicione middleware de autenticação nos endpoints admin.
- Veja `backend/src/api/admin/content/route.ts` para exemplo de autenticação.

### Erro: "Content not found" ou "404"

**Causa**: O conteúdo ou categoria não existe.

**Solução**:
1. Verifique se o slug está correto
2. Crie o conteúdo/categoria se não existir
3. Verifique se o conteúdo está ativo (`is_active: true`)

### Erro: "Internal server error" ou "500"

**Causa**: Erro no backend ou banco de dados.

**Solução**:
1. Verifique os logs do backend: `cd backend && npm run dev`
2. Verifique se o banco de dados está rodando: `docker ps`
3. Verifique se as migrações foram executadas: `cd backend && npm run migrate`

### Conteúdo não aparece no frontend

**Causa**: O conteúdo pode estar inativo ou o slug está incorreto.

**Solução**:
1. Verifique se `is_active: true` no conteúdo
2. Verifique se o slug está correto no frontend
3. Verifique os logs do navegador (F12) para erros de API

### Backend não está respondendo

**Causa**: O servidor Medusa pode não estar rodando.

**Solução**:
1. Verifique se o backend está rodando: `cd backend && npm run dev`
2. Verifique se o banco de dados está rodando: `docker ps`
3. Verifique se a porta 9000 está disponível
4. Verifique os logs do backend para erros

## 📚 Documentação Adicional

- **Backend API**: Veja `backend/API_DOCUMENTATION.md`
- **Setup Backend**: Veja `backend/README.md`
- **Integração Frontend**: Veja `FRONTEND_INTEGRATION.md`

## 🔒 Adicionar Autenticação (Produção)

Para adicionar autenticação aos endpoints admin em produção, edite os arquivos:

### `backend/src/api/admin/content/route.ts`

```typescript
export default async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // Verificar autenticação
    const loggedInUser = req.scope.resolve("loggedInUser")
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // ... resto do código
  } catch (error) {
    // ... tratamento de erro
  }
}
```

### `backend/src/api/admin/categories/route.ts`

```typescript
export default async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // Verificar autenticação
    const loggedInUser = req.scope.resolve("loggedInUser")
    if (!loggedInUser) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    // ... resto do código
  } catch (error) {
    // ... tratamento de erro
  }
}
```
