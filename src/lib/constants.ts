import type { Category, Confidence } from './types'

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  'developer-tooling': { bg: 'bg-cyan-500/15', text: 'text-cyan-400' },
  'demographic-market-gap': { bg: 'bg-pink-500/15', text: 'text-pink-400' },
  'infrastructure-need': { bg: 'bg-orange-500/15', text: 'text-orange-400' },
  'workflow-inefficiency': { bg: 'bg-purple-500/15', text: 'text-purple-400' },
  'emerging-category': { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'developer-tooling': 'Dev Tooling',
  'demographic-market-gap': 'Market Gap',
  'infrastructure-need': 'Infrastructure',
  'workflow-inefficiency': 'Workflow',
  'emerging-category': 'Emerging',
}

export const CONFIDENCE_COLORS: Record<Confidence, { bg: string; text: string }> = {
  'high': { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
  'medium': { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  'low': { bg: 'bg-red-500/15', text: 'text-red-400' },
}

export const ALL_CATEGORIES: Category[] = [
  'developer-tooling', 'demographic-market-gap', 'infrastructure-need', 'workflow-inefficiency', 'emerging-category',
]

export const ALL_CONFIDENCES: Confidence[] = ['high', 'medium', 'low']

export const PAGE_SIZE = 20
