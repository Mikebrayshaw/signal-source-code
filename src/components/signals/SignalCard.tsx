import type { Signal } from '../../lib/types'
import { formatRelativeDate } from '../../lib/utils'
import CategoryTag from './CategoryTag'
import { ConfidenceBadge } from './SignalTypeTag'
import SaveArchiveActions from './SaveArchiveActions'

export default function SignalCard({ signal }: { signal: Signal }) {
  const { google_trends, product_hunt, github } = signal.evidence

  return (
    <article className="bg-surface border border-border rounded-xl p-5 hover:border-accent/20 transition-colors group">
      {/* Top row: tags + actions */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {signal.categories.map(cat => (
            <CategoryTag key={cat} category={cat} />
          ))}
          <ConfidenceBadge confidence={signal.confidence} />
        </div>
        <SaveArchiveActions signalId={signal.id} />
      </div>

      {/* Title */}
      <a
        href={signal.signal_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block font-display font-bold text-gray-100 group-hover:text-accent transition-colors mb-2 leading-snug"
      >
        {signal.title}
      </a>

      {/* One-line hook */}
      {signal.one_line_hook && (
        <p className="text-sm text-accent/80 font-body italic mb-2">
          {signal.one_line_hook}
        </p>
      )}

      {/* Narrative */}
      <p className="text-sm text-gray-400 font-body leading-relaxed mb-3">
        {signal.narrative}
      </p>

      {/* Evidence section */}
      {(google_trends || product_hunt || github) && (
        <div className="mb-3 bg-white/5 rounded-lg p-3 border border-border/50">
          <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-2">
            Evidence
          </div>
          <div className="space-y-1.5 text-sm">
            {google_trends?.summary && (
              <div className="flex items-start gap-2">
                <span className="text-xs text-muted shrink-0 w-24 font-mono">Trends</span>
                <span className={google_trends.supporting ? 'text-emerald-400' : 'text-gray-500'}>{google_trends.summary}</span>
              </div>
            )}
            {product_hunt?.summary && (
              <div className="flex items-start gap-2">
                <span className="text-xs text-muted shrink-0 w-24 font-mono">Product Hunt</span>
                <span className={product_hunt.supporting ? 'text-emerald-400' : 'text-gray-500'}>{product_hunt.summary}</span>
              </div>
            )}
            {github?.summary && (
              <div className="flex items-start gap-2">
                <span className="text-xs text-muted shrink-0 w-24 font-mono">GitHub</span>
                <span className={github.supporting ? 'text-emerald-400' : 'text-gray-500'}>{github.summary}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom row: scores + meta */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-blue-500/15 text-blue-400 rounded text-xs font-mono">
            Relevance {signal.relevance_score}/10
          </span>
          <span className="px-2 py-0.5 bg-violet-500/15 text-violet-400 rounded text-xs font-mono">
            Potential {signal.content_potential}/10
          </span>
          <span className="px-2 py-0.5 bg-cyan-500/15 text-cyan-400 rounded text-xs font-mono">
            Sources {signal.sources_confirming}/4
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted font-mono">
          {signal.points != null && <span>▲ {signal.points}</span>}
          {signal.comments != null && <span>💬 {signal.comments}</span>}
          <span>{formatRelativeDate(signal.date)}</span>
        </div>
      </div>
    </article>
  )
}
