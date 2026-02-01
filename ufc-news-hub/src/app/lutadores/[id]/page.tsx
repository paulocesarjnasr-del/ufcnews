'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { LutadorPerfil } from '@/components/lutadores/LutadorPerfil';
import { LutadorHistorico } from '@/components/lutadores/LutadorHistorico';
import { LutadorComHistorico } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LutadorPage({ params }: PageProps) {
  const { id } = use(params);
  const [lutador, setLutador] = useState<LutadorComHistorico | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLutador();
  }, [id]);

  async function fetchLutador() {
    try {
      const res = await fetch(`/api/lutadores/${id}`);
      if (res.ok) {
        const data = await res.json();
        setLutador(data);
      }
    } catch (error) {
      console.error('Erro ao carregar lutador:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-64 rounded-lg bg-dark-card" />
            <div className="h-48 rounded-lg bg-dark-card" />
          </div>
        </div>
      </div>
    );
  }

  if (!lutador) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="font-display text-2xl text-dark-text">
            Lutador nao encontrado
          </h1>
          <Link
            href="/lutadores"
            className="mt-4 inline-block text-ufc-red hover:text-ufc-redLight"
          >
            ← Voltar para Lutadores
          </Link>
        </div>
      </div>
    );
  }

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
          <span className="text-dark-text">{lutador.nome}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Perfil */}
            <LutadorPerfil lutador={lutador} />

            {/* Historico de Lutas */}
            <div>
              <h2 className="mb-4 font-display text-xl uppercase text-dark-text">
                Historico de Lutas
              </h2>
              <LutadorHistorico
                lutas={lutador.lutas_recentes}
                lutadorId={lutador.id}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-4">
              <h3 className="mb-4 font-display text-lg uppercase text-dark-text">
                Estatisticas
              </h3>
              <div className="space-y-3">
                <StatRow
                  label="Taxa de Vitoria"
                  value={
                    lutador.vitorias &&
                    lutador.vitorias + (lutador.derrotas || 0) > 0
                      ? `${Math.round(
                          (lutador.vitorias /
                            (lutador.vitorias + (lutador.derrotas || 0))) *
                            100
                        )}%`
                      : '-'
                  }
                />
                <StatRow
                  label="Vitorias por KO"
                  value={`${lutador.nocautes || 0} (${
                    lutador.vitorias
                      ? Math.round(
                          ((lutador.nocautes || 0) / lutador.vitorias) * 100
                        )
                      : 0
                  }%)`}
                />
                <StatRow
                  label="Vitorias por SUB"
                  value={`${lutador.finalizacoes || 0} (${
                    lutador.vitorias
                      ? Math.round(
                          ((lutador.finalizacoes || 0) / lutador.vitorias) * 100
                        )
                      : 0
                  }%)`}
                />
                <StatRow
                  label="Vitorias por DEC"
                  value={`${lutador.decisoes || 0} (${
                    lutador.vitorias
                      ? Math.round(
                          ((lutador.decisoes || 0) / lutador.vitorias) * 100
                        )
                      : 0
                  }%)`}
                />
              </div>
            </div>

            {/* Compare */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-4">
              <h3 className="mb-4 font-display text-lg uppercase text-dark-text">
                Comparar
              </h3>
              <Link
                href={`/lutadores/comparar?ids=${lutador.id}`}
                className="block w-full rounded bg-ufc-red px-4 py-2 text-center font-bold text-white transition-colors hover:bg-ufc-redLight"
              >
                Comparar com outro lutador
              </Link>
            </div>

            {/* Links */}
            {lutador.url_perfil && (
              <div className="rounded-lg border border-dark-border bg-dark-card p-4">
                <h3 className="mb-4 font-display text-lg uppercase text-dark-text">
                  Links
                </h3>
                <a
                  href={lutador.url_perfil}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-ufc-red hover:text-ufc-redLight"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Perfil Oficial UFC
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-dark-textMuted">{label}</span>
      <span className="font-medium text-dark-text">{value}</span>
    </div>
  );
}
