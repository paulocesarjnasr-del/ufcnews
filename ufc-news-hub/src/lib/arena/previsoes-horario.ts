/**
 * Logica de horario para previsoes da Arena
 *
 * Regras:
 * - Previsoes abrem: Domingo 12:00 (horario de Brasilia)
 * - Previsoes fecham: 1 hora antes do evento no sabado
 */

// Fuso horario de Brasilia (UTC-3)
const BRASILIA_OFFSET = -3;

export interface PrevisoesStatus {
  isOpen: boolean;
  opensAt: Date | null;
  closesAt: Date | null;
  message: string;
  timeUntilOpen: number | null;  // em millisegundos
  timeUntilClose: number | null; // em millisegundos
}

/**
 * Converte uma data para o fuso horario de Brasilia
 */
function toBrasiliaTime(date: Date): Date {
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  return new Date(utc + (BRASILIA_OFFSET * 3600000));
}

/**
 * Obtem o domingo anterior ou atual as 12:00 de Brasilia
 */
function getDomingoAbertura(dataEvento: Date): Date {
  const eventoBrasilia = toBrasiliaTime(dataEvento);

  // Encontra o domingo anterior ao evento (ou o proprio dia se for domingo)
  const dayOfWeek = eventoBrasilia.getDay(); // 0 = domingo, 6 = sabado

  // Se o evento e no sabado, o domingo de abertura e 6 dias antes
  // Se o evento e no domingo, o domingo de abertura e o proprio dia
  const daysToSubtract = dayOfWeek === 0 ? 7 : dayOfWeek;

  const domingo = new Date(eventoBrasilia);
  domingo.setDate(domingo.getDate() - daysToSubtract);
  domingo.setHours(12, 0, 0, 0);

  return domingo;
}

/**
 * Obtem o horario de fechamento (1 hora antes do evento)
 */
function getHorarioFechamento(dataEvento: Date, horarioMainCard?: string | null): Date {
  const eventoBrasilia = toBrasiliaTime(dataEvento);

  // Se temos o horario do main card, usamos ele
  if (horarioMainCard) {
    const [hours, minutes] = horarioMainCard.split(':').map(Number);
    eventoBrasilia.setHours(hours, minutes, 0, 0);
  }

  // Subtrai 1 hora
  return new Date(eventoBrasilia.getTime() - 3600000);
}

/**
 * Verifica o status das previsoes para um evento
 */
export function verificarStatusPrevisoes(
  dataEvento: string | Date,
  horarioMainCard?: string | null
): PrevisoesStatus {
  const evento = new Date(dataEvento);
  const agora = new Date();

  const abertura = getDomingoAbertura(evento);
  const fechamento = getHorarioFechamento(evento, horarioMainCard);

  const isAfterOpen = agora >= abertura;
  const isBeforeClose = agora < fechamento;
  const isOpen = isAfterOpen && isBeforeClose;

  let message: string;
  let timeUntilOpen: number | null = null;
  let timeUntilClose: number | null = null;

  if (!isAfterOpen) {
    // Ainda nao abriu
    timeUntilOpen = abertura.getTime() - agora.getTime();
    message = `Previsoes abrem domingo as 12h`;
  } else if (isOpen) {
    // Esta aberto
    timeUntilClose = fechamento.getTime() - agora.getTime();
    const hoursRemaining = Math.floor(timeUntilClose / 3600000);
    const minutesRemaining = Math.floor((timeUntilClose % 3600000) / 60000);

    if (hoursRemaining > 24) {
      const days = Math.floor(hoursRemaining / 24);
      message = `Previsoes fecham em ${days} dia${days > 1 ? 's' : ''}`;
    } else if (hoursRemaining > 0) {
      message = `Previsoes fecham em ${hoursRemaining}h ${minutesRemaining}min`;
    } else {
      message = `Previsoes fecham em ${minutesRemaining} minutos!`;
    }
  } else {
    // Ja fechou
    message = `Previsoes encerradas`;
  }

  return {
    isOpen,
    opensAt: abertura,
    closesAt: fechamento,
    message,
    timeUntilOpen,
    timeUntilClose,
  };
}

/**
 * Formata o tempo restante de forma amigavel
 */
export function formatarTempoRestante(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}min`;
  } else if (minutes > 0) {
    return `${minutes}min`;
  } else {
    return `${seconds}s`;
  }
}
