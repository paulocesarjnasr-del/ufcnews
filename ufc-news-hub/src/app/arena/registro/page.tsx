'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { useArenaAuth } from '@/hooks/useArenaAuth';

export default function ArenaRegistroPage() {
  const router = useRouter();
  const { registro, isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/arena/dashboard');
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

    // Validacoes
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
      formData.displayName || undefined
    );

    if (result.success) {
      router.push('/arena/dashboard');
    } else {
      setError(result.error || 'Erro ao criar conta');
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
              Criar <span className="text-ufc-red">Conta</span>
            </h1>
            <p className="mt-2 text-dark-textMuted">
              Junte-se a Arena e comece a competir com seus amigos
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
                <label htmlFor="username" className="block text-sm font-medium text-dark-textMuted mb-1">
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
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
                  placeholder="seu_username"
                />
                <p className="mt-1 text-xs text-dark-textMuted">
                  3-20 caracteres, apenas letras, numeros e _
                </p>
              </div>

              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-dark-textMuted mb-1">
                  Nome de Exibicao
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  maxLength={50}
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
                  placeholder="Como voce quer ser chamado"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-dark-textMuted mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-dark-textMuted mb-1">
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
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:border-ufc-red focus:outline-none"
                  placeholder="********"
                />
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-dark-textMuted mb-1">
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
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
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-dark-textMuted">
              Ja tem uma conta?{' '}
              <Link href="/arena/login" className="text-ufc-red hover:text-ufc-redLight">
                Fazer login
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 rounded-lg border border-dark-border bg-dark-card p-6">
            <h3 className="font-display text-lg uppercase text-dark-text mb-4">
              Por que criar uma conta?
            </h3>
            <ul className="space-y-3 text-sm text-dark-textMuted">
              <li className="flex items-center gap-2">
                <span className="text-ufc-red">✓</span>
                Faca previsoes e ganhe pontos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ufc-gold">✓</span>
                Crie e participe de ligas com amigos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Desafie amigos para duelos 1v1
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                Desbloqueie conquistas e suba de nivel
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-400">✓</span>
                Apareca no ranking global
              </li>
            </ul>
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
