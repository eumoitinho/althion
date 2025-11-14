const { DataSource } = require("typeorm");
const path = require("path");
const fs = require("fs");

async function runMigrations() {
  const config = require("../medusa-config.js");
  
  // Get all migration files from Medusa
  const medusaMigrationsPath = path.join(__dirname, "../node_modules/@medusajs/medusa/dist/migrations");
  const migrationFiles = fs.readdirSync(medusaMigrationsPath)
    .filter(file => file.endsWith(".js") && !file.endsWith(".d.ts") && !file.endsWith(".js.map"))
    .map(file => path.join(medusaMigrationsPath, file));

  // Add custom migrations if they exist
  const customMigrationsPath = path.join(__dirname, "../dist/migrations");
  if (fs.existsSync(customMigrationsPath)) {
    const customMigrations = fs.readdirSync(customMigrationsPath)
      .filter(file => file.endsWith(".js") && !file.endsWith(".d.ts") && !file.endsWith(".js.map"))
      .map(file => path.join(customMigrationsPath, file));
    migrationFiles.push(...customMigrations);
  }

  // Get all entity files from Medusa
  const medusaModelsPath = path.join(__dirname, "../node_modules/@medusajs/medusa/dist/models");
  const entityFiles = [];
  
  function getAllFiles(dirPath, arrayOfFiles = []) {
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
    migrations: migrationFiles,
    logging: ["error", "warn", "schema", "migration"],
    synchronize: false, // Never use synchronize in production!
  });

  try {
    console.log("🔌 Conectando ao banco de dados...");
    await dataSource.initialize();
    console.log("✅ Conectado ao banco de dados");

    console.log("🗄️  Executando migrações...");
    const migrations = await dataSource.runMigrations();
    
    if (migrations && migrations.length > 0) {
      console.log(`\n✅ ${migrations.length} migração(ões) executada(s):`);
      migrations.forEach((migration) => {
        console.log(`   ✓ ${migration.name}`);
      });
    } else {
      console.log("✅ Nenhuma migração pendente - banco de dados está atualizado");
    }

    await dataSource.destroy();
    console.log("\n✅ Migrações concluídas com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Erro ao executar migrações:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    process.exit(1);
  }
}

runMigrations();
