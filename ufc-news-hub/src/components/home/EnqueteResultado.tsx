'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { EnqueteComDetalhes, ResultadoEnquete } from '@/types/enquete';

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════

interface EnqueteResultadoProps {
  enquete: EnqueteComDetalhes;
  resultado: ResultadoEnquete;
  votouEm: 'a' | 'b' | null;
}

// ═══════════════════════════════════════════════════════
// ResultBar
// ═══════════════════════════════════════════════════════

function ResultBar({
  nome,
  percentual,
  votos,
  variant,
  isUserPick,
  animate,
}: {
  nome: string;
  percentual: number;
  votos: number;
  variant: 'red' | 'gold';
  isUserPick: boolean;
  animate: boolean;
}) {
  const gradientClass =
    variant === 'red'
      ? 'bg-gradient-to-r from-ufc-red/80 to-ufc-red'
      : 'bg-gradient-to-r from-ufc-gold/80 to-ufc-gold';

  return (
    <div className="flex flex-col gap-2">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-base uppercase text-white md:text-lg">
            {nome}
          </span>
          {isUserPick && (
            <span className="flex items-center gap-1 rounded-full bg-ufc-gold/20 px-2 py-0.5 text-xs text-ufc-gold">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Seu voto
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-lg tabular-nums text-white md:text-xl">
            {percentual.toFixed(1)}%
          </span>
          <span className="text-xs tabular-nums text-dark-textMuted">
            ({votos})
          </span>
        </div>
      </div>

      {/* Bar */}
      <div
        className={cn(
          'relative h-8 overflow-hidden rounded-lg',
          'neu-inset'
        )}
      >
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-lg transition-all duration-[800ms] ease-out',
            gradientClass,
            isUserPick && 'ring-2 ring-white/30'
          )}
          style={{
            width: animate ? `${Math.max(percentual, 2)}%` : '0%',
          }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════

export function EnqueteResultado({ enquete, resultado, votouEm }: EnqueteResultadoProps) {
  const [animate, setAnimate] = useState(false);

  // Trigger animation after mount
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setAnimate(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="neu-card flex flex-col gap-5 p-4 md:p-6">
      {/* Fighter A result */}
      <ResultBar
        nome={enquete.opcao_a_nome}
        percentual={resultado.percentual_a}
        votos={resultado.votos_a}
        variant="red"
        isUserPick={votouEm === 'a'}
        animate={animate}
      />

      {/* Fighter B result */}
      <ResultBar
        nome={enquete.opcao_b_nome}
        percentual={resultado.percentual_b}
        votos={resultado.votos_b}
        variant="gold"
        isUserPick={votouEm === 'b'}
        animate={animate}
      />

      {/* Total votes */}
      <p className="text-center text-sm tabular-nums text-dark-textMuted">
        {resultado.total_votos} {resultado.total_votos === 1 ? 'voto' : 'votos'}
      </p>
    </div>
  );
}
