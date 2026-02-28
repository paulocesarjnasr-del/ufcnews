'use client';

import { useState, useCallback } from 'react';
import { useEnquete } from '@/hooks/useEnquete';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { EnqueteVotacao } from './EnqueteVotacao';
import { EnqueteResultado } from './EnqueteResultado';
import { EnqueteComentarios } from './EnqueteComentarios';

// ═══════════════════════════════════════════════════════
// Skeleton
// ═══════════════════════════════════════════════════════

function EnqueteSkeleton() {
  return (
    <section className="neu-card mx-auto w-full max-w-3xl p-6 md:p-8">
      {/* Title skeleton */}
      <div className="mx-auto mb-6 h-8 w-72 rounded bg-dark-border/30 animate-shimmer"
        style={{
          backgroundSize: '200% 100%',
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
        }}
      />
      {/* Cards skeleton */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-dark-card/50 p-6">
          <div className="h-[80px] w-[80px] rounded-full bg-dark-border/30 animate-pulse" />
          <div className="h-5 w-28 rounded bg-dark-border/30 animate-pulse" />
          <div className="h-4 w-20 rounded bg-dark-border/20 animate-pulse" />
          <div className="h-10 w-32 rounded bg-dark-border/20 animate-pulse" />
        </div>
        <div className="flex items-center">
          <div className="h-8 w-10 rounded bg-dark-border/20 animate-pulse" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-3 rounded-xl bg-dark-card/50 p-6">
          <div className="h-[80px] w-[80px] rounded-full bg-dark-border/30 animate-pulse" />
          <div className="h-5 w-28 rounded bg-dark-border/30 animate-pulse" />
          <div className="h-4 w-20 rounded bg-dark-border/20 animate-pulse" />
          <div className="h-10 w-32 rounded bg-dark-border/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════

export default function EnqueteWidget() {
  const {
    enquete,
    resultado,
    comentarios,
    totalComentarios,
    isLoading,
    jaVotou,
    votar,
    comentar,
  } = useEnquete();

  const { usuario } = useArenaAuth();

  // Track if user just voted (to switch to resultado immediately)
  const [justVoted, setJustVoted] = useState<'a' | 'b' | null>(null);

  const handleVotar = useCallback(
    async (opcao: 'a' | 'b') => {
      const result = await votar(opcao);
      if (result.success) {
        setJustVoted(opcao);
      }
      return result;
    },
    [votar]
  );

  // Loading state
  if (isLoading) {
    return <EnqueteSkeleton />;
  }

  // No active enquete
  if (!enquete) {
    return null;
  }

  const showResultado = jaVotou !== null || justVoted !== null;
  const votedOption = jaVotou ?? justVoted;

  // Build logged-in user info for comments
  const usuarioLogado = usuario
    ? {
        id: usuario.id,
        displayName: usuario.display_name ?? usuario.username,
        avatarUrl: usuario.avatar_url,
      }
    : null;

  return (
    <section className="neu-card mx-auto w-full max-w-3xl p-6 md:p-8">
      {/* Title */}
      <h3 className="mb-6 text-center font-display text-2xl uppercase tracking-wide text-white md:text-3xl">
        QUEM VENCE O MAIN EVENT?
      </h3>

      {/* Voting or Result */}
      {showResultado && resultado ? (
        <EnqueteResultado
          enquete={enquete}
          resultado={resultado}
          votouEm={votedOption}
        />
      ) : (
        <EnqueteVotacao
          enquete={enquete}
          onVotar={handleVotar}
        />
      )}

      {/* Divider */}
      <div className="my-6 h-px bg-dark-border/50" />

      {/* Comments */}
      <EnqueteComentarios
        enqueteId={enquete.id}
        comentarios={comentarios}
        totalComentarios={totalComentarios}
        onComentar={comentar}
        usuarioLogado={usuarioLogado}
      />
    </section>
  );
}
