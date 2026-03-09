import { SectionHeader } from './SectionHeader';
import type { NivelCompeticaoSectionData } from '@/types/analise';

interface NivelCompeticaoSectionProps {
  data: NivelCompeticaoSectionData;
}

function RatingDots({ value, color }: { value: number; color: 'red' | 'blue' }) {
  const fillClass = color === 'red' ? 'bg-ufc-red' : 'bg-blue-400';

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-full ${i < value ? fillClass : 'bg-dark-border'}`}
        />
      ))}
    </div>
  );
}

export function NivelCompeticaoSection({ data }: NivelCompeticaoSectionProps) {
  const { fighter1, fighter2 } = data;

  const fighters = [
    { fighter: fighter1, color: 'red' as const, textColor: 'text-ufc-red' },
    { fighter: fighter2, color: 'blue' as const, textColor: 'text-blue-400' },
  ];

  return (
    <section>
      <SectionHeader number="03" title="Nivel de" accent="Competicao" />

      <div className="grid md:grid-cols-2 gap-6">
        {fighters.map(({ fighter, color, textColor }) => (
          <div key={fighter.nome} className="neu-card p-6">
            <h3 className={`font-display text-xl uppercase ${textColor}`}>
              {fighter.nome}
            </h3>

            {/* Media Oponentes */}
            <div className="mt-4">
              <span className="text-xs uppercase tracking-wider text-dark-textMuted">
                Media dos Oponentes
              </span>
              <div className="flex items-center gap-3 mt-1.5">
                <RatingDots value={fighter.media_oponentes} color={color} />
                {fighter.media_oponentes_label && (
                  <span className="text-sm text-dark-text">
                    {fighter.media_oponentes_label}
                  </span>
                )}
              </div>
            </div>

            {/* Aproveitamento */}
            <div className="mt-4">
              <span className="text-xs uppercase tracking-wider text-dark-textMuted">
                Aproveitamento
              </span>
              <p className="font-display text-2xl text-dark-text mt-1">
                {fighter.aproveitamento}
              </p>
            </div>

            {/* Contra Top 5 */}
            <div className="mt-4">
              <span className="text-xs uppercase tracking-wider text-dark-textMuted">
                Contra Top 5
              </span>
              <p className="text-lg text-dark-text mt-1">
                {fighter.contra_top5}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
