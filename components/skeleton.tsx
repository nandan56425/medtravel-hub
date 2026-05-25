import { cn } from '@/lib/utils'

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-6 space-y-4 animate-pulse", className)}>
      <div className="h-6 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded" />
        <div className="h-3 bg-muted rounded w-5/6" />
        <div className="h-3 bg-muted rounded w-4/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-8 bg-muted rounded w-24" />
        <div className="h-8 bg-muted rounded w-24" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="animate-pulse space-y-6 py-20">
      <div className="h-12 bg-muted rounded w-3/4 mx-auto" />
      <div className="h-6 bg-muted rounded w-1/2 mx-auto" />
      <div className="flex justify-center gap-4">
        <div className="h-12 bg-muted rounded w-40" />
        <div className="h-12 bg-muted rounded w-40" />
      </div>
    </div>
  )
}
