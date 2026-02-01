'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { RankingTable } from '@/components/arena/RankingTable';
import { RankingPrevisor } from '@/types';
import { useFingerprint } from '@/hooks/useFingerprint';

export default function RankingPage() {
  const [ranking, setRanking] = useState<(RankingPrevisor & { posicao: number })[]>([]);
  const [stats, setStats] = useState<{
    total_previsores: number | null;
    total_previsoes: number | null;
    media_taxa_acerto: number | null;
  }>({
    total_previsores: 0,
    total_previsoes: 0,
    media_taxa_acerto: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('pontos_total');
  const fingerprint = useFingerprint();

  useEffect(() => {
    fetchRanking();
  }, [orderBy]);

  async function fetchRanking() {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/ranking?orderBy=${orderBy}&limit=100`);
      if (res.ok) {
        const data = await res.json();
        setRanking(data.ranking || []);
        setStats(data.stats || {
          total_previsores: 0,
          total_previsoes: 0,
          media_taxa_acerto: 0,
        });
      }
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const orderOptions = [
    { value: 'pontos_total', label: 'Pontos' },
    { value: 'taxa_acerto', label: 'Taxa de Acerto' },
    { value: 'total_previsoes', label: 'Total de Previsoes' },
    { value: 'melhor_sequencia', label: 'Melhor Sequencia' },
  ];

  // Encontrar posicao do usuario
  const userRanking = ranking.find((r) => r.usuario_fingerprint === fingerprint);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      {/* Hero */}
      <section className="border-b border-dark-border bg-gradient-to-b from-ufc-gold/10 to-transparent">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-dark-textMuted">
            <Link href="/arena" className="hover:text-ufc-red">
              Arena
            </Link>
            <span>/</span>
            <span className="text-dark-text">Ranking</span>
          </div>

          <h1 className="font-display text-4xl uppercase text-dark-text">
            Ranking de <span className="text-ufc-gold">Previsores</span>
          </h1>
          <p className="mt-2 text-dark-textMuted">
            Os melhores analistas de UFC do Brasil
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-dark-border bg-dark-card p-4 text-center">
              <p className="font-display text-3xl text-ufc-gold">
                {stats.total_previsores ?? 0}
              </p>
              <p className="text-sm text-dark-textMuted">Previsores</p>
            </div>
            <div className="rounded-lg border border-dark-border bg-dark-card p-4 text-center">
              <p className="font-display text-3xl text-ufc-red">
                {stats.total_previsoes ?? 0}
              </p>
              <p className="text-sm text-dark-textMuted">Previsoes</p>
            </div>
            <div className="rounded-lg border border-dark-border bg-dark-card p-4 text-center">
              <p className="font-display text-3xl text-green-400">
                {Number(stats.media_taxa_acerto ?? 0).toFixed(0)}%
              </p>
              <p className="text-sm text-dark-textMuted">Media de Acerto</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* User Card */}
        {userRanking && (
          <div className="mb-6 rounded-lg border border-ufc-red bg-ufc-red/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-textMuted">Sua posicao</p>
                <p className="font-display text-2xl text-dark-text">
                  #{userRanking.posicao} - {userRanking.usuario_nome}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl text-ufc-red">
                  {userRanking.pontos_total}
                </p>
                <p className="text-sm text-dark-textMuted">pontos</p>
              </div>
            </div>
            <div className="mt-3 flex gap-4 text-sm">
              <span className="text-dark-textMuted">
                {userRanking.acertos_vencedor ?? 0}/{userRanking.total_previsoes ?? 0}{' '}
                acertos
              </span>
              <span className="text-dark-textMuted">
                {Number(userRanking.taxa_acerto ?? 0).toFixed(0)}% taxa
              </span>
              {Number(userRanking.sequencia_atual ?? 0) > 0 && (
                <span className="text-green-400">
                  {userRanking.sequencia_atual} em sequencia
                </span>
              )}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl uppercase text-dark-text">
            Classificacao Geral
          </h2>

          <div className="flex items-center gap-2">
            <span className="text-sm text-dark-textMuted">Ordenar por:</span>
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              className="rounded border border-dark-border bg-dark-card px-3 py-2 text-sm text-dark-text focus:border-ufc-red focus:outline-none"
            >
              {orderOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-dark-border bg-dark-card overflow-hidden">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded bg-dark-border"
                />
              ))}
            </div>
          ) : ranking.length === 0 ? (
            <div className="p-8 text-center text-dark-textMuted">
              Nenhum previsor encontrado ainda. Seja o primeiro!
            </div>
          ) : (
            <RankingTable ranking={ranking} currentUserFingerprint={fingerprint} />
          )}
        </div>
      </div>
    </div>
  );
}
