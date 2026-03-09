import { SectionHeader } from './SectionHeader';
import type { CaminhosVitoriaSectionData, CaminhoVitoria } from '@/types/analise';

interface CaminhosVitoriaSectionProps {
  data: CaminhosVitoriaSectionData;
}

function ScenarioCard({ scenario, color }: { scenario: CaminhoVitoria; color: 'red' | 'blue' }) {
  const isRed = color === 'red';
  const barBg = isRed ? 'bg-ufc-red' : 'bg-blue-400';
  const nameColor = isRed ? 'text-ufc-red' : 'text-blue-400';
  const badgeClasses = isRed
    ? 'bg-ufc-red/20 text-ufc-red'
    : 'bg-blue-400/20 text-blue-400';

  return (
    <div className="bg-dark-bg rounded-lg p-4 mt-3">
      <p className={`font-display text-sm uppercase ${nameColor}`}>
        {scenario.name}
      </p>

      <div className="mt-2">
        <div className="h-2 rounded-full bg-dark-border">
          <div
            className={`h-2 rounded-full ${barBg}`}
            style={{ width: `${scenario.probability}%` }}
          />
        </div>
        <p className="text-xs text-dark-textMuted text-right mt-1">
          {scenario.probability}%
        </p>
      </div>

      <span className={`inline-block ${badgeClasses} text-xs px-2 py-0.5 rounded mt-2`}>
        {scenario.method}
      </span>

      <p className="text-sm text-dark-textMuted leading-relaxed mt-2">
        {scenario.description}
      </p>
    </div>
  );
}

function FighterColumn({
  fighter,
  color,
}: {
  fighter: CaminhosVitoriaSectionData['fighter1'];
  color: 'red' | 'blue';
}) {
  const isRed = color === 'red';
  const borderColor = isRed ? 'border-ufc-red' : 'border-blue-400';
  const nameColor = isRed ? 'text-ufc-red' : 'text-blue-400';

  return (
    <div className={`neu-card p-6 border-t-4 ${borderColor}`}>
      <p className={`font-display text-xl uppercase ${nameColor}`}>
        {fighter.nome}
      </p>

      <div className="mt-4">
        <span className="font-display text-5xl text-dark-text">
          {fighter.total_probability}
          <span className="text-2xl">%</span>
        </span>
        <p className="text-xs text-dark-textMuted uppercase tracking-wider mt-1">
          Probabilidade Total
        </p>
      </div>

      <div className="mt-4">
        {fighter.scenarios.map((scenario) => (
          <ScenarioCard key={scenario.name} scenario={scenario} color={color} />
        ))}
      </div>
    </div>
  );
}

export function CaminhosVitoriaSection({ data }: CaminhosVitoriaSectionProps) {
  return (
    <section>
      <SectionHeader number="10" title="Caminhos Para" accent="Vitoria" />

      <div className="grid md:grid-cols-2 gap-6">
        <FighterColumn fighter={data.fighter1} color="red" />
        <FighterColumn fighter={data.fighter2} color="blue" />
      </div>
    </section>
  );
}
