import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

// NOTE: For development, authentication is disabled. 
// In production, you should add authentication middleware here.
// Example: const loggedInUser = req.scope.resolve("loggedInUser")
// if (!loggedInUser) return res.status(401).json({ message: "Unauthorized" })

export default async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // Get manager from container
    const manager = req.scope.resolve("manager")
    const { Category } = await import("../../../models/category")
    
    const categoryRepository = manager.getRepository(Category)

    if (req.method === "GET") {
      const { slug } = req.query

      if (slug) {
        const category = await categoryRepository.findOne({
          where: { slug: slug as string },
        })
        if (!category) {
          return res.status(404).json({ message: "Category not found" })
        }
        return res.json({ category })
      }

      const categories = await categoryRepository.find({
        order: { order: "ASC" },
      })
      return res.json({ categories })
    }

    if (req.method === "POST") {
      const body = req.body as any
      const { slug, name, description, icon, image, image_paths, is_active, order, metadata } = body

      const newCategory = categoryRepository.create({
        slug,
        name,
        description,
        icon,
        image,
        image_paths,
        is_active: is_active !== undefined ? is_active : true,
        order: order || 0,
        metadata,
      })

      const savedCategory = await categoryRepository.save(newCategory)
      return res.json({ category: savedCategory })
    }

    if (req.method === "PUT") {
      const body = req.body as any
      const { id } = body
      const updates = { ...body }
      delete updates.id

      if (!id) {
        return res.status(400).json({ message: "ID is required" })
      }

      const category = await categoryRepository.findOne({
        where: { id },
      })

      if (!category) {
        return res.status(404).json({ message: "Category not found" })
      }

      Object.assign(category, updates)
      const updatedCategory = await categoryRepository.save(category)
      return res.json({ category: updatedCategory })
    }

    if (req.method === "DELETE") {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ message: "ID is required" })
      }

      await categoryRepository.delete({ id: id as string })
      return res.json({ message: "Category deleted" })
    }

    res.status(405).json({ message: "Method not allowed" })
  } catch (error) {
    console.error("Error managing categories:", error)
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}
