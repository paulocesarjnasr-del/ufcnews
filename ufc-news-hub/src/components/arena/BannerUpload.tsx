'use client';

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react';
import { Upload, Trash2, X, ImageIcon } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════

async function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Failed to create blob'))),
        'image/webp',
        quality
      );
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

// ═══════════════════════════════════════════════════════════════
// Props
// ═══════════════════════════════════════════════════════════════

interface BannerUploadProps {
  ligaId: string;
  currentBanner: string | null;
  onUpload: (url: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

// ═══════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════

export function BannerUpload({ ligaId, currentBanner, onUpload, isOpen, onClose }: BannerUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingBlob, setPendingBlob] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // ── File processing ──

  const processFile = useCallback(async (file: File) => {
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Arquivo invalido. Use JPEG, PNG ou WebP.');
      return;
    }

    try {
      const blob = await resizeImage(file, 1200, 400, 0.8);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setPendingBlob(blob);
    } catch {
      setError('Erro ao processar a imagem. Tente novamente.');
    }
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // ── Upload ──

  const handleUpload = async () => {
    if (!pendingBlob) return;
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('banner', pendingBlob, 'banner.webp');

      const res = await fetch(`/api/arena/ligas/${ligaId}/banner`, {
        method: 'POST',
        body: formData,
      });

      const data = (await res.json()) as { banner_url?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? 'Erro ao fazer upload.');
        return;
      }

      onUpload(data.banner_url ?? null);
      onClose();
    } catch {
      setError('Erro de conexao. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  // ── Remove ──

  const handleRemove = async () => {
    setIsRemoving(true);
    setError(null);

    try {
      const res = await fetch(`/api/arena/ligas/${ligaId}/banner`, { method: 'DELETE' });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? 'Erro ao remover banner.');
        return;
      }

      onUpload(null);
      onClose();
    } catch {
      setError('Erro de conexao. Tente novamente.');
    } finally {
      setIsRemoving(false);
    }
  };

  // ── Render ──

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="neu-card rounded-2xl w-full max-w-lg p-6 space-y-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl uppercase text-white">Banner da Liga</h2>
          <button
            onClick={onClose}
            className="text-dark-textMuted hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden
            ${isDragging ? 'border-ufc-red bg-ufc-red/10' : 'border-dark-border hover:border-ufc-red/50'}`}
          style={{ minHeight: '160px' }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview do banner"
              className="w-full h-40 object-cover"
            />
          ) : currentBanner ? (
            <div className="relative">
              <img
                src={currentBanner}
                alt="Banner atual"
                className="w-full h-40 object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <ImageIcon size={28} className="text-white" />
                <p className="text-white text-sm">Clique ou arraste para substituir</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 h-40">
              <Upload size={32} className="text-dark-textMuted" />
              <div className="text-center">
                <p className="text-white text-sm">Clique ou arraste uma imagem</p>
                <p className="text-dark-textMuted text-xs mt-1">JPEG, PNG ou WebP · Max 2MB · Redimensionado para 1200x400</p>
              </div>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {currentBanner && !previewUrl && (
            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-700 text-red-400 hover:bg-red-900/20 transition-all disabled:opacity-50 text-sm"
            >
              <Trash2 size={14} />
              {isRemoving ? 'Removendo...' : 'Remover banner'}
            </button>
          )}

          <div className="flex-1" />

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-dark-border text-dark-textMuted hover:text-white transition-all text-sm"
          >
            Cancelar
          </button>

          {pendingBlob && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="neu-button px-5 py-2 rounded-xl text-white text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
            >
              <Upload size={14} />
              {isUploading ? 'Enviando...' : 'Salvar banner'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
