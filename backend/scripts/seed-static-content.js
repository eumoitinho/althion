const { DataSource } = require("typeorm");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// Generate entity ID similar to Medusa
function generateEntityId(prefix = "cat") {
  const randomBytes = crypto.randomBytes(8).toString("hex");
  return `${prefix}_${Date.now().toString(36)}${randomBytes.substring(0, 14)}`;
}

async function seedStaticContent() {
  const config = require("../medusa-config.js");
  const staticContent = require("../data/static-content.json");

  try {
    console.log("🔌 Conectando ao banco de dados...");
    
    // Get all entity files from Medusa
    const medusaModelsPath = path.join(__dirname, "../node_modules/@medusajs/medusa/dist/models");
    const entityFiles = [];
    
    function getAllFiles(dirPath, arrayOfFiles = []) {
      if (!fs.existsSync(dirPath)) {
        return arrayOfFiles;
      }
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else if (file.endsWith(".js") && !file.endsWith(".d.ts") && !file.endsWith(".js.map")) {
          arrayOfFiles.push(filePath);
        }
      });
      return arrayOfFiles;
    }
    
    if (fs.existsSync(medusaModelsPath)) {
      entityFiles.push(...getAllFiles(medusaModelsPath));
    }

    // Add custom models if they exist
    const customModelsPath = path.join(__dirname, "../dist/models");
    if (fs.existsSync(customModelsPath)) {
      entityFiles.push(...getAllFiles(customModelsPath));
    }

    const dataSource = new DataSource({
      type: "postgres",
      url: config.projectConfig.database_url,
      entities: entityFiles,
      logging: false,
    });

    await dataSource.initialize();
    console.log("✅ Conectado ao banco de dados");

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    console.log("\n🌱 Populando conteúdo estático...\n");

    // Create categories
    if (staticContent.categories && staticContent.categories.length > 0) {
      console.log(`📦 Criando ${staticContent.categories.length} categoria(s)...`);
      for (const categoryData of staticContent.categories) {
        try {
          // Check if category already exists
          const existing = await queryRunner.query(
            "SELECT id FROM category WHERE slug = $1",
            [categoryData.slug]
          );

          if (existing.length > 0) {
            console.log(`   ℹ️  Categoria "${categoryData.name}" já existe`);
          } else {
            const id = generateEntityId("cat");
            await queryRunner.query(
              `INSERT INTO category (
                id, slug, name, description, icon, image_paths, is_active, "order", created_at, updated_at
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())`,
              [
                id,
                categoryData.slug,
                categoryData.name,
                categoryData.description || null,
                categoryData.icon || null,
                categoryData.image_paths ? JSON.stringify(categoryData.image_paths) : null,
                categoryData.is_active !== undefined ? categoryData.is_active : true,
                categoryData.order || 0,
              ]
            );
            console.log(`   ✅ Categoria "${categoryData.name}" criada`);
          }
        } catch (error) {
          console.error(`   ✗ Erro ao criar categoria "${categoryData.name}":`, error.message);
        }
      }
    }

    // Create content
    if (staticContent.content && staticContent.content.length > 0) {
      console.log(`\n📦 Criando ${staticContent.content.length} conteúdo(s)...`);
      for (const contentData of staticContent.content) {
        try {
          // Check if content already exists
          const existing = await queryRunner.query(
            "SELECT id FROM content WHERE slug = $1",
            [contentData.slug]
          );

          if (existing.length > 0) {
            console.log(`   ℹ️  Conteúdo "${contentData.title}" já existe`);
          } else {
            const id = generateEntityId("cnt");
            await queryRunner.query(
              `INSERT INTO content (
                id, slug, type, title, subtitle, description, content, image, video, is_active, "order", created_at, updated_at
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())`,
              [
                id,
                contentData.slug,
                contentData.type,
                contentData.title,
                contentData.subtitle || null,
                contentData.description || null,
                contentData.content ? JSON.stringify(contentData.content) : null,
                contentData.image || null,
                contentData.video || null,
                contentData.is_active !== undefined ? contentData.is_active : true,
                contentData.order || 0,
              ]
            );
            console.log(`   ✅ Conteúdo "${contentData.title}" criado`);
          }
        } catch (error) {
          console.error(`   ✗ Erro ao criar conteúdo "${contentData.title}":`, error.message);
        }
      }
    }

    await queryRunner.release();
    await dataSource.destroy();

    console.log("\n✅ Conteúdo estático populado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Erro ao popular conteúdo estático:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedStaticContent();
