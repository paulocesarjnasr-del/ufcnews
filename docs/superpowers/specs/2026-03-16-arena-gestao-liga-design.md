# Arena Gestao da Liga - Design Spec (Fase 2)

> Permitir que o criador da liga gerencie membros (expulsar) e edite todas as configs da liga num modal unificado.

## Decisoes

| Decisao | Escolha |
|---------|---------|
| Escopo | Fase 2: expulsar + editar configs |
| Hierarquia | Sem papeis. Criador (is_admin=true) = poder total |
| Expulsao | Com confirmacao. Membro pode re-entrar depois |
| Configs editaveis | Todas: nome, descricao, tipo, max_membros, mostrar_picks_antes, apenas_main_card, ranking_tipo, chat_ativo |
| UI | Modal unico com 3 abas: Banner, Configs, Membros |

## Licoes da Fase 1 aplicadas

1. **Nomes de colunas verificados no schema real** — `ligas` usa `ranking_tipo` (varchar), `tipo` (enum USER-DEFINED), `chat_ativo` (boolean). Confirmado via `information_schema.columns`.
2. **max_membros = 0 no banco** — tratar 0 como "ilimitado", nao como "zero vagas".
3. **Erros detalhados** — cada resposta de erro retorna a causa real, nunca "Erro generico".
4. **Transaction pra operacoes compostas** — expulsar = DELETE + UPDATE total_membros atomicamente.
5. **Zero migrations** — todas as colunas necessarias ja existem no banco.

## 1. Schema — Mudanca minima (tipos apenas)

Colunas existentes confirmadas no banco (incluindo `updated_at` verificado):
- `ligas`: nome (varchar), descricao (varchar nullable), tipo (enum), max_membros (int), mostrar_picks_antes (bool), apenas_main_card (bool), ranking_tipo (varchar), chat_ativo (bool), revelar_picks_ao_vivo (bool), total_membros (int), updated_at (timestamptz)
- `liga_membros`: is_admin (bool), usuario_id (uuid), liga_id (uuid)

**Adicionar ao tipo `Liga`** em `src/types/arena.ts`:
```typescript
  ranking_tipo: string;        // 'pontos' | 'percentual'
  chat_ativo: boolean;
  revelar_picks_ao_vivo: boolean;
  updated_at: string;
```

**Fix bug existente no GET**: a logica `pode_entrar` usa `total_membros < max_membros` que falha quando `max_membros = 0` (ilimitado). Corrigir para:
```typescript
pode_entrar: !isMembro && (liga.max_membros === 0 || liga.total_membros < liga.max_membros)
```

## 2. API — Expulsar Membro

**`DELETE /api/arena/ligas/[ligaId]/membros/[userId]/route.ts`** (novo arquivo)

Auth: `getUsuarioAtual()` + `is_admin = true` no `liga_membros`

Validacoes:
- 401: usuario nao autenticado
- 403: usuario nao eh admin da liga
- 403: tentou expulsar a si mesmo (`userId === usuario.id`)
- 404: usuario alvo nao eh membro da liga

Acao (transaction):
```sql
DELETE FROM liga_membros WHERE liga_id = $1 AND usuario_id = $2;
UPDATE ligas SET total_membros = GREATEST(total_membros - 1, 0) WHERE id = $1;
```

Response sucesso: `{ success: true }`

## 3. API — Editar Configs

**`PATCH /api/arena/ligas/[ligaId]/route.ts`** (adicionar handler ao arquivo existente)

Auth: `getUsuarioAtual()` + `is_admin = true` no `liga_membros`

Campos editaveis com validacao:
- `nome`: string, 1-50 chars, required se enviado
- `descricao`: string | null, max 200 chars
- `tipo`: somente 'publica' | 'privada'
- `max_membros`: number >= 0 (0 = ilimitado). Se > 0, deve ser >= total_membros atual
- `mostrar_picks_antes`: boolean
- `apenas_main_card`: boolean
- `ranking_tipo`: somente 'pontos' | 'percentual'
- `chat_ativo`: boolean

Partial update: so atualiza campos presentes no body. Constroi UPDATE dinamico:

```typescript
const updates: string[] = [];
const values: unknown[] = [];
let paramIndex = 1;

if (body.nome !== undefined) {
  if (!body.nome || body.nome.length > 50) return error 400;
  updates.push(`nome = $${paramIndex++}`);
  values.push(body.nome);
}
// ... repete pra cada campo

if (updates.length === 0) return error 400 'Nenhum campo para atualizar';

values.push(ligaId);
const sql = `UPDATE ligas SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${paramIndex} RETURNING *`;
```

Response sucesso: `{ success: true, liga: { ...dados atualizados } }`

## 4. Componente — `GerenciarLigaModal`

**Arquivo:** `src/components/arena/GerenciarLigaModal.tsx`

Props:
```typescript
interface GerenciarLigaModalProps {
  liga: Liga;
  membros: MembroLiga[];
  isOpen: boolean;
  onClose: () => void;
  onBannerUpdate: (url: string | null) => void;
  onLigaUpdate: (liga: Partial<Liga>) => void;
  onMembroExpulso: (userId: string) => void;
}
```

**3 abas:** Banner | Configs | Membros

**Aba Banner:**
- Renderiza `BannerUpload` com `embedded={true}` e `isOpen={true}`
- Em modo embedded: sem backdrop, sem padding extra, conteudo renderiza inline
- `onClose` em modo embedded eh no-op (passa `() => {}`) pois nao ha modal pra fechar

**Aba Configs:**
- Formulario com campos editaveis
- Usa componentes Toggle semelhantes aos de `ligas/criar/page.tsx`
- Input de texto pra nome e descricao
- Select pra tipo e ranking_tipo
- Number input pra max_membros
- Toggles pra booleans
- Botao "Salvar alteracoes" que faz PATCH
- Loading state + toast de sucesso

**Aba Membros:**
- Lista de membros com: avatar, username, nivel
- Admin tem badge "Criador" e sem botao de expulsar
- Demais membros tem botao "Expulsar" (icone UserMinus, vermelho)
- Click expulsar abre `ConfirmarExpulsaoModal`

## 5. Componente — `ConfirmarExpulsaoModal`

**Arquivo:** `src/components/arena/ConfirmarExpulsaoModal.tsx`

Props:
```typescript
interface ConfirmarExpulsaoModalProps {
  ligaId: string;
  userId: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
  onExpulso: () => void;
}
```

- Texto: "Tem certeza que quer expulsar **{username}**? Ele podera entrar novamente se tiver o link de convite."
- Botoes: Cancelar (cinza) | Expulsar (vermelho com loading)
- Request: `DELETE /api/arena/ligas/${ligaId}/membros/${userId}`
- Sucesso: chama `onExpulso()` + fecha modal
- Erro: mostra mensagem inline

## 6. Modificacao — `LigaHeader`

Mudancas:
- Remover estado `bannerOpen` e `BannerUpload` deste componente
- Adicionar prop `onGerenciarClick: () => void`
- Botao "Editar" agora chama `onGerenciarClick()` ao inves de abrir BannerUpload
- Remover import de `BannerUpload`

Props atualizadas:
```typescript
interface LigaHeaderProps {
  liga: Liga & { criador: { id: string; username: string; display_name: string | null; avatar_url: string | null } };
  isAdmin: boolean;
  isMembro: boolean;
  onSairClick: () => void;
  onGerenciarClick: () => void;  // NOVO (substitui onBannerUpdate)
}
```

## 7. Modificacao — `page.tsx` da liga

Mudancas:
- Adicionar estado `showGerenciarModal`
- Reutilizar `handleBannerUpdate` existente — passar como `onBannerUpdate` pro `GerenciarLigaModal`
- Adicionar handler `handleLigaUpdate(updatedFields)` — merge com state `liga` via `setLiga(prev => ({ ...prev, ...updatedFields }))`
- Adicionar handler `handleMembroExpulso(userId)` — remove do state `membros` + decrementa `liga.total_membros`
- Trocar `onBannerUpdate` no `LigaHeader` por `onGerenciarClick={() => setShowGerenciarModal(true)}`
- Renderizar `GerenciarLigaModal` com todas as props

**Nota:** `MembroLiga.id` eh o `usuario_id` (UUID do usuario), NAO o ID da row em `liga_membros`. Ao passar `userId` pro `ConfirmarExpulsaoModal`, usar `membro.id` do array `MembroLiga[]`.

## 8. Modificacao — `BannerUpload`

Adicionar prop opcional `embedded?: boolean`:
- Se `embedded={true}`: nao renderiza backdrop/overlay, renderiza conteudo direto
- Se `embedded={false}` (default): comportamento atual com modal overlay

## 9. Arquivos Impactados

### Novos
- `src/app/api/arena/ligas/[ligaId]/membros/[userId]/route.ts`
- `src/components/arena/GerenciarLigaModal.tsx`
- `src/components/arena/ConfirmarExpulsaoModal.tsx`

### Modificados
- `src/app/api/arena/ligas/[ligaId]/route.ts` (adicionar PATCH handler)
- `src/components/arena/LigaHeader.tsx` (trocar BannerUpload por onGerenciarClick)
- `src/components/arena/BannerUpload.tsx` (adicionar prop embedded)
- `src/app/arena/ligas/[id]/page.tsx` (novos handlers + GerenciarLigaModal)

## 10. Fora do Escopo (Fase 2)

- Transferir propriedade da liga
- Banir permanentemente
- Historico de expulsoes
- Notificar membro expulso
