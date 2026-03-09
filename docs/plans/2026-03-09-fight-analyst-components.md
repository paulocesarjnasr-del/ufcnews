# Fight Analyst Full Analysis Components - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build all 15 section components + types + FullAnalysisView + page route for the Fight Analyst system at `/analise-completa/[slug]`.

**Architecture:** Static inline data pages. Each analysis is a `.tsx` file with a `FullSingleAnalise` const rendered by `FullAnalysisView`, which delegates to 15 section components. No DB/API needed.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 3, Lucide React, neumorphism design system (`neu-card`, `neu-inset`, `neu-button`).

---

### Task 1: Add FullSingleAnalise types to analise.ts

**Files:**
- Modify: `ufc-news-hub/src/types/analise.ts`

**Step 1: Add all 15-section interfaces at the end of the file**

Append after the existing `isCardAnalise` function. All new interfaces for: `HeroSectionData`, `NarrativaSectionData`, `MomentoAtualSectionData`, `NivelCompeticaoSectionData`, `OponenteComumSectionData`, `ComparacaoEstatisticaSectionData`, `PerfilHabilidadesSectionData`, `DistribuicaoVitoriasSectionData`, `DangerZonesSectionData`, `IntangiveisSectionData`, `CaminhosVitoriaSectionData`, `PrevisaoFinalSectionData`, `OQueObservarSectionData`, `CreatorKitSectionData`, `RadarApostadorSectionData`, `FullAnalysisData`, `FullSingleAnalise`.

```typescript
// ==========================================
// Full Single Analysis Types (15-section system)
// ==========================================

// --- Hero Section ---
export interface HeroFighterData {
  nome_completo: string;
  apelido: string;
  sobrenome: string;
  record: string;
  ranking: string;
  info_extra: string;
  imagem_fullbody_url: string | null;
}

export interface HeroSectionData {
  evento_nome: string;
  evento_data: string;
  evento_local: string;
  categoria_peso: string;
  num_rounds: number;
  titulo_em_jogo: string | null;
  tagline: string;
  tagline_sub: string;
  fighter1: HeroFighterData;
  fighter2: HeroFighterData;
}

// --- Narrativa Section ---
export interface StakeRow {
  dimensao: string;
  fighter1: string;
  fighter2: string;
}

export interface FuturoCenarioConsequencia {
  tag: string;
  texto: string;
}

export interface FuturoCenario {
  titulo: string;
  subtitulo: string;
  consequencias: FuturoCenarioConsequencia[];
  proxima_luta: string;
}

export interface NarrativaSectionData {
  html_content: string;
  stakes: StakeRow[];
  prognostico?: {
    fighter1_vence: FuturoCenario;
    fighter2_vence: FuturoCenario;
  };
}

// --- Momento Atual Section ---
export interface RecentFight {
  date: string;
  opponent: string;
  result: 'W' | 'L' | 'D' | 'NC';
  method: string;
  opponent_rank: string;
  quality_score: number;
  quality_label?: string;
  note: string;
}

export interface MomentoAtualFighter {
  nome: string;
  color: 'red' | 'blue';
  recent_fights: RecentFight[];
  full_fight_history?: RecentFight[];
  layoff_warning?: string | null;
  momentum_score: number;
  momentum_label: string;
  momentum_trend: 'ascending' | 'descending' | 'stable' | 'resilient';
  momentum_note: string;
}

export interface MomentoAtualSectionData {
  fighter1: MomentoAtualFighter;
  fighter2: MomentoAtualFighter;
}

// --- Nivel Competicao Section ---
export interface NivelCompeticaoFighter {
  nome: string;
  media_oponentes: number;
  media_oponentes_label?: string;
  aproveitamento: string;
  contra_top5: string;
}

export interface NivelCompeticaoSectionData {
  fighter1: NivelCompeticaoFighter;
  fighter2: NivelCompeticaoFighter;
  oponentes_em_comum_count: { fighter1: number; fighter2: number };
  oponentes_em_comum_note: string;
}

// --- Oponente Comum Section ---
export interface OponenteComumResult {
  resultado: string;
  metodo: string;
  duracao: string;
  contexto: string;
  performance: string;
  evento: string;
  data: string;
}

export interface OponenteComumSectionData {
  oponente_nome: string;
  fighter1_result: OponenteComumResult;
  fighter2_result: OponenteComumResult;
  insight: string;
}

// --- Comparacao Estatistica Section ---
export interface StatBarData {
  label: string;
  valueA: number;
  valueB: number;
  maxVal: number;
  format?: 'decimal' | 'percent' | 'integer';
  note?: string;
  reverseWinner?: boolean;
}

export interface TaleOfTapeRow {
  label: string;
  fighter1: string;
  fighter2: string;
  note?: string | null;
}

export interface ComparacaoEstatisticaSectionData {
  stats: StatBarData[];
  tale_of_tape: TaleOfTapeRow[];
}

// --- Perfil Habilidades Section ---
export interface SkillBarData {
  label: string;
  valueA: number;
  valueB: number;
  labelA?: string;
  labelB?: string;
  advantage?: 'fighter1' | 'fighter2' | 'even';
  advantage_note?: string;
}

export interface PerfilHabilidadesSectionData {
  skills: SkillBarData[];
  insight?: string;
}

// --- Distribuicao Vitorias Section ---
export interface WinMethodBreakdown {
  count: number;
  percent: number;
}

export interface DistribuicaoVitoriasFighter {
  nome: string;
  ko_tko: WinMethodBreakdown;
  submission: WinMethodBreakdown;
  decision: WinMethodBreakdown;
  total_wins: number;
}

export interface DistribuicaoVitoriasSectionData {
  fighter1: DistribuicaoVitoriasFighter;
  fighter2: DistribuicaoVitoriasFighter;
  insight: string;
}

// --- Danger Zones Section ---
export interface DangerZoneCard {
  rounds: string;
  danger_level: number;
  danger_label: string;
  color: 'red' | 'gold' | 'green';
  title: string;
  description: string;
}

export interface DangerZonesSectionData {
  zones: DangerZoneCard[];
}

// --- Intangiveis Section ---
export interface IntangivelItem {
  icon: string;
  title: string;
  fighter: string;
  risk_level: string;
  risk_color: 'red' | 'yellow' | 'green' | 'neutral';
  description: string;
}

export interface IntangiveisSectionData {
  items: IntangivelItem[];
}

// --- Caminhos Vitoria Section ---
export interface CaminhoVitoria {
  name: string;
  probability: number;
  method: string;
  description: string;
}

export interface CaminhosVitoriaFighter {
  nome: string;
  total_probability: number;
  scenarios: CaminhoVitoria[];
}

export interface CaminhosVitoriaSectionData {
  fighter1: CaminhosVitoriaFighter;
  fighter2: CaminhosVitoriaFighter;
}

// --- Previsao Final Section ---
export interface PrevisaoFinalValuePicks {
  moneyline: { pick: string; reasoning: string };
  method: { pick: string; reasoning: string };
  over_under: { pick: string; rounds: number; reasoning: string };
  best_value: string;
}

export interface PrevisaoFinalSectionData {
  winner_name: string;
  winner_side: 'fighter1' | 'fighter2';
  predicted_method: string;
  confidence_score: number;
  confidence_label: string;
  explanation: string;
  x_factor: { title: string; description: string };
  upset_alert: { title: string; description: string };
  probabilities: {
    fighter1: { nome: string; percent: number };
    fighter2: { nome: string; percent: number };
    draw: number;
  };
  value_picks?: PrevisaoFinalValuePicks;
}

// --- O Que Observar Section ---
export interface TalkingPoint {
  num: number;
  title: string;
  icon: string;
  description: string;
}

export interface OQueObservarSectionData {
  points: TalkingPoint[];
}

// --- Creator Kit Section ---
export interface InstagramSlide {
  slide_number: number;
  title: string;
  content: string;
  color: 'red' | 'blue' | 'gold';
}

export interface Tweet {
  num: string;
  text: string;
}

export interface VideoScriptSection {
  time: string;
  title: string;
  text: string;
}

export interface TikTokScript {
  hook: string;
  body: string;
  cta: string;
}

export interface CreatorKitSectionData {
  instagram: InstagramSlide[];
  twitter: Tweet[];
  video: VideoScriptSection[];
  tiktok?: TikTokScript[];
  headlines?: string[];
}

// --- Radar Apostador Section ---
export interface OddsData {
  fighter1_odds: string;
  fighter2_odds: string;
  fighter1_name: string;
  fighter2_name: string;
  source: string;
}

export interface EstatisticoEdge {
  icon: string;
  titulo: string;
  stat_headline: string;
  contexto: string;
  implicacao_aposta: string;
  edge_level: 'forte' | 'moderado' | 'leve';
  fighter_side?: 'fighter1' | 'fighter2' | 'neutral';
}

export interface ValuePick {
  tipo: string;
  pick: string;
  odds: string;
  confianca: 'baixa' | 'media' | 'alta';
  edge_vs_mercado?: string;
  raciocinio: string;
}

export interface RadarApostadorSectionData {
  odds: OddsData;
  edges: EstatisticoEdge[];
  value_picks: ValuePick[];
  armadilha: { titulo: string; descricao: string };
  disclaimer: string;
}

// --- Full Analysis Data (all 15 sections) ---
export interface FullAnalysisData {
  hero: HeroSectionData;
  narrativa: NarrativaSectionData;
  momento_atual: MomentoAtualSectionData;
  nivel_competicao: NivelCompeticaoSectionData;
  oponente_comum: OponenteComumSectionData | null;
  comparacao_estatistica: ComparacaoEstatisticaSectionData;
  perfil_habilidades: PerfilHabilidadesSectionData;
  distribuicao_vitorias: DistribuicaoVitoriasSectionData;
  danger_zones: DangerZonesSectionData;
  intangiveis: IntangiveisSectionData;
  caminhos_vitoria: CaminhosVitoriaSectionData;
  previsao_final: PrevisaoFinalSectionData;
  o_que_observar: OQueObservarSectionData;
  creator_kit: CreatorKitSectionData;
  betting_value: null;
  radar_apostador: RadarApostadorSectionData;
}

// --- Full Single Analise (extends base Analise) ---
export interface FullSingleAnalise extends Analise {
  analysis_type: 'full_single';
  full_analysis: FullAnalysisData;
}

export function isFullSingleAnalise(analise: Analise): analise is FullSingleAnalise {
  return analise.analysis_type === 'full_single'
    && 'full_analysis' in analise
    && (analise as FullSingleAnalise).full_analysis != null;
}
```

**Step 2: Verify types compile**

Run: `cd ufc-news-hub && npx tsc --noEmit`
Expected: PASS (no errors)

**Step 3: Commit**

```bash
git add ufc-news-hub/src/types/analise.ts
git commit -m "feat(analise): add FullSingleAnalise types for 15-section analysis system"
```

---

### Task 2: Create shared utilities (SectionHeader + icon-resolver)

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/SectionHeader.tsx`
- Create: `ufc-news-hub/src/components/analise/full/icon-resolver.ts`

**Step 1: Create SectionHeader component**

```tsx
interface SectionHeaderProps {
  number: string;
  title: string;
  accent: string;
}

export function SectionHeader({ number, title, accent }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end gap-4">
      <span className="font-display text-5xl leading-none text-dark-border/50 md:text-7xl">
        {number}
      </span>
      <div>
        <h2 className="font-display text-2xl uppercase leading-tight text-dark-text md:text-3xl">
          {title}{' '}
          <span className="text-ufc-red">{accent}</span>
        </h2>
        <div className="mt-1 h-1 w-16 rounded-full bg-ufc-red" />
      </div>
    </div>
  );
}
```

**Step 2: Create icon-resolver utility**

```typescript
import {
  TrendingUp, Target, Shield, Swords, AlertTriangle, Eye, Zap, Clock,
  Activity, Brain, MapPin, BarChart3, MessageCircle, Video, ArrowRight,
  Flame, Crosshair,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  TrendingUp, Target, Shield, Swords, AlertTriangle, Eye, Zap, Clock,
  Activity, Brain, MapPin, BarChart3, MessageCircle, Video, ArrowRight,
  Flame, Crosshair,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Target;
}
```

**Step 3: Verify & commit**

Run: `cd ufc-news-hub && npx tsc --noEmit`

```bash
git add ufc-news-hub/src/components/analise/full/
git commit -m "feat(analise): add SectionHeader and icon-resolver utilities"
```

---

### Task 3: HeroSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/HeroSection.tsx`

**Step 1: Create the component**

Server component (no 'use client'). Full-bleed hero with fighter images, event info, taglines. Uses `next/image` for fighter fullbody images with fallback initials circle. Layout: fighter1 left, event info center, fighter2 right on desktop; stacked on mobile.

Key styling: gradient background `bg-gradient-to-b from-dark-card via-dark-bg to-dark-bg`, radial red glow overlay, `font-display` for names, `text-ufc-red` for fighter1, `text-blue-400` for fighter2, `text-ufc-gold` for titulo badge.

**Step 2: Verify & commit**

---

### Task 4: NarrativaSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/NarrativaSection.tsx`

Server component. Renders `html_content` via `dangerouslySetInnerHTML`, stakes table (grid with dimensao/fighter1/fighter2), and prognostico cards (two side-by-side FuturoCenario cards with consequencias list).

---

### Task 5: MomentoAtualSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/MomentoAtualSection.tsx`

`'use client'` (has modal for full fight history). Two fighter columns. Each shows:
- Recent fights as timeline cards with result badge (W=green, L=red, D=yellow), opponent, method, quality_score dots (1-5)
- Momentum label + trend indicator
- Momentum note paragraph
- "Ver historico completo" button → modal with full_fight_history table
- layoff_warning alert if present

Modal: fixed overlay with scrollable table of all fights.

---

### Task 6: NivelCompeticaoSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/NivelCompeticaoSection.tsx`

Server component. Two fighter cards side by side. Each shows media_oponentes as filled dots (1-5) + label, aproveitamento, contra_top5 record.

---

### Task 7: OponenteComumSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/OponenteComumSection.tsx`

Server component. Renders only if data is not null. Dynamic SectionHeader accent = oponente_nome. Two result cards (fighter1_result, fighter2_result) side by side, each with resultado, metodo, duracao, contexto, performance paragraphs. Insight paragraph at bottom.

---

### Task 8: ComparacaoEstatisticaSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/ComparacaoEstatisticaSection.tsx`

Server component. Two sub-sections:
1. Stat bars: for each StatBarData, two horizontal bars (red left, blue right) proportional to maxVal, with values displayed. Winner highlighted. reverseWinner flips logic.
2. Tale of tape: table rows with fighter1 value | label | fighter2 value, with optional note.

---

### Task 9: PerfilHabilidadesSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/PerfilHabilidadesSection.tsx`

Server component. 6 skill rows. Each row: label, two bars (0-100 width), labelA/labelB text, advantage indicator arrow. Optional insight paragraph at bottom.

---

### Task 10: DistribuicaoVitoriasSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/DistribuicaoVitoriasSection.tsx`

Server component. Two fighter cards. Each shows three stacked horizontal bars (KO/TKO, Submission, Decision) with count and percent. Total wins number. Insight paragraph below.

---

### Task 11: DangerZonesSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/DangerZonesSection.tsx`

Server component. 3 cards in a row. Each card: rounds badge at top, color-coded border (red/gold/green), title, danger_label badge, description paragraph.

---

### Task 12: IntangiveisSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/IntangiveisSection.tsx`

Server component. 5-7 cards in a responsive grid. Each card: resolved Lucide icon, title, fighter name, risk_level badge (color-coded by risk_color), description. Uses `resolveIcon()`.

---

### Task 13: CaminhosVitoriaSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/CaminhosVitoriaSection.tsx`

Server component. Two columns (fighter1=red border, fighter2=blue border). Each column: total_probability as large percentage, then 3-4 scenario cards with name, probability bar, method badge, description.

---

### Task 14: PrevisaoFinalSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/PrevisaoFinalSection.tsx`

Server component. Central winner announcement card with winner_name, predicted_method, confidence badge. Probability bars (fighter1/fighter2/draw). Explanation paragraph. X-Factor card (gold accent). Upset Alert card (red accent). Optional value_picks grid.

---

### Task 15: OQueObservarSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/OQueObservarSection.tsx`

Server component. 5 numbered talking point cards. Each: num circle, resolved icon, title, description paragraph.

---

### Task 16: CreatorKitSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/CreatorKitSection.tsx`

`'use client'` (tabs + clipboard). 5 tabs: Instagram, Twitter/X, Video Script, TikTok, Headlines. Tab switching with useState. Each tab renders its content type. Copy-to-clipboard button on each item with visual feedback (checkmark for 2s).

---

### Task 17: RadarApostadorSection component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/RadarApostadorSection.tsx`

`'use client'` (expandable edge cards). Shows:
1. Odds comparison banner
2. Edges grid: expandable cards (click to toggle) with icon, titulo, stat_headline (bold), contexto (hidden until expanded), implicacao_aposta, edge_level badge
3. Value picks: cards with tipo, pick, odds, confianca badge (color-coded), raciocinio
4. Armadilha warning card (red border)
5. Disclaimer text

---

### Task 18: FullAnalysisView wrapper component

**Files:**
- Create: `ufc-news-hub/src/components/analise/full/FullAnalysisView.tsx`

Server component. Receives `FullSingleAnalise`, extracts `full_analysis`, passes data to each of the 15 section components in order. Wraps in `<main>` with container. Adds breadcrumb, then renders all sections with spacing.

```tsx
import type { FullSingleAnalise } from '@/types/analise';
import { HeroSection } from './HeroSection';
import { NarrativaSection } from './NarrativaSection';
// ... all 15 imports
```

---

### Task 19: Create the page route

**Files:**
- Create: `ufc-news-hub/src/app/analise-completa/[slug]/page.tsx`

Dynamic route that imports `FullAnalysisView`. For now, creates a placeholder/demo page that shows the route works. The actual data will be provided by the fight-analyst agent creating individual page files.

```tsx
import { Header } from '@/components/ui/Header';
import { FullAnalysisView } from '@/components/analise/full/FullAnalysisView';
import type { FullSingleAnalise } from '@/types/analise';
import { notFound } from 'next/navigation';

// Dynamic imports of analysis data files will go here
// For now, a simple lookup
const analyses: Record<string, FullSingleAnalise> = {};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AnaliseCompletaPage({ params }: PageProps) {
  const { slug } = await params;
  const analise = analyses[slug];
  if (!analise) notFound();

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <FullAnalysisView analise={analise} />
    </div>
  );
}
```

---

### Task 20: Create demo analysis data + verify end-to-end

**Files:**
- Create: `ufc-news-hub/src/app/analise-completa/[slug]/page.tsx` (update with demo data)

Create a small demo `FullSingleAnalise` object with realistic sample data for all 15 sections to verify the entire pipeline renders without errors.

**Step 1: Add demo data inline**
**Step 2: Run `npx tsc --noEmit`**
**Step 3: Run `npm run build`**
**Step 4: Manual test at `http://localhost:3010/analise-completa/demo`**
**Step 5: Commit**

```bash
git add ufc-news-hub/src/components/analise/full/ ufc-news-hub/src/app/analise-completa/
git commit -m "feat(analise): add full 15-section analysis system with all components"
```

---

## Task Dependency Graph

```
Task 1 (types) ──────────────────────────────┐
Task 2 (SectionHeader + icon-resolver) ──────┤
                                             ├── Tasks 3-17 (15 components, parallelizable)
                                             │
Tasks 3-17 ──────────────────────────────────├── Task 18 (FullAnalysisView)
                                             │
Task 18 ─────────────────────────────────────├── Task 19 (page route)
                                             │
Task 19 ─────────────────────────────────────└── Task 20 (demo + verify)
```

**Tasks 3-17 are fully independent** and can be parallelized via subagents.
