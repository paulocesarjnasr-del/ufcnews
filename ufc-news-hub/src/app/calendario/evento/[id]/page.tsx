'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import FighterFaceOff from '@/components/calendario/FighterFaceOff';
import FightCardSection from '@/components/calendario/FightCardSection';
import CountdownFlip from '@/components/calendario/CountdownFlip';
import LivePulse from '@/components/calendario/LivePulse';
import { OndeAssistir } from '@/components/calendario/OndeAssistir';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Fighter {
  id: string;
  nome: string;
  apelido?: string | null;
  imagem_url?: string | null;
  pais?: string | null;
  vitorias?: number;
  derrotas?: number;
  empates?: number;
  ranking_divisao?: number | null;
}

interface Luta {
  id: string;
  ordem: number;
  tipo: string;
  categoria_peso: string;
  rounds: number;
  is_titulo: boolean;
  status: string;
  lutador1: Fighter;
  lutador2: Fighter;
  vencedor_id?: string | null;
  metodo?: string | null;
  round_final?: number | null;
  tempo_final?: string | null;
  consenso?: Array<{
    lutador_id: string;
    lutador_nome: string;
    total_votos: number;
    percentual: number;
  }>;
  total_previsoes?: number;
}

interface EventoCard {
  evento: {
    id: string;
    nome: string;
    slug: string;
    data_evento: string;
    local_evento: string;
    cidade: string;
    pais: string;
    tipo: string;
    status: string;
    imagem_url: string | null;
    poster_url: string | null;
    onde_assistir: string | null;
  };
  main_card: Luta[];
  prelims: Luta[];
  early_prelims: Luta[];
  horarios: {
    main_card: string | null;
    prelims: string | null;
    early_prelims: string | null;
  };
  total_lutas: number;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

type TabType = 'main' | 'prelims' | 'early';

export default function EventoCalendarioPage({ params }: PageProps) {
  const { id } = use(params);
  const [data, setData] = useState<EventoCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('main');

  useEffect(() => {
    fetchEvento();
  }, [id]);

  async function fetchEvento() {
    try {
      const res = await fetch(`/api/eventos/${id}/card`);
      if (res.ok) {
        const responseData = await res.json();
        setData(responseData);
      }
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-dark-card rounded" />
            <div className="h-64 bg-dark-card rounded-xl" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-dark-card rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-card border border-dark-border flex items-center justify-center">
            <svg className="w-8 h-8 text-dark-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl text-white mb-2">
            Evento nao encontrado
          </h1>
          <p className="text-dark-textMuted mb-6">
            O evento que voce procura nao existe ou foi removido.
          </p>
          <Link
            href="/calendario"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ufc-red hover:bg-ufc-redDark text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao Calendario
          </Link>
        </div>
      </div>
    );
  }

  const { evento, main_card, prelims, early_prelims, horarios } = data;
  const eventDate = new Date(evento.data_evento);
  const isPast = eventDate < new Date() || evento.status === 'finalizado';
  const isLive = evento.status === 'ao_vivo';

  // Find main event for hero
  const mainEvent = main_card.find((l) => l.tipo === 'main_event');

  // Type badge
  const typeBadge = {
    PPV: { bg: 'bg-ufc-gold/20', border: 'border-ufc-gold/40', text: 'text-ufc-gold', label: 'PPV' },
    'Fight Night': { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400', label: 'FIGHT NIGHT' },
    Apex: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400', label: 'UFC APEX' },
  }[evento.tipo || 'Fight Night'] || { bg: 'bg-dark-card', border: 'border-dark-border', text: 'text-dark-textMuted', label: evento.tipo };

  // Tab config
  const tabs = [
    { id: 'main' as TabType, label: 'Main Card', count: main_card.length },
    { id: 'prelims' as TabType, label: 'Prelims', count: prelims.length },
    { id: 'early' as TabType, label: 'Early Prelims', count: early_prelims.length },
  ].filter((tab) => tab.count > 0);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/calendario"
            className="inline-flex items-center gap-2 text-dark-textMuted hover:text-ufc-red transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar ao Calendario
          </Link>
        </nav>

        {/* Event header */}
        <header className="mb-8 p-6 bg-gradient-to-br from-dark-card to-dark-bg rounded-2xl border border-dark-border">
          {/* Badges */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 ${typeBadge.bg} border ${typeBadge.border} rounded-full text-xs font-bold ${typeBadge.text} uppercase tracking-wider`}>
              {typeBadge.label}
            </span>
            {isLive && <LivePulse />}
            {isPast && !isLive && (
              <span className="px-3 py-1 bg-dark-card border border-dark-border rounded-full text-xs font-medium text-dark-textMuted">
                FINALIZADO
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase text-white mb-4">
            {evento.nome}
          </h1>

          {/* Info row */}
          <div className="flex flex-wrap items-center gap-4 text-dark-textMuted mb-6">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="capitalize">
                {format(eventDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {format(eventDate, 'HH:mm', { locale: ptBR })} BRT
            </span>
            {(evento.local_evento || evento.cidade) && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {evento.local_evento}{evento.cidade ? `, ${evento.cidade}` : ''}{evento.pais ? `, ${evento.pais}` : ''}
              </span>
            )}
          </div>

          {/* Where to watch */}
          <div className="mb-6">
            <OndeAssistir ondeAssistir={evento.onde_assistir} tipo={evento.tipo} />
          </div>

          {/* Countdown or Live indicator */}
          {!isPast && !isLive && (
            <div className="flex justify-center">
              <CountdownFlip targetDate={eventDate} />
            </div>
          )}

          {isLive && (
            <div className="flex justify-center">
              <LivePulse variant="large" />
            </div>
          )}
        </header>

        {/* Main Event Face-off */}
        {mainEvent && (
          <section className="mb-8 p-6 bg-dark-card rounded-2xl border border-dark-border">
            <div className="text-center mb-6">
              <span className="px-4 py-1.5 bg-ufc-red/20 border border-ufc-red/40 rounded-full text-sm font-bold text-ufc-red uppercase tracking-wider">
                Main Event
              </span>
            </div>

            <FighterFaceOff
              lutador1={mainEvent.lutador1}
              lutador2={mainEvent.lutador2}
              categoria_peso={mainEvent.categoria_peso}
              is_titulo={mainEvent.is_titulo}
              vencedor_id={mainEvent.vencedor_id}
            />

            {/* Prediction consensus */}
            {mainEvent.consenso && mainEvent.consenso.length > 0 && mainEvent.total_previsoes && mainEvent.total_previsoes > 0 && (
              <div className="mt-8 pt-6 border-t border-dark-border">
                <p className="text-center text-sm text-dark-textMuted mb-4">
                  Consenso da comunidade ({mainEvent.total_previsoes} previsoes)
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex items-center gap-2 mb-2">
                    {mainEvent.consenso.map((c, idx) => (
                      <div
                        key={c.lutador_id}
                        className={`h-4 rounded-full ${idx === 0 ? 'bg-ufc-red' : 'bg-blue-500'}`}
                        style={{ width: `${c.percentual}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    {mainEvent.consenso.map((c) => (
                      <span key={c.lutador_id} className="text-dark-textMuted">
                        {c.lutador_nome.split(' ').pop()} <span className="text-white font-medium">{Number(c.percentual ?? 0).toFixed(0)}%</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Result if finished */}
            {mainEvent.vencedor_id && mainEvent.metodo && (
              <div className="mt-6 text-center">
                <span className="px-4 py-2 bg-ufc-gold/20 border border-ufc-gold/40 rounded-lg text-ufc-gold font-semibold">
                  {mainEvent.metodo}
                  {mainEvent.round_final && ` - Round ${mainEvent.round_final}`}
                  {mainEvent.tempo_final && ` (${mainEvent.tempo_final})`}
                </span>
              </div>
            )}

            {/* Make prediction button */}
            {!isPast && (
              <div className="mt-6 text-center">
                <Link
                  href={`/arena/evento/${evento.id}`}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-ufc-red hover:bg-ufc-redDark text-white font-bold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Fazer Previsoes
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Fight Card Tabs */}
        {tabs.length > 1 && (
          <div className="mb-6 flex gap-2 bg-dark-card rounded-lg p-1 border border-dark-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-ufc-red text-white shadow-lg shadow-ufc-red/20'
                    : 'text-dark-textMuted hover:text-white hover:bg-dark-cardHover'
                  }
                `}
              >
                {tab.label} <span className="opacity-60">({tab.count})</span>
              </button>
            ))}
          </div>
        )}

        {/* Fight Cards by section */}
        <div className="space-y-8">
          {activeTab === 'main' && main_card.length > 0 && (
            <FightCardSection
              title="Main Card"
              icon="trophy"
              horario={horarios.main_card}
              broadcast={evento.tipo === 'PPV' ? 'PPV / Combate' : 'ESPN / Combate'}
              lutas={main_card}
              highlightMainEvent={false}
              evento_id={evento.id}
            />
          )}

          {activeTab === 'prelims' && prelims.length > 0 && (
            <FightCardSection
              title="Prelims"
              icon="fire"
              horario={horarios.prelims}
              broadcast="UFC Fight Pass"
              lutas={prelims}
              evento_id={evento.id}
            />
          )}

          {activeTab === 'early' && early_prelims.length > 0 && (
            <FightCardSection
              title="Early Prelims"
              icon="bolt"
              horario={horarios.early_prelims}
              broadcast="UFC Fight Pass"
              lutas={early_prelims}
              evento_id={evento.id}
            />
          )}
        </div>

        {/* Attribution */}
        <footer className="mt-12 pt-8 border-t border-dark-border text-center">
          <p className="text-xs text-dark-textMuted">
            Dados de eventos: UFC.com | Atualizado diariamente
          </p>
        </footer>
      </main>
    </div>
  );
}
