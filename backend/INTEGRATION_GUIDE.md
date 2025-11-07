# Guia de Integração - Frontend com Medusa Backend

Este guia explica como integrar o frontend Next.js existente com a API Medusa.

## Índice
1. [Setup Inicial](#setup-inicial)
2. [Configuração do Cliente API](#configuração-do-cliente-api)
3. [Exemplos de Integração](#exemplos-de-integração)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Gerenciamento de Estado](#gerenciamento-de-estado)
6. [Best Practices](#best-practices)

---

## Setup Inicial

### 1. Instalar Dependências no Frontend

No diretório raiz do projeto frontend:

```bash
npm install @medusajs/medusa-js
# ou
npm install axios # se preferir usar axios diretamente
```

### 2. Configurar Variáveis de Ambiente

Crie/edite o arquivo `.env.local` na raiz do frontend:

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

---

## Configuração do Cliente API

### Opção 1: Usando @medusajs/medusa-js (Recomendado)

Crie o arquivo `lib/medusa-client.ts`:

```typescript
import Medusa from "@medusajs/medusa-js"

const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
})

export default medusaClient
```

### Opção 2: Usando Fetch API

Crie o arquivo `lib/api.ts`:

```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export class MedusaAPI {
  private baseUrl: string

  constructor() {
    this.baseUrl = BACKEND_URL
  }

  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`)

    if (params) {
      Object.keys(params).forEach(key => {
        if (Array.isArray(params[key])) {
          params[key].forEach((value: any) => {
            url.searchParams.append(`${key}[]`, value)
          })
        } else {
          url.searchParams.append(key, params[key])
        }
      })
    }

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

export const api = new MedusaAPI()
```

---

## Exemplos de Integração

### 1. Página de Listagem de Produtos

```typescript
// app/produtos/page.tsx
"use client"

import { useEffect, useState } from 'react'
import medusaClient from '@/lib/medusa-client'
import type { Product } from '@medusajs/medusa'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { products } = await medusaClient.products.list()
        setProducts(products)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div>Carregando produtos...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <img
            src={product.thumbnail || '/placeholder.png'}
            alt={product.title}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="mt-2 font-semibold">{product.title}</h3>
          <p className="text-sm text-gray-600">{product.subtitle}</p>

          {/* Campos customizados */}
          {product.metadata?.demo_available && (
            <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              Demo Disponível
            </span>
          )}

          {product.variants && product.variants.length > 0 && (
            <p className="mt-2 font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(product.variants[0].prices[0].amount / 100)}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
```

### 2. Página de Detalhes do Produto

```typescript
// app/produtos/[id]/page.tsx
"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import medusaClient from '@/lib/medusa-client'
import type { Product } from '@medusajs/medusa'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { product } = await medusaClient.products.retrieve(params.id as string)
        setProduct(product)
      } catch (error) {
        console.error('Erro ao buscar produto:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) return <div>Carregando...</div>
  if (!product) return <div>Produto não encontrado</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagens */}
        <div>
          <img
            src={product.thumbnail || '/placeholder.png'}
            alt={product.title}
            className="w-full rounded-lg"
          />
        </div>

        {/* Informações */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{product.subtitle}</p>

          <div className="mt-4">
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(product.variants[0].prices[0].amount / 100)}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Especificações Técnicas */}
          {product.metadata?.technical_specs && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Especificações Técnicas</h3>
              <ul className="list-disc list-inside">
                {Object.entries(product.metadata.technical_specs).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certificações */}
          {product.metadata?.certifications && (
            <div className="mt-4">
              <h4 className="font-semibold">Certificações:</h4>
              <div className="flex gap-2 mt-2">
                {product.metadata.certifications.map((cert: string) => (
                  <span key={cert} className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tempo de entrega */}
          {product.metadata?.delivery_time_days && (
            <p className="mt-4 text-sm text-gray-600">
              Prazo de entrega: {product.metadata.delivery_time_days} dias
            </p>
          )}

          {/* Botão de adicionar ao carrinho */}
          <button
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            onClick={() => {/* Implementar adicionar ao carrinho */}}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
```

### 3. Busca de Produtos

```typescript
// components/ProductSearch.tsx
"use client"

import { useState } from 'react'
import medusaClient from '@/lib/medusa-client'
import type { Product } from '@medusajs/medusa'

export default function ProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { products } = await medusaClient.products.list({
        q: query,
        limit: 20
      })
      setResults(products)
    } catch (error) {
      console.error('Erro na busca:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar produtos..."
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {results.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.subtitle}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## Hooks Personalizados

### useProducts Hook

```typescript
// hooks/useProducts.ts
import { useState, useEffect } from 'react'
import medusaClient from '@/lib/medusa-client'
import type { Product } from '@medusajs/medusa'

export function useProducts(params?: any) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const { products } = await medusaClient.products.list(params)
        setProducts(products)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [JSON.stringify(params)])

  return { products, loading, error }
}

// Uso:
// const { products, loading, error } = useProducts({ limit: 10 })
```

### useCart Hook

```typescript
// hooks/useCart.ts
import { useState, useEffect } from 'react'
import medusaClient from '@/lib/medusa-client'
import type { Cart } from '@medusajs/medusa'

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Carregar carrinho do localStorage
    const cartId = localStorage.getItem('cart_id')
    if (cartId) {
      loadCart(cartId)
    }
  }, [])

  const loadCart = async (cartId: string) => {
    try {
      const { cart } = await medusaClient.carts.retrieve(cartId)
      setCart(cart)
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
      localStorage.removeItem('cart_id')
    }
  }

  const createCart = async () => {
    setLoading(true)
    try {
      const { cart } = await medusaClient.carts.create()
      setCart(cart)
      localStorage.setItem('cart_id', cart.id)
    } catch (error) {
      console.error('Erro ao criar carrinho:', error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (variantId: string, quantity: number) => {
    if (!cart) {
      await createCart()
    }

    setLoading(true)
    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.create(
        cart!.id,
        {
          variant_id: variantId,
          quantity,
        }
      )
      setCart(updatedCart)
    } catch (error) {
      console.error('Erro ao adicionar item:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart) return

    setLoading(true)
    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.update(
        cart.id,
        lineId,
        { quantity }
      )
      setCart(updatedCart)
    } catch (error) {
      console.error('Erro ao atualizar item:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (lineId: string) => {
    if (!cart) return

    setLoading(true)
    try {
      const { cart: updatedCart } = await medusaClient.carts.lineItems.delete(
        cart.id,
        lineId
      )
      setCart(updatedCart)
    } catch (error) {
      console.error('Erro ao remover item:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    cart,
    loading,
    createCart,
    addItem,
    updateItem,
    removeItem,
  }
}
```

---

## Gerenciamento de Estado

### Context Provider para Cart

```typescript
// contexts/CartContext.tsx
"use client"

import { createContext, useContext, ReactNode } from 'react'
import { useCart } from '@/hooks/useCart'
import type { Cart } from '@medusajs/medusa'

interface CartContextType {
  cart: Cart | null
  loading: boolean
  addItem: (variantId: string, quantity: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const cartData = useCart()

  return (
    <CartContext.Provider value={cartData}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }
  return context
}

// Uso em app/layout.tsx:
// <CartProvider>
//   {children}
// </CartProvider>
```

---

## Best Practices

### 1. Tratamento de Erros

```typescript
try {
  const { products } = await medusaClient.products.list()
  setProducts(products)
} catch (error) {
  if (error.response) {
    // Erro da API
    console.error('API Error:', error.response.data)
  } else {
    // Erro de rede
    console.error('Network Error:', error.message)
  }
}
```

### 2. Loading States

```typescript
{loading && <LoadingSpinner />}
{error && <ErrorMessage message={error.message} />}
{!loading && !error && <ProductList products={products} />}
```

### 3. Cache com SWR (Opcional)

```bash
npm install swr
```

```typescript
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url).then(res => res.json())

function useProducts() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/products`,
    fetcher
  )

  return {
    products: data?.products,
    loading: !error && !data,
    error
  }
}
```

### 4. TypeScript Types

```typescript
// types/medusa.ts
import type { Product as MedusaProduct } from '@medusajs/medusa'

export interface ExtendedProduct extends MedusaProduct {
  technical_specs?: Record<string, any>
  related_product_ids?: string[]
  industrial_category?: string
  certifications?: string[]
  delivery_time_days?: number
  demo_available?: boolean
  technical_doc_url?: string
  demo_video_url?: string
  recommended_applications?: string[]
  installation_complexity?: number
}
```

---

## Próximos Passos

1. Implementar autenticação de clientes
2. Adicionar funcionalidade de checkout
3. Implementar busca avançada com filtros
4. Adicionar reviews e avaliações
5. Implementar wishlist
6. Adicionar comparação de produtos

## Suporte

Para mais informações, consulte:
- [Documentação Oficial do Medusa](https://docs.medusajs.com)
- [API Documentation](./API_DOCUMENTATION.md)
- [README](./README.md)
