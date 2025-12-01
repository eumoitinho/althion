"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { 
  Wrench, 
  Zap, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  Target, 
  BarChart3, 
  Settings, 
  Gauge, 
  Building2, 
  Hammer, 
  GraduationCap,
  Quote,
  Star,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  FileText,
  ArrowDown,
  Headphones,
  Package
} from "lucide-react"

export default function LandingServicosContent() {
  return (
    <main className="bg-white text-gray-900 font-poppins selection:bg-marsala-100 selection:text-marsala-900">
      {/* Bloco 1 - Hero */}
      <section className="relative min-h-[85vh] flex items-center pt-48 pb-20 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Background decorative elements - More subtle and premium */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-marsala-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-marsala-50 border border-marsala-100 rounded-full mb-6">
                <span className="flex h-2 w-2 rounded-full bg-marsala-600"></span>
                <span className="text-xs font-semibold text-marsala-800 tracking-wide uppercase">Engenharia Industrial</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
                Engenharia de <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-marsala-700 to-marsala-500">ponta a ponta</span> <br/>
                para sua indústria
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-medium">
                Soluções personalizadas de automação, instrumentação, elétrica e manutenção com a garantia de qualidade <span className="font-bold text-marsala-700">Althion Tech</span>.
              </p>
              
              {/* Stats - Refined */}
              <div className="grid grid-cols-2 gap-6 mb-10 max-w-md">
                <div className="border-l-4 border-marsala-200 pl-4">
                  <div className="text-3xl font-bold text-marsala-700">+1.000</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">projetos entregues</div>
                </div>
                <div className="border-l-4 border-marsala-200 pl-4">
                  <div className="text-3xl font-bold text-marsala-700">+120</div>
                  <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">engenheiros e técnicos</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#formulario">
                  <Button className="bg-marsala-700 hover:bg-marsala-800 text-white rounded-lg px-8 py-7 text-lg font-semibold shadow-lg shadow-marsala-900/10 hover:shadow-xl hover:shadow-marsala-900/20 transition-all w-full sm:w-auto">
                    SOLICITE UM ORÇAMENTO
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:block relative"
            >
                 <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 bg-gray-50 aspect-[4/3] group">
                 <Image 
                   src="/images/hero-new.png" 
                   alt="Engenharia Industrial Althion" 
                   fill
                   className="object-cover transition-transform duration-700 group-hover:scale-105" 
                   priority 
                 /> 
                 <div className="absolute inset-0 bg-gradient-to-tr from-marsala-900/20 to-transparent"></div>
                 </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-50 max-w-xs z-20">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 rounded-lg text-green-600">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Certificação ISO</h4>
                        <p className="text-sm text-gray-500 mt-1">Garantia de processos e qualidade internacional.</p>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bloco 2 - Sobre */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-marsala-600 font-bold tracking-wider uppercase text-sm mb-4 block">Nossa Missão</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900 leading-tight">
              Althion Tech: projetando a <span className="text-marsala-700">Indústria 4.0</span> com inovação e excelência
            </h2>
            <div className="w-20 h-1 bg-marsala-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-light">
              A <span className="font-semibold text-gray-900">Indústria 4.0</span> chegou para transformar de forma definitiva a produtividade e a competitividade no chão de fábrica. Atenta a essa revolução, a <span className="font-bold text-marsala-700">Althion Tech</span> nasceu com a missão de ser a ponte entre a sua empresa e uma automação realmente inteligente. Com especialistas que somam mais de <span className="font-semibold text-gray-900">15 anos de experiência</span>, oferecemos soluções de alto desempenho que aumentam a produtividade, reforçam a proteção operacional e garantem a conformidade da sua indústria.
            </p>
            <a href="#servicos">
              <Button variant="outline" className="border-2 border-marsala-600 text-marsala-700 hover:bg-marsala-50 rounded-full px-10 py-6 text-lg font-semibold transition-all">
                CONHEÇA NOSSOS SERVIÇOS
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bloco 3 - Clientes */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Nossos Clientes</h3>
            <p className="text-2xl font-semibold text-gray-900">
              A Althion é reconhecida por <span className="text-marsala-700">gigantes do mercado</span>
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              'Eurofarma',
              'Sanofi',
              'FarmaUSA',
              'Flukka',
              'União Química',
              'Hospital Israelita Albert Einstein',
              'Medley',
              'Ache'
            ].map((c, index) => (
              <div
                key={c}
                className="flex items-center justify-center h-20 bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all hover:-translate-y-1"
              >
                {/* Placeholder for Logos - Replace with actual SVGs */}
                <span className="text-gray-400 font-bold text-lg">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 4 - Desafios */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              A solução definitiva para seus <br/><span className="text-marsala-700">desafios operacionais</span>
            </h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Identificamos e resolvemos os gargalos que impedem seu crescimento.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Paradas constantes?",
                description: "Aumentamos a confiabilidade dos seus ativos com manutenção preditiva e corretiva de precisão.",
                color: "red"
              },
              {
                icon: TrendingUp,
                title: "Produção lenta?",
                description: "Otimizamos seus processos com automação inteligente e retrofit de máquinas, elevando sua capacidade produtiva.",
                color: "orange"
              },
              {
                icon: Shield,
                title: "Risco de não conformidade?",
                description: "Garantimos a adequação às normas regulatórias com engenharia e qualificação documental rigorosa.",
                color: "yellow"
              },
              {
                icon: BarChart3,
                title: "Custos elevados?",
                description: "Implementamos sistemas de eficiência energética e otimização de processos que reduzem seus custos operacionais.",
                color: "green"
              },
              {
                icon: FileText,
                title: "Falta de dados?",
                description: "Integramos sistemas SCADA e de rastreabilidade que fornecem visibilidade total e controle da sua produção.",
                color: "blue"
              },
              {
                icon: GraduationCap,
                title: "Equipe desqualificada?",
                description: "Capacitamos seu time com treinamentos técnicos e consultoria especializada, do básico ao avançado.",
                color: "purple"
              }
            ].map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-marsala-100 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-marsala-50"></div>
                  
                  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-${challenge.color}-50 text-${challenge.color}-600 group-hover:scale-110 transition-transform`}>
                    <challenge.icon className="w-6 h-6" />
                  </div>
                  
                  <h4 className="relative font-bold text-xl mb-3 text-gray-900 group-hover:text-marsala-700 transition-colors">{challenge.title}</h4>
                  <p className="relative text-gray-600 leading-relaxed">{challenge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 5 - Serviços */}
      <section id="servicos" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-marsala-600 font-bold tracking-wider uppercase text-sm mb-3 block">Expertise Técnica</span>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">NOSSOS SERVIÇOS</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Soluções completas para elevar sua indústria ao próximo nível
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                number: "01",
                title: "AUTOMAÇÃO",
                items: [
                  { title: "Integração de sistemas (ISA-95/88)", desc: "Conectamos o chão de fábrica ao sistema corporativo, garantindo rastreabilidade e eficiência." },
                  { title: "Desenvolvimento SCADA/MES/MOM", desc: "Criamos sistemas supervisórios personalizados para controle e tomada de decisão em tempo real." },
                  { title: "Modernização de sistemas", desc: "Atualizamos sistemas de automação com o mínimo impacto na produção." }
                ],
                icon: Settings,
                image: "/images/automation.png"
              },
              {
                number: "02",
                title: "INSTRUMENTAÇÃO",
                items: [
                  { title: "Padrões RBC rastreáveis", desc: "Utilizamos padrões de calibração com certificação internacional para garantir máxima precisão." },
                  { title: "Gestão metrológica avançada", desc: "Desenvolvemos planos de calibração baseados em análise de risco para otimizar custos." },
                  { title: "Suporte completo em campo", desc: "Gerenciamos todo o ciclo de vida dos instrumentos, da especificação à qualificação." }
                ],
                icon: Gauge,
                image: "/images/instrumentation.png"
              },
              {
                number: "03",
                title: "ELÉTRICA",
                items: [
                  { title: "Infraestrutura de alta performance", desc: "Projetamos e montamos infraestruturas elétricas eficientes, seguras e prontas para a Indústria 4.0." },
                  { title: "Adequação às normas (NR-10/12)", desc: "Modernizamos painéis e sistemas para garantir total segurança e conformidade regulatória." },
                  { title: "Manutenção preditiva", desc: "Utilizamos termografia e diagnósticos avançados para assegurar a confiabilidade." }
                ],
                icon: Zap,
                image: "/CLP.jpg"
              },
              {
                number: "04",
                title: "MANUTENÇÃO",
                items: [
                  { title: "Especialização em ativos críticos", desc: "Executamos manutenções preventivas e corretivas em válvulas, autoclaves e instrumentação." },
                  { title: "Gerenciamento integrado", desc: "Coordenamos equipes, cronogramas e fornecedores para garantir a máxima eficiência." },
                  { title: "Conformidade PMOC", desc: "Implementamos Planos de Manutenção, Operação e Controle para garantir a qualidade do ar." }
                ],
                icon: Hammer,
                image: "/turbina_blaster.jpeg"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="p-8 lg:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-marsala-50 rounded-2xl flex items-center justify-center text-marsala-700 group-hover:bg-marsala-600 group-hover:text-white transition-colors duration-300">
                        <service.icon className="w-7 h-7" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900">{service.title}</h4>
                    </div>
                    <span className="text-4xl font-bold text-gray-100 select-none">{service.number}</span>
                  </div>
                  
                  {/* Image Placeholder */}
                  <div className="w-full h-56 bg-gray-100 rounded-2xl mb-8 flex items-center justify-center text-gray-400 text-sm border border-gray-200 overflow-hidden relative group-hover:shadow-md transition-all">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="space-y-6">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-marsala-500 flex-shrink-0"></div>
                        <div>
                          <h5 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="#formulario">
              <Button className="bg-marsala-700 hover:bg-marsala-800 text-white rounded-full px-10 py-7 text-lg font-semibold shadow-xl shadow-marsala-900/10 hover:shadow-marsala-900/20 transition-all">
                SOLICITE UM ORÇAMENTO PERSONALIZADO
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Bloco 6 - Turn Key */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-marsala-600 font-bold tracking-wider uppercase text-sm mb-3 block">Soluções Completas</span>
            <h3 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">SOLUÇÕES TURN KEY</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Do projeto à entrega: cuidamos de tudo para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "CALDEIRARIA E USINAGEM",
                items: [
                  "Expertise em aço inoxidável 316L, alumínio e ligas especiais.",
                  "Soldagem TIG/MIG, corte a laser CNC e conformação.",
                  "Mobiliário técnico, reatores, tanques e sistemas SKID."
                ],
                icon: Wrench,
                image: "/turbina_blaster.jpeg"
              },
              {
                title: "CONSTRUÇÃO CIVIL",
                items: [
                  "Foco em salas limpas, laboratórios e áreas estéreis (GMP).",
                  "Projetos com planejamento BIM e documentação completa.",
                  "Redes de gases especiais e utilidades farmacêuticas."
                ],
                icon: Building2,
                image: "/images/civil.png"
              },
              {
                title: "QUALIFICAÇÃO",
                items: [
                  "Sistemas de água (PW/WFI), HVAC e ar comprimido.",
                  "Validação GAMP 5 em sistemas computadorizados.",
                  "Protocolos (QP, QI, QO, QD) e relatórios de validação."
                ],
                icon: CheckCircle,
                image: "/images/instrumentation.png"
              }
            ].map((sol, index) => (
              <motion.div
                key={sol.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-marsala-50 rounded-xl flex items-center justify-center text-marsala-700 mb-6">
                  <sol.icon className="w-6 h-6" />
                </div>
                
                <h4 className="font-bold text-xl text-gray-900 mb-6">{sol.title}</h4>
                
                {/* Image Placeholder */}
                <div className="w-full h-40 bg-gray-50 rounded-xl mb-6 flex items-center justify-center text-gray-400 text-xs border border-gray-100 overflow-hidden relative group-hover:shadow-md transition-all">
                    <Image 
                      src={sol.image} 
                      alt={sol.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                <ul className="space-y-4">
                  {sol.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-marsala-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 7 - Diferenciais */}
      <section className="py-24 bg-marsala-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Por que escolher a Althion?</h3>
            <p className="text-xl text-marsala-100 max-w-2xl mx-auto font-light">
              Excelência técnica e compromisso com o seu resultado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "+15 anos de experiência",
                desc: "Profundo conhecimento em automação para os mais diversos segmentos industriais.",
                icon: Clock
              },
              {
                title: "Foco na indústria regulada",
                desc: "Expertise comprovada em projetos para os setores farmacêutico, alimentício e de saneamento.",
                icon: Shield
              },
              {
                title: "Engenharia consultiva",
                desc: "Mais do que executar, entendemos seu desafio e projetamos a solução mais eficiente e segura.",
                icon: Settings
              },
              {
                title: "Suporte técnico 24/7",
                desc: "Garantimos a continuidade da sua operação com uma equipe de especialistas sempre a postos.",
                icon: Headphones
              },
              {
                title: "Portfólio de produtos",
                desc: "Além de serviços especializados, fornecemos CLPs, manômetros, sensores e inversores.",
                icon: Package
              },
              {
                title: "Segurança e conformidade",
                desc: "Combinamos engenharia especializada e documentação detalhada para assegurar o atendimento às normas.",
                icon: CheckCircle
              }
            ].map((diff, index) => (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
              >
                <diff.icon className="w-10 h-10 text-marsala-300 mb-6 group-hover:text-white transition-colors" />
                <h4 className="font-bold text-xl mb-3">{diff.title}</h4>
                <p className="text-marsala-100 text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{diff.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 8 - Treinamento */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-marsala-600 font-bold tracking-wider uppercase text-sm mb-3 block">Capacitação</span>
              <h3 className="text-4xl font-bold mb-6 text-gray-900">PROGRAMA DE TREINAMENTO</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Nosso programa de desenvolvimento profissional é desenhado para elevar o nível de conhecimento técnico e de segurança da sua equipe. Consultoria técnica para uma operação autônoma, segura e eficiente.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Diagnóstico e mapeamento",
                    desc: "Análise de lacunas de competência e riscos operacionais.",
                  },
                  {
                    title: "Treinamentos de segurança",
                    desc: "Certificações essenciais em NR-10 e NR-12.",
                  },
                  {
                    title: "Riscos específicos",
                    desc: "NR-33 (Espaços Confinados) e NR-35 (Trabalho em Altura).",
                  },
                  {
                    title: "Acompanhamento contínuo",
                    desc: "Consultoria para aplicação prática do conhecimento.",
                  }
                ].map((train, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-marsala-50 flex items-center justify-center flex-shrink-0 text-marsala-600 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{train.title}</h4>
                      <p className="text-gray-600 text-sm">{train.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
                <div className="absolute inset-0 bg-marsala-600 rounded-3xl rotate-3 opacity-10"></div>
                <div className="relative bg-gray-100 rounded-3xl overflow-hidden aspect-square flex items-center justify-center border border-gray-200 shadow-xl">
                    <Image 
                      src="/dois-colegas-em-um-fabrica.jpg" 
                      alt="Treinamento Althion"
                      fill
                      className="object-cover"
                    />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 9 - Depoimento */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 relative border border-gray-100">
            <Quote className="absolute top-10 left-10 w-16 h-16 text-marsala-100" />
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed mb-10 font-poppins">
                “Nossa experiência com a Althion tem sido <span className="text-marsala-700 font-bold">excepcional</span>. A equipe não apenas propõe soluções inovadoras, mas tem a capacidade de explicá-las de forma clara e objetiva.”
              </blockquote>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden">
                    {/* Avatar Placeholder */}
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 text-lg">Marcel Costa</div>
                  <div className="text-marsala-600 font-medium">Gerente de manutenção FarmaUsa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloco 10 - Formulário e Footer */}
      <section id="formulario" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 text-gray-900">
              Vamos conversar?
            </h3>
            <p className="text-lg text-gray-600">
              Preencha o formulário e nossa equipe de especialistas entrará em contato.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-bold text-gray-700 mb-2">Nome completo</label>
                  <input type="text" id="nome" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-marsala-500 focus:ring-2 focus:ring-marsala-200 transition-all outline-none" placeholder="Seu nome" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">E-mail corporativo</label>
                  <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-marsala-500 focus:ring-2 focus:ring-marsala-200 transition-all outline-none" placeholder="seu@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="telefone" className="block text-sm font-bold text-gray-700 mb-2">Telefone</label>
                <input type="tel" id="telefone" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-marsala-500 focus:ring-2 focus:ring-marsala-200 transition-all outline-none" placeholder="(11) 99999-9999" />
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm font-bold text-gray-700 mb-2">Como podemos ajudar?</label>
                <textarea id="mensagem" rows={4} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-marsala-500 focus:ring-2 focus:ring-marsala-200 transition-all outline-none resize-none" placeholder="Descreva seu desafio..."></textarea>
              </div>
              <Button className="w-full bg-marsala-700 hover:bg-marsala-800 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg">
                ENVIAR SOLICITAÇÃO
              </Button>
            </form>
          </div>

          {/* Footer Info */}
          <div className="mt-20 pt-10 border-t border-gray-100 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8 text-gray-600">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-marsala-600" />
                <span>Suzano - SP</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-marsala-600" />
                <span>(11) 3090-3687</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-marsala-600" />
                <span>comercial@althion.com.br</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-marsala-50 hover:text-marsala-700 transition-all text-gray-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-gray-50 rounded-full hover:bg-marsala-50 hover:text-marsala-700 transition-all text-gray-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
