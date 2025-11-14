const { DataSource } = require("typeorm");

async function initPaymentProviders() {
  const config = require("../medusa-config.js");
  
  const dataSource = new DataSource({
    type: "postgres",
    url: config.projectConfig.database_url,
  });

  try {
    console.log("🔌 Conectando ao banco de dados...");
    await dataSource.initialize();
    console.log("✅ Conectado ao banco de dados");

    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    // Check if payment_provider table exists
    const tableExists = await queryRunner.hasTable("payment_provider");
    
    if (!tableExists) {
      console.log("⚠️  Tabela payment_provider não existe. Execute as migrações primeiro.");
      await queryRunner.release();
      await dataSource.destroy();
      process.exit(1);
    }

    // Check if manual payment provider exists
    const existingProvider = await queryRunner.query(
      "SELECT id FROM payment_provider WHERE id = 'manual'"
    );

    if (existingProvider.length === 0) {
      console.log("📦 Criando payment provider 'manual'...");
      await queryRunner.query(`
        INSERT INTO payment_provider (id, is_installed)
        VALUES ('manual', true)
        ON CONFLICT (id) DO NOTHING
      `);
      console.log("✅ Payment provider 'manual' criado");
    } else {
      console.log("✅ Payment provider 'manual' já existe");
    }

    await queryRunner.release();
    await dataSource.destroy();
    
    console.log("✅ Payment providers inicializados com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao inicializar payment providers:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    process.exit(1);
  }
}

initPaymentProviders();

