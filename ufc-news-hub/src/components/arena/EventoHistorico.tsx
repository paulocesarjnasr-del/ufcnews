'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Calendar, Star } from 'lucide-react';

interface HistoricoItem {
  evento_id: string;
  evento_nome: string;
  evento_data: string;
  pontos_totais: number;
  acertos: number;
  total_lutas: number;
  card_perfeito: boolean;
}

interface EventoHistoricoProps {
  username: string;
}

export function EventoHistorico({ username }: EventoHistoricoProps) {
  const t = useTranslations('arena');
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistorico() {
      try {
        const res = await fetch(`/api/arena/perfil/${username}/historico`);
        if (res.ok) {
          const data = await res.json();
          setHistorico(Array.isArray(data) ? data : []);
        }
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchHistorico();
  }, [username]);

  if (isLoading) return <div className="h-32 rounded-xl bg-dark-card animate-pulse" />;

  if (historico.length === 0) {
    return (
      <div className="neu-card p-4 text-center">
        <Calendar className="w-8 h-8 text-dark-textMuted mx-auto mb-2" />
        <p className="text-sm text-dark-textMuted">{t('no_event_history')}</p>
        <p className="text-xs text-dark-textMuted mt-1">{t('participate_to_see_results')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {historico.map((item) => {
        const date = new Date(item.evento_data);
        const accuracy = item.total_lutas > 0 ? Math.round((item.acertos / item.total_lutas) * 100) : 0;

        return (
          <div key={item.evento_id} className="neu-card p-4">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-sm uppercase text-white truncate">{item.evento_nome}</h4>
                  {item.card_perfeito && <Star className="w-4 h-4 text-ufc-gold shrink-0" />}
                </div>
                <p className="text-xs text-dark-textMuted mt-0.5">
                  {date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <p className="text-lg font-bold text-ufc-gold">{item.pontos_totais}</p>
                <p className="text-xs text-dark-textMuted">{item.acertos}/{item.total_lutas} ({accuracy}%)</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
