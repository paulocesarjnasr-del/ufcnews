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
    card_principal: 'CARD PRINCIPAL',
    preliminar: 'PRELIMINAR',
    early_prelim: 'EARLY PRELIM',
  };
  return labels[tipo] ?? tipo.toUpperCase();
}

function getTipoBadgeClass(tipo: string): string {
  if (tipo === 'main_event')
    return 'bg-ufc-red/20 text-ufc-red border border-ufc-red/40 font-black tracking-widest';
  if (tipo === 'co_main')
    return 'bg-ufc-gold/15 text-ufc-gold border border-ufc-gold/40 font-bold tracking-wider';
  return 'bg-dark-border/50 text-dark-textMuted border border-dark-border/30 font-medium tracking-wide';
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
  const isScheduled = status === 'agendada';
  const isNext = status === 'proxima';

  const winner_nome =
    vencedor_id === lutador1_id
      ? lutador1_nome
      : vencedor_id === lutador2_id
      ? lutador2_nome
      : null;

  const pickName =
    userPick?.vencedor_previsto_id === lutador1_id
      ? lutador1_nome
      : userPick?.vencedor_previsto_id === lutador2_id
      ? lutador2_nome
      : null;

  const pickCorrect = userPick?.acertou_vencedor;
  const pickSettled =
    userPick?.acertou_vencedor !== null && userPick?.acertou_vencedor !== undefined;

  // ── Card wrapper classes per status ──────────────────────────
  const wrapperClass = [
    'relative overflow-hidden rounded-lg transition-all duration-300',
    isLive
      ? 'border-l-4 border-ufc-red bg-dark-card animate-glow-red-border shadow-[0_0_30px_rgba(210,10,10,0.25)]'
      : isFinished
      ? 'border-l-4 border-green-500 bg-dark-card shadow-md'
      : isNext
      ? 'border-l-4 border-white/30 bg-dark-card/80'
      : isScheduled
      ? 'border-l-4 border-transparent bg-dark-card/60 opacity-40'
      : 'border-l-4 border-transparent bg-dark-card',
  ]
    .filter(Boolean)
    .join(' ');

  // ── Status badge ──────────────────────────────────────────────
  const statusBadge = isLive ? (
    <span className="flex items-center gap-1.5 rounded-full bg-ufc-red px-2.5 py-0.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_10px_rgba(210,10,10,0.6)]">
      <span className="inline-block h-1.5 w-1.5 animate-ping rounded-full bg-white" />
      AO VIVO
    </span>
  ) : isFinished ? (
    <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-green-400 ring-1 ring-green-500/30">
      FINALIZADA
    </span>
  ) : isNext ? (
    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white/70 ring-1 ring-white/20">
      PROXIMA
    </span>
  ) : (
    <span className="rounded-full bg-dark-border/60 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-dark-textMuted">
      AGENDADA
    </span>
  );

  return (
    <div className={wrapperClass}>
      {/* Live glow overlay */}
      {isLive && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ufc-red/10 via-transparent to-transparent" />
      )}

      {/* Header: tipo badge + status */}
      <div className="flex items-center justify-between border-b border-dark-border/60 bg-dark-bg/40 px-4 py-2">
        <span className={`rounded px-2 py-0.5 text-xs uppercase ${getTipoBadgeClass(tipo)}`}>
          {getTipoLabel(tipo)}
        </span>
        {statusBadge}
      </div>

      {/* Fighters row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-4">
        {/* Fighter 1 */}
        <div
          className={`min-w-0 transition-opacity duration-300 ${
            isFinished && vencedor_id === lutador2_id ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <p
            className={`truncate font-display text-lg uppercase leading-tight tracking-wide ${
              isFinished && vencedor_id === lutador1_id
                ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]'
                : isLive
                ? 'text-dark-text'
                : 'text-dark-text'
            }`}
          >
            {lutador1_nome}
          </p>
          {isFinished && vencedor_id === lutador1_id && (
            <span className="mt-1 inline-flex items-center gap-1 rounded bg-green-500/20 px-1.5 py-0.5 text-xs font-bold text-green-400 ring-1 ring-green-500/30">
              <span>&#10003;</span> VENCEDOR
            </span>
          )}
        </div>

        {/* Center: VS or Result */}
        <div className="flex flex-col items-center gap-0.5 px-2">
          {isFinished && metodo ? (
            <div className="text-center animate-flash-result rounded px-2 py-1">
              <p className="whitespace-nowrap text-xs font-black uppercase tracking-widest text-green-400">
                {metodo.replace(/_/g, ' ')}
              </p>
              {round_final != null && (
                <p className="text-xs font-semibold text-dark-textMuted">R{round_final}</p>
              )}
            </div>
          ) : isLive ? (
            <div className="flex flex-col items-center gap-1">
              <span className="font-display text-xl text-ufc-red">VS</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-ufc-red animate-pulse-red">
                live
              </span>
            </div>
          ) : (
            <span className="font-display text-xl text-dark-textMuted/50">VS</span>
          )}
        </div>

        {/* Fighter 2 */}
        <div
          className={`min-w-0 text-right transition-opacity duration-300 ${
            isFinished && vencedor_id === lutador1_id ? 'opacity-30' : 'opacity-100'
          }`}
        >
          <p
            className={`truncate font-display text-lg uppercase leading-tight tracking-wide ${
              isFinished && vencedor_id === lutador2_id
                ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]'
                : 'text-dark-text'
            }`}
          >
            {lutador2_nome}
          </p>
          {isFinished && vencedor_id === lutador2_id && (
            <span className="mt-1 inline-flex items-center gap-1 rounded bg-green-500/20 px-1.5 py-0.5 text-xs font-bold text-green-400 ring-1 ring-green-500/30">
              <span>&#10003;</span> VENCEDOR
            </span>
          )}
        </div>
      </div>

      {/* User pick row */}
      {userPick && pickName && (
        <div
          className={`border-t px-4 py-2.5 text-sm ${
            !pickSettled
              ? 'border-dark-border/30 bg-dark-bg/30'
              : pickCorrect
              ? 'border-green-500/20 bg-green-500/10'
              : 'border-red-500/20 bg-red-500/10'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {pickSettled ? (
                <span
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-black ${
                    pickCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}
                >
                  {pickCorrect ? '✓' : '✗'}
                </span>
              ) : (
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-dark-border/60 text-xs text-dark-textMuted">
                  ?
                </span>
              )}
              <span>
                <span className="text-xs uppercase tracking-wide text-dark-textMuted">
                  Seu pick:{' '}
                </span>
                <span
                  className={`font-semibold ${
                    !pickSettled
                      ? 'text-dark-text'
                      : pickCorrect
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {pickName}
                </span>
              </span>
            </div>

            {pickSettled && (
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-black ${
                  pickCorrect
                    ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/30'
                    : 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30'
                }`}
              >
                {userPick.pontos_ganhos > 0 ? `+${userPick.pontos_ganhos} pts` : '0 pts'}
              </span>
            )}

            {!pickSettled && winner_nome == null && isLive && (
              <span className="flex-shrink-0 text-xs font-semibold uppercase tracking-wide text-ufc-red animate-pulse-red">
                em andamento
              </span>
            )}
          </div>
        </div>
      )}

      {/* No pick + not finished */}
      {!userPick && !isFinished && (
        <div
          className={`border-t px-4 py-2 text-center text-xs ${
            isLive
              ? 'border-ufc-red/20 text-ufc-red font-semibold uppercase tracking-widest'
              : 'border-dark-border/20 text-dark-textMuted'
          }`}
        >
          {isLive ? 'Em andamento' : isNext ? 'Proxima luta' : 'Aguardando'}
        </div>
      )}
    </div>
  );
}
