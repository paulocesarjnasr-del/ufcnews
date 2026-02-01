'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LivePulse from './LivePulse';
import CountdownFlip from './CountdownFlip';

interface EventoCardEnhancedProps {
  evento: {
    id: string;
    nome: string;
    slug?: string;
    data_evento: string;
    local_evento?: string;
    cidade?: string;
    pais?: string;
    tipo?: string;
    status?: string;
    imagem_url?: string | null;
    poster_url?: string | null;
    total_lutas?: number;
  };
  showCountdown?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export default function EventoCardEnhanced({
  evento,
  showCountdown = false,
  variant = 'default',
}: EventoCardEnhancedProps) {
  const eventDate = new Date(evento.data_evento);
  const isEventPast = isPast(eventDate) || evento.status === 'finalizado';
  const isLive = evento.status === 'ao_vivo';
  const isEventToday = isToday(eventDate);
  const isEventTomorrow = isTomorrow(eventDate);
  const daysUntil = differenceInDays(eventDate, new Date());

  const imageUrl = evento.poster_url || evento.imagem_url;

  // Badge do tipo de evento
  const typeBadge = {
    PPV: { bg: 'bg-ufc-gold', text: 'text-black', label: 'PPV' },
    'Fight Night': { bg: 'bg-blue-600', text: 'text-white', label: 'FN' },
    Apex: { bg: 'bg-purple-600', text: 'text-white', label: 'APEX' },
  }[evento.tipo || 'Fight Night'] || { bg: 'bg-dark-card', text: 'text-white', label: evento.tipo };

  // Status badge
  const getStatusBadge = () => {
    if (isLive) return null; // LivePulse is shown separately
    if (isEventPast) {
      return (
        <span className="px-2 py-0.5 bg-dark-card border border-dark-border rounded text-xs font-medium text-dark-textMuted">
          FINALIZADO
        </span>
      );
    }
    if (isEventToday) {
      return (
        <span className="px-2 py-0.5 bg-ufc-red/20 border border-ufc-red/40 rounded text-xs font-bold text-ufc-red animate-pulse">
          HOJE
        </span>
      );
    }
    if (isEventTomorrow) {
      return (
        <span className="px-2 py-0.5 bg-ufc-gold/20 border border-ufc-gold/40 rounded text-xs font-bold text-ufc-gold">
          AMANHA
        </span>
      );
    }
    if (daysUntil <= 7 && daysUntil > 0) {
      return (
        <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/40 rounded text-xs font-medium text-green-400">
          EM {daysUntil} DIAS
        </span>
      );
    }
    return null;
  };

  if (variant === 'compact') {
    return (
      <Link
        href={`/calendario/evento/${evento.id}`}
        className="flex items-center gap-3 p-3 bg-dark-card hover:bg-dark-cardHover border border-dark-border rounded-lg transition-all duration-300 group"
      >
        {/* Mini image */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-dark-bg flex-shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={evento.nome}
              fill
              className="object-cover"
              sizes="48px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-dark-textMuted">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate group-hover:text-ufc-red transition-colors">
            {evento.nome}
          </p>
          <p className="text-xs text-dark-textMuted">
            {format(eventDate, "d MMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>

        {/* Status */}
        <div className="flex-shrink-0">
          {isLive ? <LivePulse variant="badge" /> : getStatusBadge()}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/calendario/evento/${evento.id}`}
      className={`
        group relative flex flex-col overflow-hidden rounded-xl
        bg-dark-card hover:bg-dark-cardHover
        border border-dark-border hover:border-ufc-red/50
        transition-all duration-300
        ${variant === 'featured' ? 'hover:animate-hover-lift' : 'hover:scale-[1.02]'}
      `}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={evento.nome}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ufc-red/20 to-dark-bg flex items-center justify-center">
            <svg className="w-16 h-16 text-dark-border" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 ${typeBadge.bg} ${typeBadge.text} text-xs font-bold rounded`}>
            {typeBadge.label}
          </span>
        </div>

        {/* Status badge / Live */}
        <div className="absolute top-3 right-3">
          {isLive ? <LivePulse variant="badge" /> : getStatusBadge()}
        </div>

        {/* Fights count */}
        {evento.total_lutas !== undefined && evento.total_lutas > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-1 bg-dark-bg/80 backdrop-blur-sm text-white text-xs font-medium rounded flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              {evento.total_lutas} lutas
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Title */}
        <h3 className="text-lg font-display font-bold text-white group-hover:text-ufc-red transition-colors line-clamp-2 mb-2">
          {evento.nome}
        </h3>

        {/* Date */}
        <p className="text-sm text-dark-textMuted mb-1 capitalize">
          {format(eventDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
        </p>

        {/* Location */}
        {(evento.cidade || evento.local_evento) && (
          <p className="text-xs text-dark-textMuted flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {evento.local_evento}{evento.cidade ? `, ${evento.cidade}` : ''}
          </p>
        )}

        {/* Countdown for upcoming events */}
        {showCountdown && !isEventPast && !isLive && (
          <div className="mt-3 pt-3 border-t border-dark-border">
            <CountdownFlip targetDate={eventDate} compact />
          </div>
        )}
      </div>

      {/* Bottom gradient line on hover */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-ufc-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
