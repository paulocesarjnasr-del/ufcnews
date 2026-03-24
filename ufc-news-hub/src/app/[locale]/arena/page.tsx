'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight, Clock } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { useEventoPicks } from '@/hooks/useEventoPicks';
import { HomeNew } from '@/components/arena/HomeNew';
import { HomeInProgress } from '@/components/arena/HomeInProgress';
import { HomeComplete } from '@/components/arena/HomeComplete';
import { OctagonTexture, Countdown, EventoNome, FightPreview, sortLutas, type Evento } from '@/components/arena/shared';

// ═══════════════════════════════════════════════════════════
// LANDING (not logged in)
// ═══════════════════════════════════════════════════════════

function HomeLanding({ evento }: { evento: Evento | null }) {
  const topLutas = evento ? sortLutas(evento.lutas).slice(0, 4) : [];

  return (
    <OctagonTexture posterUrl={evento?.poster_url} className={evento?.poster_url ? 'min-h-[85vh] sm:min-h-screen' : ''}>
      <div className={`container mx-auto px-4 ${evento?.poster_url ? 'flex flex-col justify-center min-h-[85vh] sm:min-h-screen' : 'py-12 sm:py-20'}`}>
        <div className="max-w-lg mx-auto text-center space-y-8 w-full">

          {/* Event as protagonist */}
          {evento ? (
            <div className="space-y-5">
              <EventoNome nome={evento.nome} />
              <div className="text-xs text-dark-textMuted tracking-wide">
                {evento.local}
              </div>
              <div className="flex justify-center">
                <Countdown targetDate={evento.data_evento} />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h1 className="font-display text-4xl uppercase text-white">
                Arena <span className="text-ufc-red">UFC</span>
              </h1>
              <p className="text-dark-textMuted">
                Nenhum evento agendado no momento.
              </p>
            </div>
          )}

          {/* Single CTA */}
          <div className="space-y-3">
            <Link
              href="/arena/registro"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-ufc-red hover:bg-ufc-redLight text-white font-display text-lg uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-ufc-red/20 hover:shadow-ufc-red/40"
            >
              <Zap className="w-5 h-5" />
              Fazer Meus Palpites
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="text-sm text-dark-textMuted">
              Ja tem conta?{' '}
              <Link href="/arena/login" className="text-ufc-red hover:underline">
                Entrar na Arena
              </Link>
            </div>
          </div>

          {/* How it works — 3 steps */}
          <div className="grid grid-cols-3 gap-3 pt-10">
            {[
              { num: '01', title: 'Preveja', desc: 'Quem vai vencer cada luta', color: 'text-ufc-red' },
              { num: '02', title: 'Pontue', desc: 'Acertos viram pontos e XP', color: 'text-ufc-gold' },
              { num: '03', title: 'Domine', desc: 'Suba no ranking e ganhe titulos', color: 'text-green-400' },
            ].map(step => (
              <div key={step.num} className="text-center space-y-1.5">
                <div className={`font-display text-2xl ${step.color}`}>{step.num}</div>
                <div className="font-display text-sm uppercase text-white">{step.title}</div>
                <div className="text-[11px] text-dark-textMuted leading-tight">{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Fight preview */}
          {topLutas.length > 0 && (
            <div className="neu-card p-4 text-left">
              <div className="text-[10px] font-display uppercase tracking-widest text-dark-textMuted mb-3">
                Card Principal
              </div>
              {topLutas.map(luta => (
                <FightPreview key={luta.id} luta={luta} />
              ))}
              {evento && evento.lutas.length > 4 && (
                <div className="text-center mt-3">
                  <span className="text-xs text-dark-textMuted">
                    + {evento.lutas.length - 4} lutas no card
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </OctagonTexture>
  );
}

// ═══════════════════════════════════════════════════════════
// HOME LOGADO — thin 3-state controller
// ═══════════════════════════════════════════════════════════

function HomeLogado({ evento }: { evento: Evento | null }) {
  const { usuario } = useArenaAuth();
  const { picks, picksLoading } = useEventoPicks(evento?.id);

  if (!usuario || picksLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Clock className="w-6 h-6 text-ufc-red animate-spin" />
      </div>
    );
  }

  const isNew = (usuario.total_previsoes ?? 0) === 0;
  const totalLutas = evento?.lutas?.length ?? 0;
  const picksCount = Object.keys(picks).length;
  const allDone = totalLutas > 0 && picksCount >= totalLutas;

  if (isNew) return <HomeNew evento={evento} />;
  if (allDone) return <HomeComplete evento={evento} picks={picks} />;
  return <HomeInProgress evento={evento} picks={picks} picksCount={picksCount} totalLutas={totalLutas} />;
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════

export default function ArenaPage() {
  const { isAuthenticated, isLoading } = useArenaAuth();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [eventoLoading, setEventoLoading] = useState(true);

  useEffect(() => {
    async function fetchEvento() {
      try {
        const res = await fetch('/api/eventos/proximo?include_live=true');
        if (res.ok) {
          const data: unknown = await res.json();
          setEvento(data as Evento);
        }
      } catch { /* silent */ }
      setEventoLoading(false);
    }
    fetchEvento();
  }, []);

  if (isLoading || eventoLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Clock className="w-6 h-6 text-ufc-red animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <HomeLanding evento={evento} />;
  }

  return <HomeLogado evento={evento} />;
}
