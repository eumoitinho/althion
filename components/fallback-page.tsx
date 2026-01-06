"use client"

import { motion } from "framer-motion"
import { Construction, ArrowLeft, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface FallbackPageProps {
  title: string
  description: string
  expectedFeatures?: string[]
}

export function FallbackPage({ title, description, expectedFeatures }: FallbackPageProps) {
  return (
    <div className="min-h-screen py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} 
          className="text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <Construction className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-light text-green-800 mb-4">{title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Main Card */}
          <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl mb-8">
            <CardContent className="p-12">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">
                  Página em Desenvolvimento
                </h2>
                <p className="text-gray-600 mb-6">
                  Esta página está sendo desenvolvida e estará disponível em breve. 
                  Nossa equipe está trabalhando para oferecer a melhor experiência possível.
                </p>
              </div>

              {expectedFeatures && expectedFeatures.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-green-700 mb-4">
                    Funcionalidades Previstas:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                    {expectedFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Início
                  </Button>
                </Link>
                <Link href="/contato">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 rounded-full px-8 py-3">
                    Entre em Contato
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Email</h3>
                <p className="text-gray-600">atendimento@portoitapoa.com</p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Telefone</h3>
                <p className="text-gray-600">+55 (47) 3441-8000</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}