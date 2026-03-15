'use client';

import { FighterInfo } from '@/types/analise';
import { Clock, ArrowDownToLine, RotateCcw } from 'lucide-react';

interface Props {
  fighter1: FighterInfo;
  fighter2: FighterInfo;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function GrappleCard({ icon, label, v1, v2, f1Name, f2Name, format }: {
  icon: React.ReactNode;
  label: string;
  v1: number;
  v2: number;
  f1Name: string;
  f2Name: string;
  format?: 'time' | 'number';
}) {
  const f1Display = format === 'time' ? formatTime(v1) : v1.toFixed(1);
  const f2Display = format === 'time' ? formatTime(v2) : v2.toFixed(1);
  const f1Wins = v1 > v2;
  const f2Wins = v2 > v1;

  return (
    <div className="rounded-lg bg-dark-bg p-3">
      <div className="mb-2 flex items-center gap-1.5">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider text-dark-textMuted">{label}</span>
      </div>
      <div className="grid grid-cols-3 items-center gap-2 text-center">
        <div>
          <span className={`text-lg font-bold ${f1Wins ? 'text-ufc-red' : 'text-dark-text'}`}>
            {f1Display}
          </span>
          <p className="text-[9px] text-dark-textMuted">{f1Name}</p>
        </div>
        <span className="text-xs font-bold text-dark-textMuted">vs</span>
        <div>
          <span className={`text-lg font-bold ${f2Wins ? 'text-blue-400' : 'text-dark-text'}`}>
            {f2Display}
          </span>
          <p className="text-[9px] text-dark-textMuted">{f2Name}</p>
        </div>
      </div>
    </div>
  );
}

export function GrapplingComparison({ fighter1, fighter2 }: Props) {
  const f1 = fighter1 as unknown as Record<string, unknown>;
  const f2 = fighter2 as unknown as Record<string, unknown>;

  const f1Ctrl = f1.avgCtrlTimeSec as number | undefined;
  const f2Ctrl = f2.avgCtrlTimeSec as number | undefined;
  const f1Td = f1.avgTdLanded as number | undefined;
  const f2Td = f2.avgTdLanded as number | undefined;
  const f1Sub = f1.avgSubAtt as number | undefined;
  const f2Sub = f2.avgSubAtt as number | undefined;

  // Only render if we have at least some grappling data
  if (f1Ctrl == null && f1Td == null && f2Ctrl == null && f2Td == null) return null;

  const f1Last = fighter1.nome?.split(' ').pop() || 'F1';
  const f2Last = fighter2.nome?.split(' ').pop() || 'F2';

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-5">
      <h3 className="mb-1 font-display text-sm uppercase tracking-wider text-ufc-gold">
        Grappling Deep Dive
      </h3>
      <p className="mb-4 text-[11px] text-dark-textMuted">Medias por luta baseadas no historico recente</p>

      <div className="grid gap-3 sm:grid-cols-3">
        <GrappleCard
          icon={<Clock className="h-3.5 w-3.5 text-dark-textMuted" />}
          label="Controle/Luta"
          v1={f1Ctrl ?? 0}
          v2={f2Ctrl ?? 0}
          f1Name={f1Last}
          f2Name={f2Last}
          format="time"
        />
        <GrappleCard
          icon={<ArrowDownToLine className="h-3.5 w-3.5 text-dark-textMuted" />}
          label="TD/Luta"
          v1={f1Td ?? 0}
          v2={f2Td ?? 0}
          f1Name={f1Last}
          f2Name={f2Last}
        />
        <GrappleCard
          icon={<RotateCcw className="h-3.5 w-3.5 text-dark-textMuted" />}
          label="Sub Att/Luta"
          v1={f1Sub ?? 0}
          v2={f2Sub ?? 0}
          f1Name={f1Last}
          f2Name={f2Last}
        />
      </div>
    </div>
  );
}
