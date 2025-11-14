#!/bin/bash

# Script de Setup do Backend Medusa
# Verifica dependências e executa setup

set -e

echo "🔍 Verificando dependências..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+"
    exit 1
fi
echo "✅ Node.js encontrado: $(node --version)"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado"
    exit 1
fi
echo "✅ npm encontrado: $(npm --version)"

# Verificar Docker
DOCKER_CMD=""
if command -v docker &> /dev/null; then
    # Tentar docker compose (versão mais recente)
    if docker compose version &> /dev/null; then
        DOCKER_CMD="docker compose"
        echo "✅ Docker encontrado (usando 'docker compose')"
    # Tentar docker-compose (versão antiga)
    elif command -v docker-compose &> /dev/null; then
        DOCKER_CMD="docker-compose"
        echo "✅ Docker encontrado (usando 'docker-compose')"
    else
        echo "⚠️  Docker encontrado mas docker-compose não está disponível"
        echo "   Tentando usar 'docker compose'..."
        DOCKER_CMD="docker compose"
    fi
else
    echo "⚠️  Docker não encontrado"
    echo ""
    echo "📦 Opções:"
    echo "   1. Instalar Docker Desktop: https://www.docker.com/products/docker-desktop"
    echo "   2. Usar PostgreSQL local (atualize DATABASE_URL no .env)"
    echo ""
    read -p "Deseja continuar sem Docker? (s/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "Por favor, instale o Docker e execute este script novamente."
        exit 1
    fi
    DOCKER_CMD=""
fi

# Iniciar Docker se disponível
if [ ! -z "$DOCKER_CMD" ]; then
    echo ""
    echo "🐳 Iniciando containers Docker..."
    $DOCKER_CMD up -d
    
    echo "⏳ Aguardando PostgreSQL estar pronto..."
    sleep 5
    
    # Verificar se PostgreSQL está rodando
    if docker ps | grep -q medusa_postgres; then
        echo "✅ PostgreSQL está rodando"
    else
        echo "⚠️  PostgreSQL pode não estar pronto ainda"
    fi
else
    echo ""
    echo "⚠️  Pulando inicialização do Docker"
    echo "   Certifique-se de que PostgreSQL está rodando e atualize DATABASE_URL no .env"
fi

echo ""
echo "📦 Instalando dependências..."
npm install --legacy-peer-deps

echo ""
echo "🔨 Compilando TypeScript..."
npm run build

echo ""
echo "🗄️  Executando migrações..."
npx medusa migrations run

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

