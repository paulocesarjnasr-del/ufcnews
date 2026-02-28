'use client';

import { useState } from 'react';
import FighterImage from '@/components/ui/FighterImage';
import { cn } from '@/lib/utils';
import type { EnqueteComDetalhes } from '@/types/enquete';

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════

interface EnqueteVotacaoProps {
  enquete: EnqueteComDetalhes;
  onVotar: (opcao: 'a' | 'b') => Promise<{ success: boolean; error?: string }>;
}

// ═══════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════

function formatRecord(v: number, d: number, e: number): string {
  return `${v}-${d}-${e}`;
}

// ═══════════════════════════════════════════════════════
// FighterVoteCard
// ═══════════════════════════════════════════════════════

function FighterVoteCard({
  nome,
  apelido,
  foto,
  vitorias,
  derrotas,
  empates,
  opcao,
  isLoading,
  disabled,
  onVotar,
}: {
  nome: string;
  apelido: string | null;
  foto: string | null;
  vitorias: number;
  derrotas: number;
  empates: number;
  opcao: 'a' | 'b';
  isLoading: boolean;
  disabled: boolean;
  onVotar: (opcao: 'a' | 'b') => void;
}) {
  return (
    <div className="neu-card neu-card-hover flex flex-1 flex-col items-center gap-3 p-4 md:p-6">
      {/* Fighter photo */}
      <div
        className="relative h-[80px] w-[80px] md:h-[100px] md:w-[100px] overflow-hidden rounded-full border-2 border-ufc-gold"
        style={{ boxShadow: '0 0 20px rgba(255, 0, 0, 0.25)' }}
      >
        {foto ? (
          <FighterImage
            src={foto}
            alt={nome}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 80px, 100px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e]">
            <svg className="h-10 w-10 text-dark-textMuted" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Fighter name */}
      <h4 className="text-center font-display text-xl md:text-2xl uppercase leading-tight text-white">
        {nome}
      </h4>

      {/* Alias */}
      {apelido && (
        <p className="text-center text-xs italic text-ufc-gold md:text-sm">
          &quot;{apelido}&quot;
        </p>
      )}

      {/* Record */}
      <p className="text-center text-sm tabular-nums text-dark-textMuted">
        {formatRecord(vitorias, derrotas, empates)}
      </p>

      {/* Vote button */}
      <button
        onClick={() => onVotar(opcao)}
        disabled={disabled || isLoading}
        className={cn(
          'neu-button mt-2 w-full max-w-[160px] px-5 py-2.5 font-display text-sm uppercase tracking-wider text-white transition-all duration-300',
          'border border-ufc-red/60 hover:text-ufc-gold hover:shadow-[0_0_16px_rgba(210,10,10,0.4)]',
          (disabled || isLoading) && 'pointer-events-none opacity-50'
        )}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Votando...
          </span>
        ) : (
          'VOTAR'
        )}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════

export function EnqueteVotacao({ enquete, onVotar }: EnqueteVotacaoProps) {
  const [votingFor, setVotingFor] = useState<'a' | 'b' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVotar = async (opcao: 'a' | 'b') => {
    setVotingFor(opcao);
    setError(null);

    const result = await onVotar(opcao);

    if (!result.success) {
      setError(result.error ?? 'Erro ao votar');
      setVotingFor(null);
    }
    // On success, parent will switch to resultado view
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-stretch gap-3 md:gap-6">
        <FighterVoteCard
          nome={enquete.opcao_a_nome}
          apelido={enquete.opcao_a_apelido}
          foto={enquete.opcao_a_foto}
          vitorias={enquete.opcao_a_vitorias}
          derrotas={enquete.opcao_a_derrotas}
          empates={enquete.opcao_a_empates}
          opcao="a"
          isLoading={votingFor === 'a'}
          disabled={votingFor !== null}
          onVotar={handleVotar}
        />

        {/* VS divider */}
        <div className="flex items-center">
          <span
            className="font-display text-2xl text-ufc-red md:text-3xl select-none"
            style={{ textShadow: '0 0 12px rgba(255, 0, 0, 0.4)' }}
          >
            VS
          </span>
        </div>

        <FighterVoteCard
          nome={enquete.opcao_b_nome}
          apelido={enquete.opcao_b_apelido}
          foto={enquete.opcao_b_foto}
          vitorias={enquete.opcao_b_vitorias}
          derrotas={enquete.opcao_b_derrotas}
          empates={enquete.opcao_b_empates}
          opcao="b"
          isLoading={votingFor === 'b'}
          disabled={votingFor !== null}
          onVotar={handleVotar}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-center text-sm text-ufc-red">{error}</p>
      )}
    </div>
  );
}
