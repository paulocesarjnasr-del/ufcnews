# Full i18n: UFC News Hub (PT/EN/FR/ES)

**Data:** 2026-03-24
**Status:** Aprovado
**Escopo:** Todo o site publico em 4 idiomas. Admin fica em PT.

---

## 1. Decisoes

| Decisao | Escolha | Motivo |
|---------|---------|--------|
| Biblioteca | `next-intl` | Nativo App Router, TS, middleware built-in |
| Estrutura de URL | Subpath (`/pt/`, `/en/`, `/fr/`, `/es/`) | SEO, padrao da industria |
| Idioma padrao | PT, redirect `/` -> `/pt/` | Publico principal brasileiro |
| Conteudo de analise | Gerado em 4 idiomas na criacao | Sem latencia, sem custo runtime |
| Seletor de idioma | Header global (expandir LangToggle existente) | Ja existe pattern PT/EN |
| Admin | Sem i18n (PT fixo) | Interno, sem beneficio |
| API routes | Sem i18n | Dados, nao UI |
| Analises existentes | Traduzir em batch (esta semana) | Cobertura completa desde o dia 1 |

---

## 2. Arquitetura

### Estrutura de arquivos

```
ufc-news-hub/
  messages/
    pt.json              # ~800-1000 keys, UI labels
    en.json              # traducao completa
    fr.json              # traducao completa
    es.json              # traducao completa
  src/
    i18n/
      routing.ts         # locales: ['pt','en','fr','es'], defaultLocale: 'pt'
      request.ts         # getRequestConfig() para next-intl
    middleware.ts         # locale detection + redirect
    app/
      [locale]/           # NOVO: wrapper para todas as paginas publicas
        layout.tsx        # NextIntlClientProvider + html lang dinamico
        page.tsx          # home
        noticias/page.tsx
        lutadores/page.tsx
        lutas/page.tsx
        backstage/page.tsx
        analises/page.tsx
        arena/             # todas as sub-rotas arena
        calendario/page.tsx
        analise/
          [slug]/page.tsx  # analises individuais (4 idiomas inline)
          evento/
            [slug]/page.tsx
        error.tsx
        global-error.tsx
      admin/              # FORA do [locale], PT fixo
        ...
      api/                # FORA do [locale]
        ...
```

### Middleware

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except api, admin, _next, static files
    '/((?!api|admin|_next|.*\\..*).*)'
  ]
};
```

Comportamento:
- `GET /` -> redirect 302 `/pt/`
- `GET /analise/foo` -> redirect 302 `/pt/analise/foo`
- `GET /pt/analise/foo` -> serve normalmente
- `GET /en/analise/foo` -> serve normalmente
- `GET /admin` -> pass through (sem locale)
- `GET /api/*` -> pass through

### Routing config

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en', 'fr', 'es'],
  defaultLocale: 'pt',
});
```

### Request config

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

---

## 3. Traducoes JSON

### Organizacao por namespace

```json
// messages/pt.json
{
  "nav": {
    "home": "Home",
    "noticias": "Noticias",
    "lutadores": "Lutadores",
    "analises": "Analises",
    "arena": "Arena",
    "calendario": "Calendario"
  },
  "home": {
    "hero_title": "UFC News Hub",
    "cta_noticias": "NOTICIAS",
    "cta_noticias_sub": "reels esta semana",
    "cta_arena": "ARENA",
    "cta_arena_sub": "Faca suas previsoes",
    "cta_analises": "ANALISES",
    "cta_analises_sub": "Analises semanais",
    "cta_lutadores": "LUTADORES",
    "cta_lutadores_sub": "Rankings e perfis",
    "cta_calendario": "CALENDARIO",
    "cta_calendario_sub": "Proximos eventos"
  },
  "analise": {
    "section_narrativa": "O Contexto Que Ninguem",
    "section_narrativa_accent": "Te Conta",
    "section_momento": "Momento",
    "section_momento_accent": "Atual",
    ...
  },
  "arena": { ... },
  "calendario": { ... },
  "errors": {
    "something_wrong": "Algo deu errado",
    "unexpected_error": "Ocorreu um erro inesperado",
    "try_again": "Tentar Novamente",
    "home_page": "Pagina Inicial",
    "critical_error": "Erro Critico"
  },
  "common": {
    "loading": "Carregando...",
    "no_results": "Nenhum resultado encontrado",
    "see_more": "Ver mais",
    "back": "Voltar"
  }
}
```

Cada idioma tem o mesmo JSON com valores traduzidos.

### Migracao do i18n-labels.ts

O arquivo `i18n-labels.ts` atual (~155 keys) sera migrado para os JSONs:
- Labels de analise -> namespace `analise`
- Labels de stats -> namespace `stats`
- Labels de qualidade -> namespace `quality`
- Helper `getQualityLabel()` -> manter como utility que le do JSON

---

## 4. Componentes

### Layout com Provider

```typescript
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Header com LangSwitcher

```typescript
// Expandir LangToggle existente
// Mostra: PT | EN | FR | ES
// Ao clicar, navega: /pt/current-path -> /en/current-path
// Usa usePathname() + useRouter() de next-intl
```

### Uso em componentes

```typescript
// Server Component
import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('home');
  return <h1>{t('hero_title')}</h1>;
}

// Client Component
'use client';
import { useTranslations } from 'next-intl';

export function CTAExplorar() {
  const t = useTranslations('home');
  return <span>{t('cta_noticias')}</span>;
}
```

---

## 5. Analises de Luta (Conteudo Longo)

### Analises desta semana (batch translation)

As 13 analises do UFC Fight Night: Adesanya vs Pyfer ja geradas em PT precisam de EN/FR/ES. Um agente de traducao vai:
1. Ler cada `page.tsx`
2. Extrair o objeto `analisePT`
3. Traduzir todo o conteudo textual para EN, FR, ES
4. Adicionar `analiseEN`, `analiseFR`, `analiseES` ao arquivo
5. Atualizar o seletor de idioma para usar o locale da rota

### Pattern da pagina com 4 idiomas

```typescript
// src/app/[locale]/analise/adesanya-vs-pyfer/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';

const analisePT: FullSingleAnalise = { /* ... */ };
const analiseEN: FullSingleAnalise = { /* ... */ };
const analiseFR: FullSingleAnalise = { /* ... */ };
const analiseES: FullSingleAnalise = { /* ... */ };

const analises = { pt: analisePT, en: analiseEN, fr: analiseFR, es: analiseES };

export default function Page() {
  const { locale } = useParams();
  const analise = analises[locale as keyof typeof analises] || analisePT;
  return <FullAnalysisView analise={analise} />;
}
```

### Analises futuras (agentes geram 4 idiomas)

A partir da proxima semana, os agentes Fight Analyst Main Card e Prelims geram as 4 versoes nativamente. Atualizar os agent protocols em:
- `.claude/agents/fight-analyst-maincard.md`
- `.claude/agents/fight-analyst-prelims.md`

---

## 6. Seletor de Idioma

### Componente: `LocaleSwitcher`

Posicao: Header, lado direito, antes do menu mobile.

Visual: Botoes inline com siglas, estilo do LangToggle existente.
```
[PT] [EN] [FR] [ES]
```

O idioma ativo fica highlighted (bg ufc-red). Ao clicar, usa `useRouter()` de `next-intl` para trocar o locale prefix mantendo o path atual.

---

## 7. SEO

### hreflang tags

next-intl gera automaticamente no `<head>`:
```html
<link rel="alternate" hreflang="pt" href="https://ufc-news.vercel.app/pt/analise/adesanya-vs-pyfer" />
<link rel="alternate" hreflang="en" href="https://ufc-news.vercel.app/en/analise/adesanya-vs-pyfer" />
<link rel="alternate" hreflang="fr" href="https://ufc-news.vercel.app/fr/analise/adesanya-vs-pyfer" />
<link rel="alternate" hreflang="es" href="https://ufc-news.vercel.app/es/analise/adesanya-vs-pyfer" />
```

### Metadata por idioma

Cada pagina usa `generateMetadata` com `getTranslations` para title/description dinamicos.

---

## 8. O que NAO muda

- `/admin` e sub-rotas (PT fixo, fora do `[locale]`)
- `/api/*` routes (dados, sem UI)
- `/houston`, `/scraper-live` (interno)
- Prisma schema e DB (dados em PT)
- Service worker
- next.config.js (apenas adicionar next-intl plugin)

---

## 9. Escopo de traducao

### Componentes a traduzir (publicos)

| Grupo | Arquivos | Keys estimadas |
|-------|----------|----------------|
| Header + Nav | 1 | ~10 |
| Home (Hero, CTA, Enquete) | 5 | ~30 |
| Noticias/Reels | 3 | ~15 |
| Lutadores/Lutas/Backstage | 3 | ~15 |
| Analises hub page | 1 | ~45 (ja tem PT/EN) |
| Analise components (39) | 39 | ~200 (migrar i18n-labels) |
| Arena components (35) | 35 | ~150 |
| Calendario components (11) | 11 | ~60 |
| Comments (5) | 5 | ~20 |
| Error pages | 2 | ~10 |
| Common/shared | - | ~50 |
| Metadata | 13 pages | ~30 |
| **Total** | **~120 componentes** | **~635 keys** |

### Conteudo de analise (batch)

| Tipo | Arquivos | Palavras estimadas por arquivo |
|------|----------|-------------------------------|
| Main Card (15 secoes) | 6 | ~3000-4000 palavras |
| Prelims (6 secoes) | 7 | ~800-1200 palavras |
| Event page | 1 | ~200 palavras |
| **Total para traduzir** | **14 arquivos x 3 idiomas** | **~80.000 palavras** |

---

## 10. Riscos e mitigacoes

| Risco | Mitigacao |
|-------|----------|
| URLs existentes quebram | Middleware redireciona `/analise/foo` -> `/pt/analise/foo` |
| Vercel build time aumenta | Paginas de analise sao estaticas, build e paralelo |
| Traducoes FR/ES de baixa qualidade | Usar Claude para traduzir, revisar termos de MMA |
| Tamanho dos arquivos de analise (4x) | Cada idioma e ~15-25KB, total ~60-100KB por luta. Aceitavel. |
| next-intl + 'use client' nos analise pages | Provider no layout resolve, components filhos acessam via hook |
