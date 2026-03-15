'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, Target, Clock, Pencil, Share2, ChevronLeft, Check, X, ExternalLink, Users, Lock } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import type { EventoComLutas, LutaComLutadores } from '@/types';

// ═══════════════════════════════════════════════════════════
// Types & Helpers
// ═══════════════════════════════════════════════════════════

interface PageProps { params: Promise<{ id: string }> }

interface PickData {
  vencedor_id: string;
  metodo?: string;
  round?: number;
}

const tipoOrder: Record<string, number> = {
  main_event: 0, co_main: 1, card_principal: 2, preliminar: 3, early_prelim: 4,
};

function sortLutas(lutas: LutaComLutadores[]): LutaComLutadores[] {
  return [...lutas].sort((a, b) => (tipoOrder[a.tipo] ?? 5) - (tipoOrder[b.tipo] ?? 5));
}

function sobrenome(nome: string): string {
  return nome.split(' ').pop() ?? nome;
}

function tipoLabel(tipo: string): string {
  const map: Record<string, string> = {
    main_event: 'MAIN EVENT', co_main: 'CO-MAIN', card_principal: 'MAIN CARD',
    preliminar: 'PRELIMINAR', early_prelim: 'EARLY PRELIM',
  };
  return map[tipo] ?? tipo.toUpperCase();
}

function metodoLabel(m: string): string {
  if (m === 'Decision - Unanimous') return 'Decisao Unanime';
  if (m === 'Decision - Split') return 'Decisao Dividida';
  if (m === 'Submission') return 'Finalizacao';
  return m;
}

function maxPontos(picks: Record<string, PickData>): number {
  let total = 0;
  for (const p of Object.values(picks)) {
    if (!p.vencedor_id) continue;
    total += 100;
    if (p.metodo) total += 50;
    if (p.round) total += 50;
  }
  return total;
}

// ═══════════════════════════════════════════════════════════
// Ticker — scrolling fight insights
// ═══════════════════════════════════════════════════════════

function generateTickerMessages(lutas: LutaComLutadores[], picks: Record<string, PickData>): string[] {
  const msgs: string[] = [];
  const sorted = sortLutas(lutas);

  for (const luta of sorted.slice(0, 6)) {
    const f1 = luta.lutador1;
    const f2 = luta.lutador2;
    const s1 = sobrenome(f1.nome);
    const s2 = sobrenome(f2.nome);
    const pick = picks[luta.id];

    if (f1.derrotas === 0 && (f1.vitorias ?? 0) >= 5) {
      msgs.push(`${s1} esta INVICTO com ${f1.vitorias} vitorias`);
    }
    if (f2.derrotas === 0 && (f2.vitorias ?? 0) >= 5) {
      msgs.push(`${s2} esta INVICTO com ${f2.vitorias} vitorias`);
    }
    if (luta.tipo === 'main_event') {
      msgs.push(`MAIN EVENT: ${s1} vs ${s2}`);
    }
    if (f1.derrotas === 0 && f2.derrotas === 0 && (f1.vitorias ?? 0) >= 3 && (f2.vitorias ?? 0) >= 3) {
      msgs.push(`INVICTO vs INVICTO: ${s1} (${f1.vitorias}-0) encara ${s2} (${f2.vitorias}-0)`);
    }

    // Pick-aware messages
    if (pick?.vencedor_id) {
      const consenso = luta.consenso?.find(c => c.lutador_escolhido_id === pick.vencedor_id);
      if (consenso && consenso.percentual) {
        const pct = Math.round(consenso.percentual);
        const picked = pick.vencedor_id === f1.id ? s1 : s2;
        if (pct >= 65) {
          msgs.push(`Voce e ${pct}% da comunidade escolheram ${picked}`);
        } else if (pct <= 35) {
          msgs.push(`Aposta ousada! So ${pct}% escolheram ${picked} como voce`);
        }
      }
    }
  }

  msgs.push(`Seus picks estao salvos — agora eh so esperar a noite de luta`);
  const unique = [...new Set(msgs)];
  return unique.slice(0, 10);
}

function FightTicker({ lutas, picks }: { lutas: LutaComLutadores[]; picks: Record<string, PickData> }) {
  const messages = generateTickerMessages(lutas, picks);
  if (messages.length === 0) return null;

  const totalChars = messages.reduce((sum, msg) => sum + msg.length, 0);
  const avgCharsPerMsg = totalChars / messages.length;
  const secsPerMsg = (avgCharsPerMsg / 13) + 1.5;
  const duration = Math.round(secsPerMsg * messages.length);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `tickerScroll ${duration}s linear infinite`, width: 'max-content' }}
      >
        {[0, 1].map(copy => (
          <div key={copy} className="flex shrink-0">
            {messages.map((msg, i) => (
              <span key={`${copy}-${i}`} className="inline-flex items-center px-5 py-2.5 text-sm text-white/70">
                {msg}
                <span className="ml-5 text-ufc-red/30">|</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PickCard — individual pick display with consensus
// ═══════════════════════════════════════════════════════════

const METODOS = [
  { key: 'KO/TKO', label: 'KO/TKO' },
  { key: 'Submission', label: 'Finalizacao' },
  { key: 'Decision - Unanimous', label: 'Decisao' },
];

function getMaxRounds(luta: LutaComLutadores): number {
  return luta.tipo === 'main_event' || luta.tipo === 'co_main' || luta.is_titulo ? 5 : 3;
}

function PickCard({
  luta,
  pick,
  onUpdate,
  locked = false,
}: {
  luta: LutaComLutadores;
  pick: PickData | undefined;
  onUpdate: (lutaId: string, newPick: PickData) => void;
  locked?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const vencedorId = pick?.vencedor_id;
  const isMain = luta.tipo === 'main_event' || luta.tipo === 'co_main';
  const isFinished = luta.status === 'finalizada';
  const realVencedorId = (luta as unknown as { vencedor_id?: string }).vencedor_id;

  if (!vencedorId) {
    return (
      <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-4">
        <div className="text-sm text-white/30 text-center">
          {sobrenome(luta.lutador1.nome)} vs {sobrenome(luta.lutador2.nome)} — sem pick
        </div>
      </div>
    );
  }

  const vencedor = vencedorId === luta.lutador1.id ? luta.lutador1 : luta.lutador2;
  const perdedor = vencedorId === luta.lutador1.id ? luta.lutador2 : luta.lutador1;

  // Consensus comparison
  const consenso = luta.consenso?.find(c => c.lutador_escolhido_id === vencedorId);
  const consensoPct = consenso?.percentual ? Math.round(consenso.percentual) : null;
  const isFavorite = consensoPct !== null && consensoPct >= 50;
  const isUnderdog = consensoPct !== null && consensoPct < 50;

  // Live/finished result
  const acertou = isFinished && realVencedorId === vencedorId;
  const errou = isFinished && realVencedorId && realVencedorId !== vencedorId;

  return (
    <div className={`rounded-xl border backdrop-blur-sm p-4 transition-all ${
      acertou ? 'bg-green-500/10 border-green-500/30' :
      errou ? 'bg-red-500/10 border-red-500/30' :
      isMain ? 'bg-ufc-red/5 border-ufc-red/20' :
      'bg-black/30 border-white/10'
    }`}>
      {/* Type badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[9px] font-display uppercase tracking-widest ${isMain ? 'text-ufc-red' : 'text-white/25'}`}>
          {tipoLabel(luta.tipo)}
        </span>
        {luta.is_titulo && (
          <span className="text-[9px] text-ufc-gold font-bold uppercase bg-ufc-gold/10 border border-ufc-gold/20 px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <Trophy className="w-2.5 h-2.5" /> Titulo
          </span>
        )}
        {acertou && (
          <span className="flex items-center gap-1 text-[9px] text-green-400 font-bold uppercase">
            <Check className="w-3 h-3" /> Acertou
          </span>
        )}
        {errou && (
          <span className="flex items-center gap-1 text-[9px] text-red-400 font-bold uppercase">
            <X className="w-3 h-3" /> Errou
          </span>
        )}
      </div>

      {/* Fighters */}
      <div className="flex items-center gap-3">
        {/* Winner (picked) — larger */}
        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shrink-0 ${
          acertou ? 'border-green-500' : errou ? 'border-red-500/50' : 'border-ufc-red/60'
        }`}>
          {vencedor.imagem_url ? (
            <Image src={vencedor.imagem_url} alt={vencedor.nome} width={48} height={48} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-[10px] font-display text-white/30">
              {sobrenome(vencedor.nome).slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white truncate">
            {sobrenome(vencedor.nome)} <span className="text-white/25 font-normal">vence {sobrenome(perdedor.nome)}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {pick.metodo ? (
              <span className="text-[10px] text-ufc-red/80 bg-ufc-red/10 px-2 py-0.5 rounded-full">
                {metodoLabel(pick.metodo)}
              </span>
            ) : (
              <span className="text-[10px] text-white/20">vitoria simples</span>
            )}
            {pick.round && (
              <span className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                Round {pick.round}
              </span>
            )}
            {/* Points this pick is worth */}
            <span className="text-[10px] text-ufc-gold/60">
              {100 + (pick.metodo ? 50 : 0) + (pick.round ? 50 : 0)} pts
            </span>
          </div>
        </div>

        {/* Loser photo — smaller, dimmed */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 opacity-30">
          {perdedor.imagem_url ? (
            <Image src={perdedor.imagem_url} alt={perdedor.nome} width={32} height={32} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/5 text-[8px] font-display text-white/30">
              {sobrenome(perdedor.nome).slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Consensus bar */}
      {consensoPct !== null && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className={isUnderdog ? 'text-ufc-gold/70' : 'text-white/30'}>
              {isUnderdog ? 'Aposta ousada!' : isFavorite ? 'Com a maioria' : ''}
            </span>
            <span className="text-white/25">{consensoPct}% da comunidade</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full ${isUnderdog ? 'bg-ufc-gold/50' : 'bg-ufc-red/40'}`}
              style={{ width: `${consensoPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Edit button + inline editor */}
      {!isFinished && !locked && (
        <div className="mt-3 pt-3 border-t border-white/5">
          {!editing ? (
            <div className="flex items-center justify-between">
              <Link
                href="/analises"
                className="flex items-center gap-1 text-[10px] text-white/20 hover:text-ufc-red transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Ver analise
              </Link>
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 text-[10px] text-white/30 hover:text-ufc-red transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
              >
                <Pencil className="w-3 h-3" />
                Editar
              </button>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              {/* Swap vencedor */}
              <div>
                <div className="text-[9px] text-white/30 font-display uppercase tracking-widest mb-2">Vencedor</div>
                <div className="grid grid-cols-2 gap-2">
                  {[luta.lutador1, luta.lutador2].map(lutador => {
                    const isSelected = vencedorId === lutador.id;
                    return (
                      <button
                        key={lutador.id}
                        onClick={() => onUpdate(luta.id, { ...pick!, vencedor_id: lutador.id })}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all text-left ${
                          isSelected
                            ? 'bg-ufc-red/15 border border-ufc-red/50'
                            : 'bg-white/5 border border-transparent hover:border-white/15'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-full overflow-hidden shrink-0 border ${isSelected ? 'border-ufc-red' : 'border-white/10'}`}>
                          {lutador.imagem_url ? (
                            <Image src={lutador.imagem_url} alt={lutador.nome} width={28} height={28} className="w-full h-full object-cover object-top" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/5 text-[8px] font-display text-white/30">
                              {sobrenome(lutador.nome).slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <span className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-white/40'}`}>
                          {sobrenome(lutador.nome)}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-ufc-red ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Metodo */}
              <div>
                <div className="text-[9px] text-white/30 font-display uppercase tracking-widest mb-2">
                  Como? <span className="text-ufc-gold/50">(+50 pts)</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {METODOS.map(m => (
                    <button
                      key={m.key}
                      onClick={() => onUpdate(luta.id, {
                        ...pick!,
                        metodo: pick?.metodo === m.key ? undefined : m.key,
                        round: pick?.metodo === m.key ? undefined : pick?.round,
                      })}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                        pick?.metodo === m.key
                          ? 'bg-ufc-red text-white'
                          : 'bg-white/5 text-white/30 hover:text-white/50'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Round — only for KO/TKO and Submission */}
              {(pick?.metodo === 'KO/TKO' || pick?.metodo === 'Submission') && (
                <div>
                  <div className="text-[9px] text-white/30 font-display uppercase tracking-widest mb-2">
                    Round <span className="text-ufc-gold/50">(+50 pts)</span>
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: getMaxRounds(luta) }, (_, i) => i + 1).map(r => (
                      <button
                        key={r}
                        onClick={() => onUpdate(luta.id, { ...pick!, round: pick?.round === r ? undefined : r })}
                        className={`w-8 h-8 rounded-full text-[10px] font-display transition-all ${
                          pick?.round === r
                            ? 'bg-ufc-red text-white'
                            : 'bg-white/5 text-white/30 hover:text-white/50'
                        }`}
                      >
                        R{r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setEditing(false)}
                className="w-full py-2 rounded-lg bg-white/5 text-[11px] text-white/40 hover:text-white/70 transition-colors"
              >
                Fechar edição
              </button>
            </div>
          )}
        </div>
      )}

      {/* Analysis link for finished fights */}
      {isFinished && (
        <Link
          href="/analises"
          className="flex items-center gap-1 mt-3 text-[10px] text-white/20 hover:text-ufc-red transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Ver analise desta luta
        </Link>
      )}
    </div>
  );
}

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
  const [isLoading, setIsLoading] = useState(true);

  // Load evento + picks in parallel
  useEffect(() => {
    async function load() {
      try {
        const [eventoRes, picksRes, ligasRes] = await Promise.all([
          fetch(`/api/eventos/${id}`),
          isAuthenticated ? fetch(`/api/arena/previsoes?evento_id=${id}`) : Promise.resolve(null),
          isAuthenticated ? fetch('/api/arena/ligas?tipo=minhas&limit=10') : Promise.resolve(null),
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

  const sortedLutas = sortLutas(evento.lutas);
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

        {/* Ticker */}
        <div className="px-4 mb-5">
          <FightTicker lutas={sortedLutas} picks={picks} />
        </div>

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
          <div className="space-y-3 pt-4">
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
