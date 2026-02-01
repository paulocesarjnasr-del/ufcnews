'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { NIVEL_CONFIG } from '@/types/arena';

interface ProximoEvento {
  id: string;
  nome: string;
  data_evento: string;
  tipo: string;
  total_lutas: number;
}

interface Liga {
  id: string;
  nome: string;
  posicao_atual: number;
  total_membros: number;
}

interface DueloPendente {
  id: string;
  desafiante: { username: string; display_name: string | null };
  evento: { nome: string };
}

interface Notificacao {
  id: string;
  tipo: string;
  titulo: string;
  mensagem: string | null;
  lida: boolean;
  created_at: string;
}

export default function ArenaDashboardPage() {
  const router = useRouter();
  const { usuario, isAuthenticated, isLoading: authLoading, logout } = useArenaAuth();
  const [proximoEvento, setProximoEvento] = useState<ProximoEvento | null>(null);
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [duelosPendentes, setDuelosPendentes] = useState<DueloPendente[]>([]);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/arena/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  async function fetchDashboardData() {
    try {
      const [eventoRes, ligasRes, duelosRes, notifRes] = await Promise.all([
        fetch('/api/eventos/proximo'),
        fetch('/api/arena/ligas'),
        fetch('/api/arena/duelos'),
        fetch('/api/arena/notificacoes?limit=5'),
      ]);

      if (eventoRes.ok) {
        const data = await eventoRes.json();
        setProximoEvento(data);
      }

      if (ligasRes.ok) {
        const data = await ligasRes.json();
        setLigas(data.ligas?.slice(0, 3) || []);
      }

      if (duelosRes.ok) {
        const data = await duelosRes.json();
        setDuelosPendentes(data.pendentes_recebidos || []);
      }

      if (notifRes.ok) {
        const data = await notifRes.json();
        setNotificacoes(data.notificacoes || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setIsLoading(false);
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

  if (!usuario) return null;

  const nivelConfig = NIVEL_CONFIG[usuario.nivel];
  const xpParaProximoNivel = nivelConfig?.xp_necessario || 0;
  const progressoXP = xpParaProximoNivel > 0
    ? Math.min((usuario.xp_total / xpParaProximoNivel) * 100, 100)
    : 100;

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl uppercase text-dark-text">
              Ola, <span className="text-ufc-red">{usuario.display_name || usuario.username}</span>!
            </h1>
            <p className="text-dark-textMuted">
              Bem-vindo a sua Arena
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-dark-textMuted hover:text-ufc-red transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Stats Card */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-2xl"
                      style={{ color: nivelConfig?.cor }}
                    >
                      {nivelConfig?.icone}
                    </span>
                    <span
                      className="font-display text-lg uppercase"
                      style={{ color: nivelConfig?.cor }}
                    >
                      {usuario.nivel.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-dark-textMuted">
                    {usuario.xp_total} / {xpParaProximoNivel} XP
                  </p>
                </div>
                <Link
                  href={`/arena/perfil/${usuario.username}`}
                  className="text-sm text-ufc-red hover:text-ufc-redLight"
                >
                  Ver perfil →
                </Link>
              </div>

              {/* XP Progress Bar */}
              <div className="h-2 rounded-full bg-dark-border overflow-hidden mb-6">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressoXP}%`,
                    backgroundColor: nivelConfig?.cor
                  }}
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded bg-dark-bg">
                  <p className="font-display text-2xl text-ufc-red">
                    {usuario.pontos_totais}
                  </p>
                  <p className="text-xs text-dark-textMuted">Pontos</p>
                </div>
                <div className="text-center p-3 rounded bg-dark-bg">
                  <p className="font-display text-2xl text-ufc-gold">
                    {usuario.previsoes_corretas}
                  </p>
                  <p className="text-xs text-dark-textMuted">Acertos</p>
                </div>
                <div className="text-center p-3 rounded bg-dark-bg">
                  <p className="font-display text-2xl text-green-400">
                    {usuario.streak_atual}
                  </p>
                  <p className="text-xs text-dark-textMuted">Sequencia</p>
                </div>
                <div className="text-center p-3 rounded bg-dark-bg">
                  <p className="font-display text-2xl text-blue-400">
                    {usuario.total_conquistas}
                  </p>
                  <p className="text-xs text-dark-textMuted">Conquistas</p>
                </div>
              </div>
            </div>

            {/* Proximo Evento */}
            {proximoEvento && (
              <div className="rounded-lg border border-ufc-red/50 bg-ufc-red/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl uppercase text-dark-text">
                    Proximo Evento
                  </h2>
                  <span className={`rounded px-2 py-1 text-xs font-bold uppercase ${
                    proximoEvento.tipo === 'PPV'
                      ? 'bg-ufc-red text-white'
                      : 'bg-dark-border text-dark-textMuted'
                  }`}>
                    {proximoEvento.tipo}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ufc-red mb-2">
                  {proximoEvento.nome}
                </h3>
                <p className="text-dark-textMuted mb-4">
                  {new Date(proximoEvento.data_evento).toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                  {' - '}
                  {proximoEvento.total_lutas} lutas
                </p>
                <Link
                  href={`/arena/evento/${proximoEvento.id}`}
                  className="inline-block rounded bg-ufc-red px-6 py-2 font-display uppercase text-white hover:bg-ufc-redLight transition-colors"
                >
                  Fazer Previsoes
                </Link>
              </div>
            )}

            {/* Ligas */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl uppercase text-dark-text">
                  Suas Ligas
                </h2>
                <Link
                  href="/arena/ligas"
                  className="text-sm text-ufc-red hover:text-ufc-redLight"
                >
                  Ver todas →
                </Link>
              </div>

              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 animate-pulse rounded bg-dark-border" />
                  ))}
                </div>
              ) : ligas.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-dark-textMuted mb-4">
                    Voce ainda nao participa de nenhuma liga
                  </p>
                  <Link
                    href="/arena/ligas"
                    className="inline-block rounded border border-ufc-red px-4 py-2 text-sm text-ufc-red hover:bg-ufc-red hover:text-white transition-colors"
                  >
                    Explorar Ligas
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {ligas.map((liga) => (
                    <Link
                      key={liga.id}
                      href={`/arena/ligas/${liga.id}`}
                      className="flex items-center justify-between p-3 rounded bg-dark-bg hover:bg-dark-border transition-colors"
                    >
                      <div>
                        <p className="font-medium text-dark-text">{liga.nome}</p>
                        <p className="text-xs text-dark-textMuted">
                          {liga.total_membros} membros
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-xl text-ufc-gold">
                          #{liga.posicao_atual}
                        </p>
                        <p className="text-xs text-dark-textMuted">posicao</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Duelos Pendentes */}
            {duelosPendentes.length > 0 && (
              <div className="rounded-lg border border-ufc-gold/50 bg-ufc-gold/5 p-4">
                <h3 className="font-display text-lg uppercase text-ufc-gold mb-3">
                  Desafios Pendentes
                </h3>
                <div className="space-y-2">
                  {duelosPendentes.map((duelo) => (
                    <Link
                      key={duelo.id}
                      href={`/arena/duelos/${duelo.id}`}
                      className="block p-3 rounded bg-dark-card hover:bg-dark-border transition-colors"
                    >
                      <p className="font-medium text-dark-text">
                        {duelo.desafiante.display_name || duelo.desafiante.username}
                      </p>
                      <p className="text-xs text-dark-textMuted">
                        {duelo.evento.nome}
                      </p>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/arena/duelos"
                  className="block mt-3 text-center text-sm text-ufc-gold hover:text-ufc-gold/80"
                >
                  Ver todos →
                </Link>
              </div>
            )}

            {/* Quick Actions */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-4">
              <h3 className="font-display text-lg uppercase text-dark-text mb-4">
                Acoes Rapidas
              </h3>
              <div className="space-y-2">
                <Link
                  href="/arena/ligas/criar"
                  className="flex items-center gap-2 p-3 rounded bg-dark-bg hover:bg-dark-border transition-colors"
                >
                  <span className="text-ufc-gold">+</span>
                  <span className="text-dark-text">Criar Liga</span>
                </Link>
                <Link
                  href="/arena/amigos"
                  className="flex items-center gap-2 p-3 rounded bg-dark-bg hover:bg-dark-border transition-colors"
                >
                  <span className="text-blue-400">👥</span>
                  <span className="text-dark-text">Gerenciar Amigos</span>
                </Link>
                <Link
                  href="/arena/conquistas"
                  className="flex items-center gap-2 p-3 rounded bg-dark-bg hover:bg-dark-border transition-colors"
                >
                  <span className="text-purple-400">🏆</span>
                  <span className="text-dark-text">Ver Conquistas</span>
                </Link>
              </div>
            </div>

            {/* Notificacoes */}
            <div className="rounded-lg border border-dark-border bg-dark-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg uppercase text-dark-text">
                  Notificacoes
                </h3>
                {notificacoes.filter(n => !n.lida).length > 0 && (
                  <span className="rounded-full bg-ufc-red px-2 py-0.5 text-xs text-white">
                    {notificacoes.filter(n => !n.lida).length}
                  </span>
                )}
              </div>

              {notificacoes.length === 0 ? (
                <p className="text-sm text-dark-textMuted text-center py-4">
                  Nenhuma notificacao
                </p>
              ) : (
                <div className="space-y-2">
                  {notificacoes.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2 rounded text-sm ${
                        notif.lida ? 'bg-dark-bg' : 'bg-ufc-red/10 border-l-2 border-ufc-red'
                      }`}
                    >
                      <p className="font-medium text-dark-text">{notif.titulo}</p>
                      {notif.mensagem && (
                        <p className="text-xs text-dark-textMuted">{notif.mensagem}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
