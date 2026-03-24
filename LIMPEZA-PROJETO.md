# Limpeza do Projeto UFC News Hub

> Auditoria completa de arquivos nao utilizados - 23 de Marco, 2026

---

## PRIORIDADE ALTA (afeta producao/seguranca)

| # | Arquivo/Diretorio | Motivo |
|---|---|---|
| 1 | `ufc-news-hub/public/schema.sql` | Schema do banco **acessivel publicamente** no site. Qualquer um pode ver a estrutura do BD |
| 2 | `ufc-news-hub/public/manifest.json` | PWA quebrado: referencia `/icons/` e `/screenshots/` que **nao existem** |
| 3 | Dependencia `node-pty` | Zero imports no projeto. Peso morto com compilacao nativa |
| 4 | Dependencia `ws` | Zero imports no projeto |
| 5 | Dependencia `date-fns-tz` | Zero imports (so `date-fns` eh usado) |
| 6 | Dependencia `xlsx` (devDep) | Zero imports |

---

## PRIORIDADE MEDIA - Codigo Morto

### Componentes sem nenhum import

| # | Arquivo | Evidencia |
|---|---|---|
| 7 | `src/components/analise/LatestAnalysisBanner.tsx` | 0 imports em todo o projeto |
| 8 | `src/components/analise/SkillBar.tsx` | 0 imports (o tipo `SkillBarData` eh usado, mas o componente nao) |
| 9 | `src/components/arena/EventoRankingLiga.tsx` | 0 imports |

### Lib sem nenhum import

| # | Arquivo | Evidencia |
|---|---|---|
| 10 | `src/lib/arena/previsoes-horario.ts` | 0 imports em todo o projeto |

### Paginas orfas (nenhum Link aponta pra elas)

| # | Pagina | Evidencia |
|---|---|---|
| 11 | `src/app/scraper-live/page.tsx` | 0 referencias. Pagina fantasma |
| 12 | `src/app/arena/v2-roadmap/page.tsx` | 0 referencias. Rascunho abandonado |

### Rota analise-completa inteira (potencialmente removivel)

| # | Diretorio | Evidencia |
|---|---|---|
| 13 | `src/app/analise-completa/` (16 arquivos) | Nenhuma pagina linka pra essa rota |
| 14 | `src/components/analise/full/` (16 arquivos) | So usado pelo `analise-completa` acima |

---

## PRIORIDADE MEDIA - Raiz do Repo e Config

| # | Arquivo/Diretorio | Motivo |
|---|---|---|
| 15 | `Gemini_Generated_Image_da6w0gda6w0gda6w.png` (1.8MB) | Imagem solta na raiz. Nao referenciada |
| 16 | `ufc-video-test/` | Diretorio vazio (so tem node_modules) |
| 17 | `DASHBOARD-UPGRADE-V2.md` | Doc de planejamento antigo |
| 18 | `infografico-agentes.html` | HTML avulso, nao referenciado |
| 19 | `.next/` (raiz externa) | Build artifact stale fora do projeto |
| 20 | `package.json` + `node_modules/` (raiz externa) | So tem bcrypt e jose, que ja estao no package.json interno. Duplicado |
| 21 | `ufc-news-hub/vercel.json` | Contem `{}` - arquivo vazio, nao faz nada |
| 22 | `ufc-news-hub/docs/plans 2/` | Diretorio vazio (duplicata acidental) |
| 23 | `ufc-news-hub/docs/superpowers 2/` | Diretorio vazio (duplicata acidental) |
| 24 | `ufc-news-hub/logs/` | Logs de dev. Deveria estar no .gitignore |

---

## PRECISA CONFIRMAR ANTES DE REMOVER

| # | Item | Pergunta |
|---|---|---|
| A | `src/app/houston/page.tsx` + `src/components/houston/` | Voce ainda usa o Houston? Nenhuma pagina linka pra la |
| B | `src/app/enterprise/page.tsx` | Commit recente restaurou como rota publica. Voce acessa direto pela URL? |
| C | `src/app/recap/emmett-vs-vallejos/page.tsx` + `src/components/recap/` | O sistema de recap ainda ta ativo ou foi abandonado? |
| D | `/api/fighter-stats/route.ts` | Nenhum fetch no frontend. Ainda usa? |
| E | `/api/previsoes/route.ts` | Nenhum fetch (a arena tem o proprio `/api/arena/previsoes/`) |
| F | `ufc-news-hub/migrations/` (4 SQLs) | Migracoes pre-Prisma. Ainda precisa manter? |
| G | `ufc-news-hub/scripts/` (49 arquivos) | Muitos parecem one-off (debug-*, fix-*, test-*). Quer auditoria individual? |

---

## DEPENDENCIAS - Mover para devDependencies

Esses pacotes so sao usados em `scripts/`, nao em `src/`:

| Pacote | Onde eh usado |
|---|---|
| `playwright` | 10 arquivos em `scripts/` |
| `node-cron` | 1 arquivo em `scripts/` |
| `dotenv` | 5 arquivos em `scripts/` |
| `@types/bcrypt` | Duplicado em dependencies E devDependencies. Remover de dependencies |
