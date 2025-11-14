import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

export default async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { slug } = req.query

    // Get manager from container
    const manager = req.scope.resolve("manager")
    const queryRunner = manager.connection.createQueryRunner()

    try {
      // Buscar categoria por slug
      if (slug) {
        const result = await queryRunner.query(
          `SELECT * FROM category WHERE slug = $1 AND is_active = true`,
          [slug]
        )
        if (result.length === 0) {
          return res.status(404).json({ message: "Category not found" })
        }
        // Parse JSON fields
        const cat = result[0]
        try {
          const category = {
            ...cat,
            image_paths: cat.image_paths ? (typeof cat.image_paths === 'string' ? JSON.parse(cat.image_paths) : cat.image_paths) : null,
            metadata: cat.metadata ? (typeof cat.metadata === 'string' ? JSON.parse(cat.metadata) : cat.metadata) : null,
          }
          return res.json({ category })
        } catch (e) {
          const category = {
            ...cat,
            image_paths: cat.image_paths,
            metadata: cat.metadata,
          }
          return res.json({ category })
        }
      }

      // Buscar todas as categorias ativas
      const result = await queryRunner.query(
        `SELECT * FROM category WHERE is_active = true ORDER BY "order" ASC`
      )

      // Parse JSON fields
      const categories = result.map((cat: any) => {
        try {
          return {
            ...cat,
            image_paths: cat.image_paths ? (typeof cat.image_paths === 'string' ? JSON.parse(cat.image_paths) : cat.image_paths) : null,
            metadata: cat.metadata ? (typeof cat.metadata === 'string' ? JSON.parse(cat.metadata) : cat.metadata) : null,
          }
        } catch (e) {
          return {
            ...cat,
            image_paths: cat.image_paths,
            metadata: cat.metadata,
          }
        }
      })

      res.json({ categories })
    } finally {
      await queryRunner.release()
    }
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}
