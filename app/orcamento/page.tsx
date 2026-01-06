"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  FileText,
  User,
  Building,
  Truck,
  Check,
  AlertCircle,
  Loader2,
  X,
  Phone,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function OrcamentoPage() {
  const { items, removeItem, getQuoteItems } = useCart()
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: "",
    email: "",
    telefone: "",
    cpf: "",

    // Endereço
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",

    // Empresa (opcional)
    isEmpresa: false,
    razaoSocial: "",
    cnpj: "",
    inscricaoEstadual: "",

    // Mensagem adicional
    mensagem: ""
  })

  // Filtrar apenas itens que precisam de orçamento (sem preço)
  const quoteItems = getQuoteItems()

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
        type: 'quote' as const,
        customer: {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cpf: formData.cpf,
          isEmpresa: formData.isEmpresa,
          razaoSocial: formData.razaoSocial,
          cnpj: formData.cnpj,
          inscricaoEstadual: formData.inscricaoEstadual
        },
        address: {
          cep: formData.cep,
          endereco: formData.endereco,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado
        },
        items: quoteItems.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          unit_price: 0, // Sob consulta
          subtotal: 0
        })),
        subtotal: 0,
        shipping: 0,
        total: 0,
        mensagem: formData.mensagem
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
        // Limpar itens de orçamento do carrinho
        quoteItems.forEach(item => removeItem(item.product.id))
      } else {
        throw new Error(result.error || 'Erro ao enviar orçamento')
      }
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error)
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao processar solicitação')
      setSubmitStatus('error')
    }
  }

  // Tela de carrinho vazio
  if (quoteItems.length === 0 && submitStatus !== 'success') {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Nenhum item para orçamento</h1>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao seu carrinho para solicitar um orçamento personalizado.
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

  // Tela de sucesso
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Orçamento Enviado!</h1>
            <p className="text-gray-600 mb-2">
              Sua solicitação de orçamento foi registrada com sucesso.
            </p>
            {orderNumber && (
              <p className="text-lg font-semibold text-marsala-600 mb-6">
                Número: {orderNumber}
              </p>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-blue-800 mb-2">Próximos passos:</h3>
              <ul className="text-sm text-blue-700 text-left space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Nossa equipe analisará sua solicitação
                </li>
                <li className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Você receberá o orçamento por e-mail em até 24h
                </li>
                <li className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  Podemos entrar em contato para mais detalhes
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
    <div className="min-h-screen bg-gray-50 pt-24">
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
            <h1 className="text-4xl font-bold mb-4">Solicitar Orçamento</h1>
            <p className="text-xl text-marsala-100">
              Preencha seus dados para receber um orçamento personalizado
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
                <span className="text-red-700">{errorMessage || 'Erro ao enviar orçamento. Tente novamente.'}</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumo dos Itens */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-marsala-200 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-marsala-600" />
                  Itens do Orçamento
                </h2>

                <div className="space-y-4 mb-6">
                  {quoteItems.map((item) => (
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
                          Qtd: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-amber-600">
                          Sob consulta
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Valor sob consulta</p>
                      <p className="text-xs text-amber-700 mt-1">
                        Os produtos selecionados requerem orçamento personalizado devido às especificações técnicas.
                      </p>
                    </div>
                  </div>
                </div>
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
                  {/* Dados Pessoais */}
                  <div className="space-y-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <User className="h-6 w-6 mr-2 text-marsala-600" />
                      Dados de Contato
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                        <Input
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
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
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                        <Input
                          name="telefone"
                          required
                          value={formData.telefone}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                        <Input
                          name="cpf"
                          value={formData.cpf}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
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
                        disabled={submitStatus === 'loading'}
                        className="rounded border-marsala-300"
                      />
                      <label htmlFor="isEmpresa" className="text-sm text-gray-700">
                        Orçamento para empresa
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
                            disabled={submitStatus === 'loading'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                          <Input
                            name="cnpj"
                            required={formData.isEmpresa}
                            value={formData.cnpj}
                            onChange={handleInputChange}
                            disabled={submitStatus === 'loading'}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Inscrição Estadual</label>
                          <Input
                            name="inscricaoEstadual"
                            value={formData.inscricaoEstadual}
                            onChange={handleInputChange}
                            disabled={submitStatus === 'loading'}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Endereço */}
                  <div className="space-y-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <Truck className="h-6 w-6 mr-2 text-marsala-600" />
                      Endereço para Entrega
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CEP *</label>
                        <Input
                          name="cep"
                          required
                          value={formData.cep}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Endereço *</label>
                        <Input
                          name="endereco"
                          required
                          value={formData.endereco}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                        <Input
                          name="numero"
                          required
                          value={formData.numero}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                        <Input
                          name="complemento"
                          value={formData.complemento}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bairro *</label>
                        <Input
                          name="bairro"
                          required
                          value={formData.bairro}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                        <Input
                          name="cidade"
                          required
                          value={formData.cidade}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                        <Input
                          name="estado"
                          required
                          value={formData.estado}
                          onChange={handleInputChange}
                          disabled={submitStatus === 'loading'}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mensagem Adicional */}
                  <div className="space-y-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <Building className="h-6 w-6 mr-2 text-marsala-600" />
                      Informações Adicionais
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensagem ou especificações adicionais
                      </label>
                      <Textarea
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        disabled={submitStatus === 'loading'}
                        placeholder="Descreva aqui qualquer especificação técnica, prazo desejado ou outras informações relevantes para o orçamento..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                  </div>

                  {/* Botão de Envio */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="bg-marsala-600 hover:bg-marsala-700 text-white px-8 py-3 text-lg"
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <FileText className="h-5 w-5 mr-2" />
                          Solicitar Orçamento
                        </>
                      )}
                    </Button>
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
