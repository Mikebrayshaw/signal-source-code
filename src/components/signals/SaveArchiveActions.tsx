import { useSignals } from '../../context/SignalsContext'
import { cn } from '../../lib/utils'

export default function SaveArchiveActions({ signalId }: { signalId: string }) {
  const { savedIds, archivedIds, toggleSave, toggleArchive } = useSignals()
  const isSaved = savedIds.has(signalId)
  const isArchived = archivedIds.has(signalId)

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={e => { e.stopPropagation(); toggleSave(signalId) }}
        className={cn(
          'p-1.5 rounded-md text-sm transition-colors',
          isSaved
            ? 'text-accent bg-accent/10 hover:bg-accent/20'
            : 'text-muted hover:text-gray-300 hover:bg-white/5'
        )}
        title={isSaved ? 'Unsave' : 'Save'}
      >
        {isSaved ? '★' : '☆'}
      </button>
      <button
        onClick={e => { e.stopPropagation(); toggleArchive(signalId) }}
        className={cn(
          'p-1.5 rounded-md text-sm transition-colors',
          isArchived
            ? 'text-amber bg-amber/10 hover:bg-amber/20'
            : 'text-muted hover:text-gray-300 hover:bg-white/5'
        )}
        title={isArchived ? 'Unarchive' : 'Archive'}
      >
        {isArchived ? '▣' : '▢'}
      </button>
    </div>
  )
}
