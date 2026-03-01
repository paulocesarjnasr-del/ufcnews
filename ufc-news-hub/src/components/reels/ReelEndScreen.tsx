'use client';

interface ReelEndScreenProps {
  onRestart: () => void;
}

export function ReelEndScreen({ onRestart }: ReelEndScreenProps) {
  return (
    <div className="flex h-[60vh] w-full flex-shrink-0 flex-col items-center justify-center gap-6 rounded-2xl bg-dark-card md:h-[70vh]">
      {/* Animated Octagon */}
      <div className="relative">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="animate-draw-octagon"
        >
          <polygon
            points="37,7 83,7 113,37 113,83 83,113 37,113 7,83 7,37"
            fill="none"
            stroke="#D20A0A"
            strokeWidth="2"
            strokeDasharray="800"
            strokeDashoffset="800"
            strokeLinejoin="round"
            className="animate-draw-octagon"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">🥊</span>
        </div>
        {/* Glow */}
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-ufc-red/10 blur-xl" />
      </div>

      {/* Message */}
      <div className="text-center px-8 animate-fade-in">
        <h2 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
          Você está atualizado!
        </h2>
        <p className="mt-2 text-dark-textMuted">
          Todas as notícias de hoje foram vistas.
        </p>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="neu-button px-6 py-3 font-bold text-ufc-red transition-colors hover:bg-ufc-red hover:text-white"
      >
        Voltar ao início
      </button>
    </div>
  );
}
