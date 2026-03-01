'use client';

export function ReelEmptyState() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 rounded-2xl bg-dark-card md:h-[70vh]">
      <span className="text-5xl">🥊</span>
      <div className="text-center px-8">
        <h2 className="font-display text-xl uppercase text-dark-text md:text-2xl">
          Nenhuma notícia nova hoje
        </h2>
        <p className="mt-2 text-dark-textMuted">
          Volte mais tarde para conferir as últimas do UFC!
        </p>
      </div>
    </div>
  );
}
