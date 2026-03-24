# Fighter Reactions Real-Time — Design Spec

## Resumo

Substituir os 4 botoes de emoji (🔥😱💀🏆) no FloatingReactions por 2 fotos dos lutadores da luta atual. Reacoes sao compartilhadas em real-time (SSE) entre todos os usuarios e persistidas no banco. Fotos trocam automaticamente conforme a luta muda.

## Decisoes

| Decisao | Escolha | Motivo |
|---------|---------|--------|
| Animacao flutuante | Foto miniatura do lutador | Visual imediato de quem esta sendo apoiado |
| Real-time | SSE (Server-Sent Events) | Quase instantaneo, sem servico externo, funciona com Next.js/Vercel |
| Persistencia | Sim (tabela `reacoes_luta`) | Permite contadores e possivel gamificacao futura |
| Pub/Sub | PG LISTEN/NOTIFY | Funciona cross-instance no Vercel serverless (EventEmitter in-memory NAO funciona) |

## Fluxo

1. Usuario ve 2 fotos circulares (lutador1 vermelho, lutador2 azul) da `currentFight`
2. Clica numa foto → POST `/api/arena/live/reactions` (insere na tabela + NOTIFY)
3. Stream SSE escuta via PG LISTEN → recebe a reacao
4. Todos os clientes conectados ao SSE recebem a reacao
5. Foto miniatura (40x40px, circular, borda vermelha/azul) sobe flutuando na tela de todos
6. Contador embaixo de cada foto atualiza em real-time
7. Quando `currentFight` muda, fotos trocam e contadores resetam

## Banco de Dados

### Nova tabela: `reacoes_luta`

```sql
CREATE TABLE reacoes_luta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  luta_id UUID NOT NULL REFERENCES lutas(id),
  lutador_id UUID NOT NULL REFERENCES lutadores(id),
  usuario_id UUID NOT NULL REFERENCES usuarios_arena(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reacoes_luta_luta_id ON reacoes_luta(luta_id);
CREATE INDEX idx_reacoes_luta_created ON reacoes_luta(created_at);
```

### PG LISTEN/NOTIFY

Canal: `reacoes_channel`

O POST faz `NOTIFY reacoes_channel, '{"luta_id":"...","lutador_id":"...","username":"..."}'` apos INSERT.
O stream SSE abre conexao PG dedicada com `LISTEN reacoes_channel` e encaminha para clientes.

Isso funciona cross-instance no Vercel porque o PostgreSQL e o broker central.

## Endpoints

### POST `/api/arena/live/reactions`

**Request:**
```json
{
  "luta_id": "uuid",
  "lutador_id": "uuid"
}
```

**Comportamento:**
1. Valida auth (usuario Arena logado). Se nao logado, retorna 401.
2. Valida que luta existe e esta `ao_vivo`, `agendada`, ou `finalizada` (janela de 5 min apos finalizacao)
3. Valida cooldown 500ms por usuario
4. INSERT na tabela `reacoes_luta`
5. `NOTIFY reacoes_channel` com payload JSON
6. Retorna 201

**Response:**
```json
{ "ok": true }
```

### GET `/api/arena/live/reactions/stream`

**Query params:** `evento_id` (obrigatorio)

**Comportamento:**
1. NAO requer auth (read-only, qualquer visitante pode ver reacoes)
2. Abre conexao SSE (`text/event-stream`)
3. Abre conexao PG dedicada com `LISTEN reacoes_channel`
4. **Evento inicial:** envia contadores acumulados da luta atual:
```
event: counts
data: {"luta_id":"uuid","fighter1_count":42,"fighter2_count":37}
```
5. Envia heartbeat a cada 15s (`:keepalive`)
6. Quando NOTIFY recebido, envia evento:
```
event: reaction
data: {"luta_id":"uuid","lutador_id":"uuid","username":"gabz"}
```
7. Cliente filtra por `luta_id` da `currentFight` localmente

**Cleanup:** Quando cliente desconecta, fecha conexao PG dedicada (`UNLISTEN`).

### GET `/api/arena/live/reactions/counts`

**Query params:** `luta_id` (obrigatorio)

**Comportamento:**
1. SELECT COUNT(*) agrupado por lutador_id para a luta
2. Retorna contadores

**Response:**
```json
{
  "fighter1_count": 42,
  "fighter2_count": 37,
  "fighter1_id": "uuid",
  "fighter2_id": "uuid"
}
```

Usado quando `currentFight` muda pra carregar contadores da nova luta.

## Modificacao no endpoint existente: `/api/arena/live`

O SQL atual NAO retorna fotos dos lutadores. Precisa adicionar JOIN:

```sql
-- Adicionar ao SELECT existente:
lut1.imagem_url AS lutador1_foto,
lut2.imagem_url AS lutador2_foto
```

E a interface `Luta` no `page.tsx` precisa dos novos campos:
```typescript
lutador1_foto: string | null;
lutador2_foto: string | null;
```

## Componente: FloatingReactions.tsx (refatorado)

### Props
```typescript
interface FloatingReactionsProps {
  currentFight: {
    luta_id: string;
    status: string;
    lutador1_id: string;
    lutador1_nome: string;
    lutador1_foto?: string | null;
    lutador2_id: string;
    lutador2_nome: string;
    lutador2_foto?: string | null;
  } | null;
  eventoId: string;
  isAuthenticated: boolean;
}
```

### Estado null (currentFight = null)
- Componente retorna `null` (nao renderiza nada)

### Estado nao autenticado
- Botoes visiveis mas ao clicar mostra tooltip "Faca login para reagir"
- SSE continua funcionando (ve reacoes de outros)
- Contadores visiveis

### Estado luta finalizada
- Se `currentFight.status === 'finalizada'` ha mais de 5 minutos: botoes desabilitados (opacity 50%)
- Se finalizada ha menos de 5 min: botoes ainda ativos (janela de celebracao)

### Comportamento normal
- Renderiza 2 botoes circulares com fotos dos lutadores (vermelho = fighter1, azul = fighter2)
- Contador abaixo de cada foto (atualizado via SSE)
- Ao clicar: POST para API + animacao local imediata (optimistic)
- Escuta SSE: reacoes de outros usuarios aparecem flutuando
- Cooldown visual de 500ms no botao (opacity reduzida)

### Animacao flutuante
- Imagem circular 40x40px com borda (2px solid, vermelho ou azul)
- Reutiliza `animate-float-up` existente (2s, fade out)
- Posicao X aleatoria (20-80% do container)
- Maximo 30 reacoes simultaneas na tela

### Fallback de imagem
- Se foto nao carregar: mostra inicial do nome com background da cor do lado
- Ex: "Z" com bg vermelho, "B" com bg azul

## Rate Limiting

- **Cliente:** 500ms cooldown entre cliques (desabilita botao visualmente)
- **Servidor:** 500ms cooldown por usuario_id (rejeita com 429 se muito rapido)

## Troca de Luta

- `currentFight` ja e computado via `useMemo` na page (`/arena/live/page.tsx`)
- Quando muda:
  - Fotos trocam para novos lutadores
  - GET `/api/arena/live/reactions/counts?luta_id=novo_id` pra carregar contadores acumulados
  - Stream SSE continua (cliente filtra por `luta_id`)
  - Reacoes flutuantes pendentes sao limpas

## Reconexao SSE

- `EventSource` nativo tem retry automatico
- Ao reconectar, servidor envia evento `counts` inicial com totais atuais
- Sem replay de historico de reacoes individuais

## Arquivos

### Novos
- `src/app/api/arena/live/reactions/route.ts` — POST inserir reacao + NOTIFY
- `src/app/api/arena/live/reactions/stream/route.ts` — GET SSE via PG LISTEN
- `src/app/api/arena/live/reactions/counts/route.ts` — GET contadores por luta

### Modificados
- `src/components/arena/FloatingReactions.tsx` — refatorar completo
- `src/app/arena/live/page.tsx` — passar `currentFight` e `eventoId` como props pro FloatingReactions, adicionar campos de foto na interface Luta
- `src/app/api/arena/live/route.ts` — adicionar JOIN pra trazer `imagem_url` dos lutadores

### Migracao
- Raw SQL migration para tabela `reacoes_luta` (seguindo padrao existente do projeto: Prisma para schema tracking, raw SQL para queries)
