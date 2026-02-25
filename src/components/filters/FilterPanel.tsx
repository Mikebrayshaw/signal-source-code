import CategoryFilter from './CategoryFilter'
import SignalTypeFilter from './SignalTypeFilter'
import DateFilter from './DateFilter'

export default function FilterPanel() {
  return (
    <div className="space-y-5 mt-4">
      <CategoryFilter />
      <SignalTypeFilter />
      <DateFilter />
    </div>
  )
}
