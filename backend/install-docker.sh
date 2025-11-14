#!/bin/bash

echo "🐳 Instalando Docker Desktop..."
echo ""
echo "Este comando precisa da sua senha de administrador."
echo ""

# Instalar Docker Desktop via Homebrew
brew install --cask docker

echo ""
echo "✅ Docker Desktop instalado!"
echo ""
echo "📋 Próximos passos:"
echo "1. Abra o Docker Desktop em: /Applications/Docker.app"
echo "2. Aguarde o Docker inicializar (ícone na barra de menu)"
echo "3. Execute: cd backend && docker compose up -d"
echo ""
echo "Ou execute este script para iniciar automaticamente:"
echo "./start-docker.sh"

