import { useSignals } from '../../context/SignalsContext'
import { cn } from '../../lib/utils'

const options: { label: string; value: 'all' | 'exists' | 'none' }[] = [
  { label: 'All', value: 'all' },
  { label: 'No solution', value: 'none' },
  { label: 'Has solution', value: 'exists' },
]

export default function SolutionFilter() {
  const { solutionFilter, setSolutionFilter } = useSignals()

  return (
    <div>
      <h3 className="text-xs font-body font-medium text-muted uppercase tracking-wider mb-2">Solution</h3>
      <div className="flex gap-1.5">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => setSolutionFilter(opt.value)}
            className={cn(
              'px-2 py-1 rounded text-xs font-body transition-colors',
              solutionFilter === opt.value
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
