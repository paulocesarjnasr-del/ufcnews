'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Crown } from 'lucide-react';

import { useArenaAuth } from '@/hooks/useArenaAuth';
import { LigaChat } from '@/components/arena/LigaChat';
import { LigaHeader } from '@/components/arena/LigaHeader';
import { PicksPressure } from '@/components/arena/PicksPressure';
import { MembroCard } from '@/components/arena/MembroCard';
import { SairLigaModal } from '@/components/arena/SairLigaModal';
import { GerenciarLigaModal } from '@/components/arena/GerenciarLigaModal';
import type { Liga, MembroLiga, EventoAtualLiga } from '@/types/arena';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

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
  membros: MembroLiga[];
  is_membro: boolean;
  minha_posicao: number | null;
  pode_entrar: boolean;
  evento_atual: EventoAtualLiga | null;
  ultimo_evento: { nome: string; data: string } | null;
}

// ═══════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════

export default function LigaPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { usuario, isAuthenticated } = useArenaAuth();

  const [liga, setLiga] = useState<LigaDetalhes | null>(null);
  const [membros, setMembros] = useState<MembroLiga[]>([]);
  const [isMembro, setIsMembro] = useState(false);
  const [eventoAtual, setEventoAtual] = useState<EventoAtualLiga | null>(null);
  const [ultimoEvento, setUltimoEvento] = useState<{ nome: string; data: string } | null>(null);
  const [showSairModal, setShowSairModal] = useState(false);
  const [showGerenciarModal, setShowGerenciarModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  // ── Fetch ──

  const fetchLiga = useCallback(async () => {
    try {
      const res = await fetch(`/api/arena/ligas/${id}`);
      if (res.ok) {
        const data: LigaResponse = await res.json();
        setLiga(data.liga);
        setMembros(data.membros || []);
        setIsMembro(data.is_membro || false);
        setEventoAtual(data.evento_atual ?? null);
        setUltimoEvento(data.ultimo_evento ?? null);
      } else if (res.status === 404) {
        router.push('/arena/ligas');
      }
    } catch (err) {
      console.error('Erro ao carregar liga:', err);
    } finally {
      setIsLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    fetchLiga();
    // Refresh member status every 30s
    const interval = setInterval(fetchLiga, 30_000);
    return () => clearInterval(interval);
  }, [fetchLiga]);

  // ── Actions ──

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

      const data = await res.json() as { error?: string };

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

  function handleBannerUpdate(url: string | null) {
    setLiga((prev) => prev ? { ...prev, imagem_url: url } : prev);
  }

  function handleLigaUpdate(fields: Partial<Liga>) {
    setLiga((prev) => prev ? { ...prev, ...fields } as LigaDetalhes : prev);
  }

  function handleMembroExpulso(userId: string) {
    setMembros((prev) => prev.filter((m) => m.id !== userId));
    setLiga((prev) => prev ? { ...prev, total_membros: Math.max((prev.total_membros || 1) - 1, 0) } : prev);
  }

  // ── Derived state ──

  const isAdmin = membros.some((m) => m.id === usuario?.id && m.is_admin);

  // Sort by event points if available, otherwise by season points
  const hasEventoData = membros.some(m => m.evento_pontos !== undefined);
  const sortedMembros = [...membros].sort((a, b) => {
    if (hasEventoData) {
      return (b.evento_pontos ?? -1) - (a.evento_pontos ?? -1);
    }
    return (a.posicao_atual || 999) - (b.posicao_atual || 999);
  });

  const showPicksDetail = liga?.mostrar_picks_antes ?? false;

  // ── Loading / Not found ──

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

  // ── Render ──

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">

      {/* ── Liga Header ── */}
      <div className="mb-6">
        <LigaHeader
          liga={liga}
          isAdmin={isAdmin}
          isMembro={isMembro}
          onSairClick={() => setShowSairModal(true)}
          onGerenciarClick={() => setShowGerenciarModal(true)}
        />
      </div>

      {/* ── Join button (non-members, public leagues) ── */}
      {!isMembro && liga.tipo === 'publica' && (
        <div className="neu-card rounded-xl p-4 mb-6">
          {error && (
            <p className="text-sm text-red-400 mb-3">{error}</p>
          )}
          <button
            onClick={handleEntrar}
            disabled={isJoining}
            className="neu-button w-full rounded-lg bg-ufc-red px-6 py-2.5 text-sm font-medium text-white hover:bg-ufc-redLight transition-colors disabled:opacity-50"
          >
            {isJoining ? 'Entrando...' : 'Entrar na Liga'}
          </button>
        </div>
      )}

      {/* ── Picks Pressure (members only, when there is an active event) ── */}
      {eventoAtual && isMembro && (
        <PicksPressure
          eventoAtual={eventoAtual}
          membros={membros}
          mostrarNomesPendentes={true}
        />
      )}

      {/* ── Member list ── */}
      <div className="neu-card rounded-xl overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-dark-border flex items-center gap-2">
          <Crown className="w-5 h-5 text-ufc-gold" />
          <h2 className="font-display text-lg uppercase text-white">
            {ultimoEvento ? 'Ranking' : 'Membros'}
          </h2>
          {ultimoEvento && (
            <span className="text-xs text-dark-textMuted ml-auto">
              {ultimoEvento.nome}
            </span>
          )}
        </div>

        {sortedMembros.length === 0 ? (
          <div className="p-8 text-center text-dark-textMuted">
            Nenhum membro ainda
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {sortedMembros.map((membro, index) => (
              <MembroCard
                key={membro.id}
                membro={membro}
                isCurrentUser={membro.id === usuario?.id}
                showPicksDetail={showPicksDetail}
                posicao={index + 1}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Evento Ranking — desativado ate ter ranking ao vivo ── */}

      {/* ── Chat (members only) ── */}
      {isMembro && <LigaChat ligaId={id} />}

      {/* ── Back link ── */}
      <div className="mt-6 text-center">
        <Link href="/arena/ligas" className="text-sm text-dark-textMuted hover:text-ufc-red">
          &larr; Voltar para Ligas
        </Link>
      </div>

      {/* ── Sair Modal ── */}
      <SairLigaModal
        ligaId={id}
        ligaNome={liga.nome}
        isOpen={showSairModal}
        onClose={() => setShowSairModal(false)}
      />

      {isAdmin && (
        <GerenciarLigaModal
          liga={liga}
          membros={membros}
          isOpen={showGerenciarModal}
          onClose={() => setShowGerenciarModal(false)}
          onBannerUpdate={handleBannerUpdate}
          onLigaUpdate={handleLigaUpdate}
          onMembroExpulso={handleMembroExpulso}
        />
      )}
    </div>
  );
}
