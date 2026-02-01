'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArenaMenu } from '@/components/arena/ArenaMenu';
import { UserAvatar } from '@/components/arena/UserAvatar';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { Liga, LigaMembro, NIVEL_CONFIG } from '@/types/arena';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface LigaDetalhes extends Liga {
  criador: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
  campeao: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface LigaResponse {
  liga: LigaDetalhes;
  membros: (LigaMembro & {
    usuario_username: string;
    usuario_display_name: string | null;
    usuario_avatar: string | null;
    usuario_nivel: string;
    usuario: {
      id: string;
      username: string;
      display_name: string | null;
      avatar_url: string | null;
      nivel: string;
    };
  })[];
  is_membro: boolean;
  minha_posicao: number | null;
  pode_entrar: boolean;
}

type MembroComUsuario = LigaMembro & {
  usuario_username: string;
  usuario_display_name: string | null;
  usuario_avatar: string | null;
  usuario_nivel: string;
};

export default function LigaPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { usuario, isAuthenticated, isLoading: authLoading, logout } = useArenaAuth();
  const [liga, setLiga] = useState<LigaDetalhes | null>(null);
  const [membros, setMembros] = useState<MembroComUsuario[]>([]);
  const [isMembro, setIsMembro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [codigoConvite, setCodigoConvite] = useState('');
  const [showCodigo, setShowCodigo] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Estados do modal de convite
  const [showConviteModal, setShowConviteModal] = useState(false);
  const [buscaUsuario, setBuscaUsuario] = useState('');
  const [usuariosEncontrados, setUsuariosEncontrados] = useState<{
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
    nivel: string;
  }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSendingConvite, setIsSendingConvite] = useState(false);
  const [conviteMessage, setConviteMessage] = useState('');

  useEffect(() => {
    fetchLiga();
  }, [id]);

  async function fetchLiga() {
    try {
      const res = await fetch(`/api/arena/ligas/${id}`);
      if (res.ok) {
        const data: LigaResponse = await res.json();
        setLiga(data.liga);
        setMembros(data.membros || []);
        setIsMembro(data.is_membro || false);
      } else if (res.status === 404) {
        router.push('/arena/ligas');
      }
    } catch (error) {
      console.error('Erro ao carregar liga:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEntrar() {
    if (!isAuthenticated) {
      router.push('/arena/login');
      return;
    }

    if (liga?.tipo === 'privada' && !codigoConvite) {
      setShowCodigo(true);
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const res = await fetch('/api/arena/ligas/entrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          liga_id: id,
          codigo_convite: codigoConvite || undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        fetchLiga(); // Recarregar dados
        setShowCodigo(false);
        setCodigoConvite('');
      } else {
        setError(data.error || 'Erro ao entrar na liga');
      }
    } catch {
      setError('Erro de conexao');
    } finally {
      setIsJoining(false);
    }
  }

  function copyCodigoConvite() {
    if (liga?.codigo_convite) {
      navigator.clipboard.writeText(liga.codigo_convite);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Buscar usuarios para convidar
  async function buscarUsuarios(termo: string) {
    if (termo.length < 2) {
      setUsuariosEncontrados([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`/api/arena/ligas/${id}/convidar?q=${encodeURIComponent(termo)}`);
      if (res.ok) {
        const data = await res.json();
        setUsuariosEncontrados(data.usuarios || []);
      }
    } catch (error) {
      console.error('Erro ao buscar usuarios:', error);
    } finally {
      setIsSearching(false);
    }
  }

  // Enviar convite
  async function enviarConvite(username: string) {
    setIsSendingConvite(true);
    setConviteMessage('');

    try {
      const res = await fetch(`/api/arena/ligas/${id}/convidar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        setConviteMessage(data.message || 'Convite enviado com sucesso!');
        // Remover usuario da lista
        setUsuariosEncontrados(prev => prev.filter(u => u.username !== username));
        setBuscaUsuario('');
      } else {
        setConviteMessage(data.error || 'Erro ao enviar convite');
      }
    } catch {
      setConviteMessage('Erro de conexao');
    } finally {
      setIsSendingConvite(false);
    }
  }

  // Debounce para busca
  useEffect(() => {
    const timer = setTimeout(() => {
      if (buscaUsuario.length >= 2) {
        buscarUsuarios(buscaUsuario);
      } else {
        setUsuariosEncontrados([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [buscaUsuario]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border/50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <ArenaMenu isLoggedIn={isAuthenticated} />
              <Link href="/arena" className="font-display text-xl uppercase tracking-wider">
                <span className="text-white">Arena</span>
                <span className="text-ufc-red ml-1">UFC</span>
              </Link>
              {!authLoading && <UserAvatar usuario={usuario} onLogout={logout} />}
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
        </div>
      </div>
    );
  }

  if (!liga) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border/50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <ArenaMenu isLoggedIn={isAuthenticated} />
              <Link href="/arena" className="font-display text-xl uppercase tracking-wider">
                <span className="text-white">Arena</span>
                <span className="text-ufc-red ml-1">UFC</span>
              </Link>
              {!authLoading && <UserAvatar usuario={usuario} onLogout={logout} />}
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="font-display text-2xl text-white">Liga nao encontrada</h1>
          <Link href="/arena/ligas" className="mt-4 inline-block text-ufc-red hover:text-ufc-redLight">
            ← Voltar para Ligas
          </Link>
        </div>
      </div>
    );
  }

  const isAdmin = isMembro && membros.find(m => m.usuario_id === usuario?.id)?.is_admin;

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
            {!authLoading && <UserAvatar usuario={usuario} onLogout={logout} />}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-dark-textMuted mb-6">
          <Link href="/arena" className="hover:text-white">Arena</Link>
          <span>/</span>
          <Link href="/arena/ligas" className="hover:text-white">Ligas</Link>
          <span>/</span>
          <span className="text-white">{liga.nome}</span>
        </div>

        {/* Liga Header */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  liga.tipo === 'publica'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  {liga.tipo === 'publica' ? '🌍 Publica' : '🔒 Privada'}
                </span>
                <span className="text-xs text-dark-textMuted">
                  Temporada {liga.temporada_atual}
                </span>
              </div>

              <h1 className="font-display text-3xl uppercase text-white mb-2">
                {liga.nome}
              </h1>

              {liga.descricao && (
                <p className="text-dark-textMuted mb-4">{liga.descricao}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-dark-textMuted">
                  <span className="text-white font-medium">{liga.total_membros}</span>
                  {liga.max_membros > 0 ? ` / ${liga.max_membros}` : ''} membros
                  {liga.max_membros === 0 && <span className="text-xs text-green-400 ml-1">(Ilimitado)</span>}
                </span>
                <span className="text-dark-textMuted">
                  Criada por <span className="text-ufc-gold">{liga.criador?.username}</span>
                </span>
              </div>
            </div>

            {/* Acoes */}
            <div className="flex flex-col gap-2">
              {!isMembro ? (
                <>
                  {showCodigo ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={codigoConvite}
                        onChange={(e) => setCodigoConvite(e.target.value)}
                        placeholder="Codigo de convite"
                        className="px-3 py-2 bg-dark-bg border border-dark-border rounded text-white text-sm focus:outline-none focus:border-ufc-gold"
                      />
                      <button
                        onClick={handleEntrar}
                        disabled={isJoining || !codigoConvite}
                        className="px-4 py-2 bg-ufc-gold text-dark-bg font-medium rounded hover:bg-ufc-gold/90 disabled:opacity-50 text-sm"
                      >
                        {isJoining ? 'Entrando...' : 'Confirmar'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEntrar}
                      disabled={isJoining}
                      className="px-6 py-2 bg-ufc-red text-white font-medium rounded hover:bg-ufc-redLight disabled:opacity-50"
                    >
                      {isJoining ? 'Entrando...' : 'Entrar na Liga'}
                    </button>
                  )}
                </>
              ) : (
                <div className="flex flex-col gap-2 items-end">
                  {isAdmin && (
                    <span className="text-xs text-ufc-gold">Voce e admin</span>
                  )}
                  {!isAdmin && (
                    <span className="text-xs text-green-400">Voce e membro</span>
                  )}

                  {/* Botao de convidar */}
                  <button
                    onClick={() => setShowConviteModal(true)}
                    className="px-4 py-2 bg-ufc-gold text-dark-bg font-medium text-sm rounded hover:bg-ufc-gold/90 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Convidar
                  </button>

                  {/* Copiar codigo (apenas para ligas privadas) */}
                  {liga.tipo === 'privada' && liga.codigo_convite && (
                    <button
                      onClick={copyCodigoConvite}
                      className="px-4 py-2 bg-dark-border text-white text-sm rounded hover:bg-dark-border/80 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      {copied ? 'Copiado!' : 'Copiar codigo'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Campeao */}
        {liga.campeao && (
          <div className="bg-gradient-to-r from-ufc-gold/20 to-transparent border border-ufc-gold/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl">👑</span>
              <div>
                <p className="text-ufc-gold text-sm font-medium">Campeao da Liga</p>
                <p className="text-white font-bold">{liga.campeao.username}</p>
                {liga.defesas_titulo > 0 && (
                  <p className="text-xs text-dark-textMuted">{liga.defesas_titulo} defesas de titulo</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Ranking de Membros */}
        <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-dark-border">
            <h2 className="font-display text-lg uppercase text-white">
              Ranking da Temporada
            </h2>
          </div>

          {membros.length === 0 ? (
            <div className="p-8 text-center text-dark-textMuted">
              Nenhum membro ainda
            </div>
          ) : (
            <div className="divide-y divide-dark-border">
              {membros
                .sort((a, b) => (a.posicao_atual || 999) - (b.posicao_atual || 999))
                .map((membro, index) => {
                  const nivelConfig = NIVEL_CONFIG[membro.usuario_nivel as keyof typeof NIVEL_CONFIG];
                  const isCurrentUser = membro.usuario_id === usuario?.id;

                  return (
                    <div
                      key={membro.id}
                      className={`flex items-center gap-4 p-4 ${isCurrentUser ? 'bg-ufc-red/5' : ''}`}
                    >
                      {/* Posicao */}
                      <div className="w-8 text-center">
                        {index === 0 ? (
                          <span className="text-xl">🥇</span>
                        ) : index === 1 ? (
                          <span className="text-xl">🥈</span>
                        ) : index === 2 ? (
                          <span className="text-xl">🥉</span>
                        ) : (
                          <span className="text-dark-textMuted font-bold">{index + 1}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-border flex items-center justify-center">
                        {membro.usuario_avatar ? (
                          <Image
                            src={membro.usuario_avatar}
                            alt={membro.usuario_username}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-dark-textMuted font-bold">
                            {membro.usuario_username.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${isCurrentUser ? 'text-ufc-red' : 'text-white'}`}>
                            {membro.usuario_username}
                          </span>
                          {membro.is_admin && (
                            <span className="text-xs text-ufc-gold">Admin</span>
                          )}
                          {liga.campeao && membro.usuario_id === liga.campeao.id && (
                            <span className="text-xs">👑</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                          <span>{nivelConfig?.icone}</span>
                          <span className="capitalize">{membro.usuario_nivel}</span>
                        </div>
                      </div>

                      {/* Pontos */}
                      <div className="text-right">
                        <p className="font-bold text-ufc-gold">{membro.pontos_temporada || 0}</p>
                        <p className="text-xs text-dark-textMuted">pontos</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </main>

      {/* Modal de Convite */}
      {showConviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md bg-dark-card border border-dark-border rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-dark-border flex items-center justify-between">
              <h3 className="font-display text-lg uppercase text-white">
                Convidar para Liga
              </h3>
              <button
                onClick={() => {
                  setShowConviteModal(false);
                  setBuscaUsuario('');
                  setUsuariosEncontrados([]);
                  setConviteMessage('');
                }}
                className="text-dark-textMuted hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Busca */}
              <div className="relative mb-4">
                <input
                  type="text"
                  value={buscaUsuario}
                  onChange={(e) => setBuscaUsuario(e.target.value)}
                  placeholder="Buscar por username..."
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-dark-textMuted focus:outline-none focus:border-ufc-gold"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-ufc-gold" />
                  </div>
                )}
              </div>

              {/* Mensagem de feedback */}
              {conviteMessage && (
                <div className={`mb-4 p-3 rounded text-sm ${
                  conviteMessage.includes('sucesso') || conviteMessage.includes('enviado')
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {conviteMessage}
                </div>
              )}

              {/* Lista de usuarios */}
              {usuariosEncontrados.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {usuariosEncontrados.map((user) => {
                    const nivelConfig = NIVEL_CONFIG[user.nivel as keyof typeof NIVEL_CONFIG];
                    return (
                      <div
                        key={user.id}
                        className="flex items-center gap-3 p-3 bg-dark-bg rounded-lg"
                      >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-border flex items-center justify-center flex-shrink-0">
                          {user.avatar_url ? (
                            <Image
                              src={user.avatar_url}
                              alt={user.username}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-dark-textMuted font-bold">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">
                            {user.display_name || user.username}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-dark-textMuted">
                            <span>@{user.username}</span>
                            <span>{nivelConfig?.icone}</span>
                          </div>
                        </div>

                        {/* Botao convidar */}
                        <button
                          onClick={() => enviarConvite(user.username)}
                          disabled={isSendingConvite}
                          className="px-3 py-1.5 bg-ufc-gold text-dark-bg text-sm font-medium rounded hover:bg-ufc-gold/90 disabled:opacity-50 flex-shrink-0"
                        >
                          {isSendingConvite ? '...' : 'Convidar'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : buscaUsuario.length >= 2 && !isSearching ? (
                <div className="text-center py-8 text-dark-textMuted">
                  Nenhum usuario encontrado
                </div>
              ) : (
                <div className="text-center py-8 text-dark-textMuted">
                  Digite pelo menos 2 caracteres para buscar
                </div>
              )}

              {/* Ou compartilhar codigo */}
              {liga?.tipo === 'privada' && liga?.codigo_convite && (
                <div className="mt-4 pt-4 border-t border-dark-border">
                  <p className="text-xs text-dark-textMuted mb-2">Ou compartilhe o codigo de convite:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-dark-bg rounded font-mono text-ufc-gold text-center">
                      {liga.codigo_convite}
                    </code>
                    <button
                      onClick={copyCodigoConvite}
                      className="px-3 py-2 bg-dark-border text-white text-sm rounded hover:bg-dark-border/80"
                    >
                      {copied ? '✓' : 'Copiar'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
