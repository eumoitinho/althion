"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContatoPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('success')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
          <div className="text-center">
            <Mail className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Contato</h1>
            <p className="text-xl text-marsala-100 max-w-2xl mx-auto">
              Entre em contato conosco. Estamos prontos para atender você.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card className="border-marsala-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-marsala-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-marsala-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Telefone</h3>
                    <p className="text-gray-600">(11) 3090-3687</p>
                    <p className="text-gray-600">(11) 98765-4321</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-marsala-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-marsala-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-marsala-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">E-mail</h3>
                    <p className="text-gray-600">contato@althionlab.com</p>
                    <p className="text-gray-600">vendas@althionlab.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-marsala-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-marsala-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-marsala-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      Av. Brasília, 397B<br />
                      Suzano - SP<br />
                      CEP 08694-000
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-marsala-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-marsala-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-marsala-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Horário de Atendimento</h3>
                    <p className="text-gray-600">
                      Segunda a Sexta<br />
                      08:00 - 18:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-marsala-100">
              <CardContent className="p-8">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Mensagem Enviada!</h3>
                    <p className="text-gray-600">
                      Obrigado pelo contato. Retornaremos em breve.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Envie sua mensagem</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                        <Input
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                        <Input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                        <Input
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleChange}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assunto *</label>
                        <Input
                          name="assunto"
                          required
                          value={formData.assunto}
                          onChange={handleChange}
                          placeholder="Assunto da mensagem"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem *</label>
                      <Textarea
                        name="mensagem"
                        required
                        value={formData.mensagem}
                        onChange={handleChange}
                        placeholder="Digite sua mensagem..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-marsala-600 hover:bg-marsala-700 text-white h-12"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
