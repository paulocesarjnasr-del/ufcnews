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

function getTipoBadgeStyle(tipo: string): { className: string; style?: React.CSSProperties } {
  if (tipo === 'main_event') {
    return {
      className:
        'rounded px-2 py-0.5 text-xs font-black uppercase tracking-widest bg-ufc-red/20 text-ufc-red border border-ufc-red/60',
      style: { textShadow: '0 0 8px rgba(210, 10, 10, 0.8)' },
    };
  }
  if (tipo === 'co_main') {
    return {
      className:
        'rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-ufc-gold/15 text-ufc-gold border border-ufc-gold/40',
      style: { textShadow: '0 0 6px rgba(212, 175, 55, 0.6)' },
    };
  }
  if (tipo === 'card_principal') {
    return {
      className:
        'rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide bg-white/10 text-white border border-white/20',
    };
  }
  return {
    className:
      'rounded px-2 py-0.5 text-xs font-medium uppercase tracking-wide bg-white/5 text-white/40 border border-white/10',
  };
}

// ═══════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════

function StatusBadgeLive() {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-ufc-red px-2.5 py-0.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_12px_rgba(210,10,10,0.7)]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      AO VIVO
    </span>
  );
}

function StatusBadgeFinished() {
  return (
    <span className="rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-green-400 ring-1 ring-green-500/40 shadow-[0_0_8px_rgba(34,197,94,0.25)]">
      FINALIZADA
    </span>
  );
}

function StatusBadgeScheduled() {
  return (
    <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-white/30">
      AGENDADA
    </span>
  );
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
      ? lutador1_nome
      : userPick?.vencedor_previsto_id === lutador2_id
      ? lutador2_nome
      : null;

  const pickCorrect = userPick?.acertou_vencedor;
  const pickSettled =
    userPick?.acertou_vencedor !== null && userPick?.acertou_vencedor !== undefined;

  // ── Container style per status ────────────────────────────────
  let wrapperClass: string;
  let wrapperStyle: React.CSSProperties = {};

  if (isLive) {
    wrapperClass =
      'relative overflow-hidden rounded-xl border border-ufc-red/50 bg-gradient-to-r from-red-950/80 to-black/60 backdrop-blur-md transition-all duration-300';
    wrapperStyle = { boxShadow: '0 0 20px rgba(210,10,10,0.3), 0 0 40px rgba(210,10,10,0.1)' };
  } else if (isFinished) {
    wrapperClass =
      'relative overflow-hidden rounded-xl border border-green-500/30 bg-gradient-to-r from-green-950/40 to-black/60 backdrop-blur-md transition-all duration-300';
    wrapperStyle = { boxShadow: '0 0 12px rgba(34,197,94,0.12)' };
  } else {
    // agendada
    wrapperClass =
      'relative overflow-hidden rounded-xl border border-white/5 bg-black/20 opacity-50 transition-all duration-300';
  }

  // ── Status badge ──────────────────────────────────────────────
  const statusBadge = isLive ? (
    <StatusBadgeLive />
  ) : isFinished ? (
    <StatusBadgeFinished />
  ) : (
    <StatusBadgeScheduled />
  );

  // ── Tipo badge ────────────────────────────────────────────────
  const tipoBadgeConfig = getTipoBadgeStyle(tipo);

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      {/* Live animated red sweep */}
      {isLive && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ufc-red/10 via-transparent to-transparent" />
      )}

      {/* Header: tipo badge + status badge */}
      <div
        className={`flex items-center justify-between px-4 py-2 ${
          isLive
            ? 'border-b border-ufc-red/30 bg-black/30'
            : isFinished
            ? 'border-b border-green-500/15 bg-black/20'
            : 'border-b border-white/5 bg-transparent'
        }`}
      >
        <span className={tipoBadgeConfig.className} style={tipoBadgeConfig.style}>
          {getTipoLabel(tipo)}
        </span>
        {statusBadge}
      </div>

      {/* Fighters row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-4">
        {/* Fighter 1 */}
        <div
          className={`min-w-0 transition-all duration-300 ${
            isFinished && winner2 ? 'opacity-25 grayscale' : 'opacity-100'
          }`}
        >
          <p
            className="truncate font-display text-lg uppercase leading-tight tracking-wide"
            style={
              winner1
                ? { color: '#4ade80', textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }
                : isLive
                ? { color: '#ffffff', textShadow: '0 0 10px rgba(210, 10, 10, 0.5)' }
                : { color: 'rgba(255,255,255,0.7)' }
            }
          >
            {lutador1_nome}
          </p>
          {winner1 && (
            <span className="mt-1 inline-flex items-center gap-1 rounded bg-green-500/20 px-1.5 py-0.5 text-xs font-bold text-green-400 ring-1 ring-green-500/40 shadow-[0_0_6px_rgba(34,197,94,0.3)]">
              &#10003; VENCEDOR
            </span>
          )}
        </div>

        {/* Center: VS or Result */}
        <div className="flex flex-col items-center gap-0.5 px-2">
          {isFinished && metodo ? (
            <div className="text-center">
              <div className="rounded-full bg-green-500/15 px-3 py-1 ring-1 ring-green-500/30 shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                <p
                  className="whitespace-nowrap text-xs font-black uppercase tracking-widest"
                  style={{ color: '#4ade80', textShadow: '0 0 6px rgba(34,197,94,0.4)' }}
                >
                  {metodo.replace(/_/g, ' ')}
                </p>
                {round_final != null && (
                  <p className="text-center text-xs font-semibold text-green-400/60">
                    R{round_final}
                  </p>
                )}
              </div>
            </div>
          ) : isLive ? (
            <div className="flex flex-col items-center gap-0.5">
              <span
                className="font-display text-xl"
                style={{ color: '#D20A0A', textShadow: '0 0 12px rgba(210,10,10,0.8)' }}
              >
                ⚡VS⚡
              </span>
              <span className="animate-pulse text-xs font-black uppercase tracking-widest text-ufc-red">
                live
              </span>
            </div>
          ) : (
            <span className="font-display text-xl text-white/15">VS</span>
          )}
        </div>

        {/* Fighter 2 */}
        <div
          className={`min-w-0 text-right transition-all duration-300 ${
            isFinished && winner1 ? 'opacity-25 grayscale' : 'opacity-100'
          }`}
        >
          <p
            className="truncate font-display text-lg uppercase leading-tight tracking-wide"
            style={
              winner2
                ? { color: '#4ade80', textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }
                : isLive
                ? { color: '#ffffff', textShadow: '0 0 10px rgba(210, 10, 10, 0.5)' }
                : { color: 'rgba(255,255,255,0.7)' }
            }
          >
            {lutador2_nome}
          </p>
          {winner2 && (
            <span className="mt-1 inline-flex items-center gap-1 rounded bg-green-500/20 px-1.5 py-0.5 text-xs font-bold text-green-400 ring-1 ring-green-500/40 shadow-[0_0_6px_rgba(34,197,94,0.3)]">
              &#10003; VENCEDOR
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div
        className={`mx-4 border-t ${
          isLive
            ? 'border-ufc-red/20'
            : isFinished
            ? 'border-green-500/15'
            : 'border-white/10'
        }`}
      />

      {/* User pick row */}
      {userPick && pickName ? (
        <div
          className={`px-4 py-2.5 ${
            !pickSettled
              ? 'bg-transparent'
              : pickCorrect
              ? 'bg-green-500/10'
              : 'bg-red-500/10'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            {/* Pick icon + label */}
            <div className="flex items-center gap-2 min-w-0">
              {pickSettled ? (
                <span
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-black shadow-sm ${
                    pickCorrect
                      ? 'bg-green-500 text-white shadow-[0_0_6px_rgba(34,197,94,0.5)]'
                      : 'bg-red-500 text-white shadow-[0_0_6px_rgba(239,68,68,0.5)]'
                  }`}
                >
                  {pickCorrect ? '✓' : '✗'}
                </span>
              ) : (
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-white/50">
                  ?
                </span>
              )}
              <span className="min-w-0">
                <span className="text-xs uppercase tracking-wide text-white/40">Seu pick: </span>
                <span
                  className="font-semibold"
                  style={
                    !pickSettled
                      ? { color: 'rgba(255,255,255,0.85)' }
                      : pickCorrect
                      ? { color: '#4ade80', textShadow: '0 0 6px rgba(34,197,94,0.4)' }
                      : { color: '#f87171', textShadow: '0 0 6px rgba(239,68,68,0.4)' }
                  }
                >
                  {pickName}
                </span>
              </span>
            </div>

            {/* Points badge */}
            {pickSettled ? (
              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-black ${
                  pickCorrect
                    ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/40 shadow-[0_0_6px_rgba(34,197,94,0.25)]'
                    : 'bg-red-500/20 text-red-400 ring-1 ring-red-500/40'
                }`}
              >
                {userPick.pontos_ganhos > 0 ? `+${userPick.pontos_ganhos} pts` : '0 pts'}
              </span>
            ) : isLive ? (
              <span className="flex-shrink-0 animate-pulse text-xs font-black uppercase tracking-widest text-ufc-red">
                em andamento
              </span>
            ) : null}
          </div>
        </div>
      ) : !userPick && !isFinished ? (
        <div
          className={`px-4 py-2 text-center text-xs ${
            isLive
              ? 'font-bold uppercase tracking-widest text-ufc-red animate-pulse'
              : 'text-white/25'
          }`}
        >
          {isLive ? 'Em andamento' : 'Aguardando'}
        </div>
      ) : null}
    </div>
  );
}
