'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { LutadorPerfil } from '@/components/lutadores/LutadorPerfil';
import { LutadorHistorico } from '@/components/lutadores/LutadorHistorico';
import { LutadorComHistorico, HistoricoUfcItem } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LutadorPage({ params }: PageProps) {
  const { id } = use(params);
  const [lutador, setLutador] = useState<LutadorComHistorico | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    fetchLutador();
  }, [id]);

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

            {/* Historico de Lutas (sistema interno) */}
            {lutador.lutas_recentes && lutador.lutas_recentes.length > 0 && (
              <div>
                <h2 className="mb-4 font-display text-xl uppercase text-dark-text">
                  Lutas Agendadas / Recentes
                </h2>
                <LutadorHistorico
                  lutas={lutador.lutas_recentes}
                  lutadorId={lutador.id}
                />
              </div>
            )}

            {/* Historico UFC Completo (scraped from UFC.com) */}
            {lutador.historico_ufc && lutador.historico_ufc.length > 0 && (
              <div>
                <h2 className="mb-4 font-display text-xl uppercase text-dark-text flex items-center gap-2">
                  <svg className="h-5 w-5 text-ufc-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Historico Completo no UFC ({lutador.historico_ufc.length} lutas)
                </h2>
                <HistoricoUfcTable fights={lutador.historico_ufc} />
              </div>
            )}
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

function HistoricoUfcTable({ fights }: { fights: HistoricoUfcItem[] }) {
  function formatDate(dateStr: string | null): string {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  function getResultBadge(resultado: string) {
    switch (resultado.toLowerCase()) {
      case 'win':
        return <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30">W</span>;
      case 'loss':
        return <span className="inline-flex items-center rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-bold text-red-400 ring-1 ring-red-500/30">L</span>;
      case 'draw':
        return <span className="inline-flex items-center rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs font-bold text-yellow-400 ring-1 ring-yellow-500/30">D</span>;
      case 'nc':
        return <span className="inline-flex items-center rounded-full bg-gray-500/20 px-2.5 py-0.5 text-xs font-bold text-gray-400 ring-1 ring-gray-500/30">NC</span>;
      default:
        return <span className="inline-flex items-center rounded-full bg-gray-500/20 px-2.5 py-0.5 text-xs font-bold text-gray-400 ring-1 ring-gray-500/30">-</span>;
    }
  }

  function getMethodColor(metodo: string | null): string {
    if (!metodo) return 'text-dark-textMuted';
    const m = metodo.toLowerCase();
    if (m.includes('ko') || m.includes('tko')) return 'text-red-400';
    if (m.includes('sub')) return 'text-blue-400';
    if (m.includes('dec')) return 'text-amber-400';
    return 'text-dark-textMuted';
  }

  return (
    <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-border bg-dark-bg/50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-dark-textMuted w-12">Res</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-dark-textMuted">Oponente</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-dark-textMuted">Metodo</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-dark-textMuted w-14">Rd</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-dark-textMuted w-16">Tempo</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-dark-textMuted">Data</th>
            </tr>
          </thead>
          <tbody>
            {fights.map((fight, idx) => (
              <tr
                key={fight.id}
                className={`border-b border-dark-border/50 transition-colors hover:bg-dark-border/20 ${
                  idx % 2 === 0 ? 'bg-dark-card' : 'bg-dark-bg/30'
                }`}
              >
                <td className="px-4 py-3">{getResultBadge(fight.resultado)}</td>
                <td className="px-4 py-3 font-medium text-dark-text">{fight.oponente_nome}</td>
                <td className={`px-4 py-3 ${getMethodColor(fight.metodo)}`}>{fight.metodo || '-'}</td>
                <td className="px-4 py-3 text-center text-dark-textMuted">{fight.round || '-'}</td>
                <td className="px-4 py-3 text-center text-dark-textMuted">{fight.tempo || '-'}</td>
                <td className="px-4 py-3 text-right text-dark-textMuted text-xs">{formatDate(fight.data_luta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-dark-border/50">
        {fights.map((fight) => (
          <div key={fight.id} className="p-3 flex items-center gap-3">
            <div className="flex-shrink-0">{getResultBadge(fight.resultado)}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-dark-text text-sm truncate">{fight.oponente_nome}</div>
              <div className="flex items-center gap-2 text-xs text-dark-textMuted mt-0.5">
                <span className={getMethodColor(fight.metodo)}>{fight.metodo || '-'}</span>
                {fight.round && <span>R{fight.round}</span>}
                {fight.tempo && <span>{fight.tempo}</span>}
              </div>
            </div>
            <div className="text-xs text-dark-textMuted whitespace-nowrap">{formatDate(fight.data_luta)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
