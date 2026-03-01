'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CommentSection } from '@/components/comments/CommentSection';

interface ReelCommentsProps {
  noticiaId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReelComments({ noticiaId, isOpen, onClose }: ReelCommentsProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] animate-slide-from-bottom rounded-t-2xl bg-dark-card border-t border-dark-border">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-border px-4 py-3">
          <h3 className="font-display text-lg uppercase text-dark-text">Comentarios</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-dark-textMuted hover:bg-dark-border hover:text-dark-text transition-colors"
            aria-label="Fechar comentarios"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Comments */}
        <div className="overflow-y-auto max-h-[calc(70vh-52px)] p-4">
          <CommentSection noticiaId={noticiaId} />
        </div>
      </div>
    </div>
  );
}
