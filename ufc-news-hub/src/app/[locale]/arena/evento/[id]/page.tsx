'use client';

import { useState, useEffect, useCallback, useMemo, use } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Trophy, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useArenaAuth } from '@/hooks/useArenaAuth';
import type { EventoComLutas } from '@/types';
import { SwipeCard } from '@/components/arena/SwipeCard';
import { PickSummary } from '@/components/arena/PickSummary';
import { PickEditScreen } from '@/components/arena/PickEditScreen';
import { type PickData, sortLutas } from '@/components/arena/picks-shared';

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

interface PageProps { params: Promise<{ id: string }> }

type PageStep = 'swipe' | 'summary' | 'edit';

// ═══════════════════════════════════════════════════════════
// Page Controller
// ═══════════════════════════════════════════════════════════

export default function EventoArenaPage({ params }: PageProps) {
  const { id } = use(params);
  const t = useTranslations('arena');
  const { isAuthenticated, isLoading: authLoading } = useArenaAuth();
  const router = useRouter();

  const [evento, setEvento] = useState<EventoComLutas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [picks, setPicks] = useState<Record<string, PickData>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<PageStep>('swipe');
  const [initialPicksLoaded, setInitialPicksLoaded] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/arena/login?redirect=/arena/evento/${id}`);
    }
  }, [authLoading, isAuthenticated, router, id]);

  // Load evento
  useEffect(() => {
    async function fetchEvento() {
      try {
        const res = await fetch(`/api/eventos/${id}`);
        if (res.ok) setEvento(await res.json() as EventoComLutas);
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchEvento();
  }, [id]);

  // Load existing picks from API
  useEffect(() => {
    if (!isAuthenticated || !evento) return;
    async function fetchPicks() {
      try {
        const res = await fetch(`/api/arena/previsoes?evento_id=${id}`);
        if (!res.ok) return;
        const data: unknown = await res.json();
        const arr = Array.isArray(data)
          ? (data as Array<Record<string, unknown>>)
          : ((data as { previsoes?: Array<Record<string, unknown>> }).previsoes ?? []);
        const p: Record<string, PickData> = {};
        for (const item of arr) {
          const lutaId = typeof item.luta_id === 'string' ? item.luta_id : null;
          const vencedorId = typeof item.vencedor_previsto_id === 'string' ? item.vencedor_previsto_id : null;
          if (!lutaId || !vencedorId) continue;
          p[lutaId] = {
            vencedor_id: vencedorId,
            metodo: typeof item.metodo_previsto === 'string' ? item.metodo_previsto : undefined,
            round: typeof item.round_previsto === 'number' ? item.round_previsto : undefined,
          };
        }
        setPicks(p);

        // Find where user should resume
        const sorted = sortLutas(evento!.lutas);
        if (Object.keys(p).length === sorted.length) {
          setStep('summary');
        } else {
          const firstUnpicked = sorted.findIndex(l => !p[l.id]?.vencedor_id);
          if (firstUnpicked >= 0) setCurrentIndex(firstUnpicked);
        }
      } catch { /* silent */ }
      setInitialPicksLoaded(true);
    }
    fetchPicks();
  }, [isAuthenticated, evento, id]);

  // Save pick to API
  const savePick = useCallback(async (lutaId: string, pick: PickData) => {
    try {
      setSaveError(null);
      const res = await fetch('/api/arena/previsoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previsoes: [{
            luta_id: lutaId,
            vencedor_previsto_id: pick.vencedor_id,
            pontos_confianca: 100,
            ...(pick.metodo ? { metodo_previsto: pick.metodo } : {}),
            ...(pick.round ? { round_previsto: pick.round } : {}),
          }],
        }),
      });
      if (!res.ok) setSaveError(t('error_save_prediction'));
    } catch {
      setSaveError(t('error_connection'));
    }
  }, []);

  const sortedLutas = useMemo(() => evento ? sortLutas(evento.lutas) : [], [evento]);
  const totalLutas = sortedLutas.length;

  // Swipe handlers
  const handlePickVencedor = useCallback((vencedorId: string) => {
    if (!sortedLutas[currentIndex]) return;
    const lutaId = sortedLutas[currentIndex].id;
    setPicks(prev => ({
      ...prev,
      [lutaId]: { ...prev[lutaId], vencedor_id: vencedorId },
    }));
    void savePick(lutaId, { vencedor_id: vencedorId });
  }, [currentIndex, sortedLutas, savePick]);

  const handlePickDetail = useCallback((metodo?: string, round?: number) => {
    if (!sortedLutas[currentIndex]) return;
    const lutaId = sortedLutas[currentIndex].id;
    setPicks(prev => {
      const existing = prev[lutaId];
      if (!existing?.vencedor_id) return prev;
      const updated = { ...existing, metodo, round };
      void savePick(lutaId, updated);
      return { ...prev, [lutaId]: updated };
    });
  }, [currentIndex, sortedLutas, savePick]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalLutas - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep('summary');
    }
  }, [currentIndex, totalLutas]);

  // Edit screen handler
  const handleEditPick = useCallback((lutaId: string, pick: PickData) => {
    setPicks(prev => ({ ...prev, [lutaId]: pick }));
    void savePick(lutaId, pick);
  }, [savePick]);

  // Loading or redirecting
  if (authLoading || !isAuthenticated || isLoading || !initialPicksLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Clock className="w-6 h-6 text-ufc-red animate-spin" />
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <p className="font-display text-2xl text-white/40 uppercase">{t('evento_not_found')}</p>
        <Link href="/arena" className="text-ufc-red hover:underline text-sm">{t('evento_back')}</Link>
      </div>
    );
  }

  const posterUrl = (evento as EventoComLutas & { poster_url?: string }).poster_url ?? evento.imagem_url;
  const picksCount = Object.values(picks).filter(p => p.vencedor_id).length;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Poster background */}
      {posterUrl && (
        <>
          <Image src={posterUrl} alt="" fill className="object-cover object-top" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
        </>
      )}
      {!posterUrl && <div className="absolute inset-0 bg-octagon-grid" />}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => {
              if (step === 'edit') setStep('summary');
              else if (step === 'summary') { setStep('swipe'); setCurrentIndex(totalLutas - 1); }
              else if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
              else window.history.back();
            }}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 'edit' ? t('evento_summary') : step === 'summary' ? t('evento_back_short') : currentIndex > 0 ? t('evento_previous') : 'Home'}
          </button>

          {step === 'swipe' && picksCount > 0 && (
            <button
              onClick={() => setStep('summary')}
              className="flex items-center gap-1.5 text-sm text-ufc-red hover:text-ufc-redLight transition-colors py-1.5 px-3 rounded-lg bg-ufc-red/10 hover:bg-ufc-red/15 border border-ufc-red/20"
            >
              <Trophy className="w-3.5 h-3.5" />
              {t('evento_summary')} ({picksCount}/{totalLutas})
            </button>
          )}
        </div>

        {/* Main content */}
        <div className={`flex-1 flex justify-center px-4 pt-2 pb-4 ${step === 'edit' ? 'items-start overflow-y-auto' : 'items-start'}`}>
          {step === 'swipe' && sortedLutas[currentIndex] && (
            <SwipeCard
              luta={sortedLutas[currentIndex]}
              index={currentIndex}
              total={totalLutas}
              pick={picks[sortedLutas[currentIndex].id]}
              saveError={saveError}
              onPickVencedor={handlePickVencedor}
              onPickDetail={handlePickDetail}
              onNext={handleNext}
            />
          )}
          {step === 'summary' && (
            <PickSummary
              lutas={sortedLutas}
              picks={picks}
              eventoNome={evento.nome}
              eventoId={evento.id}
              onGoToEdit={() => setStep('edit')}
            />
          )}
          {step === 'edit' && (
            <PickEditScreen
              lutas={sortedLutas}
              picks={picks}
              onUpdatePick={handleEditPick}
              onDone={() => setStep('summary')}
            />
          )}
        </div>

        {/* Spacer for bottom nav */}
        {step === 'swipe' && <div className="h-4" />}
      </div>
    </div>
  );
}
