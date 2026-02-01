'use client';

interface LivePulseProps {
  variant?: 'default' | 'large' | 'badge';
  text?: string;
}

export default function LivePulse({ variant = 'default', text = 'AO VIVO' }: LivePulseProps) {
  if (variant === 'badge') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-ufc-red/10 border border-ufc-red/30 rounded text-xs font-semibold text-ufc-red">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ufc-red opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ufc-red" />
        </span>
        {text}
      </span>
    );
  }

  if (variant === 'large') {
    return (
      <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-ufc-red/20 to-transparent border-l-4 border-ufc-red rounded-r-lg">
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ufc-red opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-ufc-red" />
        </span>
        <span className="text-lg font-bold text-white tracking-wider">
          {text}
        </span>
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ufc-red opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-ufc-red" />
      </span>
      <span className="text-sm font-semibold text-ufc-red uppercase tracking-wider">
        {text}
      </span>
    </div>
  );
}
