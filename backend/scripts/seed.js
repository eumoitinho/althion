const express = require("express");

async function seedDatabase() {
  const app = express();
  const directory = process.cwd();
  const seedData = require("../data/seed.json");

  try {
    console.log("🔌 Carregando Medusa...");
    
    // Load Medusa
    const { container } = await require("@medusajs/medusa/dist/loaders").default({
      directory,
      expressApp: app,
      isAdmin: false,
    });

    console.log("🌱 Populando banco de dados...");

    // Get services
    const storeService = container.resolve("storeService");
    const regionService = container.resolve("regionService");
    const shippingOptionService = container.resolve("shippingOptionService");
    const productService = container.resolve("productService");
    const userService = container.resolve("userService");

    // Create store
    if (seedData.store) {
      console.log("📦 Criando store...");
      // Store is usually created automatically
    }

    // Create regions
    if (seedData.regions && seedData.regions.length > 0) {
      console.log(`📦 Criando ${seedData.regions.length} região(ões)...`);
      for (const regionData of seedData.regions) {
        try {
          await regionService.create(regionData);
          console.log(`   ✓ Região "${regionData.name}" criada`);
        } catch (error) {
          if (error.message && error.message.includes("already exists")) {
            console.log(`   ℹ Região "${regionData.name}" já existe`);
          } else {
            console.error(`   ✗ Erro ao criar região "${regionData.name}":`, error.message);
          }
        }
      }
    }

    // Create shipping options
    if (seedData.shipping_options && seedData.shipping_options.length > 0) {
      console.log(`📦 Criando ${seedData.shipping_options.length} opção(ões) de envio...`);
      for (const shippingData of seedData.shipping_options) {
        try {
          const region = await regionService.retrieveByName(shippingData.region_name);
          await shippingOptionService.create({
            ...shippingData,
            region_id: region.id,
          });
          console.log(`   ✓ Opção de envio "${shippingData.name}" criada`);
        } catch (error) {
          if (error.message && error.message.includes("already exists")) {
            console.log(`   ℹ Opção de envio "${shippingData.name}" já existe`);
          } else {
            console.error(`   ✗ Erro ao criar opção de envio "${shippingData.name}":`, error.message);
          }
        }
      }
    }

    // Create products
    if (seedData.products && seedData.products.length > 0) {
      console.log(`📦 Criando ${seedData.products.length} produto(s)...`);
      for (const productData of seedData.products) {
        try {
          await productService.create(productData);
          console.log(`   ✓ Produto "${productData.title}" criado`);
        } catch (error) {
          if (error.message && error.message.includes("already exists")) {
            console.log(`   ℹ Produto "${productData.title}" já existe`);
          } else {
            console.error(`   ✗ Erro ao criar produto "${productData.title}":`, error.message);
          }
        }
      }
    }

    // Create users
    if (seedData.users && seedData.users.length > 0) {
      console.log(`📦 Criando ${seedData.users.length} usuário(s)...`);
      for (const userData of seedData.users) {
        try {
          await userService.create(userData, userData.password);
          console.log(`   ✓ Usuário "${userData.email}" criado`);
        } catch (error) {
          if (error.message && error.message.includes("already exists")) {
            console.log(`   ℹ Usuário "${userData.email}" já existe`);
          } else {
            console.error(`   ✗ Erro ao criar usuário "${userData.email}":`, error.message);
          }
        }
      }
    }

    console.log("\n✅ Seed concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Erro ao executar seed:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedDatabase();

