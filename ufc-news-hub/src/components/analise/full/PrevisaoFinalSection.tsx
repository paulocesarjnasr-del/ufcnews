import { SectionHeader } from './SectionHeader';
import type { PrevisaoFinalSectionData } from '@/types/analise';

interface PrevisaoFinalSectionProps {
  data: PrevisaoFinalSectionData;
}

function getConfidenceBadgeClasses(label: string): string {
  const normalized = label.toUpperCase();
  if (normalized === 'ALTA') {
    return 'bg-green-500/20 text-green-400 border border-green-500/30';
  }
  if (normalized === 'MEDIA-ALTA' || normalized === 'MÉDIA-ALTA') {
    return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
  }
  if (normalized === 'BAIXA') {
    return 'bg-red-500/20 text-red-400 border border-red-500/30';
  }
  // MEDIA or default
  return 'bg-dark-border text-dark-textMuted border border-dark-border';
}

export function PrevisaoFinalSection({ data }: PrevisaoFinalSectionProps) {
  const winnerColor = data.winner_side === 'fighter1' ? 'text-ufc-red' : 'text-blue-400';
  const confidenceClasses = getConfidenceBadgeClasses(data.confidence_label);

  return (
    <section>
      <SectionHeader number="11" title="Previsao" accent="Final" />

      {/* Winner Announcement */}
      <div className="neu-card p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-ufc-gold">
          VENCEDOR PREVISTO
        </p>
        <h3 className={`font-display text-4xl md:text-5xl uppercase mt-2 ${winnerColor}`}>
          {data.winner_name}
        </h3>
        <p className="text-lg text-dark-textMuted mt-2">
          {data.predicted_method}
        </p>
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 mt-4 text-sm font-bold uppercase ${confidenceClasses}`}>
          {data.confidence_label}
        </span>

        {/* Probability Bars */}
        <div className="mt-6">
          <div className="flex h-4 rounded-full overflow-hidden">
            <div
              className="bg-ufc-red"
              style={{ width: `${data.probabilities.fighter1.percent}%` }}
            />
            <div
              className="bg-blue-400"
              style={{ width: `${data.probabilities.fighter2.percent}%` }}
            />
            <div
              className="bg-dark-border"
              style={{ width: `${data.probabilities.draw}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-dark-textMuted">
            <span>
              <span className="text-ufc-red font-bold">{data.probabilities.fighter1.nome}</span>{' '}
              {data.probabilities.fighter1.percent}%
            </span>
            {data.probabilities.draw > 0 && (
              <span>Empate {data.probabilities.draw}%</span>
            )}
            <span>
              {data.probabilities.fighter2.percent}%{' '}
              <span className="text-blue-400 font-bold">{data.probabilities.fighter2.nome}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="neu-inset p-6 mt-6">
        <p className="text-sm text-dark-textMuted leading-relaxed">
          {data.explanation}
        </p>
      </div>

      {/* X-Factor & Upset Alert */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="neu-card p-5 border-l-4 border-ufc-gold">
          <p className="font-display text-sm uppercase text-ufc-gold">
            {data.x_factor.title}
          </p>
          <p className="text-sm text-dark-textMuted mt-2 leading-relaxed">
            {data.x_factor.description}
          </p>
        </div>
        <div className="neu-card p-5 border-l-4 border-red-500">
          <p className="font-display text-sm uppercase text-red-400">
            {data.upset_alert.title}
          </p>
          <p className="text-sm text-dark-textMuted mt-2 leading-relaxed">
            {data.upset_alert.description}
          </p>
        </div>
      </div>

      {/* Value Picks (optional) */}
      {data.value_picks && (
        <div className="mt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-dark-bg rounded-lg p-4">
              <p className="text-xs text-dark-textMuted uppercase tracking-wider">Moneyline</p>
              <p className="font-display text-lg text-dark-text mt-1">
                {data.value_picks.moneyline.pick}
              </p>
              <p className="text-sm text-dark-textMuted mt-2 leading-relaxed">
                {data.value_picks.moneyline.reasoning}
              </p>
            </div>
            <div className="bg-dark-bg rounded-lg p-4">
              <p className="text-xs text-dark-textMuted uppercase tracking-wider">Método</p>
              <p className="font-display text-lg text-dark-text mt-1">
                {data.value_picks.method.pick}
              </p>
              <p className="text-sm text-dark-textMuted mt-2 leading-relaxed">
                {data.value_picks.method.reasoning}
              </p>
            </div>
            <div className="bg-dark-bg rounded-lg p-4">
              <p className="text-xs text-dark-textMuted uppercase tracking-wider">
                Over/Under {data.value_picks.over_under.rounds} Rounds
              </p>
              <p className="font-display text-lg text-dark-text mt-1">
                {data.value_picks.over_under.pick}
              </p>
              <p className="text-sm text-dark-textMuted mt-2 leading-relaxed">
                {data.value_picks.over_under.reasoning}
              </p>
            </div>
          </div>
          <div className="neu-inset p-4 mt-4 border-l-4 border-ufc-gold">
            <p className="text-sm text-dark-textMuted">
              <span className="text-ufc-gold font-bold">Melhor Aposta:</span>{' '}
              {data.value_picks.best_value}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
