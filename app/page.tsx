"use client"

import { motion } from "framer-motion"
import { ArrowRight, Settings, Cpu, Gauge, Zap, Activity, Shield, ChevronRight, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { getProductsByCategory, getFeaturedProducts } from "@/lib/data/products"
import { useCart } from "@/lib/cart-context"
import { useCategories } from "@/lib/hooks/use-categories"
import { useSanityHomeContentBySlug } from "@/lib/hooks/use-sanity-content"
import { useProducts } from "@/lib/hooks/use-products"
import { medusaProductsToProducts } from "@/lib/utils/medusa-to-product"
import { sanityHomeContentToContent } from "@/lib/utils/sanity-to-content"

// Hero Section com vídeo de fundo
function HeroSection() {
  const { content: sanityHeroContent, loading } = useSanityHomeContentBySlug('home-hero')
  const heroContent = sanityHomeContentToContent(sanityHeroContent)

  if (loading) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marsala-600"></div>
      </section>
    )
  }

  const hero = heroContent || {
    title: "Especialistas em Indústria Farmacêutica",
    subtitle: "Soluções em automação, instrumentação e controle para ciências da vida",
    content: {
      video: "/4751094_Pharmaceutical_Quality_1280x720.mp4",
      image: "/automation-hero.jpg",
      primaryButton: { text: "Ver Catálogo", link: "/produtos" },
      secondaryButton: { text: "Solicitar Orçamento", link: "/orcamento" }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        {hero.content?.video && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={hero.content.video} type="video/mp4" />
            {/* Fallback para browsers que não suportam vídeo */}
            <Image
              src={hero.content?.image || "/automation-hero.jpg"}
              alt={hero.title}
              fill
              className="object-cover"
              priority
            />
          </video>
        )}
        {!hero.content?.video && hero.content?.image && (
          <Image
            src={hero.content.image}
            alt={hero.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Overlay preto transparente para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-20 relative text-center">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight text-white"
          >
            {hero.title.includes('Indústria Farmacêutica') ? (
              <>
                {hero.title.split('Indústria Farmacêutica')[0]}
                <span className="font-semibold text-marsala-600">Indústria Farmacêutica</span>
                {hero.title.split('Indústria Farmacêutica')[1]}
              </>
            ) : (
              hero.title
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 text-white/90 font-light leading-relaxed"
          >
            {hero.subtitle || hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {hero.content?.primaryButton && (
              <Link href={hero.content.primaryButton.link}>
                <Button
                  size="lg"
                  className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-12 py-6 text-xl font-medium transition-all duration-500 hover:scale-105 shadow-2xl"
                >
                  {hero.content.primaryButton.text}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            )}
            
            {hero.content?.secondaryButton && (
              <Link href={hero.content.secondaryButton.link}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-marsala-300 text-marsala-600 bg-white/90 hover:bg-white hover:text-marsala-700 rounded-full px-12 py-6 text-xl font-medium transition-all duration-500"
                >
                  {hero.content.secondaryButton.text}
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/80 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// Seção Sobre a Empresa
function AboutSection() {
  const { content: sanityAboutContent, loading } = useSanityHomeContentBySlug('home-about')
  const aboutContent = sanityHomeContentToContent(sanityAboutContent)

  if (loading) {
    return (
      <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-warm-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marsala-600 mx-auto"></div>
        </div>
      </section>
    )
  }

  const about = aboutContent || {
    title: "Althion Lab - Especialistas na Indústria Farmacêutica",
    description: "A Althion é uma empresa especializada no setor industrial, com foco na indústria farmacêutica e nas ciências da vida.",
    content: {
      image: "/dois-colegas-em-um-fabrica.jpg",
      features: [
        { title: "Conformidade RDC", description: "CFR 21 Part 11, NBR 17025", icon: "Shield" },
        { title: "Multidisciplinar", description: "Automação, Instrumentação, Elétrica", icon: "Settings" }
      ],
      stats: [
        { value: "500+", label: "Clientes Ativos" },
        { value: "15k+", label: "Produtos Vendidos" },
        { value: "98%", label: "Satisfação" }
      ]
    }
  }

  const iconMap: Record<string, any> = {
    Shield,
    Settings,
    Cpu,
    Gauge,
    Activity,
  }

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-warm-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-marsala-800 mb-6">
              {about.title.includes('Indústria Farmacêutica') ? (
                <>
                  {about.title.split('Indústria Farmacêutica')[0]}
                  <span className="font-semibold text-marsala-600">Indústria Farmacêutica</span>
                  {about.title.split('Indústria Farmacêutica')[1]}
                </>
              ) : (
                about.title
              )}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {about.description}
            </p>
            {about.content?.features && (
              <div className="grid grid-cols-2 gap-6 mb-8">
                {about.content.features.map((feature: any, index: number) => {
                  const IconComponent = iconMap[feature.icon] || Settings
                  return (
                    <div key={index} className="flex items-start">
                      <IconComponent className="h-6 w-6 text-marsala-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <Link href="/sobre">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-3">
                Conheça Nossa História
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-marsala-100 to-warm-100 rounded-3xl p-8 shadow-xl">
              {about.content?.image && (
                <Image
                  src={about.content.image}
                  alt={about.title}
                  width={600}
                  height={400}
                  className="rounded-2xl w-full"
                />
              )}
              {about.content?.stats && (
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {about.content.stats.map((stat: any, index: number) => (
                    <div key={index}>
                      <h3 className="text-3xl font-bold text-marsala-700">{stat.value}</h3>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Seção de Soluções e Benefícios
function SolutionsSection() {
  const { content: sanitySolutionsContent, loading } = useSanityHomeContentBySlug('home-solutions')
  const solutionsContent = sanityHomeContentToContent(sanitySolutionsContent)

  if (loading) {
    return (
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marsala-600 mx-auto"></div>
        </div>
      </section>
    )
  }

  const solutions = solutionsContent?.content?.solutions || [
    {
      icon: "Cpu",
      title: "Retrofit de Máquinas",
      description: "Modernização de equipamentos industriais com tecnologia de última geração",
      benefits: ["Aumento de produtividade", "Redução de paradas", "Economia de energia"]
    },
    {
      icon: "Gauge",
      title: "Integração de Sistemas",
      description: "Conectividade total entre CLPs, IHMs e sistemas supervisórios",
      benefits: ["Gestão centralizada", "Monitoramento em tempo real", "Relatórios automáticos"]
    },
    {
      icon: "Activity",
      title: "Manutenção Preditiva",
      description: "Sensores inteligentes para prevenção de falhas e otimização de manutenção",
      benefits: ["Prevenção de falhas", "Redução de custos", "Maior disponibilidade"]
    }
  ]

  const iconMap: Record<string, any> = {
    Cpu,
    Gauge,
    Activity,
    Shield,
    Settings,
  }

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-marsala-800 mb-6">
            {(solutionsContent?.title || "Soluções Completas em Automação").includes('Automação') ? (
              <>
                {(solutionsContent?.title || "Soluções Completas em Automação").split('Automação')[0]}
                <span className="font-semibold">Automação</span>
                {(solutionsContent?.title || "Soluções Completas em Automação").split('Automação')[1]}
              </>
            ) : (
              solutionsContent?.title || "Soluções Completas em Automação"
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {solutionsContent?.subtitle || solutionsContent?.description || "Oferecemos soluções integradas que transformam sua operação industrial"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution: any, index: number) => {
            const IconComponent = iconMap[solution.icon] || Cpu
            return (
              <motion.div
                key={solution.title || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-white to-warm-50 border-warm-200 h-full hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-marsala-500 to-marsala-600 rounded-full flex items-center justify-center mb-6">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-marsala-800 mb-3">{solution.title}</h3>
                    <p className="text-gray-600 mb-6">{solution.description}</p>
                    {solution.benefits && (
                      <ul className="space-y-2">
                        {solution.benefits.map((benefit: string, idx: number) => (
                          <li key={idx} className="flex items-center text-sm">
                            <ChevronRight className="h-4 w-4 text-marsala-500 mr-2" />
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/solucoes">
            <Button variant="outline" className="border-marsala-600 text-marsala-600 hover:bg-marsala-50 rounded-full px-8 py-3">
              Conhecer Todas as Soluções
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Seção de Produtos por Categoria
function ProductsSection() {
  const { addItem } = useCart()
  const { categories: apiCategories, loading: categoriesLoading } = useCategories()
  const { products: medusaProducts, loading: productsLoading } = useProducts({ limit: 100 })
  const products = medusaProducts ? medusaProductsToProducts(medusaProducts) : []
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(6)

  // Usar categorias da API
  const categories = apiCategories.length > 0 ? apiCategories.map(cat => ({
    id: cat.slug,
    slug: cat.slug,
    name: cat.name,
    description: cat.description,
  })) : []

  // Selecionar primeira categoria por padrão quando categorias são carregadas
  useEffect(() => {
    if (apiCategories.length > 0 && !selectedCategory) {
      setSelectedCategory(apiCategories[0].slug)
    }
  }, [apiCategories.length, selectedCategory])

  // Filtrar produtos por categoria
  const filteredProducts = products.filter(p => {
    if (!categories.length || !selectedCategory) return true
    // Buscar por slug da categoria selecionada
    const selectedCat = categories.find(c => c.slug === selectedCategory)
    if (!selectedCat) return true
    // Comparar com o campo category do produto (deve corresponder ao slug da categoria)
    return p.category === selectedCat.slug
  })

  const categoryProducts = filteredProducts.slice(0, displayCount)

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    setDisplayCount(6) // Reset para 6 produtos quando muda de categoria
  }

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-warm-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-light text-marsala-800 mb-6">
            Nosso <span className="font-semibold">Catálogo de Produtos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Equipamentos de alta qualidade das melhores marcas do mercado
          </p>
        </motion.div>

        {/* Tabs de Categorias */}
        {categoriesLoading ? (
          <div className="flex justify-center mb-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-marsala-600"></div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.slug
                    ? 'bg-marsala-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-marsala-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Produtos da Categoria */}
        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {categoryProducts.length > 0 ? categoryProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    {/* Imagem do Produto */}
                    <div className="relative h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden group">
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

                    {/* Informações do Produto */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                    {product.technicalName && (
                      <p className="text-xs text-gray-500 mb-2">{product.technicalName}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                    {/* Especificações */}
                    {product.specifications && (
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

                    {/* Preço e Ações */}
                    <div className="flex items-center justify-between">
                      {product.hasPrice && product.price ? (
                        <div>
                          <p className="text-2xl font-bold text-marsala-700">
                            R$ {product.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">à vista</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg font-semibold text-orange-600">Sob consulta</p>
                          <p className="text-xs text-gray-500">Solicite orçamento</p>
                        </div>
                      )}
                    </div>

                    {/* Botões */}
                    <div className="mt-4 space-y-2">
                      <Button
                        className="w-full bg-marsala-600 hover:bg-marsala-700 text-white rounded-full"
                        onClick={() => addItem(product, 1)}
                      >
                        Adicionar ao Carrinho
                      </Button>
                      <Button asChild variant="outline" className="w-full rounded-full border-marsala-300 text-marsala-700 hover:bg-marsala-50 hover:text-marsala-800">
                        <Link href={`/produtos/${product.handle || product.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600">Nenhum produto encontrado nesta categoria.</p>
              </div>
            )}
          </div>
        )}

        {/* Botões de Ação */}
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          {displayCount < filteredProducts.length && (
            <Button
              onClick={() => setDisplayCount(prev => Math.min(prev + 6, filteredProducts.length))}
              variant="outline" 
              size="lg" 
              className="border-marsala-300 text-marsala-700 hover:bg-marsala-50 rounded-full px-8"
            >
              Carregar Mais Produtos
            </Button>
          )}
          <Link href={`/produtos${selectedCategory ? `?categoria=${selectedCategory}` : ''}`}>
            <Button 
              size="lg" 
              className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8"
            >
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Seção de CTA
function CTASection() {
  return (
    <section className="py-20 px-8 bg-gradient-to-br from-marsala-700 to-marsala-900">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <h2 className="text-4xl font-light mb-6">
            Pronto para <span className="font-semibold">Automatizar sua Indústria?</span>
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Entre em contato com nossos especialistas e descubra a solução ideal para seu negócio
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href="/orcamento">
              <Button
                size="lg"
                className="bg-white text-marsala-700 hover:bg-gray-100 rounded-full px-12 py-6 text-xl font-semibold"
              >
                Solicitar Orçamento
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/20 rounded-full px-12 py-6 text-xl"
              >
                Falar com Consultor
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <span className="text-lg">(11) 3090-3687</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span className="text-lg">contato@althionlab.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Componente Principal
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <ProductsSection />
      <CTASection />
    </div>
  )
}