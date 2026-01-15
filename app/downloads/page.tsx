"use client"

import { motion } from "framer-motion"
import { Download, Monitor, FileCode, Settings, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const downloads = [
  {
    id: 1,
    nome: "Software de Configuração - CFG Pro",
    descricao: "Software para configuração e parametrização de inversores de frequência.",
    versao: "v3.2.1",
    tamanho: "45 MB",
    sistema: "Windows 10/11",
    icon: Settings
  },
  {
    id: 2,
    nome: "IDE de Programação - LogicStudio",
    descricao: "Ambiente de desenvolvimento integrado para programação de PLCs.",
    versao: "v2.8.0",
    tamanho: "120 MB",
    sistema: "Windows 10/11",
    icon: FileCode
  },
  {
    id: 3,
    nome: "Driver USB - Comunicação Serial",
    descricao: "Drivers para comunicação USB/Serial com equipamentos Althion.",
    versao: "v1.5.0",
    tamanho: "8 MB",
    sistema: "Windows/Linux/Mac",
    icon: Database
  },
  {
    id: 4,
    nome: "HMI Designer",
    descricao: "Software para criação e edição de telas de IHM.",
    versao: "v4.1.2",
    tamanho: "85 MB",
    sistema: "Windows 10/11",
    icon: Monitor
  }
]

export default function DownloadsPage() {
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
            <Download className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Downloads</h1>
            <p className="text-xl text-marsala-100 max-w-2xl mx-auto">
              Baixe softwares, drivers e ferramentas para configuração dos nossos equipamentos.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Downloads List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {downloads.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 border-marsala-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-marsala-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-8 w-8 text-marsala-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.nome}</h3>
                          <p className="text-gray-600 mb-3">{item.descricao}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Versão: {item.versao}</span>
                            <span>|</span>
                            <span>{item.tamanho}</span>
                            <span>|</span>
                            <span>{item.sistema}</span>
                          </div>
                        </div>
                        <Button className="bg-marsala-600 hover:bg-marsala-700 text-white flex-shrink-0">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Requisitos de Sistema</h3>
          <p className="text-blue-700 text-sm">
            A maioria dos softwares requer Windows 10 ou superior, .NET Framework 4.8 e pelo menos 4GB de RAM.
            Consulte a documentação específica de cada software para requisitos detalhados.
          </p>
        </div>
      </div>
    </div>
  )
}
