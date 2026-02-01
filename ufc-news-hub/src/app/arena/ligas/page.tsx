'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface Liga {
  id: string;
  nome: string;
  descricao: string | null;
  tipo: 'publica' | 'privada';
  total_membros: number;
  max_membros: number;
  campeao?: { username: string; display_name: string | null };
  posicao_atual?: number;
  pontos_temporada?: number;
}

export default function LigasPage() {
  const router = useRouter();
  const { usuario, isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [minhasLigas, setMinhasLigas] = useState<Liga[]>([]);
  const [ligasPublicas, setLigasPublicas] = useState<Liga[]>([]);
  const [codigoConvite, setCodigoConvite] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/arena/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLigas();
    }
  }, [isAuthenticated]);

  async function fetchLigas() {
    try {
      const [minhasRes, publicasRes] = await Promise.all([
        fetch('/api/arena/ligas'),
        fetch('/api/arena/ligas?publicas=true&limit=10'),
      ]);

      if (minhasRes.ok) {
        const data = await minhasRes.json();
        setMinhasLigas(data.ligas || []);
      }

      if (publicasRes.ok) {
        const data = await publicasRes.json();
        setLigasPublicas(data.ligas || []);
      }
    } catch (error) {
      console.error('Erro ao carregar ligas:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEntrarLiga(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!codigoConvite.trim()) {
      setError('Digite o codigo de convite');
      return;
    }

    try {
      const res = await fetch('/api/arena/ligas/entrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo_convite: codigoConvite.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowJoinModal(false);
        setCodigoConvite('');
        fetchLigas();
      } else {
        setError(data.error || 'Erro ao entrar na liga');
      }
    } catch {
      setError('Erro de conexao');
    }
  }

  async function handleEntrarLigaPublica(ligaId: string) {
    try {
      const res = await fetch('/api/arena/ligas/entrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liga_id: ligaId }),
      });

      if (res.ok) {
        fetchLigas();
      }
    } catch (error) {
      console.error('Erro ao entrar na liga:', error);
    }
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-dark-textMuted mb-2">
              <Link href="/arena/dashboard" className="hover:text-ufc-red">
                Arena
              </Link>
              <span>/</span>
              <span className="text-dark-text">Ligas</span>
            </div>
            <h1 className="font-display text-4xl uppercase text-dark-text">
              Minhas <span className="text-ufc-gold">Ligas</span>
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowJoinModal(true)}
              className="rounded border border-ufc-gold px-4 py-2 text-sm text-ufc-gold hover:bg-ufc-gold hover:text-dark-bg transition-colors"
            >
              Entrar com Codigo
            </button>
            <Link
              href="/arena/ligas/criar"
              className="rounded bg-ufc-red px-4 py-2 text-sm text-white hover:bg-ufc-redLight transition-colors"
            >
              Criar Liga
            </Link>
          </div>
        </div>

        {/* Minhas Ligas */}
        <section className="mb-12">
          <h2 className="font-display text-2xl uppercase text-dark-text mb-4">
            Suas Ligas
          </h2>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-lg bg-dark-card" />
              ))}
            </div>
          ) : minhasLigas.length === 0 ? (
            <div className="rounded-lg border border-dark-border bg-dark-card p-8 text-center">
              <p className="text-dark-textMuted mb-4">
                Voce ainda nao participa de nenhuma liga
              </p>
              <p className="text-sm text-dark-textMuted">
                Crie uma liga para competir com amigos ou entre em uma liga publica
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {minhasLigas.map((liga) => (
                <Link
                  key={liga.id}
                  href={`/arena/ligas/${liga.id}`}
                  className="rounded-lg border border-dark-border bg-dark-card p-6 hover:border-ufc-gold/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`text-xs font-bold uppercase ${
                        liga.tipo === 'privada' ? 'text-purple-400' : 'text-green-400'
                      }`}>
                        {liga.tipo}
                      </span>
                      <h3 className="font-display text-xl text-dark-text mt-1">
                        {liga.nome}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl text-ufc-gold">
                        #{liga.posicao_atual || '-'}
                      </p>
                      <p className="text-xs text-dark-textMuted">posicao</p>
                    </div>
                  </div>

                  {liga.descricao && (
                    <p className="text-sm text-dark-textMuted mb-4 line-clamp-2">
                      {liga.descricao}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-textMuted">
                      {liga.total_membros}{liga.max_membros > 0 ? `/${liga.max_membros}` : ''} membros
                      {liga.max_membros === 0 && <span className="text-green-400 ml-1">(Ilimitado)</span>}
                    </span>
                    {liga.pontos_temporada !== undefined && (
                      <span className="text-ufc-red">
                        {liga.pontos_temporada} pts
                      </span>
                    )}
                  </div>

                  {liga.campeao && (
                    <div className="mt-4 pt-4 border-t border-dark-border">
                      <span className="text-xs text-dark-textMuted">Campeao: </span>
                      <span className="text-sm text-ufc-gold">
                        {liga.campeao.display_name || liga.campeao.username}
                      </span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Ligas Publicas */}
        <section>
          <h2 className="font-display text-2xl uppercase text-dark-text mb-4">
            Ligas Publicas
          </h2>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-lg bg-dark-card" />
              ))}
            </div>
          ) : ligasPublicas.length === 0 ? (
            <div className="rounded-lg border border-dark-border bg-dark-card p-8 text-center">
              <p className="text-dark-textMuted">
                Nenhuma liga publica disponivel no momento
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ligasPublicas.map((liga) => {
                const jaMembro = minhasLigas.some((l) => l.id === liga.id);

                return (
                  <div
                    key={liga.id}
                    className="rounded-lg border border-dark-border bg-dark-card p-6"
                  >
                    <div className="mb-4">
                      <span className="text-xs font-bold uppercase text-green-400">
                        publica
                      </span>
                      <h3 className="font-display text-xl text-dark-text mt-1">
                        {liga.nome}
                      </h3>
                    </div>

                    {liga.descricao && (
                      <p className="text-sm text-dark-textMuted mb-4 line-clamp-2">
                        {liga.descricao}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span className="text-dark-textMuted">
                        {liga.total_membros}{liga.max_membros > 0 ? `/${liga.max_membros}` : ''} membros
                        {liga.max_membros === 0 && <span className="text-green-400 ml-1">(Ilimitado)</span>}
                      </span>
                    </div>

                    {jaMembro ? (
                      <Link
                        href={`/arena/ligas/${liga.id}`}
                        className="block w-full text-center rounded border border-dark-border py-2 text-sm text-dark-textMuted hover:border-ufc-gold hover:text-ufc-gold transition-colors"
                      >
                        Ver Liga
                      </Link>
                    ) : (liga.max_membros > 0 && liga.total_membros >= liga.max_membros) ? (
                      <button
                        disabled
                        className="w-full rounded bg-dark-border py-2 text-sm text-dark-textMuted cursor-not-allowed"
                      >
                        Liga Cheia
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEntrarLigaPublica(liga.id)}
                        className="w-full rounded bg-ufc-gold py-2 text-sm text-dark-bg hover:bg-ufc-gold/90 transition-colors"
                      >
                        Entrar
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Modal Codigo de Convite */}
      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md mx-4 rounded-lg border border-dark-border bg-dark-card p-6">
            <h3 className="font-display text-xl uppercase text-dark-text mb-4">
              Entrar em Liga Privada
            </h3>

            <form onSubmit={handleEntrarLiga}>
              {error && (
                <div className="mb-4 rounded border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm text-dark-textMuted mb-1">
                  Codigo de Convite
                </label>
                <input
                  type="text"
                  value={codigoConvite}
                  onChange={(e) => setCodigoConvite(e.target.value.toUpperCase())}
                  placeholder="XXXXXX"
                  maxLength={8}
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-center font-mono text-2xl tracking-widest text-dark-text focus:border-ufc-gold focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowJoinModal(false);
                    setCodigoConvite('');
                    setError('');
                  }}
                  className="flex-1 rounded border border-dark-border py-2 text-dark-textMuted hover:bg-dark-border transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded bg-ufc-gold py-2 text-dark-bg hover:bg-ufc-gold/90 transition-colors"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
