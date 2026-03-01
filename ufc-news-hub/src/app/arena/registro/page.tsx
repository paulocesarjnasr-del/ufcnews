'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Octagon } from 'lucide-react';
import { OctagonPortalLayout } from '@/components/arena/OctagonPortalLayout';
import { useArenaAuth } from '@/hooks/useArenaAuth';

export default function ArenaRegistroPage() {
  const router = useRouter();
  const { registro, isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/arena');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.username.length < 3 || formData.username.length > 20) {
      setError('Username deve ter entre 3 e 20 caracteres');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError('Username pode conter apenas letras, numeros e _');
      return;
    }

    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('Senhas nao conferem');
      return;
    }

    setIsLoading(true);

    const result = await registro(
      formData.username,
      formData.email,
      formData.senha,
      undefined
    );

    if (result.success) {
      router.push('/arena');
    } else {
      setError(result.error || 'Erro ao criar conta');
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
            Criar Conta
          </h2>
          <p className="mt-1 text-sm text-dark-textMuted">
            Junte-se à Arena e comece a competir
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
            <label htmlFor="username" className="block text-sm font-medium text-dark-textMuted mb-2">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={20}
              className="neu-inset w-full px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-1 focus:ring-ufc-red text-sm"
              placeholder="seu_username"
            />
            <p className="mt-1 text-xs text-dark-textMuted">
              3-20 caracteres, apenas letras, numeros e _
            </p>
          </div>

          <div className="slide-up-fade" style={{ animationDelay: '100ms' }}>
            <label htmlFor="email" className="block text-sm font-medium text-dark-textMuted mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="neu-inset w-full px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-1 focus:ring-ufc-red text-sm"
              placeholder="seu@email.com"
            />
          </div>

          <div className="slide-up-fade" style={{ animationDelay: '150ms' }}>
            <label htmlFor="senha" className="block text-sm font-medium text-dark-textMuted mb-2">
              Senha *
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength={6}
              className="neu-inset w-full px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-1 focus:ring-ufc-red text-sm"
              placeholder="********"
            />
          </div>

          <div className="slide-up-fade" style={{ animationDelay: '200ms' }}>
            <label htmlFor="confirmarSenha" className="block text-sm font-medium text-dark-textMuted mb-2">
              Confirmar Senha *
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              className="neu-inset w-full px-4 py-3 text-dark-text placeholder-dark-textMuted focus:outline-none focus:ring-1 focus:ring-ufc-red text-sm"
              placeholder="********"
            />
          </div>

          <div className="slide-up-fade" style={{ animationDelay: '250ms' }}>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-ufc-red py-3 font-display uppercase text-white hover:bg-ufc-redLight transition-all hover:shadow-[0_0_20px_rgba(210,10,10,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </div>

          <div className="text-center text-sm text-dark-textMuted slide-up-fade" style={{ animationDelay: '300ms' }}>
            Já tem uma conta?{' '}
            <Link href="/arena/login" className="text-ufc-red hover:text-ufc-redLight font-medium">
              Fazer login
            </Link>
          </div>
        </form>
      </div>

    </OctagonPortalLayout>
  );
}
