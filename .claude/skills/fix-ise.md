---
name: fix-ise
description: Diagnosticar e corrigir Internal Server Error (500) no UFC News Hub. Invoke com "/fix-ise" ou quando o usuario reportar ISE/500/internal server error.
---

# Skill: Fix Internal Server Error (ISE / 500)

> Protocolo de diagnostico e correcao para Internal Server Errors no UFC News Hub.
> Baseado em causas reais recorrentes do projeto + melhores praticas Next.js 15 (marco 2026).

## Quando invocar

- Usuario diz "deu ISE", "internal server error", "500", "site caiu", "erro no servidor"
- Deploy na Vercel falhou com 500
- Build quebrou e producao esta servindo erro

## Protocolo de Diagnostico (seguir em ordem)

### PASSO 1: Verificar se o build compila

```bash
cd ufc-news-hub && npm run build 2>&1 | tail -40
```

**Se falhar:** O problema esta no build. Va para a Secao A.
**Se passar:** O build compila. Va para o PASSO 2.

### PASSO 2: Verificar lint e types

```bash
cd ufc-news-hub && npm run lint 2>&1 | tail -20
cd ufc-news-hub && npx tsc --noEmit 2>&1 | tail -20
```

**Se falhar:** Corrija os erros de lint/type. Geralmente nao causa ISE sozinho, mas pode mascarar o problema real.

### PASSO 3: Verificar conexao com banco

```bash
cd ufc-news-hub && node -e "const { Pool } = require('pg'); const p = new Pool({connectionString: process.env.DATABASE_URL}); p.query('SELECT 1').then(() => {console.log('DB OK'); p.end()}).catch(e => {console.error('DB FAIL:', e.message); p.end()})"
```

**Se falhar:** Va para a Secao B.
**Se passar:** Va para o PASSO 4.

### PASSO 4: Verificar variaveis de ambiente

```bash
cd ufc-news-hub && node -e "
const required = ['DATABASE_URL', 'ANTHROPIC_API_KEY'];
const optional = ['ADMIN_PASSWORD', 'CRON_SECRET', 'RSS_FEED_URL'];
required.forEach(k => console.log(k + ':', process.env[k] ? 'SET' : 'MISSING'));
optional.forEach(k => console.log(k + ':', process.env[k] ? 'SET' : 'not set (optional)'));
"
```

**Se alguma required estiver MISSING:** Va para a Secao C.

### PASSO 5: Verificar logs do dev server

```bash
cd ufc-news-hub && npm run dev 2>&1 &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3010
curl -s -o /dev/null -w "%{http_code}" http://localhost:3010/api/noticias
kill %1 2>/dev/null
```

**Se retornar 500:** Olhar o terminal do dev server para o stack trace completo. Va para a Secao D.

---

## Secoes de Diagnostico por Causa

### Secao 0: Service Worker Cacheando (CHECAR PRIMEIRO)

**Sintoma:** Site mostra ISE mas todas as APIs retornam 200. Ou o build foi corrigido mas o browser continua mostrando erro.
**Causa:** O Service Worker (`/sw.js`) cacheia tudo e serve versoes antigas, inclusive paginas com erro. Mesmo depois de corrigir o codigo, o SW continua servindo a versao quebrada.
**Fix (usuario faz no browser):**
1. Abrir DevTools (F12)
2. Aba Application (ou Storage no Safari)
3. Menu lateral → Service Workers → Unregister
4. Storage → Clear site data (ou limpar cookies + cache)
5. Recarregar a pagina

**Fix (dev - bypass temporario):**
- DevTools → Application → Service Workers → marcar "Update on reload"
- Ou abrir em aba anonima (SW nao esta registrado la)

**IMPORTANTE:** Se o protocolo chegar no final e tudo estiver 200 mas o usuario ainda ve ISE, a causa e quase certamente o Service Worker.

---

### Secao A: Build Falhou

#### A1: SDK Anthropic com breaking changes
**Sintoma:** `Attempted import error: 'X' is not exported from './resources/index.mjs'`
**Causa:** O `@anthropic-ai/sdk` atualizou e removeu/renomeou exports.
**Fix:**
```bash
cd ufc-news-hub
# Verificar versao atual
npm ls @anthropic-ai/sdk
# Opção 1: Fixar na versao que funcionava
npm install @anthropic-ai/sdk@0.52.0
# Opção 2: Atualizar e adaptar os imports
npm install @anthropic-ai/sdk@latest
# Depois verificar quais imports quebraram:
grep -rn "from '@anthropic-ai/sdk'" src/ --include="*.ts" --include="*.tsx"
```
**Prevencao:** Fixar versao no package.json (sem `^`): `"@anthropic-ai/sdk": "0.52.0"`

#### A2: Vercel AI SDK incompativel
**Sintoma:** Erros em `inputSchema`, `zodSchema`, ou `generateText`
**Causa:** O pacote `ai` atualizou e a API mudou.
**Fix:**
```bash
cd ufc-news-hub
npm ls ai @ai-sdk/anthropic
# Verificar se zodSchema() esta sendo usado (OBRIGATORIO no v6+)
grep -rn "parameters:" src/lib/ai-company/ --include="*.ts" | grep -v "zodSchema"
```
**REGRA:** Vercel AI SDK v6+ usa `inputSchema: zodSchema(z.object({...}))`, NUNCA `parameters: z.object({...})`.

#### A3: Prisma client desatualizado
**Sintoma:** `Cannot find module '@/generated/prisma'` ou tipos faltando
**Causa:** O Prisma client nao foi regenerado apos mudanca no schema.
**Fix:**
```bash
cd ufc-news-hub && npx prisma generate
```

#### A4: Webpack/Next.js cache corrompido
**Sintoma:** Erros bizarros de import, modulos nao encontrados que claramente existem
**Fix:**
```bash
cd ufc-news-hub
rm -rf .next
rm -rf node_modules/.cache
npm run build
```

#### A5: node_modules corrompido
**Sintoma:** Multiplos erros de modulo nao encontrado, comportamento inconsistente
**Fix:**
```bash
cd ufc-news-hub
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

### Secao B: Banco de Dados

#### B1: Pool de conexoes esgotado
**Sintoma:** `Error: timeout exceeded when trying to connect` ou `too many clients`
**Causa:** O pool esta em max=20. Se houver muitas requests simultaneas ou conexoes nao liberadas, esgota.
**Fix:**
- Verificar se tem queries sem `client.release()` em `transaction()`
- Reiniciar o servidor para resetar o pool
- Checar se `globalThis.__pgPool` esta sendo reutilizado (padrao singleton em `src/lib/db.ts`)

#### B2: DATABASE_URL invalida ou expirada
**Sintoma:** `ECONNREFUSED`, `ENOTFOUND`, `password authentication failed`
**Fix:**
- Verificar a URL no `.env`
- Se Neon/Supabase: o token pode ter expirado, gerar novo no dashboard
- Testar conexao direta: `psql $DATABASE_URL`

#### B3: Migration pendente
**Sintoma:** `column "X" does not exist`, `relation "Y" does not exist`
**Fix:**
```bash
cd ufc-news-hub && npx prisma migrate deploy
```
**CUIDADO:** NUNCA modificar migrations ja commitadas (R-12).

---

### Secao C: Variaveis de Ambiente

#### C1: .env nao carregado
**Sintoma:** Funciona local mas falha em producao, ou vice-versa
**Fix:**
- Local: verificar se `.env` existe em `ufc-news-hub/`
- Vercel: verificar Environment Variables no dashboard (Settings > Environment Variables)
- Confirmar que o `.env` NAO esta commitado (R-11)

#### C2: ANTHROPIC_API_KEY invalida
**Sintoma:** Rotas de IA retornam 500, demais rotas funcionam
**Fix:**
- Verificar se a key comeca com `sk-ant-`
- Testar: `curl https://api.anthropic.com/v1/messages -H "x-api-key: $ANTHROPIC_API_KEY" -H "anthropic-version: 2023-06-01" -d '{"model":"claude-sonnet-4-20250514","max_tokens":10,"messages":[{"role":"user","content":"hi"}]}'`

---

### Secao D: Runtime Errors (server compila mas da 500)

#### D1: API route sem try/catch
**Sintoma:** 500 generico sem mensagem util
**Causa:** Uma rota de API nao tem tratamento de erro.
**Fix (padrao correto para App Router):**
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // ... logica
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('[API /rota] Error:', message);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
```

#### D2: Server Component acessando API interna durante build
**Sintoma:** `fetch failed`, `ECONNREFUSED localhost:3010` durante `npm run build`
**Causa:** Paginas estaticas tentam fetch de API routes que nao existem durante build time.
**Fix:** Adicionar `export const dynamic = 'force-dynamic'` na pagina, OU usar acesso direto ao DB em vez de fetch para a API.

#### D3: Imagem de dominio nao autorizado
**Sintoma:** 500 ao carregar pagina com imagem de fonte nova
**Fix:** Adicionar o dominio em `next.config.js` no array `images.remotePatterns`.

#### D4: Falta error boundary (paginas)
**Sintoma:** Tela branca ou "Internal Server Error" generico em paginas (nao APIs)
**Fix:** Criar `src/app/error.tsx` e `src/app/global-error.tsx`:
```typescript
// src/app/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <div className="neu-card p-8 text-center max-w-md">
        <h2 className="font-display text-2xl text-ufc-red mb-4">ERRO</h2>
        <p className="text-dark-text mb-4">{error.message || 'Algo deu errado.'}</p>
        <button onClick={reset} className="neu-button px-6 py-2">
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
```

---

## Medidas Preventivas (implementar proativamente)

### P1: Fixar versoes criticas no package.json
Remover o `^` de dependencias que ja quebraram:
- `@anthropic-ai/sdk`
- `ai`
- `@ai-sdk/anthropic`
- `prisma` / `@prisma/client`

### P2: Criar error boundaries
Garantir que `src/app/error.tsx` e `src/app/global-error.tsx` existem.

### P3: Verificar build antes de deploy
Sempre rodar `npm run build` local antes de push. O CLAUDE.md ja pede isso (R-4).

### P4: Health check endpoint
Criar `src/app/api/health/route.ts` que testa DB + env vars:
```typescript
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    await pool.query('SELECT 1');
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      db: 'connected',
    });
  } catch {
    return NextResponse.json({ status: 'error', db: 'disconnected' }, { status: 500 });
  }
}
```

### P5: Logs estruturados
Todas as API routes devem logar com prefixo: `console.error('[API /rota] Error:', error)`.

---

## Checklist Rapido (copiar e seguir)

- [ ] Service Worker limpo? (Unregister + Clear site data)
- [ ] `npm run build` passa?
- [ ] `npm run lint` passa?
- [ ] `npx tsc --noEmit` passa?
- [ ] DB conecta? (`SELECT 1`)
- [ ] `.env` tem DATABASE_URL e ANTHROPIC_API_KEY?
- [ ] Cache limpo? (`rm -rf .next`)
- [ ] `node_modules` integro?
- [ ] Error boundaries existem?
- [ ] Versoes de SDK fixadas?

---

## Historico de ISEs Resolvidos

| Data | Causa | Fix |
|------|-------|-----|
| 2026-03-16 | `@anthropic-ai/sdk@0.78.0` removeu exports `Models`, `Beta`, `Completions` | Downgrade para 0.77.0 + fixar versao sem `^` |
| 2026-03-16 | Service Worker cacheava pagina com erro mesmo apos fix no codigo | Unregister SW + Clear site data no browser |

> **Instrucao:** Sempre adicionar novas ocorrencias nesta tabela para criar historico.

---

## Fontes

- [Next.js Error Handling (App Router)](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Next.js API Routes Error Handling](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
- [Vercel 500 Errors Discussion](https://github.com/vercel/next.js/discussions/38756)
- [Better Stack - Next.js Error Handling Patterns](https://betterstack.com/community/guides/scaling-nodejs/error-handling-nextjs/)
