'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useArenaAuth } from '@/hooks/useArenaAuth';

// ═══════════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════════

interface ChatMessage {
  id: string;
  liga_id: string;
  usuario_id: string;
  mensagem: string;
  created_at: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

interface LigaChatProps {
  ligaId: string;
}

// ═══════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════

export function LigaChat({ ligaId }: LigaChatProps) {
  const { usuario, isAuthenticated } = useArenaAuth();
  const [mensagens, setMensagens] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastMessageIdRef = useRef<string | null>(null);

  // ─── Scroll to bottom ───────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);

  // ─── Fetch messages ─────────────────────────────────────────
  const fetchMensagens = useCallback(async () => {
    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}/chat`);
      if (!res.ok) return;

      const data = await res.json();
      const novas: ChatMessage[] = data.mensagens ?? [];

      setMensagens((prev) => {
        // Only scroll if there are genuinely new messages
        const lastNew = novas[novas.length - 1];
        if (lastNew && lastNew.id !== lastMessageIdRef.current) {
          lastMessageIdRef.current = lastNew.id;
          // Scroll after paint
          setTimeout(scrollToBottom, 50);
        }
        return novas;
      });
      setError(null);
    } catch {
      // Silent poll failure — do not surface transient network errors
    } finally {
      setIsLoading(false);
    }
  }, [ligaId, scrollToBottom]);

  // ─── Initial fetch + polling ─────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    fetchMensagens();

    const startPolling = () => {
      intervalRef.current = setInterval(fetchMensagens, 10_000);
    };

    const stopPolling = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    startPolling();

    const handleVisibility = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        fetchMensagens();
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isAuthenticated, fetchMensagens]);

  // ─── Send message ────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const texto = input.trim();
    if (!texto || isSending || !usuario) return;

    // Optimistic message
    const optimisticId = `optimistic-${Date.now()}`;
    const optimisticMsg: ChatMessage = {
      id: optimisticId,
      liga_id: ligaId,
      usuario_id: usuario.id,
      mensagem: texto,
      created_at: new Date().toISOString(),
      username: usuario.username,
      display_name: usuario.display_name,
      avatar_url: usuario.avatar_url ?? null,
    };

    setMensagens((prev) => [...prev, optimisticMsg]);
    setInput('');
    setTimeout(scrollToBottom, 50);
    setIsSending(true);
    setError(null);

    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensagem: texto }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Revert optimistic insert and restore input
        setMensagens((prev) => prev.filter((m) => m.id !== optimisticId));
        setInput(texto);
        setError(data.error ?? 'Erro ao enviar mensagem');
        return;
      }

      // Replace optimistic with real message
      const real: ChatMessage = data.mensagem;
      setMensagens((prev) =>
        prev.map((m) => (m.id === optimisticId ? real : m))
      );
      lastMessageIdRef.current = real.id;
    } catch {
      setMensagens((prev) => prev.filter((m) => m.id !== optimisticId));
      setInput(texto);
      setError('Erro de conexao. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  }, [input, isSending, ligaId, usuario, scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ─── Render ──────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="neu-card p-4 text-center text-sm text-dark-textMuted">
        Faca login para participar do chat da liga.
      </div>
    );
  }

  return (
    <div className="neu-card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-dark-border px-4 py-3">
        <MessageCircle className="h-4 w-4 text-ufc-red" />
        <span className="font-display text-sm uppercase tracking-wide text-dark-text">
          Chat da Liga
        </span>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex flex-col gap-2 overflow-y-auto p-3"
        style={{ height: '20rem' }}
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-sm text-dark-textMuted">
            Carregando mensagens...
          </div>
        ) : mensagens.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-dark-textMuted">
            Seja o primeiro a mandar mensagem!
          </div>
        ) : (
          mensagens.map((msg) => {
            const isOwn = usuario?.id === msg.usuario_id;
            return (
              <div
                key={msg.id}
                className={`flex max-w-[80%] flex-col gap-0.5 ${
                  isOwn ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                {!isOwn && (
                  <span className="px-1 text-xs text-dark-textMuted">
                    {msg.display_name || msg.username}
                  </span>
                )}
                <div
                  className={`rounded-lg px-3 py-2 text-sm leading-snug ${
                    isOwn
                      ? 'bg-ufc-red/20 text-dark-text'
                      : 'bg-dark-bg/80 text-dark-text'
                  } ${msg.id.startsWith('optimistic-') ? 'opacity-60' : ''}`}
                >
                  {msg.mensagem}
                </div>
                <span className="px-1 text-[10px] text-dark-textMuted">
                  {new Date(msg.created_at).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="px-3 pb-1 text-xs text-red-400">{error}</div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-dark-border px-3 py-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escreva uma mensagem..."
          maxLength={500}
          disabled={isSending}
          className="neu-inset flex-1 rounded-lg px-3 py-2 text-sm text-dark-text placeholder-dark-textMuted focus:outline-none disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isSending}
          className="neu-button flex h-9 w-9 items-center justify-center rounded-lg text-ufc-red transition-opacity disabled:opacity-40"
          aria-label="Enviar mensagem"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
