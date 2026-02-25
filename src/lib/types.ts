export interface EvidenceBucket {
  status: string
  results: any[]
  summary: string
  supporting: boolean
}

export interface Signal {
  id: string
  signal_id: string
  source: string
  title: string
  narrative: string
  one_line_hook: string
  key_insight: string
  categories: Category[]
  confidence: Confidence
  relevance_score: number
  content_potential: number
  sources_confirming: number
  date: string
  signal_url: string
  points?: number
  comments?: number
  evidence: {
    google_trends?: EvidenceBucket
    product_hunt?: EvidenceBucket
    github?: EvidenceBucket
  }
}

export interface ValidatedOpportunityRow {
  id: string
  signal_id: string
  signal_source: string
  signal_title: string
  signal_url: string
  signal_score: number
  signal_comments: number
  relevance_score: number
  content_potential: number
  sources_confirming: number
  opportunity_type: string
  confidence: string
  narrative: string
  one_line_hook: string
  key_insight: string
  queries: any
  evidence_google_trends: any
  evidence_producthunt: any
  evidence_github: any
  validated_at: string
  model_used: string
}

export type Category =
  | 'developer-tooling'
  | 'demographic-market-gap'
  | 'infrastructure-need'
  | 'workflow-inefficiency'
  | 'emerging-category'

export type Confidence = 'high' | 'medium' | 'low'

export type NavFilter = 'all' | 'open' | 'saved' | 'archived'
export type SortOption = 'newest' | 'oldest' | 'most-points' | 'most-comments' | 'most-relevant'
export type ViewMode = 'feed' | 'compact'
export type DateRange = 'all' | '24h' | '7d' | '30d'

export interface User {
  id: string
  email: string
}
