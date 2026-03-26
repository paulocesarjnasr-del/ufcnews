'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  ChevronLeft, Globe, Eye, EyeOff, Swords, BarChart3,
  Trophy, MessageCircle, Skull, DollarSign,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useArenaAuth } from '@/hooks/useArenaAuth';

// ═══════════════════════════════════════════════════════════
// Toggle component
// ═══════════════════════════════════════════════════════════

function Toggle({
  label,
  description,
  icon: Icon,
  value,
  onChange,
}: {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="w-full flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left"
    >
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${value ? 'text-ufc-red' : 'text-white/30'}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-[11px] text-white/30 mt-0.5">{description}</div>
      </div>
      <div className={`relative w-10 h-6 rounded-full transition-colors shrink-0 mt-0.5 ${value ? 'bg-ufc-red' : 'bg-white/10'}`}>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════
// Selector component (A or B)
// ═══════════════════════════════════════════════════════════

function Selector({
  label,
  icon: Icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  options: { key: string; label: string; desc: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-white/50">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map(opt => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`p-3 rounded-xl text-left transition-all ${
              value === opt.key
                ? 'bg-ufc-red/15 border border-ufc-red/50'
                : 'bg-white/5 border border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`text-xs font-semibold ${value === opt.key ? 'text-ufc-red' : 'text-white/60'}`}>
              {opt.label}
            </div>
            <div className="text-[10px] text-white/25 mt-0.5">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Main Page
// ═══════════════════════════════════════════════════════════

export default function CriarLigaPage() {
  const t = useTranslations('arena');
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useArenaAuth();

  // Basic
  const [nome, setNome] = useState('');
  const [isPrivada, setIsPrivada] = useState(true);

  // Config
  const [mostrarPicksAntes, setMostrarPicksAntes] = useState(false);
  const [revelarPicksAoVivo, setRevelarPicksAoVivo] = useState(false);
  const [apenasMainCard, setApenasMainCard] = useState(false);
  const [rankingTipo, setRankingTipo] = useState('pontos');
  const [chatAtivo, setChatAtivo] = useState(true);

  // Fun
  const [punicaoTexto, setPunicaoTexto] = useState('');
  const [apostaRodada, setApostaRodada] = useState('');

  // State
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/arena/login');
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (nome.trim().length < 3 || nome.trim().length > 50) {
      setError(t('error_league_name'));
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/arena/ligas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          tipo: isPrivada ? 'privada' : 'publica',
          mostrar_picks_antes: mostrarPicksAntes,
          revelar_picks_ao_vivo: revelarPicksAoVivo,
          apenas_main_card: apenasMainCard,
          ranking_tipo: rankingTipo,
          chat_ativo: chatAtivo,
          punicao_texto: punicaoTexto.trim() || undefined,
          aposta_rodada: apostaRodada.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push(`/arena/ligas/${data.liga.id}`);
      } else {
        setError(data.error || t('error_create_league'));
      }
    } catch {
      setError(t('error_connection'));
    }
    setIsLoading(false);
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ufc-red" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      {/* Header */}
      <Link
        href="/arena/ligas"
        className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        {t('league_back')}
      </Link>

      <h1 className="font-display text-3xl uppercase text-white mb-2 text-center">
        {t('league_create_title')} <span className="text-ufc-gold">{t('league_create_title_accent')}</span>
      </h1>
      <p className="text-xs text-white/30 text-center mb-8">
        {t('league_create_subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* ── BASICO ── */}
        <div className="space-y-3">
          <div className="text-[10px] font-display uppercase tracking-widest text-white/25">
            {t('league_create_basic')}
          </div>

          {/* Nome */}
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
            minLength={3}
            maxLength={50}
            placeholder={t('league_name')}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-ufc-red/50 transition-colors"
          />

          {/* Tipo */}
          <Selector
            label={t('league_type')}
            icon={Globe}
            value={isPrivada ? 'privada' : 'publica'}
            onChange={v => setIsPrivada(v === 'privada')}
            options={[
              { key: 'privada', label: t('private'), desc: t('league_create_private_desc') },
              { key: 'publica', label: t('public'), desc: t('league_create_public_desc') },
            ]}
          />
        </div>

        {/* ── VISIBILIDADE ── */}
        <div className="space-y-3">
          <div className="text-[10px] font-display uppercase tracking-widest text-white/25">
            {t('league_create_visibility')}
          </div>

          <Toggle
            label={t('show_picks_before')}
            description={t('show_picks_desc')}
            icon={Eye}
            value={mostrarPicksAntes}
            onChange={setMostrarPicksAntes}
          />

          {!mostrarPicksAntes && (
            <Toggle
              label={t('league_create_reveal_live')}
              description={t('league_create_reveal_live_desc')}
              icon={EyeOff}
              value={revelarPicksAoVivo}
              onChange={setRevelarPicksAoVivo}
            />
          )}
        </div>

        {/* ── COMPETICAO ── */}
        <div className="space-y-3">
          <div className="text-[10px] font-display uppercase tracking-widest text-white/25">
            {t('league_create_competition')}
          </div>

          <Toggle
            label={t('main_card_only')}
            description={t('main_card_only_desc')}
            icon={Swords}
            value={apenasMainCard}
            onChange={setApenasMainCard}
          />

          <Selector
            label={t('ranking_by')}
            icon={BarChart3}
            value={rankingTipo}
            onChange={setRankingTipo}
            options={[
              { key: 'pontos', label: t('by_points'), desc: t('league_create_points_desc') },
              { key: 'percentual', label: t('by_percentage'), desc: t('league_create_percentage_desc') },
            ]}
          />
        </div>

        {/* ── DIVERSAO ── */}
        <div className="space-y-3">
          <div className="text-[10px] font-display uppercase tracking-widest text-white/25">
            {t('league_create_fun')}
          </div>

          {/* Punicao */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-white/50">
              <Skull className="w-4 h-4" />
              {t('loser_penalty')}
            </div>
            <input
              type="text"
              value={punicaoTexto}
              onChange={e => setPunicaoTexto(e.target.value)}
              placeholder={t('league_create_penalty_placeholder')}
              maxLength={200}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-ufc-red/50 transition-colors"
            />
          </div>

          {/* Aposta */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-white/50">
              <DollarSign className="w-4 h-4" />
              {t('round_bet')}
            </div>
            <input
              type="text"
              value={apostaRodada}
              onChange={e => setApostaRodada(e.target.value)}
              placeholder={t('league_create_bet_placeholder')}
              maxLength={100}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-ufc-red/50 transition-colors"
            />
          </div>

          <Toggle
            label={t('league_chat')}
            description={t('chat_desc')}
            icon={MessageCircle}
            value={chatAtivo}
            onChange={setChatAtivo}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || nome.trim().length < 3}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-ufc-red hover:bg-ufc-redLight text-white font-display uppercase tracking-wide rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
        >
          <Trophy className="w-4 h-4" />
          {isLoading ? t('creating') : t('create_league')}
        </button>
      </form>
    </div>
  );
}
