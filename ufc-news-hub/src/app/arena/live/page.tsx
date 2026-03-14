'use client';

import { useEffect, useRef, useState } from 'react';
import { LiveResultCard } from '@/components/arena/LiveResultCard';
import { LiveLeaderboard } from '@/components/arena/LiveLeaderboard';
import { useProximoEvento } from '@/hooks/useProximoEvento';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

interface UserPick {
  vencedor_previsto_id: string;
  acertou_vencedor: boolean | null;
  pontos_ganhos: number;
}

interface Luta {
  luta_id: string;
  ordem: number;
  tipo: string;
  status: string;
  vencedor_id: string | null;
  metodo: string | null;
  round_final: number | null;
  lutador1_id: string;
  lutador1_nome: string;
  lutador2_id: string;
  lutador2_nome: string;
  userPick: UserPick | null;
}

interface LeaderboardEntry {
  usuario_id: string;
  username: string;
  display_name: string | null;
  pontos_totais: number;
  acertos: number;
  total_lutas: number;
}

interface EventInfo {
  id: string;
  nome: string;
  status: string;
  data_evento: string;
  local_evento: string | null;
}

interface LiveData {
  evento: EventInfo;
  lutas: Luta[];
  leaderboard: LeaderboardEntry[];
  lutas_finalizadas: number;
  usuario_id: string | null;
}

// ═══════════════════════════════════════════════════════════════
// Countdown helper
// ═══════════════════════════════════════════════════════════════

function useCountdown(targetDate: string | undefined) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!targetDate) return;

    function calc() {
      const diff = new Date(targetDate!).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('Em breve');
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${d}d ${h}h ${m}m`);
    }

    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// ═══════════════════════════════════════════════════════════════
// Not-live state
// ═══════════════════════════════════════════════════════════════

function NoEventView() {
  const { evento, isLoading } = useProximoEvento();
  const countdown = useCountdown(evento?.data_evento);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-dark-textMuted">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="neu-card max-w-sm rounded-xl p-8">
        <div className="mb-4 text-5xl">🥊</div>
        <h2 className="mb-2 font-display text-2xl uppercase text-dark-text">
          Nenhum evento ao vivo agora
        </h2>
        {evento ? (
          <>
            <p className="mb-1 text-sm text-dark-textMuted">Proximo evento:</p>
            <p className="font-semibold text-ufc-gold">{evento.nome}</p>
            <p className="mt-3 font-display text-3xl tabular-nums text-ufc-red">
              {countdown}
            </p>
          </>
        ) : (
          <p className="text-sm text-dark-textMuted">
            Nenhum evento agendado em breve.
          </p>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Live event view
// ═══════════════════════════════════════════════════════════════

function LiveEventView({ eventoId }: { eventoId: string }) {
  const [data, setData] = useState<LiveData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  async function fetchLive() {
    if (isPausedRef.current) return;
    try {
      const res = await fetch(`/api/arena/live?evento_id=${eventoId}`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as LiveData;
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    }
  }

  useEffect(() => {
    fetchLive();

    intervalRef.current = setInterval(fetchLive, 15000);

    function handleVisibility() {
      if (document.hidden) {
        isPausedRef.current = true;
      } else {
        isPausedRef.current = false;
        fetchLive();
      }
    }

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventoId]);

  if (!data && !error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-dark-textMuted">Carregando dados ao vivo...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="neu-card rounded-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchLive}
            className="neu-button mt-4 rounded-lg px-4 py-2 text-sm text-dark-text"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { lutas, leaderboard, lutas_finalizadas, usuario_id } = data;
  const totalLutas = lutas.length;

  // Sort: finalized first (by ordem desc), then pending
  const sortedLutas = [...lutas].sort((a, b) => {
    const aFinished = a.status === 'finalizada' ? 0 : 1;
    const bFinished = b.status === 'finalizada' ? 0 : 1;
    if (aFinished !== bFinished) return aFinished - bFinished;
    return b.ordem - a.ordem;
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
      {/* Event header */}
      <div className="neu-card rounded-xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-2xl uppercase leading-tight text-dark-text">
              {data.evento.nome}
            </h1>
            {data.evento.local_evento && (
              <p className="mt-1 text-sm text-dark-textMuted">
                {data.evento.local_evento}
              </p>
            )}
          </div>
          {/* AO VIVO badge with red pulse */}
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-ufc-red/10 px-3 py-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ufc-red opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ufc-red" />
            </span>
            <span className="font-display text-sm font-bold uppercase tracking-widest text-ufc-red">
              Ao Vivo
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs text-dark-textMuted">
            <span>
              {lutas_finalizadas}/{totalLutas} lutas finalizadas
            </span>
            {lastUpdated && (
              <span>
                Atualizado:{' '}
                {lastUpdated.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            )}
          </div>
          <div className="neu-inset h-2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-ufc-red transition-all duration-700"
              style={{
                width: totalLutas > 0 ? `${(lutas_finalizadas / totalLutas) * 100}%` : '0%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Fight result cards */}
      <section className="space-y-3">
        {sortedLutas.map((luta) => (
          <LiveResultCard
            key={luta.luta_id}
            lutador1_nome={luta.lutador1_nome}
            lutador2_nome={luta.lutador2_nome}
            vencedor_id={luta.vencedor_id}
            lutador1_id={luta.lutador1_id}
            lutador2_id={luta.lutador2_id}
            metodo={luta.metodo}
            round_final={luta.round_final}
            tipo={luta.tipo}
            status={luta.status}
            userPick={luta.userPick}
          />
        ))}
      </section>

      {/* Leaderboard */}
      <section>
        <LiveLeaderboard leaderboard={leaderboard} meuUsuarioId={usuario_id} />
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════

export default function ArenaLivePage() {
  const { evento, isAoVivo, isLoading } = useProximoEvento();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-dark-textMuted">Carregando...</p>
      </div>
    );
  }

  if (!isAoVivo || !evento) {
    return <NoEventView />;
  }

  return <LiveEventView eventoId={evento.id} />;
}
