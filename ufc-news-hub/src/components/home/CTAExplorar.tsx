'use client';

import Link from 'next/link';
import useSWR from 'swr';
import { Newspaper, Target, BarChart3, Users, Calendar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ContadorCategorias } from '@/types';

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════

interface CardItem {
  title: string;
  icon: LucideIcon;
  href: string;
  subtitle: string;
  accentColor: string;
}

// ═══════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════

const fetcher = (url: string) => fetch(url).then(res => res.json());

function buildCards(contadores?: ContadorCategorias): CardItem[] {
  const noticiasSubtitle = contadores
    ? `${contadores.todas} artigos`
    : 'Ultimas noticias';

  return [
    {
      title: 'NOTICIAS',
      icon: Newspaper,
      href: '/noticias',
      subtitle: noticiasSubtitle,
      accentColor: '#D20A0A',
    },
    {
      title: 'ARENA',
      icon: Target,
      href: '/arena',
      subtitle: 'Faca suas previsoes',
      accentColor: '#C9B037',
    },
    {
      title: 'ANALISES',
      icon: BarChart3,
      href: '/analises',
      subtitle: 'Analises semanais',
      accentColor: '#14B8A6',
    },
    {
      title: 'LUTADORES',
      icon: Users,
      href: '/fighters',
      subtitle: 'Perfis completos',
      accentColor: '#3B82F6',
    },
    {
      title: 'CALENDARIO',
      icon: Calendar,
      href: '/calendario',
      subtitle: 'Proximos eventos',
      accentColor: '#8B5CF6',
    },
  ];
}

// ═══════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════

export function CTAExplorar() {
  const { data: contadores } = useSWR<ContadorCategorias>(
    '/api/noticias/contadores',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  const cards = buildCards(contadores);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
      {/* Section title */}
      <h2 className="mb-8 text-center font-display text-3xl uppercase tracking-wide text-white md:mb-12 md:text-4xl">
        Explore o{' '}
        <span className="text-ufc-red">UFC News Hub</span>
      </h2>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            prefetch={true}
            className="neu-card-hover group flex flex-col items-center gap-3 rounded-2xl p-6 md:p-8 transition-all duration-300"
            style={{
              '--card-accent': card.accentColor,
            } as React.CSSProperties}
          >
            {/* Icon */}
            <card.icon
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
              style={{ color: card.accentColor }}
              strokeWidth={1.5}
            />

            {/* Title */}
            <h3 className="font-display text-xl uppercase tracking-wider text-white md:text-2xl">
              {card.title}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-dark-textMuted">
              {card.subtitle}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
