'use client';

interface ReelProgressProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

export function ReelProgress({ total, current, onDotClick }: ReelProgressProps) {
  if (total <= 1) return null;

  // Show max 10 dots, collapse middle if more
  const maxDots = 10;
  const showDots = total <= maxDots;

  return (
    <div className="flex items-center justify-center gap-1.5 py-3">
      {showDots ? (
        Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'h-2.5 w-2.5 bg-ufc-red'
                : 'h-2 w-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Ir para notícia ${i + 1}`}
          />
        ))
      ) : (
        <span className="text-xs font-medium text-dark-textMuted">
          {current + 1} / {total}
        </span>
      )}
    </div>
  );
}
