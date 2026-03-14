'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Swords, Clock } from 'lucide-react';

interface EventoData {
  id: string;
  nome: string;
  data_evento: string;
  local: string;
  tipo: string;
  total_lutas: number;
  status: string;
}

export function TabEvento() {
  const [evento, setEvento] = useState<EventoData | null>(null);
  const [picksCount, setPicksCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/eventos/proximo');
        if (!res.ok) { setIsLoading(false); return; }
        const data = await res.json();
        setEvento(data);

        const picksRes = await fetch(`/api/arena/previsoes?evento_id=${data.id}`);
        if (picksRes.ok) {
          const picksData = await picksRes.json();
          setPicksCount(Array.isArray(picksData) ? picksData.length : 0);
        }
      } catch { /* silent */ }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="space-y-4 animate-pulse"><div className="h-40 rounded-xl bg-dark-card" /></div>;
  }

  if (!evento) {
    return (
      <div className="neu-card p-6 text-center">
        <Swords className="w-10 h-10 text-dark-textMuted mx-auto mb-3" />
        <p className="text-dark-textMuted">Nenhum evento agendado.</p>
        <p className="text-sm text-dark-textMuted mt-1">Fique ligado para o proximo card!</p>
      </div>
    );
  }

  const eventDate = new Date(evento.data_evento);
  const now = new Date();
  const diffMs = eventDate.getTime() - now.getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const diffHours = Math.max(0, Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

  return (
    <div className="space-y-4">
      <div className="neu-card p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display text-xl uppercase text-white">{evento.nome}</h3>
            <div className="flex items-center gap-2 mt-1.5 text-sm text-dark-textMuted">
              <Calendar className="w-3.5 h-3.5" />
              <span>{eventDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
            {evento.local && (
              <div className="flex items-center gap-2 mt-1 text-sm text-dark-textMuted">
                <MapPin className="w-3.5 h-3.5" />
                <span>{evento.local}</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ufc-red/10 border border-ufc-red/20">
              <Clock className="w-3.5 h-3.5 text-ufc-red" />
              <span className="text-sm font-semibold text-ufc-red">
                {diffDays > 0 ? `${diffDays}d ${diffHours}h` : `${diffHours}h`}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-dark-textMuted">
            {picksCount}/{evento.total_lutas} previsoes feitas
          </span>
          <div className="w-32 h-2 rounded-full bg-dark-bg overflow-hidden">
            <div
              className="h-full rounded-full bg-ufc-red transition-all"
              style={{ width: `${evento.total_lutas > 0 ? (picksCount / evento.total_lutas) * 100 : 0}%` }}
            />
          </div>
        </div>

        <Link
          href={`/arena/evento/${evento.id}`}
          className="neu-button w-full flex items-center justify-center gap-2 py-3 bg-ufc-red hover:bg-ufc-redLight text-white font-display uppercase tracking-wide transition-colors rounded-xl"
        >
          <Swords className="w-4 h-4" />
          {picksCount > 0 ? 'Editar Previsoes' : 'Fazer Previsoes'}
        </Link>
      </div>
    </div>
  );
}
