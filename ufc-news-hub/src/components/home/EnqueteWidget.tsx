'use client';

import { useState, useCallback } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
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
// Fetcher
// ═══════════════════════════════════════════════════════

const fetcher = (url: string) => fetch(url).then((res) => res.ok ? res.json() : null);

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

  // Fetch analysis for this event (if exists)
  const { data: analiseData } = useSWR<{ slug: string; titulo: string } | null>(
    enquete ? `/api/analises?evento_id=${enquete.evento_id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

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

      {/* Analysis link */}
      <div className="mt-6 border-t border-dark-border/50 pt-6">
        <Link
          href={analiseData?.slug ? `/analise/${analiseData.slug}` : '/analises'}
          className="group flex items-center justify-center gap-3 rounded-xl border border-dark-border bg-dark-card/50 px-6 py-4 transition-all duration-200 hover:border-ufc-gold/40 hover:bg-dark-card"
        >
          <svg
            className="h-5 w-5 text-ufc-gold transition-transform duration-200 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="font-display text-sm uppercase tracking-wider text-dark-text transition-colors duration-200 group-hover:text-ufc-gold md:text-base">
            Ver analise desse fight card
          </span>
          <svg
            className="h-4 w-4 text-dark-textMuted transition-all duration-200 group-hover:translate-x-1 group-hover:text-ufc-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
