const express = require("express");

async function seedDatabase() {
  const app = express();
  const directory = process.cwd();
  const seedData = require("../data/seed.json");

  try {
    console.log("🔌 Carregando Medusa...");
    
    // Load Medusa - this will initialize everything including defaults
    // But now we have the patch that fixes the bug
    const { container } = await require("@medusajs/medusa/dist/loaders").default({
      directory,
      expressApp: app,
      isAdmin: false,
    });

    console.log("🌱 Populando banco de dados...\n");

    // Get services
    const storeService = container.resolve("storeService");
    const regionService = container.resolve("regionService");
    const shippingOptionService = container.resolve("shippingOptionService");
    const productService = container.resolve("productService");
    const userService = container.resolve("userService");
    const salesChannelService = container.resolve("salesChannelService");

    // Create regions
    if (seedData.regions && seedData.regions.length > 0) {
      console.log(`📦 Criando ${seedData.regions.length} região(ões)...`);
      for (const regionData of seedData.regions) {
        try {
          // Check if region already exists
          try {
            await regionService.retrieveByName(regionData.name);
            console.log(`   ℹ️  Região "${regionData.name}" já existe`);
          } catch (error) {
            // Region doesn't exist, create it
            await regionService.create(regionData);
            console.log(`   ✅ Região "${regionData.name}" criada`);
          }
        } catch (error) {
          console.error(`   ✗ Erro ao criar região "${regionData.name}":`, error.message);
        }
      }
    }

    // Create shipping options
    if (seedData.shipping_options && seedData.shipping_options.length > 0) {
      console.log(`\n📦 Criando ${seedData.shipping_options.length} opção(ões) de envio...`);
      
      // Get default shipping profile
      const shippingProfileService = container.resolve("shippingProfileService");
      const defaultProfile = await shippingProfileService.retrieveDefault();
      
      for (const shippingData of seedData.shipping_options) {
        try {
          const region = await regionService.retrieveByName(shippingData.region_name);
          
          // Check if shipping option already exists
          const existingOptions = await shippingOptionService.list({ region_id: region.id });
          const exists = existingOptions.some(opt => opt.name === shippingData.name);
          
          if (exists) {
            console.log(`   ℹ️  Opção de envio "${shippingData.name}" já existe`);
          } else {
            await shippingOptionService.create({
              ...shippingData,
              region_id: region.id,
              profile_id: defaultProfile.id,
            });
            console.log(`   ✅ Opção de envio "${shippingData.name}" criada`);
          }
        } catch (error) {
          console.error(`   ✗ Erro ao criar opção de envio "${shippingData.name}":`, error.message);
        }
      }
    }

    // Create products
    if (seedData.products && seedData.products.length > 0) {
      console.log(`\n📦 Criando ${seedData.products.length} produto(s)...`);
      
      // Get default sales channel
      const defaultChannel = await salesChannelService.retrieveDefault();
      console.log(`   📦 Sales Channel: ${defaultChannel.name}`);
      
      for (const productData of seedData.products) {
        try {
          let product;
          // Check if product already exists
          try {
            product = await productService.retrieveByHandle(productData.handle);
            // Product exists - update to published if currently draft
            if (product.status !== "published") {
              await productService.update(product.id, { status: "published" });
              console.log(`   ✅ Produto "${productData.title}" atualizado para publicado`);
            } else {
              console.log(`   ℹ️  Produto "${productData.title}" já existe e está publicado`);
            }
          } catch (error) {
            // Product doesn't exist, create it with published status
            product = await productService.create({
              ...productData,
              status: "published"
            });
            console.log(`   ✅ Produto "${productData.title}" criado e publicado`);
          }
          
          // Associate product to default sales channel if not already associated
          if (product) {
            const currentChannels = product.sales_channels || [];
            const channelIds = currentChannels.map(ch => ch.id);
            
            if (!channelIds.includes(defaultChannel.id)) {
              channelIds.push(defaultChannel.id);
              await productService.update(product.id, {
                sales_channels: channelIds.map(id => ({ id })),
              });
              console.log(`      ✅ Produto associado ao sales channel`);
            }
          }
        } catch (error) {
          if (error.message && error.message.includes("already exists")) {
            console.log(`   ℹ️  Produto "${productData.title}" já existe`);
          } else {
            console.error(`   ✗ Erro ao criar produto "${productData.title}":`, error.message);
          }
        }
      }
    }

    // Create users
    if (seedData.users && seedData.users.length > 0) {
      console.log(`\n📦 Criando ${seedData.users.length} usuário(s)...`);
      for (const userData of seedData.users) {
        try {
          // Check if user already exists
          try {
            await userService.retrieveByEmail(userData.email);
            console.log(`   ℹ️  Usuário "${userData.email}" já existe`);
          } catch (error) {
            // User doesn't exist, create it
            await userService.create(userData, userData.password);
            console.log(`   ✅ Usuário "${userData.email}" criado`);
          }
        } catch (error) {
          if (error.message && error.message.includes("already exists")) {
            console.log(`   ℹ️  Usuário "${userData.email}" já existe`);
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

