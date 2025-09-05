"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { Filter, Search, Grid, List, SortAsc, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { categories, products, type Product } from "@/lib/data/products"
import { useCart } from "@/lib/cart-context"
import { useSearchParams } from "next/navigation"

// Função para converter nome em slug
const createSlug = (name: string) => {
  return name.toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
}

function ProductsContent() {
  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const initialCategory = searchParams?.get('categoria') || 'all'

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<'all' | 'with-price' | 'quote-only'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'featured'>('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Obter marcas únicas
  const brands = [...new Set(products.filter(p => p.brand).map(p => p.brand))].sort()

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...products]

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      const category = categories.find(c => c.slug === selectedCategory)
      if (category) {
        filtered = filtered.filter(p => p.category === category.id)
      }
    }

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.technicalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por marca
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => p.brand && selectedBrands.includes(p.brand))
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
  }, [selectedCategory, searchTerm, selectedBrands, priceFilter, sortBy])

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

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
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

        {/* Controles */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Busca e Controles */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtros {(selectedBrands.length > 0 || priceFilter !== 'all') && `(${selectedBrands.length + (priceFilter !== 'all' ? 1 : 0)})`}
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border rounded-full bg-white"
              >
                <option value="featured">Destaques</option>
                <option value="name">Nome A-Z</option>
                <option value="price">Menor Preço</option>
              </select>

              <div className="flex border rounded-full p-1 bg-gray-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-marsala-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-marsala-50'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.slug
                    ? 'bg-marsala-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-marsala-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Filtros Expandidos */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t pt-4 mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Marcas */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Marcas</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="mr-2"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Preço */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Disponibilidade de Preço</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        checked={priceFilter === 'all'}
                        onChange={() => setPriceFilter('all')}
                        className="mr-2"
                      />
                      <span className="text-sm">Todos</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        checked={priceFilter === 'with-price'}
                        onChange={() => setPriceFilter('with-price')}
                        className="mr-2"
                      />
                      <span className="text-sm">Com preço</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        checked={priceFilter === 'quote-only'}
                        onChange={() => setPriceFilter('quote-only')}
                        className="mr-2"
                      />
                      <span className="text-sm">Apenas orçamento</span>
                    </label>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex flex-col justify-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full rounded-full"
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Lista de Produtos */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              onAddToCart={() => addItem(product)}
              index={index}
            />
          ))}
        </div>

        {/* Sem resultados */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500 mb-6">Tente ajustar os filtros ou termo de busca</p>
            <Button onClick={clearFilters} className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full">
              Limpar Filtros
            </Button>
          </div>
        )}
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
  product: Product
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
          <Link href={`/produtos/${createSlug(product.name)}`}>
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
                <Link href={`/produtos/${createSlug(product.name)}`}>
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
                  <Link href={`/produtos/${createSlug(product.name)}`} className="block">
                    <Button variant="outline" className="w-full rounded-full border-marsala-300 text-marsala-700 hover:bg-marsala-50">
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