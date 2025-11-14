import { useState, useEffect } from 'react'
import medusaClient from '@/lib/medusa-client'

export interface Category {
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

interface UseCategoriesOptions {
  slug?: string
}

export function useCategories(options: UseCategoriesOptions = {}) {
  const [categories, setCategories] = useState<Category[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true)
        setError(null)

        const url = options.slug
          ? `/store/categories?slug=${options.slug}`
          : '/store/categories'

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'}${url}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`)
        }

        const data = await response.json()

        if (options.slug) {
          setCategory(data.category)
          setCategories([])
        } else {
          setCategories(data.categories || [])
          setCategory(null)
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch categories'))
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [options.slug])

  return { categories, category, loading, error }
}

export function useCategory(slug: string) {
  const { category, loading, error } = useCategories({ slug })
  return { category, loading, error }
}

