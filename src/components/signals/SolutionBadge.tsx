export default function SolutionBadge({ exists }: { exists: boolean }) {
  if (exists) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-amber font-body">
        <span className="w-1.5 h-1.5 rounded-full bg-amber" />
        Existing solutions
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1.5 text-xs text-accent font-body">
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      No solution mentioned
    </span>
  )
}
