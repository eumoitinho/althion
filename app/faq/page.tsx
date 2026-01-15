"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, ChevronDown, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const faqs = [
  {
    categoria: "Produtos",
    perguntas: [
      {
        pergunta: "Qual o prazo de garantia dos produtos Althion?",
        resposta: "Todos os produtos Althion possuem garantia de 12 meses contra defeitos de fabricação. Para alguns equipamentos específicos, oferecemos garantia estendida mediante contratação."
      },
      {
        pergunta: "Como escolher o inversor de frequência adequado para minha aplicação?",
        resposta: "A escolha do inversor depende de diversos fatores como potência do motor, tipo de carga (constante ou variável), ambiente de instalação e requisitos de controle. Nossa equipe técnica pode auxiliar na especificação correta para sua aplicação."
      },
      {
        pergunta: "Os produtos são compatíveis com outras marcas?",
        resposta: "Sim, nossos equipamentos seguem padrões industriais e protocolos de comunicação abertos como Modbus, Profibus e Ethernet/IP, garantindo compatibilidade com a maioria dos sistemas de automação do mercado."
      }
    ]
  },
  {
    categoria: "Compras",
    perguntas: [
      {
        pergunta: "Qual o prazo de entrega?",
        resposta: "O prazo de entrega varia de acordo com o produto e quantidade. Itens em estoque são despachados em até 3 dias úteis. Para produtos sob encomenda, o prazo é informado no momento da cotação."
      },
      {
        pergunta: "Vocês atendem pessoa física?",
        resposta: "Sim, atendemos tanto pessoas físicas quanto jurídicas. Para compras por pessoa física, os produtos são faturados com nota fiscal de venda ao consumidor."
      },
      {
        pergunta: "Quais as formas de pagamento disponíveis?",
        resposta: "Aceitamos pagamento via boleto bancário, transferência bancária, PIX e parcelamento no cartão de crédito (sujeito a análise). Para pedidos recorrentes, oferecemos condições especiais de faturamento."
      }
    ]
  },
  {
    categoria: "Suporte Técnico",
    perguntas: [
      {
        pergunta: "Como solicitar suporte técnico?",
        resposta: "O suporte técnico pode ser solicitado através do telefone (11) 3090-3687, e-mail suporte@althionlab.com ou através do formulário em nossa página de suporte. Nosso horário de atendimento é de segunda a sexta, das 8h às 18h."
      },
      {
        pergunta: "Vocês oferecem treinamento para os produtos?",
        resposta: "Sim, oferecemos treinamentos presenciais e online para nossos produtos. Os treinamentos podem ser personalizados de acordo com a necessidade do cliente. Consulte nossa página de treinamentos para mais informações."
      },
      {
        pergunta: "Onde encontro os manuais dos produtos?",
        resposta: "Todos os manuais técnicos estão disponíveis para download em nossa seção de Documentação. Você também pode solicitar uma cópia impressa junto ao nosso departamento comercial."
      }
    ]
  },
  {
    categoria: "Assistência Técnica",
    perguntas: [
      {
        pergunta: "Como enviar um produto para reparo?",
        resposta: "Para enviar um produto para reparo, entre em contato com nosso suporte para obter um número de RMA (Autorização de Retorno de Material). O produto deve ser enviado com nota fiscal e descrição do defeito."
      },
      {
        pergunta: "Qual o prazo para reparo de equipamentos?",
        resposta: "O prazo padrão para análise e reparo é de 15 dias úteis. Para casos urgentes, oferecemos serviço de reparo prioritário mediante taxa adicional."
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
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
            <HelpCircle className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
            <p className="text-xl text-marsala-100 max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Buscar perguntas..."
            className="pl-10 h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {faqs.map((categoria, catIndex) => (
          <motion.div
            key={categoria.categoria}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: catIndex * 0.1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-marsala-700 mb-4">{categoria.categoria}</h2>
            <div className="space-y-3">
              {categoria.perguntas.map((faq, index) => {
                const itemId = `${catIndex}-${index}`
                const isOpen = openItems.includes(itemId)

                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(itemId)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800">{faq.pergunta}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-4 text-gray-600">
                            {faq.resposta}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
