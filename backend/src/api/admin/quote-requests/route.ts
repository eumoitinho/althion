import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import * as fs from "fs"
import * as path from "path"

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json")

// Ler pedidos
function readOrders(): any[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      return []
    }
    const data = fs.readFileSync(ORDERS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Salvar pedidos
function saveOrders(orders: any[]) {
  const dir = path.dirname(ORDERS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8")
}

// GET - Listar pedidos de orçamento
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const orders = readOrders()

    res.json({
      quote_requests: orders,
      count: orders.length,
      offset: 0,
      limit: 100
    })
  } catch (error) {
    console.error("Error fetching quote requests:", error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
}

// GET by ID - Buscar pedido específico
export async function GET_BY_ID(req: MedusaRequest, res: MedusaResponse) {
  try {
    const { id } = req.params
    const orders = readOrders()
    const order = orders.find(o => o.id === id || o.number === id)

    if (!order) {
      return res.status(404).json({
        message: "Quote request not found"
      })
    }

    res.json({ quote_request: order })
  } catch (error) {
    console.error("Error fetching quote request:", error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
}

// POST - Atualizar status do pedido
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const { id } = req.params
    const { status, notes } = req.body as any

    const orders = readOrders()
    const orderIndex = orders.findIndex(o => o.id === id || o.number === id)

    if (orderIndex === -1) {
      return res.status(404).json({
        message: "Quote request not found"
      })
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      status: status || orders[orderIndex].status,
      admin_notes: notes || orders[orderIndex].admin_notes,
      updated_at: new Date().toISOString()
    }

    saveOrders(orders)

    res.json({ quote_request: orders[orderIndex] })
  } catch (error) {
    console.error("Error updating quote request:", error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
}

export default async (req: MedusaRequest, res: MedusaResponse) => {
  if (req.method === "GET") {
    if (req.params?.id) {
      return GET_BY_ID(req, res)
    }
    return GET(req, res)
  } else if (req.method === "POST" && req.params?.id) {
    return POST(req, res)
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}
