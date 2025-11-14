import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from "typeorm"

export class CreateContentTables1732936000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela de conteúdo
    await queryRunner.createTable(
      new Table({
        name: "content",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "subtitle",
            type: "text",
            isNullable: true,
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "content",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "video",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "order",
            type: "integer",
            default: 0,
          },
          {
            name: "metadata",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    )

    // Criar índice para slug
    await queryRunner.createIndex(
      "content",
      new TableIndex({
        name: "IDX_content_slug",
        columnNames: ["slug"],
      })
    )

    // Criar índice para type
    await queryRunner.createIndex(
      "content",
      new TableIndex({
        name: "IDX_content_type",
        columnNames: ["type"],
      })
    )

    // Criar tabela de categorias
    await queryRunner.createTable(
      new Table({
        name: "category",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "slug",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
            isNullable: true,
          },
          {
            name: "icon",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "image",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "image_paths",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "order",
            type: "integer",
            default: 0,
          },
          {
            name: "metadata",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    )

    // Criar índice para slug
    await queryRunner.createIndex(
      "category",
      new TableIndex({
        name: "IDX_category_slug",
        columnNames: ["slug"],
      })
    )

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover índices
    await queryRunner.dropIndex("category", "IDX_category_slug")
    await queryRunner.dropIndex("content", "IDX_content_type")
    await queryRunner.dropIndex("content", "IDX_content_slug")

    // Remover tabelas
    await queryRunner.dropTable("category")
    await queryRunner.dropTable("content")
  }
}

