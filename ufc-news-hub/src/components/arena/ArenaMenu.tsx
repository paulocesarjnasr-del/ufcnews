'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ArenaMenuProps {
  isLoggedIn: boolean;
}

export function ArenaMenu({ isLoggedIn }: ArenaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fecha o menu quando navega
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const menuItems = [
    { href: '/arena', label: 'Inicio', icon: '🏠', requiresAuth: false },
    { href: '/arena/ranking', label: 'Ranking Global', icon: '🏆', requiresAuth: false },
    { href: '/arena/ligas', label: 'Minhas Ligas', icon: '🎮', requiresAuth: false },
    { href: '/arena/historico', label: 'Meu Historico', icon: '📊', requiresAuth: true },
    { href: '/arena/como-funciona', label: 'Como Funciona', icon: '❓', requiresAuth: false },
  ];

  return (
    <div ref={menuRef} className="relative">
      {/* Botao hamburguer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-dark-card/80 border border-dark-border hover:border-ufc-red/50 transition-colors"
        aria-label="Menu"
      >
        <svg
          className={`w-5 h-5 text-white transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-64 bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-ufc-red/20 to-transparent border-b border-dark-border">
            <h3 className="font-display text-lg uppercase text-white tracking-wider">Arena UFC</h3>
          </div>

          {/* Menu items */}
          <nav className="py-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const isDisabled = item.requiresAuth && !isLoggedIn;

              if (isDisabled) {
                return (
                  <div
                    key={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-dark-textMuted cursor-not-allowed"
                    title="Faca login para acessar"
                  >
                    <span className="text-xl opacity-50">{item.icon}</span>
                    <span className="text-sm opacity-50">{item.label}</span>
                    <span className="ml-auto text-xs text-dark-textMuted">🔒</span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-ufc-red/10 text-ufc-red border-l-2 border-ufc-red'
                      : 'text-white hover:bg-dark-border/50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer - Config */}
          {isLoggedIn && (
            <div className="border-t border-dark-border py-2">
              <Link
                href="/arena/perfil/config"
                className="flex items-center gap-3 px-4 py-3 text-dark-textMuted hover:text-white hover:bg-dark-border/50 transition-colors"
              >
                <span className="text-xl">⚙️</span>
                <span className="text-sm">Configuracoes</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
