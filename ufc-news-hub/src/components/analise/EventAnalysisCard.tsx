'use client';

import { useState } from 'react';
import Link from 'next/link';
import FighterImage from '@/components/ui/FighterImage';

export interface EventFightCard {
  slug: string;
  fighter1: { nome: string; record: string; foto_url?: string };
  fighter2: { nome: string; record: string; foto_url?: string };
  categoria_peso: string;
  num_rounds: number;
  predicted_winner: string;
  predicted_method: string;
  confidence_label: string;
  is_main_event?: boolean;
}

/* ────────────────────────────────────────────
   Size-driven style props
   ──────────────────────────────────────────── */
const sizeStyles = {
  card: {
    name: 'text-2xl md:text-3xl',
    record: 'text-xs',
    vs: 'text-base md:text-lg',
    prediction: 'text-xs md:text-sm',
    meta: 'text-[10px] md:text-xs',
    container: 'p-5 md:p-6',
    gap: 'gap-3 md:gap-5',
  },
  prelim: {
    name: 'text-xl md:text-2xl',
    record: 'text-[11px]',
    vs: 'text-sm md:text-base',
    prediction: 'text-[11px] md:text-xs',
    meta: 'text-[9px] md:text-[10px]',
    container: 'p-4 md:p-5',
    gap: 'gap-2 md:gap-4',
  },
} as const;

/* ────────────────────────────────────────────
   Neumorphic fight row inside a visible card
   ──────────────────────────────────────────── */
export function EventAnalysisCard({
  fight,
  size = 'card',
  showMeta = true,
  showPrediction = true,
}: {
  fight: EventFightCard;
  size?: 'card' | 'prelim';
  showMeta?: boolean;
  showPrediction?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const styles = sizeStyles[size];
  const isWinnerFighter1 = fight.predicted_winner === fight.fighter1.nome;

  return (
    <Link
      href={`/analise/${fight.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group block rounded-2xl ${styles.container} transition-all duration-300
        bg-[#111111]
        shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.025)]
        ${isHovered
          ? 'shadow-[6px_6px_14px_rgba(0,0,0,0.6),-6px_-6px_14px_rgba(255,255,255,0.04)] scale-[1.01] border-ufc-red/30'
          : 'border-transparent'
        }
        border border-[#1a1a1a]
      `}
    >
      {/* Fighters row */}
      <div className={`flex items-center ${styles.gap}`}>
        {/* Fighter 1 - foto à esquerda (lado de fora) */}
        <div className="min-w-0 flex-1 flex items-center justify-end gap-3">
          {fight.fighter1.foto_url && (
            <div className={`flex-shrink-0 ${size === 'prelim' ? 'w-10 h-10' : 'w-12 h-12'} rounded-full overflow-hidden bg-[#1a1a1a]`}>
              <FighterImage
                src={fight.fighter1.foto_url}
                alt={fight.fighter1.nome}
                width={size === 'prelim' ? 40 : 48}
                height={size === 'prelim' ? 40 : 48}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
          <div className="min-w-0 text-right">
            <p
              className={`font-display uppercase leading-none tracking-wide ${styles.name} ${
                isWinnerFighter1 ? 'text-white' : 'text-neutral-400'
              }`}
            >
              {fight.fighter1.nome}
            </p>
            <p className={`mt-1.5 text-neutral-500 ${styles.record}`}>
              {fight.fighter1.record}
            </p>
          </div>
        </div>

        {/* VS badge - neumorphic inset */}
        <div className="flex-shrink-0 rounded-full bg-[#0e0e0e] px-3 py-1.5 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.02)]">
          <span className={`font-display font-bold text-ufc-red ${styles.vs}`}>
            VS
          </span>
        </div>

        {/* Fighter 2 - foto à direita (lado de fora) */}
        <div className="min-w-0 flex-1 flex items-center justify-start gap-3">
          <div className="min-w-0 text-left">
            <p
              className={`font-display uppercase leading-none tracking-wide ${styles.name} ${
                !isWinnerFighter1 ? 'text-white' : 'text-neutral-400'
              }`}
            >
              {fight.fighter2.nome}
            </p>
            <p className={`mt-1.5 text-neutral-500 ${styles.record}`}>
              {fight.fighter2.record}
            </p>
          </div>
          {fight.fighter2.foto_url && (
            <div className={`flex-shrink-0 ${size === 'prelim' ? 'w-10 h-10' : 'w-12 h-12'} rounded-full overflow-hidden bg-[#1a1a1a]`}>
              <FighterImage
                src={fight.fighter2.foto_url}
                alt={fight.fighter2.nome}
                width={size === 'prelim' ? 40 : 48}
                height={size === 'prelim' ? 40 : 48}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
        </div>
      </div>

      {/* Meta + Prediction footer */}
      {(showMeta || showPrediction) && (
        <div className="mt-4 flex items-center justify-between border-t border-[#1a1a1a] pt-3">
          {showMeta && (
            <span className={`uppercase tracking-wider text-neutral-500 ${styles.meta}`}>
              {fight.categoria_peso} · {fight.num_rounds}R
            </span>
          )}
          {showPrediction && (
            <span className={`text-neutral-300 ${styles.prediction}`}>
              → {fight.predicted_winner} por {fight.predicted_method}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
