"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Settings, BarChart, Cpu, Workflow, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Automação de Processos",
      description: "Soluções completas para automação de processos industriais com CLPs e sistemas de controle avançados.",
      icon: Settings,
      features: ["Programação de CLPs", "Integração de sistemas", "Monitoramento remoto", "Otimização de processos"],
      category: "Controle"
    },
    {
      title: "Sistemas de Supervisão",
      description: "Interfaces homem-máquina (IHM) e sistemas SCADA para monitoramento e controle em tempo real.",
      icon: BarChart,
      features: ["Desenvolvimento de IHM", "Sistemas SCADA", "Dashboards personalizados", "Relatórios automáticos"],
      category: "Supervisão"
    },
    {
      title: "Controle de Motores",
      description: "Inversores de frequência e sistemas de acionamento para controle preciso de motores elétricos.",
      icon: Zap,
      features: ["Inversores de frequência", "Soft-starters", "Controle de velocidade", "Economia de energia"],
      category: "Acionamento"
    },
    {
      title: "Instrumentação Industrial",
      description: "Sensores e instrumentos de medição para monitoramento de variáveis de processo.",
      icon: Cpu,
      features: ["Sensores de pressão", "Medidores de vazão", "Sensores de temperatura", "Transmissores"],
      category: "Medição"
    },
    {
      title: "Segurança Industrial",
      description: "Sistemas de segurança para proteção de equipamentos e operadores em ambientes industriais.",
      icon: Shield,
      features: ["Sistemas de parada de emergência", "Cortinas de luz", "Controle de acesso", "Monitoramento"],
      category: "Segurança"
    },
    {
      title: "Integração de Sistemas",
      description: "Integração de diferentes sistemas e tecnologias para uma operação unificada e eficiente.",
      icon: Workflow,
      features: ["Integração ERP", "Comunicação industrial", "Redes industriais", "IoT Industrial"],
      category: "Integração"
    }
  ]

  const industries = [
    {
      name: "Manufatura",
      description: "Soluções para linhas de produção, controle de qualidade e otimização de processos",
      image: "/logotipo.webp"
    },
    {
      name: "Alimentícia",
      description: "Automação para processos alimentícios com foco em segurança e rastreabilidade",
      image: "/logotipo.webp"
    },
    {
      name: "Química",
      description: "Controle de processos químicos com sistemas seguros e confiáveis",
      image: "/logotipo.webp"
    },
    {
      name: "Farmacêutica",
      description: "Automação farmacêutica com validação e conformidade regulatória",
      image: "/logotipo.webp"
    }
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nossas Soluções</h1>
            <p className="text-xl md:text-2xl text-marsala-100 max-w-3xl mx-auto">
              Soluções completas em automação industrial para otimizar seus processos
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Solutions Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Áreas de Especialização</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções especializadas para diferentes necessidades de automação industrial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-marsala-200 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <solution.icon className="h-12 w-12 text-marsala-600" />
                      <Badge variant="secondary" className="bg-marsala-50 text-marsala-700">
                        {solution.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{solution.title}</h3>
                    <p className="text-gray-600 mb-6">{solution.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <ArrowRight className="h-4 w-4 text-marsala-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Link href="/contato">
                      <Button className="w-full bg-marsala-600 hover:bg-marsala-700 text-white">
                        Saber Mais
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Industries Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Segmentos Atendidos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Atendemos diversos segmentos industriais com soluções personalizadas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-marsala-200 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="relative h-20 w-20 mx-auto mb-4 bg-marsala-50 rounded-full flex items-center justify-center group-hover:bg-marsala-100 transition-colors">
                      <Image
                        src={industry.image}
                        alt={industry.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-marsala-600 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{industry.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nosso Processo</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Seguimos um processo estruturado para garantir o sucesso de cada projeto
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Análise", description: "Análise detalhada das necessidades e especificações do projeto" },
                { step: "02", title: "Planejamento", description: "Desenvolvimento de estratégia e cronograma personalizado" },
                { step: "03", title: "Implementação", description: "Execução do projeto com acompanhamento contínuo" },
                { step: "04", title: "Suporte", description: "Suporte técnico e manutenção pós-implementação" }
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-marsala-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{phase.title}</h3>
                  <p className="text-gray-600 text-sm">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-marsala-50 to-orange-50 rounded-2xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Pronto para Automatizar seu Processo?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como nossas soluções podem 
            otimizar sua operação e aumentar sua produtividade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contato">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white px-8 py-3 text-lg">
                Falar com Especialista
              </Button>
            </Link>
            <Link href="/produtos">
              <Button variant="outline" className="border-marsala-300 text-marsala-700 hover:bg-marsala-50 px-8 py-3 text-lg">
                Ver Produtos
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}