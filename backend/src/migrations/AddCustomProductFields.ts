import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddCustomProductFields1731427200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar campos customizados à tabela product
    await queryRunner.addColumn("product", new TableColumn({
      name: "technical_specs",
      type: "jsonb",
      isNullable: true,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "related_product_ids",
      type: "text",
      isNullable: true,
      isArray: true,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "industrial_category",
      type: "varchar",
      isNullable: true,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "certifications",
      type: "text",
      isNullable: true,
      isArray: true,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "delivery_time_days",
      type: "integer",
      isNullable: true,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "demo_available",
      type: "boolean",
      isNullable: true,
      default: false,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "technical_doc_url",
      type: "varchar",
      isNullable: true,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "demo_video_url",
      type: "varchar",
      isNullable: true,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "recommended_applications",
      type: "text",
      isNullable: true,
      isArray: true,
    }))

    await queryRunner.addColumn("product", new TableColumn({
      name: "installation_complexity",
      type: "integer",
      isNullable: true,
    }))

    // Criar índice para industrial_category
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_product_industrial_category" ON "product" ("industrial_category")`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índice
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_product_industrial_category"`)

    // Remover colunas
    await queryRunner.dropColumn("product", "installation_complexity")
    await queryRunner.dropColumn("product", "recommended_applications")
    await queryRunner.dropColumn("product", "demo_video_url")
    await queryRunner.dropColumn("product", "technical_doc_url")
    await queryRunner.dropColumn("product", "demo_available")
    await queryRunner.dropColumn("product", "delivery_time_days")
    await queryRunner.dropColumn("product", "certifications")
    await queryRunner.dropColumn("product", "industrial_category")
    await queryRunner.dropColumn("product", "related_product_ids")
    await queryRunner.dropColumn("product", "technical_specs")
  }
}

