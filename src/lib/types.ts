export interface Signal {
  id: string
  title: string
  category: Category
  summary: string
  solution_exists: boolean
  date: string
  hn_url: string
  signal_type: SignalType
  points?: number
  comments?: number
}

export type Category =
  | 'SaaS'
  | 'Automation'
  | 'Dev Tools'
  | 'Content Tools'
  | 'Compliance'
  | 'Productivity'
  | 'AI/ML'

export type SignalType =
  | 'Direct request'
  | 'Pain point'
  | 'Market gap'
  | 'Frustration'
  | 'Wish list'

export type NavFilter = 'all' | 'open' | 'saved' | 'archived'
export type SortOption = 'newest' | 'oldest' | 'most-points' | 'most-comments'
export type ViewMode = 'feed' | 'compact'
export type DateRange = 'all' | '24h' | '7d' | '30d'

export interface User {
  id: string
  email: string
}
