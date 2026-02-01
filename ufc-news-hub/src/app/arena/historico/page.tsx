'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArenaMenu } from '@/components/arena/ArenaMenu';
import { UserAvatar } from '@/components/arena/UserAvatar';
import { useArenaAuth } from '@/hooks/useArenaAuth';

interface PrevisaoHistorico {
  id: string;
  luta_id: string;
  evento_id: string;
  evento_nome: string;
  evento_data: string;
  lutador1_nome: string;
  lutador1_foto: string | null;
  lutador2_nome: string;
  lutador2_foto: string | null;
  categoria_peso: string;
  vencedor_previsto_nome: string;
  metodo_previsto: string | null;
  round_previsto: number | null;
  acertou_vencedor: boolean | null;
  acertou_metodo: boolean | null;
  acertou_round: boolean | null;
  pontos_ganhos: number;
  created_at: string;
}

interface HistoricoStats {
  total_previsoes: number;
  total_acertos: number;
  taxa_acerto: number;
  pontos_totais: number;
  melhor_evento: string | null;
  melhor_evento_pontos: number;
}

export default function HistoricoPage() {
  const router = useRouter();
  const { usuario, isAuthenticated, isLoading: authLoading, logout } = useArenaAuth();
  const [previsoes, setPrevisoes] = useState<PrevisaoHistorico[]>([]);
  const [stats, setStats] = useState<HistoricoStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todas' | 'acertos' | 'erros'>('todas');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/arena/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchHistorico();
    }
  }, [isAuthenticated]);

  async function fetchHistorico() {
    try {
      const res = await fetch('/api/arena/previsoes?historico=true');
      if (res.ok) {
        const data = await res.json();
        setPrevisoes(data.previsoes || []);
        setStats(data.stats || null);
      }
    } catch (error) {
      console.error('Erro ao carregar historico:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredPrevisoes = previsoes.filter((p) => {
    if (filtro === 'acertos') return p.acertou_vencedor === true;
    if (filtro === 'erros') return p.acertou_vencedor === false;
    return true;
  });

  // Agrupar por evento
  const groupedByEvento = filteredPrevisoes.reduce((acc, p) => {
    if (!acc[p.evento_id]) {
      acc[p.evento_id] = {
        evento_nome: p.evento_nome,
        evento_data: p.evento_data,
        previsoes: [],
      };
    }
    acc[p.evento_id].previsoes.push(p);
    return acc;
  }, {} as Record<string, { evento_nome: string; evento_data: string; previsoes: PrevisaoHistorico[] }>);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <ArenaMenu isLoggedIn={isAuthenticated} />
            <Link href="/arena" className="font-display text-xl uppercase tracking-wider">
              <span className="text-white">Arena</span>
              <span className="text-ufc-red ml-1">UFC</span>
            </Link>
            <UserAvatar usuario={usuario} onLogout={logout} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl uppercase text-white">
            Meu Historico
          </h1>
          <p className="text-dark-textMuted mt-2">
            Veja todas as suas previsoes passadas
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{stats.total_previsoes}</p>
              <p className="text-xs text-dark-textMuted">Total Previsoes</p>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-400">{stats.total_acertos}</p>
              <p className="text-xs text-dark-textMuted">Acertos</p>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-ufc-gold">{Number(stats.taxa_acerto).toFixed(0)}%</p>
              <p className="text-xs text-dark-textMuted">Taxa de Acerto</p>
            </div>
            <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-ufc-red">{stats.pontos_totais}</p>
              <p className="text-xs text-dark-textMuted">Pontos Totais</p>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFiltro('todas')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtro === 'todas'
                ? 'bg-ufc-red text-white'
                : 'bg-dark-card border border-dark-border text-dark-textMuted hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro('acertos')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtro === 'acertos'
                ? 'bg-green-500 text-white'
                : 'bg-dark-card border border-dark-border text-dark-textMuted hover:text-white'
            }`}
          >
            Acertos
          </button>
          <button
            onClick={() => setFiltro('erros')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtro === 'erros'
                ? 'bg-red-500 text-white'
                : 'bg-dark-card border border-dark-border text-dark-textMuted hover:text-white'
            }`}
          >
            Erros
          </button>
        </div>

        {/* Lista de previsoes */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ufc-red" />
          </div>
        ) : Object.keys(groupedByEvento).length === 0 ? (
          <div className="text-center py-12 bg-dark-card border border-dark-border rounded-xl">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-dark-textMuted">
              {filtro === 'todas'
                ? 'Voce ainda nao fez nenhuma previsao'
                : filtro === 'acertos'
                ? 'Nenhum acerto encontrado'
                : 'Nenhum erro encontrado'}
            </p>
            {filtro === 'todas' && (
              <Link
                href="/arena"
                className="inline-block mt-4 px-6 py-2 bg-ufc-red hover:bg-ufc-redLight text-white rounded-lg transition-colors"
              >
                Fazer primeira previsao
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByEvento).map(([eventoId, grupo]) => (
              <div key={eventoId} className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
                {/* Header do evento */}
                <div className="px-4 py-3 bg-dark-bg border-b border-dark-border">
                  <p className="font-display text-lg uppercase text-white">{grupo.evento_nome}</p>
                  <p className="text-xs text-dark-textMuted">
                    {new Date(grupo.evento_data).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Previsoes do evento */}
                <div className="divide-y divide-dark-border">
                  {grupo.previsoes.map((p) => (
                    <div key={p.id} className="p-4 flex items-center gap-4">
                      {/* Fighters */}
                      <div className="flex-1 flex items-center gap-3">
                        {/* Fighter 1 */}
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-border">
                            {p.lutador1_foto ? (
                              <Image
                                src={p.lutador1_foto}
                                alt={p.lutador1_nome}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-dark-textMuted text-xs">
                                ?
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-white hidden sm:inline">
                            {p.lutador1_nome.split(' ').pop()}
                          </span>
                        </div>

                        <span className="text-dark-textMuted text-xs">vs</span>

                        {/* Fighter 2 */}
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-border">
                            {p.lutador2_foto ? (
                              <Image
                                src={p.lutador2_foto}
                                alt={p.lutador2_nome}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-dark-textMuted text-xs">
                                ?
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-white hidden sm:inline">
                            {p.lutador2_nome.split(' ').pop()}
                          </span>
                        </div>
                      </div>

                      {/* Previsao */}
                      <div className="text-right">
                        <p className="text-sm text-white font-medium">
                          {p.vencedor_previsto_nome.split(' ').pop()}
                        </p>
                        {p.metodo_previsto && (
                          <p className="text-xs text-dark-textMuted">
                            {p.metodo_previsto}
                            {p.round_previsto && ` R${p.round_previsto}`}
                          </p>
                        )}
                      </div>

                      {/* Resultado */}
                      <div className="w-20 text-right">
                        {p.acertou_vencedor === null ? (
                          <span className="text-xs text-dark-textMuted">Pendente</span>
                        ) : p.acertou_vencedor ? (
                          <div>
                            <span className="text-green-400 text-sm font-bold">+{p.pontos_ganhos}</span>
                            <div className="flex gap-0.5 justify-end mt-1">
                              <span className="w-2 h-2 rounded-full bg-green-400" title="Vencedor" />
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  p.acertou_metodo ? 'bg-green-400' : 'bg-dark-border'
                                }`}
                                title="Metodo"
                              />
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  p.acertou_round ? 'bg-green-400' : 'bg-dark-border'
                                }`}
                                title="Round"
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-red-400 text-sm">Errou</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
