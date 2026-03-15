export function StatBar({
  label,
  valueA,
  valueB,
  maxVal,
  nameA,
  nameB,
  note,
  format,
  reverseWinner,
}: {
  label: string;
  valueA: number;
  valueB: number;
  maxVal: number;
  nameA: string;
  nameB: string;
  note?: string;
  format?: (v: number) => string;
  reverseWinner?: boolean;
}) {
  const fmt = format || ((v: number) => String(v));
  const aWins = reverseWinner ? valueA < valueB : valueA > valueB;
  const bWins = reverseWinner ? valueB < valueA : valueB > valueA;
  const tie = valueA === valueB;
  return (
    <div className="mb-5">
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className={`font-semibold ${aWins && !tie ? 'text-ufc-red' : 'text-dark-textMuted'}`}>
          {fmt(valueA)}
        </span>
        <span className="text-xs uppercase tracking-wider text-dark-textMuted">{label}</span>
        <span className={`font-semibold ${bWins && !tie ? 'text-blue-400' : 'text-dark-textMuted'}`}>
          {fmt(valueB)}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex h-3 flex-1 justify-end overflow-hidden rounded-l-full bg-dark-bg">
          <div
            className={`h-full rounded-l-full transition-all ${aWins ? 'bg-ufc-red' : 'bg-ufc-red/40'}`}
            style={{ width: `${(valueA / maxVal) * 100}%` }}
          />
        </div>
        <div className="flex h-3 flex-1 overflow-hidden rounded-r-full bg-dark-bg">
          <div
            className={`h-full rounded-r-full transition-all ${bWins ? 'bg-blue-400' : 'bg-blue-400/40'}`}
            style={{ width: `${(valueB / maxVal) * 100}%` }}
          />
        </div>
      </div>
      {note && <p className="mt-1 text-xs italic text-dark-textMuted">{note}</p>}
    </div>
  );
}
