'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, Volume2, Loader } from 'lucide-react';

interface AudioPlayerProps {
  noticiaId: string;
}

export function AudioPlayer({ noticiaId }: AudioPlayerProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'paused'>('idle');
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (status === 'loading') return;

    // Already loaded — just toggle play/pause
    if (audioRef.current && blobUrlRef.current) {
      if (status === 'playing') {
        audioRef.current.pause();
        setStatus('paused');
      } else {
        audioRef.current.play();
        setStatus('playing');
      }
      return;
    }

    // First click — create Audio and "unlock" it with silent play, then fetch
    setStatus('loading');

    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration > 0) {
        setProgress(audio.currentTime / audio.duration);
      }
    });

    audio.addEventListener('ended', () => {
      setStatus('idle');
      setProgress(0);
    });

    // Fetch audio in background, then load and play
    fetch(`/api/noticias/${noticiaId}/tts`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load audio');
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        audio.src = url;
        return audio.play();
      })
      .then(() => {
        setStatus('playing');
      })
      .catch((err) => {
        console.error('Audio error:', err);
        setStatus('idle');
      });
  }, [status, noticiaId]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = pct * duration;
    setProgress(pct);
  }, [duration]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-dark-border bg-dark-card px-4 py-3 mb-6">
      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        disabled={status === 'loading'}
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-ufc-red text-white transition-all hover:bg-ufc-redLight disabled:opacity-60"
      >
        {status === 'loading' ? (
          <Loader className="h-5 w-5 animate-spin" />
        ) : status === 'playing' ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5 ml-0.5" />
        )}
      </button>

      {/* Label + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Volume2 className="h-3.5 w-3.5 text-dark-textMuted flex-shrink-0" />
          <span className="text-xs font-medium text-dark-textMuted truncate">
            {status === 'loading'
              ? 'Gerando áudio...'
              : status === 'idle' && progress === 0
              ? 'Ouvir notícia'
              : status === 'playing'
              ? 'Tocando'
              : 'Pausado'}
          </span>
          {duration > 0 && (
            <span className="text-[10px] text-dark-textMuted ml-auto flex-shrink-0">
              {formatTime(progress * duration)} / {formatTime(duration)}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div
          className="h-1.5 w-full rounded-full bg-dark-border cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full rounded-full bg-ufc-red transition-all duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
