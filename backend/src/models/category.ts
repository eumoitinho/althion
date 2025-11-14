import { Column, Entity, Index, PrimaryColumn, BeforeInsert } from "typeorm"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class Category {
  @PrimaryColumn()
  id: string

  @BeforeInsert()
  private beforeInsert() {
    if (!this.id) {
      this.id = generateEntityId(this.id, "cat")
    }
  }

  @Column({ type: "varchar", unique: true })
  @Index()
  slug: string

  @Column({ type: "varchar" })
  name: string

  @Column({ type: "text", nullable: true })
  description?: string

  @Column({ type: "varchar", nullable: true })
  icon?: string

  @Column({ type: "varchar", nullable: true })
  image?: string

  @Column({ type: "jsonb", nullable: true })
  image_paths?: string[] // Caminhos de imagens da categoria

  @Column({ type: "boolean", default: true })
  is_active: boolean

  @Column({ type: "int", default: 0 })
  order: number

  @Column({ type: "jsonb", nullable: true })
  metadata?: Record<string, any>

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date
}

