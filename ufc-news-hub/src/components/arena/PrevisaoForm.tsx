'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LutaComLutadores, Lutador, MetodoVitoria, Previsao } from '@/types';

interface PrevisaoFormProps {
  luta: LutaComLutadores;
  fingerprint: string;
  userName: string;
  onSuccess: (previsao: Previsao) => void;
  onCancel: () => void;
}

const METODOS: { value: MetodoVitoria; label: string }[] = [
  { value: 'KO/TKO', label: 'KO/TKO' },
  { value: 'Submission', label: 'Finalizacao' },
  { value: 'Decision - Unanimous', label: 'Decisao Unanime' },
  { value: 'Decision - Split', label: 'Decisao Dividida' },
  { value: 'Decision - Majority', label: 'Decisao Majoritaria' },
];

export function PrevisaoForm({
  luta,
  fingerprint,
  userName,
  onSuccess,
  onCancel,
}: PrevisaoFormProps) {
  const [selectedLutador, setSelectedLutador] = useState<string | null>(null);
  const [metodo, setMetodo] = useState<MetodoVitoria | ''>('');
  const [round, setRound] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedLutador) {
      setError('Selecione um vencedor');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/previsoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          luta_id: luta.id,
          usuario_fingerprint: fingerprint,
          usuario_nome: userName,
          lutador_escolhido_id: selectedLutador,
          metodo_previsto: metodo || undefined,
          round_previsto: round || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar previsao');
      }

      onSuccess(data.previsao);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Selecao de lutador */}
      <div>
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

      {/* Metodo (opcional) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-dark-text">
          Metodo da vitoria{' '}
          <span className="text-dark-textMuted">(+5 pontos)</span>
        </label>
        <select
          value={metodo}
          onChange={(e) => setMetodo(e.target.value as MetodoVitoria | '')}
          className="w-full rounded border border-dark-border bg-dark-bg px-3 py-2 text-dark-text focus:border-ufc-red focus:outline-none"
        >
          <option value="">Nao sei / Qualquer</option>
          {METODOS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      {/* Round (opcional) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-dark-text">
          Em qual round?{' '}
          <span className="text-dark-textMuted">(+10 pontos)</span>
        </label>
        <select
          value={round}
          onChange={(e) =>
            setRound(e.target.value ? parseInt(e.target.value) : '')
          }
          className="w-full rounded border border-dark-border bg-dark-bg px-3 py-2 text-dark-text focus:border-ufc-red focus:outline-none"
        >
          <option value="">Nao sei / Qualquer</option>
          {Array.from({ length: luta.rounds }, (_, i) => i + 1).map((r) => (
            <option key={r} value={r}>
              Round {r}
            </option>
          ))}
        </select>
      </div>

      {/* Resumo de pontos */}
      <div className="rounded bg-dark-bg/50 p-3">
        <p className="text-sm text-dark-textMuted">Pontos possiveis:</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <span className="rounded bg-ufc-red/20 px-2 py-1 text-xs text-ufc-red">
            Vencedor: +10 pts
          </span>
          {metodo && (
            <span className="rounded bg-ufc-gold/20 px-2 py-1 text-xs text-ufc-gold">
              Metodo: +5 pts
            </span>
          )}
          {round && (
            <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">
              Round: +10 pts
            </span>
          )}
        </div>
        <p className="mt-2 text-sm font-bold text-dark-text">
          Total possivel: {10 + (metodo ? 5 : 0) + (round ? 10 : 0)} pontos
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded bg-red-500/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Botoes */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 rounded border border-dark-border px-4 py-2 text-dark-textMuted transition-colors hover:bg-dark-border"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selectedLutador || isSubmitting}
          className="flex-1 rounded bg-ufc-red px-4 py-2 font-bold text-white transition-colors hover:bg-ufc-redLight disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Confirmar Previsao'}
        </button>
      </div>
    </div>
  );
}

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
          <Image
            src={lutador.imagem_url}
            alt={lutador.nome}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-dark-border text-lg font-bold text-dark-textMuted">
            {lutador.nome.charAt(0)}
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
