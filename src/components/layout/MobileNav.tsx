import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSignals } from '../../context/SignalsContext'
import FilterPanel from '../filters/FilterPanel'
import StatsBlock from '../stats/StatsBlock'
import { cn } from '../../lib/utils'
import type { NavFilter } from '../../lib/types'

const navItems: { label: string; filter: NavFilter; icon: string }[] = [
  { label: 'All Signals', filter: 'all', icon: '◈' },
  { label: 'Open', filter: 'open', icon: '◉' },
  { label: 'Saved', filter: 'saved', icon: '★' },
  { label: 'Archived', filter: 'archived', icon: '▣' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { navFilter, setNavFilter } = useSignals()
  const isSettings = location.pathname.endsWith('/settings')

  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-surface border-b border-border flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-accent font-mono">⚡</span>
          <span className="font-display font-bold text-gray-100">Build Signals</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-300 hover:text-accent transition-colors text-xl p-1"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Spacer for fixed top bar */}
      <div className="h-[52px]" />

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)} />
      )}

      {/* Slide-out panel */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-[280px] bg-surface border-r border-border z-50 flex flex-col transition-transform duration-200',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="p-5 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="text-accent font-mono">⚡</span>
            <span className="font-display font-bold text-gray-100">Build Signals</span>
          </Link>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-200 text-lg">
            ✕
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.filter}
              onClick={() => {
                setNavFilter(item.filter)
                setOpen(false)
              }}
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
            onClick={() => setOpen(false)}
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
    </div>
  )
}
