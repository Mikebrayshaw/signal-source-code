import { useSignals } from '../../context/SignalsContext'
import { ALL_CONFIDENCES, CONFIDENCE_COLORS } from '../../lib/constants'
import { cn } from '../../lib/utils'

export default function SignalTypeFilter() {
  const { selectedConfidences, toggleConfidence } = useSignals()

  return (
    <div>
      <h3 className="text-xs font-body font-medium text-muted uppercase tracking-wider mb-2">Confidence</h3>
      <div className="flex flex-wrap gap-1.5">
        {ALL_CONFIDENCES.map(conf => {
          const active = selectedConfidences.has(conf)
          const colors = CONFIDENCE_COLORS[conf]
          return (
            <button
              key={conf}
              onClick={() => toggleConfidence(conf)}
              className={cn(
                'px-2 py-1 rounded text-xs font-body transition-all capitalize',
                active
                  ? `${colors.bg} ${colors.text} ring-1 ring-current`
                  : 'bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10'
              )}
            >
              {conf}
            </button>
          )
        })}
      </div>
    </div>
  )
}
