'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Gamepad2, BarChart3, HelpCircle, Settings, Lock, Menu, X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

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

  const menuItems: { href: string; label: string; icon: LucideIcon; requiresAuth: boolean }[] = [
    { href: '/arena', label: 'Inicio', icon: Home, requiresAuth: false },
    { href: '/arena/ligas', label: 'Minhas Ligas', icon: Gamepad2, requiresAuth: false },
    { href: '/arena/historico', label: 'Meu Historico', icon: BarChart3, requiresAuth: true },
    { href: '/arena/como-funciona', label: 'Como Funciona', icon: HelpCircle, requiresAuth: false },
  ];

  return (
    <div ref={menuRef} className="relative">
      {/* Botao hamburguer */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 neu-button transition-all"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-64 neu-card overflow-hidden z-50 animate-fadeIn">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-ufc-red/20 to-transparent border-b border-dark-border">
            <h3 className="font-display text-lg uppercase text-white tracking-wider">Arena UFC</h3>
          </div>

          {/* Menu items */}
          <nav className="py-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const isDisabled = item.requiresAuth && !isLoggedIn;
              const Icon = item.icon;

              if (isDisabled) {
                return (
                  <div
                    key={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-dark-textMuted cursor-not-allowed"
                    title="Faca login para acessar"
                  >
                    <Icon className="w-5 h-5 opacity-50" />
                    <span className="text-sm opacity-50">{item.label}</span>
                    <Lock className="ml-auto w-4 h-4 text-dark-textMuted" />
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
                  <Icon className="w-5 h-5" />
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
                <Settings className="w-5 h-5" />
                <span className="text-sm">Configuracoes</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
