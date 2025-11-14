const express = require("express");

async function associateProductsToSalesChannel() {
  const app = express();
  const directory = process.cwd();

  try {
    console.log("🔌 Carregando Medusa...");
    
    const { container } = await require("@medusajs/medusa/dist/loaders").default({
      directory,
      expressApp: app,
      isAdmin: false,
    });

    console.log("🔧 Associando produtos ao sales channel...\n");

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
        // Get current sales channels
        const currentChannels = product.sales_channels || [];
        const channelIds = currentChannels.map(ch => ch.id);
        
        if (!channelIds.includes(defaultChannel.id)) {
          // Add default channel to product
          channelIds.push(defaultChannel.id);
          await productService.update(product.id, {
            sales_channels: channelIds.map(id => ({ id })),
          });
          console.log(`   ✅ Produto "${product.title}" associado ao sales channel`);
        } else {
          console.log(`   ℹ️  Produto "${product.title}" já está associado ao sales channel`);
        }
      } catch (error) {
        console.error(`   ✗ Erro ao associar produto "${product.title}":`, error.message);
      }
    }

    console.log("\n✅ Produtos associados com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Erro ao associar produtos:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

associateProductsToSalesChannel();

