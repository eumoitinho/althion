import { NextRequest, NextResponse } from 'next/server'

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'

interface OrderItem {
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  subtotal: number
}

interface CustomerData {
  nome: string
  email: string
  telefone: string
  cpf: string
  isEmpresa?: boolean
  razaoSocial?: string
  cnpj?: string
  inscricaoEstadual?: string
}

interface AddressData {
  cep: string
  endereco: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

interface OrderRequest {
  type: 'purchase' | 'quote'
  customer: CustomerData
  address: AddressData
  items: OrderItem[]
  payment_method?: string
  subtotal: number
  shipping: number
  total: number
}

// POST - Criar novo pedido/orçamento
export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json()
    const { type, customer, address, items, payment_method, subtotal, shipping, total } = body

    // Validação básica
    if (!customer?.nome || !customer?.email || !items?.length) {
      return NextResponse.json(
        { success: false, error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Gerar número do pedido
    const orderNumber = `${type === 'quote' ? 'ORC' : 'PED'}-${Date.now().toString(36).toUpperCase()}`

    // Criar o pedido no Medusa via Admin API
    // Como não há pagamento real, criamos um draft order
    const draftOrderData = {
      email: customer.email,
      region_id: process.env.MEDUSA_REGION_ID || 'reg_01JGVBHJQH2G0DWP1M6Y97MHP8', // Região padrão Brasil
      shipping_methods: [
        {
          option_id: process.env.MEDUSA_SHIPPING_OPTION_ID || 'so_01JGVBHJST56GE1QG6NXZQQMS1', // Opção de frete padrão
          price: Math.round(shipping * 100) // Medusa usa centavos
        }
      ],
      items: items.map(item => ({
        variant_id: item.product_id, // Assumindo que product_id é variant_id
        quantity: item.quantity,
        unit_price: Math.round(item.unit_price * 100),
        title: item.product_name,
        metadata: {
          original_price: item.unit_price
        }
      })),
      shipping_address: {
        first_name: customer.nome.split(' ')[0],
        last_name: customer.nome.split(' ').slice(1).join(' ') || '-',
        address_1: `${address.endereco}, ${address.numero}`,
        address_2: address.complemento || '',
        city: address.cidade,
        province: address.estado,
        postal_code: address.cep,
        country_code: 'br',
        phone: customer.telefone
      },
      billing_address: {
        first_name: customer.nome.split(' ')[0],
        last_name: customer.nome.split(' ').slice(1).join(' ') || '-',
        address_1: `${address.endereco}, ${address.numero}`,
        address_2: address.complemento || '',
        city: address.cidade,
        province: address.estado,
        postal_code: address.cep,
        country_code: 'br',
        phone: customer.telefone
      },
      metadata: {
        order_number: orderNumber,
        type: type,
        cpf: customer.cpf,
        is_empresa: customer.isEmpresa || false,
        razao_social: customer.razaoSocial || '',
        cnpj: customer.cnpj || '',
        inscricao_estadual: customer.inscricaoEstadual || '',
        payment_method: payment_method || 'pending',
        created_from: 'storefront'
      },
      no_notification_order: false
    }

    try {
      // Tentar criar draft order no Medusa
      const medusaResponse = await fetch(`${MEDUSA_URL}/admin/draft-orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-medusa-access-token': process.env.MEDUSA_ADMIN_API_KEY || ''
        },
        body: JSON.stringify(draftOrderData)
      })

      if (medusaResponse.ok) {
        const medusaData = await medusaResponse.json()
        console.log(`✅ Draft order criado no Medusa: ${medusaData.draft_order?.id}`)

        return NextResponse.json({
          success: true,
          message: type === 'quote' ? 'Orçamento enviado com sucesso!' : 'Pedido realizado com sucesso!',
          order: {
            id: medusaData.draft_order?.id,
            number: orderNumber,
            type: type,
            status: 'pending',
            total: total,
            created_at: new Date().toISOString()
          }
        }, { status: 201 })
      } else {
        const errorData = await medusaResponse.text()
        console.error('Erro Medusa:', errorData)
        // Fallback: salvar localmente se Medusa falhar
        throw new Error('Medusa API error')
      }
    } catch (medusaError) {
      console.warn('Medusa não disponível, salvando localmente:', medusaError)

      // Fallback: salvar em arquivo local (para não perder o pedido)
      const { promises: fs } = await import('fs')
      const path = await import('path')

      const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')

      // Garantir que diretório existe
      const dir = path.dirname(ORDERS_FILE)
      try {
        await fs.access(dir)
      } catch {
        await fs.mkdir(dir, { recursive: true })
      }

      // Ler orders existentes ou criar array vazio
      let orders: any[] = []
      try {
        const data = await fs.readFile(ORDERS_FILE, 'utf-8')
        orders = JSON.parse(data)
      } catch {
        orders = []
      }

      // Criar order local
      const localOrder = {
        id: `local_${Date.now()}`,
        number: orderNumber,
        type: type,
        customer: customer,
        address: address,
        items: items,
        payment_method: payment_method || 'pending',
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        status: 'pending',
        created_at: new Date().toISOString(),
        synced_to_medusa: false
      }

      orders.unshift(localOrder)
      await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2))

      console.log(`✅ Pedido salvo localmente: ${orderNumber}`)

      return NextResponse.json({
        success: true,
        message: type === 'quote' ? 'Orçamento enviado com sucesso!' : 'Pedido realizado com sucesso!',
        order: {
          id: localOrder.id,
          number: orderNumber,
          type: type,
          status: 'pending',
          total: total,
          created_at: localOrder.created_at
        }
      }, { status: 201 })
    }

  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao processar pedido. Tente novamente.' },
      { status: 500 }
    )
  }
}

// GET - Listar pedidos (para admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'quote' ou 'purchase'

    // Tentar buscar do Medusa primeiro
    try {
      const medusaResponse = await fetch(`${MEDUSA_URL}/admin/draft-orders?limit=100`, {
        headers: {
          'x-medusa-access-token': process.env.MEDUSA_ADMIN_API_KEY || ''
        }
      })

      if (medusaResponse.ok) {
        const data = await medusaResponse.json()
        let orders = data.draft_orders || []

        // Filtrar por tipo se especificado
        if (type) {
          orders = orders.filter((o: any) => o.metadata?.type === type)
        }

        return NextResponse.json({
          success: true,
          orders: orders,
          total: orders.length
        })
      }
    } catch {
      console.warn('Medusa não disponível, buscando localmente')
    }

    // Fallback: buscar localmente
    const { promises: fs } = await import('fs')
    const path = await import('path')
    const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json')

    try {
      const data = await fs.readFile(ORDERS_FILE, 'utf-8')
      let orders = JSON.parse(data)

      if (type) {
        orders = orders.filter((o: any) => o.type === type)
      }

      return NextResponse.json({
        success: true,
        orders: orders,
        total: orders.length
      })
    } catch {
      return NextResponse.json({
        success: true,
        orders: [],
        total: 0
      })
    }

  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar pedidos' },
      { status: 500 }
    )
  }
}
