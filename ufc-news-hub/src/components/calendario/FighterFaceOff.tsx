'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Fighter {
  id: string;
  nome: string;
  apelido?: string | null;
  imagem_url?: string | null;
  pais?: string | null;
  vitorias?: number;
  derrotas?: number;
  empates?: number;
  ranking_divisao?: number | null;
}

interface FighterFaceOffProps {
  lutador1: Fighter;
  lutador2: Fighter;
  categoria_peso?: string;
  is_titulo?: boolean;
  vencedor_id?: string | null;
  compact?: boolean;
}

function FighterCard({
  fighter,
  side,
  isWinner,
  compact,
}: {
  fighter: Fighter;
  side: 'left' | 'right';
  isWinner?: boolean;
  compact?: boolean;
}) {
  const record = fighter.vitorias !== undefined
    ? `${fighter.vitorias}-${fighter.derrotas || 0}${fighter.empates ? `-${fighter.empates}` : ''}`
    : null;

  const slideAnimation = side === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right';

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${side === 'right' ? 'flex-row-reverse text-right' : ''}`}>
        {/* Avatar */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-dark-card border border-dark-border">
          {fighter.imagem_url ? (
            <Image
              src={fighter.imagem_url}
              alt={fighter.nome}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-dark-textMuted">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {isWinner && (
            <div className="absolute inset-0 border-2 border-ufc-gold rounded-full" />
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-semibold text-white truncate max-w-[100px] sm:max-w-[140px]">
            {fighter.nome}
          </p>
          {record && (
            <p className="text-xs text-dark-textMuted">{record}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/lutadores/${fighter.id}`}
      className={`
        flex flex-col items-center group cursor-pointer
        ${slideAnimation}
      `}
    >
      {/* Ranking badge */}
      {fighter.ranking_divisao && (
        <div className="mb-2 px-2 py-0.5 bg-ufc-gold/20 border border-ufc-gold/40 rounded text-xs text-ufc-gold font-semibold">
          #{fighter.ranking_divisao}
        </div>
      )}

      {/* Fighter image */}
      <div className={`
        relative w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48
        rounded-full overflow-hidden
        bg-gradient-to-br from-dark-card to-dark-bg
        border-4 ${isWinner ? 'border-ufc-gold' : 'border-dark-border'}
        group-hover:border-ufc-red transition-colors duration-300
        ${isWinner ? 'ring-4 ring-ufc-gold/30' : ''}
      `}>
        {fighter.imagem_url ? (
          <Image
            src={fighter.imagem_url}
            alt={fighter.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 112px, (max-width: 1024px) 160px, 192px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dark-textMuted">
            <svg className="w-16 h-16 sm:w-24 sm:h-24" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Winner overlay */}
        {isWinner && (
          <div className="absolute inset-0 bg-gradient-to-t from-ufc-gold/20 to-transparent" />
        )}
      </div>

      {/* Fighter info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold text-white group-hover:text-ufc-red transition-colors">
          {fighter.nome}
        </h3>

        {fighter.apelido && (
          <p className="text-sm sm:text-base text-ufc-red font-medium">
            &quot;{fighter.apelido}&quot;
          </p>
        )}

        {record && (
          <p className="mt-1 text-sm sm:text-base text-dark-textMuted font-mono">
            {record}
          </p>
        )}

        {fighter.pais && (
          <p className="mt-1 text-xs sm:text-sm text-dark-textMuted flex items-center justify-center gap-1">
            <span className="inline-block w-4 h-3 bg-dark-border rounded-sm" />
            {fighter.pais}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function FighterFaceOff({
  lutador1,
  lutador2,
  categoria_peso,
  is_titulo,
  vencedor_id,
  compact = false,
}: FighterFaceOffProps) {
  const isLutador1Winner = vencedor_id === lutador1.id;
  const isLutador2Winner = vencedor_id === lutador2.id;

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-2">
        <FighterCard fighter={lutador1} side="left" isWinner={isLutador1Winner} compact />

        {/* VS badge */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-ufc-red">VS</span>
        </div>

        <FighterCard fighter={lutador2} side="right" isWinner={isLutador2Winner} compact />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Title belt indicator */}
      {is_titulo && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 z-10">
          <div className="px-4 py-2 bg-gradient-to-r from-ufc-gold/20 via-ufc-gold/40 to-ufc-gold/20 border border-ufc-gold/50 rounded-full">
            <span className="text-sm font-bold text-ufc-gold flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4 8v2l8-6 8 6V8l-8-6zM4 10v11h16V10l-8 6-8-6zm8 4l4-3v7H8v-7l4 3z" />
              </svg>
              DISPUTA DE TITULO
            </span>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 sm:gap-8 lg:gap-16">
        {/* Lutador 1 */}
        <FighterCard fighter={lutador1} side="left" isWinner={isLutador1Winner} />

        {/* VS Center */}
        <div className="flex flex-col items-center justify-center pt-16 sm:pt-20 lg:pt-24">
          {/* VS Badge */}
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-ufc-red to-ufc-redDark flex items-center justify-center shadow-lg animate-pulse-glow">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">
                VS
              </span>
            </div>

            {/* Decorative lines */}
            <div className="absolute top-1/2 -left-8 sm:-left-12 lg:-left-16 w-8 sm:w-12 lg:w-16 h-0.5 bg-gradient-to-l from-ufc-red to-transparent" />
            <div className="absolute top-1/2 -right-8 sm:-right-12 lg:-right-16 w-8 sm:w-12 lg:w-16 h-0.5 bg-gradient-to-r from-ufc-red to-transparent" />
          </div>

          {/* Weight class */}
          {categoria_peso && (
            <div className="mt-4 px-3 py-1 bg-dark-card border border-dark-border rounded-full">
              <span className="text-xs sm:text-sm text-dark-textMuted uppercase tracking-wider">
                {categoria_peso}
              </span>
            </div>
          )}
        </div>

        {/* Lutador 2 */}
        <FighterCard fighter={lutador2} side="right" isWinner={isLutador2Winner} />
      </div>
    </div>
  );
}
