import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import { Repository } from "typeorm"
import { Category } from "../models/category"

export const CategoryRepository = dataSource.getRepository(Category).extend({
  async findActiveCategories() {
    return this.find({
      where: { is_active: true },
      order: { order: "ASC" },
    })
  },

  async findBySlug(slug: string) {
    return this.findOne({
      where: { slug, is_active: true },
    })
  },
})

export default CategoryRepository

