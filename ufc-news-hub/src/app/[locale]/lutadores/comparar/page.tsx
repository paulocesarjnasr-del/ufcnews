'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FighterImage from '@/components/ui/FighterImage';
import { Header } from '@/components/ui/Header';
import { Comparador } from '@/components/lutadores/Comparador';
import { LutadorExpandido } from '@/types';
import { Search, ChevronDown, X } from 'lucide-react';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function FighterAvatar({ fighter, size = 'md' }: { fighter: { nome: string; imagem_url: string | null }; size?: 'sm' | 'md' }) {
  const sizeClasses = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className={`relative ${sizeClasses} overflow-hidden rounded-full border border-dark-border flex-shrink-0`}>
      {fighter.imagem_url ? (
        <FighterImage
          src={fighter.imagem_url}
          alt={fighter.nome}
          fill
          className="object-cover object-top"
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e] ${textSize} font-bold text-white/35`}>
          {getInitials(fighter.nome)}
        </div>
      )}
    </div>
  );
}

// Virtualized list — only renders visible items for performance with 4000+ fighters
function VirtualizedList({ fighters, selectedId, onSelect }: { 
  fighters: LutadorExpandido[]; selectedId: string; onSelect: (id: string) => void 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const ITEM_HEIGHT = 52;
  const CONTAINER_HEIGHT = 320;
  const totalHeight = fighters.length * ITEM_HEIGHT;
  
  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 5);
  const endIndex = Math.min(fighters.length, Math.ceil((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + 5);
  const visibleFighters = fighters.slice(startIndex, endIndex);

  if (fighters.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-dark-textMuted">
        Nenhum lutador encontrado
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto"
      style={{ maxHeight: CONTAINER_HEIGHT }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleFighters.map((lutador, i) => (
          <button
            key={lutador.id}
            onClick={() => onSelect(lutador.id)}
            style={{
              position: 'absolute',
              top: (startIndex + i) * ITEM_HEIGHT,
              left: 0,
              right: 0,
              height: ITEM_HEIGHT,
            }}
            className={`flex w-full items-center gap-3 px-3 text-left transition-colors hover:bg-dark-cardHover border-b border-dark-border/30 ${
              lutador.id === selectedId ? 'bg-ufc-red/10' : ''
            }`}
          >
            <FighterAvatar fighter={lutador} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-dark-text truncate">
                {lutador.nome}
              </p>
              <p className="text-xs text-dark-textMuted truncate">
                {lutador.categoria_peso && <span>{lutador.categoria_peso}</span>}
                {lutador.categoria_peso && lutador.pais && <span> · </span>}
                {lutador.pais && <span>{lutador.pais}</span>}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ComparadorContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get('ids')?.split(',') || [];

  const [lutador1Id, setLutador1Id] = useState(initialIds[0] || '');
  const [lutador2Id, setLutador2Id] = useState(initialIds[1] || '');
  const [comparison, setComparison] = useState<{
    lutador1: LutadorExpandido & { stats: { record: string; taxa_vitoria: number; taxa_finalizacao: number; ko_ratio: number; sub_ratio: number; dec_ratio: number } };
    lutador2: LutadorExpandido & { stats: { record: string; taxa_vitoria: number; taxa_finalizacao: number; ko_ratio: number; sub_ratio: number; dec_ratio: number } };
    confrontos_diretos: { id: string; evento_nome: string; evento_data: string; vencedor_id: string | null; metodo: string | null }[];
  } | null>(null);
  const [allLutadores, setAllLutadores] = useState<LutadorExpandido[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingFighters, setIsLoadingFighters] = useState(true);

  useEffect(() => {
    async function fetchAllLutadores() {
      setIsLoadingFighters(true);
      try {
        // Load ALL fighters — they're lightweight (id, nome, imagem_url, categoria_peso, record)
        const res = await fetch('/api/lutadores?limit=5000&sort=photo_first&fields=minimal');
        if (res.ok) {
          const data = await res.json();
          setAllLutadores(data.lutadores || data || []);
        }
      } catch (error) {
        console.error('Erro ao carregar lutadores:', error);
      } finally {
        setIsLoadingFighters(false);
      }
    }
    fetchAllLutadores();
  }, []);

  useEffect(() => {
    if (lutador1Id && lutador2Id) {
      async function fetchComparison() {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/lutadores/comparar?ids=${lutador1Id},${lutador2Id}`);
          if (res.ok) {
            const data = await res.json();
            setComparison(data);
          }
        } catch (error) {
          console.error('Erro ao comparar:', error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchComparison();
    }
  }, [lutador1Id, lutador2Id]);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red">Home</Link>
          <span>/</span>
          <Link href="/fighters" className="hover:text-ufc-red">Lutadores</Link>
          <span>/</span>
          <span className="text-dark-text">Comparar</span>
        </div>

        <h1 className="mb-6 font-display text-3xl uppercase text-dark-text">
          Comparar <span className="text-ufc-red">Lutadores</span>
        </h1>

        {/* Selectors */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <LutadorSelector
            label="Lutador 1"
            selectedId={lutador1Id}
            onSelect={setLutador1Id}
            lutadores={allLutadores}
            excludeId={lutador2Id}
            isLoadingFighters={isLoadingFighters}
          />
          <LutadorSelector
            label="Lutador 2"
            selectedId={lutador2Id}
            onSelect={setLutador2Id}
            lutadores={allLutadores}
            excludeId={lutador1Id}
            isLoadingFighters={isLoadingFighters}
          />
        </div>

        {/* Comparison */}
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-32 rounded-lg bg-dark-card" />
            <div className="h-64 rounded-lg bg-dark-card" />
          </div>
        ) : comparison ? (
          <Comparador
            lutador1={comparison.lutador1}
            lutador2={comparison.lutador2}
            confrontos={comparison.confrontos_diretos}
          />
        ) : (
          <div className="rounded-lg border border-dark-border bg-dark-card p-12 text-center">
            <p className="text-dark-textMuted">
              Selecione dois lutadores para comparar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface LutadorSelectorProps {
  label: string;
  selectedId: string;
  onSelect: (id: string) => void;
  lutadores: LutadorExpandido[];
  excludeId: string;
  isLoadingFighters: boolean;
}

function LutadorSelector({
  label,
  selectedId,
  onSelect,
  lutadores,
  excludeId,
  isLoadingFighters,
}: LutadorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = lutadores.find((l) => l.id === selectedId);

  // Smart filter: match beginning of any word in the name
  const filteredLutadores = useMemo(() => {
    const available = lutadores.filter((l) => l.id !== excludeId);
    if (!searchTerm.trim()) return available;
    
    const term = searchTerm.toLowerCase().trim();
    
    return available.filter((l) => {
      const nome = l.nome.toLowerCase();
      // Match if name starts with term
      if (nome.startsWith(term)) return true;
      // Match if any word in name starts with term
      const words = nome.split(/\s+/);
      if (words.some(w => w.startsWith(term))) return true;
      // Match if consecutive letters match (e.g. "al" matches "Alex")
      if (nome.includes(term)) return true;
      return false;
    }).sort((a, b) => {
      // Prioritize: exact start > word start > contains
      const aName = a.nome.toLowerCase();
      const bName = b.nome.toLowerCase();
      const aStartsWith = aName.startsWith(term) ? 0 : 1;
      const bStartsWith = bName.startsWith(term) ? 0 : 1;
      if (aStartsWith !== bStartsWith) return aStartsWith - bStartsWith;
      // Then by photo (fighters with photos first)
      const aHasPhoto = a.imagem_url ? 0 : 1;
      const bHasPhoto = b.imagem_url ? 0 : 1;
      return aHasPhoto - bHasPhoto;
    });
  }, [lutadores, excludeId, searchTerm]);

  // Show all filtered fighters (virtualized scroll handles performance)
  const displayedFighters = filteredLutadores;

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setSearchTerm('');
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const record = (l: LutadorExpandido) => 
    `${l.vitorias || 0}-${l.derrotas || 0}-${l.empates || 0}`;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-2 block text-sm font-medium text-dark-text">
        {label}
      </label>

      <button
        onClick={handleOpen}
        className="flex w-full items-center justify-between rounded-lg border border-dark-border bg-dark-card p-3 text-left transition-colors hover:border-ufc-red/50"
      >
        {selected ? (
          <div className="flex items-center gap-3 min-w-0">
            <FighterAvatar fighter={selected} />
            <div className="min-w-0">
              <p className="font-medium text-dark-text truncate">{selected.nome}</p>
              <p className="text-xs text-dark-textMuted truncate">
                {selected.categoria_peso} · {record(selected)}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-dark-textMuted">
            {isLoadingFighters ? 'Carregando lutadores...' : 'Selecionar lutador...'}
          </span>
        )}
        <ChevronDown className={`h-5 w-5 text-dark-textMuted transition-transform flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-dark-border bg-dark-card shadow-xl shadow-black/30 overflow-hidden">
          {/* Search */}
          <div className="sticky top-0 border-b border-dark-border bg-dark-card p-2 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-textMuted" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar lutador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-dark-border bg-dark-bg py-2 pl-9 pr-8 text-sm text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-dark-textMuted hover:text-dark-text"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="mt-1 text-[10px] text-dark-textMuted px-1">
                {filteredLutadores.length.toLocaleString()} lutadores encontrados
              </p>
            )}
          </div>

          {/* Fighter List */}
          <VirtualizedList
            fighters={displayedFighters}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

export default function CompararPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-dark-card rounded" />
            <div className="h-48 bg-dark-card rounded" />
          </div>
        </div>
      </div>
    }>
      <ComparadorContent />
    </Suspense>
  );
}
