import { useState, useEffect } from 'react'

export interface Content {
  id: string
  slug: string
  type: string
  title: string
  subtitle?: string
  description?: string
  content?: Record<string, any>
  image?: string
  video?: string
  is_active: boolean
  order: number
  metadata?: Record<string, any>
}

interface UseContentOptions {
  type?: string
  slug?: string
}

export function useContent(options: UseContentOptions = {}) {
  const [content, setContent] = useState<Content[]>([])
  const [singleContent, setSingleContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (options.type) params.append('type', options.type)
        if (options.slug) params.append('slug', options.slug)

        const url = `/store/content${params.toString() ? `?${params.toString()}` : ''}`

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'}${url}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.statusText}`)
        }

        const data = await response.json()

        if (options.slug) {
          setSingleContent(data.content)
          setContent([])
        } else {
          setContent(Array.isArray(data.content) ? data.content : [])
          setSingleContent(null)
        }
      } catch (err) {
        console.error('Error fetching content:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch content'))
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [options.type, options.slug])

  return { content, singleContent, loading, error }
}

export function useContentByType(type: string) {
  const { content, loading, error } = useContent({ type })
  return { content, loading, error }
}

export function useContentBySlug(slug: string) {
  const { singleContent, loading, error } = useContent({ slug })
  return { content: singleContent, loading, error }
}

