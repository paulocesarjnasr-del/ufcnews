'use client';

import { useState } from 'react';
import { Copy, Settings, LogOut, Lock, Globe, Check } from 'lucide-react';
import type { Liga } from '@/types/arena';

// ═══════════════════════════════════════════════════════════════
// Props
// ═══════════════════════════════════════════════════════════════

interface LigaHeaderProps {
  liga: Liga & {
    criador: {
      id: string;
      username: string;
      display_name: string | null;
      avatar_url: string | null;
    };
  };
  isAdmin: boolean;
  isMembro: boolean;
  onSairClick: () => void;
  onGerenciarClick: () => void;
}

// ═══════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════

export function LigaHeader({
  liga,
  isAdmin,
  isMembro,
  onSairClick,
  onGerenciarClick,
}: LigaHeaderProps) {
  const [copied, setCopied] = useState(false);

  // ── Invite copy ──

  const handleCopyInvite = async () => {
    if (!liga.codigo_convite) return;
    const url = `${window.location.origin}/arena/ligas/join/${liga.codigo_convite}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-secure contexts
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Date format ──

  const createdYear = new Date(liga.created_at).getFullYear();

  // ── Render ──

  return (
    <div>
      {/* ── Banner area ── */}
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ minHeight: '180px' }}>
        {liga.imagem_url ? (
          <img
            src={liga.imagem_url}
            alt={`Banner da liga ${liga.nome}`}
            className="w-full h-44 object-cover"
          />
        ) : (
          <div className="w-full h-44 bg-gradient-to-r from-ufc-red to-red-900" />
        )}

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Liga info over banner */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="font-display text-3xl uppercase text-white leading-tight drop-shadow-lg">
            {liga.nome}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            {/* Type badge */}
            <span className="flex items-center gap-1 text-xs text-dark-textMuted">
              {liga.tipo === 'privada' ? (
                <>
                  <Lock size={12} className="text-dark-textMuted" />
                  Privada
                </>
              ) : (
                <>
                  <Globe size={12} className="text-dark-textMuted" />
                  Publica
                </>
              )}
            </span>

            <span className="text-dark-textMuted text-xs">·</span>

            {/* Member count */}
            <span className="text-xs text-dark-textMuted">
              {liga.total_membros} / {liga.max_membros} membros
            </span>

            <span className="text-dark-textMuted text-xs">·</span>

            {/* Created year */}
            <span className="text-xs text-dark-textMuted">Desde {createdYear}</span>
          </div>
        </div>
      </div>

      {/* ── Description ── */}
      {liga.descricao && (
        <p className="text-dark-textMuted text-sm mt-3 px-1">{liga.descricao}</p>
      )}

      {/* ── Action buttons (members only) ── */}
      {isMembro && (
        <div className="flex flex-wrap gap-2 mt-4">
          {/* Copy invite */}
          {liga.codigo_convite && (
            <button
              onClick={handleCopyInvite}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dark-border text-dark-textMuted hover:text-white hover:border-ufc-red/50 transition-all text-sm"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-400" />
                  <span className="text-green-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copiar convite
                </>
              )}
            </button>
          )}

          {/* Edit banner (admin only) */}
          {isAdmin && (
            <button
              onClick={onGerenciarClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dark-border text-dark-textMuted hover:text-white hover:border-ufc-red/50 transition-all text-sm"
            >
              <Settings size={14} />
              Editar
            </button>
          )}

          {/* Leave (non-admin only) */}
          {!isAdmin && (
            <button
              onClick={onSairClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-700/50 text-red-400 hover:bg-red-900/20 transition-all text-sm"
            >
              <LogOut size={14} />
              Sair
            </button>
          )}
        </div>
      )}

    </div>
  );
}
