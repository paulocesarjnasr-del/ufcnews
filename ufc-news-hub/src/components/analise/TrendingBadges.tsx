'use client';

import { FighterInfo } from '@/types/analise';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendData {
  label: string;
  trend: 'improving' | 'declining' | 'stable';
}

interface Props {
  fighter1: FighterInfo;
  fighter2: FighterInfo;
}

function extractTrends(info: FighterInfo): TrendData[] {
  const f = info as unknown as Record<string, unknown>;
  const trends: TrendData[] = [];

  const sigTrend = f.trendingSigStr as string | undefined;
  const accTrend = f.trendingAccuracy as string | undefined;
  const absTrend = f.trendingAbsorption as string | undefined;

  if (sigTrend) trends.push({ label: 'Striking Volume', trend: sigTrend as TrendData['trend'] });
  if (accTrend) trends.push({ label: 'Precisao', trend: accTrend as TrendData['trend'] });
  if (absTrend) {
    // For absorption, "improving" means absorbing LESS (inverse)
    const mapped = absTrend === 'improving' ? 'declining' : absTrend === 'declining' ? 'improving' : 'stable';
    trends.push({ label: 'Absorcao de Dano', trend: mapped as TrendData['trend'] });
  }

  return trends;
}

function TrendBadge({ data }: { data: TrendData }) {
  if (data.trend === 'improving') {
    return (
      <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1">
        <TrendingUp className="h-3 w-3 text-green-400" />
        <span className="text-[10px] font-medium text-green-400">{data.label}</span>
      </div>
    );
  }
  if (data.trend === 'declining') {
    return (
      <div className="flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1">
        <TrendingDown className="h-3 w-3 text-red-400" />
        <span className="text-[10px] font-medium text-red-400">{data.label}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-dark-border bg-dark-bg px-2.5 py-1">
      <Minus className="h-3 w-3 text-dark-textMuted" />
      <span className="text-[10px] font-medium text-dark-textMuted">{data.label}</span>
    </div>
  );
}

function FighterTrends({ fighter, side }: { fighter: FighterInfo; side: 'red' | 'blue' }) {
  const trends = extractTrends(fighter);
  if (trends.length === 0) return null;

  const lastName = fighter.nome?.split(' ').pop() || 'Fighter';
  const nameColor = side === 'red' ? 'text-ufc-red' : 'text-blue-400';
  const f = fighter as unknown as Record<string, unknown>;
  const streak = f.currentStreak as number | undefined;
  const streakType = f.streakType as string | undefined;

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className={`text-xs font-bold ${nameColor}`}>{lastName}</span>
        {streak != null && streakType && (
          <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
            streakType === 'win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {streakType === 'win' ? `W${streak}` : `L${Math.abs(streak)}`}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {trends.map((t, idx) => (
          <TrendBadge key={idx} data={t} />
        ))}
      </div>
    </div>
  );
}

export function TrendingBadges({ fighter1, fighter2 }: Props) {
  const t1 = extractTrends(fighter1);
  const t2 = extractTrends(fighter2);

  if (t1.length === 0 && t2.length === 0) return null;

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-4">
      <h3 className="mb-3 font-display text-sm uppercase tracking-wider text-ufc-gold">
        Momento Atual
      </h3>
      <p className="mb-3 text-[11px] text-dark-textMuted">Tendencias recentes baseadas nas ultimas 3 lutas vs media de carreira</p>
      <div className="grid gap-4 md:grid-cols-2">
        <FighterTrends fighter={fighter1} side="red" />
        <FighterTrends fighter={fighter2} side="blue" />
      </div>
    </div>
  );
}
