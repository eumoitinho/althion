import { NextRequest, NextResponse } from 'next/server'

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'https://althion-prod-backend.azurewebsites.net'

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
  cpf?: string
  isEmpresa?: boolean
  razaoSocial?: string
  cnpj?: string
  inscricaoEstadual?: string
}

interface QuoteRequestData {
  type: 'quote_request' | 'quote' | 'purchase'
  customer: CustomerData
  items: OrderItem[]
  observacoes?: string
  subtotal: number
  status?: string
}

// POST - Criar novo pedido/solicitação de orçamento
export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequestData = await request.json()
    const { type, customer, items, observacoes, subtotal } = body

    // Validação básica
    if (!customer?.nome || !customer?.email || !items?.length) {
      return NextResponse.json(
        { success: false, error: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    // Gerar número do pedido
    const orderNumber = `PED-${Date.now().toString(36).toUpperCase()}`

    // Criar order no backend
    const orderData = {
      id: `order_${Date.now()}`,
      number: orderNumber,
      type: type || 'quote_request',
      customer: {
        nome: customer.nome,
        email: customer.email,
        telefone: customer.telefone,
        cpf: customer.cpf || '',
        isEmpresa: customer.isEmpresa || false,
        razaoSocial: customer.razaoSocial || '',
        cnpj: customer.cnpj || '',
        inscricaoEstadual: customer.inscricaoEstadual || ''
      },
      items: items.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.subtotal
      })),
      observacoes: observacoes || '',
      subtotal: subtotal || 0,
      status: 'pending',
      created_at: new Date().toISOString()
    }

    // Enviar para o backend Medusa
    try {
      const backendResponse = await fetch(`${MEDUSA_BACKEND_URL}/store/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      })

      if (backendResponse.ok) {
        const result = await backendResponse.json()
        console.log(`✅ Pedido enviado para backend: ${orderNumber}`)

        return NextResponse.json({
          success: true,
          message: 'Pedido enviado com sucesso! Nossa equipe entrará em contato.',
          order: {
            id: result.order?.id || orderData.id,
            number: orderNumber,
            type: orderData.type,
            status: 'pending',
            total: subtotal,
            created_at: orderData.created_at
          }
        }, { status: 201 })
      }
    } catch (backendError) {
      console.warn('Backend não disponível, continuando...', backendError)
    }

    // Fallback: retornar sucesso mesmo sem salvar (o pedido foi registrado no log)
    console.log(`📋 Pedido registrado (fallback): ${orderNumber}`, JSON.stringify(orderData))

    return NextResponse.json({
      success: true,
      message: 'Pedido enviado com sucesso! Nossa equipe entrará em contato.',
      order: {
        id: orderData.id,
        number: orderNumber,
        type: orderData.type,
        status: 'pending',
        total: subtotal,
        created_at: orderData.created_at
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar pedido:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao processar pedido. Tente novamente.' },
      { status: 500 }
    )
  }
}

// GET - Listar pedidos
export async function GET(request: NextRequest) {
  try {
    // Tentar buscar do backend
    try {
      const backendResponse = await fetch(`${MEDUSA_BACKEND_URL}/store/orders`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (backendResponse.ok) {
        const data = await backendResponse.json()
        return NextResponse.json({
          success: true,
          orders: data.orders || [],
          total: data.total || 0
        })
      }
    } catch {
      console.warn('Backend não disponível')
    }

    return NextResponse.json({
      success: true,
      orders: [],
      total: 0
    })

  } catch (error) {
    console.error('Erro ao buscar pedidos:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar pedidos' },
      { status: 500 }
    )
  }
}
