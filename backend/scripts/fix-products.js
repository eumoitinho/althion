const express = require("express");

async function fixProducts() {
  const app = express();
  const directory = process.cwd();

  try {
    console.log("🔌 Carregando Medusa...");
    
    const { container } = await require("@medusajs/medusa/dist/loaders").default({
      directory,
      expressApp: app,
      isAdmin: false,
    });

    console.log("🔧 Corrigindo produtos...\n");

    // Get services
    const productService = container.resolve("productService");
    const salesChannelService = container.resolve("salesChannelService");

    // Get default sales channel
    const defaultChannel = await salesChannelService.retrieveDefault();
    console.log(`📦 Sales Channel padrão: ${defaultChannel.name} (${defaultChannel.id})`);

    // Get all products
    const products = await productService.list({});
    console.log(`\n📦 Encontrados ${products.length} produto(s)...`);

    // Associate each product to default sales channel
    for (const product of products) {
      try {
        // Check if product is already associated with sales channel
        const productChannels = await productService.list({
          id: product.id,
          sales_channel_id: [defaultChannel.id],
        });

        if (productChannels.length === 0) {
          // Associate product to sales channel
          await productService.update(product.id, {
            sales_channels: [{ id: defaultChannel.id }],
          });
          console.log(`   ✅ Produto "${product.title}" associado ao sales channel`);
        } else {
          console.log(`   ℹ️  Produto "${product.title}" já está associado ao sales channel`);
        }
      } catch (error) {
        console.error(`   ✗ Erro ao associar produto "${product.title}":`, error.message);
      }
    }

    console.log("\n✅ Produtos corrigidos com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Erro ao corrigir produtos:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

fixProducts();

