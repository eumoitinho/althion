'use client'

import { useState, useEffect } from 'react'
import { 
  getHomeContent, 
  getHomeContentBySlug, 
  getHomeContentByType,
  getSolutions,
  getSolutionBySlug,
  getPages,
  getPageBySlug
} from '@/lib/sanity.queries'

export interface SanityHomeContent {
  _id: string
  _type: 'homeContent'
  slug: { current: string }
  type: string
  title: string
  subtitle?: string
  description?: string
  content?: any
  customContent?: string
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  video?: string
  buttons?: Array<{
    text: string
    link: string
    variant: 'primary' | 'secondary' | 'outline'
  }>
  order?: number
  published?: boolean
}

export interface SanitySolution {
  _id: string
  _type: 'solution'
  title: string
  slug: { current: string }
  description: string
  icon?: string
  category?: string
  features?: string[]
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  link?: string
  order?: number
  published?: boolean
}

export interface SanityPage {
  _id: string
  _type: 'page'
  title: string
  slug: { current: string }
  content?: any
  hero?: {
    title?: string
    subtitle?: string
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
    video?: string
  }
  sections?: Array<{
    type: string
    title?: string
    content?: any
    cards?: Array<{
      title: string
      description?: string
      icon?: string
      image?: {
        asset: {
          _ref: string
          _type: 'reference'
        }
      }
      link?: string
    }>
    stats?: Array<{
      label: string
      value: string
    }>
    contact?: {
      address?: string
      phone?: string
      email?: string
    }
  }>
  seo?: {
    title?: string
    description?: string
    image?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
  published?: boolean
}

export function useSanityHomeContent() {
  const [content, setContent] = useState<SanityHomeContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true)
        setError(null)
        const data = await getHomeContent()
        setContent(data || [])
      } catch (err) {
        console.error('Error fetching home content:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch home content'))
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  return { content, loading, error }
}

export function useSanityHomeContentBySlug(slug: string) {
  const [content, setContent] = useState<SanityHomeContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    async function fetchContent() {
      try {
        setLoading(true)
        setError(null)
        const data = await getHomeContentBySlug(slug)
        setContent(data || null)
      } catch (err) {
        console.error('Error fetching home content by slug:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch home content'))
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [slug])

  return { content, loading, error }
}

export function useSanityHomeContentByType(type: string) {
  const [content, setContent] = useState<SanityHomeContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!type) {
      setLoading(false)
      return
    }

    async function fetchContent() {
      try {
        setLoading(true)
        setError(null)
        const data = await getHomeContentByType(type)
        setContent(data || [])
      } catch (err) {
        console.error('Error fetching home content by type:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch home content'))
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [type])

  return { content, loading, error }
}

export function useSanitySolutions() {
  const [solutions, setSolutions] = useState<SanitySolution[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSolutions() {
      try {
        setLoading(true)
        setError(null)
        const data = await getSolutions()
        setSolutions(data || [])
      } catch (err) {
        console.error('Error fetching solutions:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch solutions'))
      } finally {
        setLoading(false)
      }
    }

    fetchSolutions()
  }, [])

  return { solutions, loading, error }
}

export function useSanitySolutionBySlug(slug: string) {
  const [solution, setSolution] = useState<SanitySolution | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    async function fetchSolution() {
      try {
        setLoading(true)
        setError(null)
        const data = await getSolutionBySlug(slug)
        setSolution(data || null)
      } catch (err) {
        console.error('Error fetching solution by slug:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch solution'))
      } finally {
        setLoading(false)
      }
    }

    fetchSolution()
  }, [slug])

  return { solution, loading, error }
}

export function useSanityPages() {
  const [pages, setPages] = useState<SanityPage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPages() {
      try {
        setLoading(true)
        setError(null)
        const data = await getPages()
        setPages(data || [])
      } catch (err) {
        console.error('Error fetching pages:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch pages'))
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [])

  return { pages, loading, error }
}

export function useSanityPageBySlug(slug: string) {
  const [page, setPage] = useState<SanityPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    async function fetchPage() {
      try {
        setLoading(true)
        setError(null)
        const data = await getPageBySlug(slug)
        setPage(data || null)
      } catch (err) {
        console.error('Error fetching page by slug:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch page'))
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [slug])

  return { page, loading, error }
}
