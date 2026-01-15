"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ShoppingCart, User, Clock, Check, AlertCircle, Loader2, X, Phone, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function CheckoutPage() {
  const { items, removeItem, clearCart } = useCart()
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [orderNumber, setOrderNumber] = useState('')
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: "",
    email: "",
    telefone: "",

    // Empresa (opcional)
    isEmpresa: false,
    razaoSocial: "",
    cnpj: "",

    // Observações
    observacoes: ""
  })

  // Todos os itens do carrinho
  const cartItems = items
  const total = cartItems.reduce((acc, item) => acc + ((item.product.price || 0) * item.quantity), 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      const orderData = {
        type: 'quote_request' as const,
        customer: {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          isEmpresa: formData.isEmpresa,
          razaoSocial: formData.razaoSocial,
          cnpj: formData.cnpj
        },
        items: cartItems.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price || 0,
          subtotal: (item.product.price || 0) * item.quantity
        })),
        observacoes: formData.observacoes,
        subtotal: total,
        status: 'pending'
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()

      if (result.success) {
        setOrderNumber(result.order?.number || '')
        setSubmitStatus('success')
        clearCart()
      } else {
        throw new Error(result.error || 'Erro ao processar pedido')
      }
    } catch (error) {
      console.error('Erro ao processar pedido:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao processar pedido')
      setSubmitStatus('error')
    }
  }

  if (cartItems.length === 0 && submitStatus !== 'success') {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Carrinho vazio</h1>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao seu carrinho para solicitar um pedido.
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

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Pedido Enviado com Sucesso!</h1>
            {orderNumber && (
              <p className="text-lg font-semibold text-marsala-600 mb-4">
                Número do Pedido: {orderNumber}
              </p>
            )}
            <p className="text-gray-600 mb-6">
              Seu pedido foi registrado e nossa equipe entrará em contato em breve para confirmar os detalhes.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-blue-800 mb-4">Próximos passos:</h3>
              <ul className="text-sm text-blue-700 text-left space-y-3">
                <li className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Nossa equipe analisará seu pedido em até 24 horas úteis</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Entraremos em contato por telefone ou e-mail para confirmar</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span>Você receberá uma confirmação com valores e prazo de entrega</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <Button variant="outline" className="border-marsala-300 text-marsala-700">
                  Voltar ao Início
                </Button>
              </Link>
              <Link href="/produtos">
                <Button className="bg-marsala-600 hover:bg-marsala-700 text-white">
                  Continuar Navegando
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
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
            <h1 className="text-4xl font-bold mb-4">Solicitar Pedido</h1>
            <p className="text-xl text-marsala-100">
              Preencha seus dados e nossa equipe entrará em contato
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Feedback de erro */}
        <AnimatePresence>
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <span className="text-red-700">{errorMessage || 'Erro ao processar pedido. Tente novamente.'}</span>
              </div>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Box */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Clock className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">Como funciona?</h3>
              <p className="text-sm text-blue-700">
                Ao enviar sua solicitação, nossa equipe comercial analisará seu pedido e entrará em contato
                em até 24 horas úteis para confirmar disponibilidade, valores e condições de pagamento.
              </p>
            </div>
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
                  Itens do Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-start gap-3 border-b border-gray-200 pb-4">
                      {item.product.images?.[0] && (
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-800 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Qtd: {item.quantity}
                        </p>
                        {item.product.price ? (
                          <p className="text-sm font-semibold text-marsala-600">
                            R$ {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            Sob consulta
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {total > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Subtotal estimado:</span>
                      <span className="text-marsala-600">R$ {total.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * Valores finais serão confirmados pela nossa equipe
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
                  {/* Dados de Contato */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <User className="h-6 w-6 mr-2 text-marsala-600" />
                      Dados de Contato
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                        <Input
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                        <Input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                        <Input
                          name="telefone"
                          required
                          value={formData.telefone}
                          onChange={handleInputChange}
                          placeholder="(11) 99999-9999"
                        />
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
                        Pedido para empresa (informar dados para Nota Fiscal)
                      </label>
                    </div>

                    {formData.isEmpresa && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Razão Social *</label>
                          <Input
                            name="razaoSocial"
                            required={formData.isEmpresa}
                            value={formData.razaoSocial}
                            onChange={handleInputChange}
                            placeholder="Nome da empresa"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                          <Input
                            name="cnpj"
                            required={formData.isEmpresa}
                            value={formData.cnpj}
                            onChange={handleInputChange}
                            placeholder="00.000.000/0000-00"
                          />
                        </div>
                      </div>
                    )}

                    {/* Observações */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                        <MessageSquare className="h-6 w-6 mr-2 text-marsala-600" />
                        Observações
                      </h2>
                      <Textarea
                        name="observacoes"
                        value={formData.observacoes}
                        onChange={handleInputChange}
                        placeholder="Informações adicionais sobre o pedido, preferências de entrega, dúvidas..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </div>

                  {/* Botão de Envio */}
                  <div className="mt-8">
                    <Button
                      type="submit"
                      className="w-full bg-marsala-600 hover:bg-marsala-700 text-white h-14 text-lg"
                      disabled={submitStatus === 'loading'}
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Enviando Pedido...
                        </>
                      ) : (
                        <>
                          <Check className="h-5 w-5 mr-2" />
                          Enviar Solicitação de Pedido
                        </>
                      )}
                    </Button>
                    <p className="text-center text-sm text-gray-500 mt-4">
                      Ao enviar, nossa equipe entrará em contato para confirmar disponibilidade e valores.
                    </p>
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
