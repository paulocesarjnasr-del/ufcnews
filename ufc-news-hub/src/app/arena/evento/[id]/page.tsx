'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';

import { LutaCard } from '@/components/arena/LutaCard';
import { Countdown } from '@/components/calendario/Countdown';
import { OndeAssistir } from '@/components/calendario/OndeAssistir';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import type { EventoComLutas, Previsao } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EventoArenaPage({ params }: PageProps) {
  const { id } = use(params);
  const [evento, setEvento] = useState<EventoComLutas | null>(null);
  const [userPrevisoes, setUserPrevisoes] = useState<Record<string, Previsao>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { usuario, isAuthenticated } = useArenaAuth();

  useEffect(() => {
    fetchEvento();
  }, [id]);

  const fetchUserPrevisoes = useCallback(async () => {
    if (!isAuthenticated || !evento) return;
    try {
      const res = await fetch(`/api/arena/previsoes?evento_id=${id}`);
      if (res.ok) {
        const data = await res.json();
        const previsoes: Record<string, Previsao> = {};
        if (data.previsoes) {
          for (const p of data.previsoes) {
            previsoes[p.luta_id] = {
              ...p,
              lutador_escolhido_id: p.vencedor_previsto_id ?? p.lutador_escolhido_id,
              usuario_fingerprint: p.usuario_id ?? '',
              usuario_nome: usuario?.username ?? '',
            };
          }
        }
        setUserPrevisoes(previsoes);
      }
    } catch (error) {
      console.error('Erro ao buscar previsoes:', error);
    }
  }, [isAuthenticated, evento, id, usuario]);

  useEffect(() => {
    if (isAuthenticated && evento) {
      fetchUserPrevisoes();
    }
  }, [isAuthenticated, evento, fetchUserPrevisoes]);

  async function fetchEvento() {
    try {
      const res = await fetch(`/api/eventos/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEvento(data);
      }
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handlePrevisaoSubmit = (previsao: Previsao) => {
    setUserPrevisoes((prev) => ({
      ...prev,
      [previsao.luta_id]: previsao,
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-dark-card rounded" />
          <div className="h-32 bg-dark-card rounded" />
          <div className="h-48 bg-dark-card rounded" />
        </div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="font-display text-2xl text-dark-text">
          Evento nao encontrado
        </h1>
        <Link
          href="/arena"
          className="mt-4 inline-block text-ufc-red hover:text-ufc-redLight"
        >
          ← Voltar para Arena
        </Link>
      </div>
    );
  }

  const dataEvento = new Date(evento.data_evento);
  const isPast = dataEvento < new Date();
  const isLive = evento.status === 'ao_vivo';

  // Agrupar lutas por tipo
  const lutasPorTipo = {
    main: evento.lutas.filter(
      (l) => l.tipo === 'main_event' || l.tipo === 'co_main'
    ),
    principal: evento.lutas.filter((l) => l.tipo === 'card_principal'),
    preliminar: evento.lutas.filter(
      (l) => l.tipo === 'preliminar' || l.tipo === 'early_prelim'
    ),
  };

  // Calcular stats de previsoes do usuario
  const totalPrevisoes = Object.keys(userPrevisoes).length;
  const totalLutas = evento.lutas.length;
  const previsoesFeitas = evento.lutas.filter(
    (l) => userPrevisoes[l.id]
  ).length;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-dark-border bg-gradient-to-b from-ufc-red/10 to-transparent">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-dark-textMuted">
            <Link href="/arena" className="hover:text-ufc-red">
              Arena
            </Link>
            <span>/</span>
            <span className="text-dark-text">{evento.nome}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              {/* Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`rounded px-2 py-1 text-xs font-bold uppercase ${
                    evento.tipo === 'PPV'
                      ? 'bg-ufc-red text-white'
                      : 'bg-dark-border text-dark-textMuted'
                  }`}
                >
                  {evento.tipo}
                </span>
                {isLive && (
                  <span className="flex items-center gap-1 rounded bg-ufc-red px-2 py-1 text-xs font-bold uppercase text-white">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                    </span>
                    AO VIVO
                  </span>
                )}
                {evento.status === 'finalizado' && (
                  <span className="rounded bg-dark-border px-2 py-1 text-xs font-bold uppercase text-dark-textMuted">
                    FINALIZADO
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl uppercase text-dark-text md:text-4xl">
                {evento.nome}
              </h1>

              <div className="mt-2 space-y-1 text-dark-textMuted">
                <p>
                  {dataEvento.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  {' - '}
                  {dataEvento.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  (horario de Brasilia)
                </p>
                {evento.local_evento && (
                  <p>
                    {evento.local_evento}
                    {evento.cidade && `, ${evento.cidade}`}
                    {evento.pais && ` - ${evento.pais}`}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <OndeAssistir
                  ondeAssistir={evento.onde_assistir}
                  tipo={evento.tipo}
                />
              </div>
            </div>

            {/* Countdown ou Stats */}
            <div className="md:text-right">
              {!isPast && evento.status === 'agendado' && (
                <div className="inline-block rounded-lg border border-dark-border bg-dark-card p-4">
                  <Countdown targetDate={evento.data_evento} />
                </div>
              )}

              {/* Stats de previsoes */}
              {totalPrevisoes > 0 && (
                <div className="mt-4 rounded-lg border border-ufc-red/50 bg-ufc-red/5 p-4">
                  <p className="text-sm text-dark-textMuted">Suas previsoes</p>
                  <p className="font-display text-2xl text-ufc-red">
                    {previsoesFeitas}/{totalLutas}
                  </p>
                  {previsoesFeitas < totalLutas && (
                    <p className="text-xs text-dark-textMuted mt-1">
                      Faltam {totalLutas - previsoesFeitas} previsoes
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Main Card */}
        {lutasPorTipo.main.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 font-display text-xl uppercase text-ufc-red">
              Main Card
            </h2>
            <div className="space-y-4">
              {lutasPorTipo.main.map((luta) => (
                <LutaCard
                  key={luta.id}
                  luta={luta}
                  userPrevisao={userPrevisoes[luta.id]}
                  fingerprint={usuario?.id || ''}
                  userName={usuario?.username || ''}
                  onPrevisaoSubmit={handlePrevisaoSubmit}
                  showForm={isAuthenticated && evento.status === 'agendado'}
                />
              ))}
            </div>
          </section>
        )}

        {/* Card Principal */}
        {lutasPorTipo.principal.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 font-display text-xl uppercase text-dark-text">
              Card Principal
            </h2>
            <div className="space-y-4">
              {lutasPorTipo.principal.map((luta) => (
                <LutaCard
                  key={luta.id}
                  luta={luta}
                  userPrevisao={userPrevisoes[luta.id]}
                  fingerprint={usuario?.id || ''}
                  userName={usuario?.username || ''}
                  onPrevisaoSubmit={handlePrevisaoSubmit}
                  showForm={isAuthenticated && evento.status === 'agendado'}
                />
              ))}
            </div>
          </section>
        )}

        {/* Preliminares */}
        {lutasPorTipo.preliminar.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-xl uppercase text-dark-textMuted">
              Preliminares
            </h2>
            <div className="space-y-4">
              {lutasPorTipo.preliminar.map((luta) => (
                <LutaCard
                  key={luta.id}
                  luta={luta}
                  userPrevisao={userPrevisoes[luta.id]}
                  fingerprint={usuario?.id || ''}
                  userName={usuario?.username || ''}
                  onPrevisaoSubmit={handlePrevisaoSubmit}
                  showForm={isAuthenticated && evento.status === 'agendado'}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
