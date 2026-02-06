import { useSignals } from '../../context/SignalsContext'
import SignalCard from './SignalCard'
import SignalCardCompact from './SignalCardCompact'
import LoadMoreButton from '../ui/LoadMoreButton'
import EmptyState from '../ui/EmptyState'

export default function SignalFeed() {
  const { displayedSignals, viewMode, hasMore, loadMore, navFilter } = useSignals()

  if (displayedSignals.length === 0) {
    return <EmptyState navFilter={navFilter} />
  }

  return (
    <div>
      <div className={viewMode === 'feed' ? 'space-y-4' : 'space-y-2'}>
        {displayedSignals.map(signal =>
          viewMode === 'feed' ? (
            <SignalCard key={signal.id} signal={signal} />
          ) : (
            <SignalCardCompact key={signal.id} signal={signal} />
          )
        )}
      </div>
      {hasMore && <LoadMoreButton onClick={loadMore} />}
    </div>
  )
}
