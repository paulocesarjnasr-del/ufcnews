'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { TacticalBreakdownDynamic } from '@/components/analise/TacticalBreakdownDynamic';
import { FightPredictionDynamic } from '@/components/analise/FightPredictionDynamic';
import { FighterCard } from '@/components/analise/FighterCard';
import { Analise } from '@/types/analise';

export default function AnalisePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [analise, setAnalise] = useState<Analise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalise() {
      try {
        const res = await fetch(`/api/analises?slug=${slug}`);
        if (!res.ok) {
          setError('Análise não encontrada');
          return;
        }
        const data = await res.json();
        setAnalise(data);
      } catch {
        setError('Erro ao carregar análise');
      } finally {
        setLoading(false);
      }
    }
    fetchAnalise();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-48 rounded-xl bg-dark-card" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-64 rounded-lg bg-dark-card" />
              <div className="h-64 rounded-lg bg-dark-card" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !analise) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <main className="container mx-auto px-4 py-6 text-center">
          <h1 className="font-display text-3xl text-dark-text mt-20">{error || 'Não encontrado'}</h1>
          <Link href="/analises" className="mt-4 inline-block text-ufc-red hover:underline">
            ← Ver todas as análises
          </Link>
        </main>
      </div>
    );
  }

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
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red">Home</Link>
          <span>/</span>
          <Link href="/analises" className="hover:text-ufc-red">Análises</Link>
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
              Análise
            </span>
            <span className="text-sm text-dark-textMuted">
              {new Date(analise.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
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
            🔬 Análise <span className="text-ufc-red">Tática</span>
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
            🎯 Previsão <span className="text-ufc-red">Data-Driven</span>
          </h2>
          <FightPredictionDynamic 
            data={analise.fight_prediction} 
            fighter1={f1} 
            fighter2={f2} 
          />
        </section>
      </main>
    </div>
  );
}
