'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/ui/Header';
import { Comparador } from '@/components/lutadores/Comparador';
import { LutadorExpandido } from '@/types';

function ComparadorContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get('ids')?.split(',') || [];

  const [lutador1Id, setLutador1Id] = useState(initialIds[0] || '');
  const [lutador2Id, setLutador2Id] = useState(initialIds[1] || '');
  const [comparison, setComparison] = useState<{
    lutador1: LutadorExpandido & { stats: any };
    lutador2: LutadorExpandido & { stats: any };
    confrontos_diretos: any[];
  } | null>(null);
  const [lutadores, setLutadores] = useState<LutadorExpandido[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLutadores();
  }, []);

  useEffect(() => {
    if (lutador1Id && lutador2Id) {
      fetchComparison();
    }
  }, [lutador1Id, lutador2Id]);

  async function fetchLutadores() {
    try {
      const res = await fetch('/api/lutadores?limit=200');
      if (res.ok) {
        const data = await res.json();
        setLutadores(data.lutadores || data || []);
      }
    } catch (error) {
      console.error('Erro ao carregar lutadores:', error);
    }
  }

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

  const filteredLutadores = lutadores.filter((l) =>
    l.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red">
            Home
          </Link>
          <span>/</span>
          <Link href="/lutadores" className="hover:text-ufc-red">
            Lutadores
          </Link>
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
            lutadores={filteredLutadores}
            excludeId={lutador2Id}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
          <LutadorSelector
            label="Lutador 2"
            selectedId={lutador2Id}
            onSelect={setLutador2Id}
            lutadores={filteredLutadores}
            excludeId={lutador1Id}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
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
  searchTerm: string;
  onSearch: (term: string) => void;
}

function LutadorSelector({
  label,
  selectedId,
  onSelect,
  lutadores,
  excludeId,
  searchTerm,
  onSearch,
}: LutadorSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = lutadores.find((l) => l.id === selectedId);
  const available = lutadores.filter((l) => l.id !== excludeId);

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium text-dark-text">
        {label}
      </label>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-dark-border bg-dark-card p-3 text-left transition-colors hover:bg-dark-cardHover"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-dark-border">
              {selected.imagem_url ? (
                <Image
                  src={selected.imagem_url}
                  alt={selected.nome}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-dark-border text-lg font-bold text-dark-textMuted">
                  {selected.nome.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium text-dark-text">{selected.nome}</p>
              <p className="text-xs text-dark-textMuted">
                {selected.categoria_peso}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-dark-textMuted">Selecionar lutador...</span>
        )}
        <svg
          className={`h-5 w-5 text-dark-textMuted transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-auto rounded-lg border border-dark-border bg-dark-card shadow-lg">
          <div className="sticky top-0 border-b border-dark-border bg-dark-card p-2">
            <input
              type="text"
              placeholder="Buscar lutador..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full rounded border border-dark-border bg-dark-bg px-3 py-2 text-sm text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
            />
          </div>

          <div className="divide-y divide-dark-border">
            {available.slice(0, 20).map((lutador) => (
              <button
                key={lutador.id}
                onClick={() => {
                  onSelect(lutador.id);
                  setIsOpen(false);
                  onSearch('');
                }}
                className="flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-dark-cardHover"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-dark-border">
                  {lutador.imagem_url ? (
                    <Image
                      src={lutador.imagem_url}
                      alt={lutador.nome}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-dark-border text-sm font-bold text-dark-textMuted">
                      {lutador.nome.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-dark-text">
                    {lutador.nome}
                  </p>
                  <p className="text-xs text-dark-textMuted">
                    {lutador.categoria_peso}
                  </p>
                </div>
              </button>
            ))}
          </div>
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
