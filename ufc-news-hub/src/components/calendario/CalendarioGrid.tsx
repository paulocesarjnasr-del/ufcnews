'use client';

import { Evento } from '@/types';
import { EventoCard } from '@/components/arena/EventoCard';

interface CalendarioGridProps {
  eventos: (Evento & { total_lutas?: number })[];
  isLoading?: boolean;
}

export function CalendarioGrid({ eventos, isLoading }: CalendarioGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-lg bg-dark-card border border-dark-border"
          />
        ))}
      </div>
    );
  }

  if (eventos.length === 0) {
    return (
      <div className="rounded-lg border border-dark-border bg-dark-card p-8 text-center">
        <p className="text-dark-textMuted">Nenhum evento encontrado</p>
      </div>
    );
  }

  // Agrupar eventos por mes
  const eventosPorMes = eventos.reduce<Record<string, typeof eventos>>(
    (acc, evento) => {
      const data = new Date(evento.data_evento);
      const mesAno = data.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      });
      const key = mesAno.charAt(0).toUpperCase() + mesAno.slice(1);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(evento);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-8">
      {Object.entries(eventosPorMes).map(([mesAno, eventosDoMes]) => (
        <div key={mesAno}>
          <h2 className="mb-4 font-display text-xl uppercase text-dark-text border-b border-dark-border pb-2">
            {mesAno}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventosDoMes.map((evento, index) => (
              <EventoCard
                key={evento.id}
                evento={evento}
                featured={index === 0 && evento.tipo === 'PPV'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
