'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Swords, Clock, History } from 'lucide-react';
import {
  getCategorizedEvents,
  type EventRegistryEntry,
} from '@/lib/event-registry';

// ---------------------------------------------------------------------------
// Event card component (used for both semanal and anteriores)
// ---------------------------------------------------------------------------
function EventCard({
  event,
  variant = 'semanal',
}: {
  event: EventRegistryEntry;
  variant?: 'semanal' | 'anterior';
}) {
  const isSemanal = variant === 'semanal';
  const borderColor = isSemanal ? 'border-ufc-red/30 hover:border-ufc-red/60' : 'border-dark-border hover:border-dark-textMuted';
  const badgeBg = isSemanal ? 'bg-ufc-red/20 text-ufc-red' : 'bg-dark-border text-dark-textMuted';
  const ctaBg = isSemanal
    ? 'bg-ufc-red/20 text-ufc-red group-hover:bg-ufc-red group-hover:text-white'
    : 'bg-dark-border text-dark-textMuted group-hover:bg-dark-textMuted group-hover:text-dark-bg';

  return (
    <Link
      href={`/analise/evento/${event.slug}`}
      className="group block"
    >
      <div className={`relative overflow-hidden rounded-lg border ${borderColor} bg-dark-card p-6 transition-all duration-300 hover:shadow-lg`}>
        {isSemanal && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ufc-red/[0.04] via-transparent to-ufc-red/[0.02]" />
        )}

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {isSemanal && (
                <span className="inline-flex items-center gap-1 rounded-full bg-ufc-red/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ufc-red">
                  <Clock className="h-3 w-3" />
                  Analise Ativa
                </span>
              )}
              <span className="text-xs text-dark-textMuted">
                {event.evento_data}
              </span>
              <span className="text-xs text-dark-textMuted">
                · {event.evento_local}
              </span>
            </div>

            <h2 className="font-display text-2xl uppercase text-dark-text md:text-3xl lg:text-4xl">
              {event.evento_nome}
            </h2>

            <div className="mt-2 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full border border-current/20 px-3 py-1 text-xs font-bold ${badgeBg}`}>
                <Swords className="h-3.5 w-3.5" />
                {event.total_fights} Lutas Analisadas
              </span>
            </div>

            <p className="mt-2 text-sm text-dark-textMuted">
              Main Event: <span className="font-medium text-ufc-red">{event.main_event.fighter1.split(' ').pop()}</span>
              {' '}vs{' '}
              <span className="font-medium text-blue-400">{event.main_event.fighter2.split(' ').pop()}</span>
            </p>
          </div>

          <span className={`flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${ctaBg}`}>
            Ver Analise Completa →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AnalisesPage() {
  const [categories, setCategories] = useState<{
    semanal: EventRegistryEntry[];
    anteriores: EventRegistryEntry[];
  }>({ semanal: [], anteriores: [] });

  useEffect(() => {
    setCategories(getCategorizedEvents());
  }, []);

  const hasAnySemanal = categories.semanal.length > 0;
  const hasAnyAnteriores = categories.anteriores.length > 0;

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red">Home</Link>
          <span>/</span>
          <span className="text-dark-text">Analises</span>
        </div>

        <h1 className="mb-2 font-display text-3xl uppercase text-dark-text md:text-4xl">
          Analises <span className="text-ufc-red">de Eventos</span>
        </h1>
        <p className="mb-8 text-dark-textMuted">
          Analises taticas completas com previsoes data-driven para os maiores eventos do UFC
        </p>

        {/* Analise Semanal */}
        {hasAnySemanal && (
          <section className="mb-12">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl uppercase text-ufc-red">
              <Clock className="h-5 w-5" />
              Analise Semanal
            </h2>
            <div className="space-y-4">
              {categories.semanal.map((event) => (
                <EventCard key={event.slug} event={event} variant="semanal" />
              ))}
            </div>
          </section>
        )}

        {/* Sem analise semanal */}
        {!hasAnySemanal && !hasAnyAnteriores && (
          <div className="rounded-lg border border-dark-border bg-dark-card p-12 text-center">
            <p className="text-xl text-dark-textMuted">Nenhuma analise disponivel ainda</p>
            <p className="mt-2 text-sm text-dark-textMuted">As analises semanais serao publicadas 12 horas antes de cada evento.</p>
          </div>
        )}

        {/* Analises Anteriores */}
        {hasAnyAnteriores && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl uppercase text-dark-textMuted">
              <History className="h-5 w-5" />
              Analises Anteriores
            </h2>
            <div className="space-y-3">
              {categories.anteriores.map((event) => (
                <EventCard key={event.slug} event={event} variant="anterior" />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
