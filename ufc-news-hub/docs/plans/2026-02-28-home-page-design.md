# Home Page Design — UFC News Hub

> Data: 2026-02-28
> Status: Aprovado

## Objetivo

Criar uma pagina **Home** como porta de entrada do site com feed dinamico que transmite a sensacao de que o site esta sempre vivo. Foco em engajamento e interacao.

## Decisoes

| Decisao | Escolha |
|---------|---------|
| Abordagem | Tudo novo — pagina independente com componentes e APIs proprios |
| Roteamento | `/` = Home (nova), `/noticias` = Noticias (movida) |
| Hero | Cinematico full-width com face-off dos lutadores do main event |
| Enquete | Voto 1-clique + comentarios (auth hibrida: Arena ou guest) |
| Layout | Hero Evento → Enquete → CTAs de exploracao |

## Secao 1: Roteamento e Navegacao

**Mudancas:**
- `/` → Home (nova pagina)
- `/noticias` → Noticias (pagina atual movida de `/`)
- Sub-rotas `/lutadores`, `/lutas`, `/backstage` continuam vinculadas a Noticias

**Header (6 tabs):**
```
Home | Noticias | Lutadores | Analises | Arena | Calendario
```

**TabNavigation** aparece apenas em `/noticias` e sub-rotas, nao na Home.

**Impacto:** Links internos que apontam para `/` precisam ser atualizados para `/noticias`.

## Secao 2: Hero Cinematico do Proximo Evento

### Layout
```
┌────────────────────────────────────────────────────────┐
│                    FULL-WIDTH HERO                      │
│                                                        │
│   [Foto Lutador A]      VS      [Foto Lutador B]      │
│    Nome + Alias                  Nome + Alias           │
│    Record (W-L-D)                Record (W-L-D)         │
│                                                        │
│              ── UFC 312: PEREIRA vs ANKALAEV ──        │
│              Local, Pais                                │
│                                                        │
│           ┌──────────────────────────┐                 │
│           │  02d  14h  32m  18s      │                 │
│           │  countdown animado       │                 │
│           └──────────────────────────┘                 │
│                                                        │
│              [ VER CARD COMPLETO ]                      │
└────────────────────────────────────────────────────────┘
```

### Visual
- **Background:** Gradiente radial `#1a1a2e` → `#0d0d15` + SVG octogono em 5% opacidade
- **Borda inferior:** Gradiente `ufc.red` → transparente
- **Fotos:** Circulares com borda `ufc.gold` 2px, sombra `0 0 30px rgba(255,0,0,0.3)`, hover `scale(1.05)`
- **"VS":** Bebas Neue 64px, `ufc.red` com text-shadow glow, pulso a cada 3s
- **Countdown:** Blocos `neu-inset` individuais, Bebas Neue 32px, separadores `:` piscando, flip animation
- **Nomes:** Bebas Neue 28px branco, alias em `ufc.gold` italico, record em cinza
- **Titulo evento:** `ufc.gold` Bebas Neue, subtitulo cinza Inter
- **CTA:** `neu-button` borda `ufc.red`, hover glow + texto `ufc.gold`

### Animacoes de entrada
1. Foto esquerda: slide-in left (300ms)
2. Foto direita: slide-in right (300ms)
3. "VS": scale-in bounce (400ms, delay 200ms)
4. Countdown: fade-in (500ms, delay 400ms)
5. CTA: fade-in (500ms, delay 600ms)

### Mobile (< 768px)
- Layout vertical: Lutador A → VS → Lutador B
- Fotos menores mantendo glow
- Countdown em grid 2x2
- Compacto mas impactante

### Dados
- API existente: `GET /api/eventos/proximo`
- Componente: `HeroCinematico.tsx`
- Countdown: `useEffect` + `setInterval` client-side
- Fallback: sem evento proximo → ultimo evento com badge "Resultado"

## Secao 3: Enquete + Comentarios

### Layout
```
┌──────────────────────────────────────────────────────┐
│  QUEM VENCE O MAIN EVENT?                            │
│                                                      │
│  ┌─────────────────┐    ┌─────────────────┐          │
│  │ [Foto Lutador A]│    │ [Foto Lutador B]│          │
│  │   PEREIRA       │    │   ANKALAEV      │          │
│  │   11-2-0        │    │   18-1-1        │          │
│  │  [ VOTAR ]      │    │  [ VOTAR ]      │          │
│  └─────────────────┘    └─────────────────┘          │
│                                                      │
│  ── Apos votar: ─────────────────────────────────    │
│  ████████████████░░░░░  PEREIRA 63%                  │
│  ░░░░░░░░████████░░░░░  ANKALAEV 37%                │
│  524 votos                                           │
│                                                      │
│  ── Comentarios (12) ────────────────────────────    │
│  ┌──────────────────────────────────────────────┐    │
│  │ @MMAFan22: Pereira nocauteia no 2o round     │    │
│  │ 2min atras                                   │    │
│  ├──────────────────────────────────────────────┤    │
│  │ @Guest: Ankalaev por decisao                 │    │
│  │ 5min atras                                   │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
│  [___Escreva seu comentario...___] [ Enviar ]        │
└──────────────────────────────────────────────────────┘
```

### Banco de Dados (3 novas tabelas)

```sql
CREATE TABLE enquetes (
  id            SERIAL PRIMARY KEY,
  evento_id     INTEGER REFERENCES eventos(id),
  luta_id       INTEGER REFERENCES lutas(id),
  pergunta      TEXT NOT NULL,
  opcao_a_nome  VARCHAR(100) NOT NULL,
  opcao_b_nome  VARCHAR(100) NOT NULL,
  ativa         BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE votos_enquete (
  id          SERIAL PRIMARY KEY,
  enquete_id  INTEGER REFERENCES enquetes(id),
  opcao       CHAR(1) NOT NULL CHECK (opcao IN ('a', 'b')),
  usuario_id  INTEGER REFERENCES arena_usuarios(id),
  guest_id    VARCHAR(64),
  ip_address  INET,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enquete_id, usuario_id),
  UNIQUE(enquete_id, guest_id)
);

CREATE TABLE comentarios_enquete (
  id          SERIAL PRIMARY KEY,
  enquete_id  INTEGER REFERENCES enquetes(id),
  usuario_id  INTEGER REFERENCES arena_usuarios(id),
  guest_nome  VARCHAR(50),
  conteudo    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### API Routes

| Rota | Metodo | Descricao |
|------|--------|-----------|
| `/api/enquetes/ativa` | GET | Enquete ativa (proximo evento) |
| `/api/enquetes/[id]/votar` | POST | Registra voto `{ opcao, guestId? }` |
| `/api/enquetes/[id]/resultado` | GET | Contagem de votos |
| `/api/enquetes/[id]/comentarios` | GET | Comentarios paginados |
| `/api/enquetes/[id]/comentarios` | POST | Criar comentario `{ conteudo, guestNome? }` |

### Auth Hibrida
- Se logado na Arena: usa `usuario_id` + nome do perfil
- Se guest: usa `guest_nome` do body (obrigatorio)
- Prevencao voto duplo: cookie `enquete_voto_[id]` + constraints DB
- Rate limit comentarios: 1/min por IP

### Componentes
- `EnqueteWidget.tsx` — container
- `EnqueteVotacao.tsx` — cards pre-voto
- `EnqueteResultado.tsx` — barras pos-voto
- `EnqueteComentarios.tsx` — lista + input

### Interacao
1. Ve enquete → clica lutador → POST voto
2. Barra anima de 0% ao valor real (300ms ease-out)
3. Cookie salvo para lembrar voto
4. Comentarios via SWR, refresh 30s
5. Input: logado mostra nome auto, guest mostra campo nome

## Secao 4: CTAs de Exploracao

### Layout
Grid 3 colunas (desktop) / 2 colunas (mobile) de cards `neu-card-hover`:

| Card | Icone | Subtitulo Dinamico | Cor | Link |
|------|-------|--------------------|-----|------|
| Noticias | Newspaper | "+120 artigos" | `ufc.red` | `/noticias` |
| Arena | Target | "Preveja lutas" | `ufc.gold` | `/arena` |
| Analises | BarChart3 | "Semana atual" | teal | `/analises` |
| Lutadores | Users | "400+ perfis" | blue | `/fighters` |
| Calendario | Calendar | "Proximos eventos" | purple | `/calendario` |

### Visual
- Titulo "EXPLORE O UFC NEWS HUB" em Bebas Neue
- Cards com hover `scale(1.03)` + glow na cor da secao
- Subtitulos puxados de APIs existentes (`/api/noticias/contadores`, `/api/eventos/proximo`)
- Componente: `CTAExplorar.tsx`

## Arquivos Novos/Modificados

### Novos (~11 arquivos)
- `src/app/page.tsx` — nova Home page
- `src/app/noticias/page.tsx` — Noticias movida
- `src/components/home/HeroCinematico.tsx`
- `src/components/home/EnqueteWidget.tsx`
- `src/components/home/EnqueteVotacao.tsx`
- `src/components/home/EnqueteResultado.tsx`
- `src/components/home/EnqueteComentarios.tsx`
- `src/components/home/CTAExplorar.tsx`
- `src/app/api/enquetes/ativa/route.ts`
- `src/app/api/enquetes/[id]/votar/route.ts`
- `src/app/api/enquetes/[id]/resultado/route.ts`
- `src/app/api/enquetes/[id]/comentarios/route.ts`
- Migration Prisma (3 tabelas)

### Modificados (~4 arquivos)
- `src/components/ui/Header.tsx` — adicionar tab Home, atualizar link Noticias
- `src/components/ui/TabNavigation.tsx` — ajustar rotas base para `/noticias`
- Links internos que apontam para `/`
- `tailwind.config.js` — novas animacoes se necessario

## Validacao Final
- Usar agente **ui-reviewer** apos implementacao para validar visual neumorphism, responsividade e dark mode
