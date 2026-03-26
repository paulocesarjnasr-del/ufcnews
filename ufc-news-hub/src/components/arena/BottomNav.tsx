'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { Home, Swords, Radio, Trophy, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BottomNavProps {
  eventoId: string | null;
  isAoVivo: boolean;
  username: string | null;
}

interface NavTab {
  label: string;
  href: string;
  icon: React.ReactNode;
  matchPaths: string[];
  isLive?: boolean;
}

export function BottomNav({ eventoId, isAoVivo, username }: BottomNavProps) {
  const pathname = usePathname();
  const t = useTranslations('arena');

  const tabs: NavTab[] = [
    {
      label: t('nav_home'),
      href: '/arena',
      icon: <Home className="w-5 h-5" />,
      matchPaths: ['/arena'],
    },
    {
      label: t('nav_event'),
      href: eventoId ? `/arena/evento/${eventoId}` : '/arena',
      icon: <Swords className="w-5 h-5" />,
      matchPaths: ['/arena/evento'],
    },
    {
      label: isAoVivo ? t('live') : t('nav_live'),
      href: '/arena/live',
      icon: <Radio className="w-5 h-5" />,
      matchPaths: ['/arena/live'],
      isLive: isAoVivo,
    },
    {
      label: t('nav_leagues'),
      href: '/arena/ligas',
      icon: <Trophy className="w-5 h-5" />,
      matchPaths: ['/arena/ligas'],
    },
    {
      label: t('nav_profile'),
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
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark-card/95 backdrop-blur-md border-t border-dark-border/50 md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {tabs.map((tab) => {
            const active = isActive(tab);
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                  active ? 'text-ufc-red' : tab.isLive ? 'text-red-400' : 'text-dark-textMuted hover:text-dark-text'
                }`}
              >
                <div className="relative">
                  {tab.icon}
                  {tab.isLive && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />}
                </div>
                <span className={`text-[10px] font-medium ${tab.isLive ? 'text-red-400' : ''}`}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <nav className="hidden md:flex items-center gap-1">
        {tabs.map((tab) => {
          const active = isActive(tab);
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-ufc-red/10 text-ufc-red' : tab.isLive ? 'text-red-400 hover:bg-red-500/10' : 'text-dark-textMuted hover:text-dark-text hover:bg-white/5'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.isLive && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
              </div>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
