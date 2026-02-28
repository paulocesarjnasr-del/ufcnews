'use client';

import { BettingValue } from '@/types/analise';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface Props {
  betting: BettingValue;
  fighter1Name: string;
  fighter2Name: string;
}

function ConfidenceBadge({ value }: { value: number }) {
  const color =
    value >= 8 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
    value >= 5 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
    'bg-red-500/20 text-red-400 border-red-500/30';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${color}`}>
      {value}/10
    </span>
  );
}

function ValueBar({ value, max = 10, color = 'ufc-gold' }: { value: number; max?: number; color?: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="mt-1">
      <div className="h-1.5 w-full rounded-full bg-dark-border">
        <div
          className={`h-1.5 rounded-full bg-${color}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <p className="mt-0.5 text-right text-[10px] text-dark-textMuted">{value}/{max}</p>
    </div>
  );
}

export function BettingValueSection({ betting, fighter1Name, fighter2Name }: Props) {
  const moneylineFighter = betting.moneyline.pick === 'fighter1' ? fighter1Name : fighter2Name;

  return (
    <div className="space-y-4">
      {/* Three cards row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Moneyline Pick */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-dark-textMuted">
              Moneyline Pick
            </h4>
            <ConfidenceBadge value={betting.moneyline.confidence} />
          </div>
          <p className="font-display text-lg uppercase text-dark-text">
            {moneylineFighter}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-dark-textMuted">
            {betting.moneyline.reasoning}
          </p>
        </div>

        {/* Method Pick */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-5">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-dark-textMuted">
            Method Pick
          </h4>
          <p className="font-display text-lg uppercase text-dark-text">
            {betting.method.pick}
          </p>
          <div className="mt-2">
            <p className="text-[10px] uppercase tracking-wider text-dark-textMuted">Value Rating</p>
            <ValueBar value={betting.method.value_rating} />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-dark-textMuted">
            {betting.method.reasoning}
          </p>
        </div>

        {/* Over/Under */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-5">
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-dark-textMuted">
            Over/Under
          </h4>
          <p className="font-display text-lg uppercase text-dark-text">
            {betting.over_under.pick === 'over' ? 'Over' : 'Under'} {betting.over_under.rounds}.5 Rounds
          </p>
          <p className="mt-2 text-sm leading-relaxed text-dark-textMuted">
            {betting.over_under.reasoning}
          </p>
        </div>
      </div>

      {/* Best Bet banner */}
      <div className="flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
        <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-green-400">Melhor Aposta</p>
          <p className="mt-1 text-sm leading-relaxed text-dark-text">{betting.bestBet}</p>
        </div>
      </div>

      {/* Avoid Bet strip */}
      <div className="flex items-start gap-3 rounded-lg border border-dark-border bg-dark-bg p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-dark-textMuted" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-dark-textMuted">Aposta a Evitar</p>
          <p className="mt-1 text-sm leading-relaxed text-dark-textMuted">{betting.avoidBet}</p>
        </div>
      </div>
    </div>
  );
}
