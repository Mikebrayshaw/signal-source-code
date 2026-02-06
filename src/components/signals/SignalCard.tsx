import type { Signal } from '../../lib/types'
import { formatRelativeDate } from '../../lib/utils'
import CategoryTag from './CategoryTag'
import SignalTypeTag from './SignalTypeTag'
import SolutionBadge from './SolutionBadge'
import SaveArchiveActions from './SaveArchiveActions'

export default function SignalCard({ signal }: { signal: Signal }) {
  return (
    <article className="bg-surface border border-border rounded-xl p-5 hover:border-accent/20 transition-colors group">
      {/* Top row: tags + actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryTag category={signal.category} />
          <SignalTypeTag type={signal.signal_type} />
        </div>
        <SaveArchiveActions signalId={signal.id} />
      </div>

      {/* Title */}
      <a
        href={signal.hn_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block font-display font-bold text-gray-100 group-hover:text-accent transition-colors mb-2 leading-snug"
      >
        {signal.title}
      </a>

      {/* Summary */}
      <p className="text-sm text-gray-400 font-body leading-relaxed mb-3">
        {signal.summary}
      </p>

      {/* Bottom row: solution badge + meta */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SolutionBadge exists={signal.solution_exists} />
        <div className="flex items-center gap-3 text-xs text-muted font-mono">
          {signal.points != null && <span>▲ {signal.points}</span>}
          {signal.comments != null && <span>💬 {signal.comments}</span>}
          <span>{formatRelativeDate(signal.date)}</span>
        </div>
      </div>
    </article>
  )
}
