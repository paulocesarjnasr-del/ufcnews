'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import FighterImage from '@/components/ui/FighterImage';
import { Header } from '@/components/ui/Header';
import { Search, Filter, Users, X } from 'lucide-react';
import { LutadorExpandido } from '@/types';

const WEIGHT_CLASSES = [
  'Strawweight',
  "Women's Strawweight",
  'Flyweight',
  "Women's Flyweight",
  'Bantamweight',
  "Women's Bantamweight",
  'Featherweight',
  "Women's Featherweight",
  'Lightweight',
  'Welterweight',
  'Middleweight',
  'Light Heavyweight',
  'Heavyweight',
  'Catchweight',
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type DataCompleteness = 'complete' | 'partial' | 'minimal';

function getDataCompleteness(fighter: LutadorExpandido): DataCompleteness {
  const hasPhoto = !!fighter.imagem_url;
  const hasStats = (fighter as unknown as Record<string, unknown>).slpm !== null && (fighter as unknown as Record<string, unknown>).slpm !== undefined;
  const hasRecord = (fighter.vitorias || 0) + (fighter.derrotas || 0) > 0;

  if (hasPhoto && hasStats && hasRecord) return 'complete';
  if (hasPhoto || hasStats || hasRecord) return 'partial';
  return 'minimal';
}

export default function FightersPage() {
  const [fighters, setFighters] = useState<LutadorExpandido[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [offset, setOffset] = useState(0);
  const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const LIMIT = 120;

  const fetchFighters = useCallback(async (reset = false) => {
    const currentOffset = reset ? 0 : offset;
    if (reset) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const params = new URLSearchParams({
        limit: String(LIMIT),
        offset: String(currentOffset),
        sort: 'photo_first',
      });
      if (search) params.set('search', search);
      if (categoria) params.set('categoria', categoria);

      const res = await fetch(`/api/lutadores?${params}`);
      const data = await res.json();

      if (reset) {
        setFighters(data.lutadores);
        setOffset(LIMIT);
      } else {
        setFighters(prev => [...prev, ...data.lutadores]);
        setOffset(currentOffset + LIMIT);
      }
      setTotal(data.total);
    } catch (error) {
      console.error('Erro ao buscar lutadores:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [search, categoria, offset]);

  // Initial load + filter changes
  useEffect(() => {
    setOffset(0);
    fetchFighters(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categoria]);

  const hasMore = fighters.length < total;

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
          fetchFighters(false);
        }
      },
      { rootMargin: '400px' }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [hasMore, isLoading, isLoadingMore, fetchFighters]);

  const handleSearch = (value: string) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <div className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl uppercase text-dark-text md:text-3xl">
                <span className="text-ufc-red">Lutadores</span>
              </h1>
              <p className="mt-1 text-dark-textMuted">
                {total.toLocaleString()} atletas no banco de dados
              </p>
            </div>
            <Link
              href="/lutadores/comparar"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-ufc-red px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-ufc-redLight"
            >
              Comparar Lutadores
            </Link>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-textMuted" />
              <input
                type="text"
                placeholder="Buscar lutador por nome..."
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-xl border border-dark-border bg-dark-card py-2.5 pl-10 pr-4 text-dark-text placeholder-dark-textMuted outline-none focus:border-ufc-red transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                showFilters || categoria
                  ? 'border-ufc-red bg-ufc-red/10 text-ufc-red'
                  : 'border-dark-border bg-dark-card text-dark-textMuted hover:text-dark-text'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filtros
              {categoria && (
                <span className="ml-1 rounded-full bg-ufc-red px-2 py-0.5 text-xs text-white">1</span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="rounded-xl border border-dark-border bg-dark-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-dark-text">Categoria de Peso</h3>
                {categoria && (
                  <button
                    onClick={() => setCategoria('')}
                    className="flex items-center gap-1 text-xs text-ufc-red hover:text-ufc-redLight"
                  >
                    <X className="h-3 w-3" /> Limpar
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {WEIGHT_CLASSES.map((wc) => (
                  <button
                    key={wc}
                    onClick={() => setCategoria(categoria === wc ? '' : wc)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      categoria === wc
                        ? 'bg-ufc-red text-white'
                        : 'bg-dark-bg text-dark-textMuted hover:text-dark-text hover:bg-dark-border'
                    }`}
                  >
                    {wc}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fighter Grid */}
        {isLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-dark-border bg-dark-card p-2.5">
                <div className="aspect-square rounded-lg bg-dark-border mb-2" />
                <div className="h-3.5 w-3/4 rounded bg-dark-border mb-1.5" />
                <div className="h-3 w-1/2 rounded bg-dark-border" />
              </div>
            ))}
          </div>
        ) : fighters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Users className="h-16 w-16 text-dark-border mb-4" />
            <h2 className="text-xl font-display text-dark-text mb-2">Nenhum lutador encontrado</h2>
            <p className="text-dark-textMuted">Tente buscar por outro nome ou ajuste os filtros</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {fighters.map((fighter) => (
                <FighterCard key={fighter.id} fighter={fighter} />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                {isLoadingMore && (
                  <div className="flex items-center gap-2 text-sm text-dark-textMuted">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-dark-textMuted border-t-ufc-red" />
                    Carregando...
                  </div>
                )}
              </div>
            )}
            {/* Sentinel div for IntersectionObserver */}
            <div ref={sentinelRef} className="h-1" />
          </>
        )}
      </div>
    </div>
  );
}

function FighterCard({ fighter }: { fighter: LutadorExpandido }) {
  const record = `${fighter.vitorias || 0}-${fighter.derrotas || 0}-${fighter.empates || 0}`;
  const wins = fighter.vitorias || 0;
  const completeness = getDataCompleteness(fighter);
  const initials = getInitials(fighter.nome);
  const stance = (fighter as unknown as Record<string, unknown>).stance as string | null;
  const estiloLuta = fighter.estilo_luta;

  return (
    <Link
      href={`/lutadores/${fighter.id}`}
      className="group relative rounded-xl border border-dark-border bg-dark-card p-2.5 transition-all hover:border-ufc-red/50 hover:shadow-lg hover:shadow-ufc-red/5"
    >
      {/* Wins badge */}
      {wins > 0 && (
        <div className="absolute top-1.5 right-1.5 z-10 rounded-md bg-dark-bg/80 backdrop-blur-sm px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
          {wins}W
        </div>
      )}

      {/* Data completeness dot */}
      {completeness !== 'complete' && (
        <div
          className={`absolute top-1.5 left-1.5 z-10 h-2 w-2 rounded-full ${
            completeness === 'partial' ? 'bg-amber-400' : 'bg-red-400'
          }`}
          title={completeness === 'partial' ? 'Dados parciais' : 'Dados mínimos'}
        />
      )}

      {/* Photo */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-dark-border mb-2">
        {fighter.imagem_url ? (
          <FighterImage
            src={fighter.imagem_url}
            alt={fighter.nome}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, 12.5vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e]">
            <span className="text-2xl sm:text-3xl font-bold text-white/40 select-none">
              {initials}
            </span>
          </div>
        )}
        {/* Ranking badge */}
        {fighter.ranking_divisao !== null && fighter.ranking_divisao !== undefined && (
          <div className="absolute top-1.5 left-1.5 rounded bg-ufc-red px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
            {fighter.ranking_divisao === 0 ? 'C' : `#${fighter.ranking_divisao}`}
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="font-medium text-dark-text text-xs sm:text-sm leading-tight truncate group-hover:text-ufc-red transition-colors">
        {fighter.nome}
      </h3>
      {fighter.apelido && (
        <p className="text-[10px] text-dark-textMuted truncate leading-tight">&quot;{fighter.apelido}&quot;</p>
      )}
      <div className="mt-1 flex items-center justify-between gap-1">
        <span className="text-[10px] sm:text-xs font-mono text-dark-textMuted">{record}</span>
        {fighter.categoria_peso && (
          <span className="text-[9px] sm:text-[10px] text-dark-textMuted truncate max-w-[55%] text-right leading-tight">
            {fighter.categoria_peso}
          </span>
        )}
      </div>

      {/* Fighting style badge */}
      {estiloLuta && (
        <div className="mt-1">
          <span className="inline-block rounded-full bg-ufc-red/10 border border-ufc-red/20 px-1.5 py-0.5 text-[9px] text-ufc-red truncate max-w-full">
            {estiloLuta}
          </span>
        </div>
      )}

      {/* Stance */}
      {stance && (
        <p className="mt-0.5 text-[9px] text-dark-textMuted/70 truncate">
          {stance}
        </p>
      )}

      {fighter.pais && (
        <p className="mt-0.5 text-[10px] text-dark-textMuted truncate">{fighter.pais}</p>
      )}
    </Link>
  );
}
