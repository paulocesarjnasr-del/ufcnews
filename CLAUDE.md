# Project: UFC News Hub / Combat Sports Intelligence Engine

## Agents

### Fight Analyst Main Card
- **Protocol**: `.claude/agents/fight-analyst-main-card.md`
- **Invoke**: "fight analyst: [Fighter A] vs [Fighter B]" or "analise main card [event]"
- **What it does**: Generates comprehensive 15-section pre-fight analysis for main card fights
- **Output**: Static Next.js page at `src/app/analise/[slug]/page.tsx` using `FullAnalysisView`

### Fight Analyst Prelims
- **Protocol**: `.claude/agents/fight-analyst-prelims.md`
- **Invoke**: "fight analyst prelims: [event]" or "analise prelims [event]"
- **What it does**: Generates concise 6-section pre-fight analysis for prelim and early prelim fights
- **Output**: Static Next.js page at `src/app/analise/[slug]/page.tsx` using `PrelimsAnalysisView`

### Card Scraper
- **Protocol**: `.claude/agents/card-scraper.md`
- **Invoke**: "card scraper", "scrape next event", "qual o proximo card?"
- **What it does**: WebFetches ufc.com/events, extracts full card with metadata, outputs structured data
- **Output**: Structured `scrapedCard` object + human-readable table. STOPS for user confirmation.

### Card Validator
- **Protocol**: `.claude/agents/card-validator.md`
- **Invoke**: "card validator", "valida as analises"
- **What it does**: Runs mechanical PASS/FAIL checks on generated analyses (file exists, names match, view type correct, event name consistent, no duplicates, no ghost pages)
- **Output**: Validation report with PASS/FAIL per check and re-run guidance if needed

### Event Page Generator
- **Protocol**: `.claude/agents/event-page-generator.md`
- **Invoke**: "event page generator", "gera a pagina do evento"
- **What it does**: Reads all analysis files, extracts prediction data, generates event overview page
- **Output**: Static Next.js page at `src/app/analise/evento/[slug]/page.tsx` using `EventAnalysisView`

### Weekly Analysis Pipeline
- **Trigger**: "analise do card dessa semana", "roda o pipeline semanal", "analise completa [event]"
- **Pipeline**: Card Scraper -> [HUMAN GATE] -> Fight Analyst Main Card -> Fight Analyst Prelims -> Card Validator -> Event Page Generator
- **Se validator falhar**: re-rodar o agente especifico para a luta especifica, re-validar
- **Agents**: card-scraper.md, fight-analyst-main-card.md, fight-analyst-prelims.md, card-validator.md, event-page-generator.md

## Writing Rules
- NEVER use travessoes (em dashes — or en dashes –) in written text content. Hyphens in data (records like 27-8-0) are fine.
- All content in Brazilian Portuguese
- Tone: expert/fan, never robotic

## Tech Stack
- Next.js 15, TypeScript, Tailwind CSS, PostgreSQL, Prisma
- AI: Claude API (Anthropic)
- Deploy: Vercel
- UI Theme: Dark mode, ufc-red (#D20A0A), font-display (Bebas Neue)

## Key Paths
- App source: `ufc-news-hub/ufc-news-hub/src/`
- Analysis generation: `src/lib/generate-analysis.ts`
- Analysis components: `src/components/analise/`
- Analysis pages: `src/app/analise/`
- Prisma schema: `prisma/schema.prisma`
