import { SectionHeader } from './SectionHeader';
import type { ComparacaoEstatisticaSectionData, StatBarData } from '@/types/analise';

interface ComparacaoEstatisticaSectionProps {
  data: ComparacaoEstatisticaSectionData;
  fighter1Name: string;
  fighter2Name: string;
}

function formatValue(value: number, format?: StatBarData['format']): string {
  switch (format) {
    case 'percent':
      return `${value}%`;
    case 'integer':
      return String(Math.round(value));
    case 'decimal':
    default:
      return value.toFixed(1);
  }
}

function StatBarRow({
  stat,
  fighter1Name,
  fighter2Name,
}: {
  stat: StatBarData;
  fighter1Name: string;
  fighter2Name: string;
}) {
  const widthA = stat.maxVal > 0 ? (stat.valueA / stat.maxVal) * 100 : 0;
  const widthB = stat.maxVal > 0 ? (stat.valueB / stat.maxVal) * 100 : 0;

  const aWins = stat.reverseWinner
    ? stat.valueA < stat.valueB
    : stat.valueA > stat.valueB;
  const bWins = stat.reverseWinner
    ? stat.valueB < stat.valueA
    : stat.valueB > stat.valueA;

  return (
    <div className="mb-4 last:mb-0">
      {/* Label */}
      <p className="mb-2 text-center text-xs uppercase tracking-wider text-dark-textMuted">
        {stat.label}
      </p>

      {/* Bars + values */}
      <div className="flex items-center gap-2">
        {/* Fighter 1 value */}
        <span
          className={`w-14 text-right text-sm ${
            aWins ? 'font-bold text-ufc-red' : 'text-dark-textMuted'
          }`}
          title={fighter1Name}
        >
          {formatValue(stat.valueA, stat.format)}
        </span>

        {/* Fighter 1 bar (grows right-to-left) */}
        <div className="flex h-5 flex-1 justify-end overflow-hidden rounded-l-full bg-dark-border/20">
          <div
            className="h-full rounded-l-full bg-ufc-red transition-all"
            style={{ width: `${widthA}%` }}
          />
        </div>

        {/* Fighter 2 bar (grows left-to-right) */}
        <div className="flex h-5 flex-1 justify-start overflow-hidden rounded-r-full bg-dark-border/20">
          <div
            className="h-full rounded-r-full bg-blue-400 transition-all"
            style={{ width: `${widthB}%` }}
          />
        </div>

        {/* Fighter 2 value */}
        <span
          className={`w-14 text-left text-sm ${
            bWins ? 'font-bold text-blue-400' : 'text-dark-textMuted'
          }`}
          title={fighter2Name}
        >
          {formatValue(stat.valueB, stat.format)}
        </span>
      </div>

      {/* Note */}
      {stat.note && (
        <p className="mt-1 text-center text-xs italic text-dark-textMuted">
          {stat.note}
        </p>
      )}
    </div>
  );
}

export function ComparacaoEstatisticaSection({
  data,
  fighter1Name,
  fighter2Name,
}: ComparacaoEstatisticaSectionProps) {
  return (
    <section>
      <SectionHeader number="05" title="Comparacao" accent="Estatistica" />

      {/* Stat Bars */}
      <div className="neu-card p-6">
        {/* Header row */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-lg uppercase text-ufc-red">
            {fighter1Name}
          </span>
          <span className="font-display text-lg uppercase text-blue-400">
            {fighter2Name}
          </span>
        </div>

        {data.stats.map((stat) => (
          <StatBarRow
            key={stat.label}
            stat={stat}
            fighter1Name={fighter1Name}
            fighter2Name={fighter2Name}
          />
        ))}
      </div>

      {/* Tale of the Tape */}
      <div className="neu-card mt-6 p-6">
        <h3 className="mb-4 font-display text-lg uppercase text-dark-text">
          Tale of the Tape
        </h3>

        <div className="divide-y divide-dark-border/30">
          {data.tale_of_tape.map((row) => (
            <div key={row.label} className="py-3 first:pt-0 last:pb-0">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-right text-dark-text">
                  {row.fighter1}
                </span>
                <span className="text-center text-xs uppercase tracking-wider text-dark-textMuted">
                  {row.label}
                </span>
                <span className="text-left text-dark-text">
                  {row.fighter2}
                </span>
              </div>
              {row.note && (
                <p className="mt-1 text-center text-xs italic text-dark-textMuted">
                  {row.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
