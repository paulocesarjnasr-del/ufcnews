import type { ComparacaoEstatisticaSectionData } from '@/types/analise';
import { useTranslations } from 'next-intl';
import { SectionHeader } from './SectionHeader';
import { StatBar } from './StatBar';

function formatValue(value: number, format?: 'decimal' | 'percent' | 'integer'): string {
  if (format === 'percent') return `${value}%`;
  if (format === 'decimal') return value.toFixed(2);
  return String(value);
}

export function ComparacaoEstatisticaSection({
  data,
  fighter1Name,
  fighter2Name,
  sectionNumber,
}: {
  data: ComparacaoEstatisticaSectionData;
  fighter1Name: string;
  fighter2Name: string;
  sectionNumber?: string;
}) {
  const t = useTranslations('analise');
  return (
    <section>
      <SectionHeader number={sectionNumber ?? "05"} title={t('comparacao_title')} accent={t('comparacao_accent')} />

      <div className="rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-wider text-dark-textMuted">
          <span className="text-ufc-red font-bold">{fighter1Name}</span>
          <span className="text-blue-400 font-bold">{fighter2Name}</span>
        </div>

        {data.stats.map((stat, i) => (
          <StatBar
            key={i}
            label={stat.label}
            valueA={stat.valueA}
            valueB={stat.valueB}
            maxVal={stat.maxVal}
            nameA={fighter1Name}
            nameB={fighter2Name}
            format={(v) => formatValue(v, stat.format)}
            note={stat.note}
            reverseWinner={stat.reverseWinner}
          />
        ))}
      </div>

      {/* Tale of the Tape */}
      {data.tale_of_tape.length > 0 && (
        <div className="mt-8 rounded-lg border border-dark-border bg-dark-card p-6 md:p-8">
          <h3 className="mb-6 font-display text-xl uppercase text-dark-text text-center">
            Tale of the <span className="text-ufc-red">Tape</span>
          </h3>

          <div className="space-y-4">
            {data.tale_of_tape.map((row, i) => (
              <div key={i} className="flex items-center border-b border-dark-border/30 pb-3">
                <div className="flex-1 text-right">
                  <span className="text-sm font-semibold text-dark-text">{row.fighter1}</span>
                </div>
                <div className="mx-4 w-32 text-center">
                  <span className="text-xs uppercase tracking-wider text-dark-textMuted">{row.label}</span>
                  {row.note && <p className="text-[10px] text-ufc-gold">{row.note}</p>}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-dark-text">{row.fighter2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
