'use client';

import { Trophy, Target, AlertCircle } from 'lucide-react';
import { BestBet, ParlaySuggestion } from '@/types/analise';

interface Props {
  bestBets: BestBet[];
  parlay: ParlaySuggestion;
}

function ConfidenceBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div className="mt-1">
      <div className="h-1.5 w-full rounded-full bg-dark-border">
        <div
          className={`h-1.5 rounded-full ${color}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}

function BetTypeBadge({ type }: { type: string }) {
  const colorMap: Record<string, string> = {
    Moneyline: 'bg-ufc-red/20 text-ufc-red border-ufc-red/30',
    Method: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
    'Over/Under': 'bg-ufc-gold/20 text-ufc-gold border-ufc-gold/30',
  };
  const color = colorMap[type] || 'bg-dark-border text-dark-textMuted border-dark-border';

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${color}`}>
      {type}
    </span>
  );
}

function RiskBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const config = {
    low: { label: 'Risco Baixo', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    medium: { label: 'Risco Medio', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    high: { label: 'Risco Alto', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  };
  const { label, color } = config[level];

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${color}`}>
      {label}
    </span>
  );
}

const medalAccent: Record<number, { border: string; bg: string; number: string; bar: string }> = {
  0: {
    border: 'border-ufc-gold/40',
    bg: 'bg-ufc-gold/5',
    number: 'bg-ufc-gold text-dark-bg',
    bar: 'bg-ufc-gold',
  },
  1: {
    border: 'border-gray-400/30',
    bg: 'bg-gray-400/5',
    number: 'bg-gray-400 text-dark-bg',
    bar: 'bg-gray-400',
  },
  2: {
    border: 'border-amber-700/30',
    bg: 'bg-amber-700/5',
    number: 'bg-amber-700 text-white',
    bar: 'bg-amber-700',
  },
};

export function BestBetsSection({ bestBets, parlay }: Props) {
  const topThree = bestBets.slice(0, 3);

  return (
    <section className="space-y-6">
      {/* Section title */}
      <div className="flex items-center gap-3">
        <Trophy className="h-6 w-6 text-ufc-gold" />
        <h2 className="font-display text-2xl uppercase text-dark-text">
          Melhores Apostas do Card
        </h2>
      </div>

      {/* Top 3 numbered cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {topThree.map((bet, idx) => {
          const accent = medalAccent[idx] || medalAccent[2];
          return (
            <div
              key={idx}
              className={`relative rounded-lg border ${accent.border} ${accent.bg} bg-dark-card p-5`}
            >
              {/* Number badge */}
              <div
                className={`absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${accent.number}`}
              >
                {idx + 1}
              </div>

              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-dark-textMuted">{bet.fight_label}</p>
                <BetTypeBadge type={bet.bet_type} />
              </div>

              <p className="font-display text-base uppercase text-dark-text">{bet.pick}</p>

              <p className="mt-2 text-sm leading-relaxed text-dark-textMuted">
                {bet.reasoning}
              </p>

              {/* Confidence bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-dark-textMuted">
                  <span>Confianca</span>
                  <span className="font-bold text-dark-text">{bet.confidence}/10</span>
                </div>
                <ConfidenceBar value={bet.confidence} color={accent.bar} />
              </div>

              {/* Value rating bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-[10px] text-dark-textMuted">
                  <span>Valor</span>
                  <span className="font-bold text-dark-text">{bet.value_rating}/10</span>
                </div>
                <ConfidenceBar value={bet.value_rating} color="bg-green-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Parlay Suggestion */}
      <div className="rounded-lg border border-dark-border bg-dark-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-ufc-red" />
            <h3 className="font-display text-lg uppercase text-dark-text">Sugestao de Parlay</h3>
          </div>
          <RiskBadge level={parlay.risk_level} />
        </div>

        <ul className="space-y-2">
          {parlay.legs.map((leg, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-dark-text">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ufc-red" />
              {leg}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm leading-relaxed text-dark-textMuted">
          {parlay.reasoning}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 rounded-lg bg-dark-bg p-4">
        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-dark-textMuted" />
        <p className="text-xs leading-relaxed text-dark-textMuted">
          Estas sugestoes sao apenas para fins de entretenimento e analise. Apostas esportivas envolvem risco.
          Nunca aposte mais do que pode perder. As odds e linhas podem variar entre casas de apostas.
          Resultados passados nao garantem resultados futuros.
        </p>
      </div>
    </section>
  );
}
