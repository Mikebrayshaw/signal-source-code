import type { NavFilter } from '../../lib/types'

const messages: Record<NavFilter, { icon: string; title: string; subtitle: string }> = {
  all: {
    icon: '◈',
    title: 'No signals found',
    subtitle: 'Try adjusting your filters or search query.',
  },
  open: {
    icon: '◉',
    title: 'No open signals',
    subtitle: 'All current signals have existing solutions.',
  },
  saved: {
    icon: '★',
    title: 'No saved signals',
    subtitle: 'Star signals to save them for later.',
  },
  archived: {
    icon: '▣',
    title: 'No archived signals',
    subtitle: 'Archived signals will appear here.',
  },
}

export default function EmptyState({ navFilter }: { navFilter: NavFilter }) {
  const msg = messages[navFilter]
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-4xl text-muted mb-4">{msg.icon}</span>
      <h3 className="font-display font-bold text-lg text-gray-300 mb-1">{msg.title}</h3>
      <p className="text-sm text-muted font-body">{msg.subtitle}</p>
    </div>
  )
}
