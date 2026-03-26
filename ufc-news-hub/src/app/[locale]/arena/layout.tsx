'use client';

import { Link } from '@/i18n/routing';
import { Target, Trophy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/ui/Header';
import { UserAvatar } from '@/components/arena/UserAvatar';
import { BottomNav } from '@/components/arena/BottomNav';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import { useProximoEvento } from '@/hooks/useProximoEvento';

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('arena');
  const { usuario, isAuthenticated, logout } = useArenaAuth();
  const { evento, isAoVivo } = useProximoEvento();

  return (
    <>
      {/* Global Header */}
      <Header />

      {/* Arena Sub-Header */}
      <div className="sticky top-16 z-40 w-full bg-dark-bg/80 backdrop-blur-md border-b border-dark-border/50">
        <div className="container mx-auto flex h-12 items-center justify-between px-4">
          {/* Left: Arena UFC logo */}
          <Link href="/arena" className="flex items-center gap-2 group">
            <Target className="w-5 h-5 text-ufc-red transition-transform group-hover:scale-110" />
            <span className="font-display text-lg text-white tracking-wide">
              {t('layout_arena')} <span className="text-ufc-red">UFC</span>
            </span>
          </Link>

          {/* Center: Desktop nav tabs */}
          <div className="hidden md:block">
            <BottomNav
              eventoId={evento?.id ?? null}
              isAoVivo={isAoVivo}
              username={usuario?.username ?? null}
            />
          </div>

          {/* Right: Points badge + UserAvatar */}
          <div className="flex items-center gap-3">
            {isAuthenticated && usuario && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ufc-gold/10 border border-ufc-gold/20">
                <Trophy className="w-3.5 h-3.5 text-ufc-gold" />
                <span className="text-sm font-semibold text-ufc-gold">
                  {(usuario.pontos_totais ?? 0).toLocaleString()} pts
                </span>
              </div>
            )}
            <UserAvatar usuario={usuario} onLogout={logout} />
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="pb-16 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <BottomNav
          eventoId={evento?.id ?? null}
          isAoVivo={isAoVivo}
          username={usuario?.username ?? null}
        />
      </div>
    </>
  );
}
