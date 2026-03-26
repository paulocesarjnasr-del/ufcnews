'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Users, Trophy, Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useArenaAuth } from '@/hooks/useArenaAuth';

interface Liga {
  id: string;
  nome: string;
  tipo: 'publica' | 'privada';
  total_membros: number;
  max_membros: number;
  posicao_atual?: number;
  pontos_temporada?: number;
  minha_posicao?: number;
}

export default function LigasPage() {
  const t = useTranslations('arena');
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [minhasLigas, setMinhasLigas] = useState<Liga[]>([]);
  const [ligasPublicas, setLigasPublicas] = useState<Liga[]>([]);
  const [codigoConvite, setCodigoConvite] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [joiningId, setJoiningId] = useState<string | null>(null);

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
        fetch('/api/arena/ligas?tipo=minhas'),
        fetch('/api/arena/ligas?tipo=publicas&limit=10'),
      ]);

      if (minhasRes.ok) {
        const data = await minhasRes.json();
        setMinhasLigas(data.ligas || []);
      }

      if (publicasRes.ok) {
        const data = await publicasRes.json();
        setLigasPublicas(data.ligas || []);
      }
    } catch (err) {
      console.error('Erro ao carregar ligas:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEntrarComCodigo(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!codigoConvite.trim()) {
      setError(t('league_enter_code_required'));
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
        setCodigoConvite('');
        setError('');
        fetchLigas();
      } else {
        setError(data.error || t('error_join_league'));
      }
    } catch {
      setError(t('error_connection'));
    }
  }

  async function handleEntrarLigaPublica(ligaId: string) {
    setJoiningId(ligaId);
    try {
      const res = await fetch('/api/arena/ligas/entrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liga_id: ligaId }),
      });

      if (res.ok) {
        fetchLigas();
      }
    } catch (err) {
      console.error('Erro ao entrar na liga:', err);
    } finally {
      setJoiningId(null);
    }
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Join by Code */}
      <div className="neu-card rounded-xl p-5 mb-8">
        <form onSubmit={handleEntrarComCodigo} className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={codigoConvite}
              onChange={(e) => setCodigoConvite(e.target.value.toUpperCase())}
              placeholder={t('invite_code')}
              maxLength={8}
              className="neu-inset w-full rounded-lg px-4 py-3 font-mono text-sm tracking-wider text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-2 focus:ring-ufc-gold/50"
            />
          </div>
          <button
            type="submit"
            className="neu-button flex items-center gap-2 rounded-lg bg-ufc-gold px-5 py-3 text-sm font-medium text-dark-bg hover:bg-ufc-gold/90 transition-colors"
          >
            <Search className="w-4 h-4" />
            {t('enter')}
          </button>
        </form>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>

      {/* Minhas Ligas */}
      <section className="mb-10">
        <h2 className="font-display text-2xl uppercase text-dark-text mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-ufc-gold" />
          {t('my_leagues')}
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-dark-card" />
            ))}
          </div>
        ) : minhasLigas.length === 0 ? (
          <div className="neu-card rounded-xl p-8 text-center">
            <p className="text-dark-textMuted mb-2">
              {t('no_leagues')}
            </p>
            <p className="text-sm text-dark-textMuted">
              {t('create_or_join')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {minhasLigas.map((liga) => (
              <Link
                key={liga.id}
                href={`/arena/ligas/${liga.id}`}
                className="neu-card-hover flex items-center justify-between rounded-xl p-4 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-ufc-red/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-ufc-red" />
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-text">{liga.nome}</h3>
                    <p className="text-xs text-dark-textMuted flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {liga.total_membros} {t('members')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-ufc-gold">
                    #{liga.minha_posicao || liga.posicao_atual || '-'}
                  </p>
                  <p className="text-xs text-dark-textMuted">{t('position')}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Ligas Publicas */}
      <section className="mb-10">
        <h2 className="font-display text-2xl uppercase text-dark-text mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-400" />
          {t('public_leagues')}
        </h2>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl bg-dark-card" />
            ))}
          </div>
        ) : ligasPublicas.length === 0 ? (
          <div className="neu-card rounded-xl p-8 text-center">
            <p className="text-dark-textMuted">
              {t('no_public_leagues')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {ligasPublicas.map((liga) => {
              const jaMembro = minhasLigas.some((l) => l.id === liga.id);

              return (
                <div
                  key={liga.id}
                  className="neu-card flex items-center justify-between rounded-xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-text">{liga.nome}</h3>
                      <p className="text-xs text-dark-textMuted">
                        {liga.total_membros} {t('members')}
                      </p>
                    </div>
                  </div>

                  {jaMembro ? (
                    <Link
                      href={`/arena/ligas/${liga.id}`}
                      className="neu-button rounded-lg px-4 py-2 text-sm text-dark-textMuted hover:text-ufc-gold transition-colors"
                    >
                      {t('see')}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleEntrarLigaPublica(liga.id)}
                      disabled={joiningId === liga.id}
                      className="neu-button rounded-lg bg-ufc-gold px-4 py-2 text-sm font-medium text-dark-bg hover:bg-ufc-gold/90 transition-colors disabled:opacity-50"
                    >
                      {joiningId === liga.id ? '...' : t('enter')}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA Criar Liga */}
      <Link
        href="/arena/ligas/criar"
        className="neu-button flex items-center justify-center gap-2 w-full rounded-xl bg-ufc-red py-4 font-display uppercase text-white hover:bg-ufc-redLight transition-colors"
      >
        <Plus className="w-5 h-5" />
        {t('create_league')}
      </Link>
    </div>
  );
}
