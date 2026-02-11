import type { Category, SignalType } from './types'

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  'SaaS': { bg: 'bg-blue-500/15', text: 'text-blue-400' },
  'Automation': { bg: 'bg-purple-500/15', text: 'text-purple-400' },
  'Dev Tools': { bg: 'bg-cyan-500/15', text: 'text-cyan-400' },
  'Content Tools': { bg: 'bg-pink-500/15', text: 'text-pink-400' },
  'Compliance': { bg: 'bg-orange-500/15', text: 'text-orange-400' },
  'Productivity': { bg: 'bg-yellow-500/15', text: 'text-yellow-400' },
  'AI/ML': { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
}

export const SIGNAL_TYPE_COLORS: Record<SignalType, { bg: string; text: string }> = {
  'Direct request': { bg: 'bg-accent/10', text: 'text-accent' },
  'Pain point': { bg: 'bg-red-500/15', text: 'text-red-400' },
  'Market gap': { bg: 'bg-amber/15', text: 'text-amber' },
  'Frustration': { bg: 'bg-orange-500/15', text: 'text-orange-400' },
  'Wish list': { bg: 'bg-violet-500/15', text: 'text-violet-400' },
}

export const ALL_CATEGORIES: Category[] = [
  'SaaS', 'Automation', 'Dev Tools', 'Content Tools', 'Compliance', 'Productivity', 'AI/ML',
]

export const ALL_SIGNAL_TYPES: SignalType[] = [
  'Direct request', 'Pain point', 'Market gap', 'Frustration', 'Wish list',
]

export const PAGE_SIZE = 20
export const INITIAL_FETCH_LIMIT = 100

