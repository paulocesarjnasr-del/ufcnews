'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Trophy, Target, TrendingUp, Flame, Zap, Lock, Scale, Star, Share2, Calendar } from 'lucide-react';

import { useArenaAuth } from '@/hooks/useArenaAuth';
import { NIVEL_CONFIG, CONQUISTAS_DEFINICOES, type TipoConquista } from '@/types/arena';
import { EventoHistorico } from '@/components/arena/EventoHistorico';

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

  const isOwnProfile = isAuthenticated && usuarioAtual?.username === username;

  useEffect(() => {
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
    fetchPerfil();
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red"></div>
      </div>
    );
  }

  if (error || !perfil) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="font-display text-2xl text-dark-text mb-4">
          {error || 'Usuario nao encontrado'}
        </h1>
        <Link href="/arena" className="text-ufc-red hover:text-ufc-redLight">
          ← Voltar para Arena
        </Link>
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
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-dark-textMuted">
        <Link href="/arena" className="hover:text-ufc-red transition-colors">
          Arena
        </Link>
        <span>/</span>
        <span className="text-dark-text">Perfil</span>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* 1. Header Card */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="neu-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl border-2"
              style={{
                backgroundColor: (nivelConfig?.cor || '#808080') + '20',
                borderColor: nivelConfig?.cor || '#808080',
              }}
            >
              {perfil.avatar_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
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
          <div className="flex-grow min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="font-display text-2xl sm:text-3xl text-dark-text truncate">
                  {perfil.display_name || perfil.username}
                </h1>
                <p className="text-dark-textMuted text-sm">@{perfil.username}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {isOwnProfile && (
                  <Link
                    href="/arena/perfil/editar"
                    className="neu-button px-4 py-2 text-sm text-dark-textMuted hover:text-ufc-red transition-colors"
                  >
                    Editar Perfil
                  </Link>
                )}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/arena/perfil/${username}`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-card border border-dark-border text-sm text-dark-textMuted hover:text-dark-text transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Nivel Badge + XP Bar */}
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-display uppercase"
                  style={{
                    backgroundColor: (nivelConfig?.cor || '#808080') + '15',
                    color: nivelConfig?.cor,
                    border: `1px solid ${(nivelConfig?.cor || '#808080')}40`,
                  }}
                >
                  {nivelConfig?.icone} {perfil.nivel.replace('_', ' ')}
                </span>
                <span className="text-xs text-dark-textMuted">
                  {perfil.xp_total} / {xpParaProximoNivel} XP
                </span>
              </div>
              <div className="h-2 rounded-full bg-dark-border overflow-hidden max-w-xs">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressoXP}%`,
                    backgroundColor: nivelConfig?.cor,
                  }}
                />
              </div>
            </div>

            {perfil.bio && (
              <p className="mt-3 text-dark-textMuted text-sm">{perfil.bio}</p>
            )}

            <p className="mt-3 text-xs text-dark-textMuted">
              Membro desde{' '}
              {perfil.created_at && !isNaN(new Date(perfil.created_at).getTime())
                ? new Date(perfil.created_at).toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric',
                  })
                : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* 2. Stats Row - 3 compact cards */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-3">
        <div className="neu-card p-4 text-center">
          <Trophy className="w-5 h-5 text-ufc-red mx-auto mb-1.5" />
          <p className="font-display text-2xl text-ufc-red">{perfil.pontos_totais}</p>
          <p className="text-xs text-dark-textMuted">Pontos</p>
        </div>
        <div className="neu-card p-4 text-center">
          <Target className="w-5 h-5 text-green-400 mx-auto mb-1.5" />
          <p className="font-display text-2xl text-green-400">{perfil.previsoes_corretas}</p>
          <p className="text-xs text-dark-textMuted">Acertos</p>
        </div>
        <div className="neu-card p-4 text-center">
          <TrendingUp className="w-5 h-5 text-ufc-gold mx-auto mb-1.5" />
          <p className="font-display text-2xl text-ufc-gold">{taxaAcerto}%</p>
          <p className="text-xs text-dark-textMuted">Taxa de Acerto</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* 3. Sequences Card */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="neu-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="font-display text-lg uppercase text-dark-text">Sequencias</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="neu-inset rounded-lg p-3 text-center">
            <p className="font-display text-2xl text-ufc-gold">{perfil.streak_atual}</p>
            <p className="text-xs text-dark-textMuted mt-1">Atual</p>
          </div>
          <div className="neu-inset rounded-lg p-3 text-center">
            <p className="font-display text-2xl text-green-400">{perfil.melhor_streak}</p>
            <p className="text-xs text-dark-textMuted mt-1">Melhor</p>
          </div>
          <div className="neu-inset rounded-lg p-3 text-center">
            <p className="font-display text-2xl text-ufc-red">{perfil.streak_main_event}</p>
            <p className="text-xs text-dark-textMuted mt-1">Main Event</p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* 4. Specialties Card */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="neu-card p-6">
        <h2 className="font-display text-lg uppercase text-dark-text mb-4">Especialidades</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 neu-inset rounded-lg p-3">
            <Zap className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="font-display text-xl text-red-400">{perfil.kos_acertados}</p>
              <p className="text-xs text-dark-textMuted">KOs</p>
            </div>
          </div>
          <div className="flex items-center gap-3 neu-inset rounded-lg p-3">
            <Lock className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="font-display text-xl text-blue-400">{perfil.subs_acertados}</p>
              <p className="text-xs text-dark-textMuted">Subs</p>
            </div>
          </div>
          <div className="flex items-center gap-3 neu-inset rounded-lg p-3">
            <Scale className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <div>
              <p className="font-display text-xl text-yellow-400">{perfil.decisoes_acertadas}</p>
              <p className="text-xs text-dark-textMuted">Decisoes</p>
            </div>
          </div>
          <div className="flex items-center gap-3 neu-inset rounded-lg p-3">
            <Star className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="font-display text-xl text-purple-400">{perfil.underdogs_acertados}</p>
              <p className="text-xs text-dark-textMuted">Underdogs</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════ */}
      {/* 5. Achievements Grid - All 18 */}
      {/* ═══════════════════════════════════════════════ */}
      <div>
        <h2 className="font-display text-lg uppercase text-dark-text mb-4">
          Conquistas ({perfil.total_conquistas} / {CONQUISTAS_DEFINICOES.length})
        </h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {CONQUISTAS_DEFINICOES.map((conquista) => {
            const desbloqueada = conquistasTipos.includes(conquista.tipo);
            const conquistaData = conquistas.find(c => c.tipo === conquista.tipo);

            return (
              <div
                key={conquista.tipo}
                className={`neu-card p-4 transition-all ${
                  desbloqueada
                    ? 'border-l-4'
                    : 'opacity-40'
                }`}
                style={desbloqueada ? { borderLeftColor: conquista.cor } : undefined}
              >
                <div className="flex items-start gap-3">
                  {desbloqueada ? (
                    <span className="text-2xl flex-shrink-0">{conquista.icone}</span>
                  ) : (
                    <Lock className="w-6 h-6 text-dark-textMuted flex-shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <h4 className="font-display text-sm text-dark-text truncate">
                      {conquista.nome}
                    </h4>
                    <p className="text-xs text-dark-textMuted mt-0.5 line-clamp-2">
                      {conquista.descricao}
                    </p>
                    {desbloqueada && conquistaData && (
                      <p
                        className="mt-1.5 text-xs"
                        style={{ color: conquista.cor }}
                      >
                        {conquistaData.desbloqueada_em &&
                        !isNaN(new Date(conquistaData.desbloqueada_em).getTime())
                          ? new Date(conquistaData.desbloqueada_em).toLocaleDateString('pt-BR')
                          : '—'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historico de Eventos */}
      <div className="mt-6">
        <h3 className="font-display text-lg uppercase text-white mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-ufc-red" />
          Historico de Eventos
        </h3>
        <EventoHistorico username={username} />
      </div>
    </div>
  );
}
