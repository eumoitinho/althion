import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Providers } from "./providers"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
})

export const metadata: Metadata = {
  title: "Althion ",
  description:
    "Produtos e soluções tecnológicas para a industria.",
  keywords: "porto, itapoá, terminal, portuário, brasil, logística, containers, navegação",
  openGraph: {
    title: "Althion - Produtos e Soluções Tecnológicas",
    description:
      "Oferecendo uma ampla gama de produtos e soluções para a indústria.",
    type: "website",
    locale: "pt_BR",
  },
    generator: 'moitinho'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-poppins`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}