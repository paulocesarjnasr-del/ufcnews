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
  if (tipo === 'main_event') return 'bg-ufc-red text-white';
  if (tipo === 'co_main') return 'bg-ufc-gold text-dark-bg';
  return 'bg-dark-border text-dark-textMuted';
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
  const pickSettled = userPick?.acertou_vencedor !== null && userPick?.acertou_vencedor !== undefined;

  return (
    <div className="neu-card overflow-hidden rounded-lg">
      {/* Header: tipo badge + status */}
      <div className="flex items-center justify-between border-b border-dark-border bg-dark-bg/50 px-4 py-2">
        <span
          className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${getTipoBadgeClass(tipo)}`}
        >
          {getTipoLabel(tipo)}
        </span>

        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold uppercase ${
            isLive
              ? 'animate-pulse bg-ufc-red/20 text-ufc-red'
              : isFinished
              ? 'bg-green-500/10 text-green-400'
              : 'bg-dark-border text-dark-textMuted'
          }`}
        >
          {isLive ? 'AO VIVO' : isFinished ? 'FINALIZADA' : 'PROXIMA'}
        </span>
      </div>

      {/* Fighters row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4">
        {/* Fighter 1 */}
        <div
          className={`${
            isFinished && vencedor_id === lutador2_id ? 'opacity-50' : ''
          }`}
        >
          <p
            className={`font-display text-base uppercase leading-tight ${
              isFinished && vencedor_id === lutador1_id
                ? 'text-green-400'
                : 'text-dark-text'
            }`}
          >
            {lutador1_nome}
          </p>
          {isFinished && vencedor_id === lutador1_id && (
            <span className="mt-0.5 inline-block rounded bg-green-500/20 px-1.5 py-0.5 text-xs font-bold text-green-400">
              VENCEDOR
            </span>
          )}
        </div>

        {/* VS / Result center */}
        <div className="flex flex-col items-center gap-1">
          {isFinished && metodo ? (
            <div className="text-center">
              <p className="text-xs font-semibold uppercase text-ufc-red">
                {metodo.replace(/_/g, ' ')}
              </p>
              {round_final != null && (
                <p className="text-xs text-dark-textMuted">R{round_final}</p>
              )}
            </div>
          ) : (
            <span className="font-display text-xl text-dark-textMuted">VS</span>
          )}
        </div>

        {/* Fighter 2 */}
        <div
          className={`text-right ${
            isFinished && vencedor_id === lutador1_id ? 'opacity-50' : ''
          }`}
        >
          <p
            className={`font-display text-base uppercase leading-tight ${
              isFinished && vencedor_id === lutador2_id
                ? 'text-green-400'
                : 'text-dark-text'
            }`}
          >
            {lutador2_nome}
          </p>
          {isFinished && vencedor_id === lutador2_id && (
            <span className="mt-0.5 inline-block rounded bg-green-500/20 px-1.5 py-0.5 text-xs font-bold text-green-400">
              VENCEDOR
            </span>
          )}
        </div>
      </div>

      {/* User pick row */}
      {userPick && pickName && (
        <div
          className={`border-t border-dark-border/50 px-4 py-2 text-sm ${
            !pickSettled
              ? 'bg-dark-bg/30 text-dark-textMuted'
              : pickCorrect
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>
              <span className="mr-1 text-xs uppercase tracking-wide opacity-70">
                Seu pick:
              </span>
              <span className="font-semibold">{pickName}</span>
            </span>

            {pickSettled && (
              <span className="font-bold">
                {userPick.pontos_ganhos > 0
                  ? `+${userPick.pontos_ganhos} pts`
                  : '0 pts'}
              </span>
            )}

            {!pickSettled && winner_nome == null && isLive && (
              <span className="text-xs text-ufc-red">Em andamento</span>
            )}
          </div>
        </div>
      )}

      {/* No pick + not finished */}
      {!userPick && !isFinished && (
        <div className="border-t border-dark-border/30 px-4 py-2 text-center text-xs text-dark-textMuted">
          {isLive ? 'Em andamento' : 'Proxima luta'}
        </div>
      )}
    </div>
  );
}
