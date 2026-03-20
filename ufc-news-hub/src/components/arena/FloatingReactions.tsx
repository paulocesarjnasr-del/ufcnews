'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Reaction {
  id: number;
  emoji: string;
  x: number;
}

const EMOJIS = [
  { emoji: '🔥', label: 'fogo' },
  { emoji: '😱', label: 'choque' },
  { emoji: '💀', label: 'nocaute' },
  { emoji: '🏆', label: 'campeao' },
];

export function FloatingReactions() {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const nextIdRef = useRef(0);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  // Cleanup all timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  const addReaction = useCallback((emoji: string) => {
    const id = nextIdRef.current++;
    const x = 20 + Math.random() * 60;
    setReactions(prev => [...prev.slice(-20), { id, emoji, x }]);

    const timeout = setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
      timeoutsRef.current.delete(timeout);
    }, 2000);
    timeoutsRef.current.add(timeout);
  }, []);

  return (
    <div className="relative">
      <div className="absolute bottom-full left-0 right-0 h-40 pointer-events-none overflow-hidden">
        {reactions.map(r => (
          <span
            key={r.id}
            className="absolute text-2xl animate-float-up"
            style={{ left: `${r.x}%`, bottom: 0 }}
          >
            {r.emoji}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 py-2">
        {EMOJIS.map(({ emoji, label }) => (
          <button
            key={label}
            onClick={() => addReaction(emoji)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-110 active:scale-95 transition-all text-lg"
            aria-label={`Reagir com ${label}`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
