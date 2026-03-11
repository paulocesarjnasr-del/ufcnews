export function SkillBar({ label, valueA, valueB, advantage, fighter1Name, fighter2Name }: { label: string; valueA: number; valueB: number; advantage?: 'fighter1' | 'fighter2' | 'even'; fighter1Name?: string; fighter2Name?: string }) {
  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-wider text-dark-textMuted">
        <span className="flex items-center gap-2">
          {label}
          {advantage && (
            <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
              advantage === 'fighter1' ? 'bg-ufc-red/20 text-ufc-red' :
              advantage === 'fighter2' ? 'bg-blue-400/20 text-blue-400' :
              'bg-dark-border text-dark-textMuted'
            }`}>
              {advantage === 'even' ? '=' : advantage === 'fighter1' ? (fighter1Name || 'F1') : (fighter2Name || 'F2')}
            </span>
          )}
        </span>
        <span>
          <span className={valueA >= valueB ? 'text-ufc-red font-bold' : ''}>{valueA}</span>
          {' / '}
          <span className={valueB >= valueA ? 'text-blue-400 font-bold' : ''}>{valueB}</span>
        </span>
      </div>
      <div className="relative h-4 overflow-hidden rounded-full bg-dark-bg">
        <div className="absolute inset-y-0 left-0 rounded-full bg-ufc-red/70" style={{ width: `${valueA}%` }} />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-blue-400/50 border-r-2 border-blue-400"
          style={{ width: `${valueB}%` }}
        />
        <div className="absolute inset-y-0 left-0 rounded-full bg-ufc-red" style={{ width: `${Math.min(valueA, valueB)}%` }} />
      </div>
      <div className="mt-0.5 flex justify-between">
        <div className="h-1 rounded-full bg-ufc-red" style={{ width: `${valueA}%`, maxWidth: '48%' }} />
        <div className="h-1 rounded-full bg-blue-400" style={{ width: `${valueB}%`, maxWidth: '48%' }} />
      </div>
    </div>
  );
}
