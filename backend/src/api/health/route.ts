import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export default async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // Simple health check endpoint
    res.status(200).json({ 
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "medusa-backend"
    })
  } catch (error) {
    res.status(500).json({ 
      status: "error",
      message: error.message 
    })
  }
}

