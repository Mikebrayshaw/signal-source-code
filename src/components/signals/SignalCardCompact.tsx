import type { Signal } from '../../lib/types'
import { formatRelativeDate } from '../../lib/utils'
import CategoryTag from './CategoryTag'
import SolutionBadge from './SolutionBadge'
import SaveArchiveActions from './SaveArchiveActions'

export default function SignalCardCompact({ signal }: { signal: Signal }) {
  return (
    <article className="bg-surface border border-border rounded-lg px-4 py-3 hover:border-accent/20 transition-colors group flex items-center gap-4">
      {/* Left: category + solution */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <CategoryTag category={signal.category} />
        <SolutionBadge exists={signal.solution_exists} />
      </div>

      {/* Center: title + summary */}
      <div className="flex-1 min-w-0">
        <a
          href={signal.hn_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-body font-medium text-sm text-gray-200 group-hover:text-accent transition-colors truncate"
        >
          {signal.title}
        </a>
        <p className="text-xs text-muted truncate mt-0.5">{signal.summary}</p>
      </div>

      {/* Right: meta + actions */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted font-mono">
          {signal.points != null && <span>▲{signal.points}</span>}
          <span>{formatRelativeDate(signal.date)}</span>
        </div>
        <SaveArchiveActions signalId={signal.id} />
      </div>
    </article>
  )
}
