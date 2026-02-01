'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Evento } from '@/types';
import { Countdown } from '@/components/calendario/Countdown';

interface EventoCardProps {
  evento: Evento & { total_lutas?: number };
  featured?: boolean;
}

export function EventoCard({ evento, featured = false }: EventoCardProps) {
  const dataEvento = new Date(evento.data_evento);
  const isPast = dataEvento < new Date();

  return (
    <Link href={`/arena/evento/${evento.id}`}>
      <div
        className={`group relative overflow-hidden rounded-lg border border-dark-border bg-dark-card transition-all duration-300 hover:border-ufc-red/50 hover:bg-dark-cardHover ${
          featured ? 'md:col-span-2' : ''
        }`}
      >
        {/* Imagem de fundo */}
        {evento.imagem_url && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={evento.imagem_url}
              alt={evento.nome}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/80 to-transparent" />
          </div>
        )}

        <div className="relative p-4 md:p-6">
          {/* Badge de tipo */}
          <div className="mb-3 flex items-center justify-between">
            <span
              className={`rounded px-2 py-1 text-xs font-bold uppercase ${
                evento.tipo === 'PPV'
                  ? 'bg-ufc-red text-white'
                  : 'bg-dark-border text-dark-textMuted'
              }`}
            >
              {evento.tipo}
            </span>
            {evento.status === 'finalizado' && (
              <span className="rounded bg-dark-border px-2 py-1 text-xs font-bold uppercase text-dark-textMuted">
                Finalizado
              </span>
            )}
            {evento.status === 'ao_vivo' && (
              <span className="flex items-center gap-1 rounded bg-ufc-red px-2 py-1 text-xs font-bold uppercase text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                </span>
                AO VIVO
              </span>
            )}
          </div>

          {/* Nome do evento */}
          <h3 className="font-display text-xl uppercase text-dark-text transition-colors group-hover:text-ufc-red md:text-2xl">
            {evento.nome}
          </h3>

          {/* Local e data */}
          <div className="mt-2 space-y-1 text-sm text-dark-textMuted">
            <p>
              {dataEvento.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            {evento.local_evento && (
              <p>
                {evento.local_evento}
                {evento.cidade && `, ${evento.cidade}`}
              </p>
            )}
          </div>

          {/* Countdown ou Info */}
          <div className="mt-4">
            {!isPast && evento.status === 'agendado' ? (
              <Countdown targetDate={evento.data_evento} compact />
            ) : (
              <div className="flex items-center gap-4">
                {evento.total_lutas !== undefined && (
                  <span className="text-sm text-dark-textMuted">
                    {evento.total_lutas} lutas
                  </span>
                )}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-ufc-red">
            {isPast ? 'Ver resultados' : 'Fazer previsoes'}
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
