import { Link, useLocation } from 'react-router-dom'
import { useSignals } from '../../context/SignalsContext'
import FilterPanel from '../filters/FilterPanel'
import StatsBlock from '../stats/StatsBlock'
import { cn } from '../../lib/utils'
import type { NavFilter } from '../../lib/types'

const navItems: { label: string; filter: NavFilter; icon: string }[] = [
  { label: 'All Signals', filter: 'all', icon: '◈' },
  { label: 'High Confidence', filter: 'open', icon: '◉' },
  { label: 'Saved', filter: 'saved', icon: '★' },
  { label: 'Archived', filter: 'archived', icon: '▣' },
]

export default function Sidebar() {
  const location = useLocation()
  const { navFilter, setNavFilter } = useSignals()
  const isSettings = location.pathname.endsWith('/settings')

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-accent font-mono text-lg">⚡</span>
          <span className="font-display font-bold text-lg text-gray-100 group-hover:text-accent transition-colors">
            Build Signals
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="p-3 space-y-1">
        {navItems.map(item => (
          <button
            key={item.filter}
            onClick={() => setNavFilter(item.filter)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-body transition-colors',
              navFilter === item.filter && !isSettings
                ? 'bg-accent/10 text-accent'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            )}
          >
            <span className="text-xs">{item.icon}</span>
            {item.label}
          </button>
        ))}
        <div className="border-t border-border my-2" />
        <Link
          to="/settings"
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-body transition-colors',
            isSettings
              ? 'bg-accent/10 text-accent'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          )}
        >
          <span className="text-xs">⚙</span>
          Settings
        </Link>
      </nav>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <FilterPanel />
      </div>

      {/* Stats */}
      <div className="border-t border-border p-4">
        <StatsBlock />
      </div>
    </div>
  )
}
