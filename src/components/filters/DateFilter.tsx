import { useSignals } from '../../context/SignalsContext'
import { cn } from '../../lib/utils'
import type { DateRange } from '../../lib/types'

const options: { label: string; value: DateRange }[] = [
  { label: 'All time', value: 'all' },
  { label: '24h', value: '24h' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
]

export default function DateFilter() {
  const { dateRange, setDateRange } = useSignals()

  return (
    <div>
      <h3 className="text-xs font-body font-medium text-muted uppercase tracking-wider mb-2">Date</h3>
      <div className="flex gap-1.5">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => setDateRange(opt.value)}
            className={cn(
              'px-2 py-1 rounded text-xs font-body transition-colors',
              dateRange === opt.value
                ? 'bg-accent/15 text-accent'
                : 'bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
