import { MigrationInterface, QueryRunner } from "typeorm"

export class FixCategoryImagePaths1732936100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Alterar coluna image_paths de text[] para jsonb
    await queryRunner.query(`
      ALTER TABLE category 
      DROP COLUMN IF EXISTS image_paths;
    `)
    
    await queryRunner.query(`
      ALTER TABLE category 
      ADD COLUMN image_paths jsonb;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverter para text[]
    await queryRunner.query(`
      ALTER TABLE category 
      DROP COLUMN IF EXISTS image_paths;
    `)
    
    await queryRunner.query(`
      ALTER TABLE category 
      ADD COLUMN image_paths text[];
    `)
  }
}

