const axios = require('axios');

const BASE_URL = process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
const seedData = require('../data/seed.json');

async function seedViaAPI() {
  try {
    console.log('🌱 Populando banco de dados via API...\n');

    // 1. Criar Store (se necessário)
    console.log('📦 Configurando store...');
    try {
      await axios.post(`${BASE_URL}/admin/stores`, {
        name: 'Althion Store',
        default_currency_code: seedData.store.default_currency_code,
        currencies: seedData.store.currencies,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('✅ Store configurado');
    } catch (error) {
      if (error.response?.status === 409 || error.response?.status === 400) {
        console.log('ℹ️  Store já existe ou erro ao criar (pode ignorar)');
      } else {
        console.error('⚠️  Erro ao criar store:', error.message);
      }
    }

    // 2. Criar Regiões
    console.log('\n📦 Criando regiões...');
    for (const regionData of seedData.regions) {
      try {
        await axios.post(`${BASE_URL}/admin/regions`, regionData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(`   ✅ Região "${regionData.name}" criada`);
      } catch (error) {
        if (error.response?.status === 409 || error.response?.status === 400) {
          console.log(`   ℹ️  Região "${regionData.name}" já existe`);
        } else {
          console.error(`   ✗ Erro ao criar região "${regionData.name}":`, error.response?.data?.message || error.message);
        }
      }
    }

    // 3. Criar Shipping Options
    console.log('\n📦 Criando opções de envio...');
    for (const shippingData of seedData.shipping_options) {
      try {
        // Primeiro, buscar a região pelo nome
        const regionsResponse = await axios.get(`${BASE_URL}/admin/regions`);
        const region = regionsResponse.data.regions.find((r) => r.name === shippingData.region_name);
        
        if (!region) {
          console.log(`   ⚠️  Região "${shippingData.region_name}" não encontrada`);
          continue;
        }

        await axios.post(`${BASE_URL}/admin/shipping-options`, {
          ...shippingData,
          region_id: region.id,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(`   ✅ Opção de envio "${shippingData.name}" criada`);
      } catch (error) {
        if (error.response?.status === 409 || error.response?.status === 400) {
          console.log(`   ℹ️  Opção de envio "${shippingData.name}" já existe`);
        } else {
          console.error(`   ✗ Erro ao criar opção de envio "${shippingData.name}":`, error.response?.data?.message || error.message);
        }
      }
    }

    // 4. Criar Produtos
    console.log('\n📦 Criando produtos...');
    for (const productData of seedData.products) {
      try {
        await axios.post(`${BASE_URL}/admin/products`, productData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(`   ✅ Produto "${productData.title}" criado`);
      } catch (error) {
        if (error.response?.status === 409 || error.response?.status === 400) {
          console.log(`   ℹ️  Produto "${productData.title}" já existe`);
        } else {
          console.error(`   ✗ Erro ao criar produto "${productData.title}":`, error.response?.data?.message || error.message);
          if (error.response?.data) {
            console.error(`      Detalhes:`, JSON.stringify(error.response.data, null, 2));
          }
        }
      }
    }

    // 5. Criar Usuário Admin
    console.log('\n📦 Criando usuário admin...');
    try {
      await axios.post(`${BASE_URL}/admin/users`, {
        email: seedData.users[0].email,
        password: seedData.users[0].password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`   ✅ Usuário admin "${seedData.users[0].email}" criado`);
    } catch (error) {
      if (error.response?.status === 409 || error.response?.status === 400) {
        console.log(`   ℹ️  Usuário admin "${seedData.users[0].email}" já existe`);
      } else {
        console.error(`   ✗ Erro ao criar usuário admin:`, error.response?.data?.message || error.message);
      }
    }

    console.log('\n✅ Seed concluído via API!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro ao executar seed via API:');
    console.error(error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    process.exit(1);
  }
}

seedViaAPI();

