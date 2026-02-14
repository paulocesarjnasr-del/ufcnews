'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';

export default function AdminAnalisesPage() {
  const [secret, setSecret] = useState('');
  const [eventoId, setEventoId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [migrateStatus, setMigrateStatus] = useState<string>('');

  async function handleMigrate() {
    if (!secret) return alert('Enter the cron secret');
    setMigrateStatus('Running migration...');
    try {
      const res = await fetch(`/api/admin/migrate-analises?secret=${secret}`, { method: 'POST' });
      const data = await res.json();
      setMigrateStatus(data.success ? '✅ Migration complete!' : `❌ ${data.error}`);
    } catch (err) {
      setMigrateStatus(`❌ Error: ${err}`);
    }
  }

  async function handleGenerate() {
    if (!secret) return alert('Enter the cron secret');
    setStatus('loading');
    setResult(null);
    try {
      const res = await fetch(`/api/analises/generate?secret=${secret}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: eventoId ? JSON.stringify({ evento_id: eventoId }) : '{}',
      });
      const data = await res.json();
      setResult(data);
      setStatus(res.ok ? 'success' : 'error');
    } catch (err) {
      setResult({ error: String(err) });
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-dark-textMuted">
          <Link href="/" className="hover:text-ufc-red">Home</Link>
          <span>/</span>
          <span className="text-dark-text">Admin - Análises</span>
        </div>

        <h1 className="mb-6 font-display text-3xl uppercase text-dark-text">
          ⚙️ Admin: <span className="text-ufc-red">Análises</span>
        </h1>

        {/* Auth */}
        <div className="mb-6 rounded-lg border border-dark-border bg-dark-card p-6">
          <label className="mb-2 block text-sm text-dark-textMuted">Cron Secret</label>
          <input
            type="password"
            value={secret}
            onChange={e => setSecret(e.target.value)}
            className="w-full rounded bg-dark-bg border border-dark-border px-4 py-2 text-dark-text focus:border-ufc-red focus:outline-none"
            placeholder="Enter CRON_SECRET..."
          />
        </div>

        {/* Migration */}
        <div className="mb-6 rounded-lg border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 font-display text-xl uppercase text-dark-text">1. Database Migration</h2>
          <p className="mb-4 text-sm text-dark-textMuted">
            Run this first to create the analises table. Safe to run multiple times.
          </p>
          <button
            onClick={handleMigrate}
            className="rounded bg-ufc-gold px-6 py-2 font-bold text-black transition-colors hover:bg-ufc-goldDark"
          >
            Run Migration
          </button>
          {migrateStatus && <p className="mt-3 text-sm text-dark-text">{migrateStatus}</p>}
        </div>

        {/* Generate */}
        <div className="mb-6 rounded-lg border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 font-display text-xl uppercase text-dark-text">2. Generate Analysis</h2>
          <p className="mb-4 text-sm text-dark-textMuted">
            Generates a full tactical analysis for the next upcoming event (or a specific event).
          </p>
          <div className="mb-4">
            <label className="mb-2 block text-sm text-dark-textMuted">Event ID (optional - leave blank for next event)</label>
            <input
              type="text"
              value={eventoId}
              onChange={e => setEventoId(e.target.value)}
              className="w-full rounded bg-dark-bg border border-dark-border px-4 py-2 text-dark-text focus:border-ufc-red focus:outline-none"
              placeholder="UUID of specific event..."
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={status === 'loading'}
            className="rounded bg-ufc-red px-6 py-2 font-bold text-white transition-colors hover:bg-ufc-redDark disabled:opacity-50"
          >
            {status === 'loading' ? '⏳ Generating (may take 30-60s)...' : '🚀 Generate Analysis'}
          </button>

          {result && (
            <div className={`mt-4 rounded p-4 ${status === 'success' ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
              <pre className="text-sm text-dark-text whitespace-pre-wrap overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
              {status === 'success' && (result as { slug?: string }).slug && (
                <Link 
                  href={`/analise/${(result as { slug?: string }).slug}`}
                  className="mt-3 inline-block text-ufc-red hover:underline font-bold"
                >
                  → View Analysis
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="rounded-lg border border-dark-border bg-dark-card p-6">
          <h2 className="mb-4 font-display text-xl uppercase text-dark-text">Links</h2>
          <div className="space-y-2">
            <Link href="/analises" className="block text-ufc-red hover:underline">📊 Ver todas as análises</Link>
            <Link href="/calendario" className="block text-ufc-red hover:underline">📅 Calendário de eventos</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
