export interface Signal {
  id: string
  source: 'hn_ask' | 'hn_show' | 'producthunt'
  title: string
  summary: string
  description: string
  category: Category
  signal_type: SignalType
  solution_exists: boolean
  date: string
  hn_url: string
  points?: number
  comments?: number
  author?: string
  external_url?: string
  github_repos?: GitHubRepo[]
}

export interface GitHubRepo {
  name: string
  url: string
  description: string
  stars: number
  language: string
  topics: string[]
  updated_at: string
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
