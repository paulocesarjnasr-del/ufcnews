'use client';

import { FighterInfo } from '@/types/analise';

interface Props {
  fighter1: FighterInfo;
  fighter2: FighterInfo;
}

interface DistributionData {
  headPct: number;
  bodyPct: number;
  legPct: number;
  distancePct: number;
  clinchPct: number;
  groundPct: number;
}

function extractDistribution(info: FighterInfo): DistributionData | null {
  // Try to get from extended fields
  const f = info as unknown as Record<string, unknown>;
  const head = f.headStrikeRate as number | undefined;
  if (head == null) return null;
  return {
    headPct: (head as number) || 0,
    bodyPct: (f.bodyStrikeRate as number) || 0,
    legPct: (f.legStrikeRate as number) || 0,
    distancePct: (f.distanceStrikeRate as number) || 0,
    clinchPct: (f.clinchStrikeRate as number) || 0,
    groundPct: (f.groundStrikeRate as number) || 0,
  };
}

function HorizontalBar({ label, v1, v2, color1, color2 }: {
  label: string;
  v1: number;
  v2: number;
  color1: string;
  color2: string;
}) {
  const max = Math.max(v1, v2, 1);
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      {/* Fighter 1 bar (right-aligned) */}
      <div className="flex items-center justify-end gap-2">
        <span className="text-xs font-bold text-dark-text">{v1}%</span>
        <div className="h-3 w-full max-w-[140px] overflow-hidden rounded-full bg-dark-bg">
          <div
            className={`h-full rounded-full transition-all ${color1}`}
            style={{ width: `${(v1 / max) * 100}%`, marginLeft: 'auto' }}
          />
        </div>
      </div>

      {/* Label */}
      <span className="min-w-[60px] text-center text-[10px] font-bold uppercase tracking-wider text-dark-textMuted">
        {label}
      </span>

      {/* Fighter 2 bar (left-aligned) */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-full max-w-[140px] overflow-hidden rounded-full bg-dark-bg">
          <div
            className={`h-full rounded-full transition-all ${color2}`}
            style={{ width: `${(v2 / max) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold text-dark-text">{v2}%</span>
      </div>
    </div>
  );
}

export function StrikingDistribution({ fighter1, fighter2 }: Props) {
  const d1 = extractDistribution(fighter1);
  const d2 = extractDistribution(fighter2);

  if (!d1 && !d2) return null;

  const f1 = d1 || { headPct: 0, bodyPct: 0, legPct: 0, distancePct: 0, clinchPct: 0, groundPct: 0 };
  const f2 = d2 || { headPct: 0, bodyPct: 0, legPct: 0, distancePct: 0, clinchPct: 0, groundPct: 0 };

  const f1Last = fighter1.nome?.split(' ').pop() || 'F1';
  const f2Last = fighter2.nome?.split(' ').pop() || 'F2';

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-5">
      <h3 className="mb-1 font-display text-sm uppercase tracking-wider text-ufc-gold">
        Distribuicao de Golpes
      </h3>
      <p className="mb-4 text-[11px] text-dark-textMuted">Onde cada lutador direciona os golpes significativos</p>

      {/* Fighter name headers */}
      <div className="mb-3 grid grid-cols-[1fr_auto_1fr] text-center">
        <span className="text-xs font-bold text-ufc-red">{f1Last}</span>
        <span className="min-w-[60px]" />
        <span className="text-xs font-bold text-blue-400">{f2Last}</span>
      </div>

      {/* By Target */}
      <div className="mb-4 space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-dark-textMuted/60">Por Alvo</p>
        <HorizontalBar label="Cabeca" v1={f1.headPct} v2={f2.headPct} color1="bg-ufc-red" color2="bg-blue-500" />
        <HorizontalBar label="Corpo" v1={f1.bodyPct} v2={f2.bodyPct} color1="bg-ufc-red/70" color2="bg-blue-500/70" />
        <HorizontalBar label="Perna" v1={f1.legPct} v2={f2.legPct} color1="bg-ufc-red/50" color2="bg-blue-500/50" />
      </div>

      {/* By Position */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-dark-textMuted/60">Por Posicao</p>
        <HorizontalBar label="Distancia" v1={f1.distancePct} v2={f2.distancePct} color1="bg-ufc-red" color2="bg-blue-500" />
        <HorizontalBar label="Clinch" v1={f1.clinchPct} v2={f2.clinchPct} color1="bg-ufc-red/70" color2="bg-blue-500/70" />
        <HorizontalBar label="Ground" v1={f1.groundPct} v2={f2.groundPct} color1="bg-ufc-red/50" color2="bg-blue-500/50" />
      </div>
    </div>
  );
}
