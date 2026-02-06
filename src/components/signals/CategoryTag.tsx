import type { Category } from '../../lib/types'
import { CATEGORY_COLORS } from '../../lib/constants'

export default function CategoryTag({ category }: { category: Category }) {
  const colors = CATEGORY_COLORS[category]
  return (
    <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-body font-medium`}>
      {category}
    </span>
  )
}
