import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export default async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { type, slug } = req.query

    // Get manager from container
    const manager = req.scope.resolve("manager")
    const queryRunner = manager.connection.createQueryRunner()

    try {
      // Buscar conteúdo por slug
      if (slug) {
        const result = await queryRunner.query(
          `SELECT * FROM content WHERE slug = $1 AND is_active = true`,
          [slug]
        )
        if (result.length === 0) {
          return res.status(404).json({ message: "Content not found" })
        }
        // Parse JSON fields
        const cnt = result[0]
        try {
          const content = {
            ...cnt,
            content: cnt.content ? (typeof cnt.content === 'string' ? JSON.parse(cnt.content) : cnt.content) : null,
            metadata: cnt.metadata ? (typeof cnt.metadata === 'string' ? JSON.parse(cnt.metadata) : cnt.metadata) : null,
          }
          return res.json({ content })
        } catch (e) {
          const content = {
            ...cnt,
            content: cnt.content,
            metadata: cnt.metadata,
          }
          return res.json({ content })
        }
      }

      // Buscar conteúdo por tipo
      if (type) {
        const result = await queryRunner.query(
          `SELECT * FROM content WHERE type = $1 AND is_active = true ORDER BY "order" ASC`,
          [type]
        )
        // Parse JSON fields
        const content = result.map((cnt: any) => {
          try {
            return {
              ...cnt,
              content: cnt.content ? (typeof cnt.content === 'string' ? JSON.parse(cnt.content) : cnt.content) : null,
              metadata: cnt.metadata ? (typeof cnt.metadata === 'string' ? JSON.parse(cnt.metadata) : cnt.metadata) : null,
            }
          } catch (e) {
            return {
              ...cnt,
              content: cnt.content,
              metadata: cnt.metadata,
            }
          }
        })
        return res.json({ content })
      }

      // Buscar todo o conteúdo ativo
      const result = await queryRunner.query(
        `SELECT * FROM content WHERE is_active = true ORDER BY "order" ASC`
      )

      // Parse JSON fields
      const content = result.map((cnt: any) => {
        try {
          return {
            ...cnt,
            content: cnt.content ? (typeof cnt.content === 'string' ? JSON.parse(cnt.content) : cnt.content) : null,
            metadata: cnt.metadata ? (typeof cnt.metadata === 'string' ? JSON.parse(cnt.metadata) : cnt.metadata) : null,
          }
        } catch (e) {
          return {
            ...cnt,
            content: cnt.content,
            metadata: cnt.metadata,
          }
        }
      })

      res.json({ content })
    } finally {
      await queryRunner.release()
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}
