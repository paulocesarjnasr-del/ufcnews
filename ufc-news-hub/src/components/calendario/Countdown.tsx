'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate, compact = false }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className={compact ? 'h-8' : 'h-20'}>
        <div className="animate-pulse bg-dark-border rounded h-full" />
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className={`text-center ${compact ? 'text-sm' : ''}`}>
        <span className="text-ufc-red font-bold">EVENTO EM ANDAMENTO!</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-dark-textMuted">Faltam:</span>
        <div className="flex items-center gap-1">
          {timeLeft.days > 0 && (
            <span className="font-bold text-ufc-red">{timeLeft.days}d</span>
          )}
          <span className="font-bold text-dark-text">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      <TimeUnit value={timeLeft.days} label="DIAS" />
      <Separator />
      <TimeUnit value={timeLeft.hours} label="HORAS" />
      <Separator />
      <TimeUnit value={timeLeft.minutes} label="MIN" />
      <Separator />
      <TimeUnit value={timeLeft.seconds} label="SEG" />
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg bg-dark-card border border-dark-border px-3 py-2 md:px-4 md:py-3">
        <span className="font-display text-2xl md:text-4xl text-ufc-red tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-1 text-xs text-dark-textMuted tracking-wider">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col items-center gap-1 pb-5">
      <span className="h-2 w-2 rounded-full bg-ufc-red animate-pulse" />
      <span className="h-2 w-2 rounded-full bg-ufc-red animate-pulse" />
    </div>
  );
}
