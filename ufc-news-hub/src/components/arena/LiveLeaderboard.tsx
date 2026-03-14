interface LeaderboardEntry {
  usuario_id: string;
  username: string;
  display_name: string | null;
  pontos_totais: number;
  acertos: number;
  total_lutas: number;
}

interface LiveLeaderboardProps {
  leaderboard: LeaderboardEntry[];
  meuUsuarioId: string | null;
}

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

function getPositionStyle(position: number): {
  color: string;
  label: string;
} {
  if (position === 1) return { color: 'text-yellow-400', label: '#1' };
  if (position === 2) return { color: 'text-gray-300', label: '#2' };
  if (position === 3) return { color: 'text-amber-600', label: '#3' };
  return { color: 'text-dark-textMuted', label: `#${position}` };
}

// ═══════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════

export function LiveLeaderboard({ leaderboard, meuUsuarioId }: LiveLeaderboardProps) {
  if (leaderboard.length === 0) {
    return (
      <div className="neu-card rounded-lg p-4 text-center text-sm text-dark-textMuted">
        Nenhuma pontuacao registrada ainda.
      </div>
    );
  }

  return (
    <div className="neu-card overflow-hidden rounded-lg">
      {/* Title */}
      <div className="border-b border-dark-border px-4 py-3">
        <h3 className="font-display text-sm uppercase tracking-wide text-dark-text">
          Classificacao do Evento
        </h3>
      </div>

      {/* Rows */}
      <ul className="divide-y divide-dark-border/50">
        {leaderboard.map((entry, index) => {
          const position = index + 1;
          const { color, label } = getPositionStyle(position);
          const isMe = meuUsuarioId !== null && entry.usuario_id === meuUsuarioId;

          return (
            <li
              key={entry.usuario_id}
              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                isMe
                  ? 'border-l-2 border-ufc-red bg-ufc-red/5'
                  : 'border-l-2 border-transparent'
              }`}
            >
              {/* Position */}
              <span
                className={`w-7 shrink-0 text-center text-sm font-bold tabular-nums ${color}`}
              >
                {label}
              </span>

              {/* Username */}
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-semibold ${
                    isMe ? 'text-ufc-red' : 'text-dark-text'
                  }`}
                >
                  {entry.display_name ?? entry.username}
                  {isMe && (
                    <span className="ml-1 text-xs font-normal text-dark-textMuted">
                      (voce)
                    </span>
                  )}
                </p>
                <p className="text-xs text-dark-textMuted">
                  {entry.acertos}/{entry.total_lutas} acertos
                </p>
              </div>

              {/* Points */}
              <span className="shrink-0 text-sm font-bold tabular-nums text-ufc-gold">
                {entry.pontos_totais} pts
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
