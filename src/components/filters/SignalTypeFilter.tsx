import { useSignals } from '../../context/SignalsContext'
import { ALL_SIGNAL_TYPES, SIGNAL_TYPE_COLORS } from '../../lib/constants'
import { cn } from '../../lib/utils'

export default function SignalTypeFilter() {
  const { selectedSignalTypes, toggleSignalType } = useSignals()

  return (
    <div>
      <h3 className="text-xs font-body font-medium text-muted uppercase tracking-wider mb-2">Signal Type</h3>
      <div className="flex flex-wrap gap-1.5">
        {ALL_SIGNAL_TYPES.map(type => {
          const active = selectedSignalTypes.has(type)
          const colors = SIGNAL_TYPE_COLORS[type]
          return (
            <button
              key={type}
              onClick={() => toggleSignalType(type)}
              className={cn(
                'px-2 py-1 rounded text-xs font-body transition-all',
                active
                  ? `${colors.bg} ${colors.text} ring-1 ring-current`
                  : 'bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10'
              )}
            >
              {type}
            </button>
          )
        })}
      </div>
    </div>
  )
}
