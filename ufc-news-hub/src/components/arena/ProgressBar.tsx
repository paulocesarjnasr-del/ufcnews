interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="neu-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-dark-text">
          Suas previsoes: {current}/{total}
        </span>
        <span className="text-sm font-semibold text-ufc-red">{percent}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-dark-bg overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-ufc-red to-ufc-redLight transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
