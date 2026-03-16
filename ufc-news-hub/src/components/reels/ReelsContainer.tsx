'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home, BarChart3, Target, Calendar } from 'lucide-react';
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
  const mobileRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const totalSlides = noticias.length;

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalSlides));
    setCurrentIndex(clamped);
    if (mobileRef.current) {
      mobileRef.current.scrollTo({
        top: clamped * mobileRef.current.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [totalSlides]);

  const goNext = useCallback(() => {
    if (currentIndex < totalSlides) goTo(currentIndex + 1);
  }, [currentIndex, totalSlides, goTo]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  // Mobile: track scroll to update currentIndex
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;
    const onScroll = () => {
      const h = el.clientHeight;
      if (h > 0) setCurrentIndex(Math.round(el.scrollTop / h));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (commentsNoticiaId) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, commentsNoticiaId]);

  // Desktop horizontal swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (touchDeltaX.current < -50) goNext();
    else if (touchDeltaX.current > 50) goPrev();
    touchDeltaX.current = 0;
  };

  if (isLoading) {
    return <div className="h-[100dvh] w-full animate-shimmer bg-dark-card md:h-[70vh] md:rounded-2xl" />;
  }
  if (totalSlides === 0) {
    return <ReelEmptyState />;
  }

  return (
    <>
      {/* ══════ MOBILE: vertical scroll snap (md:hidden) ══════ */}
      <div className="relative md:hidden">
        {/* Mobile nav overlay */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 pt-[env(safe-area-inset-top,8px)] pb-2 bg-gradient-to-b from-black/70 to-transparent">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-display text-lg text-ufc-red">UFC</span>
            <span className="font-display text-lg text-white">NEWS</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/80 active:text-ufc-red"><Home className="h-5 w-5" /></Link>
            <Link href="/analises" className="text-white/80 active:text-ufc-red"><BarChart3 className="h-5 w-5" /></Link>
            <Link href="/arena" className="text-white/80 active:text-ufc-red"><Target className="h-5 w-5" /></Link>
            <Link href="/calendario" className="text-white/80 active:text-ufc-red"><Calendar className="h-5 w-5" /></Link>
          </div>
        </div>

        <div
          ref={mobileRef}
          className="scrollbar-hide"
          style={{
            height: '100dvh',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {noticias.map((noticia, index) => (
            <div key={noticia.id} style={{ height: '100dvh', scrollSnapAlign: 'start' }}>
              <ReelSlide
                noticia={noticia}
                isActive={index === currentIndex}
                onToggleLike={() => toggleLike(noticia.id)}
                onOpenComments={() => setCommentsNoticiaId(noticia.id)}
              />
            </div>
          ))}
          <div style={{ height: '100dvh', scrollSnapAlign: 'start' }}>
            <ReelEndScreen onRestart={() => goTo(0)} />
          </div>
        </div>

        <ReelProgress
          total={totalSlides}
          current={currentIndex >= totalSlides ? totalSlides - 1 : currentIndex}
          onDotClick={goTo}
        />
      </div>

      {/* ══════ DESKTOP: horizontal translateX (hidden md:block) ══════ */}
      <div className="relative hidden md:block">
        <div
          className="overflow-hidden rounded-2xl"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform ease-out"
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
            <ReelEndScreen onRestart={() => goTo(0)} />
          </div>
        </div>

        {currentIndex > 0 && (
          <button
            onClick={goPrev}
            className="neu-button absolute -left-14 top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-2.5 text-dark-textMuted transition-all hover:text-white hover:scale-110 lg:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {currentIndex < totalSlides && (
          <button
            onClick={goNext}
            className="neu-button absolute -right-14 top-1/2 z-10 hidden -translate-y-1/2 rounded-full p-2.5 text-dark-textMuted transition-all hover:text-white hover:scale-110 lg:flex"
            aria-label="Próxima"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        <ReelProgress
          total={totalSlides}
          current={currentIndex >= totalSlides ? totalSlides - 1 : currentIndex}
          onDotClick={goTo}
        />
      </div>

      <ReelComments
        noticiaId={commentsNoticiaId || ''}
        isOpen={commentsNoticiaId !== null}
        onClose={() => setCommentsNoticiaId(null)}
      />
    </>
  );
}
