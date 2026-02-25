import type { Confidence } from '../../lib/types'
import { CONFIDENCE_COLORS } from '../../lib/constants'

export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const colors = CONFIDENCE_COLORS[confidence] ?? CONFIDENCE_COLORS['low']
  return (
    <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-body font-medium uppercase`}>
      {confidence}
    </span>
  )
}

export default ConfidenceBadge
