import { cn } from '@/lib/utils';
import { CategoriaNoticia } from '@/types';
import { CATEGORIA_LABELS, CATEGORIA_COLORS } from '@/lib/constants';

interface CategoryBadgeProps {
  categoria: CategoriaNoticia;
  className?: string;
}

export function CategoryBadge({ categoria, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-2 py-1 text-xs font-bold uppercase tracking-wider',
        CATEGORIA_COLORS[categoria],
        className
      )}
    >
      {CATEGORIA_LABELS[categoria]}
    </span>
  );
}
