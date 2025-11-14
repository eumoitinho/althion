import { Column, Entity, Index, PrimaryColumn, BeforeInsert } from "typeorm"
import { generateEntityId } from "@medusajs/medusa/dist/utils"

@Entity()
export class Content {
  @PrimaryColumn()
  id: string

  @BeforeInsert()
  private beforeInsert() {
    if (!this.id) {
      this.id = generateEntityId(this.id, "cnt")
    }
  }

  @Column({ type: "varchar", unique: true })
  @Index()
  slug: string

  @Column({ type: "varchar" })
  type: string // 'hero', 'about', 'solution', 'category', 'service', 'pricing', etc.

  @Column({ type: "varchar" })
  title: string

  @Column({ type: "text", nullable: true })
  subtitle?: string

  @Column({ type: "text", nullable: true })
  description?: string

  @Column({ type: "jsonb", nullable: true })
  content?: Record<string, any> // Conteúdo customizado (JSON)

  @Column({ type: "varchar", nullable: true })
  image?: string

  @Column({ type: "varchar", nullable: true })
  video?: string

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

