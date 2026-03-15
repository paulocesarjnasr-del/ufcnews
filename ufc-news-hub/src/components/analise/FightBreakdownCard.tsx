'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { FightAnalysisItem } from '@/types/analise';
import { TacticalBreakdownDynamic } from './TacticalBreakdownDynamic';
import { FightPredictionDynamic } from './FightPredictionDynamic';
import { BettingValueSection } from './BettingValueSection';

interface Props {
  fight: FightAnalysisItem;
  isMainEvent: boolean;
}

function TipoBadge({ tipo }: { tipo: string }) {
  const label =
    tipo === 'co_main' ? 'CO-MAIN' :
    tipo === 'card_principal' ? 'CARD PRINCIPAL' :
    tipo === 'main_event' ? 'MAIN EVENT' :
    tipo.toUpperCase().replace(/_/g, ' ');

  const color =
    tipo === 'main_event' ? 'bg-ufc-red/20 text-ufc-red border-ufc-red/30' :
    tipo === 'co_main' ? 'bg-ufc-gold/20 text-ufc-gold border-ufc-gold/30' :
    'bg-dark-border text-dark-textMuted border-dark-border';

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${color}`}>
      {label}
    </span>
  );
}

function MiniStat({ label, v1, v2, suffix = '' }: { label: string; v1?: number; v2?: number; suffix?: string }) {
  if (v1 == null && v2 == null) return null;
  const val1 = v1 ?? 0;
  const val2 = v2 ?? 0;
  const highlight1 = val1 > val2 ? 'text-green-400 font-bold' : 'text-dark-text';
  const highlight2 = val2 > val1 ? 'text-green-400 font-bold' : 'text-dark-text';

  return (
    <div className="grid grid-cols-3 items-center gap-2 text-center text-xs">
      <span className={highlight1}>{val1}{suffix}</span>
      <span className="text-dark-textMuted">{label}</span>
      <span className={highlight2}>{val2}{suffix}</span>
    </div>
  );
}

function WinnerBadge({ fight }: { fight: FightAnalysisItem }) {
  const winner = fight.fight_prediction.predictedWinner === 'fighter1'
    ? fight.fighter1_info.nome
    : fight.fighter2_info.nome;

  return (
    <div className="flex items-center gap-2">
      <Trophy className="h-4 w-4 text-ufc-gold" />
      <span className="text-sm font-bold text-ufc-gold">{winner}</span>
      <span className="rounded bg-dark-border px-2 py-0.5 text-[10px] text-dark-textMuted">
        {fight.fight_prediction.predictedMethod}
      </span>
    </div>
  );
}

function CompactBettingBadges({ fight }: { fight: FightAnalysisItem }) {
  const betting = fight.betting_value;
  const moneylineName = betting.moneyline.pick === 'fighter1'
    ? fight.fighter1_info.nome.split(' ').pop()
    : fight.fighter2_info.nome.split(' ').pop();

  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-1 rounded-full bg-dark-bg px-2.5 py-1 text-[10px] font-medium text-dark-text">
        <span className="text-dark-textMuted">ML:</span> {moneylineName}
        <span className="text-ufc-gold">({betting.moneyline.confidence}/10)</span>
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-dark-bg px-2.5 py-1 text-[10px] font-medium text-dark-text">
        <span className="text-dark-textMuted">Method:</span> {betting.method.pick}
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-dark-bg px-2.5 py-1 text-[10px] font-medium text-dark-text">
        <span className="text-dark-textMuted">O/U:</span>{' '}
        {betting.over_under.pick === 'over' ? 'Over' : 'Under'} {betting.over_under.rounds}.5
      </span>
    </div>
  );
}

export function FightBreakdownCard({ fight, isMainEvent }: Props) {
  const [expanded, setExpanded] = useState(false);

  const f1 = fight.fighter1_info;
  const f2 = fight.fighter2_info;

  // ================================
  // MAIN EVENT: expanded by default
  // ================================
  if (isMainEvent) {
    return (
      <div className="space-y-8">
        {/* Article */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
          <div
            className="prose prose-invert max-w-none text-dark-text prose-headings:text-dark-text prose-p:text-dark-textMuted prose-strong:text-dark-text prose-a:text-ufc-red"
            dangerouslySetInnerHTML={{ __html: fight.artigo_conteudo }}
          />
        </div>

        {/* Tactical Breakdown */}
        <TacticalBreakdownDynamic
          data={fight.tactical_breakdown}
          fighter1={f1}
          fighter2={f2}
        />

        {/* Fight Prediction */}
        <FightPredictionDynamic
          data={fight.fight_prediction}
          fighter1={f1}
          fighter2={f2}
        />

        {/* Betting Value */}
        <BettingValueSection
          betting={fight.betting_value}
          fighter1Name={f1.nome}
          fighter2Name={f2.nome}
        />
      </div>
    );
  }

  // ================================
  // NON-MAIN: collapsible card
  // ================================
  return (
    <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
      {/* Clickable header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left transition-colors hover:bg-dark-border/20"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <TipoBadge tipo={fight.fight_type} />
              <span className="text-xs text-dark-textMuted">{fight.categoria_peso}</span>
              {fight.is_titulo && (
                <span className="inline-flex items-center gap-1 rounded-full bg-ufc-gold/20 px-2 py-0.5 text-[10px] font-bold text-ufc-gold">
                  <Trophy className="h-3 w-3" /> TITULO
                </span>
              )}
            </div>
            <h3 className="font-display text-lg uppercase text-dark-text md:text-xl">
              <span className="text-ufc-red">{f1.nome}</span>
              <span className="mx-2 text-dark-textMuted">vs</span>
              <span className="text-blue-400">{f2.nome}</span>
            </h3>
          </div>
          <div className="flex-shrink-0 text-dark-textMuted">
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </div>

        {/* Mini stat comparison */}
        <div className="mt-4 rounded-lg bg-dark-bg p-3">
          <div className="mb-2 grid grid-cols-3 text-center text-[10px] font-bold uppercase tracking-wider text-dark-textMuted">
            <span>{f1.nome.split(' ').pop()}</span>
            <span>Stat</span>
            <span>{f2.nome.split(' ').pop()}</span>
          </div>
          <div className="space-y-1.5">
            <MiniStat label="SLpM" v1={f1.sigStrikesPerMin} v2={f2.sigStrikesPerMin} />
            <MiniStat label="Str Acc" v1={f1.strikeAccuracy} v2={f2.strikeAccuracy} suffix="%" />
            <MiniStat label="TD Acc" v1={f1.tdAccuracy} v2={f2.tdAccuracy} suffix="%" />
            <MiniStat label="TD Def" v1={f1.tdDefense} v2={f2.tdDefense} suffix="%" />
          </div>
        </div>

        {/* Short article preview */}
        <div
          className="mt-3 line-clamp-3 text-sm leading-relaxed text-dark-textMuted"
          dangerouslySetInnerHTML={{
            __html: fight.artigo_conteudo.replace(/<[^>]*>/g, '').slice(0, 250) + '...',
          }}
        />

        {/* Compact betting badges & winner */}
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CompactBettingBadges fight={fight} />
          <WinnerBadge fight={fight} />
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-dark-border p-5 space-y-6">
          {/* Full article */}
          <div
            className="prose prose-invert max-w-none text-dark-text prose-headings:text-dark-text prose-p:text-dark-textMuted prose-strong:text-dark-text prose-a:text-ufc-red"
            dangerouslySetInnerHTML={{ __html: fight.artigo_conteudo }}
          />

          {/* Tactical Breakdown */}
          <TacticalBreakdownDynamic
            data={fight.tactical_breakdown}
            fighter1={f1}
            fighter2={f2}
          />

          {/* Fight Prediction */}
          <FightPredictionDynamic
            data={fight.fight_prediction}
            fighter1={f1}
            fighter2={f2}
          />

          {/* Betting Value */}
          <BettingValueSection
            betting={fight.betting_value}
            fighter1Name={f1.nome}
            fighter2Name={f2.nome}
          />
        </div>
      )}
    </div>
  );
}
