'use client';

import { useState } from 'react';
import Link from 'next/link';
import FighterImage from '@/components/ui/FighterImage';
import { EventAnalysisCard, type EventFightCard } from './EventAnalysisCard';

export interface EventAnalysisData {
  evento_nome: string;
  evento_data: string;
  evento_local: string;
  main_card: EventFightCard[];
  prelims: EventFightCard[];
}

/* ────────────────────────────────────────────
   Section Divider with neumorphic line
   ──────────────────────────────────────────── */
function SectionTitle({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  const lineColor = accent ? 'bg-ufc-red/25' : 'bg-neutral-700/30';
  return (
    <div className="flex items-center gap-4 py-8">
      <div className={`h-px flex-1 ${lineColor}`} />
      <h2
        className={`font-display text-sm uppercase tracking-[0.3em] ${
          accent ? 'text-ufc-red/80' : 'text-neutral-500'
        }`}
      >
        {children}
      </h2>
      <div className={`h-px flex-1 ${lineColor}`} />
    </div>
  );
}

/* ════════════════════════════════════════════
   Main Component
   ════════════════════════════════════════════ */
export function EventAnalysisView({ data }: { data: EventAnalysisData }) {
  const [heroHovered, setHeroHovered] = useState(false);

  const mainEvent = data.main_card.find((f) => f.is_main_event) || data.main_card[0];
  const restMainCard = data.main_card.filter((f) => f !== mainEvent);
  const allFights = [...data.main_card, ...data.prelims];

  const isWinnerFighter1 = mainEvent.predicted_winner === mainEvent.fighter1.nome;

  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      {/* ──────── Poster Hero: Event Info ──────── */}
      <section className="relative overflow-hidden border-b border-ufc-red/20">
        {/* Red gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-ufc-red/15 via-[#0A0A0A] to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,_rgba(210,10,10,0.2)_0%,_transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ufc-red/40 to-transparent" />

        <div className="relative px-4 pb-10 pt-14 text-center md:pb-14 md:pt-20">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-ufc-red/80">
            Analise Completa do Card
          </p>
          <h1 className="font-display text-4xl uppercase tracking-wide text-white md:text-6xl lg:text-7xl">
            {data.evento_nome}
          </h1>
          <p className="mt-4 text-sm text-neutral-400 md:text-base">
            {data.evento_data} · {data.evento_local}
          </p>
        </div>
      </section>

      {/* Subtle red spotlight for body */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(210,10,10,0.04)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-3xl px-4 py-10 md:py-16">

        {/* ──────── Main Event: Neumorphic Hero Card ──────── */}
        <Link
          href={`/analise/${mainEvent.slug}`}
          onMouseEnter={() => setHeroHovered(true)}
          onMouseLeave={() => setHeroHovered(false)}
          className={`group mb-8 block rounded-2xl border p-8 transition-all duration-300 md:p-10
            bg-[#111111]
            shadow-[6px_6px_14px_rgba(0,0,0,0.5),-6px_-6px_14px_rgba(255,255,255,0.025)]
            ${heroHovered
              ? 'scale-[1.005] border-ufc-red/40 shadow-[8px_8px_18px_rgba(0,0,0,0.6),-8px_-8px_18px_rgba(255,255,255,0.04)]'
              : 'border-[#1a1a1a]'
            }
          `}
        >
          {/* Main Event label */}
          <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-ufc-red/70">
            Main Event
          </p>

          <div className="text-center">
            {/* Fighter 1 */}
            <div className="flex items-center justify-center gap-4">
              {mainEvent.fighter1.foto_url && (
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-[#1a1a1a]">
                  <FighterImage
                    src={mainEvent.fighter1.foto_url}
                    alt={mainEvent.fighter1.nome}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <p
                  className={`font-display text-4xl uppercase leading-none tracking-wide md:text-7xl ${
                    isWinnerFighter1 ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {mainEvent.fighter1.nome}
                </p>
                <p className="text-xs text-neutral-500 md:text-sm">
                  {mainEvent.fighter1.record}
                </p>
              </div>
            </div>

            {/* VS - neumorphic inset pill */}
            <div className="my-5 flex justify-center md:my-6">
              <div className="rounded-full bg-[#0e0e0e] px-5 py-2 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.7),inset_-3px_-3px_6px_rgba(255,255,255,0.02)]">
                <span className="font-display text-xl font-bold text-ufc-red md:text-2xl">
                  VS
                </span>
              </div>
            </div>

            {/* Fighter 2 */}
            <div className="flex items-center justify-center gap-4">
              <div className="space-y-1.5">
                <p
                  className={`font-display text-4xl uppercase leading-none tracking-wide md:text-7xl ${
                    !isWinnerFighter1 ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {mainEvent.fighter2.nome}
                </p>
                <p className="text-xs text-neutral-500 md:text-sm">
                  {mainEvent.fighter2.record}
                </p>
              </div>
              {mainEvent.fighter2.foto_url && (
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-[#1a1a1a]">
                  <FighterImage
                    src={mainEvent.fighter2.foto_url}
                    alt={mainEvent.fighter2.nome}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}
            </div>

            {/* Weight + rounds */}
            <p className="mt-6 text-xs uppercase tracking-wider text-neutral-500">
              {mainEvent.categoria_peso} · {mainEvent.num_rounds} rounds
            </p>

            {/* Prediction - neumorphic inset bar */}
            <div className="mx-auto mt-5 max-w-md rounded-xl bg-[#0e0e0e] px-4 py-3 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.6),inset_-2px_-2px_5px_rgba(255,255,255,0.015)]">
              <p className="text-sm text-neutral-300">
                → {mainEvent.predicted_winner} por {mainEvent.predicted_method}
              </p>
            </div>
          </div>
        </Link>

        {/* ──────── Main Card ──────── */}
        {restMainCard.length > 0 && (
          <section>
            <SectionTitle accent>Main Card</SectionTitle>
            <div className="space-y-4">
              {restMainCard.map((fight) => (
                <EventAnalysisCard
                  key={fight.slug}
                  fight={fight}
                  size="card"
                  showMeta
                  showPrediction
                />
              ))}
            </div>
          </section>
        )}

        {/* ──────── Prelims ──────── */}
        {data.prelims.length > 0 && (
          <section>
            <SectionTitle>Preliminar</SectionTitle>
            <div className="space-y-3">
              {data.prelims.map((fight) => (
                <EventAnalysisCard
                  key={fight.slug}
                  fight={fight}
                  size="prelim"
                  showMeta
                  showPrediction
                />
              ))}
            </div>
          </section>
        )}

        {/* ──────── Footer ──────── */}
        <div className="pt-12 text-center">
          <p className="text-xs text-neutral-500">
            {allFights.length} lutas analisadas
          </p>
        </div>
      </div>
    </main>
  );
}
