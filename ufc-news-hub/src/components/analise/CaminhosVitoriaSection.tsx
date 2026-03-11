import type { CaminhosVitoriaSectionData, CaminhoVitoria } from '@/types/analise';
import { SectionHeader } from './SectionHeader';

function ScenarioList({
  nome,
  total,
  scenarios,
  accentClass,
  borderClass,
  badgeClass,
}: {
  nome: string;
  total: number;
  scenarios: CaminhoVitoria[];
  accentClass: string;
  borderClass: string;
  badgeClass: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className={`h-8 w-1 rounded-full ${accentClass === 'text-ufc-red' ? 'bg-ufc-red' : 'bg-blue-400'}`} />
        <h3 className={`font-display text-lg uppercase ${accentClass}`}>{nome} - {total}% Total</h3>
      </div>
      <div className="space-y-4">
        {scenarios.map((scenario, i) => (
          <div key={i} className={`rounded-lg border ${borderClass} bg-dark-card p-5`}>
            <div className="mb-2 flex items-center justify-between">
              <h4 className={`font-display text-sm uppercase ${accentClass}`}>{scenario.name}</h4>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}>{scenario.probability}%</span>
            </div>
            <p className="mb-1 text-xs font-semibold text-dark-text">{scenario.method}</p>
            <p className="text-xs text-dark-textMuted">{scenario.description}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-dark-bg">
              <div
                className={`h-full rounded-full ${accentClass === 'text-ufc-red' ? 'bg-ufc-red' : 'bg-blue-400'}`}
                style={{ width: `${scenario.probability}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaminhosVitoriaSection({ data }: { data: CaminhosVitoriaSectionData }) {
  // Validate: if scenario sums don't match total, recalculate proportionally
  const normalizeScenarios = (scenarios: CaminhoVitoria[], total: number): CaminhoVitoria[] => {
    const sum = scenarios.reduce((s, sc) => s + sc.probability, 0);
    if (Math.abs(sum - total) < 2) return scenarios; // close enough
    if (sum === 0) return scenarios;
    return scenarios.map(sc => ({
      ...sc,
      probability: Math.round((sc.probability / sum) * total),
    }));
  };

  const f1Scenarios = normalizeScenarios(data.fighter1.scenarios, data.fighter1.total_probability);
  const f2Scenarios = normalizeScenarios(data.fighter2.scenarios, data.fighter2.total_probability);

  return (
    <section>
      <SectionHeader number="10" title="Caminhos Para" accent="Vitoria" />

      <div className="grid gap-8 lg:grid-cols-2">
        <ScenarioList
          nome={data.fighter1.nome}
          total={data.fighter1.total_probability}
          scenarios={f1Scenarios}
          accentClass="text-ufc-red"
          borderClass="border-ufc-red/20"
          badgeClass="bg-ufc-red/20 text-ufc-red"
        />
        <ScenarioList
          nome={data.fighter2.nome}
          total={data.fighter2.total_probability}
          scenarios={f2Scenarios}
          accentClass="text-blue-400"
          borderClass="border-blue-400/20"
          badgeClass="bg-blue-400/20 text-blue-400"
        />
      </div>
    </section>
  );
}
