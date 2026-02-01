import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  formatDistanceToNow,
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();

  const minutes = differenceInMinutes(now, dateObj);
  const hours = differenceInHours(now, dateObj);
  const days = differenceInDays(now, dateObj);
  const weeks = differenceInWeeks(now, dateObj);
  const months = differenceInMonths(now, dateObj);
  const years = differenceInYears(now, dateObj);

  if (minutes < 1) {
    return 'agora mesmo';
  }
  if (minutes < 60) {
    return `há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }
  if (hours < 24) {
    return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }
  if (days < 7) {
    return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;
  }
  if (weeks < 4) {
    return `há ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  }
  if (months < 12) {
    return `há ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }
  return `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatDateShort(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
}

export function isNewNews(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const hours = differenceInHours(new Date(), dateObj);
  return hours < 1;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return 'fonte desconhecida';
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
