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
// i18n texts
// ---------------------------------------------------------------------------
const texts = {
  pt: {
    breadcrumbAnalises: 'Analises',
    title: 'Analises',
    titleAccent: 'de Eventos',
    subtitle: 'Analises taticas completas com previsoes data-driven para os maiores eventos do UFC',
    semanal: 'Analise Semanal',
    anteriores: 'Analises Anteriores',
    badgeAtiva: 'Analise Ativa',
    lutasAnalisadas: 'Lutas Analisadas',
    verAnalise: 'Ver Analise Completa',
    nenhuma: 'Nenhuma analise disponivel ainda',
    nenhumaDesc: 'As analises semanais serao publicadas 12 horas antes de cada evento.',
  },
  en: {
    breadcrumbAnalises: 'Analyses',
    title: 'Event',
    titleAccent: 'Analyses',
    subtitle: 'Complete tactical analyses with data-driven predictions for the biggest UFC events',
    semanal: 'Weekly Analysis',
    anteriores: 'Previous Analyses',
    badgeAtiva: 'Active Analysis',
    lutasAnalisadas: 'Fights Analyzed',
    verAnalise: 'View Full Analysis',
    nenhuma: 'No analyses available yet',
    nenhumaDesc: 'Weekly analyses will be published 12 hours before each event.',
  },
} as const;

type Lang = keyof typeof texts;

// ---------------------------------------------------------------------------
// Language toggle component
// ---------------------------------------------------------------------------
function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-dark-border bg-dark-card p-1">
      <button
        onClick={() => onChange('pt')}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
          lang === 'pt'
            ? 'bg-ufc-red/20 text-ufc-red shadow-sm'
            : 'text-dark-textMuted hover:text-dark-text'
        }`}
        title="Portugues"
      >
        <span className="text-base leading-none">🇧🇷</span>
        <span className="hidden sm:inline">PT</span>
      </button>
      <button
        onClick={() => onChange('en')}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
          lang === 'en'
            ? 'bg-ufc-red/20 text-ufc-red shadow-sm'
            : 'text-dark-textMuted hover:text-dark-text'
        }`}
        title="English"
      >
        <span className="text-base leading-none">🇺🇸</span>
        <span className="hidden sm:inline">EN</span>
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Event card component (used for both semanal and anteriores)
// ---------------------------------------------------------------------------
function EventCard({
  event,
  variant = 'semanal',
  lang,
}: {
  event: EventRegistryEntry;
  variant?: 'semanal' | 'anterior';
  lang: Lang;
}) {
  const t = texts[lang];
  const isSemanal = variant === 'semanal';
  const borderColor = isSemanal ? 'border-ufc-red/30 hover:border-ufc-red/60' : 'border-dark-border hover:border-dark-textMuted';
  const badgeBg = isSemanal ? 'bg-ufc-red/20 text-ufc-red' : 'bg-dark-border text-dark-textMuted';
  const ctaBg = isSemanal
    ? 'bg-ufc-red/20 text-ufc-red group-hover:bg-ufc-red group-hover:text-white'
    : 'bg-dark-border text-dark-textMuted group-hover:bg-dark-textMuted group-hover:text-dark-bg';
  const langParam = lang === 'en' ? '?lang=en' : '';

  return (
    <Link
      href={`/analise/evento/${event.slug}${langParam}`}
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
                  {t.badgeAtiva}
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
                {event.total_fights} {t.lutasAnalisadas}
              </span>
            </div>

            <p className="mt-2 text-sm text-dark-textMuted">
              Main Event: <span className="font-medium text-ufc-red">{event.main_event.fighter1.split(' ').pop()}</span>
              {' '}vs{' '}
              <span className="font-medium text-blue-400">{event.main_event.fighter2.split(' ').pop()}</span>
            </p>
          </div>

          <span className={`flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${ctaBg}`}>
            {t.verAnalise} →
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
  const [lang, setLang] = useState<Lang>('pt');

  useEffect(() => {
    setCategories(getCategorizedEvents());
  }, []);

  const hasAnySemanal = categories.semanal.length > 0;
  const hasAnyAnteriores = categories.anteriores.length > 0;
  const t = texts[lang];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-dark-textMuted">
            <Link href="/" className="hover:text-ufc-red">Home</Link>
            <span>/</span>
            <span className="text-dark-text">{t.breadcrumbAnalises}</span>
          </div>
          <LangToggle lang={lang} onChange={setLang} />
        </div>

        <h1 className="mb-2 font-display text-3xl uppercase text-dark-text md:text-4xl">
          {t.title} <span className="text-ufc-red">{t.titleAccent}</span>
        </h1>
        <p className="mb-8 text-dark-textMuted">
          {t.subtitle}
        </p>

        {/* Analise Semanal */}
        {hasAnySemanal && (
          <section className="mb-12">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl uppercase text-ufc-red">
              <Clock className="h-5 w-5" />
              {t.semanal}
            </h2>
            <div className="space-y-4">
              {categories.semanal.map((event) => (
                <EventCard key={event.slug} event={event} variant="semanal" lang={lang} />
              ))}
            </div>
          </section>
        )}

        {/* Sem analise semanal */}
        {!hasAnySemanal && !hasAnyAnteriores && (
          <div className="rounded-lg border border-dark-border bg-dark-card p-12 text-center">
            <p className="text-xl text-dark-textMuted">{t.nenhuma}</p>
            <p className="mt-2 text-sm text-dark-textMuted">{t.nenhumaDesc}</p>
          </div>
        )}

        {/* Analises Anteriores */}
        {hasAnyAnteriores && (
          <section>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl uppercase text-dark-textMuted">
              <History className="h-5 w-5" />
              {t.anteriores}
            </h2>
            <div className="space-y-3">
              {categories.anteriores.map((event) => (
                <EventCard key={event.slug} event={event} variant="anterior" lang={lang} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
