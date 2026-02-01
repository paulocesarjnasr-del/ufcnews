'use client';

import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Noticia, NoticiasPaginadas, ContadorCategorias, CategoriaNoticia } from '@/types';
import { ITEMS_PER_PAGE, AUTO_REFRESH_INTERVAL } from '@/lib/constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseNoticiasOptions {
  categoria?: CategoriaNoticia;
  porPagina?: number;
  refreshInterval?: number;
}

interface UseNoticiasReturn {
  noticias: Noticia[];
  contadores: ContadorCategorias | undefined;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | undefined;
  hasMore: boolean;
  loadMore: () => void;
  refresh: () => void;
}

export function useNoticias(options: UseNoticiasOptions = {}): UseNoticiasReturn {
  const {
    categoria,
    porPagina = ITEMS_PER_PAGE,
    refreshInterval = AUTO_REFRESH_INTERVAL,
  } = options;

  const getKey = (pageIndex: number, previousPageData: NoticiasPaginadas | null) => {
    // Chegou ao fim
    if (previousPageData && previousPageData.noticias.length === 0) return null;

    // Primeira página ou próximas
    const params = new URLSearchParams({
      pagina: String(pageIndex + 1),
      porPagina: String(porPagina),
    });

    if (categoria) {
      params.set('categoria', categoria);
    }

    return `/api/noticias?${params.toString()}`;
  };

  const {
    data,
    error,
    size,
    setSize,
    isLoading,
    isValidating,
    mutate,
  } = useSWRInfinite<NoticiasPaginadas & { contadores: ContadorCategorias }>(
    getKey,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      revalidateFirstPage: true,
    }
  );

  // Combinar todas as notícias de todas as páginas e remover duplicatas
  const allNoticias = data ? data.flatMap((page) => page.noticias) : [];
  // Deduplica por ID para evitar erro de chave duplicada no React
  const noticias = [...new Map(allNoticias.map(n => [n.id, n])).values()];

  // Contadores da primeira página
  const contadores = data?.[0]?.contadores;

  // Verificar se há mais páginas
  const hasMore = data
    ? data[data.length - 1]?.pagina < data[data.length - 1]?.totalPaginas
    : false;

  // Loading de mais páginas
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  return {
    noticias,
    contadores,
    isLoading: isLoading && !data,
    isLoadingMore: isLoadingMore || false,
    error,
    hasMore,
    loadMore: () => setSize(size + 1),
    refresh: () => mutate(),
  };
}

// Hook para uma única notícia
export function useNoticia(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/noticias/${id}` : null,
    fetcher
  );

  return {
    noticia: data,
    isLoading,
    error,
    refresh: () => mutate(),
  };
}
