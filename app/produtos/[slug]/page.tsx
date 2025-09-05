"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, FileText, Star, Zap, Shield, Award, Heart, Share2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { products, type Product } from "@/lib/data/products"
import { useCart } from "@/lib/cart-context"
import { useSearchParams } from "next/navigation"

interface ProductPageProps {
  params: {
    slug: string
  }
}

function ProductContent({ params }: ProductPageProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("especificacoes")
  
  // Find product by slug (using product ID)
  const product = products.find(p => p.id === params.slug)

  // Get related products from same category (excluding current product)
  const relatedProducts = product ? 
    products.filter(p => 
      p.category === product.category && 
      p.id !== product.id
    ).slice(0, 3) : []

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Produto não encontrado</h1>
          <Link href="/produtos">
            <Button variant="outline" className="border-marsala-300 text-marsala-700 hover:bg-marsala-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Produtos
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-marsala-600">Home</Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-marsala-600">Produtos</Link>
          <span>/</span>
          <span className="text-marsala-700 font-medium">{product.name}</span>
        </nav>

        {/* Voltar */}
        <Link href="/produtos" className="inline-flex items-center text-marsala-700 hover:text-marsala-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos Produtos
        </Link>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <Image
                src={product.images[0] || "/images/products/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-marsala-600 text-white">
                  Destaque
                </Badge>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{product.description}</p>
              
              {/* Avaliações */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(4.2) • 28 avaliações</span>
              </div>

              {/* Características principais */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Zap className="h-5 w-5 text-marsala-600" />
                  <span>Alta Performance</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="h-5 w-5 text-marsala-600" />
                  <span>Proteção IP67</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Award className="h-5 w-5 text-marsala-600" />
                  <span>Certificado CE</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Heart className="h-5 w-5 text-marsala-600" />
                  <span>2 Anos Garantia</span>
                </div>
              </div>
            </div>

            {/* Preço e Compra */}
            <Card className="border-marsala-200 shadow-lg">
              <CardContent className="p-6">
                <div className="mb-6">
                  {product.price ? (
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-marsala-700">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 line-through">
                        R$ {(product.price * 1.2).toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        -17%
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-marsala-700">
                      Consulte o preço
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {product.price ? "à vista no PIX ou em até 12x no cartão" : "Solicite um orçamento personalizado"}
                  </p>
                </div>

                {/* Quantidade */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-gray-700 font-medium">Quantidade:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={decrementQuantity}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={incrementQuantity}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-marsala-600 hover:bg-marsala-700 text-white h-12 text-lg"
                  >
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Adicionar ao Carrinho
                    </>
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" className="flex-1 border-marsala-300 text-marsala-700">
                      <Heart className="h-4 w-4 mr-2" />
                      Favoritar
                    </Button>
                    <Button variant="outline" className="flex-1 border-marsala-300 text-marsala-700">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-0">
              {/* Tab Headers */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { id: "especificacoes", label: "Especificações" },
                    { id: "descricao", label: "Descrição Detalhada" },
                    { id: "instalacao", label: "Instalação" },
                    { id: "suporte", label: "Suporte" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-marsala-600 text-marsala-600"
                          : "border-transparent text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === "especificacoes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">Características Técnicas</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Marca:</dt>
                          <dd className="font-medium">{product.manufacturer}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Modelo:</dt>
                          <dd className="font-medium">{product.name}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Tensão:</dt>
                          <dd className="font-medium">24V DC</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Corrente:</dt>
                          <dd className="font-medium">2A máx.</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Protocolo:</dt>
                          <dd className="font-medium">Modbus RTU/TCP</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">Dimensões e Peso</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Largura:</dt>
                          <dd className="font-medium">120 mm</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Altura:</dt>
                          <dd className="font-medium">85 mm</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Profundidade:</dt>
                          <dd className="font-medium">58 mm</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Peso:</dt>
                          <dd className="font-medium">320g</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}

                {activeTab === "descricao" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {product.description} Este produto oferece uma solução completa e confiável 
                      para aplicações industriais exigentes, com características técnicas avançadas 
                      e facilidade de integração.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Desenvolvido com tecnologia de ponta, garante alta performance e durabilidade 
                      em ambientes industriais severos. Sua interface intuitiva facilita a configuração 
                      e operação, reduzindo o tempo de implementação.
                    </p>
                    <h4 className="font-semibold text-gray-800 mb-3">Principais Benefícios:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Alta confiabilidade e durabilidade</li>
                      <li>Interface amigável e intuitiva</li>
                      <li>Suporte a múltiplos protocolos de comunicação</li>
                      <li>Instalação e configuração simplificadas</li>
                      <li>Suporte técnico especializado</li>
                    </ul>
                  </div>
                )}

                {activeTab === "instalacao" && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Guia de Instalação</h3>
                    <div className="space-y-4 text-gray-600">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">1. Preparação</h4>
                        <p>Verifique se todos os componentes estão inclusos na embalagem antes de iniciar a instalação.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">2. Montagem</h4>
                        <p>Monte o dispositivo no painel elétrico seguindo as especificações de espaçamento mínimo.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">3. Conexões</h4>
                        <p>Realize as conexões elétricas conforme o diagrama fornecido no manual técnico.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">4. Configuração</h4>
                        <p>Configure os parâmetros utilizando o software de configuração ou interface local.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "suporte" && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Suporte Técnico</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Contatos</h4>
                        <div className="space-y-2 text-gray-600">
                          <p>📞 (11) 3090-3687</p>
                          <p>📧 suporte@althionlab.com</p>
                          <p>🕐 Seg-Sex: 8h às 18h</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Recursos</h4>
                        <div className="space-y-2">
                          <Link href="#" className="block text-marsala-600 hover:text-marsala-700">
                            📄 Manual Técnico
                          </Link>
                          <Link href="#" className="block text-marsala-600 hover:text-marsala-700">
                            💾 Software de Configuração
                          </Link>
                          <Link href="#" className="block text-marsala-600 hover:text-marsala-700">
                            🎥 Vídeos Tutoriais
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Produtos Relacionados */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="bg-white hover:shadow-lg transition-all duration-300 h-full group">
                    <CardContent className="p-4">
                      <div className="relative h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <Image
                          src={relatedProduct.images[0] || "/images/products/placeholder.jpg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {relatedProduct.featured && (
                          <span className="absolute top-2 right-2 bg-marsala-600 text-white text-xs px-2 py-1 rounded-full">
                            Destaque
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
                        {relatedProduct.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {relatedProduct.hasPrice && relatedProduct.price ? (
                          <div>
                            <p className="text-lg font-bold text-marsala-700">
                              R$ {relatedProduct.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">à vista</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-lg font-semibold text-gray-700">Sob consulta</p>
                            <p className="text-xs text-gray-500">Solicitar orçamento</p>
                          </div>
                        )}
                        
                        <Link href={`/produtos/${relatedProduct.id}`}>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-marsala-300 text-marsala-700 hover:bg-marsala-50"
                          >
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando produto...</div>}>
      <ProductContent params={params} />
    </Suspense>
  )
}