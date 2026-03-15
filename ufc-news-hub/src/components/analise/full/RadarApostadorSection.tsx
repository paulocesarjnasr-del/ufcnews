'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Flame,
  Clock,
  Activity,
  Crosshair,
  BarChart3,
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import type { RadarApostadorSectionData } from '@/types/analise';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Target,
  Zap,
  Shield,
  AlertTriangle,
  Flame,
  Clock,
  Activity,
  Crosshair,
  BarChart3,
};

function getIconComponent(name: string) {
  return iconMap[name] ?? Target;
}

function fighterSideColor(side?: 'fighter1' | 'fighter2' | 'neutral') {
  if (side === 'fighter1') return 'text-ufc-red';
  if (side === 'fighter2') return 'text-blue-400';
  return 'text-ufc-gold';
}

function edgeLevelBadge(level: 'forte' | 'moderado' | 'leve') {
  const styles = {
    forte: 'bg-green-500/20 text-green-400 border border-green-500/30',
    moderado: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    leve: 'bg-dark-border text-dark-textMuted border border-dark-border',
  };
  return styles[level];
}

function confiancaBadge(level: 'baixa' | 'media' | 'alta') {
  const styles = {
    alta: 'bg-green-500/20 text-green-400 border border-green-500/30',
    media: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    baixa: 'bg-red-500/20 text-red-400 border border-red-500/30',
  };
  return styles[level];
}

export function RadarApostadorSection({ data }: { data: RadarApostadorSectionData }) {
  const [expandedEdges, setExpandedEdges] = useState<Set<number>>(new Set());

  function toggleEdge(index: number) {
    setExpandedEdges((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section>
      <SectionHeader number="15" title="Radar do" accent="Apostador" />

      {/* Odds Banner */}
      <div className="neu-card p-6">
        <div className="grid grid-cols-3 items-center">
          <div className="text-center">
            <span className="font-display text-3xl text-ufc-red">
              {data.odds.fighter1_odds}
            </span>
            <p className="text-sm text-dark-textMuted mt-1">{data.odds.fighter1_name}</p>
          </div>
          <div className="text-center">
            <span className="font-display text-lg text-dark-border/50">VS</span>
          </div>
          <div className="text-center">
            <span className="font-display text-3xl text-blue-400">
              {data.odds.fighter2_odds}
            </span>
            <p className="text-sm text-dark-textMuted mt-1">{data.odds.fighter2_name}</p>
          </div>
        </div>
        <p className="text-[10px] text-dark-textMuted text-center mt-3">
          {data.odds.source}
        </p>
      </div>

      {/* Statistical Edges */}
      <div className="mt-6">
        <h3 className="font-display text-lg uppercase text-dark-text mb-4">
          Edges Estatisticos
        </h3>
        <div className="space-y-3">
          {data.edges.map((edge, i) => {
            const IconComp = getIconComponent(edge.icon);
            const isExpanded = expandedEdges.has(i);

            return (
              <div key={edge.titulo} className="neu-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleEdge(i)}
                  className="w-full p-4 flex items-center gap-3 cursor-pointer hover:bg-dark-border/10 transition-colors text-left"
                >
                  <IconComp className={`w-5 h-5 ${fighterSideColor(edge.fighter_side)}`} />
                  <span className="text-sm font-bold text-dark-text flex-1">
                    {edge.titulo}
                  </span>
                  <span
                    className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${edgeLevelBadge(edge.edge_level)}`}
                  >
                    {edge.edge_level}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-dark-textMuted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-dark-textMuted" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-dark-border/30">
                    <p className="text-sm font-bold text-ufc-gold uppercase mt-3">
                      {edge.stat_headline}
                    </p>
                    <p className="text-sm text-dark-textMuted leading-relaxed mt-2">
                      {edge.contexto}
                    </p>
                    <p className="text-sm text-dark-text leading-relaxed mt-3 bg-dark-bg/50 p-3 rounded-lg">
                      {edge.implicacao_aposta}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Value Picks */}
      <div className="mt-6">
        <h3 className="font-display text-lg uppercase text-dark-text mb-4">Value Picks</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {data.value_picks.map((pick) => (
            <div key={`${pick.tipo}-${pick.pick}`} className="neu-card p-5">
              <span className="text-[10px] uppercase tracking-wider text-dark-textMuted">
                {pick.tipo}
              </span>
              <p className="font-display text-lg uppercase text-dark-text mt-1">
                {pick.pick}
              </p>
              <span className="text-sm text-ufc-gold font-bold">{pick.odds}</span>
              <span
                className={`ml-2 text-[10px] uppercase px-2 py-0.5 rounded-full ${confiancaBadge(pick.confianca)}`}
              >
                {pick.confianca}
              </span>
              {pick.edge_vs_mercado && (
                <p className="text-xs text-ufc-gold italic mt-2">
                  {pick.edge_vs_mercado}
                </p>
              )}
              <p className="text-sm text-dark-textMuted leading-relaxed mt-3">
                {pick.raciocinio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Armadilha */}
      <div className="mt-6">
        <div className="neu-card p-5 border-l-4 border-red-500">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="font-display text-sm uppercase text-red-400">
              {data.armadilha.titulo}
            </span>
          </div>
          <p className="text-sm text-dark-textMuted leading-relaxed mt-2">
            {data.armadilha.descricao}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-[10px] text-dark-textMuted text-center leading-relaxed">
        {data.disclaimer}
      </p>
    </section>
  );
}
