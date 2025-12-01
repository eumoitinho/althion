#!/bin/bash

# Script alternativo para setup sem Docker
# Usa PostgreSQL local

set -e

echo "🔍 Verificando PostgreSQL local..."

# Verificar se PostgreSQL está rodando
if ! pg_isready -h localhost -p 5432 &> /dev/null; then
    echo "⚠️  PostgreSQL não está rodando"
    echo ""
    echo "Iniciando PostgreSQL..."
    
    # Tentar iniciar via Homebrew
    if command -v brew &> /dev/null; then
        echo "Tentando iniciar PostgreSQL via Homebrew..."
        brew services start postgresql@15 || brew services start postgresql || echo "Não foi possível iniciar automaticamente"
    fi
    
    echo ""
    echo "Por favor, inicie o PostgreSQL manualmente e execute este script novamente."
    echo "Ou execute: brew services start postgresql"
    exit 1
fi

echo "✅ PostgreSQL está rodando"

# Verificar se o banco existe
if psql -h localhost -U $USER -lqt | cut -d \| -f 1 | grep -qw medusa_db; then
    echo "✅ Banco de dados 'medusa_db' já existe"
else
    echo "📦 Criando banco de dados..."
    
    # Criar banco e usuário
    psql -h localhost -U $USER -d postgres <<EOF
CREATE DATABASE medusa_db;
CREATE USER medusa_user WITH PASSWORD 'medusa_password';
GRANT ALL PRIVILEGES ON DATABASE medusa_db TO medusa_user;
ALTER DATABASE medusa_db OWNER TO medusa_user;
\q
EOF
    
    echo "✅ Banco de dados criado"
fi

echo ""
echo "📦 Instalando dependências..."
npm install --legacy-peer-deps

echo ""
echo "🔨 Compilando TypeScript..."
npm run build

echo ""
echo "🗄️  Executando migrações..."
npx medusa db:migrate

echo ""
echo "🌱 Populando banco de dados..."
npm run seed

echo ""
echo "✅ Setup concluído!"
echo ""
echo "🚀 Para iniciar o servidor:"
echo "   npm run dev"
echo ""
echo "📝 URLs disponíveis:"
echo "   Admin Dashboard: http://localhost:9000/app"
echo "   Store API: http://localhost:9000/store"
echo "   Admin API: http://localhost:9000/admin"
echo ""
echo "👤 Credenciais admin:"
echo "   Email: admin@althion.com"
echo "   Senha: admin123"

