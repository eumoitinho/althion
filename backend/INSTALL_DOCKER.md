# Instalação do Docker Desktop

## Opção 1: Via Terminal (Recomendado)

Execute o script de instalação:
```bash
cd backend
./install-docker.sh
```

Você precisará inserir sua senha de administrador quando solicitado.

## Opção 2: Download Manual

1. Baixe Docker Desktop para Mac: https://www.docker.com/products/docker-desktop
2. Abra o arquivo `.dmg` baixado
3. Arraste o Docker.app para a pasta Applications
4. Abra Docker Desktop em Applications
5. Aguarde o Docker inicializar (você verá o ícone da baleia na barra de menu)

## Após Instalar

1. **Iniciar Docker Desktop:**
   ```bash
   open -a Docker
   ```
   Ou abra manualmente em Applications > Docker

2. **Aguardar inicialização:**
   - Aguarde até ver o ícone do Docker na barra de menu
   - O status deve mostrar "Docker Desktop is running"

3. **Verificar instalação:**
   ```bash
   docker --version
   docker compose version
   ```

4. **Iniciar containers do backend:**
   ```bash
   cd backend
   docker compose up -d
   ```

## Verificar se está funcionando

```bash
docker ps
```

Você deve ver os containers `medusa_postgres` e `medusa_redis` rodando.

