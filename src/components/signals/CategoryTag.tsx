import type { Category } from '../../lib/types'
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../../lib/constants'

export default function CategoryTag({ category }: { category: Category }) {
  const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS['emerging-category']
  const label = CATEGORY_LABELS[category] ?? category
  return (
    <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-body font-medium`}>
      {label}
    </span>
  )
}
