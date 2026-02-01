'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { useArenaAuth } from '@/hooks/useArenaAuth';

export default function CriarLigaPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    tipo: 'privada' as 'publica' | 'privada',
    max_membros: 0, // 0 = ilimitado
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/arena/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'max_membros' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.nome.length < 3 || formData.nome.length > 50) {
      setError('Nome da liga deve ter entre 3 e 50 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/arena/ligas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/arena/ligas/${data.liga.id}`);
      } else {
        setError(data.error || 'Erro ao criar liga');
      }
    } catch {
      setError('Erro de conexao');
    }

    setIsLoading(false);
  };

  if (authLoading || !isAuthenticated) {
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

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-dark-textMuted mb-4">
            <Link href="/arena/dashboard" className="hover:text-ufc-red">
              Arena
            </Link>
            <span>/</span>
            <Link href="/arena/ligas" className="hover:text-ufc-red">
              Ligas
            </Link>
            <span>/</span>
            <span className="text-dark-text">Criar</span>
          </div>

          <h1 className="font-display text-4xl uppercase text-dark-text mb-8">
            Criar <span className="text-ufc-gold">Liga</span>
          </h1>

          <div className="rounded-lg border border-dark-border bg-dark-card p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-dark-textMuted mb-1">
                  Nome da Liga *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={50}
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:border-ufc-gold focus:outline-none"
                  placeholder="Ex: Os Melhores Previsores"
                />
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-dark-textMuted mb-1">
                  Descricao
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows={3}
                  maxLength={500}
                  className="w-full rounded border border-dark-border bg-dark-bg px-4 py-3 text-dark-text placeholder-dark-textMuted focus:border-ufc-gold focus:outline-none resize-none"
                  placeholder="Descreva sua liga (opcional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-textMuted mb-2">
                  Tipo de Liga *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex items-center justify-center p-4 rounded border cursor-pointer transition-colors ${
                      formData.tipo === 'privada'
                        ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                        : 'border-dark-border hover:border-dark-textMuted'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tipo"
                      value="privada"
                      checked={formData.tipo === 'privada'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <span className="text-2xl">🔒</span>
                      <p className="font-medium mt-1">Privada</p>
                      <p className="text-xs text-dark-textMuted">Somente com convite</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-center p-4 rounded border cursor-pointer transition-colors ${
                      formData.tipo === 'publica'
                        ? 'border-green-400 bg-green-400/10 text-green-400'
                        : 'border-dark-border hover:border-dark-textMuted'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tipo"
                      value="publica"
                      checked={formData.tipo === 'publica'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <span className="text-2xl">🌍</span>
                      <p className="font-medium mt-1">Publica</p>
                      <p className="text-xs text-dark-textMuted">Qualquer um pode entrar</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded bg-ufc-gold py-3 font-display uppercase text-dark-bg hover:bg-ufc-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Criando...' : 'Criar Liga'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link href="/arena/ligas" className="text-sm text-dark-textMuted hover:text-ufc-red">
              ← Voltar para Ligas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
