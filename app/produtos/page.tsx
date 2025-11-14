"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { Filter, Search, Grid, List, SortAsc, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { type Product } from "@/lib/data/products"
import { useCart } from "@/lib/cart-context"
import { useSearchParams } from "next/navigation"
import { useProducts } from "@/lib/hooks/use-products"
import { useCategories } from "@/lib/hooks/use-categories"
import { medusaProductsToProducts } from "@/lib/utils/medusa-to-product"

// Função para converter nome em slug ou usar handle do Medusa
const createSlug = (product: Product & { handle?: string }) => {
  // Se o produto tem handle do Medusa, usar ele
  if (product.handle) {
    return product.handle
  }
  // Caso contrário, gerar slug do nome
  return product.name.toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
}

function ProductsContent() {
  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const initialCategory = searchParams?.get('categoria') || 'all'

  // Buscar produtos da API Medusa
  const { products: medusaProducts, loading, error, count } = useProducts({
    limit: 100,
  })

  // Buscar categorias da API
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()

  // Converter produtos do Medusa para o formato usado no frontend
  const products = medusaProducts ? medusaProductsToProducts(medusaProducts) : []

  // Mapear categorias da API para o formato usado no frontend
  const categories = apiCategories.map(cat => ({
    id: cat.slug,
    slug: cat.slug,
    name: cat.name,
    description: cat.description,
  }))

  const [filteredProducts, setFilteredProducts] = useState<(Product & { handle?: string })[]>([])
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<'all' | 'with-price' | 'quote-only'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'featured'>('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Obter marcas únicas
  const brands = [...new Set(products.filter(p => p.manufacturer).map(p => p.manufacturer))].sort() as string[]

  // Aplicar filtros
  useEffect(() => {
    if (loading) return
    
    let filtered = [...products]

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      const category = categories.find(c => c.slug === selectedCategory)
      if (category) {
        // Filtrar por slug da categoria (que é o que está no produto)
        filtered = filtered.filter(p => p.category === category.slug)
      }
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.technicalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por marca
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => p.manufacturer && selectedBrands.includes(p.manufacturer))
    }

    // Filtro por preço
    if (priceFilter === 'with-price') {
      filtered = filtered.filter(p => p.hasPrice && p.price)
    } else if (priceFilter === 'quote-only') {
      filtered = filtered.filter(p => p.requiresQuote)
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price':
          if (!a.price && !b.price) return 0
          if (!a.price) return 1
          if (!b.price) return -1
          return (a.price || 0) - (b.price || 0)
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm, selectedBrands, priceFilter, sortBy, loading])

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSearchTerm('')
    setSelectedBrands([])
    setPriceFilter('all')
    setSortBy('featured')
  }

  // Estado de carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marsala-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  // Estado de erro
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar produtos: {error.message}</p>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light text-marsala-800 mb-4">
            Catálogo de <span className="font-semibold">Produtos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Descubra nossa linha completa de equipamentos de automação industrial
          </p>
        </motion.div>

        {/* Layout com Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filtros Avançados */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-80 space-y-6"
          >
            {/* Busca */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-marsala-800 mb-4">Buscar Produtos</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>
            </div>

            {/* Categorias */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-marsala-800 mb-4">Categorias</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-marsala-600 text-white'
                      : 'text-gray-700 hover:bg-marsala-50'
                  }`}
                >
                  Todos ({products.length})
                </button>
                {categoriesLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-marsala-600 mx-auto"></div>
                  </div>
                ) : (
                  categories.map((category) => {
                    const categoryProducts = products.filter(p => p.category === category.slug);
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                          selectedCategory === category.slug
                            ? 'bg-marsala-600 text-white'
                            : 'text-gray-700 hover:bg-marsala-50'
                        }`}
                      >
                        {category.name} ({categoryProducts.length})
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Marcas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-marsala-800 mb-4">Marcas</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                    <input
                      type="checkbox"
                      checked={brand !== undefined && selectedBrands.includes(brand as string)}
                      onChange={() => {
                        if (typeof brand === "string") handleBrandToggle(brand)
                      }}
                      className="mr-3 text-marsala-600 rounded focus:ring-marsala-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Faixa de Preço */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-marsala-800 mb-4">Disponibilidade</h3>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <input
                    type="radio"
                    name="price"
                    checked={priceFilter === 'all'}
                    onChange={() => setPriceFilter('all')}
                    className="mr-3 text-marsala-600 focus:ring-marsala-500"
                  />
                  <span className="text-sm text-gray-700">Todos os produtos</span>
                </label>
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <input
                    type="radio"
                    name="price"
                    checked={priceFilter === 'with-price'}
                    onChange={() => setPriceFilter('with-price')}
                    className="mr-3 text-marsala-600 focus:ring-marsala-500"
                  />
                  <span className="text-sm text-gray-700">Com preço definido</span>
                </label>
                <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                  <input
                    type="radio"
                    name="price"
                    checked={priceFilter === 'quote-only'}
                    onChange={() => setPriceFilter('quote-only')}
                    className="mr-3 text-marsala-600 focus:ring-marsala-500"
                  />
                  <span className="text-sm text-gray-700">Apenas orçamento</span>
                </label>
              </div>
            </div>

            {/* Limpar Filtros */}
            {(selectedBrands.length > 0 || priceFilter !== 'all' || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full rounded-full border-marsala-300 text-marsala-700 hover:bg-marsala-50"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar Filtros
              </Button>
            )}
          </motion.div>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Controles do Topo */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-gray-600">
                  {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 border rounded-full bg-white focus:ring-2 focus:ring-marsala-500 focus:border-marsala-500"
                  >
                    <option value="featured">Destaques</option>
                    <option value="name">Nome A-Z</option>
                    <option value="price">Menor Preço</option>
                  </select>

                  <div className="flex border rounded-full p-1 bg-gray-100">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-full transition-colors ${
                        viewMode === 'grid' ? 'bg-white shadow-sm text-marsala-600' : 'text-gray-600'
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-full transition-colors ${
                        viewMode === 'list' ? 'bg-white shadow-sm text-marsala-600' : 'text-gray-600'
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Produtos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onAddToCart={() => addItem(product, 1)}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Sem resultados */}
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center py-16"
              >
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-500 mb-6">Tente ajustar os filtros ou termo de busca</p>
                <Button onClick={clearFilters} className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full">
                  Limpar Filtros
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente do Card de Produto
function ProductCard({
  product,
  viewMode,
  onAddToCart,
  index
}: {
  product: Product & { handle?: string }
  viewMode: 'grid' | 'list'
  onAddToCart: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className={`bg-white hover:shadow-xl transition-all duration-300 h-full ${
        viewMode === 'list' ? 'overflow-hidden' : ''
      }`}>
        <CardContent className={`p-6 ${viewMode === 'list' ? 'flex items-center gap-6' : ''}`}>
          {/* Imagem */}
          <Link href={`/produtos/${createSlug(product)}`}>
            <div className={`relative bg-gray-100 rounded-lg overflow-hidden group cursor-pointer ${
              viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'h-48 mb-4'
            }`}>
              <Image
                src={product.images[0] || "/product-placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.featured && (
                <span className="absolute top-2 right-2 bg-marsala-600 text-white text-xs px-2 py-1 rounded-full">
                  Destaque
                </span>
              )}
            </div>
          </Link>

          {/* Conteúdo */}
          <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
            <div className={`${viewMode === 'list' ? 'flex justify-between items-start' : ''}`}>
              <div className={`${viewMode === 'list' ? 'flex-1 pr-4' : ''}`}>
                <Link href={`/produtos/${createSlug(product)}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-marsala-600 cursor-pointer transition-colors">
                    {product.name}
                  </h3>
                </Link>
                {product.technicalName && (
                  <p className="text-xs text-gray-500 mb-2">{product.technicalName}</p>
                )}
                <p className={`text-sm text-gray-600 mb-4 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-3'}`}>
                  {product.description}
                </p>

                {/* Especificações - apenas em grid */}
                {viewMode === 'grid' && product.specifications && (
                  <div className="mb-4 space-y-1">
                    {product.specifications.model && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Modelo:</span> {product.specifications.model}
                      </p>
                    )}
                    {product.specifications.voltage && (
                      <p className="text-xs text-gray-500">
                        <span className="font-medium">Tensão:</span> {product.specifications.voltage}
                      </p>
                    )}
                  </div>
                )}

                {product.brand && (
                  <p className="text-xs text-marsala-600 font-medium mb-3">
                    {product.brand}
                  </p>
                )}
              </div>

              {/* Preço e Ações */}
              <div className={`${viewMode === 'list' ? 'text-right' : ''}`}>
                {product.hasPrice && product.price ? (
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-marsala-700">
                      R$ {product.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">à vista</p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-orange-600">Sob consulta</p>
                    <p className="text-xs text-gray-500">Solicite orçamento</p>
                  </div>
                )}

                <div className={`space-y-2 ${viewMode === 'list' ? 'flex space-y-0 space-x-2' : ''}`}>
                  <Button 
                    className="w-full bg-marsala-600 hover:bg-marsala-700 text-white rounded-full"
                    onClick={onAddToCart}
                  >
                    {product.requiresQuote ? 'Adicionar ao Orçamento' : 'Adicionar ao Carrinho'}
                  </Button>
                  <Link href={`/produtos/${product.id}`} className="block">
                    <Button variant="outline" className="w-full rounded-full border-marsala-300 text-marsala-700 hover:bg-marsala-50 hover:text-marsala-800">
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <ProductsContent />
    </Suspense>
  )
}