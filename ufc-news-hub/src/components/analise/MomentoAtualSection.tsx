'use client';

import { useState } from 'react';
import { TrendingUp, Activity, AlertTriangle, X } from 'lucide-react';
import type { MomentoAtualSectionData, MomentoAtualFighter } from '@/types/analise';
import { SectionHeader } from './SectionHeader';

function FighterTimeline({ fighter }: { fighter: MomentoAtualFighter }) {
  const [showHistory, setShowHistory] = useState(false);
  const isRed = fighter.color === 'red';
  const accentClass = isRed ? 'text-ufc-red' : 'text-blue-400';
  const bgAccent = isRed ? 'bg-ufc-red' : 'bg-blue-400';
  const TrendIcon = fighter.momentum_trend === 'resilient' ? Activity : TrendingUp;
  const trendColor = fighter.momentum_trend === 'descending' ? 'text-red-400' : isRed ? 'text-green-400' : 'text-blue-400';

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className={`h-8 w-1 rounded-full ${bgAccent}`} />
        <h3 className={`font-display text-xl uppercase ${accentClass}`}>{fighter.nome}</h3>
        <span className="text-xs text-dark-textMuted">Ultimas {fighter.recent_fights.length} Lutas</span>
      </div>

      <div className="space-y-4">
        {fighter.recent_fights.map((fight, i) => (
          <div key={i} className="rounded-lg border border-dark-border/50 bg-dark-bg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${fight.result === 'W' ? 'bg-green-500/20 text-green-400' : fight.result === 'L' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {fight.result}
                </span>
                <div>
                  <span className="font-semibold text-dark-text">{fight.opponent}</span>
                  <span className="ml-2 text-xs text-dark-textMuted">{fight.opponent_rank}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-dark-textMuted">{fight.date}</span>
                <p className="text-xs font-semibold text-dark-text">{fight.method}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-dark-textMuted">Qualidade</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                fight.quality_score >= 5 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                fight.quality_score >= 4 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                fight.quality_score >= 3 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                fight.quality_score >= 2 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {fight.quality_label || (['', 'Ruim', 'Medio', 'Bom', 'Muito Bom', 'Excelente'][fight.quality_score] || `${fight.quality_score}/5`)}
              </span>
            </div>
            <p className="text-xs italic text-dark-textMuted">{fight.note}</p>
          </div>
        ))}
      </div>

      {/* Full History Modal Trigger */}
      {fighter.full_fight_history && fighter.full_fight_history.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowHistory(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dark-border bg-dark-bg px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-dark-textMuted hover:text-dark-text transition-colors"
          >
            Ver historico completo ({fighter.full_fight_history.length} lutas)
          </button>
        </div>
      )}

      {/* Full History Modal */}
      {showHistory && fighter.full_fight_history && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowHistory(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl max-h-[80vh] rounded-xl border border-dark-border bg-dark-card overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`sticky top-0 z-10 flex items-center justify-between border-b border-dark-border bg-dark-card px-6 py-4`}>
              <h3 className={`font-display text-lg uppercase ${accentClass}`}>
                {fighter.nome} - Historico Completo
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className="rounded-lg border border-dark-border bg-dark-bg p-2 text-dark-textMuted hover:text-dark-text transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto p-4 space-y-2" style={{ maxHeight: 'calc(80vh - 65px)' }}>
              {fighter.full_fight_history.map((fight, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-dark-border/30 bg-dark-bg px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${fight.result === 'W' ? 'bg-green-500/20 text-green-400' : fight.result === 'L' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {fight.result}
                    </span>
                    <span className="text-xs font-semibold text-dark-text">{fight.opponent}</span>
                    <span className="text-[10px] text-dark-textMuted">{fight.opponent_rank}</span>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <span className="text-[10px] text-dark-textMuted">{fight.method}</span>
                    <span className="text-[10px] text-dark-textMuted">{fight.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Layoff Warning */}
      {fighter.layoff_warning && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-500" />
          <span className="text-sm font-bold text-yellow-500">{fighter.layoff_warning}</span>
        </div>
      )}

      {/* Momentum */}
      <div className="mt-4 rounded-lg border border-dark-border/50 bg-dark-bg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-dark-textMuted">Momentum</span>
          <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
            fighter.momentum_trend === 'descending' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
            fighter.momentum_trend === 'resilient' ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' :
            'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}>{fighter.momentum_label}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
          <p className="text-xs text-dark-textMuted">{fighter.momentum_note}</p>
        </div>
      </div>
    </div>
  );
}

export function MomentoAtualSection({ data }: { data: MomentoAtualSectionData }) {
  return (
    <section>
      <SectionHeader number="02" title="Momento" accent="Atual" />
      <div className="grid gap-8 lg:grid-cols-2">
        <FighterTimeline fighter={data.fighter1} />
        <FighterTimeline fighter={data.fighter2} />
      </div>
    </section>
  );
}
