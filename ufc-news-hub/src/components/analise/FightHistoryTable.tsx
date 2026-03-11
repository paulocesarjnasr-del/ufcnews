'use client';

import { FighterInfo } from '@/types/analise';

interface FightRecord {
  result: string;
  opponent: string;
  method: string;
  event: string;
  sigStr?: string;
  td?: string;
  ctrl?: string;
}

interface Props {
  fighter: FighterInfo;
  side: 'red' | 'blue';
}

function ResultBadge({ result }: { result: string }) {
  const r = result.toUpperCase();
  if (r === 'W') return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-[10px] font-bold text-green-400">W</span>;
  if (r === 'L') return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold text-red-400">L</span>;
  if (r === 'D') return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500/20 text-[10px] font-bold text-yellow-400">D</span>;
  return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500/20 text-[10px] font-bold text-gray-400">NC</span>;
}

export function FightHistoryTable({ fighter, side }: Props) {
  const fights = fighter.ultimasLutas;
  if (!fights || fights.length === 0) return null;

  const lastName = fighter.nome?.split(' ').pop() || 'Fighter';
  const borderColor = side === 'red' ? 'border-ufc-red/30' : 'border-blue-500/30';
  const accentColor = side === 'red' ? 'text-ufc-red' : 'text-blue-400';

  // Calculate streak
  let streakCount = 0;
  let streakType = '';
  if (fights.length > 0) {
    streakType = fights[0].result;
    for (const f of fights) {
      if (f.result === streakType) streakCount++;
      else break;
    }
  }

  const streakLabel = streakType === 'W'
    ? `${streakCount}W streak`
    : streakType === 'L'
    ? `${streakCount}L streak`
    : '';

  return (
    <div className={`rounded-lg border ${borderColor} bg-dark-card p-4`}>
      <div className="mb-3 flex items-center justify-between">
        <h4 className={`font-display text-sm uppercase ${accentColor}`}>
          {lastName} — Ultimas Lutas
        </h4>
        {streakLabel && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            streakType === 'W'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {streakLabel}
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        {fights.slice(0, 5).map((fight, idx) => (
          <div key={idx} className="flex items-center gap-2 rounded bg-dark-bg px-2.5 py-1.5">
            <ResultBadge result={fight.result} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-xs font-medium text-dark-text">
                  {fight.opponent}
                </span>
                <span className="flex-shrink-0 text-[10px] text-dark-textMuted">
                  {fight.method}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-dark-textMuted/60 truncate">
                  {fight.event}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
