"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Award, Users, Target, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre a Althion Lab</h1>
            <p className="text-xl md:text-2xl text-marsala-100 max-w-3xl mx-auto">
              Especialistas em automação industrial com mais de 10 anos de experiência
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Nossa História */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nossa História</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Fundada em 2013, a Althion Lab nasceu da paixão por tecnologia e automação industrial. 
                Começamos como uma pequena empresa focada em soluções de controle e ao longo dos anos 
                evoluímos para nos tornar uma referência em automação industrial no Brasil.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Nossa jornada é marcada pela constante busca por inovação e qualidade, sempre mantendo 
                o foco nas necessidades específicas de cada cliente. Hoje, atendemos empresas de diversos 
                setores, oferecendo soluções completas em automação industrial.
              </p>
            </div>
            <div className="relative h-96 bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/logo-cor.png"
                alt="Althion Lab"
                fill
                className="object-contain p-12"
              />
            </div>
          </div>
        </motion.section>

        {/* Missão, Visão e Valores */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-marsala-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-marsala-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">Missão</h3>
                <p className="text-gray-600">
                  Fornecer soluções em automação industrial que aumentem a produtividade, 
                  eficiência e competitividade de nossos clientes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-marsala-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 text-marsala-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">Visão</h3>
                <p className="text-gray-600">
                  Ser reconhecida como a principal referência em automação industrial, 
                  inovação tecnológica e excelência no atendimento.
                </p>
              </CardContent>
            </Card>

            <Card className="border-marsala-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 text-marsala-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">Valores</h3>
                <p className="text-gray-600">
                  Qualidade, inovação, confiabilidade, sustentabilidade e 
                  compromisso com a satisfação do cliente.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Estatísticas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Números que Comprovam Nossa Excelência
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-marsala-600 mb-2">10+</div>
                <div className="text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-marsala-600 mb-2">500+</div>
                <div className="text-gray-600">Projetos Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-marsala-600 mb-2">200+</div>
                <div className="text-gray-600">Clientes Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-marsala-600 mb-2">24h</div>
                <div className="text-gray-600">Suporte Técnico</div>
              </div>
            </div>
          </div>
        </motion.section>

        

        {/* Contato */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-marsala-50 to-orange-50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Entre em Contato</h2>
            <p className="text-gray-600">Estamos prontos para atender você</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-marsala-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Endereço</h3>
              <p className="text-gray-600">Av. Brasília, 397B<br />Suzano/SP</p>
            </div>
            <div className="text-center">
              <Phone className="h-8 w-8 text-marsala-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Telefone</h3>
              <p className="text-gray-600">(11) 3090-3687</p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-marsala-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">E-mail</h3>
              <p className="text-gray-600">contato@althionlab.com</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}