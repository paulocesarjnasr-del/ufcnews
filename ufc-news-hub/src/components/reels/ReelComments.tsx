'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { useComentarios } from '@/hooks/useComentarios';
import { cn } from '@/lib/utils';
import { formatTimeAgo, getInitials } from '@/lib/utils';

interface ReelCommentsProps {
  noticiaId: string;
  isOpen: boolean;
  onClose: () => void;
}

function getStoredName(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem('reel_guest_nome') ?? '';
  } catch {
    return '';
  }
}

function storeName(nome: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('reel_guest_nome', nome);
  } catch {
    // ignore
  }
}

export function ReelComments({ noticiaId, isOpen, onClose }: ReelCommentsProps) {
  const { comentarios, total, isLoading, criarComentario, isSubmitting } =
    useComentarios(isOpen ? noticiaId : '');

  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 350);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || isSubmitting) return;

    setError(null);

    // Use stored name or "Anônimo"
    const nome = getStoredName() || 'Anônimo';

    const result = await criarComentario({
      noticia_id: noticiaId,
      autor_nome: nome,
      conteudo: trimmed,
    });

    if (result.success) {
      setText('');
      if (listRef.current) {
        requestAnimationFrame(() => {
          if (listRef.current) listRef.current.scrollTop = 0;
        });
      }
    } else {
      setError(result.error || 'Erro ao comentar');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const displayName = getStoredName() || 'Anônimo';

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 flex max-h-[75vh] animate-slide-from-bottom flex-col rounded-t-2xl bg-dark-card border-t border-dark-border">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-border px-4 py-3">
          <h3 className="font-display text-lg uppercase text-dark-text">
            Comentarios{total > 0 ? ` (${total})` : ''}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-dark-textMuted hover:bg-dark-border hover:text-dark-text transition-colors"
            aria-label="Fechar comentarios"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Comments list */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-dark-border border-t-ufc-red" />
            </div>
          ) : comentarios.length === 0 ? (
            <p className="py-8 text-center text-sm text-dark-textMuted">
              Seja o primeiro a comentar!
            </p>
          ) : (
            <div className="space-y-0.5">
              {comentarios.map((c) => {
                const initials = getInitials(c.autor_nome);
                return (
                  <div key={c.id} className="flex gap-3 py-2.5">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-dark-border">
                      <span className="text-xs font-bold text-dark-textMuted select-none">
                        {initials}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">
                        <span className="font-semibold text-dark-text">
                          {c.autor_nome}
                        </span>{' '}
                        <span className="text-dark-text/80">
                          {c.conteudo}
                        </span>
                      </p>
                      <span className="text-xs text-dark-textMuted">
                        {formatTimeAgo(c.created_at)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-1">
            <p className="text-xs text-ufc-red">{error}</p>
          </div>
        )}

        {/* Input bar */}
        <div className="border-t border-dark-border px-4 py-3 pb-safe">
          <div className="flex items-center gap-2">
            {/* Avatar */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-dark-border">
              <span className="text-xs font-bold text-dark-textMuted select-none">
                {getInitials(displayName)}
              </span>
            </div>
            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Adicione um comentario..."
              maxLength={500}
              className="flex-1 rounded-full bg-dark-bg px-4 py-2.5 text-sm text-dark-text placeholder:text-dark-textMuted/50 focus:outline-none focus:ring-1 focus:ring-ufc-red/30"
              disabled={isSubmitting}
            />
            {/* Send */}
            <button
              onClick={handleSend}
              disabled={!text.trim() || isSubmitting}
              className={cn(
                'rounded-full p-2.5 transition-all',
                text.trim()
                  ? 'bg-ufc-red text-white hover:bg-ufc-red/80'
                  : 'text-dark-textMuted'
              )}
              aria-label="Enviar comentario"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
