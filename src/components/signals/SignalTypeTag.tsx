import type { SignalType } from '../../lib/types'
import { SIGNAL_TYPE_COLORS } from '../../lib/constants'

export default function SignalTypeTag({ type }: { type: SignalType }) {
  const colors = SIGNAL_TYPE_COLORS[type]
  return (
    <span className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded text-xs font-body`}>
      {type}
    </span>
  )
}
