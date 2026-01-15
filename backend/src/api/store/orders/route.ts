import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import * as fs from "fs"
import * as path from "path"

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json")

function ensureOrdersFile() {
  const dir = path.dirname(ORDERS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, "[]", "utf-8")
  }
}

function readOrders(): any[] {
  ensureOrdersFile()
  try {
    const data = fs.readFileSync(ORDERS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

function saveOrders(orders: any[]) {
  ensureOrdersFile()
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8")
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const orderService = req.scope.resolve("orderService")

    try {
      const { orders } = await orderService.listAndCount({}, {
        relations: ["customer", "items", "billing_address", "shipping_address"],
        order: { created_at: "DESC" }
      })

      const formattedOrders = orders.map((order: any) => ({
        id: order.id,
        number: order.metadata?.order_number || order.display_id || order.id,
        type: order.metadata?.type || "quote_request",
        customer: {
          nome: order.metadata?.customer_name || `${order.customer?.first_name} ${order.customer?.last_name}`,
          email: order.email || order.customer?.email,
          telefone: order.metadata?.customer_phone || order.customer?.phone,
          cpf: order.metadata?.customer_cpf || "",
          isEmpresa: order.metadata?.is_empresa || false,
          razaoSocial: order.metadata?.razao_social || "",
          cnpj: order.metadata?.cnpj || ""
        },
        items: order.items?.map((item: any) => ({
          product_id: item.variant_id,
          product_name: item.title,
          quantity: item.quantity,
          unit_price: item.unit_price / 100,
          subtotal: (item.unit_price * item.quantity) / 100
        })) || [],
        observacoes: order.metadata?.observacoes || "",
        subtotal: order.subtotal ? order.subtotal / 100 : 0,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at
      }))

      return res.json({
        success: true,
        orders: formattedOrders,
        total: formattedOrders.length
      })
    } catch (medusaError) {
      console.warn("Erro ao buscar orders do Medusa:", medusaError)
    }

    const orders = readOrders()
    res.json({
      success: true,
      orders,
      total: orders.length
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({
      success: false,
      error: "Erro ao buscar pedidos"
    })
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const orderData = req.body as any

    if (!orderData?.customer?.nome || !orderData?.customer?.email || !orderData?.items?.length) {
      return res.status(400).json({
        success: false,
        error: "Dados obrigatórios não fornecidos"
      })
    }

    const orderNumber = orderData.number || `PED-${Date.now().toString(36).toUpperCase()}`

    console.log("📝 Criando order:", orderNumber)
    console.log("Cliente:", orderData.customer.email)
    console.log("Itens:", orderData.items.length)

    try {
      const customerService = req.scope.resolve("customerService")
      const regionService = req.scope.resolve("regionService")
      const cartService = req.scope.resolve("cartService")
      const orderService = req.scope.resolve("orderService")

      // 1. Buscar ou criar cliente
      let customer
      try {
        const customers = await customerService.list({ email: orderData.customer.email })
        customer = customers.length > 0 ? customers[0] : null
        if (customer) {
          console.log("✅ Cliente encontrado:", customer.id)
        }
      } catch (err) {
        console.log("Cliente não encontrado")
      }

      if (!customer) {
        const [firstName, ...lastNameParts] = orderData.customer.nome.split(" ")
        customer = await customerService.create({
          email: orderData.customer.email,
          first_name: firstName,
          last_name: lastNameParts.join(" ") || "-",
          phone: orderData.customer.telefone,
          metadata: {
            cpf: orderData.customer.cpf || "",
            is_empresa: orderData.customer.isEmpresa || false,
            razao_social: orderData.customer.razaoSocial || "",
            cnpj: orderData.customer.cnpj || ""
          }
        })
        console.log(`✅ Cliente criado: ${customer.id} - ${customer.email}`)
      }

      // 2. Buscar região Brasil (BRL)
      const regions = await regionService.list({})
      const region = regions.find((r: any) => r.currency_code === 'brl') || regions[0]

      if (!region) {
        throw new Error("Nenhuma região configurada no Medusa")
      }
      console.log("✅ Região:", region.id, region.currency_code)

      // 3. Criar carrinho
      const cart = await cartService.create({
        region_id: region.id,
        customer_id: customer.id,
        email: orderData.customer.email,
        metadata: {
          order_number: orderNumber,
          type: orderData.type || "quote_request",
          customer_name: orderData.customer.nome,
          customer_phone: orderData.customer.telefone,
          customer_cpf: orderData.customer.cpf || "",
          is_empresa: orderData.customer.isEmpresa || false,
          razao_social: orderData.customer.razaoSocial || "",
          cnpj: orderData.customer.cnpj || "",
          observacoes: orderData.observacoes || "",
          created_from: "storefront"
        }
      })
      console.log("✅ Carrinho criado:", cart.id)

      // 4. Adicionar itens ao carrinho
      const productVariantService = req.scope.resolve("productVariantService")
      const lineItemService = req.scope.resolve("lineItemService")

      for (const item of orderData.items) {
        try {
          // Buscar informações da variante
          const variant = await productVariantService.retrieve(item.product_id, {
            relations: ["product", "prices"]
          })

          // Buscar o preço correto para a região
          const price = variant.prices?.find((p: any) =>
            p.currency_code === "brl" && !p.region_id && !p.price_list_id
          ) || variant.prices?.[0]

          if (!price) {
            throw new Error(`Variante ${item.product_id} não possui preço configurado`)
          }

          // Criar line item manualmente com todos os campos necessários
          await lineItemService.create({
            cart_id: cart.id,
            title: variant.product.title,
            description: variant.title,
            thumbnail: variant.product.thumbnail || undefined,
            unit_price: price.amount,
            variant_id: item.product_id,
            quantity: item.quantity,
            metadata: {}
          })

          console.log(`✅ Item adicionado: ${variant.product.title} - ${variant.title}`)
        } catch (variantError: any) {
          console.error(`❌ Erro ao adicionar item:`, variantError.message)
          throw variantError
        }
      }

      // Atualizar o carrinho para recalcular totais
      await cartService.retrieve(cart.id, {
        relations: ["items"]
      })

      // 5. Adicionar endereços ao carrinho
      const [firstName, ...lastNameParts] = orderData.customer.nome.split(" ")
      const addressData = {
        first_name: firstName,
        last_name: lastNameParts.join(" ") || "-",
        address_1: "Pedido via e-commerce",
        city: "São Paulo",
        country_code: "br",
        province: "SP",
        postal_code: "00000-000",
        phone: orderData.customer.telefone
      }

      await cartService.update(cart.id, {
        billing_address: addressData,
        shipping_address: addressData,
        email: orderData.customer.email
      })

      console.log("✅ Endereços configurados")

      // 6. Buscar cart completo com items
      const fullCart = await cartService.retrieve(cart.id, {
        relations: ["items", "items.variant"]
      })

      // 7. Criar Draft Order (perfeito para quote requests sem pagamento)
      const draftOrderService = req.scope.resolve("draftOrderService")
      const draftOrder = await draftOrderService.create({
        region_id: region.id,
        email: orderData.customer.email,
        customer_id: customer.id,
        billing_address: addressData,
        shipping_address: addressData,
        items: fullCart.items.map((item: any) => ({
          variant_id: item.variant_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          title: item.title,
          metadata: item.metadata
        })),
        shipping_methods: [],
        metadata: {
          order_number: orderNumber,
          type: "quote_request",
          customer_name: orderData.customer.nome,
          customer_phone: orderData.customer.telefone,
          customer_cpf: orderData.customer.cpf || "",
          is_empresa: orderData.customer.isEmpresa || false,
          razao_social: orderData.customer.razaoSocial || "",
          cnpj: orderData.customer.cnpj || "",
          observacoes: orderData.observacoes || ""
        }
      })

      const order = draftOrder.order
      console.log(`✅ Draft Order criado no Medusa: ${order.id} / Draft: ${draftOrder.id} (${orderNumber})`)

      // 7. Atualizar metadata do order
      await orderService.update(order.id, {
        metadata: {
          ...order.metadata,
          order_number: orderNumber,
          display_id: orderNumber,
          customer_name: orderData.customer.nome,
          customer_phone: orderData.customer.telefone
        }
      })

      return res.status(201).json({
        success: true,
        message: "Pedido criado com sucesso",
        order: {
          id: order.id,
          number: orderNumber,
          status: order.status,
          created_at: order.created_at
        }
      })

    } catch (medusaError: any) {
      console.error("❌ Erro detalhado ao criar order no Medusa:")
      console.error("  Mensagem:", medusaError.message)
      console.error("  Stack:", medusaError.stack)

      // Fallback: salvar em arquivo JSON
      const order = {
        ...orderData,
        id: orderData.id || `order_${Date.now()}`,
        number: orderNumber,
        status: orderData.status || "pending",
        created_at: orderData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        medusa_error: medusaError.message
      }

      const orders = readOrders()
      orders.unshift(order)
      saveOrders(orders)

      console.log(`⚠️  Pedido salvo em fallback (JSON): ${order.number}`)

      return res.status(201).json({
        success: true,
        message: "Pedido criado com sucesso",
        order: {
          id: order.id,
          number: order.number,
          status: order.status,
          created_at: order.created_at
        },
        warning: "Pedido salvo localmente - verificar logs do Medusa"
      })
    }

  } catch (error: any) {
    console.error("❌ Error creating order:", error)
    res.status(500).json({
      success: false,
      error: "Erro ao criar pedido"
    })
  }
}

export default async (req: MedusaRequest, res: MedusaResponse) => {
  if (req.method === "GET") {
    return GET(req, res)
  } else if (req.method === "POST") {
    return POST(req, res)
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
