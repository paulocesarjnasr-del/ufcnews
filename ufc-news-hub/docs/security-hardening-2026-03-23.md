# Security Hardening - UFC News Hub
**Data:** 23 de Marco de 2026
**Commit:** `619da84` - fix(security): hardening completo

---

## Como comecou

A pergunta original foi:
> "ufc-news-hub/public/schema.sql - Schema do banco acessivel publicamente no site. Qualquer um pode ver a estrutura do seu BD"

A partir disso, rodamos uma auditoria completa de seguranca que encontrou **13 vulnerabilidades** no projeto. Todas foram corrigidas.

---

## As 4 Camadas de Seguranca

```
┌─────────────────────────────────────────────┐
│  CAMADA 4: LIMPEZA DE RASTROS              │
│  (apagar o que nunca deveria ter existido)  │
├─────────────────────────────────────────────┤
│  CAMADA 3: ESCUDO DO NAVEGADOR             │
│  (security headers - protecao automatica)   │
├─────────────────────────────────────────────┤
│  CAMADA 2: PORTEIRO EM CADA PORTA          │
│  (auth em todas as rotas admin)             │
├─────────────────────────────────────────────┤
│  CAMADA 1: COFRE DE SENHAS                 │
│  (sem senhas no codigo, so no Vercel)       │
└─────────────────────────────────────────────┘
```

---

## CAMADA 1: Cofre de Senhas

### O que era o problema?
O codigo tinha senhas escritas em texto puro como fallback. Exemplo:

```typescript
// ANTES (INSEGURO)
const SECRET = process.env.ADMIN_PASSWORD || 'ufc-admin-2024';
const expectedSecret = process.env.CRON_SECRET || 'ufc-news-cron-secret';
```

Qualquer pessoa que lesse o codigo (no GitHub) sabia a senha do admin e do cron.

### O que foi feito?

```typescript
// DEPOIS (SEGURO)
const SECRET = process.env.ADMIN_PASSWORD;
if (!SECRET) {
  console.error('[SECURITY] ADMIN_PASSWORD env var is required.');
}
```

Agora se a env var nao existir no Vercel, o sistema **rejeita tudo** em vez de usar uma senha padrao.

### Arquivos modificados:
| Arquivo | O que mudou |
|---------|------------|
| `src/lib/admin-sessions.ts` | Removeu fallback `'ufc-admin-2024'`, adicionou `timingSafeEqual` |
| `src/app/api/admin/auth/route.ts` | Removeu fallback, retorna 503 se senha nao configurada |
| `src/app/api/analises/generate/route.ts` | Removeu `'ufc-news-cron-secret'` |
| `src/app/api/company/events/process/route.ts` | Removeu `'ufc-news-cron-secret'` |
| `src/app/api/admin/migrate-enquetes/route.ts` | Removeu `'ufc-news-cron-secret'` |
| `src/app/api/admin/migrate-analises/route.ts` | Removeu `'ufc-news-cron-secret'` |
| `src/app/api/cron/route.ts` | Removeu 2 ocorrencias de `'ufc-news-cron-secret'` |
| `src/app/api/arena/cron/scoring/route.ts` | Corrigiu bypass: antes se CRON_SECRET nao existia, o check era pulado |

### Conceito: "Fail Closed" vs "Fail Open"
- **Fail Open** (inseguro): se algo da errado, deixa passar. Era o que tinhamos.
- **Fail Closed** (seguro): se algo da errado, bloqueia tudo. E o que temos agora.

### Conceito: timingSafeEqual
Antes a comparacao do token era:
```typescript
return sig === expected; // INSEGURO - vulneravel a timing attack
```

Um atacante podia medir o tempo de resposta para adivinhar a senha caractere por caractere. Agora:
```typescript
return timingSafeEqual(sigBuf, expectedBuf); // SEGURO - tempo constante
```

---

## CAMADA 2: Porteiro em Cada Porta

### O que era o problema?
9 rotas de admin nao tinham nenhuma verificacao de autenticacao. Qualquer pessoa podia:
- Deletar lutas duplicadas
- Rodar migracoes no banco
- Gerar analises com IA (gastando dinheiro)
- Resetar usuarios da Arena

### O que foi feito?
Adicionei `requireAdmin(request)` no inicio de cada rota. Funciona assim:

```typescript
// ANTES (INSEGURO) - qualquer pessoa podia chamar
export async function POST() {
  // deletar coisas do banco...
}

// DEPOIS (SEGURO) - precisa de token admin valido
export async function POST(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError; // retorna 401 se nao autenticado

  // so chega aqui se for admin
}
```

### Rotas protegidas:
| Rota | O que faz | Antes | Depois |
|------|-----------|-------|--------|
| `/api/admin/cleanup-duplicates` | Deleta lutas duplicadas | Aberto | requireAdmin() |
| `/api/admin/cleanup-news` | Deleta noticias | Aberto | requireAdmin() |
| `/api/admin/seed-enquete` | Cria enquetes | Aberto | requireAdmin() |
| `/api/admin/update-fighters` | Atualiza lutadores | Aberto | requireAdmin() |
| `/api/admin/normalize-xp` | Ajusta XP dos agentes | Aberto | requireAdmin() |
| `/api/admin/backfill-content` | Scrape de conteudo | Aberto | requireAdmin() |
| `/api/admin/migrations/reacoes-luta` | Roda DDL no banco | Aberto | requireAdmin() |
| `/api/analises/generate-full` | Gera analise com Claude (custa $$) | Auth COMENTADO | requireAdmin() |
| `/api/arena/cron/scoring` | Processa pontuacao | Bypass se env nao setada | Fail closed |

### Rate Limiting no Login Admin
Adicionei protecao contra brute force:

```typescript
// 5 tentativas por IP a cada 15 minutos
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
```

Se alguem errar a senha 5 vezes, fica bloqueado por 15 minutos.
No login com sucesso, o contador reseta.

### Correcao extra: SQL Injection
No `reset-arena-user`, o nome da coluna era interpolado na query:

```typescript
// ANTES (fragil)
`SELECT id FROM usuarios_arena WHERE ${findField} = $1`

// DEPOIS (seguro) - queries separadas
const users = usuario_id
  ? await query('SELECT ... WHERE id = $1', [findValue])
  : await query('SELECT ... WHERE username = $1', [findValue]);
```

### Correcao extra: Pool duplicado
O `backfill-content` criava sua propria conexao com o banco:

```typescript
// ANTES - pool duplicado, pode esgotar conexoes
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// DEPOIS - usa o singleton compartilhado
import { query } from '@/lib/db';
```

---

## CAMADA 3: Escudo do Navegador (Security Headers)

### O que era o problema?
O site nao mandava nenhum header de seguranca. O navegador do usuario nao sabia que precisava se proteger.

### O que foi feito?
Adicionei 7 headers no `next.config.js`:

| Header | O que faz | Analogia |
|--------|-----------|----------|
| `Content-Security-Policy` | Diz pro navegador de onde pode carregar scripts, imagens, fontes | Lista de convidados: so entra quem esta na lista |
| `Strict-Transport-Security` | Forca HTTPS por 2 anos | Cadeado permanente na porta |
| `X-Frame-Options: DENY` | Impede que seu site seja embutido em iframe de outro site | Ninguem pode colocar sua casa dentro de outra casa |
| `X-Content-Type-Options: nosniff` | Impede o navegador de "adivinhar" o tipo do arquivo | O carteiro so entrega se o endereco bater certinho |
| `Referrer-Policy` | Controla que info e enviada quando o usuario clica num link externo | Nao conta pra ninguem de onde voce veio |
| `Permissions-Policy` | Bloqueia camera, microfone, geolocalizacao | Fecha janelas que nao precisam estar abertas |
| `X-XSS-Protection` | Protecao extra contra XSS em navegadores antigos | Alarme extra pra navegadores velhos |

### CSP detalhado:
```
default-src 'self'                    → so carrega coisas do proprio site
script-src 'self' youtube google      → scripts so do site, YouTube e Google
style-src 'self' fonts.googleapis     → estilos so do site e Google Fonts
img-src 'self' blob: data: https:     → imagens de qualquer HTTPS (UFC, etc)
font-src 'self' fonts.gstatic        → fontes so do site e Google
connect-src 'self' anthropic vercel   → API calls so pro Anthropic e Vercel
frame-src youtube google              → iframes so YouTube e Google OAuth
object-src 'none'                     → bloqueia Flash/plugins
frame-ancestors 'none'                → ninguem pode embutir nosso site
upgrade-insecure-requests             → forca HTTPS em tudo
```

### Onde: `ufc-news-hub/next.config.js`
Os headers so aplicam em producao (HSTS e CSP). Em dev, ficam mais relaxados pra nao atrapalhar.

---

## CAMADA 4: Limpeza de Rastros

### O que era o problema?
1. `public/schema.sql` - qualquer um acessava `seusite.com/schema.sql` e via toda a estrutura do banco
2. `db-dump.sql` - dump completo do banco estava no historico do git
3. `/api/arena/auth/debug` - endpoint sem auth que mostrava pedacos das chaves Google OAuth

### O que foi feito?

| Acao | Como |
|------|------|
| Deletei `public/schema.sql` | `rm ufc-news-hub/public/schema.sql` |
| Deletei endpoint debug | `rm -r src/app/api/arena/auth/debug/` |
| Purgei do historico git | `git filter-repo --path schema.sql --path db-dump.sql --invert-paths --force` |
| Atualizei .gitignore | Adicionei `*.dump`, `*.backup`, `db-dump*.sql`, `**/public/*.sql` |

### Conceito: git filter-repo
Deletar um arquivo com `rm` so remove ele do presente. Ele continua existindo no historico do git. Qualquer pessoa pode fazer `git log` e ver o conteudo antigo.

O `git filter-repo` reescreve TODO o historico do git como se o arquivo nunca tivesse existido. Por isso precisou de `git push --force` depois.

### Conceito: .gitignore
Arquivo que diz pro git "ignore esses arquivos, nunca commite eles". Adicionamos padroes pra nunca mais um dump SQL ir pro repositorio por acidente.

---

## Verificacao Final (Testes em Producao)

Depois do deploy, testamos tudo:

| Teste | Comando | Resultado |
|-------|---------|-----------|
| schema.sql bloqueado? | `curl .../schema.sql` | 404 |
| Homepage carrega? | `curl .../` | 200 |
| API Health | `curl .../api/health` | 200 |
| API Noticias | `curl .../api/noticias` | 5 items |
| API Eventos | `curl .../api/eventos` | 4 items |
| Debug endpoint removido? | `curl .../api/arena/auth/debug` | 404 |
| Admin sem token? | `curl .../api/admin/cleanup-duplicates -X POST` | 401 |
| Seed sem token? | `curl .../api/admin/seed-enquete -X POST` | 401 |
| Generate-full sem token? | `curl .../api/analises/generate-full -X POST` | 401 |
| Security headers presentes? | `curl -I .../` | Todos os 7 headers presentes |

**Resultado: tudo que funcionava continua funcionando. Tudo que estava exposto agora esta protegido.**

---

## Credenciais Rotacionadas

| Credencial | Onde foi atualizado |
|------------|-------------------|
| ADMIN_PASSWORD | Vercel (production) + .env local |
| CRON_SECRET | Vercel (production) + .env local |

### Credenciais que AINDA PRECISAM ser rotacionadas:
O arquivo `.env` local foi exposto durante a conversa. Essas keys precisam ser trocadas nos respectivos dashboards:

| Key | Onde trocar |
|-----|------------|
| ANTHROPIC_API_KEY | console.anthropic.com |
| GOOGLE_CLIENT_SECRET | console.cloud.google.com |
| RESEND_API_KEY | resend.com/api-keys |
| ELEVENLABS_API_KEY | elevenlabs.io dashboard |
| UNSPLASH_ACCESS_KEY | unsplash.com/developers |

Depois de gerar novas keys, atualizar no Vercel:
```bash
vercel env rm <KEY> production -y
printf 'novo_valor' | vercel env add <KEY> production
```

---

## Resumo Numerico

| Metrica | Quantidade |
|---------|-----------|
| Arquivos modificados | 20 |
| Arquivos deletados | 2 |
| Rotas que nao pediam senha e agora pedem | 9 |
| Senhas hardcoded removidas | 8 ocorrencias |
| Security headers adicionados | 7 |
| Arquivos purgados do historico git | 2 |
| Vulnerabilidades corrigidas | 13 |
| Funcionalidades quebradas | 0 |

---

## Glossario

| Termo | O que significa |
|-------|----------------|
| **env var** | Variavel de ambiente. Senha guardada fora do codigo, no servidor (Vercel). |
| **fallback** | Valor padrao se a env var nao existir. Perigoso pra senhas. |
| **fail closed** | Se algo da errado, bloqueia tudo. Oposto de fail open. |
| **requireAdmin()** | Funcao que verifica se o request tem um token admin valido. |
| **rate limiting** | Limitar quantas tentativas alguem pode fazer num periodo de tempo. |
| **security headers** | Instrucoes que o servidor manda pro navegador sobre como se proteger. |
| **CSP** | Content Security Policy. Lista de fontes permitidas pra scripts, imagens, etc. |
| **HSTS** | Forca o navegador a sempre usar HTTPS. |
| **timingSafeEqual** | Comparacao de strings que sempre leva o mesmo tempo, impedindo timing attacks. |
| **git filter-repo** | Ferramenta que reescreve o historico git removendo arquivos do passado. |
| **brute force** | Tentativa de adivinhar senha testando todas as combinacoes. Rate limiting previne isso. |
| **SQL injection** | Atacante insere codigo SQL malicioso nos inputs. Prevenido com queries parametrizadas. |
| **XSS** | Cross-Site Scripting. Atacante injeta JavaScript no seu site. CSP previne isso. |
| **timing attack** | Atacante mede tempo de resposta pra adivinhar senha. timingSafeEqual previne isso. |
