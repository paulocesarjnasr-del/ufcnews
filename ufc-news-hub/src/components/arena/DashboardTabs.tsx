'use client';

import { useRef, useState, useEffect } from 'react';

interface DashboardTabsProps {
  tabs: { label: string; content: React.ReactNode }[];
}

export function DashboardTabs({ tabs }: DashboardTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < tabs.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeIndex, tabs.length]);

  const scrollToTab = (index: number) => {
    scrollRef.current?.scrollTo({
      left: index * (scrollRef.current?.offsetWidth ?? 0),
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex border-b border-dark-border/50 mb-4">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => scrollToTab(i)}
            className={`flex-1 py-3 text-sm font-display uppercase tracking-wide transition-colors relative ${
              activeIndex === i
                ? 'text-ufc-red'
                : 'text-dark-textMuted hover:text-dark-text'
            }`}
          >
            {tab.label}
            {activeIndex === i && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-ufc-red rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Scrollable tab content */}
      <div className="w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {tabs.map((tab, i) => (
            <div
              key={i}
              className="min-w-full flex-shrink-0 snap-center px-4"
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
