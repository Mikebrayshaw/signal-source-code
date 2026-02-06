export function SkeletonCard() {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-16 bg-white/5 rounded" />
        <div className="h-5 w-20 bg-white/5 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-white/5 rounded mb-2" />
      <div className="h-4 w-full bg-white/5 rounded mb-1" />
      <div className="h-4 w-2/3 bg-white/5 rounded mb-3" />
      <div className="flex justify-between">
        <div className="h-4 w-32 bg-white/5 rounded" />
        <div className="h-4 w-24 bg-white/5 rounded" />
      </div>
    </div>
  )
}

export function SkeletonFeed({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
