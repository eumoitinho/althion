"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const footerLinks = {
  produtos: [
    { name: "CLPs", href: "/produtos?categoria=clps" },
    { name: "IHMs", href: "/produtos?categoria=ihms" },
    { name: "Inversores", href: "/produtos?categoria=inversores" },
    { name: "Sensores", href: "/produtos?categoria=sensores" },
  ],
  empresa: [
    { name: "Sobre Nós", href: "/sobre" },
    { name: "Soluções", href: "/solucoes" },
    { name: "Suporte Técnico", href: "/suporte" },
    { name: "Contato", href: "/contato" },
  ],
  suporte: [
    { name: "Documentação", href: "/documentos" },
    { name: "Downloads", href: "/downloads" },
    { name: "FAQ", href: "/faq" },
    { name: "Treinamentos", href: "/treinamentos" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/althionlab", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/althionlab", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/althionlab", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/althionlab", label: "Twitter" },
]

export function Footer() {
  const pathname = usePathname()
  const isLanding = pathname?.startsWith("/landing")

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src="/logo-grande-1.png"
                    alt="Althion Lab"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-marsala-800">ALTHION LAB</span>
                  <span className="text-xs text-marsala-600 font-medium">AUTOMAÇÃO INDUSTRIAL</span>
                </div>
              </Link>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Especialistas em automação industrial, oferecendo soluções completas em CLPs, IHMs, inversores e sensores para otimizar seus processos produtivos.
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-3 flex-shrink-0 text-marsala-600" />
                  <span className="text-sm">Av. Brasília, 397B - Suzano/SP</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-marsala-600" />
                  <span className="text-sm">(11) 3090-3687</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-marsala-600" />
                  <span className="text-sm">contato@althionlab.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections (or anchor-only on landing) */}
          {isLanding ? (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h3 className="text-lg font-semibold mb-4 text-marsala-800">Navegação</h3>
              <ul className="space-y-2">
                <li><a href="#servicos" className="text-gray-600 hover:text-marsala-600 transition-colors">Serviços</a></li>
                <li><a href="#formulario" className="text-gray-600 hover:text-marsala-600 transition-colors">Orçamento</a></li>
                <li><a href="#" className="text-gray-600 hover:text-marsala-600 transition-colors">Treinamentos</a></li>
              </ul>
            </motion.div>
          ) : (
            Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-4 text-marsala-800 capitalize">
                  {category === "produtos" ? "Produtos" : category === "empresa" ? "Empresa" : "Suporte"}
                </h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-marsala-600 transition-colors duration-200 text-sm flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))
          )}
        </div>

        {/* Catálogo e Orçamento Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="bg-gradient-to-r from-marsala-50 to-orange-50 rounded-2xl p-8 border border-marsala-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-marsala-800 mb-2">Catálogo Digital</h3>
                <p className="text-gray-600 mb-4">
                  Explore nosso catálogo completo de produtos e solicite orçamentos personalizados.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-marsala-500 rounded-full mr-2"></span>
                  <span>Suporte especializado</span>
                </div>
              </div>
              <Link href="/produtos">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-marsala-600 hover:bg-marsala-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  Ver Produtos
                  <ExternalLink className="ml-2 h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © 2024 Althion Lab. Todos os direitos reservados.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-marsala-100 rounded-full flex items-center justify-center hover:bg-marsala-200 transition-colors duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-marsala-600 group-hover:text-marsala-700" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}