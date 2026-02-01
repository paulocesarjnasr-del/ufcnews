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

interface Luta {
  id: string;
  ordem: number;
  tipo: string;
  categoria_peso: string;
  rounds: number;
  is_titulo: boolean;
  status: string;
  lutador1: Fighter;
  lutador2: Fighter;
  vencedor_id?: string | null;
  metodo?: string | null;
  round_final?: number | null;
  tempo_final?: string | null;
  consenso?: Array<{
    lutador_id: string;
    lutador_nome: string;
    total_votos: number;
    percentual: number;
  }>;
  total_previsoes?: number;
}

interface FightRowCompactProps {
  luta: Luta;
  evento_id?: string;
}

function FighterCorner({
  fighter,
  isWinner,
  side,
}: {
  fighter: Fighter;
  isWinner: boolean;
  side: 'left' | 'right';
}) {
  const record = fighter.vitorias !== undefined
    ? `${fighter.vitorias}-${fighter.derrotas || 0}`
    : null;

  return (
    <div className={`flex items-center gap-2 flex-1 min-w-0 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <Link href={`/lutadores/${fighter.id}`} className="flex-shrink-0">
        <div className={`
          relative w-10 h-10 rounded-full overflow-hidden
          bg-dark-bg border-2
          ${isWinner ? 'border-ufc-gold' : 'border-dark-border'}
          hover:border-ufc-red transition-colors
        `}>
          {fighter.imagem_url ? (
            <Image
              src={fighter.imagem_url}
              alt={fighter.nome}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-dark-textMuted">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className={`min-w-0 ${side === 'right' ? 'text-right' : ''}`}>
        <div className="flex items-center gap-1">
          {/* Ranking */}
          {fighter.ranking_divisao && (
            <span className="text-xs text-ufc-gold font-medium">
              #{fighter.ranking_divisao}
            </span>
          )}
          <p className={`text-sm font-medium truncate ${isWinner ? 'text-ufc-gold' : 'text-white'}`}>
            {fighter.nome}
          </p>
          {isWinner && (
            <svg className="w-4 h-4 text-ufc-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        {record && (
          <p className="text-xs text-dark-textMuted">{record}</p>
        )}
      </div>
    </div>
  );
}

export default function FightRowCompact({ luta, evento_id }: FightRowCompactProps) {
  const isLutador1Winner = luta.vencedor_id === luta.lutador1.id;
  const isLutador2Winner = luta.vencedor_id === luta.lutador2.id;
  const isFinished = luta.status === 'finalizada';

  // Determine if this is a special fight
  const isCoMain = luta.tipo === 'co_main';
  const isTitleFight = luta.is_titulo;

  return (
    <div className={`
      p-3 rounded-lg border transition-all duration-200
      ${isCoMain ? 'bg-dark-card/50 border-dark-border' : 'bg-dark-card/30 border-dark-border/50'}
      hover:bg-dark-cardHover hover:border-dark-border
    `}>
      {/* Top badges */}
      {(isCoMain || isTitleFight) && (
        <div className="flex items-center gap-2 mb-2">
          {isCoMain && (
            <span className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/40 rounded text-xs font-semibold text-blue-400">
              CO-MAIN
            </span>
          )}
          {isTitleFight && (
            <span className="px-2 py-0.5 bg-ufc-gold/20 border border-ufc-gold/40 rounded text-xs font-semibold text-ufc-gold flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 012 2v2a2 2 0 01-2 2h-.069a8 8 0 01-3.931 4.998V20H8v-3.002A8 8 0 014.069 12H4a2 2 0 01-2-2V8a2 2 0 012-2h1.17A3 3 0 015 5z" clipRule="evenodd" />
              </svg>
              TITULO
            </span>
          )}
        </div>
      )}

      {/* Fighters row */}
      <div className="flex items-center gap-2">
        <FighterCorner fighter={luta.lutador1} isWinner={isLutador1Winner} side="left" />

        {/* VS / Result center */}
        <div className="flex-shrink-0 text-center px-2">
          {isFinished ? (
            <span className="text-xs text-dark-textMuted">
              {luta.metodo?.split(' ')[0] || 'FIN'}
            </span>
          ) : (
            <span className="text-xs font-bold text-ufc-red">VS</span>
          )}
        </div>

        <FighterCorner fighter={luta.lutador2} isWinner={isLutador2Winner} side="right" />
      </div>

      {/* Bottom info */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-dark-border/30">
        <span className="text-xs text-dark-textMuted">
          {luta.categoria_peso} • {luta.rounds} rounds
        </span>

        {/* Prediction consensus mini bar */}
        {luta.consenso && luta.consenso.length > 0 && luta.total_previsoes && luta.total_previsoes > 0 && !isFinished && (
          <div className="flex items-center gap-1">
            <div className="w-16 h-1.5 rounded-full overflow-hidden bg-dark-bg flex">
              {luta.consenso.map((c, idx) => (
                <div
                  key={c.lutador_id}
                  className={idx === 0 ? 'bg-ufc-red' : 'bg-blue-500'}
                  style={{ width: `${c.percentual}%` }}
                />
              ))}
            </div>
            <span className="text-[10px] text-dark-textMuted">
              {luta.total_previsoes}
            </span>
          </div>
        )}

        {/* Result details */}
        {isFinished && luta.metodo && (
          <span className="text-xs text-dark-textMuted">
            R{luta.round_final} {luta.tempo_final}
          </span>
        )}

        {/* Link to make prediction */}
        {!isFinished && evento_id && (
          <Link
            href={`/arena/evento/${evento_id}`}
            className="text-xs text-ufc-red hover:underline"
          >
            Prever
          </Link>
        )}
      </div>
    </div>
  );
}
