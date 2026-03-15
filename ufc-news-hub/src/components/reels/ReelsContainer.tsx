'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReels } from '@/hooks/useReels';
import { ReelSlide } from './ReelSlide';
import { ReelProgress } from './ReelProgress';
import { ReelComments } from './ReelComments';
import { ReelEndScreen } from './ReelEndScreen';
import { ReelEmptyState } from './ReelEmptyState';

export function ReelsContainer() {
  const { noticias, isLoading, toggleLike } = useReels();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentsNoticiaId, setCommentsNoticiaId] = useState<string | null>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = noticias.length;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalSlides)));
  }, [totalSlides]);

  const goNext = useCallback(() => {
    if (currentIndex < totalSlides) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, totalSlides]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (commentsNoticiaId) return; // Don't navigate while comments open
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, commentsNoticiaId]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX.current < -threshold) {
      goNext();
    } else if (touchDeltaX.current > threshold) {
      goPrev();
    }
    touchDeltaX.current = 0;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-[60vh] w-full animate-shimmer rounded-2xl bg-dark-card md:h-[70vh]" />
    );
  }

  // Empty state
  if (totalSlides === 0) {
    return <ReelEmptyState />;
  }

  return (
    <div className="relative">
      {/* Slides container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-400 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transitionDuration: '0.4s',
          }}
        >
          {noticias.map((noticia, index) => (
            <ReelSlide
              key={noticia.id}
              noticia={noticia}
              isActive={index === currentIndex}
              onToggleLike={() => toggleLike(noticia.id)}
              onOpenComments={() => setCommentsNoticiaId(noticia.id)}
            />
          ))}

          {/* End Screen as last "slide" */}
          <ReelEndScreen onRestart={() => setCurrentIndex(0)} />
        </div>
      </div>

      {/* Desktop Arrow Navigation — positioned outside the slide card */}
      {currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="neu-button absolute -left-14 top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-2.5 text-dark-textMuted transition-all hover:text-white hover:scale-110 lg:flex"
          aria-label="Notícia anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {currentIndex < totalSlides && (
        <button
          onClick={goNext}
          className="neu-button absolute -right-14 top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-2.5 text-dark-textMuted transition-all hover:text-white hover:scale-110 lg:flex"
          aria-label="Próxima notícia"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Progress Dots */}
      <ReelProgress
        total={totalSlides}
        current={currentIndex >= totalSlides ? totalSlides - 1 : currentIndex}
        onDotClick={goTo}
      />

      {/* Comments Drawer */}
      <ReelComments
        noticiaId={commentsNoticiaId || ''}
        isOpen={commentsNoticiaId !== null}
        onClose={() => setCommentsNoticiaId(null)}
      />
    </div>
  );
}
