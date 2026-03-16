# Arena Liga Viva - Design Spec (Fase 1)

> Transformar as ligas do Arena de listas estaticas em comunidades vivas, inspirado no modelo Supercell (Clash of Clans/Royale).

## Decisoes

| Decisao | Escolha |
|---------|---------|
| Escopo | Fase 1 apenas (Liga Viva) |
| Papeis | Sem hierarquia. Criador = poder total, demais = membros iguais |
| Status picks | Respeita config `mostrar_picks_antes` da liga |
| Online status | Tempo relativo ("Ha 2h", "Online agora") |
| Banner | Customizavel via Vercel Blob (250MB free) |
| Sair da liga | Com confirmacao. Criador nao pode sair |
| Convite | Todos podem compartilhar link de convite (incluindo criador) |

## 1. Schema Changes

### 1.1 Tabela `usuarios_arena`

Adicionar campo:

```sql
ALTER TABLE usuarios_arena ADD COLUMN ultimo_acesso TIMESTAMPTZ DEFAULT NOW();
```

Atualizado a cada request autenticado (throttle: so atualiza se ultimo_acesso > 5 minutos atras).

### 1.2 Tabela `ligas`

Reutilizar o campo `imagem_url` existente para o banner (nao criar campo novo). Se `imagem_url` estiver null, renderiza gradient padrao UFC.

### 1.3 Manter `is_admin`

O campo `is_admin` no `liga_membros` continua como esta. `is_admin = true` = criador da liga com poder total.

### 1.4 Migration

```sql
-- Migration: arena_liga_viva
ALTER TABLE usuarios_arena ADD COLUMN IF NOT EXISTS ultimo_acesso TIMESTAMPTZ DEFAULT NOW();
```

Nao precisa de migration pro banner porque `imagem_url` ja existe na tabela `ligas`.

## 2. Nova Dependencia

```bash
npm install @vercel/blob
```

Necessita env var `BLOB_READ_WRITE_TOKEN` configurada na Vercel.

## 3. Tipos

### 3.1 PrevisaoResumida

```typescript
interface PrevisaoResumida {
  luta_id: string;
  vencedor_nome: string;
  metodo_previsto: string | null;
  round_previsto: number | null;
  pontos_confianca: number;
}
```

### 3.2 MembroLiga

```typescript
interface MembroLiga {
  id: string;             // UUID do usuario_arena
  username: string;
  display_name: string;
  avatar_url: string | null;
  nivel: string;
  is_admin: boolean;
  ultimo_acesso: string | null;  // ISO timestamp, null se nunca atualizou
  picks_status: 'done' | 'pending' | null;  // null = sem evento ativo
  picks_data?: PrevisaoResumida[];  // so presente se mostrar_picks_antes = true
}
```

### 3.3 EventoAtualLiga

```typescript
interface EventoAtualLiga {
  id: string;             // UUID
  nome: string;
  data: string;
  total_membros: number;
  membros_com_picks: number;
}
```

Nota: todos os IDs sao `string` (UUID), conforme o schema Prisma existente.

## 4. API Changes

### 4.1 Upload Banner

**`POST /api/arena/ligas/[ligaId]/banner`**

- Auth: usuario autenticado + `is_admin = true` na liga
- Body: `FormData` com campo `banner` (image/jpeg, image/png, image/webp)
- Max size: 2MB
- Validacao: verifica content-type, rejeita com 400 se formato invalido
- Processo: upload via `@vercel/blob` com `put()`, salva URL no campo `imagem_url`
- Response sucesso: `{ success: true, banner_url: string }`
- Response erro formato: `{ error: 'Formato invalido. Use JPEG, PNG ou WebP' }` (400)
- Response erro tamanho: `{ error: 'Imagem muito grande. Maximo 2MB' }` (400)
- Response erro upload: `{ error: 'Erro ao fazer upload' }` (500)

**`DELETE /api/arena/ligas/[ligaId]/banner`**

- Auth: usuario autenticado + `is_admin = true` na liga
- Acao: deleta blob via `del()`, seta `imagem_url = NULL`
- Response: `{ success: true }`

### 4.2 Atualizar ultimo_acesso

**Dentro de `getUsuarioAtual()`** em `src/lib/arena/auth.ts`:

1. Adicionar `ultimo_acesso` ao SELECT da query existente
2. Apos retornar o usuario, fazer update throttled:

```typescript
// Throttle: so atualiza se ultimo registro > 5min
const cincoMin = 5 * 60 * 1000;
if (!user.ultimo_acesso || Date.now() - new Date(user.ultimo_acesso).getTime() > cincoMin) {
  // Fire-and-forget, nao bloqueia o response
  query('UPDATE usuarios_arena SET ultimo_acesso = NOW() WHERE id = $1', [user.id])
    .catch(() => {}); // silencia erros
}
```

### 4.3 GET Liga com membros expandidos

**`GET /api/arena/ligas/[ligaId]`** (modificar existente)

Manter a estrutura de response existente (`{ liga, membros, is_membro, minha_posicao, pode_entrar }`), expandindo o shape dos `membros` e adicionando `evento_atual`:

```typescript
{
  liga: { /* campos existentes */ },
  membros: MembroLiga[],           // expandido com ultimo_acesso, picks_status
  is_membro: boolean,
  minha_posicao: number | null,
  pode_entrar: boolean,
  evento_atual: EventoAtualLiga | null,  // NOVO
}
```

**Query para evento_atual:**

```sql
SELECT id, nome, data FROM eventos
WHERE status = 'agendado' AND data > NOW()
ORDER BY data ASC LIMIT 1
```

**Query para picks_status de cada membro:**

```sql
SELECT usuario_id FROM previsoes
WHERE evento_id = $1 AND usuario_id = ANY($2::uuid[])
GROUP BY usuario_id
```

Se o usuario_id aparece no resultado = 'done', senao = 'pending'. Se nao tem evento ativo, todos = null.

**picks_data** (so se `liga.mostrar_picks_antes = true` E picks_status = 'done'):

```sql
SELECT p.luta_id, l.nome as vencedor_nome, p.metodo_previsto, p.round_previsto, p.pontos_confianca
FROM previsoes p
JOIN lutadores l ON l.id = p.vencedor_previsto_id
WHERE p.evento_id = $1 AND p.usuario_id = $2
```

### 4.4 Sair da Liga

**Modificar o DELETE existente em `/api/arena/ligas/[ligaId]/route.ts`** (nao criar rota nova).

O handler DELETE ja existe e implementa "sair da liga". Ajustar para:

- Se `is_admin = true`: retorna 400 `{ error: 'Criador nao pode sair da liga' }`
- Se membro comum: DELETE do `liga_membros` + `UPDATE ligas SET total_membros = total_membros - 1 WHERE id = $1` (em transaction)
- Response: `{ success: true }` (manter shape existente)

## 5. Componentes (Frontend)

### 5.1 `LigaHeader` (novo)

Substitui o header atual da pagina `/arena/ligas/[id]`.

```
+--------------------------------------------------+
|  [BANNER IMAGE ou GRADIENT UFC]                   |
|                                                    |
|  NOME DA LIGA                          [Editar]   |
|  12 membros | Privada | Criada em Jan 2026        |
|                                                    |
|  [Copiar Link de Convite]    [Sair da Liga]       |
+--------------------------------------------------+
```

- Banner: `imagem_url` ou gradient `bg-gradient-to-r from-ufc-red to-red-900`
- Botao "Editar": so visivel pro criador (is_admin), abre modal com BannerUpload
- Botao "Sair": escondido pro criador
- "Copiar Link de Convite": copia URL completa `https://ufc-news.vercel.app/arena/ligas/join/{codigo_convite}`
- Estilo: neumorphism (`neu-card`)
- Loading state: skeleton com shimmer animation
- Erro: mensagem inline com retry

### 5.2 `PicksPressure` (novo)

Barra de pressao social acima da lista de membros.

```
+--------------------------------------------------+
|  UFC 326 - 3/5 fizeram picks                      |
|  [========60%==========                ]          |
|  Faltam: Maria, Pedro                             |
+--------------------------------------------------+
```

- Se todos fizeram: fundo verde, "Todos prontos!"
- Se nenhum evento ativo (`evento_atual = null`): nao renderiza
- Nomes dos pendentes: SEMPRE mostra quem falta (isso nao revela picks, so status)
- Barra de progresso: `membros_com_picks / total_membros * 100`

### 5.3 `MembroCard` (novo)

Card de cada membro na lista.

```
+--------------------------------------------------+
|  [Avatar]  Joao Silva            ● Online         |
|            Contender   [Criador]       Fez picks  |
+--------------------------------------------------+
```

- Avatar: reutiliza `UserAvatar` existente
- Badge "Criador" se `is_admin = true` (chip pequeno vermelho)
- Ultimo acesso: ponto verde + "Online" (<5min), texto cinza "Ha Xh" (>5min)
- Ultimo acesso null: mostra "Nunca acessou"
- Status picks: chip verde "Fez picks" ou chip amarelo "Pendente", nao renderiza se `picks_status = null`
- Se `mostrar_picks_antes = true` E `picks_status = 'done'`: expandir ao clicar mostrando picks
- Click no nome/avatar: navega pra `/arena/perfil/[username]`
- Loading: skeleton card com shimmer

### 5.4 `SairLigaModal` (novo)

Modal de confirmacao. `'use client'`

```
+--------------------------------------------------+
|  Sair da liga?                                    |
|                                                    |
|  Tem certeza que quer sair de "Liga dos Braba"?   |
|  Seus picks serao mantidos mas voce nao podera    |
|  ver o ranking da liga.                            |
|                                                    |
|  [Cancelar]              [Sair]                   |
+--------------------------------------------------+
```

- Botao "Sair": vermelho, loading state durante request
- Apos sucesso: redirect pra `/arena/ligas`

### 5.5 `BannerUpload` (novo)

Componente de upload dentro do modal de edicao. `'use client'`

- Drag & drop ou click pra selecionar
- Preview antes de confirmar
- Compressao client-side via Canvas API nativo (sem lib extra): redimensiona pra max 1200x400, qualidade 0.8
- Feedback visual: progress, sucesso, erro
- Botao remover banner (chama DELETE)

## 6. Formato "Ultimo Acesso"

```typescript
function formatUltimoAcesso(timestamp: string | null): string {
  if (!timestamp) return 'Nunca acessou';
  const diff = Date.now() - new Date(timestamp).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 5) return 'Online';
  if (min < 60) return `Ha ${min}min`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return `Ha ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `Ha ${days}d`;
  return `Ha ${Math.floor(days / 30)}m`;
}
```

## 7. Arquivos Impactados

### Novos
- `src/components/arena/LigaHeader.tsx`
- `src/components/arena/PicksPressure.tsx`
- `src/components/arena/MembroCard.tsx`
- `src/components/arena/SairLigaModal.tsx`
- `src/components/arena/BannerUpload.tsx`
- `src/app/api/arena/ligas/[ligaId]/banner/route.ts`

### Modificados
- `prisma/schema.prisma` (adicionar `ultimo_acesso`)
- `src/app/api/arena/ligas/[ligaId]/route.ts` (expandir GET response, ajustar DELETE)
- `src/app/arena/ligas/[id]/page.tsx` (usar novos componentes)
- `src/lib/arena/auth.ts` (adicionar `ultimo_acesso` ao SELECT + throttle update)
- `src/types/arena.ts` (adicionar `MembroLiga`, `PrevisaoResumida`, `EventoAtualLiga`)

## 8. Fora do Escopo (Fase 1)

- Papeis Lider/Co-lider/Membro
- Expulsar membros
- Evento dentro da liga (ranking por evento)
- Chat melhorado
- Retention hooks (streaks, temporadas)
- Notificacoes push
- WebSocket/SSE (manter polling)
