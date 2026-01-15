"use client"

import { motion } from "framer-motion"
import { GraduationCap, Clock, Users, Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const treinamentos = [
  {
    id: 1,
    titulo: "Fundamentos de Automação Industrial",
    descricao: "Curso introdutório sobre conceitos fundamentais de automação, sensores, atuadores e sistemas de controle.",
    duracao: "16 horas",
    modalidade: "Presencial / Online",
    nivel: "Básico",
    topicos: [
      "Introdução à automação industrial",
      "Tipos de sensores e suas aplicações",
      "Atuadores pneumáticos e elétricos",
      "Fundamentos de controle de processos"
    ]
  },
  {
    id: 2,
    titulo: "Programação de PLCs",
    descricao: "Treinamento completo em programação de controladores lógicos programáveis utilizando linguagem Ladder e blocos funcionais.",
    duracao: "24 horas",
    modalidade: "Presencial / Online",
    nivel: "Intermediário",
    topicos: [
      "Arquitetura de PLCs",
      "Linguagem Ladder",
      "Blocos funcionais (FBD)",
      "Comunicação Modbus",
      "Práticas de programação"
    ]
  },
  {
    id: 3,
    titulo: "Configuração de Inversores de Frequência",
    descricao: "Capacitação para instalação, configuração e manutenção de inversores de frequência em aplicações industriais.",
    duracao: "16 horas",
    modalidade: "Presencial",
    nivel: "Intermediário",
    topicos: [
      "Princípios de funcionamento",
      "Parametrização básica e avançada",
      "Controle escalar e vetorial",
      "Diagnóstico de falhas",
      "Manutenção preventiva"
    ]
  },
  {
    id: 4,
    titulo: "Desenvolvimento de IHMs",
    descricao: "Aprenda a desenvolver interfaces homem-máquina intuitivas e funcionais para sistemas de automação.",
    duracao: "20 horas",
    modalidade: "Presencial / Online",
    nivel: "Intermediário",
    topicos: [
      "Design de interfaces industriais",
      "Comunicação com PLCs",
      "Alarmes e históricos",
      "Gráficos e tendências",
      "Boas práticas de UX industrial"
    ]
  }
]

export default function TreinamentosPage() {
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
            <GraduationCap className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Treinamentos</h1>
            <p className="text-xl text-marsala-100 max-w-2xl mx-auto">
              Capacite sua equipe com nossos treinamentos especializados em automação industrial.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Training Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {treinamentos.map((treinamento, index) => (
            <motion.div
              key={treinamento.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-marsala-100">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{treinamento.titulo}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      treinamento.nivel === "Básico"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {treinamento.nivel}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{treinamento.descricao}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {treinamento.duracao}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {treinamento.modalidade}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Conteúdo:</h4>
                    <ul className="space-y-1">
                      {treinamento.topicos.map((topico, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-2 text-marsala-500" />
                          {topico}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-marsala-600 hover:bg-marsala-700 text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    Solicitar Informações
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-8 bg-marsala-50 border border-marsala-200 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold text-marsala-800 mb-4">Treinamento In Company</h3>
          <p className="text-marsala-700 mb-6 max-w-2xl mx-auto">
            Oferecemos treinamentos personalizados para sua empresa, com conteúdo adaptado às necessidades específicas da sua equipe e dos seus processos.
          </p>
          <Button size="lg" className="bg-marsala-600 hover:bg-marsala-700 text-white">
            Solicitar Proposta
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
