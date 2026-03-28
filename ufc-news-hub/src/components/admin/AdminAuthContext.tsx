'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';

interface AdminAuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenRef = useRef<string | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // On mount, check sessionStorage for existing token and validate it
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_token');
    if (!saved) {
      setIsLoading(false);
      return;
    }

    fetch('/api/admin/auth', {
      headers: { Authorization: `Bearer ${saved}` },
    })
      .then((res) => {
        if (res.ok) {
          tokenRef.current = saved;
          document.cookie = `admin_token=${saved}; path=/; max-age=28800; SameSite=Lax`;
          setToken(saved);
        } else {
          sessionStorage.removeItem('admin_token');
          document.cookie = 'admin_token=; path=/; max-age=0';
        }
      })
      .catch(() => {
        sessionStorage.removeItem('admin_token');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (password: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { ok: false, error: data.error || 'Erro ao fazer login.' };
      }

      tokenRef.current = data.token;
      sessionStorage.setItem('admin_token', data.token);
      document.cookie = `admin_token=${data.token}; path=/; max-age=28800; SameSite=Lax`;
      setToken(data.token);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Erro de conexão.' };
    }
  }, []);

  const logout = useCallback(() => {
    const t = tokenRef.current;
    if (t) {
      fetch('/api/admin/auth', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${t}` },
      }).catch(() => {});
    }
    tokenRef.current = null;
    sessionStorage.removeItem('admin_token');
    document.cookie = 'admin_token=; path=/; max-age=0';
    setToken(null);
  }, []);

  // STABLE authFetch — reads token from ref, never changes reference
  // This prevents useEffect cascades when token updates
  const authFetch = useCallback(
    async (url: string, options: RequestInit = {}) => {
      const currentToken = tokenRef.current || sessionStorage.getItem('admin_token');
      const headers = new Headers(options.headers);
      if (currentToken) {
        headers.set('Authorization', `Bearer ${currentToken}`);
      }
      return fetch(url, { ...options, headers });
    },
    [] // empty deps = stable reference forever
  );

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
        authFetch,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
