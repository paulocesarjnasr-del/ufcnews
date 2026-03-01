'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Copy, Crown, MessageCircle, Send } from 'lucide-react';

import { useArenaAuth } from '@/hooks/useArenaAuth';
import { NIVEL_CONFIG } from '@/types/arena';

import type { Liga, LigaMembro } from '@/types/arena';

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

type MembroComUsuario = LigaMembro & {
  usuario_username: string;
  usuario_display_name: string | null;
  usuario_avatar: string | null;
  usuario_nivel: string;
};

interface LigaResponse {
  liga: LigaDetalhes;
  membros: MembroComUsuario[];
  is_membro: boolean;
  minha_posicao: number | null;
  pode_entrar: boolean;
}

export default function LigaPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { usuario, isAuthenticated } = useArenaAuth();
  const [liga, setLiga] = useState<LigaDetalhes | null>(null);
  const [membros, setMembros] = useState<MembroComUsuario[]>([]);
  const [isMembro, setIsMembro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

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
    } catch (err) {
      console.error('Erro ao carregar liga:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEntrar() {
    if (!isAuthenticated) {
      router.push('/arena/login');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
      const res = await fetch('/api/arena/ligas/entrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liga_id: id }),
      });

      const data = await res.json();

      if (res.ok) {
        fetchLiga();
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
      </div>
    );
  }

  if (!liga) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="font-display text-2xl text-white">Liga nao encontrada</h1>
        <Link href="/arena/ligas" className="mt-4 inline-block text-ufc-red hover:text-ufc-redLight">
          &larr; Voltar para Ligas
        </Link>
      </div>
    );
  }

  const sortedMembros = [...membros].sort(
    (a, b) => (a.posicao_atual || 999) - (b.posicao_atual || 999)
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="neu-card rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="font-display text-3xl uppercase text-white mb-2">
              {liga.nome}
            </h1>
            <p className="text-sm text-dark-textMuted">
              {liga.total_membros} membros
            </p>
          </div>

          {/* Invite code / Actions */}
          <div className="flex flex-col items-end gap-2">
            {isMembro && liga.codigo_convite && (
              <button
                onClick={copyCodigoConvite}
                className="neu-button flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors"
              >
                <Copy className="w-4 h-4 text-dark-textMuted" />
                <code className="font-mono text-ufc-gold tracking-wider">
                  {liga.codigo_convite}
                </code>
                {copied && (
                  <span className="text-xs text-green-400">Copiado!</span>
                )}
              </button>
            )}

            {!isMembro && liga.tipo === 'publica' && (
              <button
                onClick={handleEntrar}
                disabled={isJoining}
                className="neu-button rounded-lg bg-ufc-red px-6 py-2 text-sm font-medium text-white hover:bg-ufc-redLight transition-colors disabled:opacity-50"
              >
                {isJoining ? 'Entrando...' : 'Entrar na Liga'}
              </button>
            )}
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-400">{error}</p>
        )}
      </div>

      {/* Ranking */}
      <div className="neu-card rounded-xl overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-dark-border flex items-center gap-2">
          <Crown className="w-5 h-5 text-ufc-gold" />
          <h2 className="font-display text-lg uppercase text-white">
            Ranking
          </h2>
        </div>

        {sortedMembros.length === 0 ? (
          <div className="p-8 text-center text-dark-textMuted">
            Nenhum membro ainda
          </div>
        ) : (
          <div className="divide-y divide-dark-border/50">
            {sortedMembros.map((membro, index) => {
              const nivelConfig = NIVEL_CONFIG[membro.usuario_nivel as keyof typeof NIVEL_CONFIG];
              const isCurrentUser = membro.usuario_id === usuario?.id;

              // Medal for top 3
              let medal: string | null = null;
              if (index === 0) medal = 'text-yellow-400';
              else if (index === 1) medal = 'text-gray-300';
              else if (index === 2) medal = 'text-amber-600';

              return (
                <div
                  key={membro.id}
                  className={`flex items-center gap-4 px-5 py-3 ${
                    isCurrentUser ? 'bg-ufc-red/5' : ''
                  }`}
                >
                  {/* Position */}
                  <div className="w-8 text-center font-display text-lg">
                    {medal ? (
                      <Crown className={`w-5 h-5 mx-auto ${medal}`} />
                    ) : (
                      <span className="text-dark-textMuted">{index + 1}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-dark-border flex items-center justify-center flex-shrink-0">
                    {membro.usuario_avatar ? (
                      <Image
                        src={membro.usuario_avatar}
                        alt={membro.usuario_username}
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-dark-textMuted text-sm font-bold">
                        {membro.usuario_username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <span className={`font-medium truncate block ${
                      isCurrentUser ? 'text-ufc-red' : 'text-white'
                    }`}>
                      {membro.usuario_display_name || membro.usuario_username}
                    </span>
                    <span className="text-xs text-dark-textMuted flex items-center gap-1">
                      {nivelConfig?.icone} {membro.usuario_nivel}
                    </span>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="font-bold text-ufc-gold">{membro.pontos_temporada || 0}</p>
                    <p className="text-xs text-dark-textMuted">pts</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat placeholder */}
      <div className="neu-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-dark-textMuted" />
          <h2 className="font-display text-lg uppercase text-white">Chat</h2>
        </div>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Send className="w-8 h-8 text-dark-border mb-3" />
          <p className="text-dark-textMuted text-sm">Chat em breve</p>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-6 text-center">
        <Link href="/arena/ligas" className="text-sm text-dark-textMuted hover:text-ufc-red">
          &larr; Voltar para Ligas
        </Link>
      </div>
    </div>
  );
}
