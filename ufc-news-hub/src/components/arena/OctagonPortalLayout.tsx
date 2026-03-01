'use client';

import { Octagon } from 'lucide-react';
import Link from 'next/link';

interface OctagonPortalLayoutProps {
  children: React.ReactNode;
}

export function OctagonPortalLayout({ children }: OctagonPortalLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col md:flex-row">
      {/* Left Panel — The Portal */}
      <div className="relative w-full md:w-1/2 h-[200px] md:h-auto md:min-h-screen bg-dark-card overflow-hidden flex items-center justify-center">
        {/* Grid background */}
        <div className="absolute inset-0 dashboard-grid-bg" />

        {/* Scan-line */}
        <div className="absolute inset-0 mission-scan-line" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="float-particle absolute bottom-0 w-1 h-1 rounded-full bg-ufc-red/60 animate-float"
            />
          ))}
        </div>

        {/* Octagon SVG */}
        <div className="relative z-10 flex flex-col items-center gap-4 md:gap-6">
          <div className="relative">
            <svg
              viewBox="0 0 200 200"
              className="w-24 h-24 md:w-40 md:h-40 animate-pulse-glow rounded-full"
            >
              <polygon
                points="80,5 120,5 155,25 175,60 175,140 155,175 120,195 80,195 45,175 25,140 25,60 45,25"
                fill="none"
                stroke="#D20A0A"
                strokeWidth="2"
                strokeDasharray="800"
                strokeDashoffset="800"
                className="animate-draw-octagon"
              />
              <polygon
                points="80,5 120,5 155,25 175,60 175,140 155,175 120,195 80,195 45,175 25,140 25,60 45,25"
                fill="none"
                stroke="rgba(210,10,10,0.15)"
                strokeWidth="1"
              />
            </svg>
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Octagon className="w-8 h-8 md:w-12 md:h-12 text-ufc-red/80" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center px-4">
            <h1 className="font-display text-2xl md:text-5xl uppercase tracking-wider text-gradient-ufc">
              Entre na Arena
            </h1>
            <p className="mt-2 text-xs md:text-sm text-dark-textMuted tracking-widest uppercase">
              Previsões • Ligas • Rankings
            </p>
          </div>
        </div>

        {/* Bottom gradient fade (mobile) */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark-bg to-transparent md:hidden" />
      </div>

      {/* Right Panel — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 min-h-[60vh] md:min-h-screen">
        <div className="w-full max-w-md">
          {children}

          {/* Back to Arena */}
          <div className="mt-6 text-center">
            <Link
              href="/arena"
              className="text-sm text-dark-textMuted hover:text-ufc-red transition-colors"
            >
              ← Voltar para Arena
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
