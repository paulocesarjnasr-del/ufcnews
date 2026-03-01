'use client';

import { useState, useCallback, useMemo } from 'react';
import useSWR from 'swr';
import type { EnqueteComDetalhes, ComentarioEnquete, ResultadoEnquete } from '@/types/enquete';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ═══════════════════════════════════════
// Guest ID management via localStorage
// ═══════════════════════════════════════

function getGuestId(): string {
  if (typeof window === 'undefined') return '';

  try {
    const stored = localStorage.getItem('enquete_guest_id');
    if (stored) return stored;

    const newId = crypto.randomUUID();
    localStorage.setItem('enquete_guest_id', newId);
    return newId;
  } catch {
    return crypto.randomUUID();
  }
}

function getVotoLocal(enqueteId: string): 'a' | 'b' | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(`enquete_voto_${enqueteId}`);
    if (stored === 'a' || stored === 'b') return stored;
    return null;
  } catch {
    return null;
  }
}

function setVotoLocal(enqueteId: string, opcao: 'a' | 'b'): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(`enquete_voto_${enqueteId}`, opcao);
  } catch {
    // Ignore storage errors
  }
}

// ═══════════════════════════════════════
// Hook principal
// ═══════════════════════════════════════

interface UseEnqueteReturn {
  enquete: EnqueteComDetalhes | null;
  resultado: ResultadoEnquete | null;
  comentarios: ComentarioEnquete[];
  totalComentarios: number;
  isLoading: boolean;
  jaVotou: 'a' | 'b' | null;
  votar: (opcao: 'a' | 'b') => Promise<{ success: boolean; error?: string }>;
  comentar: (conteudo: string, guestNome?: string, usuarioId?: string) => Promise<{ success: boolean; error?: string }>;
  refreshComentarios: () => void;
}

export function useEnquete(): UseEnqueteReturn {
  const [isVoting, setIsVoting] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

  // Fetch active poll (refresh every 60s)
  const {
    data: enqueteData,
    isLoading: isLoadingEnquete,
    mutate: mutateEnquete,
  } = useSWR<{ enquete: EnqueteComDetalhes | null }>(
    '/api/enquetes/ativa',
    fetcher,
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    }
  );

  const enquete = enqueteData?.enquete ?? null;

  // Fetch comments (refresh every 30s) — only when we have an active poll
  const {
    data: comentariosData,
    mutate: mutateComentarios,
  } = useSWR<{
    comentarios: ComentarioEnquete[];
    total: number;
    pagina: number;
    totalPaginas: number;
  }>(
    enquete ? `/api/enquetes/${enquete.id}/comentarios` : null,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  // Compute resultado from enquete data
  const resultado = useMemo((): ResultadoEnquete | null => {
    if (!enquete) return null;

    const total = enquete.total_votos;
    return {
      total_votos: total,
      votos_a: enquete.votos_a,
      votos_b: enquete.votos_b,
      percentual_a: total > 0 ? Math.round((enquete.votos_a / total) * 1000) / 10 : 0,
      percentual_b: total > 0 ? Math.round((enquete.votos_b / total) * 1000) / 10 : 0,
    };
  }, [enquete]);

  // Check if user already voted (from localStorage)
  const jaVotou = useMemo((): 'a' | 'b' | null => {
    if (!enquete) return null;
    return getVotoLocal(enquete.id);
  }, [enquete]);

  // Vote function
  const votar = useCallback(
    async (opcao: 'a' | 'b'): Promise<{ success: boolean; error?: string }> => {
      if (!enquete) return { success: false, error: 'Nenhuma enquete ativa' };
      if (jaVotou) return { success: false, error: 'Voce ja votou nesta enquete' };
      if (isVoting) return { success: false, error: 'Aguarde...' };

      setIsVoting(true);

      try {
        const guestId = getGuestId();

        const response = await fetch(`/api/enquetes/${enquete.id}/votar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ opcao, guestId }),
        });

        const result = await response.json();

        if (!response.ok) {
          return { success: false, error: result.error || 'Erro ao votar' };
        }

        // Save vote locally
        setVotoLocal(enquete.id, opcao);

        // Revalidate enquete data to get updated counts
        await mutateEnquete();

        return { success: true };
      } catch (err) {
        console.error('Erro ao votar:', err);
        return { success: false, error: 'Erro de conexao. Tente novamente.' };
      } finally {
        setIsVoting(false);
      }
    },
    [enquete, jaVotou, isVoting, mutateEnquete]
  );

  // Comment function
  const comentar = useCallback(
    async (conteudo: string, guestNome?: string, usuarioId?: string): Promise<{ success: boolean; error?: string }> => {
      if (!enquete) return { success: false, error: 'Nenhuma enquete ativa' };
      if (isCommenting) return { success: false, error: 'Aguarde...' };

      setIsCommenting(true);

      try {
        const response = await fetch(`/api/enquetes/${enquete.id}/comentarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conteudo, guestNome, usuarioId }),
        });

        const result = await response.json();

        if (!response.ok) {
          return { success: false, error: result.error || 'Erro ao comentar' };
        }

        // Revalidate comments
        await mutateComentarios();

        return { success: true };
      } catch (err) {
        console.error('Erro ao comentar:', err);
        return { success: false, error: 'Erro de conexao. Tente novamente.' };
      } finally {
        setIsCommenting(false);
      }
    },
    [enquete, isCommenting, mutateComentarios]
  );

  const refreshComentarios = useCallback(() => {
    mutateComentarios();
  }, [mutateComentarios]);

  return {
    enquete,
    resultado,
    comentarios: comentariosData?.comentarios ?? [],
    totalComentarios: comentariosData?.total ?? 0,
    isLoading: isLoadingEnquete,
    jaVotou,
    votar,
    comentar,
    refreshComentarios,
  };
}
