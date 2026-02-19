'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatTimeAgo } from '@/lib/utils';
import { Newspaper, BarChart3, Target, Calendar, Menu, X } from 'lucide-react';

interface SyncStatus {
  status: 'running' | 'completed' | 'error';
  finished_at: string | null;
}

const mainNav = [
  { href: '/', label: 'Noticias', icon: Newspaper },
  { href: '/analises', label: 'Análises', icon: BarChart3 },
  { href: '/arena', label: 'Arena', icon: Target },
  { href: '/calendario', label: 'Calendario', icon: Calendar },
];

export function Header() {
  const [lastSync, setLastSync] = useState<SyncStatus | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetchLastSync();
    const interval = setInterval(fetchLastSync, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  async function fetchLastSync() {
    try {
      const res = await fetch('/api/sync');
      const data = await res.json();
      setLastSync(data);
    } catch (error) {
      console.error('Erro ao buscar status:', error);
    }
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dark-border bg-dark-bg/95 backdrop-blur supports-[backdrop-filter]:bg-dark-bg/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="relative">
            <span className="font-display text-2xl text-ufc-red transition-all duration-300 group-hover:glow-red">
              UFC
            </span>
            <span className="font-display text-2xl text-dark-text">NEWS</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all neu-button ${
                  isActive(item.href)
                    ? 'bg-ufc-red/10 text-ufc-red'
                    : 'text-dark-textMuted hover:text-dark-text'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Sync status - hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2">
            {lastSync?.status === 'running' ? (
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ufc-red opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ufc-red"></span>
                </span>
                <span className="text-sm text-dark-textMuted">Sincronizando...</span>
              </div>
            ) : lastSync?.finished_at ? (
              <span className="text-sm text-dark-textMuted">
                Atualizado {formatTimeAgo(lastSync.finished_at)}
              </span>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-dark-textMuted hover:text-dark-text neu-button"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-dark-border neu-card">
          <div className="container mx-auto px-4 py-2">
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-ufc-red/10 text-ufc-red'
                      : 'text-dark-textMuted hover:text-dark-text hover:bg-dark-bg'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
