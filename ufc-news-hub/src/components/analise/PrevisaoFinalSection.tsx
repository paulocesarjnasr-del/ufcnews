import { Zap, AlertTriangle } from 'lucide-react';
import type { PrevisaoFinalSectionData } from '@/types/analise';
import { useTranslations } from 'next-intl';
import { SectionHeader } from './SectionHeader';

export function PrevisaoFinalSection({ data, sectionNumber}: { data: PrevisaoFinalSectionData; sectionNumber?: string }) {
  const winnerColor = data.winner_side === 'fighter1' ? 'text-ufc-red' : 'text-blue-400';

  const t = useTranslations('analise');
  return (
    <section>
      <SectionHeader number={sectionNumber ?? "11"} title={t('previsao_title')} accent={t('previsao_accent')} />

      <div className="rounded-xl border-2 border-ufc-red/30 bg-gradient-to-br from-dark-card via-dark-card to-ufc-red/5 p-8 md:p-12">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-dark-textMuted mb-2">Vencedor Previsto</p>
          <h3 className={`font-display text-5xl uppercase md:text-6xl ${winnerColor}`}>{data.winner_name}</h3>
          <div className="mt-4 flex items-center justify-center gap-3">
            {data.predicted_method && (
              <span className="rounded-full border border-dark-border bg-dark-bg px-4 py-1.5 text-sm text-dark-textMuted">
                {data.predicted_method}
              </span>
            )}
            <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${
              data.confidence_score >= 8 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              data.confidence_score >= 5 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
              'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {data.confidence_label}
            </span>
          </div>
        </div>

        {/* Explanation */}
        <div className="mx-auto max-w-3xl mb-8">
          <p className="text-sm leading-relaxed text-gray-200">{data.explanation}</p>
        </div>

        {/* X-Factor and Upset */}
        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <div className="rounded-lg border border-ufc-gold/30 bg-ufc-gold/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-ufc-gold" />
              <h4 className="font-display text-sm uppercase text-ufc-gold">{data.x_factor.title}</h4>
            </div>
            <p className="text-sm text-dark-textMuted">{data.x_factor.description}</p>
          </div>
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h4 className="font-display text-sm uppercase text-red-400">{data.upset_alert.title}</h4>
            </div>
            <p className="text-sm text-dark-textMuted">{data.upset_alert.description}</p>
          </div>
        </div>

        {/* Probabilities */}
        <div className="mx-auto max-w-md">
          <h4 className="mb-4 text-center font-display text-sm uppercase tracking-wider text-dark-textMuted">
            Probabilidades
          </h4>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-semibold text-ufc-red">{data.probabilities.fighter1.nome}</span>
                <span className="font-bold text-ufc-red">{data.probabilities.fighter1.percent}%</span>
              </div>
              <div className="h-5 overflow-hidden rounded-full bg-dark-bg">
                <div className="h-full rounded-full bg-ufc-red" style={{ width: `${data.probabilities.fighter1.percent}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-semibold text-blue-400">{data.probabilities.fighter2.nome}</span>
                <span className="font-bold text-blue-400">{data.probabilities.fighter2.percent}%</span>
              </div>
              <div className="h-5 overflow-hidden rounded-full bg-dark-bg">
                <div className="h-full rounded-full bg-blue-400" style={{ width: `${data.probabilities.fighter2.percent}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-semibold text-dark-textMuted">Draw/NC</span>
                <span className="font-bold text-dark-textMuted">{data.probabilities.draw}%</span>
              </div>
              <div className="h-5 overflow-hidden rounded-full bg-dark-bg">
                <div className="h-full rounded-full bg-dark-textMuted" style={{ width: `${data.probabilities.draw}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Value Picks */}
        {data.value_picks && (
          <div className="mt-10 mx-auto max-w-3xl">
            <h4 className="mb-4 text-center font-display text-sm uppercase tracking-wider text-ufc-gold">
              Apostas de Valor
            </h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-dark-border bg-dark-bg p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-dark-textMuted mb-2">Moneyline</p>
                <p className="font-display text-sm uppercase text-dark-text">{data.value_picks.moneyline.pick}</p>
                <p className="mt-1 text-xs text-dark-textMuted">{data.value_picks.moneyline.reasoning}</p>
              </div>
              <div className="rounded-lg border border-dark-border bg-dark-bg p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-dark-textMuted mb-2">Metodo</p>
                <p className="font-display text-sm uppercase text-dark-text">{data.value_picks.method.pick}</p>
                <p className="mt-1 text-xs text-dark-textMuted">{data.value_picks.method.reasoning}</p>
              </div>
              <div className="rounded-lg border border-dark-border bg-dark-bg p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-dark-textMuted mb-2">Over/Under</p>
                <p className="font-display text-sm uppercase text-dark-text">{data.value_picks.over_under.pick} {data.value_picks.over_under.rounds}.5 Rounds</p>
                <p className="mt-1 text-xs text-dark-textMuted">{data.value_picks.over_under.reasoning}</p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <div className="flex items-start gap-3">
                <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-green-400">Melhor Aposta de Valor</p>
                  <p className="mt-1 text-sm text-dark-text">{data.value_picks.best_value}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
