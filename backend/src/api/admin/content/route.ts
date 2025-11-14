import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"

// NOTE: For development, authentication is disabled. 
// In production, you should add authentication middleware here.
// Example: const loggedInUser = req.scope.resolve("loggedInUser")
// if (!loggedInUser) return res.status(401).json({ message: "Unauthorized" })

export default async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    // Get manager from container
    const manager = req.scope.resolve("manager")
    const { Content } = await import("../../../models/content")
    
    const contentRepository = manager.getRepository(Content)

    if (req.method === "GET") {
      const { type, slug } = req.query

      if (slug) {
        const content = await contentRepository.findOne({
          where: { slug: slug as string },
        })
        if (!content) {
          return res.status(404).json({ message: "Content not found" })
        }
        return res.json({ content })
      }

      if (type) {
        const content = await contentRepository.find({
          where: { type: type as string },
          order: { order: "ASC" },
        })
        return res.json({ content })
      }

      const content = await contentRepository.find({
        order: { order: "ASC" },
      })
      return res.json({ content })
    }

    if (req.method === "POST") {
      const body = req.body as any
      const { slug, type, title, subtitle, description, content, image, video, is_active, order, metadata } = body

      const newContent = contentRepository.create({
        slug,
        type,
        title,
        subtitle,
        description,
        content,
        image,
        video,
        is_active: is_active !== undefined ? is_active : true,
        order: order || 0,
        metadata,
      })

      const savedContent = await contentRepository.save(newContent)
      return res.json({ content: savedContent })
    }

    if (req.method === "PUT") {
      const body = req.body as any
      const { id } = body
      const updates = { ...body }
      delete updates.id

      if (!id) {
        return res.status(400).json({ message: "ID is required" })
      }

      const content = await contentRepository.findOne({
        where: { id },
      })

      if (!content) {
        return res.status(404).json({ message: "Content not found" })
      }

      Object.assign(content, updates)
      const updatedContent = await contentRepository.save(content)
      return res.json({ content: updatedContent })
    }

    if (req.method === "DELETE") {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ message: "ID is required" })
      }

      await contentRepository.delete({ id: id as string })
      return res.json({ message: "Content deleted" })
    }

    res.status(405).json({ message: "Method not allowed" })
  } catch (error) {
    console.error("Error managing content:", error)
    res.status(500).json({ message: "Internal server error", error: error.message })
  }
}
