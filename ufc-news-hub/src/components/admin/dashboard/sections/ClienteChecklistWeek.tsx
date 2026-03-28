'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../AdminAuthContext';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  SkipForward,
  Loader2,
} from 'lucide-react';
import type { ClienteEntrega, DiaSemana, StatusEntrega } from '@/lib/clientes-types';

interface ClienteChecklistWeekProps {
  clienteId: string;
}

const DIAS_ORDEM: DiaSemana[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

const DIA_LABELS: Record<DiaSemana, string> = {
  segunda: 'Seg',
  terca: 'Ter',
  quarta: 'Qua',
  quinta: 'Qui',
  sexta: 'Sex',
  sabado: 'Sab',
  domingo: 'Dom',
};

const DIA_LABELS_FULL: Record<DiaSemana, string> = {
  segunda: 'Segunda',
  terca: 'Terca',
  quarta: 'Quarta',
  quinta: 'Quinta',
  sexta: 'Sexta',
  sabado: 'Sabado',
  domingo: 'Domingo',
};

function getSegundaDaSemana(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

function formatSemana(semanaInicio: string): string {
  const d = new Date(semanaInicio + 'T12:00:00');
  const fim = new Date(d);
  fim.setDate(d.getDate() + 6);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')} - ${fim.getDate().toString().padStart(2, '0')}/${(fim.getMonth() + 1).toString().padStart(2, '0')}`;
}

function getNextStatus(current: StatusEntrega): StatusEntrega {
  switch (current) {
    case 'pendente': return 'em_progresso';
    case 'em_progresso': return 'concluido';
    case 'concluido': return 'pendente';
    case 'pulado': return 'pendente';
    case 'atrasado': return 'em_progresso';
    default: return 'pendente';
  }
}

function getStatusStyle(status: StatusEntrega) {
  switch (status) {
    case 'concluido':
      return 'border-l-2 border-l-emerald-500 bg-emerald-500/5';
    case 'em_progresso':
      return 'border-l-2 border-l-blue-500 bg-blue-500/5';
    case 'atrasado':
      return 'border-l-2 border-l-red-500 bg-red-500/5';
    case 'pulado':
      return 'border-l-2 border-l-gray-600 opacity-50';
    default:
      return 'border-l-2 border-l-transparent';
  }
}

function getStatusIcon(status: StatusEntrega) {
  switch (status) {
    case 'concluido': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    case 'em_progresso': return <Clock className="w-4 h-4 text-blue-400" />;
    case 'atrasado': return <Clock className="w-4 h-4 text-red-400" />;
    case 'pulado': return <SkipForward className="w-4 h-4 text-gray-500" />;
    default: return <Circle className="w-4 h-4 text-gray-600" />;
  }
}

export function ClienteChecklistWeek({ clienteId }: ClienteChecklistWeekProps) {
  const { authFetch } = useAdminAuth();
  const [semana, setSemana] = useState(getSegundaDaSemana());
  const [entregas, setEntregas] = useState<ClienteEntrega[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchChecklist = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/admin/clientes/${clienteId}/checklist?semana=${semana}`);
      if (!res.ok) throw new Error('Erro ao buscar checklist');
      const data = await res.json() as { entregas: ClienteEntrega[] };
      setEntregas(data.entregas);
    } catch (err) {
      console.error('Erro ao buscar checklist:', err);
    } finally {
      setLoading(false);
    }
  }, [authFetch, clienteId, semana]);

  useEffect(() => {
    fetchChecklist();
  }, [fetchChecklist]);

  const toggleEntrega = async (entrega: ClienteEntrega) => {
    const newStatus = getNextStatus(entrega.status);
    setUpdating(entrega.id);

    // Optimistic update
    setEntregas((prev) =>
      prev.map((e) => (e.id === entrega.id ? { ...e, status: newStatus } : e))
    );

    try {
      await authFetch(`/api/admin/clientes/${clienteId}/checklist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entrega_id: entrega.id, status: newStatus }),
      });
    } catch {
      // Revert on failure
      setEntregas((prev) =>
        prev.map((e) => (e.id === entrega.id ? { ...e, status: entrega.status } : e))
      );
    } finally {
      setUpdating(null);
    }
  };

  const navigateWeek = (direction: -1 | 1) => {
    const d = new Date(semana + 'T12:00:00');
    d.setDate(d.getDate() + direction * 7);
    setSemana(d.toISOString().split('T')[0]);
  };

  const isCurrentWeek = semana === getSegundaDaSemana();

  // Group entregas by dia_semana
  const entregasByDia = DIAS_ORDEM.reduce<Record<DiaSemana, ClienteEntrega[]>>((acc, dia) => {
    acc[dia] = entregas.filter((e) => e.dia_semana === dia);
    return acc;
  }, {} as Record<DiaSemana, ClienteEntrega[]>);

  const totalEntregas = entregas.length;
  const concluidas = entregas.filter((e) => e.status === 'concluido').length;
  const percentual = totalEntregas > 0 ? Math.round((concluidas / totalEntregas) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Week Navigator */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateWeek(-1)}
          className="neu-button p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <p className="text-white font-semibold text-sm">{formatSemana(semana)}</p>
          {isCurrentWeek && (
            <span className="text-[10px] text-ufc-red font-bold uppercase">Semana Atual</span>
          )}
        </div>

        <button
          onClick={() => navigateWeek(1)}
          className="neu-button p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>{concluidas}/{totalEntregas} entregas</span>
          <span>{percentual}%</span>
        </div>
        <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${percentual}%` }}
          />
        </div>
      </div>

      {/* Checklist Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-ufc-red" />
        </div>
      ) : (
        <div className="space-y-4">
          {DIAS_ORDEM.map((dia) => {
            const items = entregasByDia[dia];
            if (items.length === 0) return null;

            return (
              <div key={dia}>
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2 flex items-center gap-2">
                  <span className="text-ufc-red">{DIA_LABELS[dia]}</span>
                  <span>{DIA_LABELS_FULL[dia]}</span>
                  <span className="text-gray-600">
                    ({items.filter((i) => i.status === 'concluido').length}/{items.length})
                  </span>
                </h4>

                <div className="space-y-1.5">
                  {items.map((entrega) => (
                    <button
                      key={entrega.id}
                      onClick={() => toggleEntrega(entrega)}
                      disabled={updating === entrega.id}
                      className={`w-full text-left neu-inset px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all hover:bg-[#1a1a2e] ${getStatusStyle(entrega.status)}`}
                    >
                      {updating === entrega.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400 shrink-0" />
                      ) : (
                        getStatusIcon(entrega.status)
                      )}
                      <span className={`text-sm flex-1 ${
                        entrega.status === 'concluido' ? 'text-gray-400 line-through' :
                        entrega.status === 'pulado' ? 'text-gray-600 line-through' :
                        'text-gray-200'
                      }`}>
                        {entrega.titulo}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
