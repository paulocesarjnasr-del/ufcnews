'use client';

export function CommentSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-3">
        {/* Avatar skeleton */}
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-dark-border" />

        <div className="flex-1">
          {/* Header skeleton */}
          <div className="mb-2 flex items-center gap-2">
            <div className="h-4 w-24 rounded bg-dark-border" />
            <div className="h-3 w-16 rounded bg-dark-border" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-dark-border" />
            <div className="h-3 w-4/5 rounded bg-dark-border" />
            <div className="h-3 w-2/3 rounded bg-dark-border" />
          </div>

          {/* Actions skeleton */}
          <div className="mt-3 flex gap-4">
            <div className="h-3 w-16 rounded bg-dark-border" />
            <div className="h-3 w-16 rounded bg-dark-border" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommentSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
}
