import { cn } from '@/lib/utils';
import { CategoriaNoticia } from '@/types';
import { CATEGORIA_LABELS, CATEGORIA_COLORS } from '@/lib/constants';
import { Users, Swords, Clapperboard } from 'lucide-react';

const CATEGORIA_ICONS = {
  lutadores: Users,
  lutas: Swords,
  backstage: Clapperboard,
};

interface CategoryBadgeProps {
  categoria: CategoriaNoticia;
  className?: string;
}

export function CategoryBadge({ categoria, className }: CategoryBadgeProps) {
  const Icon = CATEGORIA_ICONS[categoria];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wider',
        CATEGORIA_COLORS[categoria],
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {CATEGORIA_LABELS[categoria]}
    </span>
  );
}
