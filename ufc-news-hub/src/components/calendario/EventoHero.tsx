'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CountdownFlip from './CountdownFlip';
import FighterFaceOff from './FighterFaceOff';
import LivePulse from './LivePulse';

interface Fighter {
  id: string;
  nome: string;
  apelido?: string | null;
  imagem_url?: string | null;
  pais?: string | null;
  vitorias?: number;
  derrotas?: number;
  empates?: number;
}

interface MainEvent {
  id: string;
  categoria_peso: string;
  is_titulo: boolean;
  rounds: number;
  lutador1: Fighter;
  lutador2: Fighter;
}

interface EventoHeroProps {
  evento: {
    id: string;
    nome: string;
    slug: string;
    data_evento: string;
    local_evento?: string;
    cidade?: string;
    pais?: string;
    tipo?: string;
    status?: string;
    poster_url?: string | null;
    imagem_url?: string | null;
  };
  main_event?: MainEvent | null;
}

export default function EventoHero({ evento, main_event }: EventoHeroProps) {
  const eventDate = new Date(evento.data_evento);
  const isLive = evento.status === 'ao_vivo';
  const isPast = evento.status === 'finalizado' || eventDate < new Date();

  const formattedDate = format(eventDate, "EEEE, d 'de' MMMM", { locale: ptBR });
  const formattedTime = format(eventDate, 'HH:mm', { locale: ptBR });

  // Badge do tipo de evento
  const typeBadge = {
    PPV: { bg: 'bg-ufc-gold/20', border: 'border-ufc-gold/40', text: 'text-ufc-gold', label: 'PPV' },
    'Fight Night': { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400', label: 'FIGHT NIGHT' },
    Apex: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400', label: 'UFC APEX' },
  }[evento.tipo || 'Fight Night'] || { bg: 'bg-dark-card', border: 'border-dark-border', text: 'text-dark-textMuted', label: evento.tipo };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dark-card via-dark-bg to-dark-card border border-dark-border">
      {/* Background image */}
      {(evento.poster_url || evento.imagem_url) && (
        <div className="absolute inset-0 opacity-10">
          <Image
            src={evento.poster_url || evento.imagem_url || ''}
            alt=""
            fill
            className="object-cover blur-sm"
            priority
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 lg:p-12">
        {/* Top badges */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 ${typeBadge.bg} border ${typeBadge.border} rounded-full text-xs font-bold ${typeBadge.text} uppercase tracking-wider`}>
              {typeBadge.label}
            </span>
            {isLive && <LivePulse />}
          </div>

          {/* Countdown badge for mobile */}
          {!isPast && !isLive && (
            <div className="sm:hidden">
              <CountdownFlip targetDate={eventDate} compact />
            </div>
          )}
        </div>

        {/* Event title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-2 animate-fade-in-up">
            {evento.nome}
          </h1>
          <p className="text-lg sm:text-xl text-dark-textMuted capitalize">
            {formattedDate} <span className="text-ufc-red">|</span> {formattedTime} BRT
          </p>
          {(evento.local_evento || evento.cidade) && (
            <p className="mt-1 text-sm sm:text-base text-dark-textMuted flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {evento.local_evento}{evento.cidade ? `, ${evento.cidade}` : ''}{evento.pais ? `, ${evento.pais}` : ''}
            </p>
          )}
        </div>

        {/* Main Event Face-off */}
        {main_event && (
          <div className="mb-8">
            <FighterFaceOff
              lutador1={main_event.lutador1}
              lutador2={main_event.lutador2}
              categoria_peso={main_event.categoria_peso}
              is_titulo={main_event.is_titulo}
            />
          </div>
        )}

        {/* Countdown - Desktop */}
        {!isPast && !isLive && (
          <div className="hidden sm:flex justify-center mb-8">
            <CountdownFlip targetDate={eventDate} />
          </div>
        )}

        {/* Live status message */}
        {isLive && (
          <div className="flex justify-center mb-8">
            <LivePulse variant="large" />
          </div>
        )}

        {/* Finished status */}
        {isPast && !isLive && (
          <div className="flex justify-center mb-8">
            <span className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-dark-textMuted font-medium">
              EVENTO FINALIZADO
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/calendario/evento/${evento.id}`}
            className="w-full sm:w-auto px-8 py-3 bg-ufc-red hover:bg-ufc-redDark text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-ufc-red/30 text-center"
          >
            VER CARD COMPLETO
          </Link>

          {!isPast && (
            <Link
              href={`/arena/evento/${evento.id}`}
              className="w-full sm:w-auto px-8 py-3 bg-dark-card hover:bg-dark-cardHover border border-dark-border text-white font-bold rounded-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-ufc-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              FAZER PREVISOES
            </Link>
          )}
        </div>
      </div>

      {/* Bottom gradient decoration */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-ufc-red to-transparent" />
    </section>
  );
}
