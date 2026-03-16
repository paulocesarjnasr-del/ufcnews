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
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

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
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const totalSlides = noticias.length;

  // Scroll to a specific slide
  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalSlides));
    if (isMobile && containerRef.current) {
      // Mobile: scroll to position (snap will handle alignment)
      containerRef.current.scrollTo({
        top: clamped * containerRef.current.clientHeight,
        behavior: 'smooth',
      });
    } else {
      setCurrentIndex(clamped);
    }
  }, [totalSlides, isMobile]);

  const goNext = useCallback(() => {
    if (currentIndex < totalSlides) goTo(currentIndex + 1);
  }, [currentIndex, totalSlides, goTo]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  // Track current slide from native scroll on mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!isMobile || !el) return;

    const handleScroll = () => {
      const slideHeight = el.clientHeight;
      if (slideHeight === 0) return;
      const newIndex = Math.round(el.scrollTop / slideHeight);
      setCurrentIndex(newIndex);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (commentsNoticiaId) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, commentsNoticiaId]);

  // Desktop touch handlers (horizontal swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) return; // mobile uses native scroll
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobile) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    if (isMobile) return;
    const threshold = 50;
    if (touchDeltaX.current < -threshold) goNext();
    else if (touchDeltaX.current > threshold) goPrev();
    touchDeltaX.current = 0;
  };

  if (isLoading) {
    return (
      <div className="h-[85vh] w-full animate-shimmer rounded-2xl bg-dark-card md:h-[70vh]" />
    );
  }

  if (totalSlides === 0) {
    return <ReelEmptyState />;
  }

  return (
    <div className="relative">
      {/*
        Mobile: native vertical scroll with CSS snap (no JS transform needed)
        Desktop: overflow hidden with JS translateX carousel
      */}
      <div
        ref={containerRef}
        className={[
          'rounded-2xl',
          // Mobile: vertical snap scroll
          'h-[85vh] overflow-y-auto snap-y snap-mandatory scrollbar-hide',
          // Desktop: horizontal carousel
          'md:h-auto md:overflow-y-visible md:overflow-x-hidden md:snap-none',
        ].join(' ')}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="md:flex md:flex-row md:transition-transform md:ease-out"
          style={{
            // Only apply transform on desktop
            transform: isMobile === false
              ? `translateX(-${currentIndex * 100}%)`
              : undefined,
            transitionDuration: isMobile === false ? '0.4s' : undefined,
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

          <ReelEndScreen onRestart={() => goTo(0)} />
        </div>
      </div>

      {/* Desktop Arrow Navigation */}
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

      {/* Progress dots */}
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
