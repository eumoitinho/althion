import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Landing page - Althion (Serviços)",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LandingServicos() {
  return (
  <main className="bg-gradient-to-br from-gray-50 to-warm-50 text-gray-900 pt-24">
      {/* Hero / Bloco 1 */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-4">Engenharia de ponta a ponta para sua indústria</h1>
              <p className="text-lg text-gray-700 mb-6">Soluções personalizadas de automação, instrumentação, elétrica e manutenção com a garantia de qualidade Althion Tech.</p>
              <div className="flex items-center gap-8 mb-6">
                <div>
                  <div className="text-3xl font-semibold text-marsala-700">+1.000</div>
                  <div className="text-sm text-gray-600">projetos entregues</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-marsala-700">+120</div>
                  <div className="text-sm text-gray-600">engenheiros e técnicos</div>
                </div>
              </div>
              <div className="flex gap-4">
                <a href="#formulario">
                  <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-3">SOLICITE UM ORÇAMENTO!</Button>
                </a>
                <Link href="/produtos">
                  <Button variant="outline" className="rounded-full px-6">Ver Produtos</Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image src="/placeholder.jpg" alt="Automação" width={720} height={480} className="w-full h-auto object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 2 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Althion Tech: projetando a Indústria 4.0 com inovação e excelência</h2>
          <p className="text-gray-700 mb-6">A Indústria 4.0 chegou para transformar de forma definitiva a produtividade e a competitividade no chão de fábrica. Atenta a essa revolução, a Althion Tech nasceu com a missão de ser a ponte entre a sua empresa e uma automação realmente inteligente. Com especialistas que somam mais de 15 anos de experiência, oferecemos soluções de alto desempenho que aumentam a produtividade, reforçam a proteção operacional e garantem a conformidade da sua indústria.</p>
          <a href="#servicos">
            <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-3">CONHEÇA NOSSOS SERVIÇOS!</Button>
          </a>
        </div>
      </section>

      {/* Bloco 3 - Clientes */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-8">
          <h3 className="text-xl font-semibold mb-6 text-center">NOSSOS CLIENTES</h3>
          <p className="text-center text-gray-600 mb-8">A Althion é reconhecida por gigantes do mercado</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {['Eurofarma','Sanofi','FarmaUSA','Flukka','União Química','Hospital Israelita Albert Einstein','Medley','Ache'].map((c) => (
              <div key={c} className="flex items-center justify-center bg-gray-50 p-6 rounded-lg shadow-sm">
                <Image src="/placeholder-logo.svg" alt={c} width={120} height={40} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 4 */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">A solução definitiva para seus desafios operacionais</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Paradas constantes?</h4>
              <p className="mb-4 text-gray-600">Aumentamos a confiabilidade dos seus ativos com manutenção preditiva e corretiva de precisão.</p>

              <h4 className="font-semibold mb-2">Produção lenta?</h4>
              <p className="mb-4 text-gray-600">Otimizamos seus processos com automação inteligente e retrofit de máquinas, elevando sua capacidade produtiva.</p>

              <h4 className="font-semibold mb-2">Risco de não conformidade?</h4>
              <p className="mb-4 text-gray-600">Garantimos a adequação às normas regulatórias com engenharia e qualificação documental rigorosa.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Custos elevados?</h4>
              <p className="mb-4 text-gray-600">Implementamos sistemas de eficiência energética e otimização de processos que reduzem seus custos operacionais.</p>

              <h4 className="font-semibold mb-2">Falta de dados?</h4>
              <p className="mb-4 text-gray-600">Integramos sistemas SCADA e de rastreabilidade que fornecem visibilidade total e controle da sua produção.</p>

              <h4 className="font-semibold mb-2">Equipe desqualificada?</h4>
              <p className="text-gray-600">Capacitamos seu time com treinamentos técnicos e consultoria especializada, do básico ao avançado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 5 - Serviços (cards) */}
      <section id="servicos" className="py-16 bg-white border-t">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">NOSSOS SERVIÇOS</h3>
          <p className="text-center text-gray-600 mb-10">Expertise a serviço da alta performance</p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {title: 'AUTOMAÇÃO', desc: 'Integração ISA-95/88, SCADA/MES/MOM e modernização de sistemas.', img: '/service-automation.jpg'},
              {title: 'INSTRUMENTAÇÃO', desc: 'Padrões RBC, gestão metrológica e suporte em campo.', img: '/service-instrumentation.jpg'},
              {title: 'ELÉTRICA', desc: 'Infraestrutura, adequação NR-10/12 e manutenção preditiva.', img: '/service-electrical.jpg'},
              {title: 'MANUTENÇÃO', desc: 'Manutenção preventiva/corretiva, gerenciamento integrado e PMOC.', img: '/service-maintenance.jpg'},
            ].map((s) => (
              <div key={s.title} className="rounded-lg overflow-hidden shadow-lg">
                  <div className="h-40 bg-gray-200 relative">
                    <Image src="/placeholder.jpg" alt={s.title} fill className="object-cover" />
                  </div>
                <div className="p-6">
                  <h4 className="font-semibold mb-2">{s.title}</h4>
                  <p className="text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="#formulario">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-3">SOLICITE UM ORÇAMENTO PERSONALIZADO!</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Bloco 6 - Turn Key */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">SOLUÇÕES TURN KEY</h3>
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">1. CALDEIRARIA E USINAGEM</h4>
              <ul className="list-disc list-inside">
                <li>Expertise em aço inoxidável 316L, alumínio e ligas especiais, com certificação metalúrgica.</li>
                <li>Soldagem TIG/MIG, corte a laser CNC e conformação de precisão.</li>
                <li>Mobiliário técnico, reatores, tanques e sistemas SKID com certificação GMP.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. CONSTRUÇÃO CIVIL E REFORMAS</h4>
              <ul className="list-disc list-inside">
                <li>Foco em salas limpas, laboratórios e áreas estéreis, com conformidade GMP, ISO e ANVISA.</li>
                <li>Projetos com planejamento BIM e documentação completa para total rastreabilidade.</li>
                <li>Redes de gases especiais, utilidades farmacêuticas e sistemas de controle ambiental.</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. QUALIFICAÇÃO DE EQUIPAMENTOS</h4>
              <ul className="list-disc list-inside">
                <li>Sistemas de água (PW/WFI), HVAC, ar comprimido e mapeamento térmico.</li>
                <li>Validação GAMP 5 em sistemas computadorizados.</li>
                <li>Protocolos (QP, QI, QO, QD) e relatórios de validação prontos para auditoria.</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="#formulario">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-3">SOLICITE UM ORÇAMENTO PERSONALIZADO!</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Bloco 7 */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-5xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">Por que escolher a Althion?</h3>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <p className="font-semibold">+15 anos de experiência</p>
              <p className="mb-4 text-gray-600">Profundo conhecimento em automação para os mais diversos segmentos industriais.</p>

              <p className="font-semibold">Foco na indústria regulada</p>
              <p className="mb-4 text-gray-600">Expertise comprovada em projetos para os setores farmacêutico, alimentício e de saneamento.</p>

              <p className="font-semibold">Engenharia consultiva</p>
              <p className="text-gray-600">Mais do que executar, entendemos seu desafio e projetamos a solução mais eficiente e segura.</p>
            </div>
            <div>
              <p className="font-semibold">Suporte técnico 24/7</p>
              <p className="mb-4 text-gray-600">Garantimos a continuidade da sua operação com uma equipe de especialistas sempre a postos.</p>

              <p className="font-semibold">Portfólio de produtos</p>
              <p className="mb-4 text-gray-600">Além de serviços especializados, fornecemos CLPs, manômetros, sensores e inversores de alta confiabilidade.</p>

              <p className="font-semibold">Segurança e conformidade</p>
              <p className="text-gray-600">Combinamos engenharia especializada e documentação detalhada para assegurar o atendimento às exigências regulatórias.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 8 - Treinamento */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">PROGRAMA DE TREINAMENTO</h3>
          <p className="text-center text-gray-600 mb-8">Consultoria técnica para uma operação autônoma, segura e eficiente</p>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <p className="font-semibold">Diagnóstico e mapeamento</p>
              <p className="mb-4 text-gray-600">Realizamos uma análise inicial para entender as lacunas de competência e os riscos operacionais, criando um plano de treinamento 100% personalizado.</p>

              <p className="font-semibold">Treinamentos de segurança</p>
              <p className="mb-4 text-gray-600">Iniciamos com a base da segurança industrial, oferecendo certificações essenciais em NR-10 e NR-12.</p>
            </div>
            <div>
              <p className="font-semibold">Treinamentos para riscos específicos</p>
              <p className="mb-4 text-gray-600">Aprofundamos a capacitação com treinamentos para operações de alto risco, como NR-33 e NR-35, com simulações práticas.</p>

              <p className="font-semibold">Acompanhamento contínuo</p>
              <p className="text-gray-600">Oferecemos consultoria contínua para garantir que o conhecimento seja aplicado na prática.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 9 - Depoimento */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="text-xl font-semibold mb-4">A voz de quem confia na Althion</h3>
          <blockquote className="italic border-l-4 border-marsala-600 pl-4 text-gray-700">“Nossa experiência com a Althion tem sido excepcional. O que realmente se destaca é como eles combinam conhecimento técnico com clareza na comunicação. A equipe não apenas propõe soluções inovadoras, mas tem a capacidade de explicá-las de forma clara e objetiva, facilitando nossas tomadas de decisão”.</blockquote>
          <div className="font-medium mt-3">- Marcel Costa, Gerente de manutenção FarmaUsa</div>
        </div>
      </section>

      {/* Bloco 10 - Formulário */}
      <section id="formulario" className="py-16">
        <div className="max-w-2xl mx-auto px-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">Comece sua jornada na Indústria 4.0 com o parceiro certo</h3>
          <p className="text-center text-gray-600 mb-6">Preencha o formulário e nossa equipe de especialistas entrará em contato para entender seu desafio e discutir a melhor solução de engenharia para sua indústria.</p>
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
