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

function tipoColor(tipo: string): string {
  if (tipo === 'main_event') return 'text-red-500';
  if (tipo === 'co_main') return 'text-ufc-gold';
  return 'text-white/40';
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

  // ── Card glow per state ──────────────────────────────────────
  const cardShadow = isLive
    ? '0 0 30px rgba(210,10,10,0.25), 0 0 60px rgba(210,10,10,0.1), 0 0 80px rgba(59,130,246,0.05)'
    : isFinished
    ? '0 0 30px rgba(34,197,94,0.15), 0 0 60px rgba(34,197,94,0.06)'
    : '0 0 25px rgba(59,130,246,0.08), 0 0 50px rgba(59,130,246,0.04)';

  const borderColor = isLive
    ? 'border-red-500/40'
    : isFinished
    ? 'border-green-500/25'
    : 'border-white/10';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-zinc-900/90 backdrop-blur-sm ${borderColor} border transition-all duration-300 animate-slide-in-up bg-hex-pattern`}
      style={{ boxShadow: cardShadow }}
    >
      {/* Ambient glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: isLive
            ? 'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(210,10,10,0.18) 0%, rgba(210,10,10,0.05) 40%, transparent 65%)'
            : isFinished
            ? 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,197,94,0.1) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Live: scanline texture */}
      {isLive && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
          }}
        />
      )}

      {/* Finished: green flash animation */}
      {isFinished && (
        <div className="pointer-events-none absolute inset-0 animate-flash-result rounded-2xl" />
      )}

      <div className="relative z-10 p-5 space-y-5">

        {/* ── Header: fight type + status badge ── */}
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-black tracking-[0.2em] uppercase ${tipoColor(luta.tipo)}`}>
            {tipoLabel(luta.tipo)}
          </span>

          {isLive && (
            <button
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600"
              style={{ boxShadow: '0 0 15px rgba(220,38,38,0.5), 0 0 30px rgba(220,38,38,0.25)' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow-400" />
              </span>
              <span className="text-[11px] font-black text-white tracking-widest uppercase">
                AO VIVO
              </span>
            </button>
          )}

          {isFinished && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30"
              style={{ boxShadow: '0 0 12px rgba(34,197,94,0.15)' }}
            >
              <Trophy className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[11px] font-bold text-green-400 uppercase tracking-widest">
                Finalizada
              </span>
            </div>
          )}

          {isNext && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-transparent">
              <Clock className="w-3 h-3 text-white/30" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
                Proxima
              </span>
            </div>
          )}
        </div>

        {/* ── Fighter names + VS ── */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Fighter 1 */}
          <div
            className={`flex-1 text-center transition-all duration-500 ${
              isFinished && !winnerIs1 ? 'opacity-20 grayscale' : ''
            }`}
          >
            {isFinished && winnerIs1 && (
              <div className="mb-1.5 flex items-center justify-center">
                <span className="text-[9px] font-black text-green-400 uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm bg-green-500/15 border border-green-400/30">
                  VENCEDOR
                </span>
              </div>
            )}
            <div
              className={`font-display text-3xl sm:text-4xl uppercase leading-tight tracking-wide ${
                isFinished && winnerIs1
                  ? 'text-green-300'
                  : isLive
                  ? 'text-white'
                  : 'text-white/60'
              }`}
              style={
                isLive
                  ? { textShadow: '0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(210,10,10,0.2)' }
                  : isFinished && winnerIs1
                  ? { textShadow: '0 0 20px rgba(34,197,94,0.4)' }
                  : undefined
              }
            >
              {sobrenome(luta.lutador1_nome)}
            </div>
          </div>

          {/* VS divider */}
          <div className="flex flex-col items-center shrink-0 gap-0">
            {isLive ? (
              <>
                <div
                  className="w-px h-6"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(210,10,10,0.6))' }}
                />
                <div
                  className="w-8 h-8 rotate-45 bg-red-600 flex items-center justify-center"
                  style={{
                    boxShadow: '0 0 16px rgba(220,38,38,0.6), 0 0 32px rgba(220,38,38,0.3)',
                  }}
                >
                  <Zap className="-rotate-45 w-4 h-4 text-white fill-white" />
                </div>
                <div
                  className="w-px h-6"
                  style={{ background: 'linear-gradient(to top, transparent, rgba(210,10,10,0.6))' }}
                />
              </>
            ) : isFinished && luta.metodo ? (
              <div className="text-center">
                <div className="rounded-md bg-green-500/10 px-3 py-1.5 border border-green-500/20">
                  <p
                    className="text-xs font-black uppercase tracking-widest text-green-400 whitespace-nowrap"
                    style={{ textShadow: '0 0 6px rgba(34,197,94,0.3)' }}
                  >
                    {luta.metodo}
                  </p>
                  {luta.round_final != null && (
                    <p className="text-[10px] font-semibold text-green-400/50">R{luta.round_final}</p>
                  )}
                </div>
              </div>
            ) : (
              <span className="text-sm text-white/15 font-medium">vs</span>
            )}
          </div>

          {/* Fighter 2 */}
          <div
            className={`flex-1 text-center transition-all duration-500 ${
              isFinished && !winnerIs2 ? 'opacity-20 grayscale' : ''
            }`}
          >
            {isFinished && winnerIs2 && (
              <div className="mb-1.5 flex items-center justify-center">
                <span className="text-[9px] font-black text-green-400 uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm bg-green-500/15 border border-green-400/30">
                  VENCEDOR
                </span>
              </div>
            )}
            <div
              className={`font-display text-3xl sm:text-4xl uppercase leading-tight tracking-wide ${
                isFinished && winnerIs2
                  ? 'text-green-300'
                  : isLive
                  ? 'text-white'
                  : 'text-white/60'
              }`}
              style={
                isLive
                  ? { textShadow: '0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(210,10,10,0.2)' }
                  : isFinished && winnerIs2
                  ? { textShadow: '0 0 20px rgba(34,197,94,0.4)' }
                  : undefined
              }
            >
              {sobrenome(luta.lutador2_nome)}
            </div>
          </div>
        </div>

        {/* ── Gradient divider ── */}
        <div
          className="h-px w-full"
          style={{
            background: isLive
              ? 'linear-gradient(to right, transparent, rgba(210,10,10,0.4), transparent)'
              : isFinished
              ? 'linear-gradient(to right, transparent, rgba(34,197,94,0.25), transparent)'
              : 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
          }}
        />

        {/* ── User pick section (inner card) ── */}
        {pick ? (
          <div
            className={`rounded-xl px-4 py-3 transition-all ${
              pickCorrect
                ? 'bg-green-500/10 border border-green-500/20'
                : pickWrong
                ? 'bg-red-500/10 border border-red-500/20'
                : 'bg-black/40 border border-white/5'
            }`}
            style={
              pickCorrect
                ? { boxShadow: 'inset 0 0 20px rgba(34,197,94,0.05)' }
                : undefined
            }
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="shrink-0">
                {pickCorrect ? (
                  <CheckCircle2
                    className="w-6 h-6 text-green-400"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(34,197,94,0.6))' }}
                  />
                ) : pickWrong ? (
                  <XCircle
                    className="w-6 h-6 text-red-400"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.6))' }}
                  />
                ) : (
                  <Zap
                    className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-glow-neon-yellow"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(250,204,21,0.7))' }}
                  />
                )}
              </div>

              {/* Pick info */}
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[10px] uppercase tracking-widest font-bold mb-0.5 ${
                    pickCorrect
                      ? 'text-green-400/60'
                      : pickWrong
                      ? 'text-red-400/50'
                      : 'text-white/30'
                  }`}
                >
                  Seu Pick
                </div>
                <div
                  className={`font-display text-xl uppercase tracking-wide truncate ${
                    pickCorrect
                      ? 'text-green-300'
                      : pickWrong
                      ? 'text-red-400'
                      : 'text-yellow-400'
                  }`}
                  style={
                    pickCorrect
                      ? { textShadow: '0 0 12px rgba(34,197,94,0.4)' }
                      : pickWrong
                      ? { textShadow: '0 0 12px rgba(239,68,68,0.3)' }
                      : { textShadow: '0 0 10px rgba(250,204,21,0.4)' }
                  }
                >
                  {pickName}
                </div>
              </div>

              {/* Points badge */}
              {pickCorrect && (
                <div className="shrink-0 flex flex-col items-end">
                  <span
                    className="font-display text-2xl text-green-300 leading-tight"
                    style={{ textShadow: '0 0 14px rgba(34,197,94,0.6)' }}
                  >
                    +{pick.pontos_ganhos}
                  </span>
                  <span className="text-[9px] text-green-400/60 uppercase tracking-widest">pts</span>
                </div>
              )}
              {pickWrong && (
                <div className="shrink-0">
                  <span className="font-display text-xl text-red-400/50 leading-tight">0 pts</span>
                </div>
              )}
              {pickPending && (
                <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-[10px] text-red-400/80 uppercase tracking-widest font-bold">
                    Ao vivo
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-black/40 border border-white/5 px-4 py-2.5 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-white/15" />
            <span className="text-xs text-white/20 italic">Sem pick para esta luta</span>
          </div>
        )}
      </div>
    </div>
  );
}
