"use client"

import { motion } from "framer-motion"
import { ArrowRight, Settings, Cpu, Gauge, Zap, Activity, Shield, ChevronRight, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { categories, getProductsByCategory, getFeaturedProducts } from "@/lib/data/products"
import { useCart } from "@/lib/cart-context"

// Hero Section com carrossel de imagens
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroImages = [
    {
      src: "/images/hero/pharmaceutical-1.jpg",
      alt: "Automação Farmacêutica - Linha de Produção"
    },
    {
      src: "/images/hero/pharmaceutical-2.jpg", 
      alt: "Controle de Qualidade Farmacêutica"
    },
    {
      src: "/images/hero/pharmaceutical-3.jpg",
      alt: "Instrumentação Industrial Farmacêutica"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Overlay marsala transparente para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-marsala-900/70 via-marsala-800/50 to-marsala-900/70"></div>
        <div className="absolute inset-0 bg-marsala-600/30"></div>
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
            Especialistas em <span className="font-semibold text-marsala-300">Indústria Farmacêutica</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 text-white/90 font-light leading-relaxed"
          >
            Soluções em automação, instrumentação e controle para ciências da vida
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/produtos">
              <Button
                size="lg"
                className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-12 py-6 text-xl font-medium transition-all duration-500 hover:scale-105 shadow-2xl"
              >
                Ver Catálogo
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            
            <Link href="/orcamento">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/80 text-white hover:bg-white/20 rounded-full px-12 py-6 text-xl font-medium transition-all duration-500"
              >
                Solicitar Orçamento
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
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
              Althion Lab - Especialistas na <span className="font-semibold">Indústria Farmacêutica</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              A Althion é uma empresa especializada no setor industrial, com foco na indústria farmacêutica 
              e nas ciências da vida. Destacamo-nos pela criação de soluções inovadoras e multidisciplinares, 
              que aliam alta tecnologia, qualidade e custo-benefício.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Com ampla experiência e profundo conhecimento das Resoluções de Diretoria Colegiada (RDCs) em vigor, 
              oferecemos serviços e produtos diferenciados, sempre adaptados às necessidades e metas de cada cliente.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-marsala-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Conformidade RDC</h4>
                  <p className="text-sm text-gray-600">CFR 21 Part 11, NBR 17025</p>
                </div>
              </div>
              <div className="flex items-start">
                <Settings className="h-6 w-6 text-marsala-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Multidisciplinar</h4>
                  <p className="text-sm text-gray-600">Automação, Instrumentação, Elétrica</p>
                </div>
              </div>
            </div>

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
              <Image
                src="/factory-automation.jpg"
                alt="Automação Industrial Althion"
                width={600}
                height={400}
                className="rounded-2xl w-full"
              />
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <h3 className="text-3xl font-bold text-marsala-700">500+</h3>
                  <p className="text-sm text-gray-600">Clientes Ativos</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-marsala-700">15k+</h3>
                  <p className="text-sm text-gray-600">Produtos Vendidos</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-marsala-700">98%</h3>
                  <p className="text-sm text-gray-600">Satisfação</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Seção de Soluções e Benefícios
function SolutionsSection() {
  const solutions = [
    {
      icon: Cpu,
      title: "Retrofit de Máquinas",
      description: "Modernização de equipamentos industriais com tecnologia de última geração",
      benefits: ["Aumento de produtividade", "Redução de paradas", "Economia de energia"]
    },
    {
      icon: Gauge,
      title: "Integração de Sistemas",
      description: "Conectividade total entre CLPs, IHMs e sistemas supervisórios",
      benefits: ["Gestão centralizada", "Monitoramento em tempo real", "Relatórios automáticos"]
    },
    {
      icon: Activity,
      title: "Manutenção Preditiva",
      description: "Sensores inteligentes para prevenção de falhas e otimização de manutenção",
      benefits: ["Prevenção de falhas", "Redução de custos", "Maior disponibilidade"]
    }
  ]

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
            Soluções Completas em <span className="font-semibold">Automação</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções integradas que transformam sua operação industrial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-white to-warm-50 border-warm-200 h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-marsala-500 to-marsala-600 rounded-full flex items-center justify-center mb-6">
                    <solution.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-marsala-800 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-marsala-500 mr-2" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
  const [selectedCategory, setSelectedCategory] = useState('clp-automacao')
  const [displayCount, setDisplayCount] = useState(6)
  const categoryProducts = getProductsByCategory(categories.find(c => c.id === selectedCategory)?.slug || 'clp-automacao', displayCount)

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.slice(0, 6).map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-marsala-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-marsala-50 border border-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Produtos da Categoria */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {categoryProducts.map((product, index) => (
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
                      {product.requiresQuote ? 'Adicionar ao Orçamento' : 'Adicionar ao Carrinho'}
                    </Button>
                    <Link href={`/produtos/${product.id}`} className="block">
                      <Button variant="outline" className="w-full rounded-full border-marsala-300 text-marsala-700 hover:bg-marsala-50">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Botões de Ação */}
        <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
          {displayCount < 15 && (
            <Button
              onClick={() => setDisplayCount(prev => Math.min(prev + 6, 15))}
              variant="outline" 
              size="lg" 
              className="border-marsala-300 text-marsala-700 hover:bg-marsala-50 rounded-full px-8"
            >
              Carregar Mais Produtos
            </Button>
          )}
          <Link href={`/produtos?categoria=${categories.find(c => c.id === selectedCategory)?.slug}`}>
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