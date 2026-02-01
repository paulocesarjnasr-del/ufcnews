'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/ui/Header';
import EventoHero from '@/components/calendario/EventoHero';
import EventoCardEnhanced from '@/components/calendario/EventoCardEnhanced';

type TabType = 'proximos' | 'resultados';

interface EventoResumo {
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
  total_lutas: number;
}

interface MesEventos {
  ano: number;
  mes: number;
  nome_mes: string;
  eventos: EventoResumo[];
}

interface MainEventFighter {
  id: string;
  nome: string;
  apelido?: string | null;
  imagem_url?: string | null;
  pais?: string | null;
  vitorias?: number;
  derrotas?: number;
  empates?: number;
}

interface MainEvent {
  id: string;
  categoria_peso: string;
  is_titulo: boolean;
  rounds: number;
  lutador1: MainEventFighter;
  lutador2: MainEventFighter;
}

interface ProximoEvento {
  id: string;
  nome: string;
  slug: string;
  data_evento: string;
  local_evento?: string;
  cidade?: string;
  pais?: string;
  tipo?: string;
  status?: string;
  imagem_url?: string | null;
  poster_url?: string | null;
  main_event?: MainEvent | null;
}

interface CalendarioResponse {
  proximo_evento: ProximoEvento | null;
  eventos_futuros: MesEventos[];
  eventos_passados: MesEventos[];
  total_futuros: number;
  total_passados: number;
  total_eventos: number;
}

export default function CalendarioPage() {
  const [data, setData] = useState<CalendarioResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('proximos');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await fetch('/api/eventos/calendario');

      if (res.ok) {
        const responseData = await res.json();
        setData(responseData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const tabs = [
    {
      id: 'proximos' as TabType,
      label: 'Próximos Eventos',
      count: data?.total_futuros || 0,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'resultados' as TabType,
      label: 'Resultados',
      count: data?.total_passados || 0,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const currentMeses = activeTab === 'proximos' ? data?.eventos_futuros : data?.eventos_passados;

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero com proximo evento - só mostra na aba de próximos */}
        {data?.proximo_evento && activeTab === 'proximos' && (
          <EventoHero
            evento={data.proximo_evento}
            main_event={data.proximo_evento.main_event}
          />
        )}

        {/* Page header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl uppercase text-white">
              Calendário UFC
            </h1>
            <p className="mt-1 text-dark-textMuted">
              {activeTab === 'proximos'
                ? `${data?.total_futuros || 0} eventos agendados`
                : `${data?.total_passados || 0} eventos finalizados`
              }
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-dark-card rounded-xl p-1.5 border border-dark-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? 'bg-ufc-red text-white shadow-lg shadow-ufc-red/30'
                    : 'text-dark-textMuted hover:text-white hover:bg-dark-cardHover'
                  }
                `}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`
                  ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                  ${activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-dark-border text-dark-textMuted'
                  }
                `}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl bg-dark-card border border-dark-border overflow-hidden"
              >
                <div className="aspect-[4/3] bg-dark-border" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-dark-border rounded w-3/4" />
                  <div className="h-4 bg-dark-border rounded w-1/2" />
                  <div className="h-4 bg-dark-border rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events by month */}
        {!isLoading && currentMeses && currentMeses.length > 0 && (
          <div className="space-y-10">
            {currentMeses.map((mes) => (
              <section key={`${mes.ano}-${mes.mes}`} className="animate-fade-in">
                {/* Month header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent" />
                  <h2 className="font-display text-xl md:text-2xl uppercase text-white flex items-center gap-2">
                    <span className="text-ufc-red">{mes.nome_mes}</span>
                    <span className="text-dark-textMuted">{mes.ano}</span>
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dark-border to-transparent" />
                </div>

                {/* Events grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mes.eventos.map((evento, index) => (
                    <div
                      key={evento.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <EventoCardEnhanced
                        evento={evento}
                        showCountdown={evento.status === 'agendado'}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!currentMeses || currentMeses.length === 0) && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-card border border-dark-border flex items-center justify-center">
              <svg className="w-8 h-8 text-dark-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-dark-textMuted mb-6">
              {activeTab === 'proximos'
                ? 'Não há eventos agendados no momento.'
                : 'Não há eventos finalizados para mostrar.'
              }
            </p>
            {activeTab === 'resultados' && (
              <button
                onClick={() => setActiveTab('proximos')}
                className="px-6 py-3 bg-ufc-red hover:bg-ufc-redDark text-white font-medium rounded-lg transition-colors"
              >
                Ver próximos eventos
              </button>
            )}
          </div>
        )}

        {/* Attribution */}
        <footer className="pt-8 border-t border-dark-border text-center">
          <p className="text-xs text-dark-textMuted">
            Dados de eventos: UFC.com | Atualizado diariamente
          </p>
        </footer>
      </main>
    </div>
  );
}
