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
  PlayCircle,
  Download,
  ArrowDown
} from "lucide-react"

export const metadata = {
  title: "Landing page - Althion (Serviços)",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LandingServicos() {
  return (
    <main className="bg-gradient-to-br from-gray-50 to-warm-50 text-gray-900">
      {/* Hero / Bloco 1 */}
      <section className="relative min-h-[70vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-marsala-50/30 to-orange-50/30"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-marsala-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-marsala-100 text-marsala-700 border-marsala-200 hover:bg-marsala-200">
                <Award className="w-3 h-3 mr-2" />
                Especialistas em Indústria 4.0
              </Badge>
              <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
                Engenharia de <span className="font-semibold text-marsala-700">ponta a ponta</span> para sua indústria
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Soluções personalizadas de automação, instrumentação, elétrica e manutenção com a garantia de qualidade <span className="font-semibold text-marsala-700">Althion Tech</span>.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-marsala-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-marsala-700" />
                    </div>
            <div>
                      <div className="text-3xl font-bold text-marsala-700">+1.000</div>
                  <div className="text-sm text-gray-600">projetos entregues</div>
                </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-marsala-100 rounded-lg">
                      <Users className="w-6 h-6 text-marsala-700" />
                </div>
                <div>
                      <div className="text-3xl font-bold text-marsala-700">+120</div>
                  <div className="text-sm text-gray-600">engenheiros e técnicos</div>
                </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#formulario">
                  <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                    SOLICITE UM ORÇAMENTO!
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link href="/produtos">
                  <Button variant="outline" className="rounded-full px-6 py-6 text-lg border-2 hover:bg-marsala-50 hover:border-marsala-300 transition-all">
                    Ver Produtos
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <div className="absolute inset-0 bg-gradient-to-t from-marsala-900/20 to-transparent z-10"></div>
                <Image 
                  src="/produtos/Automação (CLPs, IHMs e Módulos)/Módulo de IoT Industrial.png" 
                  alt="Automação Industrial" 
                  width={720} 
                  height={480} 
                  className="w-full h-auto object-cover" 
                  priority 
                />
              </div>
              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
                  <div>
                    <div className="font-semibold text-gray-800">ISO 9001</div>
                    <div className="text-xs text-gray-600">Certificado</div>
              </div>
            </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bloco 2 */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-marsala-100 rounded-full mb-6">
              <Target className="w-5 h-5 text-marsala-700" />
              <span className="text-sm font-semibold text-marsala-700">Nossa Missão</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-tight">
              Althion Tech: projetando a <span className="text-marsala-700">Indústria 4.0</span> com inovação e excelência
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              A <span className="font-semibold">Indústria 4.0</span> chegou para transformar de forma definitiva a produtividade e a competitividade no chão de fábrica. Atenta a essa revolução, a <span className="font-semibold text-marsala-700">Althion Tech</span> nasceu com a missão de ser a ponte entre a sua empresa e uma automação realmente inteligente. Com especialistas que somam mais de <span className="font-semibold">15 anos de experiência</span>, oferecemos soluções de alto desempenho que aumentam a produtividade, reforçam a proteção operacional e garantem a conformidade da sua indústria.
            </p>
          <a href="#servicos">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                CONHEÇA NOSSOS SERVIÇOS!
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
          </a>
          </motion.div>
        </div>
      </section>

      {/* Bloco 3 - Clientes */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-warm-50 border-y">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
              <Building2 className="w-4 h-4 text-marsala-700" />
              <span className="text-sm font-semibold text-gray-700">Empresas que confiam</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">NOSSOS CLIENTES</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A Althion é reconhecida por <span className="font-semibold">gigantes do mercado</span> que confiam em nossa expertise e compromisso com a excelência
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {['Eurofarma','Sanofi','FarmaUSA','Flukka','União Química','Hospital Israelita Albert Einstein','Medley','Ache'].map((c, index) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-marsala-200"
              >
                <Image src="/placeholder-logo.svg" alt={c} width={120} height={40} className="opacity-60 hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 4 - Desafios */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
              <Zap className="w-5 h-5 text-red-600" />
              <span className="text-sm font-semibold text-red-700">Desafios Comuns</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">
              A solução definitiva para seus <span className="text-marsala-700">desafios operacionais</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Identificamos e resolvemos os problemas que mais impactam a produtividade da sua indústria
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                title: "Paradas constantes?",
                description: "Aumentamos a confiabilidade dos seus ativos com manutenção preditiva e corretiva de precisão.",
                iconBg: "bg-red-100",
                iconColor: "text-red-600"
              },
              {
                icon: TrendingUp,
                title: "Produção lenta?",
                description: "Otimizamos seus processos com automação inteligente e retrofit de máquinas, elevando sua capacidade produtiva.",
                iconBg: "bg-orange-100",
                iconColor: "text-orange-600"
              },
              {
                icon: Shield,
                title: "Risco de não conformidade?",
                description: "Garantimos a adequação às normas regulatórias com engenharia e qualificação documental rigorosa.",
                iconBg: "bg-yellow-100",
                iconColor: "text-yellow-600"
              },
              {
                icon: BarChart3,
                title: "Custos elevados?",
                description: "Implementamos sistemas de eficiência energética e otimização de processos que reduzem seus custos operacionais.",
                iconBg: "bg-green-100",
                iconColor: "text-green-600"
              },
              {
                icon: FileText,
                title: "Falta de dados?",
                description: "Integramos sistemas SCADA e de rastreabilidade que fornecem visibilidade total e controle da sua produção.",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600"
              },
              {
                icon: GraduationCap,
                title: "Equipe desqualificada?",
                description: "Capacitamos seu time com treinamentos técnicos e consultoria especializada, do básico ao avançado.",
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600"
              }
            ].map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-marsala-200">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${challenge.iconBg}`}>
                      <challenge.icon className={`w-6 h-6 ${challenge.iconColor}`} />
            </div>
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">{challenge.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 5 - Serviços (cards) */}
      <section id="servicos" className="py-20 bg-gradient-to-br from-gray-50 to-warm-50 border-y">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-marsala-100 rounded-full mb-4">
              <Wrench className="w-5 h-5 text-marsala-700" />
              <span className="text-sm font-semibold text-marsala-700">Nossos Serviços</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">NOSSOS SERVIÇOS</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <span className="font-semibold">Expertise a serviço da alta performance</span> - Soluções completas para sua indústria
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'AUTOMAÇÃO',
                desc: 'Integração ISA-95/88, SCADA/MES/MOM e modernização de sistemas.',
                img: '/service-automation.jpg',
                icon: Settings,
                iconBg: 'bg-blue-500',
                iconColor: 'text-white'
              },
              {
                title: 'INSTRUMENTAÇÃO',
                desc: 'Padrões RBC, gestão metrológica e suporte em campo.',
                img: '/service-instrumentation.jpg',
                icon: Gauge,
                iconBg: 'bg-green-500',
                iconColor: 'text-white'
              },
              {
                title: 'ELÉTRICA',
                desc: 'Infraestrutura, adequação NR-10/12 e manutenção preditiva.',
                img: '/service-electrical.jpg',
                icon: Zap,
                iconBg: 'bg-yellow-500',
                iconColor: 'text-white'
              },
              {
                title: 'MANUTENÇÃO',
                desc: 'Manutenção preventiva/corretiva, gerenciamento integrado e PMOC.',
                img: '/service-maintenance.jpg',
                icon: Hammer,
                iconBg: 'bg-orange-500',
                iconColor: 'text-white'
              },
            ].map((s, index) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 hover:border-marsala-300 h-full">
                  <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    <Image 
                      src="/placeholder.jpg" 
                      alt={s.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className={`absolute top-4 left-4 p-3 ${s.iconBg} rounded-lg shadow-lg`}>
                      <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800 border-0">
                      {s.title}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-xl mb-3 text-gray-800">{s.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                    <Button variant="ghost" className="p-0 text-marsala-600 hover:text-marsala-700 font-semibold group-hover:translate-x-2 transition-transform">
                      Saiba mais
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a href="#formulario">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                SOLICITE UM ORÇAMENTO PERSONALIZADO!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bloco 6 - Turn Key */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
              <Award className="w-5 h-5 text-orange-700" />
              <span className="text-sm font-semibold text-orange-700">Soluções Completas</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">SOLUÇÕES TURN KEY</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Projetos completos do <span className="font-semibold">início ao fim</span>, com qualidade garantida e conformidade total
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "1",
                title: "CALDEIRARIA E USINAGEM",
                items: [
                  "Expertise em aço inoxidável 316L, alumínio e ligas especiais, com certificação metalúrgica.",
                  "Soldagem TIG/MIG, corte a laser CNC e conformação de precisão.",
                  "Mobiliário técnico, reatores, tanques e sistemas SKID com certificação GMP."
                ],
                icon: Wrench,
                numberBg: "bg-blue-600",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600",
                checkColor: "text-blue-600",
                accentBg: "bg-blue-100"
              },
              {
                number: "2",
                title: "CONSTRUÇÃO CIVIL E REFORMAS",
                items: [
                  "Foco em salas limpas, laboratórios e áreas estéreis, com conformidade GMP, ISO e ANVISA.",
                  "Projetos com planejamento BIM e documentação completa para total rastreabilidade.",
                  "Redes de gases especiais, utilidades farmacêuticas e sistemas de controle ambiental."
                ],
                icon: Building2,
                numberBg: "bg-green-600",
                iconBg: "bg-green-100",
                iconColor: "text-green-600",
                checkColor: "text-green-600",
                accentBg: "bg-green-100"
              },
              {
                number: "3",
                title: "QUALIFICAÇÃO DE EQUIPAMENTOS",
                items: [
                  "Sistemas de água (PW/WFI), HVAC, ar comprimido e mapeamento térmico.",
                  "Validação GAMP 5 em sistemas computadorizados.",
                  "Protocolos (QP, QI, QO, QD) e relatórios de validação prontos para auditoria."
                ],
                icon: CheckCircle,
                numberBg: "bg-purple-600",
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600",
                checkColor: "text-purple-600",
                accentBg: "bg-purple-100"
              }
            ].map((solution, index) => (
              <motion.div
                key={solution.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-marsala-200 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${solution.accentBg} rounded-bl-full opacity-50`}></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 ${solution.numberBg} text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg`}>
                        {solution.number}
                      </div>
                      <div className={`p-2 ${solution.iconBg} rounded-lg`}>
                        <solution.icon className={`w-6 h-6 ${solution.iconColor}`} />
                      </div>
            </div>
                    <h4 className="font-bold text-lg mb-4 text-gray-800">{solution.title}</h4>
                    <ul className="space-y-3 text-gray-600">
                      {solution.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className={`w-5 h-5 ${solution.checkColor} mt-0.5 flex-shrink-0`} />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
              </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a href="#formulario">
              <Button className="bg-marsala-600 hover:bg-marsala-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                SOLICITE UM ORÇAMENTO PERSONALIZADO!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bloco 7 - Diferenciais */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-warm-50 border-y">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
              <Star className="w-5 h-5 text-green-700" />
              <span className="text-sm font-semibold text-green-700">Nossos Diferenciais</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">Por que escolher a <span className="text-marsala-700">Althion</span>?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mais de <span className="font-semibold">15 anos de experiência</span> transformando indústrias com soluções inovadoras
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Clock,
                title: "+15 anos de experiência",
                description: "Profundo conhecimento em automação para os mais diversos segmentos industriais.",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600"
              },
              {
                icon: Shield,
                title: "Foco na indústria regulada",
                description: "Expertise comprovada em projetos para os setores farmacêutico, alimentício e de saneamento.",
                iconBg: "bg-green-100",
                iconColor: "text-green-600"
              },
              {
                icon: Settings,
                title: "Engenharia consultiva",
                description: "Mais do que executar, entendemos seu desafio e projetamos a solução mais eficiente e segura.",
                iconBg: "bg-purple-100",
                iconColor: "text-purple-600"
              },
              {
                icon: Clock,
                title: "Suporte técnico 24/7",
                description: "Garantimos a continuidade da sua operação com uma equipe de especialistas sempre a postos.",
                iconBg: "bg-orange-100",
                iconColor: "text-orange-600"
              },
              {
                icon: Award,
                title: "Portfólio de produtos",
                description: "Além de serviços especializados, fornecemos CLPs, manômetros, sensores e inversores de alta confiabilidade.",
                iconBg: "bg-yellow-100",
                iconColor: "text-yellow-600"
              },
              {
                icon: CheckCircle,
                title: "Segurança e conformidade",
                description: "Combinamos engenharia especializada e documentação detalhada para assegurar o atendimento às exigências regulatórias.",
                iconBg: "bg-red-100",
                iconColor: "text-red-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all border border-gray-200 hover:border-marsala-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${feature.iconBg} rounded-lg flex-shrink-0`}>
                        <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <div>
                        <h4 className="font-semibold text-lg mb-2 text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      </div>
            </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 8 - Treinamento */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <GraduationCap className="w-5 h-5 text-purple-700" />
              <span className="text-sm font-semibold text-purple-700">Capacitação</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">PROGRAMA DE TREINAMENTO</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              <span className="font-semibold">Consultoria técnica</span> para uma operação autônoma, segura e eficiente
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: "Diagnóstico e mapeamento",
                description: "Realizamos uma análise inicial para entender as lacunas de competência e os riscos operacionais, criando um plano de treinamento 100% personalizado.",
                iconBg: "bg-blue-100",
                iconColor: "text-blue-600"
              },
              {
                icon: Shield,
                title: "Treinamentos de segurança",
                description: "Iniciamos com a base da segurança industrial, oferecendo certificações essenciais em NR-10 e NR-12.",
                iconBg: "bg-red-100",
                iconColor: "text-red-600"
              },
              {
                icon: Target,
                title: "Treinamentos para riscos específicos",
                description: "Aprofundamos a capacitação com treinamentos para operações de alto risco, como NR-33 e NR-35, com simulações práticas.",
                iconBg: "bg-orange-100",
                iconColor: "text-orange-600"
              },
              {
                icon: Clock,
                title: "Acompanhamento contínuo",
                description: "Oferecemos consultoria contínua para garantir que o conhecimento seja aplicado na prática.",
                iconBg: "bg-green-100",
                iconColor: "text-green-600"
              }
            ].map((training, index) => (
              <motion.div
                key={training.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all border-2 hover:border-purple-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 ${training.iconBg} rounded-lg mb-4`}>
                      <training.icon className={`w-6 h-6 ${training.iconColor}`} />
            </div>
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">{training.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{training.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 9 - Depoimento */}
      <section className="py-20 bg-gradient-to-br from-marsala-50 to-orange-50 border-y">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-sm">
              <Quote className="w-5 h-5 text-marsala-700" />
              <span className="text-sm font-semibold text-marsala-700">Depoimento</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800">A voz de quem confia na Althion</h3>
            <Card className="bg-white shadow-xl border-2 border-marsala-200">
              <CardContent className="p-8 md:p-12">
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl italic text-gray-700 leading-relaxed mb-6 text-center">
                  "Nossa experiência com a Althion tem sido <span className="font-semibold text-marsala-700">excepcional</span>. O que realmente se destaca é como eles combinam conhecimento técnico com clareza na comunicação. A equipe não apenas propõe soluções inovadoras, mas tem a capacidade de explicá-las de forma clara e objetiva, facilitando nossas tomadas de decisão."
                </blockquote>
                <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200">
                  <div className="w-12 h-12 bg-marsala-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-marsala-700" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-800">Marcel Costa</div>
                    <div className="text-sm text-gray-600">Gerente de manutenção FarmaUsa</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Bloco 10 - Formulário */}
      <section id="formulario" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-marsala-100 rounded-full mb-6">
              <Mail className="w-5 h-5 text-marsala-700" />
              <span className="text-sm font-semibold text-marsala-700">Entre em Contato</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4">
              Comece sua jornada na <span className="text-marsala-700">Indústria 4.0</span> com o parceiro certo
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Preencha o formulário e nossa equipe de <span className="font-semibold">especialistas</span> entrará em contato para entender seu desafio e discutir a melhor solução de engenharia para sua indústria.
            </p>
          </motion.div>
          <Card className="shadow-xl border-2 border-gray-100">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-marsala-500 focus:ring-2 focus:ring-marsala-200 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-marsala-500 focus:ring-2 focus:ring-marsala-200 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    placeholder="(11) 99999-9999"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-marsala-500 focus:ring-2 focus:ring-marsala-200 transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-700 mb-2">
                    Descreva seu desafio ou necessidade *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    placeholder="Conte-nos sobre seu projeto, desafios ou necessidades..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-marsala-500 focus:ring-2 focus:ring-marsala-200 transition-all resize-none"
                    required
                  />
                </div>
                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    className="bg-marsala-600 hover:bg-marsala-700 text-white px-10 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                  >
                    Enviar Solicitação
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
            </div>
          </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer compacto */}
      <footer className="py-12 bg-gradient-to-br from-marsala-700 to-marsala-800 text-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Endereço
              </h4>
              <p className="text-marsala-100">Avenida Brasília, 397B<br />Vila Amorim, Suzano - SP<br />08610-100</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contato
              </h4>
              <p className="text-marsala-100 mb-2">Telefone: (11) 3090-3687</p>
              <p className="text-marsala-100">
                E-mail: <a href="mailto:comercial@althion.com.br" className="underline hover:text-white">comercial@althion.com.br</a>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Redes Sociais
              </h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/althion.lab/" target="_blank" rel="noreferrer" className="p-2 bg-marsala-600 rounded-lg hover:bg-marsala-500 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/althionlab" target="_blank" rel="noreferrer" className="p-2 bg-marsala-600 rounded-lg hover:bg-marsala-500 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-marsala-600 pt-8 text-center text-marsala-200 text-sm">
            <p>© {new Date().getFullYear()} Althion Tech. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
