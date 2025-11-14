import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import { Repository } from "typeorm"
import { Content } from "../models/content"

export const ContentRepository = dataSource.getRepository(Content).extend({
  async findActiveContent() {
    return this.find({
      where: { is_active: true },
      order: { order: "ASC" },
    })
  },

  async findByType(type: string) {
    return this.find({
      where: { type, is_active: true },
      order: { order: "ASC" },
    })
  },

  async findBySlug(slug: string) {
    return this.findOne({
      where: { slug, is_active: true },
    })
  },
})

export default ContentRepository

