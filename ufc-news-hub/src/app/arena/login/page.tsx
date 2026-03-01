'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Octagon } from 'lucide-react';
import { OctagonPortalLayout } from '@/components/arena/OctagonPortalLayout';
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
      router.push('/arena');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, senha);

    if (result.success) {
      router.push('/arena');
    } else {
      setError(result.error || 'Erro ao fazer login');
    }

    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <OctagonPortalLayout>
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
        </div>
      </OctagonPortalLayout>
    );
  }

  return (
    <OctagonPortalLayout>
      <div className="neu-card p-8 animate-glow-pulse-border">
        {/* Form Header */}
        <div className="flex flex-col items-center mb-8 slide-up-fade">
          <div className="text-ufc-red mb-4">
            <Octagon className="h-10 w-10" />
          </div>
          <h2 className="font-display text-3xl uppercase tracking-wide text-dark-text">
            Entrar
          </h2>
          <p className="mt-1 text-sm text-dark-textMuted">
            Acesse suas previsões, ligas e duelos
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400 slide-up-fade">
              {error}
            </div>
          )}

          <div className="slide-up-fade" style={{ animationDelay: '50ms' }}>
            <label htmlFor="email" className="block text-sm font-medium text-dark-textMuted mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="neu-inset w-full px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-1 focus:ring-ufc-red text-sm"
              placeholder="seu@email.com"
            />
          </div>

          <div className="slide-up-fade" style={{ animationDelay: '100ms' }}>
            <label htmlFor="senha" className="block text-sm font-medium text-dark-textMuted mb-2">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="neu-inset w-full px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-1 focus:ring-ufc-red text-sm"
              placeholder="********"
            />
          </div>

          <div className="slide-up-fade" style={{ animationDelay: '150ms' }}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-ufc-red py-3 font-display uppercase text-white hover:bg-ufc-redLight transition-all hover:shadow-[0_0_20px_rgba(210,10,10,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          <div className="text-center text-sm text-dark-textMuted slide-up-fade" style={{ animationDelay: '200ms' }}>
            Não tem uma conta?{' '}
            <Link href="/arena/registro" className="text-ufc-red hover:text-ufc-redLight font-medium">
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </OctagonPortalLayout>
  );
}
