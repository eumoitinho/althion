import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Althion - Landing page (CLPs)",
  robots: { index: false, follow: false },
}

export default function LandingCLPs() {
  return (
    <main className="bg-gradient-to-br from-gray-50 to-warm-50 text-gray-900 pt-24">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-4">O mapa personalizado para automatizar sua indústria</h1>
              <p className="text-lg text-gray-700 mb-6">Descubra os CLPs com IHM integrada da Althion Tech: a solução completa para monitorar e controlar sua produção.</p>
              <div className="flex gap-4">
                <a href="#catalogo"><Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-3">CONFIRA NOSSO CATÁLOGO!</Button></a>
                <a href="#formulario"><Button variant="outline" className="rounded-full px-6">Fale com especialistas</Button></a>
              </div>
            </div>
            <div className="hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image src="/placeholder.jpg" alt="CLP" width={720} height={480} className="w-full h-auto object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-xl font-semibold mb-6 text-center">A estratégia de automação usada por gigantes do mercado</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {['Eurofarma','Sanofi','FarmaUSA','União Química','Medley','Ache','Flukka','Hospital Albert Einstein'].map((c)=> (
              <div key={c} className="flex items-center justify-center bg-gray-50 p-6 rounded-lg shadow-sm">
                <span className="text-sm font-medium text-gray-700">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLP info cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">O cérebro da automação: entenda o poder dos CLPs</h3>
          <p className="text-center text-gray-600 mb-8">Controladores robustos, confiáveis e flexíveis, projetados para operar em ambientes industriais.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="h-40 bg-gray-200 relative">
                <Image src="/placeholder.jpg" alt="CLP" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h4 className="font-semibold mb-2">Aumento da produtividade</h4>
                <p className="text-gray-600">Executa tarefas repetitivas com velocidade e precisão 24/7.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="h-40 bg-gray-200 relative">
                <Image src="/placeholder.jpg" alt="CLP" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h4 className="font-semibold mb-2">Redução de custos</h4>
                <p className="text-gray-600">Minimiza erros humanos e otimiza consumo de energia.</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="h-40 bg-gray-200 relative">
                <Image src="/placeholder.jpg" alt="CLP" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h4 className="font-semibold mb-2">Flexibilidade e rastreabilidade</h4>
                <p className="text-gray-600">Adaptação rápida de lógicas e registro completo das operações.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a href="#catalogo"><Button className="bg-marsala-600 hover:bg-marsala-700 text-white px-8 py-3 rounded-full">[VEJA NOSSO CATÁLOGO COMPLETO]</Button></a>
            <a href="#formulario" className="ml-4"><Button variant="outline" className="px-6">[FALE COM NOSSOS ESPECIALISTAS]</Button></a>
          </div>
        </div>
      </section>

      {/* Serviços e benefícios */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">Soluções completas de engenharia</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <div className="h-40 bg-gray-200 relative">
                <Image src="/engineering-1.jpg" alt="Engenharia" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h4 className="font-semibold mb-2">Parametrização e comissionamento</h4>
                <p className="text-gray-600">Configuramos e testamos tudo para garantir uma partida de operação suave e otimizada.</p>
              </div>
            </div>
            <div>
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <li>Integração com SCADA/IHM</li>
                <li>Conformidade e validação (CFR 21 Part 11)</li>
                <li>Manutenção especializada</li>
                <li>Serviços de retrofit e atualizações</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA e formulário */}
      <section id="formulario" className="py-16">
        <div className="max-w-2xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">Comece sua jornada na Indústria 4.0 com o parceiro certo</h3>
          <p className="text-center text-gray-600 mb-6">Preencha o formulário abaixo para receber nosso catálogo detalhado da linha de CLPs e agendar uma conversa sem compromisso com um de nossos engenheiros de automação.</p>
          <form className="grid gap-4">
            <input type="text" name="nome" placeholder="Nome" className="border rounded px-4 py-2 w-full" required />
            <input type="email" name="email" placeholder="E-mail" className="border rounded px-4 py-2 w-full" required />
            <input type="tel" name="telefone" placeholder="Telefone" className="border rounded px-4 py-2 w-full" required />
            <textarea name="mensagem" placeholder="Descreva seu desafio ou necessidade" className="border rounded px-4 py-2 w-full" rows={4} required />
            <div className="text-center">
              <button type="submit" className="bg-marsala-600 hover:bg-marsala-700 text-white px-8 py-3 rounded-full font-semibold">Enviar</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer compacto */}
      <footer className="py-10 bg-marsala-700 text-white">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <div className="mb-2">Avenida Brasília, 397B, Vila Amorim, Suzano - SP, 08610-100</div>
          <div className="mb-2">Telefone: (11) 3090-3687</div>
          <div className="mb-2">E-mail: <a href="mailto:comercial@althion.com.br" className="underline">comercial@althion.com.br</a></div>
          <div className="mt-2">Instagram: <a href="https://www.instagram.com/althion.lab/" target="_blank" rel="noreferrer" className="underline">@althion.lab</a> &nbsp;|&nbsp; LinkedIn: <a href="https://www.linkedin.com/company/althionlab" target="_blank" rel="noreferrer" className="underline">/company/althionlab</a></div>
        </div>
      </footer>
    </main>
  )
}
