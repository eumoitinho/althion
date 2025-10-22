"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Search, Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CartButton } from "@/components/cart-button"

const navigation = [
  { name: "Home", href: "/", nameKey: "home" },
  {
    name: "Produtos",
    href: "/produtos",
    nameKey: "products",
    submenu: [
      {
        name: "CLP e Automação",
        items: [
          { name: "CLP com IHM Incorporada - Coolmay QM3G-43FH", href: "/produtos/coolmay-qm3g-43fh" },
          { name: "CLP com IHM Incorporada - Coolmay QM3G-70FH", href: "/produtos/coolmay-qm3g-70fh" },
          { name: "CLP com IHM Incorporada - Coolmay QM3G-100FH", href: "/produtos/coolmay-qm3g-100fh" },
          { name: "IHM Touch Screen - Coolmay EX3G Series", href: "/produtos/coolmay-ex3g-series" },
          { name: "Inversores de Frequência - Coolmay VFD Series", href: "/produtos/coolmay-vfd-series" },
          { name: "Fonte de Alimentação Industrial 24V", href: "/produtos/coolmay-fonte-24v" },
          { name: "I/O Remoto - Módulo Expansão Coolmay L02", href: "/produtos/coolmay-io-l02" }
        ]
      },
      {
        name: "Medidores de Vazão",
        items: [
          { name: "Medidor de Vazão Eletromagnético", href: "/produtos/macsensor-eletromagnetico" },
          { name: "Medidor de Vazão Ultrassônico Clamp-On UF2000B", href: "/produtos/macsensor-uf2000b" }
        ]
      },
      {
        name: "Sensores de Temperatura",
        items: [
          { name: "Sensor de Temperatura Industrial PT100", href: "/produtos/hjsensor-pt100" },
          { name: "Transmissor de Temperatura 4-20mA", href: "/produtos/hjsensor-transmissor-temp" }
        ]
      },
      {
        name: "Sensores de Pressão",
        items: [
          { name: "Sensor de Pressão Industrial P10", href: "/produtos/macsensor-pressao-p10" },
          { name: "Transdutor de Pressão Compacto", href: "/produtos/macsensor-pressao-compacto" }
        ]
      },
      {
        name: "Sensores de Nível",
        items: [
          { name: "Sensor de Pressão Submersível L702", href: "/produtos/macsensor-nivel-l702" },
          { name: "Transmissor de Nível Hidrostático Submersível L703", href: "/produtos/macsensor-nivel-hidrostatico" }
        ]
      },
      {
        name: "Controle de Acesso",
        items: [
          { name: "Catraca Gabinete GB300", href: "/produtos/telematica-gb300" },
          { name: "CodinReP 4000", href: "/produtos/telematica-codinrep4000" }
        ]
      }
    ]
  },
  { name: "Sobre", href: "/sobre", nameKey: "about" },
  {
    name: "Soluções",
    href: "/solucoes", 
    nameKey: "solutions",
    submenu: [
      {
        name: "Automação Industrial",
        items: [
          { name: "Controle de Processos", href: "/solucoes/controle-processos" },
          { name: "Sistemas SCADA", href: "/solucoes/sistemas-scada" },
          { name: "Integração de Sistemas", href: "/solucoes/integracao-sistemas" }
        ]
      },
      {
        name: "Instrumentação",
        items: [
          { name: "Calibração de Instrumentos", href: "/solucoes/calibracao-instrumentos" },
          { name: "Validação FDA/ANVISA", href: "/solucoes/validacao-fda-anvisa" },
          { name: "Qualificação de Equipamentos", href: "/solucoes/qualificacao-equipamentos" }
        ]
      },
      {
        name: "Consultoria Técnica",
        items: [
          { name: "Análise de Processos", href: "/solucoes/analise-processos" },
          { name: "Especificação Técnica", href: "/solucoes/especificacao-tecnica" },
          { name: "Treinamento Técnico", href: "/solucoes/treinamento-tecnico" }
        ]
      }
    ]
  },
  { name: "Contato", href: "/contato", nameKey: "contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (itemName: string) => {
    setActiveSubmenu(itemName)
  }

  const handleMouseLeave = () => {
    setActiveSubmenu(null)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen) {
      setSearchTerm("")
    }
  }

  // Determinar se estamos na página inicial para aplicar o efeito transparente
  const isHomePage = pathname === "/"

  return (
    <>
      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHomePage
            ? scrolled
              ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl"
              : "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xl"
        }`}
        style={
          isHomePage && !scrolled
            ? {
                background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)",
                backdropFilter: "blur(8px)",
              }
            : {}
        }
      >
        {/* Top Bar - apenas quando scrolled ou não for home */}
        <AnimatePresence>
          {(scrolled || !isHomePage) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-marsala-700 text-white py-2 px-8 hidden lg:block"
            >
              <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Av. Brasília, 397B - Suzano/SP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>(11) 3090-3687</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>contato@althionlab.com</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    href="https://www.linkedin.com/company/althionlab"
                    target="_blank"
                    className="hover:text-marsala-200 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/althion.lab/"
                    target="_blank"
                    className="hover:text-marsala-200 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand Text */}
            <Link href="/" className="flex items-center group">
              <motion.div
                className="transition-transform group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className={`text-2xl font-bold transition-all duration-500 ${
                  isHomePage && !scrolled 
                    ? "text-white" 
                    : "text-marsala-700"
                }`}>
                  Althion Lab
                </h1>
              </motion.div>
            </Link>

            {/* Desktop Navigation: render anchors only on landing page */}
            <nav className="hidden lg:flex items-center space-x-1">
              {pathname?.startsWith("/landing") ? (
                [
                  { name: 'Serviços', href: '#servicos' },
                  { name: 'Orçamento', href: '#formulario' },
                  { name: 'Contato', href: '#contato' },
                ].map((item) => (
                  <a key={item.name} href={item.href} className="text-sm font-semibold px-4 py-3 rounded-xl text-gray-700 hover:text-marsala-600">{item.name}</a>
                ))
              ) : (
                navigation.map((item) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center text-sm font-semibold transition-all duration-300 px-4 py-3 rounded-xl relative overflow-hidden ${
                        pathname === item.href ||
                        (
                          item.submenu &&
                            item.submenu.some((section) => section.items.some((subItem) => pathname === subItem.href))
                        )
                          ? isHomePage && !scrolled
                            ? "text-marsala-300 bg-white/10 backdrop-blur-sm"
                            : "text-marsala-600 bg-marsala-50"
                          : isHomePage && !scrolled
                            ? "text-white hover:text-marsala-200 hover:bg-white/10"
                            : "text-gray-700 hover:text-marsala-600 hover:bg-marsala-50"
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                    </Link>
                  </div>
                ))
              )}
            </nav>

            {/* Search & Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Carrinho */}
              <CartButton />

              {/* Language Selector - apenas quando não scrolled na home */}

              {/* Search */}
              <div className="relative">
                <AnimatePresence>
                  {searchOpen ? (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 300, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center"
                    >
                      <Input
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="rounded-full border-gray-300 focus:border-marsala-500 pr-10"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                        className="absolute right-2 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSearch}
                        className={`p-2 rounded-full transition-colors duration-300 ${
                          isHomePage && !scrolled ? "hover:bg-white/10 text-white" : "hover:bg-marsala-50 text-gray-600"
                        }`}
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botão Solicitar Orçamento */}
              <Link href="/orcamento">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className={`rounded-full px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isHomePage && !scrolled
                        ? "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                        : "bg-gradient-to-r from-marsala-600 to-marsala-700 hover:from-marsala-700 hover:to-marsala-800 text-white"
                    }`}
                  >
                    Solicitar Orçamento
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden p-2 rounded-xl transition-colors duration-300 ${
                isHomePage && !scrolled ? "hover:bg-white/10 text-white" : "hover:bg-marsala-50 text-gray-700"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
            >
              <div className="px-8 py-6 space-y-6 max-h-96 overflow-y-auto">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-full border-gray-300 focus:border-marsala-500"
                  />
                </div>

                {/* Mobile Menu Items */}
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-3">
                    <Link
                      href={item.href}
                      className={`block text-lg font-semibold transition-colors duration-200 hover:text-marsala-600 py-2 ${
                        pathname === item.href ? "text-marsala-600" : "text-gray-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 space-y-3">
                        {item.submenu.map((section) => (
                          <div key={section.name} className="space-y-2">
                            <h4 className="text-sm font-semibold text-marsala-700 uppercase tracking-wider">
                              {section.name}
                            </h4>
                            <div className="ml-3 space-y-1">
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={`block text-sm transition-colors duration-200 hover:text-marsala-600 py-1 ${
                                    pathname === subItem.href ? "text-marsala-600 font-medium" : "text-gray-600"
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-gray-200">
                  <Link href="/orcamento" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-marsala-600 to-marsala-700 hover:from-marsala-700 hover:to-marsala-800 text-white rounded-full py-3 font-semibold">
                      Solicitar Orçamento
                    </Button>
                  </Link>
                </div>


                {/* Mobile Contact Info */}
                <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>(11) 3090-3687</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>contato@althionlab.com</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
