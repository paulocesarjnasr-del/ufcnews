'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Swords, Trophy, User } from 'lucide-react';

interface BottomNavProps {
  eventoId: string | null;
  isAoVivo: boolean;
  username: string | null;
}

interface NavTab {
  label: string;
  liveLabel?: string;
  href: string;
  icon: React.ReactNode;
  matchPaths: string[];
}

export function BottomNav({ eventoId, isAoVivo, username }: BottomNavProps) {
  const pathname = usePathname();

  const tabs: NavTab[] = [
    {
      label: 'Home',
      href: '/arena',
      icon: <Home className="w-5 h-5" />,
      matchPaths: ['/arena'],
    },
    {
      label: 'Evento',
      liveLabel: 'AO VIVO',
      href: isAoVivo
        ? '/arena/live'
        : eventoId
          ? `/arena/evento/${eventoId}`
          : '/arena',
      icon: <Swords className="w-5 h-5" />,
      matchPaths: ['/arena/evento', '/arena/live'],
    },
    {
      label: 'Ligas',
      href: '/arena/ligas',
      icon: <Trophy className="w-5 h-5" />,
      matchPaths: ['/arena/ligas'],
    },
    {
      label: 'Perfil',
      href: username ? `/arena/perfil/${username}` : '/arena/login',
      icon: <User className="w-5 h-5" />,
      matchPaths: ['/arena/perfil'],
    },
  ];

  const isActive = (tab: NavTab) => {
    if (tab.matchPaths[0] === '/arena' && pathname === '/arena') return true;
    return tab.matchPaths.some(p => p !== '/arena' && pathname.startsWith(p));
  };

  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark-card/95 backdrop-blur-md border-t border-dark-border/50 md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const active = isActive(tab);
            const showLive = tab.liveLabel && isAoVivo;

            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                  active
                    ? 'text-ufc-red'
                    : 'text-dark-textMuted hover:text-dark-text'
                }`}
              >
                <div className="relative">
                  {tab.icon}
                  {showLive && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
                <span className={`text-[10px] font-medium ${showLive ? 'text-red-400' : ''}`}>
                  {showLive ? tab.liveLabel : tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop horizontal tabs (rendered inside top sub-header) */}
      <nav className="hidden md:flex items-center gap-1">
        {tabs.map((tab) => {
          const active = isActive(tab);
          const showLive = tab.liveLabel && isAoVivo;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-ufc-red/10 text-ufc-red'
                  : 'text-dark-textMuted hover:text-dark-text hover:bg-white/5'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {showLive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </div>
              <span>{showLive ? tab.liveLabel : tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
