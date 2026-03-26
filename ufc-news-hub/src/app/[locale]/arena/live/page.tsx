'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import { Calendar, MapPin, ChevronRight, ArrowLeft, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LiveResultCard } from '@/components/arena/LiveResultCard';
import { LiveLeaderboard } from '@/components/arena/LiveLeaderboard';
import { LiveCurrentFight } from '@/components/arena/LiveCurrentFight';
import { LiveChat } from '@/components/arena/LiveChat';

// ═══════════════════════════════════════════════════════════════
// Pick Result Overlay — GTA style
// ═══════════════════════════════════════════════════════════════

function PickResultOverlay({ type, onDone }: { type: 'win' | 'lose'; onDone: () => void }) {
  const t = useTranslations('arena');

  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (type === 'win') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none animate-fade-in">
        {/* Green radial glow */}
        <div className="absolute inset-0 bg-gradient-radial from-green-500/20 via-transparent to-transparent" />
        <div className="text-center animate-pick-result-bounce">
          <p className="font-display text-5xl sm:text-7xl uppercase tracking-widest text-green-400 drop-shadow-[0_0_40px_rgba(34,197,94,0.8)]">
            {t('live_overlay_win_line1')}
          </p>
          <p className="font-display text-6xl sm:text-8xl uppercase tracking-widest text-green-300 mt-2 animate-pulse drop-shadow-[0_0_60px_rgba(34,197,94,1)]">
            {t('live_overlay_win_line2')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none animate-fade-in">
      {/* Red desaturated overlay like GTA Wasted */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-red-900/20 mix-blend-multiply" />
      <div className="text-center animate-pick-result-slide">
        <p className="font-display text-5xl sm:text-8xl uppercase tracking-[0.3em] text-red-500 drop-shadow-[0_0_50px_rgba(210,10,10,0.9)]"
           style={{ textShadow: '0 0 30px rgba(210,10,10,0.8), 0 0 60px rgba(210,10,10,0.4), 0 4px 0 rgba(0,0,0,0.5)' }}>
          {t('live_overlay_lose')}
        </p>
      </div>
    </div>
  );
}
import { FloatingReactions } from '@/components/arena/FloatingReactions';
import { useProximoEvento } from '@/hooks/useProximoEvento';
import { useArenaAuth } from '@/hooks/useArenaAuth';

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
  lutador1_foto: string | null;
  lutador2_foto: string | null;
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

function useCountdown(targetDate: string | undefined, soonLabel = '...') {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!targetDate) return;
    function calc() {
      const diff = new Date(targetDate!).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft(soonLabel); return; }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${d}d ${h}h ${m}m`);
    }
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [targetDate, soonLabel]);

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
  const t = useTranslations('arena');
  const { isAuthenticated, usuario } = useArenaAuth();

  // Smart fetching: SWR polls while ao_vivo, caches forever when finalizado
  const { data, error, isValidating } = useSWR<LiveData>(
    `/api/arena/live?evento_id=${eventoId}`,
    fetcher,
    {
      refreshInterval: (latestData: LiveData | undefined) => {
        if (latestData?.evento?.status === 'finalizado') return 0;
        return 5000; // 5s polling while live — fast updates for peak moment
      },
      revalidateOnFocus: true,
      dedupingInterval: 2000,
    }
  );

  // Track last update time for visual feedback
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  useEffect(() => {
    if (data) setLastUpdated(new Date());
  }, [data?.lutas_finalizadas, data?.leaderboard]);

  // ── Pick result overlay (GTA style) ──
  // Uses previous data comparison (ref) + sessionStorage to survive remounts.
  // Only shows overlay when acertou_vencedor transitions from null → true/false
  // between consecutive SWR polls — never on first load or remount.
  const [pickOverlay, setPickOverlay] = useState<'win' | 'lose' | null>(null);
  const prevLutasRef = useRef<Map<string, boolean | null> | null>(null);
  const isFirstFetchRef = useRef(true);
  const dismissOverlay = useCallback(() => setPickOverlay(null), []);

  useEffect(() => {
    if (!data?.lutas) return;

    // Build current state: luta_id → acertou_vencedor (null if unsettled)
    const currentState = new Map<string, boolean | null>();
    for (const luta of data.lutas) {
      if (!luta.userPick) continue;
      currentState.set(luta.luta_id, luta.userPick.acertou_vencedor);
    }

    // Load sessionStorage on first render to know what was already shown
    const storageKey = `overlay_shown_${eventoId}`;
    let alreadyShown: Set<string>;
    try {
      alreadyShown = new Set(JSON.parse(sessionStorage.getItem(storageKey) || '[]') as string[]);
    } catch {
      alreadyShown = new Set();
    }

    // First fetch: just save baseline, don't show anything
    if (isFirstFetchRef.current) {
      isFirstFetchRef.current = false;
      prevLutasRef.current = currentState;
      return;
    }

    // Subsequent polls: compare with previous state
    const prevState = prevLutasRef.current;
    if (prevState) {
      for (const [lutaId, acertou] of currentState) {
        if (acertou === null) continue; // not settled yet
        if (alreadyShown.has(lutaId)) continue; // already showed overlay this session
        const prevValue = prevState.get(lutaId);
        // Transition: null/undefined → true/false = result JUST came in
        if (prevValue === null || prevValue === undefined) {
          setPickOverlay(acertou ? 'win' : 'lose');
          alreadyShown.add(lutaId);
          try { sessionStorage.setItem(storageKey, JSON.stringify([...alreadyShown])); } catch { /* noop */ }
          break; // one at a time
        }
      }
    }

    // Update baseline for next poll
    prevLutasRef.current = currentState;
  }, [data?.lutas, eventoId]);

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
  // ordem no banco: 14=first prelim (happens first), 1=main event (happens last)
  const currentFight = useMemo(() => {
    if (!data?.lutas) return null;
    // 1. If a fight is live, show it
    const live = data.lutas.find(l => l.status === 'ao_vivo');
    if (live) return live;
    // 2. Show the most recently finished fight (lowest ordem = latest chronologically)
    const finished = [...data.lutas]
      .filter(l => l.status === 'finalizada')
      .sort((a, b) => a.ordem - b.ordem);
    if (finished.length > 0) return finished[0];
    // 3. Show the next upcoming fight (highest ordem = next chronologically)
    const upcoming = [...data.lutas]
      .filter(l => l.status !== 'finalizada')
      .sort((a, b) => b.ordem - a.ordem);
    return upcoming[0] ?? null;
  }, [data?.lutas]);

  // Live order: finished fights first (most recent on top), then upcoming in chronological order
  // Chronological = lowest ordem first (prelims happen before main event)
  const sortedLutas = useMemo(() => {
    if (!data?.lutas) return [];
    const finished = [...data.lutas].filter(l => l.status === 'finalizada').sort((a, b) => b.ordem - a.ordem);
    const live = [...data.lutas].filter(l => l.status === 'ao_vivo');
    const upcoming = [...data.lutas].filter(l => l.status !== 'finalizada' && l.status !== 'ao_vivo').sort((a, b) => a.ordem - b.ordem);
    return [...finished, ...live, ...upcoming];
  }, [data?.lutas]);

  if (!data && !error) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-dark-textMuted">{t('live_loading')}</p>
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
      {/* GTA-style pick result overlay */}
      {pickOverlay && <PickResultOverlay type={pickOverlay} onDone={dismissOverlay} />}

      {/* Back button (when viewing a past event) */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1.5 text-sm text-dark-textMuted hover:text-dark-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('live_back')}
        </button>
      )}

      {/* AO VIVO banner */}
      {isLive && (
        <div className="flex items-center justify-center gap-2 py-2 bg-ufc-red rounded-xl mb-4">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
          <span className="font-display text-lg uppercase text-white tracking-widest">{t('live')}</span>
          <span className="text-white/60 text-sm">&middot; {lutas_finalizadas}/{totalLutas} {t('fights')}</span>
          {isValidating && (
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-white/50 animate-pulse" />
          )}
          {lastUpdated && (
            <span className="text-white/40 text-xs ml-auto">
              {lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
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
                    {t('live')}
                  </span>
                </div>
              ) : isFinished ? (
                <div className="flex shrink-0 items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5">
                  <span className="font-display text-sm font-bold uppercase tracking-widest text-green-400">
                    {t('finished')}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs text-dark-textMuted">
                <span>
                  {t('live_fights_finished', { done: lutas_finalizadas, total: totalLutas })}
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

          {/* Fight cards — chronological order (prelims first → main event last) */}
          <section className="space-y-3">
            {sortedLutas.filter(l => !currentFight || l.luta_id !== currentFight.luta_id).map(luta => (
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

          {/* Leaderboard with header */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-ufc-red" />
              <h2 className="font-display text-lg uppercase tracking-wide text-dark-text">
                {t('ranking')} <span className="text-ufc-red">{t('live')}</span>
              </h2>
            </div>
            <LiveLeaderboard leaderboard={leaderboard} meuUsuarioId={usuario_id} movimentos={movimentos} />
          </section>
        </div>

        {/* Right column: Chat sidebar + Reactions */}
        <div className="lg:col-span-1 mt-5 lg:mt-0 lg:sticky lg:top-4 lg:self-start space-y-3">
          <FloatingReactions
            currentFight={currentFight}
            eventoId={eventoId}
            isAuthenticated={isAuthenticated}
            username={usuario?.username}
          />
          <LiveChat eventoId={eventoId} ligaId={liga?.id} ligaNome={liga?.nome} currentUserId={usuario?.id} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// No live event → show countdown + recent events
// ═══════════════════════════════════════════════════════════════

function NoEventView({ onSelectEvento }: { onSelectEvento: (id: string) => void }) {
  const t = useTranslations('arena');
  const { evento, isLoading: proximoLoading } = useProximoEvento();
  const countdown = useCountdown(evento?.data_evento, t('live_coming_soon'));

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
          {t('live_no_event_now')}
        </h2>
        {proximoLoading ? (
          <div className="h-8 w-48 mx-auto bg-dark-card animate-pulse rounded" />
        ) : evento ? (
          <>
            <p className="mb-1 text-sm text-dark-textMuted">{t('live_next_event')}:</p>
            <p className="font-semibold text-ufc-gold">{evento.nome}</p>
            <p className="mt-3 font-display text-3xl tabular-nums text-ufc-red">
              {countdown}
            </p>
          </>
        ) : (
          <p className="text-sm text-dark-textMuted">
            {t('live_no_event_scheduled')}
          </p>
        )}
      </div>

      {/* Recent finalized events */}
      {recentes.length > 0 && (
        <section>
          <h3 className="mb-3 font-display text-sm uppercase tracking-wide text-dark-textMuted">
            {t('live_recent_events')}
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
                        {t('live_fights_finished', { done: ev.lutas_finalizadas, total: ev.total_lutas })}
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
  const t = useTranslations('arena');
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

  // Detect if event time has passed — show live view even if status hasn't transitioned yet
  const eventTimePassed = evento?.data_evento
    ? new Date(evento.data_evento).getTime() <= Date.now()
    : false;
  const shouldShowLive = (isAoVivo || eventTimePassed) && evento;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-dark-textMuted">{t('live_loading')}</p>
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

  // Live event happening now (or event time passed, waiting for status transition)
  if (shouldShowLive) {
    return <EventResultView eventoId={evento.id} liga={liga} />;
  }

  // No live event → show countdown + recent events
  return <NoEventView onSelectEvento={setSelectedEventoId} />;
}
