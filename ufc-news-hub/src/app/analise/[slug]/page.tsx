'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { TacticalBreakdownDynamic } from '@/components/analise/TacticalBreakdownDynamic';
import { FightPredictionDynamic } from '@/components/analise/FightPredictionDynamic';
import { FighterCard } from '@/components/analise/FighterCard';
import { Analise, isCardAnalise, isFullSingleAnalise, CardAnalise, FullSingleAnalise, FightAnalysisItem } from '@/types/analise';
import { CardOverviewHero } from '@/components/analise/CardOverviewHero';
import { BestBetsSection } from '@/components/analise/BestBetsSection';
import { FightBreakdownCard } from '@/components/analise/FightBreakdownCard';
import { FullAnalysisView } from '@/components/analise/FullAnalysisView';
import { AlertCircle } from 'lucide-react';

// ---------------------------------------------------------------------------
// Helper: safely parse a field that might be a JSON string or already an object
// ---------------------------------------------------------------------------
function safeParse<T>(value: T | string): T {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  }
  return value;
}

// ---------------------------------------------------------------------------
// Legacy single-fight view (unchanged from original page)
// ---------------------------------------------------------------------------
function LegacySingleFightView({ analise }: { analise: Analise }) {
  const f1 = analise.fighter1_info;
  const f2 = analise.fighter2_info;
  const f1Last = f1.nome.split(' ').pop() || 'Fighter 1';
  const f2Last = f2.nome.split(' ').pop() || 'Fighter 2';
  const f1Initials = f1.nome.split(' ').map(n => n[0]).join('').slice(0, 2);
  const f2Initials = f2.nome.split(' ').map(n => n[0]).join('').slice(0, 2);

  const eventoData = analise.evento_data ? new Date(analise.evento_data) : null;
  const eventoDataStr = eventoData
    ? eventoData.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
        <Link href="/" className="hover:text-ufc-red">Home</Link>
        <span>/</span>
        <Link href="/analises" className="hover:text-ufc-red">Analises</Link>
        <span>/</span>
        <span className="text-dark-text">{analise.evento_nome}</span>
      </div>

      {/* Hero */}
      <div className="relative mb-8 overflow-hidden rounded-xl border border-dark-border bg-gradient-to-r from-dark-card via-dark-bg to-dark-card p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,10,10,0.15),transparent_70%)]" />
        <div className="relative z-10 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-ufc-red">
            {analise.evento_nome} • {eventoDataStr} • {analise.evento_local}
          </p>
          <h1 className="font-display text-4xl uppercase text-dark-text md:text-6xl lg:text-7xl">
            <span className="text-ufc-red">{f1Last}</span> vs{' '}
            <span className="text-blue-400">{f2Last}</span>
          </h1>
          <p className="mt-4 text-lg text-dark-textMuted">
            {analise.categoria_peso} {analise.is_titulo ? '• Title Fight' : ''} • {analise.num_rounds} Rounds
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <span className="rounded-full bg-ufc-red/20 px-4 py-2 text-sm font-bold text-ufc-red">
              {analise.num_rounds} Rounds
            </span>
            {analise.broadcast && (
              <span className="rounded-full bg-dark-border px-4 py-2 text-sm text-dark-textMuted">
                {analise.broadcast}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Fighter Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <FighterCard fighter={f1} accentColor="ufc-red" initials={f1Initials} />
        <FighterCard fighter={f2} accentColor="blue-400" initials={f2Initials} />
      </div>

      {/* Article */}
      <article className="mx-auto mb-12 max-w-4xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded bg-category-lutas/20 px-2 py-1 text-xs font-bold uppercase tracking-wider text-category-lutas">
            Analise
          </span>
          <span className="text-sm text-dark-textMuted">
            {analise.created_at && !isNaN(new Date(analise.created_at).getTime()) ? new Date(analise.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : '\u2014'}
          </span>
        </div>

        <h2 className="mb-6 font-display text-3xl uppercase leading-tight text-dark-text md:text-4xl">
          {analise.titulo}
        </h2>

        {analise.subtitulo && (
          <p className="mb-6 text-lg text-dark-textMuted">{analise.subtitulo}</p>
        )}

        <div
          className="prose prose-invert max-w-none space-y-4 text-lg leading-relaxed text-dark-text"
          dangerouslySetInnerHTML={{ __html: analise.artigo_conteudo }}
        />
      </article>

      {/* Tactical Breakdown */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase text-dark-text">
          Analise <span className="text-ufc-red">Tatica</span>
        </h2>
        <TacticalBreakdownDynamic
          data={analise.tactical_breakdown}
          fighter1={f1}
          fighter2={f2}
        />
      </section>

      {/* Prediction */}
      <section className="mb-12">
        <h2 className="mb-6 font-display text-2xl uppercase text-dark-text">
          Previsao <span className="text-ufc-red">Data-Driven</span>
        </h2>
        <FightPredictionDynamic
          data={analise.fight_prediction}
          fighter1={f1}
          fighter2={f2}
        />
      </section>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Full-card view (new)
// ---------------------------------------------------------------------------
function FullCardView({ analise }: { analise: CardAnalise }) {
  const fightsAnalysis: FightAnalysisItem[] = safeParse<FightAnalysisItem[]>(analise.fights_analysis);
  const cardOverview = safeParse<CardAnalise['card_overview']>(analise.card_overview);

  // Sort fights by ordem DESC (highest first = main event first)
  const sortedFights = [...fightsAnalysis].sort((a, b) => b.ordem - a.ordem);

  // Build fight summaries for the hero pill list
  const fightSummaries = sortedFights.map((f) => ({
    fighter1Name: f.fighter1_info.nome,
    fighter2Name: f.fighter2_info.nome,
    tipo: f.fight_type,
  }));

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
        <Link href="/" className="hover:text-ufc-red">Home</Link>
        <span>/</span>
        <Link href="/analises" className="hover:text-ufc-red">Analises</Link>
        <span>/</span>
        <span className="text-dark-text">{analise.evento_nome}</span>
      </div>

      {/* Card Overview Hero */}
      <div className="mb-8">
        <CardOverviewHero
          eventoNome={analise.evento_nome || 'UFC Event'}
          eventoData={analise.evento_data}
          eventoLocal={analise.evento_local}
          totalFights={cardOverview.total_fights ?? sortedFights.length}
          fights={fightSummaries}
        />
      </div>

      {/* Card Overview Article */}
      {cardOverview.card_summary && (
        <article className="mx-auto mb-10 max-w-4xl">
          <div
            className="prose prose-invert max-w-none space-y-4 text-lg leading-relaxed text-dark-text prose-headings:text-dark-text prose-p:text-dark-textMuted prose-strong:text-dark-text prose-a:text-ufc-red"
            dangerouslySetInnerHTML={{ __html: cardOverview.card_summary }}
          />
        </article>
      )}

      {/* Best Bets Section */}
      {cardOverview.best_bets && cardOverview.best_bets.length > 0 && cardOverview.parlay && (
        <div className="mb-10">
          <BestBetsSection
            bestBets={cardOverview.best_bets}
            parlay={cardOverview.parlay}
          />
        </div>
      )}

      {/* Separator */}
      <div className="my-10 border-t border-dark-border" />

      {/* Individual Fight Breakdowns */}
      <div className="space-y-8">
        {sortedFights.map((fight) => (
          <div key={fight.fight_id || fight.fight_label}>
            {/* Fight section header */}
            <div className="mb-4 flex items-center gap-3">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-ufc-red">
                {fight.fight_label}
              </span>
              <span className="text-xs text-dark-textMuted">
                {fight.categoria_peso}
                {fight.is_titulo ? ' • Disputa de Titulo' : ''}
                {' • '}{fight.num_rounds} Rounds
              </span>
            </div>

            <FightBreakdownCard
              fight={fight}
              isMainEvent={fight.fight_type === 'main_event'}
            />
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 flex items-start gap-3 rounded-lg border border-dark-border bg-dark-bg p-5">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-dark-textMuted" />
        <p className="text-xs leading-relaxed text-dark-textMuted">
          As analises e recomendacoes de apostas sao baseadas em dados estatisticos e analise tecnica.
          Aposte com responsabilidade. Resultados passados nao garantem resultados futuros.
        </p>
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default function AnalisePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [analise, setAnalise] = useState<Analise | CardAnalise | FullSingleAnalise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalise() {
      try {
        const res = await fetch(`/api/analises?slug=${slug}`);
        if (!res.ok) {
          setError('Analise nao encontrada');
          return;
        }
        const data = await res.json();
        setAnalise(data as Analise);
      } catch {
        setError('Erro ao carregar analise');
      } finally {
        setLoading(false);
      }
    }
    fetchAnalise();
  }, [slug]);

  // SEO: update document title
  useEffect(() => {
    if (analise) {
      document.title = `${analise.titulo} | UFC News Hub`;
    }
  }, [analise]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        {/* Hero skeleton */}
        <div className="animate-pulse border-b border-dark-border">
          <div className="container mx-auto px-4 py-12">
            <div className="mx-auto mb-4 h-4 w-48 rounded bg-dark-card" />
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="ml-auto h-[300px] w-[200px] rounded bg-dark-card" />
              <div className="h-16 w-16 rounded-full bg-dark-card" />
              <div className="h-[300px] w-[200px] rounded bg-dark-card" />
            </div>
          </div>
        </div>
        <main className="container mx-auto px-4 py-12 space-y-12">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-dark-card" />
                <div className="h-6 w-48 rounded bg-dark-card" />
              </div>
              <div className="h-48 rounded-lg bg-dark-card" />
            </div>
          ))}
        </main>
      </div>
    );
  }

  if (error || !analise) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <main className="container mx-auto px-4 py-6 text-center">
          <h1 className="font-display text-3xl text-dark-text mt-20">{error || 'Nao encontrado'}</h1>
          <Link href="/analises" className="mt-4 inline-block text-ufc-red hover:underline">
            ← Ver todas as analises
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg font-body text-dark-text">
      <Header />
      {isFullSingleAnalise(analise) ? (
        <FullAnalysisView analise={analise as FullSingleAnalise} />
      ) : isCardAnalise(analise) ? (
        <FullCardView analise={analise as CardAnalise} />
      ) : (
        <LegacySingleFightView analise={analise} />
      )}
    </div>
  );
}
