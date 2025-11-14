import { Column, Entity, Index } from "typeorm";
import { Product as MedusaProduct } from "@medusajs/medusa";

@Entity()
export class Product extends MedusaProduct {
  // Campos customizados para specs técnicas
  @Column({ type: "json", nullable: true })
  technical_specs?: Record<string, any>;

  // Produtos correlatos/relacionados (IDs)
  @Column({ type: "simple-array", nullable: true })
  related_product_ids?: string[];

  // Categoria industrial
  @Column({ type: "varchar", nullable: true })
  @Index()
  industrial_category?: string;

  // Certificações (ISO, ANSI, etc)
  @Column({ type: "simple-array", nullable: true })
  certifications?: string[];

  // Tempo de entrega estimado (em dias)
  @Column({ type: "int", nullable: true })
  delivery_time_days?: number;

  // Disponibilidade para demonstração
  @Column({ type: "boolean", default: false })
  demo_available?: boolean;

  // Manual/documentação técnica URL
  @Column({ type: "varchar", nullable: true })
  technical_doc_url?: string;

  // Vídeo demonstrativo URL
  @Column({ type: "varchar", nullable: true })
  demo_video_url?: string;

  // Aplicações recomendadas
  @Column({ type: "simple-array", nullable: true })
  recommended_applications?: string[];

  // Nível de complexidade de instalação (1-5)
  @Column({ type: "int", nullable: true })
  installation_complexity?: number;
}

