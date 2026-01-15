"use client"

import { motion } from "framer-motion"
import { FileText, Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const documentos = [
  {
    id: 1,
    titulo: "Manual Técnico - Inversores de Frequência",
    descricao: "Guia completo de instalação e configuração de inversores de frequência para aplicações industriais.",
    categoria: "Manuais",
    tamanho: "2.4 MB",
    formato: "PDF"
  },
  {
    id: 2,
    titulo: "Catálogo de Produtos 2024",
    descricao: "Catálogo completo com todas as linhas de produtos Althion e especificações técnicas.",
    categoria: "Catálogos",
    tamanho: "8.1 MB",
    formato: "PDF"
  },
  {
    id: 3,
    titulo: "Guia de Integração - PLCs",
    descricao: "Documentação técnica para integração de controladores lógicos programáveis em sistemas industriais.",
    categoria: "Guias",
    tamanho: "1.8 MB",
    formato: "PDF"
  },
  {
    id: 4,
    titulo: "Datasheet - Sensores Industriais",
    descricao: "Especificações técnicas detalhadas dos sensores de pressão, temperatura e proximidade.",
    categoria: "Datasheets",
    tamanho: "956 KB",
    formato: "PDF"
  },
  {
    id: 5,
    titulo: "Manual de Manutenção Preventiva",
    descricao: "Procedimentos recomendados para manutenção preventiva de equipamentos de automação.",
    categoria: "Manuais",
    tamanho: "3.2 MB",
    formato: "PDF"
  },
  {
    id: 6,
    titulo: "Certificações e Homologações",
    descricao: "Documentos de certificação e homologação dos produtos Althion.",
    categoria: "Certificações",
    tamanho: "1.1 MB",
    formato: "PDF"
  }
]

export default function DocumentosPage() {
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
            <FileText className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Documentação</h1>
            <p className="text-xl text-marsala-100 max-w-2xl mx-auto">
              Acesse manuais, catálogos, datasheets e toda documentação técnica dos nossos produtos.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Buscar documentos..."
              className="pl-10 h-12"
            />
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentos.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-marsala-100">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-marsala-100 text-marsala-700 text-xs font-medium rounded-full">
                      {doc.categoria}
                    </span>
                    <span className="text-sm text-gray-500">{doc.formato}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{doc.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-4">{doc.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{doc.tamanho}</span>
                    <Button variant="outline" size="sm" className="border-marsala-300 text-marsala-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
