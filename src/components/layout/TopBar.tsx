import { useSignals } from '../../context/SignalsContext'
import { cn } from '../../lib/utils'
import type { SortOption } from '../../lib/types'

const sortOptions: { label: string; value: SortOption }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Most Points', value: 'most-points' },
  { label: 'Most Comments', value: 'most-comments' },
]

export default function TopBar() {
  const { searchQuery, setSearchQuery, sortOption, setSortOption, viewMode, setViewMode, filteredSignals } = useSignals()

  return (
    <div className="sticky top-0 z-10 bg-bg/80 backdrop-blur-md border-b border-border px-4 lg:px-6 py-3">
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">⌕</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search signals..."
            className="w-full bg-surface border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 font-body placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
          />
        </div>

        {/* Count */}
        <span className="text-xs text-muted font-mono hidden sm:block">
          {filteredSignals.length} signals
        </span>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value as SortOption)}
          className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-gray-300 font-body focus:outline-none focus:border-accent/50 cursor-pointer"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* View toggle */}
        <div className="flex border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('feed')}
            className={cn(
              'px-3 py-2 text-sm transition-colors',
              viewMode === 'feed' ? 'bg-accent/15 text-accent' : 'text-muted hover:text-gray-300'
            )}
            title="Feed view"
          >
            ☰
          </button>
          <button
            onClick={() => setViewMode('compact')}
            className={cn(
              'px-3 py-2 text-sm transition-colors border-l border-border',
              viewMode === 'compact' ? 'bg-accent/15 text-accent' : 'text-muted hover:text-gray-300'
            )}
            title="Compact view"
          >
            ▤
          </button>
        </div>
      </div>
    </div>
  )
}
