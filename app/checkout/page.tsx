"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, CreditCard, User, Building, Truck, Shield, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

export default function CheckoutPage() {
  const { items, removeItem, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    
    // Endereço de entrega
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    
    // Dados de pagamento
    formaPagamento: "",
    numeroCartao: "",
    validade: "",
    cvv: "",
    nomeCartao: "",
    
    // Empresa (para nota fiscal)
    isEmpresa: false,
    razaoSocial: "",
    cnpj: "",
    inscricaoEstadual: ""
  })

  // Filtrar apenas itens que têm preço (para compra)
  const purchaseItems = items.filter(item => item.product.price)
  const total = purchaseItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  const frete = total > 500 ? 0 : 50 // Frete grátis acima de R$ 500
  const totalFinal = total + frete

  useEffect(() => {
    if (purchaseItems.length === 0) {
      // Redirecionar se não há itens para compra
    }
  }, [purchaseItems.length])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simular processamento do pagamento
    const pedidoData = {
      ...formData,
      produtos: purchaseItems.map(item => ({
        id: item.product.id,
        nome: item.product.name,
        preco: item.product.price,
        quantidade: item.quantity,
        subtotal: item.product.price * item.quantity
      })),
      subtotal: total,
      frete: frete,
      total: totalFinal,
      data: new Date().toISOString(),
      numero_pedido: Math.random().toString(36).substr(2, 9).toUpperCase()
    }

    console.log("Pedido processado:", pedidoData)
    alert(`Pedido confirmado! Número: ${pedidoData.numero_pedido}`)
    
    // Limpar carrinho dos itens comprados
    purchaseItems.forEach(item => removeItem(item.product.id))
    
    setCurrentStep(4) // Tela de sucesso
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (purchaseItems.length === 0 && currentStep !== 4) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Carrinho vazio</h1>
            <p className="text-gray-600 mb-8">
              Adicione produtos com preço ao seu carrinho para finalizar a compra.
            </p>
            <Link href="/produtos">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white px-8 py-3">
                Ver Produtos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Pedido Confirmado!</h1>
            <p className="text-gray-600 mb-8">
              Seu pedido foi processado com sucesso. Você receberá um e-mail de confirmação em breve.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <Button variant="outline" className="border-marsala-300 text-marsala-700">
                  Voltar ao Início
                </Button>
              </Link>
              <Link href="/produtos">
                <Button className="bg-marsala-600 hover:bg-marsala-700 text-white">
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-marsala-600 to-marsala-700 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/produtos" className="inline-flex items-center text-marsala-100 hover:text-white mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Produtos
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Finalizar Compra</h1>
            <p className="text-xl text-marsala-100">
              Complete seus dados para finalizar o pedido
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[
              { step: 1, title: "Dados" },
              { step: 2, title: "Entrega" },
              { step: 3, title: "Pagamento" }
            ].map(({ step, title }) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? "bg-marsala-600 text-white" 
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {step}
                </div>
                <span className={`ml-2 text-sm ${
                  step <= currentStep ? "text-marsala-600" : "text-gray-500"
                }`}>
                  {title}
                </span>
                {step < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumo do Pedido */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-marsala-200 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-marsala-600" />
                  Resumo do Pedido
                </h2>
                
                <div className="space-y-4 mb-6">
                  {purchaseItems.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-3 border-b border-gray-200 pb-4">
                      {item.product.images?.[0] && (
                        <div className="w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-800 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Qtd: {item.quantity} × R$ {item.product.price?.toFixed(2)}
                        </p>
                        <p className="text-sm font-semibold text-marsala-600">
                          R$ {(item.product.price! * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span className={frete === 0 ? "text-green-600" : ""}>
                      {frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-marsala-600">R$ {totalFinal.toFixed(2)}</span>
                  </div>
                </div>

                {frete > 0 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      Frete GRÁTIS em compras acima de R$ 500
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-marsala-200 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit}>
                  {/* Etapa 1: Dados Pessoais */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <User className="h-6 w-6 mr-2 text-marsala-600" />
                        Dados Pessoais
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                          <Input name="nome" required value={formData.nome} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                          <Input name="email" type="email" required value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                          <Input name="telefone" required value={formData.telefone} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CPF *</label>
                          <Input name="cpf" required value={formData.cpf} onChange={handleInputChange} />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isEmpresa"
                          name="isEmpresa"
                          checked={formData.isEmpresa}
                          onChange={handleInputChange}
                          className="rounded border-marsala-300"
                        />
                        <label htmlFor="isEmpresa" className="text-sm text-gray-700">
                          Compra para empresa (Nota Fiscal Jurídica)
                        </label>
                      </div>

                      {formData.isEmpresa && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Razão Social *</label>
                            <Input name="razaoSocial" required={formData.isEmpresa} value={formData.razaoSocial} onChange={handleInputChange} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                            <Input name="cnpj" required={formData.isEmpresa} value={formData.cnpj} onChange={handleInputChange} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Inscrição Estadual</label>
                            <Input name="inscricaoEstadual" value={formData.inscricaoEstadual} onChange={handleInputChange} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Etapa 2: Endereço de Entrega */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <Truck className="h-6 w-6 mr-2 text-marsala-600" />
                        Endereço de Entrega
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
                          <Input name="cep" required value={formData.cep} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Endereço *</label>
                          <Input name="endereco" required value={formData.endereco} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                          <Input name="numero" required value={formData.numero} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                          <Input name="complemento" value={formData.complemento} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
                          <Input name="bairro" required value={formData.bairro} onChange={handleInputChange} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                          <Input name="cidade" required value={formData.cidade} onChange={handleInputChange} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Etapa 3: Pagamento */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <CreditCard className="h-6 w-6 mr-2 text-marsala-600" />
                        Forma de Pagamento
                      </h2>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Forma de Pagamento *</label>
                        <Select onValueChange={(value) => handleSelectChange('formaPagamento', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a forma de pagamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                            <SelectItem value="boleto">Boleto Bancário</SelectItem>
                            <SelectItem value="pix">PIX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.formaPagamento === 'cartao' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Número do Cartão *</label>
                            <Input name="numeroCartao" required value={formData.numeroCartao} onChange={handleInputChange} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Validade *</label>
                            <Input name="validade" placeholder="MM/AA" required value={formData.validade} onChange={handleInputChange} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                            <Input name="cvv" required value={formData.cvv} onChange={handleInputChange} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nome no Cartão *</label>
                            <Input name="nomeCartao" required value={formData.nomeCartao} onChange={handleInputChange} />
                          </div>
                        </div>
                      )}

                      {formData.formaPagamento === 'pix' && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center text-blue-700">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span className="font-medium">Pagamento via PIX</span>
                          </div>
                          <p className="text-sm text-blue-600 mt-2">
                            Após confirmar o pedido, você receberá o QR Code para pagamento via PIX.
                          </p>
                        </div>
                      )}

                      <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm text-green-700">
                          Seus dados estão protegidos com certificado SSL
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Botões de Navegação */}
                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="border-marsala-300 text-marsala-700"
                    >
                      Voltar
                    </Button>
                    
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-marsala-600 hover:bg-marsala-700 text-white"
                      >
                        Continuar
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-marsala-600 hover:bg-marsala-700 text-white px-8"
                      >
                        Finalizar Pedido
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}