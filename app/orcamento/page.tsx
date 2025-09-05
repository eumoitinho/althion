"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, User, Building, Phone, Mail, MessageSquare, Send, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

export default function OrcamentoPage() {
  const { items, removeItem, clearCart } = useCart()
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    cargo: "",
    cnpj: "",
    endereco: "",
    observacoes: ""
  })

  // Filtrar apenas itens que não têm preço (para orçamento)
  const quoteItems = items.filter(item => !item.product.price)
  
  useEffect(() => {
    // Se não há itens para orçamento, redirecionar para produtos
    if (quoteItems.length === 0) {
      // Mostrar mensagem informativa
    }
  }, [quoteItems.length])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Criar dados do orçamento
    const orcamentoData = {
      ...formData,
      produtos: quoteItems.map(item => ({
        id: item.product.id,
        nome: item.product.name,
        marca: item.product.brand,
        quantidade: item.quantity,
        observacoes: item.product.technicalName || ""
      })),
      data: new Date().toISOString(),
      total_itens: quoteItems.reduce((acc, item) => acc + item.quantity, 0)
    }

    console.log("Orçamento solicitado:", orcamentoData)
    
    // Simular envio
    alert("Orçamento solicitado com sucesso! Entraremos em contato em até 24 horas.")
    
    // Limpar carrinho dos itens de orçamento
    quoteItems.forEach(item => removeItem(item.product.id))
    
    // Resetar formulário
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      cargo: "",
      cnpj: "",
      endereco: "",
      observacoes: ""
    })
  }

  const calcularTotalItens = () => {
    return quoteItems.reduce((acc, item) => acc + item.quantity, 0)
  }

  if (quoteItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Nenhum item para orçamento</h1>
            <p className="text-gray-600 mb-8">
              Adicione produtos que requerem orçamento ao seu carrinho para continuar.
            </p>
            <Link href="/produtos">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white px-8 py-3">
                <Package className="h-4 w-4 mr-2" />
                Ver Produtos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
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
            <h1 className="text-4xl font-bold mb-4">Solicitação de Orçamento</h1>
            <p className="text-xl text-marsala-100">
              Preencha seus dados e receba um orçamento personalizado
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Resumo dos Produtos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-marsala-200 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-marsala-600" />
                  Produtos para Orçamento
                </h2>
                
                <div className="space-y-4 mb-6">
                  {quoteItems.map((item) => (
                    <div key={item.product.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        {item.product.images?.[0] && (
                          <div className="w-12 h-12 flex-shrink-0">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              width={48}
                              height={48}
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-800 truncate">
                            {item.product.name}
                          </h3>
                          {item.product.technicalName && (
                            <p className="text-xs text-gray-500 truncate">
                              {item.product.technicalName}
                            </p>
                          )}
                          <p className="text-sm text-marsala-600 font-medium">
                            Qtd: {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-marsala-50 rounded-lg p-4 border border-marsala-200">
                  <div className="text-center">
                    <p className="text-marsala-800 font-semibold">
                      Total de {calcularTotalItens()} item(s)
                    </p>
                    <p className="text-sm text-marsala-600 mt-1">
                      Orçamento sem compromisso
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-marsala-200 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-2 text-marsala-600" />
                  Dados para Contato
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          className="border-marsala-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          className="border-marsala-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefone *
                        </label>
                        <Input
                          name="telefone"
                          type="tel"
                          required
                          value={formData.telefone}
                          onChange={handleInputChange}
                          placeholder="(11) 99999-9999"
                          className="border-marsala-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cargo
                        </label>
                        <Input
                          name="cargo"
                          value={formData.cargo}
                          onChange={handleInputChange}
                          placeholder="Seu cargo na empresa"
                          className="border-marsala-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dados da Empresa */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-marsala-600" />
                      Dados da Empresa
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome da Empresa *
                        </label>
                        <Input
                          name="empresa"
                          required
                          value={formData.empresa}
                          onChange={handleInputChange}
                          placeholder="Nome da empresa"
                          className="border-marsala-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CNPJ
                        </label>
                        <Input
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleInputChange}
                          placeholder="00.000.000/0000-00"
                          className="border-marsala-200"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endereço da Empresa
                      </label>
                      <Input
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleInputChange}
                        placeholder="Endereço completo"
                        className="border-marsala-200"
                      />
                    </div>
                  </div>

                  {/* Observações */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações Adicionais
                    </label>
                    <Textarea
                      name="observacoes"
                      rows={4}
                      value={formData.observacoes}
                      onChange={handleInputChange}
                      placeholder="Informações adicionais sobre sua necessidade, prazo de entrega desejado, especificações técnicas especiais, etc..."
                      className="border-marsala-200"
                    />
                  </div>

                  {/* Termos */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="termos"
                      required
                      className="mt-1 h-4 w-4 text-marsala-600 border-marsala-300 rounded focus:ring-marsala-500"
                    />
                    <label htmlFor="termos" className="text-sm text-gray-600">
                      Concordo em receber contato da Althion Lab para apresentação do orçamento 
                      e esclarecimentos sobre os produtos solicitados. Estou ciente de que 
                      este orçamento não gera compromisso de compra.
                    </label>
                  </div>

                  {/* Botão de Envio */}
                  <Button
                    type="submit"
                    className="w-full bg-marsala-600 hover:bg-marsala-700 text-white py-4 text-lg font-semibold"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Solicitar Orçamento
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    <p>📞 Dúvidas? Entre em contato: (11) 3090-3687</p>
                    <p>📧 orcamentos@althionlab.com</p>
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