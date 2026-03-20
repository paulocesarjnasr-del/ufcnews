'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { Calendar, MapPin, ChevronRight, ArrowLeft, Trophy, Clock, Check } from 'lucide-react';
import { LiveResultCard } from '@/components/arena/LiveResultCard';
import { LiveLeaderboard } from '@/components/arena/LiveLeaderboard';
import { LiveCurrentFight } from '@/components/arena/LiveCurrentFight';
import { LiveChat } from '@/components/arena/LiveChat';
import { FloatingReactions } from '@/components/arena/FloatingReactions';
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

interface EventoRecente {
  id: string;
  nome: string;
  data_evento: string;
  local_evento: string | null;
  total_lutas: number;
  lutas_finalizadas: number;
}

const fetcher = (url: string) => fetch(url).then(r => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
});

// ═══════════════════════════════════════════════════════════════
// Countdown helper
// ═══════════════════════════════════════════════════════════════

function useCountdown(targetDate: string | undefined) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!targetDate) return;
    function calc() {
      const diff = new Date(targetDate!).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Em breve'); return; }
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
// Event result view (works for BOTH live and finalized)
// ═══════════════════════════════════════════════════════════════

function EventResultView({
  eventoId,
  onBack,
  liga,
}: {
  eventoId: string;
  onBack?: () => void;
  liga: { id: string; nome: string } | null;
}) {
  // Smart fetching: SWR polls while ao_vivo, caches forever when finalizado
  const { data, error } = useSWR<LiveData>(
    `/api/arena/live?evento_id=${eventoId}`,
    fetcher,
    {
      refreshInterval: (latestData: LiveData | undefined) => {
        // Stop polling when event is finalized — data is immutable
        if (latestData?.evento?.status === 'finalizado') return 0;
        return 15000; // 15s polling while live
      },
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  // ── Ranking movement tracking ──
  const prevPositions = useRef<Map<string, number>>(new Map());
  const [movimentos, setMovimentos] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!data?.leaderboard) return;
    const newMovimentos: Record<string, number> = {};
    data.leaderboard.forEach((entry, i) => {
      const pos = i + 1;
      const prev = prevPositions.current.get(entry.usuario_id);
      if (prev !== undefined && prev !== pos) {
        newMovimentos[entry.usuario_id] = prev - pos;
      }
    });
    const newMap = new Map<string, number>();
    data.leaderboard.forEach((entry, i) => newMap.set(entry.usuario_id, i + 1));
    prevPositions.current = newMap;
    if (Object.keys(newMovimentos).length > 0) setMovimentos(newMovimentos);
  }, [data?.leaderboard]);

  // ── Current fight selection ──
  const currentFight = useMemo(() => {
    if (!data?.lutas) return null;
    const live = data.lutas.find(l => l.status === 'ao_vivo');
    if (live) return live;
    const finished = [...data.lutas]
      .filter(l => l.status === 'finalizada')
      .sort((a, b) => b.ordem - a.ordem);
    if (finished.length > 0) return finished[0];
    const upcoming = [...data.lutas]
      .filter(l => l.status !== 'finalizada')
      .sort((a, b) => a.ordem - b.ordem);
    return upcoming[0] ?? null;
  }, [data?.lutas]);

  // Status-first sort: ao_vivo → agendada → finalizada (must be before early returns)
  const sortedLutas = useMemo(() => {
    if (!data?.lutas) return [];
    return [...data.lutas].sort((a, b) => {
      const statusOrder: Record<string, number> = { ao_vivo: 0, agendada: 1, finalizada: 2 };
      const statusDiff = (statusOrder[a.status] ?? 1) - (statusOrder[b.status] ?? 1);
      if (statusDiff !== 0) return statusDiff;
      // ordem no banco: main_event=1, prelims=7-14. DESC = prelims primeiro (ordem real do evento)
      return b.ordem - a.ordem;
    });
  }, [data?.lutas]);

  if (!data && !error) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-dark-textMuted">Carregando...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="neu-card rounded-lg p-6 text-center">
          <p className="text-red-400">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { lutas, leaderboard, lutas_finalizadas, usuario_id } = data;
  const totalLutas = lutas.length;
  const isLive = data.evento.status === 'ao_vivo';
  const isFinished = data.evento.status === 'finalizado';

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Back button (when viewing a past event) */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 text-sm text-dark-textMuted hover:text-dark-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
      )}

      {/* AO VIVO banner */}
      {isLive && (
        <div className="flex items-center justify-center gap-2 py-2 bg-ufc-red rounded-xl mb-4">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
          <span className="font-display text-lg uppercase text-white tracking-widest">Ao Vivo</span>
          <span className="text-white/60 text-sm">&middot; {lutas_finalizadas}/{totalLutas} lutas</span>
        </div>
      )}

      {/* 2-column grid: content + chat sidebar */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        {/* Left column: event content */}
        <div className="lg:col-span-2 space-y-5">
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
              {/* Status badge */}
              {isLive ? (
                <div className="flex shrink-0 items-center gap-2 rounded-full bg-ufc-red/10 px-3 py-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ufc-red opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ufc-red" />
                  </span>
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-ufc-red">
                    Ao Vivo
                  </span>
                </div>
              ) : isFinished ? (
                <div className="flex shrink-0 items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5">
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-green-400">
                    Finalizado
                  </span>
                </div>
              ) : null}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs text-dark-textMuted">
                <span>
                  {lutas_finalizadas}/{totalLutas} lutas finalizadas
                </span>
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

          {/* Current fight spotlight */}
          {currentFight && <LiveCurrentFight luta={currentFight} />}

          {/* Fight result cards — grouped by status */}
          <section className="space-y-6">
            {(() => {
              const aoVivo = sortedLutas.filter(l => l.status === 'ao_vivo');
              const proximas = sortedLutas.filter(l => l.status === 'agendada');
              const finalizadas = sortedLutas.filter(l => l.status === 'finalizada');

              return (
                <>
                  {aoVivo.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ufc-red opacity-75" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ufc-red" />
                        </span>
                        <span className="text-sm font-display uppercase tracking-widest text-ufc-red">Ao Vivo</span>
                      </div>
                      {aoVivo.map(luta => (
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
                    </div>
                  )}
                  {proximas.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-display uppercase tracking-widest text-amber-400/70">Proximas</span>
                      </div>
                      {proximas.map(luta => (
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
                    </div>
                  )}
                  {finalizadas.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-display uppercase tracking-widest text-green-500/70">Finalizadas</span>
                      </div>
                      {finalizadas.map(luta => (
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
                    </div>
                  )}
                </>
              );
            })()}
          </section>

          {/* Leaderboard with header */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-ufc-red" />
              <h2 className="font-display text-lg uppercase tracking-wide text-dark-text">
                Ranking <span className="text-ufc-red">Ao Vivo</span>
              </h2>
            </div>
            <LiveLeaderboard leaderboard={leaderboard} meuUsuarioId={usuario_id} movimentos={movimentos} />
          </section>
        </div>

        {/* Right column: Chat sidebar + Reactions */}
        <div className="lg:col-span-1 mt-5 lg:mt-0 lg:sticky lg:top-4 lg:self-start space-y-3">
          <FloatingReactions />
          <LiveChat eventoId={eventoId} ligaId={liga?.id} ligaNome={liga?.nome} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// No live event → show countdown + recent events
// ═══════════════════════════════════════════════════════════════

function NoEventView({ onSelectEvento }: { onSelectEvento: (id: string) => void }) {
  const { evento, isLoading: proximoLoading } = useProximoEvento();
  const countdown = useCountdown(evento?.data_evento);

  // Fetch recent finalized events (immutable — won't re-fetch)
  const { data: recentData } = useSWRImmutable<{ eventos_recentes: EventoRecente[] }>(
    '/api/arena/live',
    fetcher
  );

  const recentes = recentData?.eventos_recentes ?? [];

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-8">
      {/* Countdown card */}
      <div className="neu-card rounded-xl p-8 text-center">
        <div className="mb-4 text-5xl">🥊</div>
        <h2 className="mb-2 font-display text-2xl uppercase text-dark-text">
          Nenhum evento ao vivo agora
        </h2>
        {proximoLoading ? (
          <div className="h-8 w-48 mx-auto bg-dark-card animate-pulse rounded" />
        ) : evento ? (
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

      {/* Recent finalized events */}
      {recentes.length > 0 && (
        <section>
          <h3 className="mb-3 font-display text-sm uppercase tracking-wide text-dark-textMuted">
            Eventos Recentes
          </h3>
          <div className="space-y-3">
            {recentes.map((ev) => {
              const date = new Date(ev.data_evento);
              return (
                <button
                  key={ev.id}
                  onClick={() => onSelectEvento(ev.id)}
                  className="neu-card w-full rounded-lg p-4 text-left transition-all hover:border-ufc-red/30 hover:bg-ufc-red/5 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display text-base uppercase text-dark-text leading-tight group-hover:text-ufc-red transition-colors">
                        {ev.nome}
                      </h4>
                      <div className="mt-1.5 flex items-center gap-3 text-xs text-dark-textMuted">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {date.toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        {ev.local_evento && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {ev.local_evento}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-dark-textMuted">
                        {ev.lutas_finalizadas}/{ev.total_lutas} lutas finalizadas
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-dark-textMuted group-hover:text-ufc-red transition-colors shrink-0" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════

export default function ArenaLivePage() {
  const { evento, isAoVivo, isLoading } = useProximoEvento();
  const [selectedEventoId, setSelectedEventoId] = useState<string | null>(null);

  // Fetch user's active liga for chat tab support
  const [liga, setLiga] = useState<{ id: string; nome: string } | null>(null);

  useEffect(() => {
    fetch('/api/arena/ligas?tipo=minhas&limit=1')
      .then(r => r.ok ? r.json() : null)
      .then((d: { ligas?: Array<{ id: string; nome: string }> } | null) => {
        if (d?.ligas?.[0]) setLiga(d.ligas[0]);
      })
      .catch(() => {});
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-dark-textMuted">Carregando...</p>
      </div>
    );
  }

  // Viewing a specific past event's results
  if (selectedEventoId) {
    return (
      <EventResultView
        eventoId={selectedEventoId}
        onBack={() => setSelectedEventoId(null)}
        liga={liga}
      />
    );
  }

  // Live event happening now
  if (isAoVivo && evento) {
    return <EventResultView eventoId={evento.id} liga={liga} />;
  }

  // No live event → show countdown + recent events
  return <NoEventView onSelectEvento={setSelectedEventoId} />;
}
