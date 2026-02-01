import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer rounded bg-gradient-to-r from-dark-card via-dark-cardHover to-dark-card bg-[length:200%_100%]',
        className
      )}
    />
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-dark-border bg-dark-card">
      {/* Imagem */}
      <Skeleton className="aspect-video w-full" />

      {/* Conteúdo */}
      <div className="p-4">
        {/* Badge */}
        <Skeleton className="mb-3 h-5 w-20" />

        {/* Título */}
        <Skeleton className="mb-2 h-6 w-full" />
        <Skeleton className="mb-3 h-6 w-3/4" />

        {/* Subtítulo */}
        <Skeleton className="mb-4 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-2/3" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export function NewsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}
