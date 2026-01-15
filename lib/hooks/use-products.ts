import { useState, useEffect } from 'react'
import medusaClient from '@/lib/medusa-client'

export interface MedusaProduct {
  id: string
  title: string
  subtitle?: string
  description?: string
  handle: string
  thumbnail?: string
  images?: Array<{ url: string; id?: string }>
  variants?: Array<{
    id: string
    title: string
    prices?: Array<{
      amount: number
      currency_code: string
    }>
    inventory_quantity?: number
    sku?: string
  }>
  options?: Array<{
    id: string
    title: string
    values?: Array<{
      id: string
      value: string
    }>
  }>
  metadata?: Record<string, any>
  // Campos customizados do nosso modelo
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
  tags?: Array<{ id: string; value: string }>
}

// Helper para verificar se o produto tem preço ou é "sob consulta"
export function getProductPrice(product: MedusaProduct): { hasPrice: boolean; price?: number; currency?: string } {
  // Verificar se tem tag "sob-consulta"
  const isSobConsulta = product.tags?.some(tag =>
    tag.value.toLowerCase() === 'sob-consulta' ||
    tag.value.toLowerCase() === 'sob consulta'
  )

  if (isSobConsulta) {
    return { hasPrice: false }
  }

  // Verificar se a variante principal tem preço
  const variant = product.variants?.[0]
  const price = variant?.prices?.[0]

  if (price && price.amount > 0) {
    return {
      hasPrice: true,
      price: price.amount / 100, // Converter de centavos para reais
      currency: price.currency_code
    }
  }

  return { hasPrice: false }
}

interface UseProductsOptions {
  limit?: number
  offset?: number
  category_id?: string[]
  collection_id?: string[]
  q?: string
  order?: string
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<MedusaProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await medusaClient.products.list({
          limit: options.limit || 100,
          offset: options.offset || 0,
          category_id: options.category_id,
          collection_id: options.collection_id,
          q: options.q,
          order: options.order,
        })

        setProducts(response.products || [])
        setCount(response.count || 0)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch products'))
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [options.limit, options.offset, options.category_id, options.collection_id, options.q, options.order])

  return { products, loading, error, count }
}

export function useProduct(handleOrId: string) {
  const [product, setProduct] = useState<MedusaProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)

        // Check if it's an ID (starts with "prod_") or a handle
        const isId = handleOrId.startsWith('prod_')

        if (isId) {
          // Fetch by ID
          const response = await medusaClient.products.retrieve(handleOrId)
          setProduct(response.product)
        } else {
          // Fetch by handle - use list with handle filter
          const response = await medusaClient.products.list({ handle: handleOrId })
          if (response.products && response.products.length > 0) {
            setProduct(response.products[0])
          } else {
            setError(new Error('Produto não encontrado'))
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch product'))
      } finally {
        setLoading(false)
      }
    }

    if (handleOrId) {
      fetchProduct()
    }
  }, [handleOrId])

  return { product, loading, error }
}

