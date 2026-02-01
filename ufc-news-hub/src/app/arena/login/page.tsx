'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { useArenaAuth } from '@/hooks/useArenaAuth';

export default function ArenaLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/arena/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, senha);

    if (result.success) {
      router.push('/arena/dashboard');
    } else {
      setError(result.error || 'Erro ao fazer login');
    }

    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl uppercase text-dark-text">
              Entrar na <span className="text-ufc-red">Arena</span>
            </h1>
            <p className="mt-2 text-dark-textMuted">
              Faca login para acessar suas previsoes, ligas e duelos
            </p>
          </div>

          {/* Form */}
          <div className="rounded-lg border border-dark-border bg-dark-card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-textMuted mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-dark-textMuted mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded bg-ufc-red py-3 font-display uppercase text-white hover:bg-ufc-redLight transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-dark-textMuted">
              Nao tem uma conta?{' '}
              <Link href="/arena/registro" className="text-ufc-red hover:text-ufc-redLight">
                Criar conta
              </Link>
            </div>
          </div>

          {/* Back to Arena */}
          <div className="mt-6 text-center">
            <Link href="/arena" className="text-sm text-dark-textMuted hover:text-ufc-red">
              ← Voltar para Arena
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
