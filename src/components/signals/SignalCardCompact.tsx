import type { Signal } from '../../lib/types'
import { formatRelativeDate } from '../../lib/utils'
import CategoryTag from './CategoryTag'
import { ConfidenceBadge } from './SignalTypeTag'
import SaveArchiveActions from './SaveArchiveActions'

export default function SignalCardCompact({ signal }: { signal: Signal }) {
  return (
    <article className="bg-surface border border-border rounded-lg px-4 py-3 hover:border-accent/20 transition-colors group flex items-center gap-4">
      {/* Left: first category + confidence */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <CategoryTag category={signal.categories[0]} />
        <ConfidenceBadge confidence={signal.confidence} />
      </div>

      {/* Center: title + hook */}
      <div className="flex-1 min-w-0">
        <a
          href={signal.signal_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-body font-medium text-sm text-gray-200 group-hover:text-accent transition-colors truncate"
        >
          {signal.title}
        </a>
        <p className="text-xs text-muted truncate mt-0.5">{signal.one_line_hook}</p>
      </div>

      {/* Right: relevance + meta + actions */}
      <div className="flex items-center gap-3 shrink-0">
        {signal.build_prompt && (
          <span className="px-1.5 py-0.5 bg-accent/15 text-accent rounded text-xs font-mono hidden sm:inline" title="Starter prompt available">
            Build
          </span>
        )}
        <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 rounded text-xs font-mono hidden sm:inline">
          {signal.relevance_score}/10
        </span>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted font-mono">
          {signal.points != null && <span>▲{signal.points}</span>}
          <span>{formatRelativeDate(signal.date)}</span>
        </div>
        <SaveArchiveActions signalId={signal.id} />
      </div>
    </article>
  )
}
