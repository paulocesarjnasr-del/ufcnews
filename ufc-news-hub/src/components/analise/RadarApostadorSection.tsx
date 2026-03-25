'use client';

import { useState } from 'react';
import {
  TrendingUp,
  Target,
  Zap,
  Shield,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Flame,
  Clock,
  Activity,
  Crosshair,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import type { RadarApostadorSectionData, EstatisticoEdge, ValuePick } from '@/types/analise';
import { useTranslations } from 'next-intl';
import { SectionHeader } from './SectionHeader';

const iconMap: Record<string, LucideIcon> = {
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

const edgeLevelConfig = {
  forte: { label: 'EDGE FORTE', bg: 'bg-green-500/20 text-green-400 border-green-500/30' },
  moderado: { label: 'EDGE MODERADO', bg: 'bg-ufc-gold/20 text-ufc-gold border-ufc-gold/30' },
  leve: { label: 'EDGE LEVE', bg: 'bg-blue-400/20 text-blue-400 border-blue-400/30' },
};

function OddsCard({ data }: { data: RadarApostadorSectionData['odds'] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="group relative overflow-hidden rounded-xl border border-ufc-red/30 bg-gradient-to-br from-ufc-red/10 via-dark-card to-dark-card p-6 transition-all duration-500 hover:border-ufc-red/60 hover:shadow-[0_0_40px_rgba(210,10,10,0.15)]">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-ufc-red opacity-60 group-hover:opacity-100 transition-opacity" />
        <p className="text-xs uppercase tracking-widest text-dark-textMuted mb-1">Favorito</p>
        <p className="font-display text-xl text-ufc-red uppercase">{data.fighter1_name}</p>
        <p className="font-display text-4xl text-dark-text mt-2">{data.fighter1_odds}</p>
      </div>
      <div className="group relative overflow-hidden rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-400/10 via-dark-card to-dark-card p-6 transition-all duration-500 hover:border-blue-400/60 hover:shadow-[0_0_40px_rgba(96,165,250,0.15)]">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        <p className="text-xs uppercase tracking-widest text-dark-textMuted mb-1">Underdog</p>
        <p className="font-display text-xl text-blue-400 uppercase">{data.fighter2_name}</p>
        <p className="font-display text-4xl text-dark-text mt-2">{data.fighter2_odds}</p>
      </div>
      <p className="sm:col-span-2 text-center text-[10px] text-dark-textMuted">{data.source}</p>
    </div>
  );
}

function EdgeCard({ edge }: { edge: EstatisticoEdge }) {
  const Icon = iconMap[edge.icon] || Target;
  const config = edgeLevelConfig[edge.edge_level];
  const sideColor = edge.fighter_side === 'fighter1'
    ? 'border-l-ufc-red'
    : edge.fighter_side === 'fighter2'
    ? 'border-l-blue-400'
    : 'border-l-ufc-gold';

  return (
    <div className={`group rounded-xl border border-dark-border bg-dark-card p-5 transition-all duration-300 hover:border-dark-border/80 hover:shadow-lg border-l-4 ${sideColor}`}>
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ufc-gold/10">
          <Icon className="h-5 w-5 text-ufc-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="font-display text-sm uppercase tracking-wider text-dark-text">{edge.titulo}</p>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${config.bg}`}>{config.label}</span>
          </div>
          <p className="font-display text-xl text-ufc-gold mb-2">{edge.stat_headline}</p>
          <p className="text-sm text-gray-300 leading-relaxed mb-2">{edge.contexto}</p>
          <div className="rounded-lg bg-dark-bg border border-dark-border/50 px-3 py-2">
            <p className="text-xs text-ufc-gold">
              <span className="font-bold uppercase tracking-wider">Implicacao:</span>{' '}
              <span className="text-gray-300">{edge.implicacao_aposta}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const confiancaConfig = {
  baixa: { label: 'BAIXA', bg: 'bg-red-500/20 text-red-400 border-red-500/30' },
  media: { label: 'MEDIA', bg: 'bg-ufc-gold/20 text-ufc-gold border-ufc-gold/30' },
  alta: { label: 'ALTA', bg: 'bg-green-500/20 text-green-400 border-green-500/30' },
};

function ValuePickCard({ pick, rank }: { pick: ValuePick; rank: number }) {
  const [expanded, setExpanded] = useState(false);
  const conf = confiancaConfig[pick.confianca];

  return (
    <div className="rounded-xl border border-dark-border bg-dark-card overflow-hidden transition-all duration-300 hover:border-ufc-gold/40">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-center gap-4"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ufc-gold/20 font-display text-sm text-ufc-gold">
          #{rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="rounded-full bg-dark-bg border border-dark-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-dark-textMuted">
              {pick.tipo}
            </span>
            <span className="font-display text-sm text-ufc-gold">{pick.odds}</span>
          </div>
          <p className="font-semibold text-dark-text text-sm">{pick.pick}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`hidden sm:inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${conf.bg}`}>
            {conf.label}
          </span>
          {expanded ? <ChevronUp className="h-4 w-4 text-dark-textMuted" /> : <ChevronDown className="h-4 w-4 text-dark-textMuted" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-dark-border/50 bg-dark-bg px-5 py-4 space-y-2">
          {pick.edge_vs_mercado && (
            <div className="rounded-lg bg-ufc-gold/5 border border-ufc-gold/20 px-3 py-2">
              <p className="text-xs font-bold text-ufc-gold">{pick.edge_vs_mercado}</p>
            </div>
          )}
          <p className="text-sm text-gray-300 leading-relaxed">{pick.raciocinio}</p>
          <span className={`sm:hidden inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${conf.bg}`}>
            Confianca: {conf.label}
          </span>
        </div>
      )}
    </div>
  );
}

export function RadarApostadorSection({ data}: { data: RadarApostadorSectionData }) {
  const t = useTranslations('analise');
  return (
    <section>
      <SectionHeader number="15" title={t('radar_title')} accent={t('radar_accent')} />

      {/* Odds Display */}
      <div className="mb-8">
        <OddsCard data={data.odds} />
      </div>

      {/* Statistical Edges */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-ufc-gold" />
          <p className="font-display text-lg uppercase tracking-wider text-dark-text">
            Edges <span className="text-ufc-gold">Estatisticos</span>
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {data.edges.map((edge, i) => (
            <EdgeCard key={i} edge={edge} />
          ))}
        </div>
      </div>

      {/* Value Picks */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-4 w-4 text-ufc-gold" />
          <p className="font-display text-lg uppercase tracking-wider text-dark-text">
            Apostas de <span className="text-ufc-gold">Valor</span>
          </p>
        </div>
        <div className="space-y-3">
          {data.value_picks.map((pick, i) => (
            <ValuePickCard key={i} pick={pick} rank={i + 1} />
          ))}
        </div>
      </div>

      {/* Trap Warning */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
          <div>
            <p className="font-display text-sm uppercase tracking-wider text-red-400 mb-1">{data.armadilha.titulo}</p>
            <p className="text-sm text-gray-300 leading-relaxed">{data.armadilha.descricao}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-center text-[10px] text-dark-textMuted italic">{data.disclaimer}</p>
    </section>
  );
}
