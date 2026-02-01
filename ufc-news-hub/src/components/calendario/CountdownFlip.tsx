'use client';

import { useState, useEffect } from 'react';

interface CountdownFlipProps {
  targetDate: Date | string;
  onComplete?: () => void;
  compact?: boolean;
}

interface TimeUnit {
  value: number;
  label: string;
  labelShort: string;
}

export default function CountdownFlip({ targetDate, onComplete, compact = false }: CountdownFlipProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [prevValues, setPrevValues] = useState<number[]>([]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        onComplete?.();
        return [
          { value: 0, label: 'Dias', labelShort: 'D' },
          { value: 0, label: 'Horas', labelShort: 'H' },
          { value: 0, label: 'Min', labelShort: 'M' },
          { value: 0, label: 'Seg', labelShort: 'S' },
        ];
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return [
        { value: days, label: 'Dias', labelShort: 'D' },
        { value: hours, label: 'Horas', labelShort: 'H' },
        { value: minutes, label: 'Min', labelShort: 'M' },
        { value: seconds, label: 'Seg', labelShort: 'S' },
      ];
    };

    // Initial calculation
    const initial = calculateTimeLeft();
    setTimeLeft(initial);
    setPrevValues(initial.map((t) => t.value));

    // Update every second
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft();

      // Check for value changes to trigger flip animation
      setPrevValues((prev) => {
        const newPrev = newTime.map((t, i) => {
          if (prev[i] !== t.value) {
            return t.value;
          }
          return prev[i];
        });
        return newPrev;
      });

      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  if (timeLeft.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-sm font-mono">
        {timeLeft.map((unit, index) => (
          <span key={unit.label} className="flex items-center">
            <span className="text-white font-bold">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-dark-textMuted text-xs">{unit.labelShort}</span>
            {index < timeLeft.length - 1 && (
              <span className="text-dark-textMuted mx-0.5">:</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {timeLeft.map((unit, index) => (
        <div key={unit.label} className="flex flex-col items-center">
          {/* Flip card container */}
          <div className="relative perspective-500">
            <div
              className={`
                w-14 h-16 sm:w-20 sm:h-24
                bg-gradient-to-b from-dark-card to-dark-bg
                rounded-lg border border-dark-border
                flex items-center justify-center
                shadow-lg
                transform-gpu
                ${prevValues[index] !== unit.value ? 'animate-flip-down' : ''}
              `}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Number */}
              <span className="text-2xl sm:text-4xl font-display font-bold text-white">
                {String(unit.value).padStart(2, '0')}
              </span>

              {/* Center line decoration */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-dark-border/50" />

              {/* Glowing effect on low time */}
              {unit.label === 'Dias' && unit.value <= 1 && (
                <div className="absolute inset-0 rounded-lg animate-pulse-glow" />
              )}
            </div>

            {/* Reflection effect */}
            <div className="absolute -bottom-1 inset-x-1 h-2 bg-gradient-to-b from-dark-card/20 to-transparent rounded-b-lg blur-sm" />
          </div>

          {/* Label */}
          <span className="mt-2 text-xs sm:text-sm text-dark-textMuted uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
