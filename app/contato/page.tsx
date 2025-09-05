"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    assunto: "",
    mensagem: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado:", formData)
    alert("Mensagem enviada com sucesso!")
    setFormData({ nome: "", email: "", empresa: "", assunto: "", mensagem: "" })
  }

  const contatos = [
    {
      icon: MapPin,
      titulo: "Endereço",
      info: "Av. Brasília, 397B - Suzano/SP",
      detalhe: "CEP: 08674-000",
    },
    {
      icon: Phone,
      titulo: "Telefone",
      info: "(11) 3090-3687",
      detalhe: "Seg-Sex: 8h às 18h",
    },
    {
      icon: Mail,
      titulo: "E-mail",
      info: "contato@althionlab.com",
      detalhe: "Resposta em até 24h",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-marsala-600 to-marsala-700 text-white py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
            <p className="text-xl md:text-2xl text-marsala-100 max-w-3xl mx-auto">
              Especialistas em soluções para a indústria farmacêutica e ciências da vida
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-marsala-200 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Fale com Nossos Especialistas</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                      <Input
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Seu nome"
                        className="border-marsala-200"
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
                        className="border-marsala-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                    <Input
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      placeholder="Nome da empresa"
                      className="border-marsala-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assunto *</label>
                    <Input
                      name="assunto"
                      required
                      value={formData.assunto}
                      onChange={handleInputChange}
                      placeholder="Ex: Automação farmacêutica, Conformidade RDC, etc."
                      className="border-marsala-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem *</label>
                    <Textarea
                      name="mensagem"
                      required
                      rows={6}
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      placeholder="Descreva seu projeto ou necessidade. Mencione se precisa atender alguma regulamentação específica (RDC, CFR 21 Part 11, etc.)"
                      className="border-marsala-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-marsala-600 hover:bg-marsala-700 text-white py-3 text-lg"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contatos.map((contato, index) => (
                <motion.div
                  key={contato.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-white border-marsala-200 shadow-xl rounded-2xl h-full hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-marsala-100 rounded-full flex items-center justify-center">
                        <contato.icon className="h-6 w-6 text-marsala-600" />
                      </div>
                      <h3 className="font-semibold text-marsala-800 mb-2">{contato.titulo}</h3>
                      <p className="text-gray-700 font-medium mb-1">{contato.info}</p>
                      <p className="text-sm text-gray-500">{contato.detalhe}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Google Maps */}
            <Card className="bg-white border-marsala-200 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 bg-marsala-50 border-b border-marsala-200">
                  <h3 className="font-semibold text-marsala-800 mb-1">Nossa Localização</h3>
                  <p className="text-sm text-gray-600">Av. Brasília, 397B - Suzano/SP - CEP: 08674-000</p>
                </div>
                <div className="relative h-80">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.123!2d-46.31234!3d-23.5123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce7c8f0f8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sAv.%20Bras%C3%ADlia%2C%20397%20-%20Jardim%20Suzano%2C%20Suzano%20-%20SP%2C%2008674-000!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Althion Lab - Suzano/SP"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}