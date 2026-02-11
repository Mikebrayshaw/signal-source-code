import { useSignals } from '../../context/SignalsContext'
import SignalCard from './SignalCard'
import SignalCardCompact from './SignalCardCompact'
import LoadMoreButton from '../ui/LoadMoreButton'
import EmptyState from '../ui/EmptyState'
import { SkeletonFeed } from '../ui/Skeleton'

export default function SignalFeed() {
  const { displayedSignals, viewMode, hasMore, loadMore, navFilter, loading, error } = useSignals()

  if (loading) {
    return <SkeletonFeed count={5} />
  }

  if (error) {
    return (
      <div>
        <div className="bg-amber/10 border border-amber/20 rounded-lg p-3 mb-4">
          <p className="text-amber text-sm font-body">{error}</p>
        </div>
        {displayedSignals.length === 0 && <EmptyState navFilter={navFilter} />}
        {displayedSignals.length > 0 && (
          <>
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
          </>
        )}
      </div>
    )
  }

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
