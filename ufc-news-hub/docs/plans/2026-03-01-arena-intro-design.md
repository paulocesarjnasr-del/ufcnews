# Arena Intro Cinematica - Design

## Objetivo

Adicionar uma intro cinematica profissional na pagina `/arena` que toca na primeira visita da sessao. Um video de 5-8 segundos gerado por IA com os lutadores do main event, estilo broadcast UFC. Apos o video, revela a pagina arena exatamente como esta hoje — zero mudancas no conteudo existente.

## Arquitetura

### Overlay Model

A intro eh um componente `ArenaIntro` renderizado como overlay fullscreen (`fixed inset-0 z-50`) por cima da pagina arena. A pagina carrega normalmente por baixo. Quando o video termina ou o usuario clica "Pular", o overlay faz fade-out e eh removido do DOM.

```
┌──────────────────────────────┐
│  ArenaIntro (z-50, fixed)    │  ← Video fullscreen
│  ┌────────────────────────┐  │
│  │  <video autoPlay>      │  │
│  │  lutadores em acao     │  │
│  │                        │  │
│  │          [Pular ▸]     │  │  ← Skip button (canto inferior direito)
│  └────────────────────────┘  │
├──────────────────────────────┤
│  Arena Page (z-10, normal)   │  ← Pagina existente carrega por baixo
│  - Background poster         │
│  - Countdown                 │
│  - Main event preview        │
│  - CTAs                      │
└──────────────────────────────┘
```

### Controle de Exibicao

- `sessionStorage.getItem('arena-intro-seen')` — se existir, nao mostra a intro
- Ao terminar o video (evento `onEnded`) ou clicar "Pular", seta `sessionStorage.setItem('arena-intro-seen', 'true')`
- Overlay faz fade-out de 500ms antes de ser removido
- Se nao houver `intro_video_url` no evento, nao mostra intro (fallback silencioso)

### Transicao

1. Video toca em fullscreen (object-fit: cover, fundo preto)
2. Video termina → overlay faz opacity 1→0 em 500ms
3. Overlay removido do DOM → usuario ve a arena normalmente

## Geracao do Video (API de IA)

### Fluxo

```
Admin Panel → "Gerar Intro Video"
    │
    ├─ Pega imagens dos lutadores do main event (imagem_url)
    │
    ├─ Chama API de video generativo (image-to-video)
    │   - Input: foto do lutador 1 + foto do lutador 2
    │   - Prompt: "Cinematic UFC fighter entrance, dramatic lighting,
    │     slow motion, dark background, red and gold accents,
    │     professional broadcast quality, 5 seconds"
    │   - Duracao: 5-8 segundos
    │
    ├─ Recebe URL do video gerado
    │
    └─ Salva em eventos.intro_video_url
```

### APIs Recomendadas

1. **Runway Gen-4** — Image-to-video forte, API disponivel, $0.05-0.15/seg
2. **Kling 3.0 (via fal.ai)** — Multi-shot sequences, boa consistencia, $0.07/seg
3. **Seedance (via WaveSpeedAI)** — Melhor image-to-video, preserva qualidade, $0.04-0.08/seg

Custo estimado por video: ~$0.25-0.80 (5-8 segundos)

### Endpoint Admin

`POST /api/admin/gerar-intro` — Endpoint que:
1. Recebe `evento_id`
2. Busca main event e imagens dos lutadores
3. Chama API de video generativa
4. Salva URL do video gerado no campo `intro_video_url`
5. Retorna URL do video

Inicialmente, o admin pode tambem fazer upload manual de um video via campo de URL no painel.

## Banco de Dados

Nova coluna na tabela `eventos`:

```sql
ALTER TABLE eventos ADD COLUMN intro_video_url VARCHAR(500);
```

## Componentes

### `ArenaIntro` (novo)

```
src/components/arena/ArenaIntro.tsx
```

Props:
- `videoUrl: string` — URL do video
- `onComplete: () => void` — Callback quando terminar/pular

Comportamento:
- Renderiza `<video>` fullscreen com `autoPlay`, `muted`, `playsInline`
- Botao "Pular" no canto inferior direito (aparece apos 1.5s)
- `onEnded` → chama `onComplete`
- Click em "Pular" → chama `onComplete`

### Mudanca em `arena/page.tsx`

Minima — apenas:
1. Checar `sessionStorage` e `proximoEvento.intro_video_url`
2. Se deve mostrar intro: renderizar `<ArenaIntro>` overlay
3. Callback `onComplete`: setar sessionStorage + remover overlay

## O que NAO muda

- Nenhum elemento visual da pagina arena atual
- Nenhuma mudanca no layout, countdown, main event preview, CTAs
- Nenhuma mudanca nas APIs existentes
- Nenhuma mudanca no fluxo de autenticacao

## Restricoes

- Video precisa ser `muted` para autoplay funcionar no mobile (politica dos browsers)
- Se o video nao carregar em 3 segundos, pular a intro automaticamente (timeout)
- Mobile: video deve ser `playsInline` para evitar fullscreen nativo do iOS
