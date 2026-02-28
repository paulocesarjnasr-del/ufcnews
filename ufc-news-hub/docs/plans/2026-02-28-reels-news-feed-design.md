# Design: Feed de Noticias Estilo Reels

**Data:** 2026-02-28
**Status:** Aprovado

---

## Objetivo

Substituir `/noticias` (grid + infinite scroll) por feed horizontal estilo Reels. Experiencia dopaminergica com captions IA, likes e comentarios sem login, limpeza automatica 24h.

## Banco de Dados

- Campo novo: `noticias.reel_caption VARCHAR(100)`
- Nova tabela: `news_likes(id, noticia_id, user_fingerprint, created_at)` com UNIQUE(noticia_id, user_fingerprint) e CASCADE delete
- Comentarios: reutiliza `comentarios` existente sem alteracoes

## API Routes

- `GET /api/news/reels` — noticias 24h com likes_count, comments_count, user_liked
- `POST /api/news/[id]/like` — like com fingerprint
- `DELETE /api/news/[id]/like` — unlike
- Comentarios via `/api/comentarios` existente

## Caption no Sync

- `src/lib/reel-caption.ts` chama Claude Haiku no pipeline de sync
- Max 80 chars, pt-BR, emojis, tom urgente
- Fallback: titulo truncado

## Componentes React

```
src/components/reels/
ReelsContainer, ReelSlide, ReelCaption, ReelActions,
ReelLikeButton, ReelComments, ReelProgress, ReelEndScreen, ReelEmptyState
```

- Desktop: setas + teclado. Mobile: swipe touch nativo
- Transicao: translateX + ease-out 0.4s
- Imagem: next/image fill + overlay gradiente
- Fallback sem imagem: gradiente ufc-red
- Altura: 70vh desktop, 60vh mobile

## Hook useReels(fingerprint)

- SWR com refreshInterval 5min
- Mutacao otimista no toggleLike

## Cron 24h

- DELETE noticias WHERE publicado_em < NOW() - 24h
- CASCADE deleta likes, comentarios, entidades

## End Screen

- Octagono SVG animado + glow pulsante
- Botao "Voltar ao inicio"
