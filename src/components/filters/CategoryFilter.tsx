import { useSignals } from '../../context/SignalsContext'
import { ALL_CATEGORIES, CATEGORY_COLORS, CATEGORY_LABELS } from '../../lib/constants'
import { cn } from '../../lib/utils'

export default function CategoryFilter() {
  const { selectedCategories, toggleCategory } = useSignals()

  return (
    <div>
      <h3 className="text-xs font-body font-medium text-muted uppercase tracking-wider mb-2">Category</h3>
      <div className="flex flex-wrap gap-1.5">
        {ALL_CATEGORIES.map(cat => {
          const active = selectedCategories.has(cat)
          const colors = CATEGORY_COLORS[cat]
          return (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={cn(
                'px-2 py-1 rounded text-xs font-body transition-all',
                active
                  ? `${colors.bg} ${colors.text} ring-1 ring-current`
                  : 'bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10'
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
