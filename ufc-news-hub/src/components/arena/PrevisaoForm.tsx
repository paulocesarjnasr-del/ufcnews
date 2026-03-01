'use client';

import { useState } from 'react';
import { Zap, Lock, Scale } from 'lucide-react';
import FighterImage from '@/components/ui/FighterImage';
import type { LutaComLutadores, Lutador, Previsao } from '@/types';

// ═══════════════════════════════════════════════
// Types & Constants
// ═══════════════════════════════════════════════

interface PrevisaoFormProps {
  luta: LutaComLutadores;
  fingerprint: string;
  userName: string;
  onSuccess: (previsao: Previsao) => void;
}

const METODOS = [
  { value: 'KO/TKO' as const, label: 'KO/TKO', icon: Zap },
  { value: 'Submission' as const, label: 'Finalizacao', icon: Lock },
  { value: 'Decision' as const, label: 'Decisao', icon: Scale },
] as const;

type MetodoValue = (typeof METODOS)[number]['value'];

// ═══════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════

export function PrevisaoForm({
  luta,
  fingerprint,
  userName,
  onSuccess,
}: PrevisaoFormProps) {
  const [selectedLutador, setSelectedLutador] = useState<string | null>(null);
  const [metodo, setMetodo] = useState<MetodoValue | null>(null);
  const [round, setRound] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const maxRounds = luta.tipo === 'main_event' || luta.is_titulo ? 5 : 3;

  const handleSubmit = async () => {
    if (!selectedLutador) {
      setError('Selecione um vencedor');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Map "Decision" to the full DB value
      const metodoPrevisto =
        metodo === 'Decision' ? 'Decision - Unanimous' : metodo;

      const response = await fetch('/api/arena/previsoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previsoes: [
            {
              luta_id: luta.id,
              vencedor_previsto_id: selectedLutador,
              metodo_previsto: metodoPrevisto || undefined,
              round_previsto: round || undefined,
              pontos_confianca: 100,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar previsao');
      }

      if (data.erros && data.erros.length > 0) {
        throw new Error(data.erros[0]);
      }

      // Construct a Previsao object for the parent component
      const previsao: Previsao = {
        id: crypto.randomUUID(),
        luta_id: luta.id,
        usuario_fingerprint: fingerprint,
        usuario_nome: userName,
        lutador_escolhido_id: selectedLutador,
        metodo_previsto: metodoPrevisto || null,
        round_previsto: round || null,
        pontos_ganhos: 0,
        acertou_vencedor: null,
        acertou_metodo: null,
        acertou_round: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      onSuccess(previsao);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Fighter selection */}
      <div className="slide-up-fade" style={{ animationDelay: '0ms' }}>
        <label className="mb-2 block text-sm font-medium text-dark-text">
          Quem vai vencer?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <LutadorOption
            lutador={luta.lutador1}
            isSelected={selectedLutador === luta.lutador1.id}
            onClick={() => setSelectedLutador(luta.lutador1.id)}
          />
          <LutadorOption
            lutador={luta.lutador2}
            isSelected={selectedLutador === luta.lutador2.id}
            onClick={() => setSelectedLutador(luta.lutador2.id)}
          />
        </div>
      </div>

      {/* Method selection - visible after fighter is selected */}
      {selectedLutador && (
        <div className="slide-up-fade" style={{ animationDelay: '50ms' }}>
          <label className="mb-2 block text-sm font-medium text-dark-text">
            Metodo da vitoria{' '}
            <span className="text-dark-textMuted">(opcional)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {METODOS.map((m) => {
              const Icon = m.icon;
              const isSelected = metodo === m.value;
              return (
                <button
                  key={m.value}
                  onClick={() => setMetodo(isSelected ? null : m.value)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 transition-all ${
                    isSelected
                      ? 'border-ufc-red bg-ufc-red/10 text-ufc-red'
                      : 'border-dark-border bg-dark-bg text-dark-textMuted hover:border-dark-textMuted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Round selection - visible after method is selected */}
      {selectedLutador && metodo && (
        <div className="slide-up-fade" style={{ animationDelay: '100ms' }}>
          <label className="mb-2 block text-sm font-medium text-dark-text">
            Em qual round?{' '}
            <span className="text-dark-textMuted">(opcional)</span>
          </label>
          <div className="flex gap-2">
            {Array.from({ length: maxRounds }, (_, i) => i + 1).map((r) => {
              const isSelected = round === r;
              return (
                <button
                  key={r}
                  onClick={() => setRound(isSelected ? null : r)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                    isSelected
                      ? 'border-ufc-red bg-ufc-red text-white'
                      : 'border-dark-border bg-dark-bg text-dark-textMuted hover:border-dark-textMuted'
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-500/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Submit button */}
      {selectedLutador && (
        <div className="slide-up-fade" style={{ animationDelay: '150ms' }}>
          <button
            onClick={handleSubmit}
            disabled={!selectedLutador || isSubmitting}
            className="w-full rounded-xl bg-ufc-red py-3 font-display uppercase tracking-wider text-white transition-all hover:bg-ufc-redLight hover:shadow-[0_0_20px_rgba(210,10,10,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Salvando...' : 'Confirmar Previsao'}
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// Fighter Option Sub-component
// ═══════════════════════════════════════════════

interface LutadorOptionProps {
  lutador: Lutador;
  isSelected: boolean;
  onClick: () => void;
}

function LutadorOption({ lutador, isSelected, onClick }: LutadorOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-lg border-2 p-3 transition-all ${
        isSelected
          ? 'border-ufc-red bg-ufc-red/10'
          : 'border-dark-border bg-dark-bg hover:border-dark-textMuted'
      }`}
    >
      <div className="relative h-12 w-12 overflow-hidden rounded-full">
        {lutador.imagem_url ? (
          <FighterImage
            src={lutador.imagem_url}
            alt={lutador.nome}
            fill
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e] text-lg font-bold text-white/40 select-none">
            {lutador.nome
              .split(' ')
              .map((w) => w[0])
              .filter(Boolean)
              .slice(0, 2)
              .join('')
              .toUpperCase()}
          </div>
        )}
      </div>
      <span
        className={`mt-2 text-center text-sm font-medium ${
          isSelected ? 'text-ufc-red' : 'text-dark-text'
        }`}
      >
        {lutador.nome}
      </span>
      {isSelected && (
        <span className="mt-1 text-xs text-ufc-red">Selecionado</span>
      )}
    </button>
  );
}
