"use client"

import { motion } from "framer-motion"
import { Headphones, Phone, Mail, MessageSquare, Clock, FileText, Wrench, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const canaisSuporte = [
  {
    titulo: "Telefone",
    descricao: "Fale diretamente com nossa equipe de suporte técnico.",
    info: "(11) 3090-3687",
    icon: Phone,
    disponibilidade: "Seg-Sex, 8h às 18h"
  },
  {
    titulo: "E-mail",
    descricao: "Envie sua dúvida e receba resposta em até 24 horas.",
    info: "suporte@althionlab.com",
    icon: Mail,
    disponibilidade: "Resposta em até 24h úteis"
  },
  {
    titulo: "WhatsApp",
    descricao: "Atendimento rápido via WhatsApp Business.",
    info: "(11) 98765-4321",
    icon: MessageSquare,
    disponibilidade: "Seg-Sex, 8h às 18h"
  }
]

const recursos = [
  {
    titulo: "Documentação Técnica",
    descricao: "Acesse manuais, datasheets e guias de instalação.",
    icon: FileText,
    link: "/documentos"
  },
  {
    titulo: "Downloads",
    descricao: "Baixe softwares, drivers e ferramentas de configuração.",
    icon: BookOpen,
    link: "/downloads"
  },
  {
    titulo: "FAQ",
    descricao: "Encontre respostas para as perguntas mais frequentes.",
    icon: MessageSquare,
    link: "/faq"
  },
  {
    titulo: "Treinamentos",
    descricao: "Capacite sua equipe com nossos cursos especializados.",
    icon: Wrench,
    link: "/treinamentos"
  }
]

export default function SuportePage() {
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
            <Headphones className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Suporte Técnico</h1>
            <p className="text-xl text-marsala-100 max-w-2xl mx-auto">
              Nossa equipe de especialistas está pronta para ajudar você.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Canais de Suporte */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Canais de Atendimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {canaisSuporte.map((canal, index) => (
              <motion.div
                key={canal.titulo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow duration-300 border-marsala-100">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-marsala-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <canal.icon className="h-8 w-8 text-marsala-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{canal.titulo}</h3>
                    <p className="text-gray-600 mb-4">{canal.descricao}</p>
                    <p className="text-lg font-bold text-marsala-600 mb-2">{canal.info}</p>
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {canal.disponibilidade}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recursos de Autoatendimento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Recursos de Autoatendimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recursos.map((recurso, index) => (
              <motion.div
                key={recurso.titulo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Link href={recurso.link}>
                  <Card className="h-full hover:shadow-lg hover:border-marsala-300 transition-all duration-300 border-marsala-100 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-marsala-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <recurso.icon className="h-7 w-7 text-marsala-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{recurso.titulo}</h3>
                      <p className="text-gray-600 text-sm">{recurso.descricao}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 bg-marsala-50 border border-marsala-200 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold text-marsala-800 mb-4">Precisa de Assistência Técnica?</h3>
          <p className="text-marsala-700 mb-6 max-w-2xl mx-auto">
            Se seu equipamento precisa de reparo ou manutenção, entre em contato para solicitar um RMA (Autorização de Retorno de Material).
          </p>
          <Link href="/contato">
            <Button size="lg" className="bg-marsala-600 hover:bg-marsala-700 text-white">
              Solicitar RMA
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
