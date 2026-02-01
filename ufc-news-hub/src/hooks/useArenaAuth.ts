'use client';

import { useState, useEffect, useCallback } from 'react';
import { UsuarioArena } from '@/types/arena';

interface ArenaAuthState {
  usuario: UsuarioArena | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export function useArenaAuth() {
  const [state, setState] = useState<ArenaAuthState>({
    usuario: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const fetchUsuario = useCallback(async () => {
    try {
      const res = await fetch('/api/arena/auth/me');
      if (res.ok) {
        const data = await res.json();
        setState({
          usuario: data.usuario,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
      } else {
        setState({
          usuario: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      }
    } catch {
      setState({
        usuario: null,
        isLoading: false,
        isAuthenticated: false,
        error: 'Erro ao verificar autenticacao',
      });
    }
  }, []);

  useEffect(() => {
    fetchUsuario();
  }, [fetchUsuario]);

  const login = useCallback(async (email: string, senha: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await fetch('/api/arena/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setState({
          usuario: data.usuario,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
        return { success: true };
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: data.error || 'Erro ao fazer login',
        }));
        return { success: false, error: data.error };
      }
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Erro de conexao',
      }));
      return { success: false, error: 'Erro de conexao' };
    }
  }, []);

  const registro = useCallback(
    async (username: string, email: string, senha: string, displayName?: string) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const res = await fetch('/api/arena/auth/registro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, senha, display_name: displayName }),
        });

        const data = await res.json();

        if (res.ok) {
          setState({
            usuario: data.usuario,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
          return { success: true };
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: data.error || 'Erro ao criar conta',
          }));
          return { success: false, error: data.error };
        }
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Erro de conexao',
        }));
        return { success: false, error: 'Erro de conexao' };
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await fetch('/api/arena/auth/logout', { method: 'POST' });
    } catch {
      // Ignore errors
    }
    setState({
      usuario: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  }, []);

  const refreshUsuario = useCallback(async () => {
    await fetchUsuario();
  }, [fetchUsuario]);

  return {
    ...state,
    login,
    registro,
    logout,
    refreshUsuario,
  };
}
