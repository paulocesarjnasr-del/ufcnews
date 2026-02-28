'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { formatTimeAgo, getInitials } from '@/lib/utils';
import type { ComentarioEnquete } from '@/types/enquete';

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════

interface EnqueteComentariosProps {
  enqueteId: string;
  comentarios: ComentarioEnquete[];
  totalComentarios: number;
  onComentar: (conteudo: string, guestNome?: string) => Promise<{ success: boolean; error?: string }>;
  usuarioLogado: {
    id: string;
    displayName: string;
    avatarUrl?: string | null;
  } | null;
}

const MAX_CHARS = 500;

// ═══════════════════════════════════════════════════════
// Guest name persistence
// ═══════════════════════════════════════════════════════

function getStoredGuestName(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem('enquete_guest_nome') ?? '';
  } catch {
    return '';
  }
}

function storeGuestName(nome: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('enquete_guest_nome', nome);
  } catch {
    // Ignore storage errors
  }
}

// ═══════════════════════════════════════════════════════
// ComentarioItem
// ═══════════════════════════════════════════════════════

function ComentarioItem({ comentario }: { comentario: ComentarioEnquete }) {
  const initials = getInitials(comentario.autor_nome);

  return (
    <div className="flex gap-3 py-3">
      {/* Avatar */}
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-dark-border">
        {comentario.autor_avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={comentario.autor_avatar}
            alt={comentario.autor_nome}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-bold text-dark-textMuted select-none">
            {initials}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-dark-text">
            {comentario.autor_nome}
          </span>
          <span className="text-xs text-dark-textMuted">
            {formatTimeAgo(comentario.created_at)}
          </span>
        </div>
        <p className="mt-1 whitespace-pre-wrap text-sm text-dark-text/90">
          {comentario.conteudo}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════

export function EnqueteComentarios({
  comentarios,
  totalComentarios,
  onComentar,
  usuarioLogado,
}: EnqueteComentariosProps) {
  const [conteudo, setConteudo] = useState('');
  const [guestNome, setGuestNome] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Load stored guest name on mount
  useEffect(() => {
    if (!usuarioLogado) {
      setGuestNome(getStoredGuestName());
    }
  }, [usuarioLogado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = conteudo.trim();
    if (!trimmed) return;
    if (trimmed.length > MAX_CHARS) return;

    if (!usuarioLogado && !guestNome.trim()) {
      setError('Digite seu nome para comentar');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const guestName = !usuarioLogado ? guestNome.trim() : undefined;
    if (guestName) {
      storeGuestName(guestName);
    }

    const result = await onComentar(trimmed, guestName);

    if (result.success) {
      setConteudo('');
      // Scroll to bottom of comments
      if (listRef.current) {
        requestAnimationFrame(() => {
          if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
          }
        });
      }
    } else {
      setError(result.error ?? 'Erro ao comentar');
    }

    setIsSubmitting(false);
  };

  const charsLeft = MAX_CHARS - conteudo.length;
  const isOverLimit = charsLeft < 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Section title */}
      <h4 className="font-display text-lg uppercase tracking-wide text-dark-text">
        Comentarios ({totalComentarios})
      </h4>

      {/* Comment list */}
      <div
        ref={listRef}
        className={cn(
          'neu-inset overflow-y-auto rounded-lg px-3',
          comentarios.length > 0 ? 'max-h-[300px]' : ''
        )}
      >
        {comentarios.length === 0 ? (
          <p className="py-6 text-center text-sm text-dark-textMuted">
            Nenhum comentario ainda. Seja o primeiro!
          </p>
        ) : (
          <div className="divide-y divide-dark-border/50">
            {comentarios.map((comentario) => (
              <ComentarioItem key={comentario.id} comentario={comentario} />
            ))}
          </div>
        )}
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {/* Identity line */}
        {usuarioLogado ? (
          <p className="text-xs text-dark-textMuted">
            Comentando como{' '}
            <span className="font-medium text-ufc-gold">
              {usuarioLogado.displayName}
            </span>
          </p>
        ) : (
          <input
            type="text"
            value={guestNome}
            onChange={(e) => setGuestNome(e.target.value)}
            placeholder="Seu nome"
            maxLength={60}
            className={cn(
              'neu-inset rounded-lg px-3 py-2 text-sm text-dark-text',
              'placeholder:text-dark-textMuted/50 focus:border-ufc-red/50 focus:outline-none focus:ring-1 focus:ring-ufc-red/30'
            )}
          />
        )}

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            placeholder="Deixe seu comentario..."
            rows={3}
            maxLength={MAX_CHARS + 50}
            className={cn(
              'neu-inset w-full resize-none rounded-lg px-3 py-2 text-sm text-dark-text',
              'placeholder:text-dark-textMuted/50 focus:border-ufc-red/50 focus:outline-none focus:ring-1 focus:ring-ufc-red/30',
              isOverLimit && 'border-ufc-red'
            )}
          />

          {/* Character counter */}
          <span
            className={cn(
              'absolute bottom-2 right-2 text-xs tabular-nums',
              isOverLimit ? 'text-ufc-red' : charsLeft <= 50 ? 'text-ufc-gold' : 'text-dark-textMuted/50'
            )}
          >
            {charsLeft}
          </span>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-ufc-red">{error}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !conteudo.trim() || isOverLimit}
          className={cn(
            'neu-button self-end px-4 py-2 text-sm font-medium text-white transition-all duration-200',
            'border border-dark-border hover:border-ufc-red/40 hover:text-ufc-gold',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ufc-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg',
            (isSubmitting || !conteudo.trim() || isOverLimit) && 'pointer-events-none opacity-50'
          )}
        >
          {isSubmitting ? 'Enviando...' : 'Comentar'}
        </button>
      </form>
    </div>
  );
}
