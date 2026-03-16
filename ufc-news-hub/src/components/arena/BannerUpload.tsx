'use client';

import { useState, useRef, useCallback, useEffect, DragEvent, ChangeEvent } from 'react';
import { Upload, Trash2, X, ImageIcon, ZoomIn, ZoomOut, Move } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 400;
const PREVIEW_ASPECT = CANVAS_WIDTH / CANVAS_HEIGHT; // 3:1

// ═══════════════════════════════════════════════════════════════
// Props
// ═══════════════════════════════════════════════════════════════

interface BannerUploadProps {
  ligaId: string;
  currentBanner: string | null;
  onUpload: (url: string | null) => void;
  isOpen: boolean;
  onClose: () => void;
  embedded?: boolean;
}

// ═══════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════

export function BannerUpload({ ligaId, currentBanner, onUpload, isOpen, onClose, embedded }: BannerUploadProps) {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // ── Load image ──

  const loadImage = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Arquivo invalido. Use JPEG, PNG ou WebP.');
      return;
    }

    const img = new window.Image();
    img.onload = () => {
      setOriginalImage(img);
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
    };
    img.onerror = () => setError('Erro ao carregar imagem.');
    img.src = URL.createObjectURL(file);
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) loadImage(file);
    },
    [loadImage]
  );

  const handleFileDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingFile(false);
      const file = e.dataTransfer.files?.[0];
      if (file) loadImage(file);
    },
    [loadImage]
  );

  // ── Draw preview ──

  useEffect(() => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Calculate scaled dimensions to fill the canvas
    const imgAspect = originalImage.width / originalImage.height;
    let drawWidth: number, drawHeight: number;

    if (imgAspect > PREVIEW_ASPECT) {
      // Image is wider than canvas aspect - fit by height
      drawHeight = CANVAS_HEIGHT * zoom;
      drawWidth = drawHeight * imgAspect;
    } else {
      // Image is taller - fit by width
      drawWidth = CANVAS_WIDTH * zoom;
      drawHeight = drawWidth / imgAspect;
    }

    const x = (CANVAS_WIDTH - drawWidth) / 2 + offsetX;
    const y = (CANVAS_HEIGHT - drawHeight) / 2 + offsetY;

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(originalImage, x, y, drawWidth, drawHeight);
  }, [originalImage, zoom, offsetX, offsetY]);

  // ── Mouse drag for repositioning ──

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!originalImage) return;
    setIsDraggingImage(true);
    setDragStart({ x: e.clientX - offsetX, y: e.clientY - offsetY });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingImage) return;
    setOffsetX(e.clientX - dragStart.x);
    setOffsetY(e.clientY - dragStart.y);
  }, [isDraggingImage, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDraggingImage(false);
  }, []);

  useEffect(() => {
    if (isDraggingImage) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDraggingImage, handleMouseMove, handleMouseUp]);

  // ── Touch drag for mobile ──

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!originalImage) return;
    const touch = e.touches[0];
    setIsDraggingImage(true);
    setDragStart({ x: touch.clientX - offsetX, y: touch.clientY - offsetY });
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingImage) return;
    const touch = e.touches[0];
    setOffsetX(touch.clientX - dragStart.x);
    setOffsetY(touch.clientY - dragStart.y);
  }, [isDraggingImage, dragStart]);

  useEffect(() => {
    if (isDraggingImage) {
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
      return () => {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDraggingImage, handleTouchMove, handleMouseUp]);

  // ── Generate final blob from canvas ──

  const generateBlob = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (!canvasRef.current) return reject(new Error('Canvas not found'));
      canvasRef.current.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Failed to create blob')),
        'image/webp',
        0.85
      );
    });
  };

  // ── Upload ──

  const handleUpload = async () => {
    setIsUploading(true);
    setError(null);

    try {
      const blob = await generateBlob();
      const formData = new FormData();
      formData.append('banner', blob, 'banner.webp');

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
      handleReset();
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
      handleReset();
      onClose();
    } catch {
      setError('Erro de conexao. Tente novamente.');
    } finally {
      setIsRemoving(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setError(null);
  };

  if (!isOpen) return null;

  // ── Inner content ──

  const innerContent = (
    <div className="space-y-5">
      {originalImage ? (
          <>
            {/* Canvas preview with drag */}
            <div
              ref={previewRef}
              className="relative rounded-xl overflow-hidden border-2 border-dark-border select-none"
              style={{ aspectRatio: `${PREVIEW_ASPECT}`, cursor: isDraggingImage ? 'grabbing' : 'grab' }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block' }}
              />
              {/* Drag hint overlay */}
              {!isDraggingImage && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/60 rounded-full px-3 py-1 text-xs text-white/70 pointer-events-none">
                  <Move size={12} />
                  Arraste para reposicionar
                </div>
              )}
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                className="neu-button p-2 rounded-lg text-dark-textMuted hover:text-white"
              >
                <ZoomOut size={18} />
              </button>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-ufc-red h-1"
              />
              <button
                onClick={() => setZoom(z => Math.min(3, z + 0.1))}
                className="neu-button p-2 rounded-lg text-dark-textMuted hover:text-white"
              >
                <ZoomIn size={18} />
              </button>
              <span className="text-xs text-dark-textMuted w-12 text-right">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Reset image choice */}
            <button
              onClick={handleReset}
              className="text-xs text-dark-textMuted hover:text-white transition-colors"
            >
              Escolher outra imagem
            </button>
          </>
        ) : (
          /* Drop zone */
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
            onDragLeave={() => setIsDraggingFile(false)}
            onClick={() => inputRef.current?.click()}
            className={`relative rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden
              ${isDraggingFile ? 'border-ufc-red bg-ufc-red/10' : 'border-dark-border hover:border-ufc-red/50'}`}
            style={{ minHeight: '160px' }}
          >
            {currentBanner ? (
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
                  <p className="text-dark-textMuted text-xs mt-1">JPEG, PNG ou WebP</p>
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
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {currentBanner && !originalImage && (
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
            onClick={() => { handleReset(); onClose(); }}
            className="px-4 py-2 rounded-xl border border-dark-border text-dark-textMuted hover:text-white transition-all text-sm"
          >
            Cancelar
          </button>

          {originalImage && (
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
  );

  // ── Render ──

  if (embedded) {
    return innerContent;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="neu-card rounded-2xl w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl uppercase text-white">Banner da Liga</h2>
          <button
            onClick={onClose}
            className="text-dark-textMuted hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        {innerContent}
      </div>
    </div>
  );
}
