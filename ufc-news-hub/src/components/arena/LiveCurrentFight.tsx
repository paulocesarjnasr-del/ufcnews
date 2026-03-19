'use client';

import { Zap, CheckCircle2, XCircle, Clock, Trophy } from 'lucide-react';
import { sobrenome } from '@/components/arena/shared';

interface UserPick {
  vencedor_previsto_id: string;
  acertou_vencedor: boolean | null;
  pontos_ganhos: number;
}

interface LiveLuta {
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

interface LiveCurrentFightProps {
  luta: LiveLuta;
}

function tipoLabel(tipo: string): string {
  const map: Record<string, string> = {
    main_event: 'MAIN EVENT', co_main: 'CO-MAIN', card_principal: 'MAIN CARD',
    preliminar: 'PRELIMINAR', early_prelim: 'EARLY PRELIM',
  };
  return map[tipo] ?? tipo.toUpperCase();
}

export function LiveCurrentFight({ luta }: LiveCurrentFightProps) {
  const isLive = luta.status === 'ao_vivo';
  const isFinished = luta.status === 'finalizada';
  const isNext = !isLive && !isFinished;
  const pick = luta.userPick;

  const winnerIs1 = luta.vencedor_id === luta.lutador1_id;
  const winnerIs2 = luta.vencedor_id === luta.lutador2_id;

  const pickName = pick
    ? pick.vencedor_previsto_id === luta.lutador1_id
      ? sobrenome(luta.lutador1_nome)
      : sobrenome(luta.lutador2_nome)
    : null;

  const pickCorrect = pick?.acertou_vencedor === true;
  const pickWrong = pick?.acertou_vencedor === false;
  const pickPending = pick?.acertou_vencedor === null;

  // ── Outer card state classes ──────────────────────────────────────────────
  const cardBase =
    'relative overflow-hidden rounded-2xl backdrop-blur-md animate-slide-in-up';

  const cardStateClasses = isLive
    ? `${cardBase} border-2 animate-glow-red-border bg-gradient-to-br from-[#1a0505] via-[#120202] to-[#0a0a0a]`
    : isFinished
    ? `${cardBase} border border-white/10 bg-gradient-to-br from-[#050f05] via-[#090f09] to-[#0a0a0a]`
    : `${cardBase} border border-white/[0.06] bg-gradient-to-br from-[#101010] to-[#0a0a0a]`;

  return (
    <div className={cardStateClasses}>

      {/* Live: red ambient glow overlay */}
      {isLive && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(210,10,10,0.18) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Finished: green shimmer overlay (one-shot flash) */}
      {isFinished && (
        <div
          className="pointer-events-none absolute inset-0 animate-flash-result rounded-2xl"
        />
      )}

      <div className="relative z-10 p-5 space-y-5">

        {/* ── Header row: fight type + status badge ── */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[11px] font-display tracking-[0.2em] uppercase ${
              isLive ? 'text-ufc-red' : isFinished ? 'text-green-400/70' : 'text-white/30'
            }`}
          >
            {tipoLabel(luta.tipo)}
          </span>

          {isLive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-ufc-red shadow-[0_0_16px_rgba(210,10,10,0.5)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <span className="text-[11px] font-black text-white uppercase tracking-widest">
                EM ANDAMENTO
              </span>
            </div>
          )}

          {isFinished && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30">
              <Trophy className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[11px] font-bold text-green-400 uppercase tracking-widest">
                Finalizada
              </span>
            </div>
          )}

          {isNext && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07]">
              <Clock className="w-3 h-3 text-white/25" />
              <span className="text-[10px] font-bold text-white/25 uppercase tracking-widest">
                Proxima
              </span>
            </div>
          )}
        </div>

        {/* ── Fighter names + VS divider ── */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Fighter 1 */}
          <div
            className={`flex-1 text-center transition-all duration-500 ${
              isFinished && !winnerIs1 ? 'opacity-30 grayscale' : ''
            }`}
          >
            <div
              className={`font-display text-2xl sm:text-3xl uppercase leading-tight tracking-wide ${
                isFinished && winnerIs1
                  ? 'text-green-300'
                  : isLive
                  ? 'text-white'
                  : 'text-white/70'
              }`}
              style={
                isLive
                  ? { textShadow: '0 0 20px rgba(210,10,10,0.4)' }
                  : isFinished && winnerIs1
                  ? { textShadow: '0 0 20px rgba(34,197,94,0.35)' }
                  : undefined
              }
            >
              {sobrenome(luta.lutador1_nome)}
            </div>
            {isFinished && winnerIs1 && (
              <div className="mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                  Vencedor
                </span>
              </div>
            )}
          </div>

          {/* VS divider */}
          <div className="flex flex-col items-center shrink-0 gap-1">
            {isLive ? (
              <>
                <div
                  className="w-px h-5 bg-gradient-to-b from-transparent to-ufc-red/60"
                />
                <div
                  className="w-6 h-6 rotate-45 bg-ufc-red shadow-[0_0_12px_rgba(210,10,10,0.6)] flex items-center justify-center animate-pulse-red"
                  style={{ clipPath: 'none' }}
                />
                <div
                  className="w-px h-5 bg-gradient-to-t from-transparent to-ufc-red/60"
                />
              </>
            ) : (
              <span className="font-display text-sm text-white/15 tracking-widest">VS</span>
            )}
          </div>

          {/* Fighter 2 */}
          <div
            className={`flex-1 text-center transition-all duration-500 ${
              isFinished && !winnerIs2 ? 'opacity-30 grayscale' : ''
            }`}
          >
            <div
              className={`font-display text-2xl sm:text-3xl uppercase leading-tight tracking-wide ${
                isFinished && winnerIs2
                  ? 'text-green-300'
                  : isLive
                  ? 'text-white'
                  : 'text-white/70'
              }`}
              style={
                isLive
                  ? { textShadow: '0 0 20px rgba(210,10,10,0.4)' }
                  : isFinished && winnerIs2
                  ? { textShadow: '0 0 20px rgba(34,197,94,0.35)' }
                  : undefined
              }
            >
              {sobrenome(luta.lutador2_nome)}
            </div>
            {isFinished && winnerIs2 && (
              <div className="mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                  Vencedor
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Result method + round ── */}
        {isFinished && luta.metodo && (
          <div className="text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs text-white/50 font-medium tracking-wide">
              {luta.metodo}
              {luta.round_final ? (
                <span className="ml-2 text-white/30">R{luta.round_final}</span>
              ) : null}
            </span>
          </div>
        )}

        {/* ── Divider ── */}
        <div
          className={`h-px w-full ${
            isLive
              ? 'bg-gradient-to-r from-transparent via-ufc-red/30 to-transparent'
              : 'bg-gradient-to-r from-transparent via-white/[0.07] to-transparent'
          }`}
        />

        {/* ── User pick section ── */}
        {pick ? (
          <div
            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all ${
              pickCorrect
                ? 'bg-green-500/10 border-green-500/25 shadow-[0_0_16px_rgba(34,197,94,0.08)]'
                : pickWrong
                ? 'bg-red-900/10 border-red-500/20'
                : isLive
                ? 'bg-ufc-red/5 border-ufc-red/20'
                : 'bg-white/[0.03] border-white/[0.07]'
            }`}
          >
            {/* Icon */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                pickCorrect
                  ? 'bg-green-500/20'
                  : pickWrong
                  ? 'bg-red-500/15'
                  : 'bg-white/[0.06]'
              }`}
            >
              {pickCorrect ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : pickWrong ? (
                <XCircle className="w-4 h-4 text-red-400" />
              ) : (
                <Zap
                  className={`w-4 h-4 ${isLive ? 'text-ufc-red' : 'text-white/30'}`}
                />
              )}
            </div>

            {/* Pick info */}
            <div className="flex-1 min-w-0">
              <div
                className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${
                  pickCorrect
                    ? 'text-green-400/70'
                    : pickWrong
                    ? 'text-red-400/60'
                    : 'text-white/30'
                }`}
              >
                Seu Pick
              </div>
              <div
                className={`font-display text-base uppercase tracking-wide truncate ${
                  pickCorrect
                    ? 'text-green-300'
                    : pickWrong
                    ? 'text-red-400'
                    : isLive
                    ? 'text-white'
                    : 'text-white/60'
                }`}
              >
                {pickName}
              </div>
            </div>

            {/* Points badge */}
            {pickCorrect && (
              <div className="shrink-0 flex flex-col items-end">
                <span className="font-display text-xl text-green-300 leading-tight">
                  +{pick.pontos_ganhos}
                </span>
                <span className="text-[9px] text-green-400/60 uppercase tracking-widest">pts</span>
              </div>
            )}
            {pickWrong && (
              <div className="shrink-0">
                <span className="font-display text-lg text-red-400/60 leading-tight">0 pts</span>
              </div>
            )}
            {pickPending && (
              <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white/30" />
                </span>
                <span className="text-[9px] text-white/30 uppercase tracking-widest">Live</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2">
            <Zap className="w-3.5 h-3.5 text-white/15" />
            <span className="text-xs text-white/20 italic">Sem pick para esta luta</span>
          </div>
        )}
      </div>
    </div>
  );
}
