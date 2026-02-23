'use client';

import { useState, type ReactNode } from 'react';
import { AdminAuthProvider, useAdminAuth } from '@/components/admin/AdminAuthContext';
import { Lock, Loader2, AlertCircle } from 'lucide-react';

function AdminAuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-[#12121a] border border-[#1e1e2e] rounded-2xl p-8 shadow-2xl">
            {/* Logo / Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <h1 className="text-xl font-bold text-white text-center mb-1">
              UFC AI Company
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Acesso restrito ao painel admin
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!password.trim() || submitting) return;
                setSubmitting(true);
                setError('');
                const result = await login(password);
                if (!result.ok) {
                  setError(result.error || 'Erro ao fazer login.');
                }
                setSubmitting(false);
              }}
            >
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Senha de acesso"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                  autoFocus
                  disabled={submitting}
                />
              </div>

              {error && (
                <div className="mb-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !password.trim()}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            <p className="text-xs text-gray-600 text-center mt-4">
              Limite: 2 sessoes simultaneas
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated — show admin content (logout button is in TopBar)
  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminAuthGate>{children}</AdminAuthGate>
    </AdminAuthProvider>
  );
}
