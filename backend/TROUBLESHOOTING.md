# Solução para ChunkLoadError no Admin

## Problema
Erro `ChunkLoadError` ao carregar chunks do admin do Medusa. Isso geralmente acontece quando o webpack está recompilando enquanto o browser tenta carregar chunks antigos.

## Soluções

### 1. Limpar Cache do Browser
- Pressione `Cmd+Shift+R` (Mac) ou `Ctrl+Shift+R` (Windows/Linux) para hard refresh
- Ou limpe o cache do browser completamente

### 2. Reiniciar o Servidor
```bash
cd backend
# Pare o servidor (Ctrl+C)
npm run dev
```

### 3. Acessar diretamente a porta correta
O admin está rodando em: http://localhost:9000/app

### 4. Se o problema persistir
1. Pare o servidor completamente
2. Limpe os caches:
   ```bash
   cd backend
   rm -rf .medusa node_modules/.cache dist
   ```
3. Reinicie:
   ```bash
   npm run dev
   ```

### 5. Verificar se o servidor está estável
Certifique-se de que o servidor não está reiniciando constantemente. Se estiver, pode haver erros no código que estão causando recompilações.

## Configuração Atual
- `autoRebuild: false` - Desabilitado para evitar recompilações automáticas
- `hot: true` - Hot reload habilitado
- `liveReload: false` - Live reload desabilitado para evitar conflitos


