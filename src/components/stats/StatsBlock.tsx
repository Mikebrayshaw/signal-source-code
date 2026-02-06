import { useSignals } from '../../context/SignalsContext'

export default function StatsBlock() {
  const { totalCount, openCount, savedCount } = useSignals()

  return (
    <div className="grid grid-cols-3 gap-2 text-center">
      <div>
        <div className="text-lg font-mono font-bold text-gray-100">{totalCount}</div>
        <div className="text-[10px] text-muted font-body uppercase tracking-wider">Total</div>
      </div>
      <div>
        <div className="text-lg font-mono font-bold text-accent">{openCount}</div>
        <div className="text-[10px] text-muted font-body uppercase tracking-wider">Open</div>
      </div>
      <div>
        <div className="text-lg font-mono font-bold text-amber">{savedCount}</div>
        <div className="text-[10px] text-muted font-body uppercase tracking-wider">Saved</div>
      </div>
    </div>
  )
}
