'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReels } from '@/hooks/useReels';
import { ReelSlide } from './ReelSlide';
import { ReelProgress } from './ReelProgress';
import { ReelComments } from './ReelComments';
import { ReelEndScreen } from './ReelEndScreen';
import { ReelEmptyState } from './ReelEmptyState';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile;
}

export function ReelsContainer() {
  const { noticias, isLoading, toggleLike } = useReels();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentsNoticiaId, setCommentsNoticiaId] = useState<string | null>(null);
  const touchStart = useRef(0);
  const touchDelta = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
      if (commentsNoticiaId) return;
      if (isMobile) {
        if (e.key === 'ArrowDown') goNext();
        if (e.key === 'ArrowUp') goPrev();
      } else {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, commentsNoticiaId, isMobile]);

  // Touch handlers — Y-axis on mobile, X-axis on desktop
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = isMobile ? touch.clientY : touch.clientX;
    touchDelta.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchDelta.current = (isMobile ? touch.clientY : touch.clientX) - touchStart.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDelta.current < -threshold) {
      goNext();
    } else if (touchDelta.current > threshold) {
      goPrev();
    }
    touchDelta.current = 0;
  };

  if (isLoading) {
    return (
      <div className="h-[85vh] w-full animate-shimmer rounded-2xl bg-dark-card md:h-[70vh]" />
    );
  }

  if (totalSlides === 0) {
    return <ReelEmptyState />;
  }

  // Mobile: translateY with vh units (percentage would be relative to total height of all slides)
  // Desktop: translateX with percentage (works because container width = 1 slide width)
  const transformStyle = isMobile
    ? { transform: `translateY(-${currentIndex * 85}vh)`, transitionDuration: '0.4s' }
    : { transform: `translateX(-${currentIndex * 100}%)`, transitionDuration: '0.4s' };

  return (
    <div className="relative">
      {/* Slides container */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl ${isMobile ? 'h-[85vh]' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`transition-transform ease-out ${
            isMobile ? 'flex flex-col' : 'flex'
          }`}
          style={transformStyle}
        >
          {noticias.map((noticia, index) => (
            <ReelSlide
              key={noticia.id}
              noticia={noticia}
              isActive={index === currentIndex}
              isMobile={isMobile}
              onToggleLike={() => toggleLike(noticia.id)}
              onOpenComments={() => setCommentsNoticiaId(noticia.id)}
            />
          ))}

          <ReelEndScreen isMobile={isMobile} onRestart={() => setCurrentIndex(0)} />
        </div>
      </div>

      {/* Desktop Arrow Navigation */}
      {!isMobile && currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="neu-button absolute -left-14 top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-2.5 text-dark-textMuted transition-all hover:text-white hover:scale-110 lg:flex"
          aria-label="Notícia anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {!isMobile && currentIndex < totalSlides && (
        <button
          onClick={goNext}
          className="neu-button absolute -right-14 top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-2.5 text-dark-textMuted transition-all hover:text-white hover:scale-110 lg:flex"
          aria-label="Próxima notícia"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Progress — dots below on desktop, side bar on mobile */}
      <ReelProgress
        total={totalSlides}
        current={currentIndex >= totalSlides ? totalSlides - 1 : currentIndex}
        onDotClick={goTo}
        isMobile={isMobile}
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
