'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UsuarioArena, NivelUsuario, NIVEL_CONFIG } from '@/types/arena';

interface UserAvatarProps {
  usuario: UsuarioArena | null;
  onLogout?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(nivel: NivelUsuario): string {
  return NIVEL_CONFIG[nivel]?.cor || '#808080';
}

export function UserAvatar({ usuario, onLogout }: UserAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Usuario nao logado - mostrar botao de login
  if (!usuario) {
    return (
      <Link
        href="/arena/login"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ufc-red hover:bg-ufc-redLight text-white font-medium text-sm transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>Login</span>
      </Link>
    );
  }

  const nivelConfig = NIVEL_CONFIG[usuario.nivel];
  const displayName = usuario.display_name || usuario.username;
  const initials = getInitials(displayName);
  const avatarColor = getAvatarColor(usuario.nivel);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group"
      >
        {/* Avatar circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white border-2 overflow-hidden transition-transform group-hover:scale-105"
          style={{
            backgroundColor: avatarColor + '40',
            borderColor: avatarColor
          }}
        >
          {usuario.avatar_url ? (
            <Image
              src={usuario.avatar_url}
              alt={displayName}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <span style={{ color: avatarColor }}>{initials}</span>
          )}
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-72 bg-dark-card border border-dark-border rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
          {/* User info header */}
          <div className="p-4 bg-gradient-to-br from-dark-card to-dark-bg border-b border-dark-border">
            <div className="flex items-center gap-3">
              {/* Avatar grande */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl border-2 overflow-hidden"
                style={{
                  backgroundColor: avatarColor + '40',
                  borderColor: avatarColor
                }}
              >
                {usuario.avatar_url ? (
                  <Image
                    src={usuario.avatar_url}
                    alt={displayName}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span style={{ color: avatarColor }}>{initials}</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate">{displayName}</p>
                <p className="text-sm text-dark-textMuted truncate">@{usuario.username}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">{nivelConfig?.icone}</span>
                  <span
                    className="text-xs font-medium capitalize"
                    style={{ color: avatarColor }}
                  >
                    {usuario.nivel}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats rapidos */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-dark-bg/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-ufc-gold">{usuario.pontos_totais.toLocaleString()}</p>
                <p className="text-xs text-dark-textMuted">Pontos</p>
              </div>
              <div className="bg-dark-bg/50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-green-400">
                  {usuario.total_previsoes > 0
                    ? Math.round((usuario.previsoes_corretas / usuario.total_previsoes) * 100)
                    : 0}%
                </p>
                <p className="text-xs text-dark-textMuted">Acertos</p>
              </div>
            </div>
          </div>

          {/* Menu options */}
          <nav className="py-2">
            <Link
              href={`/arena/perfil/${usuario.username}`}
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-dark-border/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">👤</span>
              <span className="text-sm">Meu Perfil</span>
            </Link>

            <Link
              href="/arena/perfil/config"
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-dark-border/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">⚙️</span>
              <span className="text-sm">Configuracoes</span>
            </Link>

            <Link
              href="/arena/perfil/avatar"
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-dark-border/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg">🖼️</span>
              <span className="text-sm">Mudar Avatar</span>
            </Link>
          </nav>

          {/* Logout */}
          <div className="border-t border-dark-border py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout?.();
              }}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <span className="text-lg">🚪</span>
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
