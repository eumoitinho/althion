# 🔧 Resolução de Problemas - Medusa Backend

## ✅ Problemas Resolvidos

### 1. **medusa-config.js incompleto** ✅
- **Problema:** O arquivo estava faltando `projectConfig` completo
- **Solução:** Adicionado `projectConfig` com todas as configurações necessárias (database, Redis, JWT, CORS, port)
- **Status:** ✅ Corrigido

### 2. **Comando de migração incorreto** ✅
- **Problema:** Documentação usava `npx medusa db:migrate` (comando antigo)
- **Solução:** Atualizado para `npx medusa db:migrate` (comando correto para v1.20)
- **Status:** ✅ Corrigido em todos os arquivos de documentação

### 3. **Dependência @medusajs/framework faltando** ✅
- **Problema:** `@medusajs/event-bus-local` precisava de `@medusajs/framework/utils`
- **Solução:** Pacote `@medusajs/framework` instalado automaticamente como dependência
- **Status:** ✅ Resolvido

### 4. **Configuração de módulos** ✅
- **Problema:** Tentativa de configurar módulos explicitamente causava erros
- **Solução:** Removida configuração explícita de módulos - Medusa v1.20 detecta automaticamente quando os pacotes estão instalados
- **Status:** ✅ Corrigido

## ⚠️ Problema Atual: CLI do Medusa

### Erro: "The 'id' argument must be of type string. Received undefined"

**Descrição:** O CLI do Medusa está tentando resolver comandos locais e falhando.

**Possíveis Causas:**
1. Estrutura de projeto incompleta
2. Problema com a versão do CLI do Medusa
3. Configuração faltando no projeto

**Soluções Alternativas:**

### Opção 1: Usar o servidor diretamente (Recomendado)

Em vez de usar comandos CLI, podemos executar as migrações diretamente através do servidor:

```bash
cd backend
npm run build
npm run dev
```

O servidor pode executar migrações automaticamente ao iniciar, ou podemos criar um script customizado.

### Opção 2: Usar TypeORM diretamente

Como o Medusa usa TypeORM, podemos executar migrações diretamente:

```bash
cd backend
npx typeorm migration:run -d medusa-config.js
```

### Opção 3: Criar script customizado

Criar um script Node.js que execute as migrações programaticamente:

```javascript
// scripts/migrate.js
const { Medusa } = require("@medusajs/medusa");
// ... código para executar migrações
```

### Opção 4: Usar seed diretamente

O comando `seed` pode funcionar mesmo com o erro do CLI:

```bash
cd backend
npm run seed
```

## 📋 Estado Atual

✅ **Configurado:**
- `medusa-config.js` completo
- Dependências instaladas (`@medusajs/framework`, `@medusajs/event-bus-local`, `@medusajs/cache-inmemory`)
- Configuração de módulos removida (detecção automática)
- Database URL configurado
- Docker configurado

⚠️ **Problema:**
- CLI do Medusa com erro ao executar comandos `db:*`
- Possível bug na versão 1.20.11 do CLI

## 🚀 Próximos Passos

1. **Testar o servidor diretamente:**
   ```bash
   cd backend
   npm run build
   npm run dev
   ```

2. **Verificar se as migrações são executadas automaticamente** ao iniciar o servidor

3. **Se necessário, criar migrações manualmente** usando TypeORM ou scripts customizados

4. **Verificar logs** do servidor para identificar problemas adicionais

## 📝 Notas

- O Medusa v1.20 usa uma arquitetura modular diferente das versões anteriores
- Os módulos (`event-bus-local`, `cache-inmemory`) são detectados automaticamente quando os pacotes estão instalados
- Não é necessário configurar módulos explicitamente no `medusa-config.js` para módulos padrão
- O comando `medusa db:migrate` existe, mas o CLI está com problemas para resolvê-lo

## 🔍 Debug

Para verificar o que está acontecendo:

```bash
# Verificar versões
npm list @medusajs/medusa @medusajs/cli

# Verificar configuração
node -e "const config = require('./medusa-config.js'); console.log(JSON.stringify(config, null, 2));"

# Testar conexão com banco
psql -U medusa_user -d medusa_db -h localhost
```

