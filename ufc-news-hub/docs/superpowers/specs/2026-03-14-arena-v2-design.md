# Arena v2 — Design Spec

> Reestruturacao completa da secao Arena do UFC News Hub.
> Objetivo: full-stack conectado, UX fluida, zero friccao para fas casuais.

---

## Decisoes Fundamentais

| Decisao | Resposta |
|---------|----------|
| Publico-alvo | Fas casuais de UFC — simplicidade e zero friccao |
| Fluxo pos-login | Dashboard central com tab swipe (Evento / Stats / Social) |
| Previsoes | Vencedor obrigatorio + metodo/round opcionais com bonus |
| Revelacao de picks | Escondidos ate deadline; revelados apos previsoes fecharem |
| Scoring | Cron automatico — processa eventos finalizados com previsoes pendentes |
| Live | Polling 15-30s no frontend + scraping agressivo 1-2min no UFC.com |
| Auth security | P1 — primeiro UX, depois hardening (bcrypt + JWT) |
| Inspiracoes UX | FanDuel/DraftKings (gamificacao) + Verdict MMA (live) |
| Duelos | REMOVIDO do escopo |

## Constraints (Pipeline-Viz)

O hub 3D em localhost:5173 escaneia o codebase dinamicamente. Regras inviolaveis:

1. **Manter "arena" no path** — scanner usa `find src -ipath "*arena*"`
2. **Manter convencoes Next.js** — `app/arena/`, `app/api/arena/`, `components/arena/`, `lib/arena/`
3. **Nao renomear tabelas DB existentes** — `usuarios_arena`, `previsoes`, `ligas`, `liga_membros`, `amizades` estao hardcoded em `vite-plugin-stats.ts`
4. **Novas tabelas** podem ser adicionadas sem risco

---

## Organizacao: Passo Zero + 2 Fases

```
PASSO ZERO (Pre-requisito)
  Z2: Scoring Cron — wiring de pontuacao.ts

FASE 1 — FUNDACAO
  M1: Layout & Navegacao
  M2: Dashboard Central (tab swipe)
  M3: Previsoes UX Polish
  M4: Perfil

FASE 2 — EXPANSAO
  M5: Ligas & Social
  M6: Live & Resultados
  M7: Analytics & Stats
  M8: Auth Hardening
```

---

## Diagrama de Conexao Full-Stack

```
USUARIO (Browser)
    |
    v
+---------------------------------------------+
|  LAYOUT (arena/layout.tsx)                   |
|  - Header fixo + pontos badge + avatar       |
|  - Bottom nav: Home | Evento | Ligas | Perfil|
|  - useArenaAuth() -> estado global           |
+------+------+-------+-------+-------+-------+
       |      |       |       |       |
       v      v       v       v       v
  Dashboard  Evento  Ligas  Perfil  Live
  (tab swipe)(picks) (social)(stats) (2a tela)
       |      |       |       |       |
       v      v       v       v       v
+---------------------------------------------+
|  API ROUTES (/api/arena/*)                   |
|  - auth/* (login, registro, me, google)      |
|  - previsoes/* (CRUD + revelacao comunitaria)|
|  - ligas/* (CRUD + ranking + chat)           |
|  - perfil/* (stats + conquistas + historico) |
|  - live/* (resultados + leaderboard)         |
|  - cron/scoring (processamento automatico)   |
+------+--------------------------------------+
       |
       v
+---------------------------------------------+
|  LIB/ARENA (business logic)                  |
|  - auth.ts (autenticacao)                    |
|  - pontuacao.ts (scoring engine)             |
|  - previsoes-horario.ts (deadline logic)     |
+------+--------------------------------------+
       |
       v
+---------------------------------------------+
|  POSTGRESQL                                  |
|  - usuarios_arena (users + XP + nivel)       |
|  - previsoes (picks + scores)                |
|  - evento_pontuacao (leaderboards)           |
|  - ligas + liga_membros (social)             |
|  - conquistas (achievements)                 |
|  - notificacoes (alerts)                     |
|  - liga_chat (messages)                      |
|  - amizades (friends)                        |
|  - atividades (activity feed)                |
+---------------------------------------------+
```

---

## Z2: Scoring Cron

### Problema
`pontuacao.ts` tem toda a logica de scoring mas nunca e chamado. Previsoes ficam com `processada=false` para sempre. Todo o ecossistema mostra zeros.

### Solucao
Nova rota: `/api/arena/cron/scoring`

### Logica

```sql
-- Discovery: quais eventos precisam de scoring?
SELECT DISTINCT e.id
FROM eventos e
JOIN previsoes p ON p.evento_id = e.id
WHERE e.status = 'finalizado'
  AND p.processada = false;
```

Para cada evento encontrado, chamar `processarEventoFinalizado(eventoId)`.

### Conexao Full-Stack

```
Vercel Cron (a cada 5 min durante eventos, 1x/hora fora)
  -> GET /api/arena/cron/scoring
    -> SELECT eventos finalizados com previsoes nao processadas
    -> Para cada: processarEventoFinalizado(eventoId)
      -> UPDATE previsoes SET processada=true, pontos_ganhos=X
      -> UPDATE usuarios_arena SET pontos_totais=Y, xp_total=Z
      -> UPDATE evento_pontuacao (leaderboard)
      -> UPDATE liga_membros (ranking por liga)
      -> INSERT conquistas (achievements desbloqueados)
      -> INSERT notificacoes (avisos pro usuario)
```

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/app/api/arena/cron/scoring/route.ts` | CRIAR |
| `src/lib/arena/pontuacao.ts` | MANTER (ja esta pronto) |
| `vercel.json` (cron config) | MODIFICAR |

### Confianca: 95%

---

## M1: Layout & Navegacao

### Problema v1
Navegacao nao e clara. Usuario precisa saber URLs. Sub-header existe mas nao tem nav explicita entre secoes.

### Solucao v2
Bottom navigation bar (mobile-first, inspirado FanDuel).

```
+-------------------------------------------+
|  [Arena Logo]  234 pts  [Avatar dropdown]  |  <- top bar (manter)
+-------------------------------------------+
|                                            |
|          CONTEUDO DA PAGINA                |
|                                            |
+-------------------------------------------+
|  Home  |  Evento  |  Ligas  |  Perfil     |  <- bottom nav (NOVO)
+-------------------------------------------+
```

Desktop: mesma nav vira tabs horizontais no top bar.

### Tab "Evento" — ID Dinamico

O tab "Evento" precisa linkar para `/arena/evento/[id]` com o ID do proximo evento. Solucao: hook `useProximoEvento()` no layout que chama `/api/eventos/proximo`.

### Rotas

| Tab | Rota | Pagina |
|-----|------|--------|
| Home | `/arena` | Dashboard (tab swipe) |
| Evento | `/arena/evento/[id]` | Previsoes do proximo evento |
| Ligas | `/arena/ligas` | Hub de ligas |
| Perfil | `/arena/perfil/[username]` | Meu perfil |

### Conexao Full-Stack

```
layout.tsx (client component, ja e 'use client')
  -> useArenaAuth() -> usuario, pontos, avatar (JA EXISTE)
  -> useProximoEvento() -> id do proximo evento (HOOK NOVO)
    -> fetch /api/eventos/proximo (JA EXISTE)
  -> Renderiza bottom nav com 4 tabs
  -> Highlight tab ativo baseado em pathname
```

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/app/arena/layout.tsx` | MODIFICAR (adicionar bottom nav) |
| `src/hooks/useProximoEvento.ts` | CRIAR |

### Confianca: 90%

---

## M2: Dashboard Central (Tab Swipe)

### Problema v1
`/arena` e uma landing page estatica. Pos-login nao tem hub central.

### Solucao v2
Dashboard com 3 tabs swipeaveis. CSS `scroll-snap-type: x mandatory`.

```
+-------------------------------------------+
| [Evento]  Stats  Social                   |  <- tabs (tap ou swipe)
|  ========                                 |  <- underline animado
+-------------------------------------------+

Tab 1: EVENTO          Tab 2: STATS           Tab 3: SOCIAL
+------------------+   +------------------+   +------------------+
| UFC 326          |   | 234 pontos       |   | Minhas Ligas     |
| Pereira vs Gane  |   | 67% precisao     |   | Liga Amigos #2/8 |
| [2d 14h]         |   | #4 ranking       |   | UFC Brasil #14   |
|                  |   |                  |   |                  |
| 3/14 picks       |   | Streaks: 5 seg   |   | Atividade        |
| [FAZER PICKS ->] |   | Melhor: KO (82%) |   | Acertou X!       |
|                  |   | [VER PERFIL ->]  |   | [VER TODAS ->]   |
+------------------+   +------------------+   +------------------+
```

### Lazy Loading
Cada tab so busca dados quando o usuario swipa pra ela. Tab "Evento" carrega primeiro (default).

### Conexao Full-Stack

```
/arena (page.tsx) — usuarios logados veem dashboard, nao-logados veem landing
  Tab Evento:
    -> fetch /api/eventos/proximo (JA EXISTE)
    -> fetch /api/arena/previsoes?evento_id=X (JA EXISTE)

  Tab Stats:
    -> fetch /api/arena/perfil (JA EXISTE)

  Tab Social:
    -> fetch /api/arena/ligas?tipo=minhas&limit=2 (JA EXISTE)
    -> fetch /api/arena/atividades?limit=5 (API NOVA)
```

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/app/arena/page.tsx` | REESCREVER (dashboard com tab swipe) |
| `src/app/api/arena/atividades/route.ts` | CRIAR (leitura de tabela atividades) |
| `src/components/arena/DashboardTabs.tsx` | CRIAR |
| `src/components/arena/TabEvento.tsx` | CRIAR |
| `src/components/arena/TabStats.tsx` | CRIAR |
| `src/components/arena/TabSocial.tsx` | CRIAR |

### Confianca: 85%

---

## M3: Previsoes UX Polish

### Problema v1
- Cards colapsaveis — usuario precisa clicar pra abrir cada luta
- Sem indicador de progresso
- Quando evento inicia, form desaparece sem transicao
- Picks sao privados o tempo inteiro (sem senso de comunidade)

### Solucao v2

#### 1. Progress bar no topo
```
+-------------------------------------------+
| Suas previsoes: 5/14                      |
| [=========>                          ] 36% |
+-------------------------------------------+
```

#### 2. Cards com resumo inline
Pick ja feito mostra resumo sem expandir: "Pereira por KO R3" em texto pequeno no card.

#### 3. Estado pos-evento
Em vez de esconder form, mostrar resultado + acertou/errou com cores:
- Verde: acertou vencedor (+metodo/round se aplicavel)
- Vermelho: errou
- Pontos ganhos naquela luta

#### 4. Quick pick mode
Botao rapido de "so vencedor" — 1 toque por luta, sem expandir card.

#### 5. Revelacao Comunitaria (Feature Chave)

**ANTES do deadline** (previsoes abertas):
- Cada usuario ve APENAS seus proprios picks
- Consenso bar: ESCONDIDO
- Ninguem sabe o que os outros escolheram

**APOS deadline** (~1h antes do evento, previsoes fechadas):
- Revelacao: picks de todos ficam visiveis
- Consenso bar: "67% da Arena escolheu Pereira"
- Lista de picks dos amigos/membros da liga
- Ninguem pode mais editar — momento de "e agora?"
- Cria comunidade e discussao antes do evento comecar

### Conexao Full-Stack

```
ANTES do deadline:
  GET /api/arena/previsoes?evento_id=X
    -> Retorna SOMENTE previsoes do usuario logado
    -> Campo 'revelado': false

APOS deadline:
  GET /api/arena/previsoes?evento_id=X&comunidade=true
    -> API checa: data_evento - 1h < now()
    -> Se sim: retorna agregado (% por lutador) + picks individuais de amigos
    -> Se nao: retorna 403 "Previsoes ainda abertas"

POS-EVENTO (scoring rodou):
  GET /api/arena/previsoes?evento_id=X
    -> Retorna picks COM resultados: processada=true, acertou_*, pontos_ganhos
```

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/app/arena/evento/[id]/page.tsx` | MODIFICAR (progress bar, estados) |
| `src/components/arena/LutaCard.tsx` | MODIFICAR (resumo inline, quick pick, resultado) |
| `src/components/arena/PrevisaoForm.tsx` | MODIFICAR (quick pick mode) |
| `src/components/arena/ProgressBar.tsx` | CRIAR |
| `src/components/arena/ConsensoReveal.tsx` | CRIAR (consenso comunitario) |
| `src/app/api/arena/previsoes/route.ts` | MODIFICAR (adicionar ?comunidade=true) |

### Confianca: 90%

---

## M4: Perfil

### Problema v1
Perfil existe e e abrangente. Mas com scoring zerado, tudo mostra zeros. Falta historico de eventos.

### Solucao v2
Com scoring funcionando (Z2), perfil ganha vida sozinho. Adicoes:

1. **Historico de eventos** — lista de eventos passados com score de cada
2. **Grafico de evolucao** — accuracy ao longo do tempo (line chart simples)
3. **Compartilhar perfil** — botao para copiar link do perfil publico

### Conexao Full-Stack

```
/arena/perfil/[username] (page.tsx)
  -> fetch /api/arena/perfil/[username] (JA EXISTE)
     -> stats, conquistas, streaks, especialidades
  -> fetch /api/arena/perfil/[username]/historico (API NOVA)
     -> SELECT * FROM evento_pontuacao WHERE usuario_id=$1
        ORDER BY created_at DESC
```

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/app/arena/perfil/[username]/page.tsx` | MODIFICAR (historico + grafico) |
| `src/app/api/arena/perfil/[username]/historico/route.ts` | CRIAR |
| `src/components/arena/EventoHistorico.tsx` | CRIAR |
| `src/components/arena/AccuracyChart.tsx` | CRIAR (chart lib TBD) |

### Confianca: 88%

---

## M5: Ligas & Social

### O que existe v1
- Criar/entrar em ligas, ver ranking, copiar invite code
- Chat: placeholder "Em breve"
- Amigos: tabelas DB existem, UI incompleta

### Solucao v2

#### Liga Detail Page Melhorada
1. **Chat ativo** — tabela `liga_chat` ja existe. Polling a cada 10s.
2. **Ranking animado** — posicoes sobem/descem com animacao apos eventos
3. **Invite via link** — `/arena/ligas/join/[codigo]` (alem do codigo manual)

#### Amigos
1. **Buscar por username** — input de busca
2. **Enviar/aceitar pedido** — tabela `amizades` ja existe
3. **Badge no perfil** — "amigo" se ja conectados

### Conexao Full-Stack

```
Ligas:
  /arena/ligas/[id] (page.tsx)
    -> fetch /api/arena/ligas/[id] (JA EXISTE) -> ranking + membros
    -> fetch /api/arena/ligas/[id]/chat (API NOVA) -> mensagens
    -> POST /api/arena/ligas/[id]/chat (API NOVA) -> enviar msg
    -> DB: liga_chat (tabela ja existe)

  /arena/ligas/join/[codigo] (page.tsx NOVA)
    -> POST /api/arena/ligas/entrar (JA EXISTE) -> entrar via codigo

Amigos:
  -> fetch /api/arena/amigos (VERIFICAR se existe)
  -> POST /api/arena/amigos/solicitar (VERIFICAR se existe)
  -> DB: amizades (tabela ja existe)
```

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/app/arena/ligas/[id]/page.tsx` | MODIFICAR (chat, ranking animado) |
| `src/app/api/arena/ligas/[id]/chat/route.ts` | CRIAR |
| `src/components/arena/LigaChat.tsx` | CRIAR |
| `src/components/arena/RankingAnimado.tsx` | CRIAR |
| `src/app/arena/ligas/join/[codigo]/page.tsx` | CRIAR |
| APIs de amigos | VERIFICAR e completar se necessario |

### Confianca: 80%

---

## M6: Live & Resultados

### Arquitetura

O scraper de resultados ao vivo **ja existe** em `sync-eventos/route.ts`. Ja detecta lutas finalizadas, extrai vencedor/metodo/round, e atualiza DB. O que falta:

1. **Frequencia de scraping**: 15-30min (cron atual) -> 1-2min durante eventos ao vivo
2. **Pagina live**: frontend que mostra resultados + picks + leaderboard
3. **Scoring parcial**: processar previsoes por luta (nao esperar evento inteiro)

### Fluxo

```
UFC.com atualiza resultado
  |
  | scrape a cada 1-2min (durante evento ao vivo)
  v
sync-eventos/route.ts (JA EXISTE)
  |
  | UPDATE lutas SET status='finalizada', vencedor_id=X
  v
PostgreSQL
  |
  | cron/scoring processa previsoes daquela luta
  v
/arena/live (frontend poll a cada 15-30s)
  |
  v
Usuario ve: resultado, se acertou, leaderboard atualizado
```

### Pagina Live

```
+-------------------------------------------+
| AO VIVO — UFC 326                   [red] |
+-------------------------------------------+
| LUTA ATUAL: Pereira vs Gane (R2)          |
| Seus picks: Pereira por KO R3             |
| Consenso: 67% Pereira                     |
+-------------------------------------------+
| RESULTADOS (5/14 lutas)                   |
| [check] Acertou: Silva por UD      +100   |
| [x]     Errou: Jones por Sub R1     +0    |
| [check] Acertou: Costa por TKO R2  +150   |
+-------------------------------------------+
| LEADERBOARD                               |
| #1 joao_mma — 450 pts (+200 hoje)         |
| #2 VOCE — 380 pts (+150 hoje)             |
| #3 maria_ufc — 320 pts (+100 hoje)        |
+-------------------------------------------+
```

### Conexao Full-Stack

```
/arena/live (page.tsx) — poll a cada 15-30s
  -> fetch /api/arena/live?evento_id=X (API NOVA)
     -> Retorna: lutas com status atualizado, resultados, picks do usuario
  -> fetch /api/arena/live/leaderboard?evento_id=X (API NOVA)
     -> Retorna: ranking parcial do evento em andamento

Scraping agressivo:
  -> Cron especial: quando evento.status='ao_vivo', rodar sync-eventos a cada 1-2min
  -> Apos cada luta finalizada: trigger scoring parcial
```

### Scoring Parcial vs Total

`pontuacao.ts` hoje processa o evento inteiro. Para live, precisamos:
- Processar por luta individual quando ela finaliza
- Acumular pontos parciais no `evento_pontuacao`
- Finalizar com bonus de card perfeito apos ultima luta

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/app/arena/live/page.tsx` | CRIAR |
| `src/app/api/arena/live/route.ts` | CRIAR |
| `src/app/api/arena/live/leaderboard/route.ts` | CRIAR |
| `src/components/arena/LiveResultCard.tsx` | CRIAR |
| `src/components/arena/LiveLeaderboard.tsx` | CRIAR |
| `src/lib/arena/pontuacao.ts` | MODIFICAR (scoring parcial por luta) |
| `src/app/api/cron/route.ts` | MODIFICAR (frequencia dinamica) |

### Riscos
- UFC.com pode bloquear scraping a cada 1-2min (mitigacao: headers rotativos, cache)
- Cheerio pode nao pegar conteudo JS-rendered (fallback: Playwright ja instalado)
- Scoring parcial requer refactor de `processarEventoFinalizado()`

### Confianca: 88%

---

## M7: Analytics & Stats

### Solucao v2
Pagina simples com graficos basicos. Para casuais, nao precisa ser complexo.

1. **Historico de accuracy** por evento (line chart)
2. **Distribuicao de metodos** acertados (donut chart: KO/Sub/Dec)
3. **Ranking global** paginado

### Conexao Full-Stack

```
/arena/analytics (page.tsx)
  -> fetch /api/arena/analytics/historico (API NOVA)
     -> SELECT evento_id, pontos_ganhos, acertos FROM evento_pontuacao
        WHERE usuario_id=$1 ORDER BY created_at
  -> fetch /api/arena/analytics/metodos (API NOVA)
     -> SELECT metodo_previsto, COUNT(*) FILTER (WHERE acertou_metodo=true)
        FROM previsoes WHERE usuario_id=$1 GROUP BY metodo_previsto
  -> fetch /api/arena/analytics/ranking (API NOVA)
     -> SELECT username, pontos_totais, taxa_acerto FROM usuarios_arena
        ORDER BY pontos_totais DESC LIMIT 50
```

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/app/arena/analytics/page.tsx` | CRIAR |
| `src/app/api/arena/analytics/historico/route.ts` | CRIAR |
| `src/app/api/arena/analytics/metodos/route.ts` | CRIAR |
| `src/app/api/arena/analytics/ranking/route.ts` | CRIAR |
| `src/components/arena/AccuracyLineChart.tsx` | CRIAR |
| `src/components/arena/MethodDonut.tsx` | CRIAR |
| `src/components/arena/GlobalRanking.tsx` | CRIAR |

### Confianca: 82%

---

## M8: Auth Hardening

Ja detalhado no v2-roadmap existente. Resumo:

### Mudancas

| De (v1) | Para (v2) |
|---------|-----------|
| SHA-256 com salt fixo | bcrypt com salt unico (10 rounds) |
| Base64 token sem assinatura | JWT com HMAC-SHA256 (jose) |
| Zero rate limiting | 5 tentativas/email + 20/IP por 15min |
| Cookie sem Secure | Cookie Secure + SameSite=Strict |

### Migracao Gradual de Hashes
No login, detectar formato do hash (64 chars hex = SHA-256 legacy). Se legacy, verificar com SHA-256, re-hash com bcrypt, e salvar novo hash. Usuarios migram automaticamente ao logar.

### Arquivos

| Arquivo | Acao |
|---------|------|
| `src/lib/arena/auth.ts` | REESCREVER |
| `src/lib/arena/rate-limiter.ts` | CRIAR |
| `src/app/api/arena/auth/login/route.ts` | MODIFICAR |
| `src/app/api/arena/auth/registro/route.ts` | MODIFICAR |
| `src/app/arena/login/page.tsx` | MODIFICAR (validacao, toggle senha) |
| `src/hooks/useArenaAuth.ts` | MODIFICAR (SWR, rate limit state) |

### Dependencias novas
```
npm install bcrypt @types/bcrypt jose
```

### Confianca: 92%

---

## Resumo de APIs

### APIs Existentes (reutilizadas)
- `/api/eventos/proximo` — proximo evento
- `/api/arena/auth/*` — login, registro, me, logout, google
- `/api/arena/previsoes` — CRUD de previsoes
- `/api/arena/ligas` — CRUD de ligas
- `/api/arena/ligas/[id]` — detalhes da liga
- `/api/arena/ligas/entrar` — entrar em liga
- `/api/arena/perfil` — perfil do usuario
- `/api/arena/perfil/[username]` — perfil publico
- `/api/arena/amigos` — lista de amigos
- `/api/sync-eventos` — scraper de eventos UFC.com

### APIs Novas (a criar)
| API | Macro | Descricao |
|-----|-------|-----------|
| `/api/arena/cron/scoring` | Z2 | Processar pontuacao de eventos finalizados |
| `/api/arena/atividades` | M2 | Feed de atividades recentes |
| `/api/arena/perfil/[username]/historico` | M4 | Historico de eventos do usuario |
| `/api/arena/ligas/[id]/chat` | M5 | Chat da liga (GET + POST) |
| `/api/arena/live` | M6 | Dados live do evento em andamento |
| `/api/arena/live/leaderboard` | M6 | Ranking parcial ao vivo |
| `/api/arena/analytics/historico` | M7 | Accuracy por evento |
| `/api/arena/analytics/metodos` | M7 | Distribuicao de metodos acertados |
| `/api/arena/analytics/ranking` | M7 | Ranking global |

### APIs Modificadas
| API | Macro | Mudanca |
|-----|-------|---------|
| `/api/arena/previsoes` | M3 | Adicionar `?comunidade=true` para revelacao pos-deadline |
| `/api/arena/auth/login` | M8 | bcrypt + rate limiting |
| `/api/arena/auth/registro` | M8 | bcrypt + validacao |

---

## Resumo de Arquivos por Macro

### Total estimado
- Arquivos NOVOS: ~20
- Arquivos MODIFICADOS: ~12
- Arquivos MANTIDOS sem mudanca: ~15

### Tabelas DB
- **Mantidas**: usuarios_arena, previsoes, evento_pontuacao, ligas, liga_membros, conquistas, notificacoes, liga_chat, amizades, atividades
- **Removidas**: duelos (fora do escopo)
- **Novas**: nenhuma necessaria (todas as tabelas ja existem no schema)

---

## Niveis de Confianca (Verdade Nua e Crua)

| Macro | Confianca | Justificativa |
|-------|-----------|---------------|
| Z2: Scoring Cron | 95% | Logica existe, so falta wiring + query discovery |
| M1: Layout/Nav | 90% | Bottom nav simples + hook proximo evento |
| M2: Dashboard Swipe | 85% | CSS snap straightforward. Lazy loading precisa cuidado |
| M3: Previsoes Polish | 90% | Mudancas frontend, componentes existem. Revelacao e nova |
| M4: Perfil | 88% | 1 API nova simples. Chart lib TBD |
| M5: Ligas & Social | 80% | Chat polling funciona. APIs de amigos precisam verificacao |
| M6: Live | 88% | Scraper ja existe. Scraping agressivo e scoring parcial sao riscos |
| M7: Analytics | 82% | Queries de agregacao podem ser lentas sem indices |
| M8: Auth | 92% | Ja planejado no roadmap. Migracao gradual e elegante |

**Confianca geral: ~89%**

### Para chegar a 97% (spikes necessarios antes de implementar)
1. **Spike: scraping frequency** — testar se UFC.com bloqueia requests a cada 1-2min
2. **Spike: Cheerio vs Playwright** — verificar se resultados live sao server-rendered
3. **Spike: indices DB** — rodar EXPLAIN em queries de agregacao de analytics
4. **Spike: scoring parcial** — prototipar refactor de `processarEventoFinalizado()` para processar por luta
