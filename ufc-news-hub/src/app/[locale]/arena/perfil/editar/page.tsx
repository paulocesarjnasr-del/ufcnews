'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Save, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useArenaAuth } from '@/hooks/useArenaAuth';

export default function EditarPerfilPage() {
  const t = useTranslations('arena');
  const router = useRouter();
  const { usuario, isAuthenticated, isLoading: authLoading, refreshUsuario } = useArenaAuth();
  const [bio, setBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/arena/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (usuario?.bio) {
      setBio(usuario.bio);
    }
  }, [usuario]);

  async function handleSave() {
    setError('');
    setIsSaving(true);

    try {
      const res = await fetch('/api/arena/perfil', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio }),
      });

      if (res.ok) {
        await refreshUsuario();
        router.push(`/arena/perfil/${usuario?.username}`);
      } else {
        const data = await res.json();
        setError(data.error || t('profile_error_save'));
      }
    } catch {
      setError(t('error_connection'));
    } finally {
      setIsSaving(false);
    }
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ufc-red" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-dark-textMuted mb-6">
        <Link href="/arena" className="hover:text-ufc-red transition-colors">
          {t('title')}
        </Link>
        <span>/</span>
        <Link
          href={`/arena/perfil/${usuario?.username}`}
          className="hover:text-ufc-red transition-colors"
        >
          {t('profile')}
        </Link>
        <span>/</span>
        <span className="text-dark-text">{t('edit')}</span>
      </div>

      <h1 className="font-display text-2xl uppercase text-dark-text mb-6">{t('edit_profile')}</h1>

      <div className="neu-card p-6 space-y-6">
        {/* Username (readonly) */}
        <div>
          <label className="block text-sm font-medium text-dark-textMuted mb-1.5">
            Username
          </label>
          <p className="text-dark-text font-medium">@{usuario?.username}</p>
          <p className="text-xs text-dark-textMuted mt-1">
            {t('profile_username_readonly')}
          </p>
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-dark-textMuted mb-1.5"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={200}
            rows={4}
            placeholder={t('profile_bio_placeholder')}
            className="neu-inset w-full rounded-lg px-4 py-3 text-dark-text placeholder-dark-textMuted resize-none focus:outline-none focus:ring-1 focus:ring-ufc-red"
          />
          <p className="text-xs text-dark-textMuted mt-1 text-right">
            {bio.length} / 200
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Link
            href={`/arena/perfil/${usuario?.username}`}
            className="neu-button flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-dark-textMuted hover:text-dark-text transition-colors rounded-lg"
          >
            <X className="w-4 h-4" />
            {t('cancel')}
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="neu-button flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium bg-ufc-red hover:bg-ufc-redLight disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {isSaving ? t('saving') : t('save_changes')}
          </button>
        </div>
      </div>
    </div>
  );
}
