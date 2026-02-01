'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { NIVEL_CONFIG, CONQUISTAS_DEFINICOES, TipoConquista } from '@/types/arena';

interface PerfilUsuario {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  nivel: string;
  pontos_totais: number;
  xp_total: number;
  total_previsoes: number;
  previsoes_corretas: number;
  previsoes_perfeitas: number;
  streak_atual: number;
  melhor_streak: number;
  streak_main_event: number;
  melhor_streak_main_event: number;
  underdogs_acertados: number;
  kos_acertados: number;
  subs_acertados: number;
  decisoes_acertadas: number;
  total_conquistas: number;
  total_amigos: number;
  created_at: string;
}

interface Conquista {
  tipo: TipoConquista;
  desbloqueada_em: string;
}

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function PerfilPage({ params }: PageProps) {
  const { username } = use(params);
  const { usuario: usuarioAtual, isAuthenticated } = useArenaAuth();
  const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'conquistas'>('stats');

  const isOwnProfile = isAuthenticated && usuarioAtual?.username === username;

  useEffect(() => {
    fetchPerfil();
  }, [username]);

  async function fetchPerfil() {
    try {
      const res = await fetch(`/api/arena/perfil/${username}`);
      if (res.ok) {
        const data = await res.json();
        setPerfil(data.usuario);
        setConquistas(data.conquistas || []);
      } else {
        const data = await res.json();
        setError(data.error || 'Usuario nao encontrado');
      }
    } catch {
      setError('Erro ao carregar perfil');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red"></div>
        </div>
      </div>
    );
  }

  if (error || !perfil) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="font-display text-2xl text-dark-text mb-4">
            {error || 'Usuario nao encontrado'}
          </h1>
          <Link href="/arena" className="text-ufc-red hover:text-ufc-redLight">
            ← Voltar para Arena
          </Link>
        </div>
      </div>
    );
  }

  const nivelConfig = NIVEL_CONFIG[perfil.nivel as keyof typeof NIVEL_CONFIG];
  const xpParaProximoNivel = nivelConfig?.xp_necessario || 0;
  const progressoXP = xpParaProximoNivel > 0
    ? Math.min((perfil.xp_total / xpParaProximoNivel) * 100, 100)
    : 100;

  const taxaAcerto = perfil.total_previsoes > 0
    ? ((perfil.previsoes_corretas / perfil.total_previsoes) * 100).toFixed(1)
    : '0.0';

  const conquistasTipos = conquistas.map(c => c.tipo);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-dark-textMuted mb-6">
          <Link href="/arena/dashboard" className="hover:text-ufc-red">
            Arena
          </Link>
          <span>/</span>
          <span className="text-dark-text">Perfil</span>
        </div>

        {/* Profile Header */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                style={{ backgroundColor: nivelConfig?.cor + '20' }}
              >
                {perfil.avatar_url ? (
                  <img
                    src={perfil.avatar_url}
                    alt={perfil.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span style={{ color: nivelConfig?.cor }}>
                    {nivelConfig?.icone}
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-display text-3xl text-dark-text">
                    {perfil.display_name || perfil.username}
                  </h1>
                  <p className="text-dark-textMuted">@{perfil.username}</p>
                </div>
                {isOwnProfile && (
                  <Link
                    href="/arena/perfil/editar"
                    className="rounded border border-dark-border px-4 py-2 text-sm text-dark-textMuted hover:border-ufc-red hover:text-ufc-red transition-colors"
                  >
                    Editar Perfil
                  </Link>
                )}
              </div>

              {/* Level */}
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" style={{ color: nivelConfig?.cor }}>
                    {nivelConfig?.icone}
                  </span>
                  <span
                    className="font-display uppercase"
                    style={{ color: nivelConfig?.cor }}
                  >
                    {perfil.nivel.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-dark-textMuted">
                    {perfil.xp_total} / {xpParaProximoNivel} XP
                  </span>
                </div>
                <div className="h-2 rounded-full bg-dark-border overflow-hidden max-w-xs">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progressoXP}%`,
                      backgroundColor: nivelConfig?.cor
                    }}
                  />
                </div>
              </div>

              {perfil.bio && (
                <p className="mt-4 text-dark-textMuted">{perfil.bio}</p>
              )}

              <p className="mt-4 text-xs text-dark-textMuted">
                Membro desde {new Date(perfil.created_at).toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex-shrink-0 grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded bg-dark-bg">
                <p className="font-display text-3xl text-ufc-red">
                  {perfil.pontos_totais}
                </p>
                <p className="text-xs text-dark-textMuted">Pontos</p>
              </div>
              <div className="text-center p-4 rounded bg-dark-bg">
                <p className="font-display text-3xl text-green-400">
                  {taxaAcerto}%
                </p>
                <p className="text-xs text-dark-textMuted">Taxa Acerto</p>
              </div>
              <div className="text-center p-4 rounded bg-dark-bg">
                <p className="font-display text-3xl text-ufc-gold">
                  {perfil.streak_atual}
                </p>
                <p className="text-xs text-dark-textMuted">Sequencia</p>
              </div>
              <div className="text-center p-4 rounded bg-dark-bg">
                <p className="font-display text-3xl text-purple-400">
                  {perfil.total_conquistas}
                </p>
                <p className="text-xs text-dark-textMuted">Conquistas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-dark-border">
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === 'stats'
                ? 'text-ufc-red'
                : 'text-dark-textMuted hover:text-dark-text'
            }`}
          >
            Estatisticas
            {activeTab === 'stats' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ufc-red" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('conquistas')}
            className={`px-4 py-3 font-medium transition-colors relative ${
              activeTab === 'conquistas'
                ? 'text-ufc-gold'
                : 'text-dark-textMuted hover:text-dark-text'
            }`}
          >
            Conquistas
            {activeTab === 'conquistas' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ufc-gold" />
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'stats' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Previsoes */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <h3 className="font-display text-lg uppercase text-dark-text mb-4">
                Previsoes
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Total</span>
                  <span className="font-medium text-dark-text">{perfil.total_previsoes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Corretas</span>
                  <span className="font-medium text-green-400">{perfil.previsoes_corretas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Perfeitas</span>
                  <span className="font-medium text-ufc-gold">{perfil.previsoes_perfeitas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Taxa de Acerto</span>
                  <span className="font-medium text-dark-text">{taxaAcerto}%</span>
                </div>
              </div>
            </div>

            {/* Sequencias */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <h3 className="font-display text-lg uppercase text-dark-text mb-4">
                Sequencias
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Atual</span>
                  <span className="font-medium text-ufc-gold">{perfil.streak_atual}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Melhor</span>
                  <span className="font-medium text-green-400">{perfil.melhor_streak}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Main Events Atual</span>
                  <span className="font-medium text-ufc-red">{perfil.streak_main_event}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Main Events Melhor</span>
                  <span className="font-medium text-purple-400">{perfil.melhor_streak_main_event}</span>
                </div>
              </div>
            </div>

            {/* Especialidades */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <h3 className="font-display text-lg uppercase text-dark-text mb-4">
                Especialidades
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">KOs Acertados</span>
                  <span className="font-medium text-red-400">{perfil.kos_acertados}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Subs Acertados</span>
                  <span className="font-medium text-blue-400">{perfil.subs_acertados}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Decisoes Acertadas</span>
                  <span className="font-medium text-yellow-400">{perfil.decisoes_acertadas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-textMuted">Underdogs</span>
                  <span className="font-medium text-purple-400">{perfil.underdogs_acertados}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CONQUISTAS_DEFINICOES.map((conquista) => {
                const desbloqueada = conquistasTipos.includes(conquista.tipo);
                const conquistaData = conquistas.find(c => c.tipo === conquista.tipo);

                return (
                  <div
                    key={conquista.tipo}
                    className={`rounded-lg border p-4 transition-all ${
                      desbloqueada
                        ? 'border-ufc-gold/50 bg-ufc-gold/5'
                        : 'border-dark-border bg-dark-card opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{conquista.icone}</span>
                      <div>
                        <h4 className="font-display text-dark-text">
                          {conquista.nome}
                        </h4>
                        <p className="text-sm text-dark-textMuted">
                          {conquista.descricao}
                        </p>
                        {desbloqueada && conquistaData && (
                          <p className="mt-2 text-xs text-ufc-gold">
                            Desbloqueada em {new Date(conquistaData.desbloqueada_em).toLocaleDateString('pt-BR')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
