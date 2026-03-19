'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Target, Clock, Share2, ChevronLeft, Users, Lock } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import type { EventoComLutas, LutaComLutadores } from '@/types';
import { PickCard } from '@/components/arena/PickCard';
import { type PickData, sortLutas, maxPontos } from '@/components/arena/picks-shared';

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

interface PageProps { params: Promise<{ id: string }> }

// ═══════════════════════════════════════════════════════════
// Share button
// ═══════════════════════════════════════════════════════════

function ShareButton({ eventoNome, picks, totalLutas }: { eventoNome: string; picks: Record<string, PickData>; totalLutas: number }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const picksCount = Object.values(picks).filter(p => p.vencedor_id).length;
    const text = `Fiz ${picksCount}/${totalLutas} previsoes para ${eventoNome} na Arena UFC! Faca as suas tambem.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `Arena UFC — ${eventoNome}`, text, url: window.location.href });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/40 hover:text-white/70 hover:bg-white/10 transition-all"
    >
      <Share2 className="w-3.5 h-3.5" />
      {copied ? 'Link copiado!' : 'Compartilhar meus picks'}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════

export default function MeusPicksPage({ params }: PageProps) {
  const { id } = use(params);
  const { isAuthenticated } = useArenaAuth();

  interface MinhaLiga {
    id: string;
    nome: string;
    total_membros: number;
    codigo_convite: string | null;
  }

  const [evento, setEvento] = useState<EventoComLutas | null>(null);
  const [picks, setPicks] = useState<Record<string, PickData>>({});
  const [minhasLigas, setMinhasLigas] = useState<MinhaLiga[]>([]);
  const [totalParticipantes, setTotalParticipantes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load evento + picks in parallel
  useEffect(() => {
    async function load() {
      try {
        const [eventoRes, picksRes, ligasRes, rankingRes] = await Promise.all([
          fetch(`/api/eventos/${id}`),
          isAuthenticated ? fetch(`/api/arena/previsoes?evento_id=${id}`) : Promise.resolve(null),
          isAuthenticated ? fetch('/api/arena/ligas?tipo=minhas&limit=10') : Promise.resolve(null),
          fetch('/api/arena/analytics/ranking?limit=1'),
        ]);

        if (eventoRes.ok) {
          setEvento(await eventoRes.json() as EventoComLutas);
        }

        if (picksRes?.ok) {
          const data: unknown = await picksRes.json();
          const arr = Array.isArray(data)
            ? (data as Array<Record<string, unknown>>)
            : ((data as { previsoes?: Array<Record<string, unknown>> }).previsoes ?? []);
          const p: Record<string, PickData> = {};
          for (const item of arr) {
            const lutaId = typeof item.luta_id === 'string' ? item.luta_id : null;
            const vencedorId = typeof item.vencedor_previsto_id === 'string' ? item.vencedor_previsto_id : null;
            if (!lutaId || !vencedorId) continue;
            p[lutaId] = {
              vencedor_id: vencedorId,
              metodo: typeof item.metodo_previsto === 'string' ? item.metodo_previsto : undefined,
              round: typeof item.round_previsto === 'number' ? item.round_previsto : undefined,
            };
          }
          setPicks(p);
        }

        if (ligasRes?.ok) {
          const ligasData: unknown = await ligasRes.json();
          const ligasArr = (ligasData as { ligas?: MinhaLiga[] }).ligas ?? [];
          setMinhasLigas(ligasArr);
        }

        if (rankingRes.ok) {
          const rankData: unknown = await rankingRes.json();
          const tp = (rankData as { total_participantes?: number }).total_participantes;
          if (tp) setTotalParticipantes(tp);
        }
      } catch { /* silent */ }
      setIsLoading(false);
    }
    load();
  }, [id, isAuthenticated]);

  // Update pick: save to BD + update local state (header recalculates automatically)
  const handleUpdatePick = useCallback(async (lutaId: string, newPick: PickData) => {
    // Optimistic update — header stats recalculate instantly via maxPontos(picks)
    setPicks(prev => ({ ...prev, [lutaId]: newPick }));

    // Save to BD via existing API
    try {
      await fetch('/api/arena/previsoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previsoes: [{
            luta_id: lutaId,
            vencedor_previsto_id: newPick.vencedor_id,
            pontos_confianca: 100,
            ...(newPick.metodo ? { metodo_previsto: newPick.metodo } : {}),
            ...(newPick.round ? { round_previsto: newPick.round } : {}),
          }],
        }),
      });
    } catch { /* silent — optimistic update already applied */ }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Clock className="w-6 h-6 text-ufc-red animate-spin" />
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <p className="font-display text-2xl text-white/40 uppercase">Evento nao encontrado</p>
        <Link href="/arena" className="text-ufc-red hover:underline text-sm">← Voltar</Link>
      </div>
    );
  }

  const sortedLutas = sortLutas(evento.lutas) as LutaComLutadores[];
  const totalLutas = sortedLutas.length;
  const picksCount = Object.values(picks).filter(p => p.vencedor_id).length;
  const pontos = maxPontos(picks);
  const posterUrl = (evento as EventoComLutas & { poster_url?: string }).poster_url ?? evento.imagem_url;

  const isLive = evento.status === 'ao_vivo';
  const isFinished = evento.status === 'finalizado';

  // Deadline: 1h before event
  const deadlineMs = new Date(evento.data_evento).getTime() - 3600000;
  const isLocked = Date.now() >= deadlineMs || isLive || isFinished;
  const deadlineDate = new Date(deadlineMs);

  // Group by type
  const mainLutas = sortedLutas.filter(l => l.tipo === 'main_event' || l.tipo === 'co_main');
  const principalLutas = sortedLutas.filter(l => l.tipo === 'card_principal');
  const prelimLutas = sortedLutas.filter(l => l.tipo === 'preliminar' || l.tipo === 'early_prelim');

  return (
    <div className="relative min-h-screen">
      {/* Poster background — fixed */}
      {posterUrl && (
        <div className="fixed inset-0 z-0">
          <Image src={posterUrl} alt="" fill className="object-cover object-top" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/95" />
        </div>
      )}
      {!posterUrl && <div className="fixed inset-0 z-0 bg-octagon-grid" />}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="px-4 pt-3 pb-2">
          <Link
            href={`/arena/evento/${id}`}
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar ao evento
          </Link>
        </div>

        {/* Stats hero — replaces event name/countdown */}
        <div className="px-4 pb-4">
          <div className="max-w-md mx-auto rounded-xl bg-black/40 backdrop-blur-md border border-white/10 p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Trophy className="w-5 h-5 text-ufc-gold mx-auto mb-1.5" />
                <div className="font-display text-2xl text-ufc-gold">{pontos.toLocaleString()}</div>
                <div className="text-[9px] text-white/30 uppercase tracking-widest">Pts possiveis</div>
              </div>
              <div>
                <Target className="w-5 h-5 text-green-400 mx-auto mb-1.5" />
                <div className="font-display text-2xl text-green-400">{picksCount}/{totalLutas}</div>
                <div className="text-[9px] text-white/30 uppercase tracking-widest">Picks</div>
              </div>
              <div>
                <Trophy className="w-5 h-5 text-ufc-red mx-auto mb-1.5" />
                <div className="font-display text-2xl text-ufc-red">
                  {Object.values(picks).filter(p => p.metodo).length}
                </div>
                <div className="text-[9px] text-white/30 uppercase tracking-widest">Com metodo</div>
              </div>
            </div>
            {/* Live badge inside stats if live */}
            {isLive && (
              <div className="flex justify-center mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-ufc-red">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span className="text-xs font-bold text-white uppercase">Ao Vivo</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Competition confirmation */}
        {picksCount > 0 && totalParticipantes > 0 && (
          <div className="px-4 mb-4 max-w-md mx-auto">
            <div className="rounded-xl bg-ufc-red/5 border border-ufc-red/20 p-4 flex items-center gap-3">
              <Users className="w-5 h-5 text-ufc-red shrink-0" />
              <p className="text-sm text-white/60">
                Voce esta competindo com{' '}
                <span className="text-white font-semibold">{totalParticipantes} usuarios</span>{' '}
                neste evento. Ranking atualiza ao vivo durante o card.
              </p>
            </div>
          </div>
        )}

        {/* Deadline + Ligas section */}
        <div className="px-4 mb-5 max-w-md mx-auto space-y-3">
          {/* Deadline notice */}
          {!isLocked && (
            <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex items-center gap-3">
              <Clock className="w-4 h-4 text-ufc-gold shrink-0" />
              <div className="text-xs text-white/50">
                Edicoes abertas ate{' '}
                <span className="text-white font-semibold">
                  {deadlineDate.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })}{' '}
                  {deadlineDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
                {' '}(1h antes do evento)
              </div>
            </div>
          )}
          {isLocked && !isFinished && (
            <div className="rounded-xl bg-ufc-red/5 border border-ufc-red/20 p-3 flex items-center gap-3">
              <Lock className="w-4 h-4 text-ufc-red shrink-0" />
              <div className="text-xs text-white/50">
                Edicoes encerradas — {isLive ? 'evento ao vivo' : 'deadline passou'}
              </div>
            </div>
          )}

          {/* Ligas do usuario */}
          {minhasLigas.length > 0 && (
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-ufc-gold" />
                <span className="text-xs font-display uppercase tracking-widest text-white/40">Suas Ligas</span>
              </div>
              <div className="space-y-2">
                {minhasLigas.map(liga => (
                  <Link
                    key={liga.id}
                    href={`/arena/ligas/${liga.id}`}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Trophy className="w-3.5 h-3.5 text-ufc-gold shrink-0" />
                      <span className="text-sm text-white truncate">{liga.nome}</span>
                    </div>
                    <span className="text-[10px] text-white/25 shrink-0">{liga.total_membros} membros</span>
                  </Link>
                ))}
              </div>
              <div className="text-[10px] text-white/20 text-center">
                Seus picks valem automaticamente em todas as suas ligas
              </div>
            </div>
          )}

          {/* Criar liga CTA if no leagues */}
          {minhasLigas.length === 0 && (
            <Link
              href="/arena/ligas/criar"
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-ufc-gold/30 transition-colors text-xs text-white/40 hover:text-ufc-gold"
            >
              <Users className="w-3.5 h-3.5" />
              Crie uma liga e desafie amigos — seus picks valem la tambem
            </Link>
          )}
        </div>

        {/* Picks by section */}
        <div className="px-4 pb-8 max-w-md mx-auto space-y-6">

          {/* Main Card */}
          {mainLutas.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-ufc-red/20" />
                <span className="text-[10px] font-display uppercase tracking-[0.2em] text-ufc-red/50">Main Card</span>
                <div className="h-px flex-1 bg-ufc-red/20" />
              </div>
              <div className="space-y-3">
                {mainLutas.map(luta => <PickCard key={luta.id} luta={luta} pick={picks[luta.id]} onUpdate={handleUpdatePick} locked={isLocked} />)}
              </div>
            </section>
          )}

          {/* Card Principal */}
          {principalLutas.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-display uppercase tracking-[0.2em] text-white/25">Card Principal</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="space-y-3">
                {principalLutas.map(luta => <PickCard key={luta.id} luta={luta} pick={picks[luta.id]} onUpdate={handleUpdatePick} locked={isLocked} />)}
              </div>
            </section>
          )}

          {/* Preliminares */}
          {prelimLutas.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-display uppercase tracking-[0.2em] text-white/20">Preliminares</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="space-y-3">
                {prelimLutas.map(luta => <PickCard key={luta.id} luta={luta} pick={picks[luta.id]} onUpdate={handleUpdatePick} locked={isLocked} />)}
              </div>
            </section>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-6">
            <Link
              href="/arena"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-ufc-red hover:bg-ufc-redLight text-white font-display uppercase tracking-wide rounded-xl transition-all text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar para Home
            </Link>

            <ShareButton eventoNome={evento.nome} picks={picks} totalLutas={totalLutas} />

            <Link
              href="/arena/ligas"
              className="block text-center text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Desafie amigos em uma liga →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
