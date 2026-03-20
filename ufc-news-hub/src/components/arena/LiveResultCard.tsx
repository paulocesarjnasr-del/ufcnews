import { Clock, Zap, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { sobrenome } from '@/components/arena/shared';

interface LiveResultCardProps {
  lutador1_nome: string;
  lutador2_nome: string;
  vencedor_id: string | null;
  lutador1_id: string;
  lutador2_id: string;
  metodo: string | null;
  round_final: number | null;
  tipo: string;
  status: string;
  userPick?: {
    vencedor_previsto_id: string;
    acertou_vencedor: boolean | null;
    pontos_ganhos: number;
  } | null;
}

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

function getTipoLabel(tipo: string): string {
  const labels: Record<string, string> = {
    main_event: 'MAIN EVENT',
    co_main: 'CO-MAIN EVENT',
    card_principal: 'MAIN CARD',
    preliminar: 'PRELIMINAR',
    early_prelim: 'EARLY PRELIM',
  };
  return labels[tipo] ?? tipo.toUpperCase();
}

function getTipoColor(tipo: string): string {
  if (tipo === 'main_event') return 'text-red-500';
  if (tipo === 'co_main') return 'text-ufc-gold';
  return 'text-white/40';
}

// ═══════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════

export function LiveResultCard({
  lutador1_nome,
  lutador2_nome,
  vencedor_id,
  lutador1_id,
  lutador2_id,
  metodo,
  round_final,
  tipo,
  status,
  userPick,
}: LiveResultCardProps) {
  const isFinished = status === 'finalizada';
  const isLive = status === 'ao_vivo';

  const winner1 = isFinished && vencedor_id === lutador1_id;
  const winner2 = isFinished && vencedor_id === lutador2_id;

  const pickName =
    userPick?.vencedor_previsto_id === lutador1_id
      ? sobrenome(lutador1_nome)
      : userPick?.vencedor_previsto_id === lutador2_id
      ? sobrenome(lutador2_nome)
      : null;

  const pickCorrect = userPick?.acertou_vencedor === true;
  const pickWrong = userPick?.acertou_vencedor === false;
  const pickSettled =
    userPick?.acertou_vencedor !== null && userPick?.acertou_vencedor !== undefined;

  // ── Card glow per status ─────────────────────────────────────
  const cardShadow = isLive
    ? '0 0 25px rgba(210,10,10,0.2), 0 0 50px rgba(210,10,10,0.08)'
    : isFinished
    ? '0 0 20px rgba(34,197,94,0.1), 0 0 40px rgba(34,197,94,0.05)'
    : '0 0 20px rgba(59,130,246,0.06), 0 0 40px rgba(59,130,246,0.03)';

  const borderColor = isLive
    ? 'border-red-500/30'
    : isFinished
    ? 'border-green-500/20'
    : 'border-white/10';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-zinc-900/90 backdrop-blur-sm ${borderColor} border transition-all duration-300 bg-hex-pattern`}
      style={{ boxShadow: cardShadow }}
    >
      {/* Blue/red ambient glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: isLive
            ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(210,10,10,0.12) 0%, transparent 60%)'
            : isFinished
            ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10">
        {/* ── Header: tipo + status badge ── */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <span
            className={`text-[11px] font-black uppercase tracking-[0.15em] ${getTipoColor(tipo)}`}
          >
            {getTipoLabel(tipo)}
          </span>

          {isLive ? (
            <button
              className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1"
              style={{ boxShadow: '0 0 15px rgba(220,38,38,0.5)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                AO VIVO
              </span>
            </button>
          ) : isFinished ? (
            <div className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-1 border border-green-500/30">
              <Trophy className="w-3 h-3 text-green-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                Finalizada
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-transparent px-2.5 py-1">
              <Clock className="w-3 h-3 text-white/30" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                Proxima
              </span>
            </div>
          )}
        </div>

        {/* ── Fighter names row ── */}
        <div className="flex items-center justify-center gap-3 px-4 py-3">
          {/* Fighter 1 */}
          <div
            className={`flex-1 text-right transition-all duration-300 ${
              isFinished && winner2 ? 'opacity-20 grayscale' : ''
            }`}
          >
            <span
              className={`font-display text-2xl sm:text-3xl uppercase leading-tight tracking-wide ${
                winner1
                  ? 'text-green-300'
                  : isLive
                  ? 'text-white'
                  : isFinished
                  ? 'text-white/50'
                  : 'text-white/80'
              }`}
              style={
                winner1
                  ? { textShadow: '0 0 12px rgba(34,197,94,0.5)' }
                  : isLive
                  ? { textShadow: '0 0 10px rgba(255,255,255,0.15)' }
                  : undefined
              }
            >
              {sobrenome(lutador1_nome)}
            </span>
            {winner1 && (
              <div className="mt-1 flex items-center justify-end">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-green-400">
                  VENCEDOR
                </span>
              </div>
            )}
          </div>

          {/* VS divider */}
          <div className="shrink-0 px-1">
            {isFinished && metodo ? (
              <div className="text-center">
                <div className="rounded-md bg-green-500/10 px-2 py-1 border border-green-500/20">
                  <p className="text-[10px] font-black uppercase tracking-widest text-green-400 whitespace-nowrap">
                    {metodo.replace(/_/g, ' ')}
                  </p>
                  {round_final != null && (
                    <p className="text-[9px] font-semibold text-green-400/50">R{round_final}</p>
                  )}
                </div>
              </div>
            ) : (
              <span
                className={`text-sm font-medium ${
                  isLive ? 'text-white/30' : 'text-white/15'
                }`}
              >
                vs
              </span>
            )}
          </div>

          {/* Fighter 2 */}
          <div
            className={`flex-1 text-left transition-all duration-300 ${
              isFinished && winner1 ? 'opacity-20 grayscale' : ''
            }`}
          >
            <span
              className={`font-display text-2xl sm:text-3xl uppercase leading-tight tracking-wide ${
                winner2
                  ? 'text-green-300'
                  : isLive
                  ? 'text-white'
                  : isFinished
                  ? 'text-white/50'
                  : 'text-white/80'
              }`}
              style={
                winner2
                  ? { textShadow: '0 0 12px rgba(34,197,94,0.5)' }
                  : isLive
                  ? { textShadow: '0 0 10px rgba(255,255,255,0.15)' }
                  : undefined
              }
            >
              {sobrenome(lutador2_nome)}
            </span>
            {winner2 && (
              <div className="mt-1">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-green-400">
                  VENCEDOR
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Pick area (inner card) ── */}
        {userPick && pickName ? (
          <div
            className={`mx-3 mb-3 rounded-xl px-4 py-2.5 ${
              pickCorrect
                ? 'bg-green-500/10 border border-green-500/20'
                : pickWrong
                ? 'bg-red-500/10 border border-red-500/20'
                : 'bg-black/40 border border-white/5'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Neon icon */}
                {pickSettled ? (
                  pickCorrect ? (
                    <CheckCircle2
                      className="w-5 h-5 text-green-400 shrink-0"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.6))' }}
                    />
                  ) : (
                    <XCircle
                      className="w-5 h-5 text-red-400 shrink-0"
                      style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.6))' }}
                    />
                  )
                ) : (
                  <Zap
                    className="w-5 h-5 text-yellow-400 shrink-0 animate-glow-neon-yellow fill-yellow-400"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.6))' }}
                  />
                )}

                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
                    Seu Pick
                  </span>
                  <div
                    className={`text-sm font-bold truncate ${
                      pickCorrect
                        ? 'text-green-400'
                        : pickWrong
                        ? 'text-red-400'
                        : 'text-yellow-400'
                    }`}
                    style={
                      !pickSettled
                        ? { textShadow: '0 0 8px rgba(250,204,21,0.4)' }
                        : pickCorrect
                        ? { textShadow: '0 0 8px rgba(34,197,94,0.4)' }
                        : undefined
                    }
                  >
                    {pickName}
                  </div>
                </div>
              </div>

              {/* Points / status */}
              {pickSettled ? (
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-black ${
                    pickCorrect
                      ? 'bg-green-500/15 text-green-400'
                      : 'bg-red-500/15 text-red-400/60'
                  }`}
                >
                  {userPick.pontos_ganhos > 0 ? `+${userPick.pontos_ganhos} pts` : '0 pts'}
                </span>
              ) : isLive ? (
                <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-red-500 animate-pulse">
                  em andamento
                </span>
              ) : null}
            </div>
          </div>
        ) : !userPick && !isFinished ? (
          <div className="mx-3 mb-3 rounded-xl bg-black/40 border border-white/5 px-4 py-2 text-center">
            <span
              className={`text-xs ${
                isLive
                  ? 'font-bold uppercase tracking-widest text-red-500 animate-pulse'
                  : 'text-white/20'
              }`}
            >
              {isLive ? 'Em andamento' : 'Aguardando'}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
