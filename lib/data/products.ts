export interface Product {
  id: string
  name: string
  technicalName?: string
  category: string
  subcategory?: string
  description: string
  specifications?: {
    model?: string
    series?: string
    voltage?: string
    norms?: string[]
    [key: string]: any
  }
  images: string[]
  videos?: string[]
  catalogPdf?: string
  price?: number
  priceRange?: {
    min: number
    max: number
    currency: string
  }
  hasPrice: boolean
  requiresQuote: boolean
  featured: boolean
  brand?: string
  application?: string[]
  tags?: string[]
  originalId?: number
  pdfManual?: string
  linkProduto?: string
  linkAlibaba?: string
  manufacturer?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon?: string
  image?: string
  subcategories?: {
    id: string
    name: string
    slug: string
  }[]
}

// Taxa de conversão USD para BRL (atualizada periodicamente)
const USD_TO_BRL_RATE = 5.8;

// Função para converter preço USD para BRL
function convertUsdToBrl(usdPrice: number): number {
  return Math.round(usdPrice * USD_TO_BRL_RATE);
}

// Função para determinar se produto requer orçamento (>R$400 após conversão)
function requiresQuote(maxPriceUsd: number): boolean {
  return convertUsdToBrl(maxPriceUsd) > 400;
}

// Imagens organizadas por categoria
const categoryImages = {
  'clp-automacao': [
    '/CLP.jpg',
    '/prog_clp_a01_f10_a.png', 
    '/6ED10521MD080BA1_2.png',
    '/MD400_img.png',
    '/Microdin_Armis_img.webp'
  ],
  'medidores-vazao': [
    '/medidor-de-vazao-eletromagnetico-optiflux-1050-remoto-02-c74694ac.webp',
    '/medidor-de-vazao-ultrassonico-optisonic-3400-remoto-02-d0810219.webp',
    '/WVMF.webp',
    '/turbina_blaster.jpeg'
  ],
  'sensores-temperatura': [
    '/145148-sensor-de-temperatura-agua-1741895244978.webp',
    '/sens39-i.jpg',
    '/SENSOR_1_8de52ea8-ae09-4cc4-a3df-e305bc12459c_1024x1024.webp'
  ],
  'sensores-pressao': [
    '/1027417_sensor-de-pressao-do-oleo-para-volkswagen-constellation-19-320e_z2_637509802865849982.webp',
    '/sensor-de-pressao-de-combustivel-citroen-jumper-fiat-ducato-iveco-dayli-peugeot-boxerL2-min.jpg',
    '/pressuresensors_a_10_en_co_rs_w738_h415_image.png',
    '/P25-frente.webp'
  ],
  'sensores-nivel': [
    '/sensor-de-nivel-para-liquidos-horizontal-zpc5.jpg',
    '/nonintrusive_laser_levelsensor_tl400i_image_01.webp',
    '/SENSOR_1_8de52ea8-ae09-4cc4-a3df-e305bc12459c_1024x1024.webp'
  ],
  'controle-acesso': [
    '/a0bfd660e0.webp',
    '/SENSOR_1_8de52ea8-ae09-4cc4-a3df-e305bc12459c_1024x1024.webp',
    '/Microdin_Armis_img.webp'
  ]
};

// Função para obter imagem do produto baseada na categoria
function getProductImage(category: string, index: number): string[] {
  const images = categoryImages[category as keyof typeof categoryImages] || ['/placeholder.jpg'];
  const selectedImage = images[index % images.length];
  return [selectedImage];
}

export const categories: Category[] = [
  {
    id: 'clp-automacao',
    name: 'CLP e Automação',
    slug: 'clp-automacao',
    description: 'Controladores Lógicos Programáveis, IHMs, inversores e sistemas de automação industrial'
  },
  {
    id: 'medidores-vazao',
    name: 'Medidores de Vazão',
    slug: 'medidores-vazao', 
    description: 'Medidores eletromagnéticos, ultrassônicos, radar e diversos tipos de medição de vazão'
  },
  {
    id: 'sensores-temperatura',
    name: 'Sensores de Temperatura',
    slug: 'sensores-temperatura',
    description: 'Sensores PT100, termopares, transmissores e controladores de temperatura industrial'
  },
  {
    id: 'sensores-pressao',
    name: 'Sensores de Pressão',
    slug: 'sensores-pressao',
    description: 'Sensores e transmissores de pressão para diversas aplicações industriais'
  },
  {
    id: 'sensores-nivel',
    name: 'Sensores de Nível',
    slug: 'sensores-nivel',
    description: 'Sensores submersíveis, ultrassônicos, radar e capacitivos para medição de nível'
  },
  {
    id: 'controle-acesso',
    name: 'Controle de Acesso e Telemática',
    slug: 'controle-acesso',
    description: 'Catracas, torniquetes, controladores de acesso e sistemas de gestão de ponto'
  }
]

// Lista de produtos sem imagens válidas (todos os IDs de 1-79 não possuem imagens)
export const productsWithoutImages: number[] = Array.from({length: 79}, (_, i) => i + 1);

// Resumo das imagens:
// - Todos os 89 produtos do JSON possuem apenas referências textuais como:
//   "Solicitar ao fabricante", "Ver na página do produto", "Consultar catálogo", etc.
// - Nenhum produto possui URLs diretas de imagem válidas
// - Todos os produtos usarão a imagem placeholder padrão

// Produtos processados do JSON real
export const products: Product[] = [
  // CLP e Automação - Coolmay (IDs 1-7)
  {
    id: 'coolmay-qm3g-43fh',
    originalId: 1,
    name: 'CLP com IHM Incorporada - Coolmay QM3G-43FH',
    category: 'clp-automacao',
    description: 'CLP com interface homem-máquina integrada de 4.3 polegadas, ideal para automação de pequeno porte com tela touch TFT de 60K cores.',
    specifications: {
      tela: '4.3 polegadas Touch TFT 60K cores',
      io_digital: '12DI/12DO (relay ou transistor)',
      io_analogico: '4AI (2xPT100, 1x0-10V, 1x4-20mA) / 2AO (1x0-10V, 1x4-20mA)',
      resolucao: '800x480 pixels',
      dimensoes: '134x102x34mm',
      memoria: '64MB RAM, 8MB Flash',
      cpu: '32bit 408MHz',
      comunicacao: ['RS485', 'RS232', 'Ethernet opcional', 'Type-C USB'],
      alimentacao: '24VDC',
      consumo: '4-6W',
      certificacoes: ['CE', 'RoHS'],
      compatibilidade: 'Mitsubishi FX3G/FX3U/FX3S'
    },
    priceRange: {
      min: convertUsdToBrl(203),
      max: convertUsdToBrl(400),
      currency: 'BRL'
    },
    price: convertUsdToBrl(400),
    hasPrice: true,
    requiresQuote: false,
    featured: true,
    manufacturer: 'Coolmay',
    images: processProductImage('Solicitar ao fabricante'),
    pdfManual: 'https://www.coolmay.com.ar/descargas/manuales/Coolmay_QM3G_Series_HMI_PLC_All-in-one_Programming_Manual_V20.91.pdf',
    linkProduto: 'https://shopping.coolmayplchmi.com/store-25011-qm3g-hmi-plc.htm'
  },
  {
    id: 'coolmay-qm3g-70fh',
    originalId: 2,
    name: 'CLP com IHM Incorporada - Coolmay QM3G-70FH',
    category: 'clp-automacao',
    description: 'CLP com interface de 7 polegadas para aplicações de médio porte, com até 30DI/30DO e comunicação Ethernet.',
    specifications: {
      tela: '7 polegadas Touch TFT 60K cores',
      io_digital: 'Até 30DI/30DO',
      io_analogico: 'Até 16AI/8AO',
      resolucao: '800x480 ou 1024x600 (HD)',
      dimensoes: '200x146x36mm',
      memoria: '64MB RAM, 16MB Flash',
      comunicacao: ['RS485', 'RS232', 'Ethernet', 'Modbus RTU/TCP'],
      alimentacao: '24VDC',
      consumo: '6-7W'
    },
    priceRange: {
      min: convertUsdToBrl(400),
      max: convertUsdToBrl(900),
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: true,
    manufacturer: 'Coolmay',
    images: processProductImage('Ver diagrama no manual'),
    pdfManual: 'https://manuals.plus/m/9f2b891107e045e33e27dfd2ff55cda6fcfe3c2db253082bba03c11755d196c5'
  },
  {
    id: 'coolmay-qm3g-100fh',
    originalId: 3,
    name: 'CLP com IHM Incorporada - Coolmay QM3G-100FH',
    category: 'clp-automacao',
    description: 'CLP com tela de 10.1 polegadas para grandes aplicações industriais, suporte WiFi opcional.',
    specifications: {
      tela: '10.1 polegadas Touch TFT',
      io_digital: '20DI/18DO ou 30DI/30DO',
      io_analogico: '16AI/8AO máximo',
      resolucao: '1024x600',
      dimensoes: '275x194x36mm',
      comunicacao: ['RS485', 'RS232', 'Ethernet', 'WiFi opcional'],
      alimentacao: '24VDC',
      consumo: '6-8W'
    },
    priceRange: {
      min: convertUsdToBrl(600),
      max: convertUsdToBrl(1200),
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: false,
    manufacturer: 'Coolmay',
    images: processProductImage('Solicitar catálogo ilustrado'),
    linkProduto: 'https://en.coolmay.com/Product-58.html'
  },
  {
    id: 'coolmay-ex3g-series',
    originalId: 4,
    name: 'IHM Touch Screen - Coolmay EX3G Series',
    category: 'clp-automacao',
    description: 'Série de IHMs touch screen com opções de 4.3", 7" e 10", protocolo Modbus e recursos avançados.',
    specifications: {
      series: 'EX3G-43FH, EX3G-70FH, EX3G-100FH',
      tela: '4.3", 7", 10" opções',
      resolucao: '800x480 até 1024x600',
      memoria: '128MB Flash + 64MB RAM',
      portas: 'USB, Ethernet, Serial',
      protocolo: 'Modbus RTU/TCP',
      recursos: 'NTC10K signal, PMW motor driver'
    },
    priceRange: {
      min: convertUsdToBrl(250),
      max: convertUsdToBrl(800),
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: false,
    manufacturer: 'Coolmay',
    images: processProductImage('Ver na página do produto'),
    linkProduto: 'https://coolmay.en.alibaba.com/'
  },
  {
    id: 'coolmay-vfd-series',
    originalId: 5,
    name: 'Inversores de Frequência - Coolmay VFD Series',
    category: 'clp-automacao',
    description: 'Inversores de frequência de 0.75kW a 400kW com controle vetorial e comunicação Modbus.',
    specifications: {
      potencia: '0.75kW a 400kW',
      tensao: '220V/380V/480V trifásico',
      controle: 'V/F, Vetorial sensorless',
      comunicacao: 'Modbus RTU',
      protecoes: 'Sobrecorrente, sobretensão, sobreaquecimento'
    },
    priceRange: {
      min: convertUsdToBrl(200),
      max: convertUsdToBrl(5000),
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: true,
    manufacturer: 'Coolmay',
    images: processProductImage('Solicitar ao fabricante'),
    linkProduto: 'https://en.coolmay.com/'
  },
  {
    id: 'coolmay-fonte-24v',
    originalId: 6,
    name: 'Fonte de Alimentação Industrial 24V',
    category: 'clp-automacao',
    description: 'Fontes chaveadas industriais de 60W a 480W com eficiência superior a 85% e montagem em trilho DIN.',
    specifications: {
      entrada: '100-240VAC',
      saida: '24VDC',
      potencia: '60W, 120W, 240W, 480W',
      eficiencia: '>85%',
      protecoes: 'Curto-circuito, sobrecarga, sobretensão',
      montagem: 'Trilho DIN'
    },
    priceRange: {
      min: convertUsdToBrl(30),
      max: convertUsdToBrl(150),
      currency: 'BRL'
    },
    price: convertUsdToBrl(150),
    hasPrice: true,
    requiresQuote: false,
    featured: false,
    manufacturer: 'Coolmay',
    images: processProductImage('Solicitar catálogo')
  },
  {
    id: 'coolmay-io-l02',
    originalId: 7,
    name: 'I/O Remoto - Módulo Expansão Coolmay L02',
    category: 'clp-automacao',
    description: 'Módulos de I/O remoto com comunicação RS485, Ethernet e CANopen para expansão de sistemas.',
    specifications: {
      series: 'L02M24R, L02M24T, L02M32R, L02M32T',
      entradas: '8DI a 32DI',
      saidas: '8DO a 32DO',
      comunicacao: 'RS485, Ethernet, CANopen, J1939',
      protocolo: 'Modbus RTU/TCP',
      alimentacao: '24VDC, 6mA',
      terminais: 'Push-type ou horn terminal block'
    },
    priceRange: {
      min: convertUsdToBrl(100),
      max: convertUsdToBrl(400),
      currency: 'BRL'
    },
    price: convertUsdToBrl(400),
    hasPrice: true,
    requiresQuote: false,
    featured: false,
    manufacturer: 'Coolmay',
    images: processProductImage('Ver especificações no site')
  },

  // Medidores de Vazão - Macsensor (IDs 8-19)
  {
    id: 'macsensor-eletromagnetico',
    originalId: 8,
    name: 'Medidor de Vazão Eletromagnético',
    category: 'medidores-vazao',
    description: 'Medidor eletromagnético de alta precisão para líquidos condutivos, diâmetros de DN15 a DN3000.',
    specifications: {
      tipo: 'Eletromagnético',
      diametro: 'DN15 a DN3000',
      precisao: '±0.5%',
      pressao_max: '1.6MPa (padrão), até 4.0MPa',
      temperatura: '-20°C a 150°C',
      revestimento: 'PTFE, Borracha Neoprene, PFA',
      eletrodos: '316L, Hastelloy C, Titânio, Tântalo',
      saida: '4-20mA, pulso, RS485, HART',
      alimentacao: '220VAC ou 24VDC',
      protecao: 'IP65/IP67'
    },
    priceRange: {
      min: convertUsdToBrl(800),
      max: convertUsdToBrl(5000),
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: true,
    manufacturer: 'Macsensor',
    images: processProductImage('Ver página do produto')
  },
  {
    id: 'macsensor-uf2000b',
    originalId: 9,
    name: 'Medidor de Vazão Ultrassônico Clamp-On UF2000B',
    category: 'medidores-vazao',
    description: 'Medidor ultrassônico não-invasivo clamp-on com datalogger integrado e múltiplas opções de saída.',
    specifications: {
      tipo: 'Ultrassônico transit-time não-invasivo',
      diametro: 'DN15 a DN6000mm',
      precisao: '±1%',
      linearidade: '0.5%',
      repetibilidade: '0.2%',
      display: '2x20 LCD com backlight',
      saidas: '4-20mA, OCT, Relé, RS485',
      temperatura_fluido: '-30°C a 90°C (padrão)',
      transdutores: 'TS-2, TM-1, TL-1 (clamp-on)',
      datalogger: '64 dias/64 meses/5 anos',
      alimentacao: '85-264VAC ou 24VDC'
    },
    priceRange: {
      min: convertUsdToBrl(299),
      max: convertUsdToBrl(450),
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: true,
    manufacturer: 'Macsensor',
    images: processProductImage('Ver manual PDF página 2-3'),
    pdfManual: 'https://www.macsensor.com/Content/upload/PDF/41304/Manual-MACSENSOR-UF2000B-Clamp-On-Ultrasonic-Flow-Meter.pdf'
  },

  // Sensores de Temperatura - HJ Sensor (IDs 20-23)
  {
    id: 'hjsensor-pt100',
    originalId: 20,
    name: 'Sensor de Temperatura Industrial PT100',
    category: 'sensores-temperatura',
    description: 'Sensor RTD PT100/PT1000 industrial classe A com bainha em aço inox 316L para aplicações de -200°C a 600°C.',
    specifications: {
      tipo: 'RTD PT100/PT1000',
      faixa: '-200°C a 600°C',
      classe: 'A (±0.15°C), B (±0.3°C) conforme IEC 60751',
      elemento: '3 ou 4 fios',
      bainha: 'Aço inox 316L',
      diametro_bainha: '3mm, 4.5mm, 6mm, 8mm, 10mm, 12mm',
      comprimento: '50mm a 2000mm',
      conexao: 'Rosca, flange, tri-clamp',
      tempo_resposta: 'T90 < 10 segundos'
    },
    priceRange: {
      min: convertUsdToBrl(50),
      max: convertUsdToBrl(300),
      currency: 'BRL'
    },
    price: convertUsdToBrl(300),
    hasPrice: true,
    requiresQuote: false,
    featured: true,
    manufacturer: 'HJ Sensor',
    images: processProductImage('Solicitar catálogo')
  },
  {
    id: 'hjsensor-transmissor-temp',
    originalId: 21,
    name: 'Transmissor de Temperatura 4-20mA',
    category: 'sensores-temperatura',
    description: 'Transmissor universal 4-20mA para PT100, termopares e sinais analógicos com precisão de ±0.1% e comunicação HART opcional.',
    specifications: {
      entrada: 'PT100, PT1000, TC tipo K/J/T/E/N/S/R/B',
      saida: '4-20mA (2 fios), HART opcional',
      precisao: '±0.1% do span',
      alimentacao: '12-36VDC',
      display: 'LCD 4 dígitos opcional',
      montagem: 'Cabeçote, trilho DIN, campo',
      configuracao: 'PC software ou HART',
      protecao: 'IP65/IP67',
      aprovacoes: 'CE, ATEX opcional'
    },
    priceRange: {
      min: convertUsdToBrl(100),
      max: convertUsdToBrl(400),
      currency: 'BRL'
    },
    price: convertUsdToBrl(400),
    hasPrice: true,
    requiresQuote: false,
    featured: false,
    manufacturer: 'HJ Sensor',
    images: processProductImage('Ver especificações técnicas')
  },

  // Sensores de Pressão - Macsensor (IDs 24-35)
  {
    id: 'macsensor-pressao-p10',
    originalId: 24,
    name: 'Sensor de Pressão Industrial P10',
    category: 'sensores-pressao',
    description: 'Sensor de pressão industrial robusto de 0-1 a 0-600 bar com precisão ±0.5%FS e saída 4-20mA.',
    specifications: {
      modelo: 'P10',
      faixa: '0-1 bar até 0-600 bar',
      precisao: '±0.5%FS (±0.25%FS opcional)',
      saida: '4-20mA, 0-5V, 0-10V, 0.5-4.5V',
      alimentacao: '12-36VDC',
      conexao: 'G1/4, G1/2, 1/4NPT, 1/2NPT, M20x1.5',
      protecao: 'IP65',
      temperatura_operacao: '-40°C a 125°C',
      material: 'Aço inox 17-4PH ou 316L',
      certificacoes: 'CE, RoHS'
    },
    priceRange: {
      min: convertUsdToBrl(80),
      max: convertUsdToBrl(300),
      currency: 'BRL'
    },
    price: convertUsdToBrl(300),
    hasPrice: true,
    requiresQuote: false,
    featured: true,
    manufacturer: 'Macsensor',
    images: processProductImage('Ver página do produto')
  },
  {
    id: 'macsensor-pressao-compacto',
    originalId: 25,
    name: 'Transdutor de Pressão Compacto',
    category: 'sensores-pressao',
    description: 'Transdutor miniatura Ø19mm para sistemas hidráulicos móveis com alta resistência a vibração e choque.',
    specifications: {
      tamanho: 'Miniatura Ø19mm x 50mm',
      faixa: '0-10 bar até 0-400 bar',
      precisao: '±0.25%FS',
      saida: '4-20mA, 0-5V, 0.5-4.5V ratiométrico',
      aplicacao: 'Sistemas hidráulicos móveis',
      vibracao: '20g conforme IEC 60068-2-6',
      choque: '100g conforme IEC 60068-2-27',
      vida_util: '> 100 milhões de ciclos'
    },
    priceRange: {
      min: convertUsdToBrl(100),
      max: convertUsdToBrl(400),
      currency: 'BRL'
    },
    price: convertUsdToBrl(400),
    hasPrice: true,
    requiresQuote: false,
    featured: false,
    manufacturer: 'Macsensor',
    images: processProductImage('Consultar catálogo')
  },

  // Sensores de Nível - Macsensor (IDs 42-55)
  {
    id: 'macsensor-nivel-l702',
    originalId: 42,
    name: 'Sensor de Pressão Submersível L702',
    category: 'sensores-nivel',
    description: 'Sensor de nível submersível por pressão hidrostática com cabo ventilado e precisão ±0.5%FS.',
    specifications: {
      tipo: 'Pressão hidrostática piezoresistivo',
      modelo: 'L702',
      faixa: '0-1m, 0-5m, 0-10m, 0-20m até 0-200m H2O',
      precisao: '±0.5%FS (±0.25%FS opcional)',
      saida: '4-20mA (2 fios)',
      cabo: 'PUR ventilado, 5m a 500m',
      protecao: 'IP68',
      material: 'Aço inox 316L',
      diametro: 'Ø19mm ou Ø26.5mm',
      compensacao: 'Atmosférica via tubo capilar no cabo',
      temperatura: '-20°C a 80°C'
    },
    priceRange: {
      min: convertUsdToBrl(150),
      max: convertUsdToBrl(400),
      currency: 'BRL'
    },
    price: convertUsdToBrl(400),
    hasPrice: true,
    requiresQuote: false,
    featured: true,
    manufacturer: 'Macsensor',
    images: processProductImage('Ver na página do produto')
  },
  {
    id: 'macsensor-nivel-hidrostatico',
    originalId: 43,  
    name: 'Transmissor de Nível Hidrostático Submersível L703',
    category: 'sensores-nivel',
    description: 'Transmissor para poços profundos e reservatórios com comunicação RS485 Modbus e precisão ±0.25%FS.',
    specifications: {
      aplicacao: 'Poços profundos, tanques, reservatórios',
      faixa: '0-5m até 0-500m H2O',
      saida: '4-20mA, RS485 Modbus',
      precisao: '±0.25%FS',
      diametro: '19mm (poços estreitos) ou 28mm',
      material: '316L, Titânio opcional',
      cabo: 'PE, FEP ou PUR'
    },
    priceRange: {
      min: convertUsdToBrl(200),
      max: convertUsdToBrl(600),
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: false,
    manufacturer: 'Macsensor',
    images: processProductImage('Ver no Alibaba')
  },

  // Controle de Acesso - Telemática (IDs 56-79)
  {
    id: 'telematica-gb300',
    originalId: 56,
    name: 'Catraca Gabinete GB300',
    category: 'controle-acesso',
    description: 'Catraca robusta tipo gabinete em aço inox com capacidade de 30 pessoas/minuto e múltiplas tecnologias de leitura.',
    specifications: {
      tipo: 'Gabinete/balcão',
      material: 'Aço inox escovado ou pintado preto',
      bracos: '3 braços articulados em aço inox',
      fluxo: 'Bidirecional',
      capacidade: '30 pessoas/minuto',
      leitoras: 'Proximidade, biometria, QR Code, facial',
      software: 'Integração Suricato',
      mecanismo: 'Eletromecânico com amortecedor',
      alimentacao: '110/220VAC',
      consumo: '50W'
    },
    priceRange: {
      min: 8000,
      max: 15000,
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: true,
    manufacturer: 'Telemática',
    images: processProductImage('Solicitar catálogo ilustrado')
  },
  {
    id: 'telematica-codinrep4000',
    originalId: 74,
    name: 'CodinReP 4000',
    category: 'controle-acesso',
    description: 'Relógio de ponto eletrônico REP-P homologado com biometria FAP20, impressora térmica e comunicação Ethernet.',
    specifications: {
      tipo: 'REP-P Portaria 671',
      capacidade: '15.000 funcionários',
      biometria: 'FAP20 1:N até 10.000',
      impressora: 'Térmica 58mm integrada',
      display: 'LCD 3.5" colorido',
      comunicacao: 'Ethernet, 3G/4G opcional',
      memoria: '1GB fiscal protegida',
      backup: 'Bateria 6h',
      software: 'ConexREP incluído'
    },
    priceRange: {
      min: 3000,
      max: 5000,
      currency: 'BRL'
    },
    hasPrice: false,
    requiresQuote: true,
    featured: false,
    manufacturer: 'Telemática',
    images: processProductImage('Ver homologação')
  }
]

// Função para buscar produtos por categoria
export function getProductsByCategory(categorySlug: string, limit?: number): Product[] {
  const filtered = products.filter(p => {
    const category = categories.find(c => c.slug === categorySlug)
    return category && p.category === category.id
  })
  return limit ? filtered.slice(0, limit) : filtered
}

// Função para buscar produtos em destaque
export function getFeaturedProducts(limit?: number): Product[] {
  const featured = products.filter(p => p.featured)
  return limit ? featured.slice(0, limit) : featured
}

// Função para buscar produto por ID
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

// Função para buscar categoria por slug
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}