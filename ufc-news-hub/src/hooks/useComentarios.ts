'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';
import {
  ComentarioComRespostas,
  ComentariosPaginados,
  NovoComentario,
  Comentario,
} from '@/types';
import { COMMENTS_REFRESH_INTERVAL } from '@/lib/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseComentariosReturn {
  comentarios: ComentarioComRespostas[];
  total: number;
  isLoading: boolean;
  error: Error | undefined;
  refresh: () => void;
  criarComentario: (
    dados: Omit<NovoComentario, 'fingerprint'>
  ) => Promise<{ success: boolean; error?: string; comentario?: Comentario }>;
  reportarComentario: (
    id: string
  ) => Promise<{ success: boolean; error?: string; hidden?: boolean }>;
  isSubmitting: boolean;
}

// Gera fingerprint no cliente baseado em características do navegador
function generateClientFingerprint(): string {
  if (typeof window === 'undefined') return '';

  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset().toString(),
    screen.width.toString(),
    screen.height.toString(),
    screen.colorDepth.toString(),
  ];

  // Hash simples baseado em string
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return Math.abs(hash).toString(16).padStart(16, '0');
}

export function useComentarios(noticiaId: string): UseComentariosReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<ComentariosPaginados>(
    noticiaId ? `/api/comentarios?noticia_id=${noticiaId}` : null,
    fetcher,
    {
      refreshInterval: COMMENTS_REFRESH_INTERVAL,
      revalidateOnFocus: true,
    }
  );

  const criarComentario = useCallback(
    async (dados: Omit<NovoComentario, 'fingerprint'>) => {
      setIsSubmitting(true);

      try {
        const fingerprint = generateClientFingerprint();

        const response = await fetch('/api/comentarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...dados,
            fingerprint,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          return {
            success: false,
            error: result.error || 'Erro ao criar comentário',
          };
        }

        // Revalidar dados
        await mutate();

        return {
          success: true,
          comentario: result.comentario,
        };
      } catch (err) {
        console.error('Erro ao criar comentário:', err);
        return {
          success: false,
          error: 'Erro de conexão. Tente novamente.',
        };
      } finally {
        setIsSubmitting(false);
      }
    },
    [mutate]
  );

  const reportarComentario = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/comentarios/${id}/reportar`, {
          method: 'POST',
        });

        const result = await response.json();

        if (!response.ok) {
          return {
            success: false,
            error: result.error || 'Erro ao reportar comentário',
          };
        }

        // Revalidar dados se o comentário foi ocultado
        if (result.hidden) {
          await mutate();
        }

        return {
          success: true,
          hidden: result.hidden,
        };
      } catch (err) {
        console.error('Erro ao reportar comentário:', err);
        return {
          success: false,
          error: 'Erro de conexão. Tente novamente.',
        };
      }
    },
    [mutate]
  );

  return {
    comentarios: data?.comentarios || [],
    total: data?.total || 0,
    isLoading,
    error,
    refresh: () => mutate(),
    criarComentario,
    reportarComentario,
    isSubmitting,
  };
}

// Hook para salvar/recuperar dados do autor no localStorage
interface AutorData {
  nome: string;
  email: string;
}

export function useAutorStorage() {
  const getAutor = useCallback((): AutorData => {
    if (typeof window === 'undefined') {
      return { nome: '', email: '' };
    }

    try {
      const stored = localStorage.getItem('comentario_autor');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parse errors
    }

    return { nome: '', email: '' };
  }, []);

  const saveAutor = useCallback((autor: AutorData) => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('comentario_autor', JSON.stringify(autor));
    } catch {
      // Ignore storage errors
    }
  }, []);

  return { getAutor, saveAutor };
}
