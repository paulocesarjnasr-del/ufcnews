import { SectionHeader } from './SectionHeader';
import type { OponenteComumSectionData } from '@/types/analise';

interface OponenteComumSectionProps {
  data: OponenteComumSectionData;
  fighter1Name: string;
  fighter2Name: string;
}

function ResultBadge({ resultado }: { resultado: string }) {
  const isVitoria = resultado.toLowerCase().includes('vitoria');
  const isDerrota = resultado.toLowerCase().includes('derrota');

  let badgeClass = 'bg-dark-border/50 text-dark-text';
  if (isVitoria) badgeClass = 'bg-green-500/20 text-green-400';
  if (isDerrota) badgeClass = 'bg-red-500/20 text-red-400';

  return (
    <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${badgeClass}`}>
      {resultado}
    </span>
  );
}

export function OponenteComumSection({ data, fighter1Name, fighter2Name }: OponenteComumSectionProps) {
  const { oponente_nome, fighter1_result, fighter2_result, insight } = data;

  const cards = [
    {
      name: fighter1Name,
      result: fighter1_result,
      borderColor: 'border-ufc-red',
      textColor: 'text-ufc-red',
    },
    {
      name: fighter2Name,
      result: fighter2_result,
      borderColor: 'border-blue-400',
      textColor: 'text-blue-400',
    },
  ];

  return (
    <section>
      <SectionHeader number="04" title="Spotlight:" accent={oponente_nome} />

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map(({ name, result, borderColor, textColor }) => (
          <div key={name} className={`neu-card p-6 border-t-4 ${borderColor}`}>
            <h3 className={`font-display text-lg uppercase ${textColor}`}>
              {name} vs {oponente_nome}
            </h3>
            <p className="text-xs text-dark-textMuted mt-1">
              {result.data} | {result.evento}
            </p>

            <div className="mt-3">
              <ResultBadge resultado={result.resultado} />
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-sm text-dark-text">{result.metodo}</p>
              <p className="text-sm text-dark-text">{result.duracao}</p>
            </div>

            <p className="text-sm text-dark-textMuted mt-3">
              {result.contexto}
            </p>

            <p className="text-sm text-dark-textMuted mt-2 italic">
              {result.performance}
            </p>
          </div>
        ))}
      </div>

      {/* Insight */}
      <div className="neu-inset p-4 mt-6">
        <p className="text-sm text-dark-textMuted leading-relaxed">
          {insight}
        </p>
      </div>
    </section>
  );
}
