'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ContadorCategorias } from '@/types';
import { LayoutGrid, Users, Swords, Clapperboard, LucideIcon } from 'lucide-react';

interface Tab {
  href: string;
  label: string;
  countKey: keyof ContadorCategorias;
  icon: LucideIcon;
}

const tabs: Tab[] = [
  { href: '/', label: 'Todas', countKey: 'todas', icon: LayoutGrid },
  { href: '/lutadores', label: 'Lutadores', countKey: 'lutadores', icon: Users },
  { href: '/lutas', label: 'Lutas', countKey: 'lutas', icon: Swords },
  { href: '/backstage', label: 'Backstage', countKey: 'backstage', icon: Clapperboard },
];

interface TabNavigationProps {
  contadores?: ContadorCategorias;
}

export function TabNavigation({ contadores }: TabNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-dark-border">
      <div className="container mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            const count = contadores?.[tab.countKey];
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all',
                  'hover:text-dark-text',
                  isActive ? 'text-dark-text' : 'text-dark-textMuted'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {count !== undefined && count > 0 && (
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs',
                      isActive
                        ? 'bg-ufc-red/20 text-ufc-red'
                        : 'bg-dark-border text-dark-textMuted'
                    )}
                  >
                    {count}
                  </span>
                )}
                {/* Indicador de tab ativa */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ufc-red" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
