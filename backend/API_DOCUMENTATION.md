# API Documentation - Medusa Backend

## Base URL
```
http://localhost:9000
```

## Principais Endpoints da Store API

A Store API é utilizada pelo frontend para consumir dados de produtos, coleções, carrinho, etc.

### Produtos

#### Listar todos os produtos
```http
GET /store/products
```

**Query Parameters:**
- `limit` (number): Número de produtos por página (default: 100)
- `offset` (number): Número de produtos a pular
- `q` (string): Busca por título ou descrição
- `category_id[]` (string[]): Filtrar por categorias
- `collection_id[]` (string[]): Filtrar por coleções
- `order` (string): Ordenação (created_at, updated_at)

**Response:**
```json
{
  "products": [
    {
      "id": "prod_01...",
      "title": "Sistema de Automação Industrial",
      "subtitle": "Solução completa...",
      "description": "Sistema integrado...",
      "handle": "sistema-automacao-industrial",
      "thumbnail": "https://...",
      "images": [...],
      "variants": [...],
      "options": [...],
      "metadata": {},
      "technical_specs": {},
      "related_product_ids": [],
      "industrial_category": "automation",
      "certifications": ["ISO9001", "CE"],
      "delivery_time_days": 30,
      "demo_available": true,
      "technical_doc_url": "https://...",
      "demo_video_url": "https://...",
      "recommended_applications": ["pharmaceutical", "manufacturing"],
      "installation_complexity": 3
    }
  ],
  "count": 10,
  "offset": 0,
  "limit": 100
}
```

#### Obter produto por ID
```http
GET /store/products/:id
```

**Response:**
```json
{
  "product": {
    "id": "prod_01...",
    "title": "...",
    ...
  }
}
```

#### Obter produto por handle
```http
GET /store/products/:handle
```

Mesmo response do endpoint anterior.

### Coleções

#### Listar coleções
```http
GET /store/collections
```

**Response:**
```json
{
  "collections": [
    {
      "id": "pcol_01...",
      "title": "Automação Industrial",
      "handle": "automacao-industrial",
      "metadata": {}
    }
  ]
}
```

#### Obter coleção por ID
```http
GET /store/collections/:id
```

**Response:**
```json
{
  "collection": {
    "id": "pcol_01...",
    "title": "Automação Industrial",
    "products": [...]
  }
}
```

### Categorias de Produtos

#### Listar categorias
```http
GET /store/product-categories
```

**Response:**
```json
{
  "product_categories": [
    {
      "id": "pcat_01...",
      "name": "PLCs",
      "handle": "plcs",
      "parent_category": null,
      "category_children": []
    }
  ]
}
```

### Carrinho (Cart)

#### Criar carrinho
```http
POST /store/carts
```

**Body:**
```json
{
  "region_id": "reg_01..."
}
```

**Response:**
```json
{
  "cart": {
    "id": "cart_01...",
    "email": null,
    "billing_address": null,
    "shipping_address": null,
    "items": [],
    "region": {...},
    "total": 0
  }
}
```

#### Adicionar item ao carrinho
```http
POST /store/carts/:id/line-items
```

**Body:**
```json
{
  "variant_id": "variant_01...",
  "quantity": 1
}
```

#### Obter carrinho
```http
GET /store/carts/:id
```

#### Atualizar item do carrinho
```http
POST /store/carts/:id/line-items/:line_id
```

**Body:**
```json
{
  "quantity": 2
}
```

#### Remover item do carrinho
```http
DELETE /store/carts/:id/line-items/:line_id
```

### Regiões

#### Listar regiões disponíveis
```http
GET /store/regions
```

**Response:**
```json
{
  "regions": [
    {
      "id": "reg_01...",
      "name": "Brasil",
      "currency_code": "brl",
      "countries": [
        {
          "iso_2": "br",
          "name": "Brazil"
        }
      ]
    }
  ]
}
```

### Opções de Envio

#### Listar opções de envio para carrinho
```http
GET /store/shipping-options/:cart_id
```

**Response:**
```json
{
  "shipping_options": [
    {
      "id": "so_01...",
      "name": "Entrega Padrão",
      "price_incl_tax": 1000,
      "amount": 1000
    }
  ]
}
```

## Admin API

A Admin API requer autenticação.

### Autenticação

#### Login
```http
POST /admin/auth
```

**Body:**
```json
{
  "email": "admin@althion.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "user": {
    "id": "usr_01...",
    "email": "admin@althion.com",
    "role": "admin"
  }
}
```

### Produtos (Admin)

#### Criar produto
```http
POST /admin/products
Authorization: Bearer {token}
```

**Body:**
```json
{
  "title": "Novo Produto",
  "subtitle": "Descrição curta",
  "description": "Descrição completa",
  "is_giftcard": false,
  "discountable": true,
  "images": ["url1", "url2"],
  "thumbnail": "url",
  "handle": "novo-produto",
  "status": "published",
  "variants": [
    {
      "title": "Default",
      "prices": [
        {
          "currency_code": "brl",
          "amount": 10000
        }
      ],
      "inventory_quantity": 100
    }
  ],
  "metadata": {
    "technical_specs": {},
    "certifications": [],
    "demo_available": true
  }
}
```

#### Atualizar produto
```http
POST /admin/products/:id
Authorization: Bearer {token}
```

#### Deletar produto
```http
DELETE /admin/products/:id
Authorization: Bearer {token}
```

## Exemplos de Uso com JavaScript/TypeScript

### Buscar produtos
```typescript
const response = await fetch('http://localhost:9000/store/products');
const { products } = await response.json();
```

### Buscar produto por ID
```typescript
const response = await fetch(`http://localhost:9000/store/products/${productId}`);
const { product } = await response.json();
```

### Criar carrinho e adicionar item
```typescript
// 1. Criar carrinho
const cartResponse = await fetch('http://localhost:9000/store/carts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    region_id: 'reg_01...'
  })
});
const { cart } = await cartResponse.json();

// 2. Adicionar item
const addItemResponse = await fetch(
  `http://localhost:9000/store/carts/${cart.id}/line-items`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variant_id: 'variant_01...',
      quantity: 1
    })
  }
);
const { cart: updatedCart } = await addItemResponse.json();
```

### Buscar produtos com filtros
```typescript
const params = new URLSearchParams({
  q: 'automação',
  limit: '20',
  offset: '0'
});

const response = await fetch(
  `http://localhost:9000/store/products?${params}`
);
const { products, count } = await response.json();
```

## Webhooks

Medusa suporta webhooks para eventos como:
- `product.created`
- `product.updated`
- `order.placed`
- `order.updated`
- `customer.created`

Configure webhooks no arquivo `medusa-config.js` ou via Admin API.

## Rate Limiting

Por padrão, não há rate limiting. Para produção, recomenda-se configurar um reverse proxy (nginx) com rate limiting.

## CORS

CORS está configurado para aceitar requisições de:
- `http://localhost:3000` (Frontend Next.js)
- `http://localhost:8000`
- `http://localhost:7001` (Admin Dashboard)

Para adicionar mais origens, edite o arquivo `.env` e adicione à variável `STORE_CORS`.

## Erros Comuns

### 404 - Not Found
Recurso não encontrado. Verifique o ID ou handle.

### 422 - Unprocessable Entity
Dados inválidos na requisição. Verifique o body da requisição.

### 500 - Internal Server Error
Erro no servidor. Verifique os logs do backend.
