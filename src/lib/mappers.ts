import type { Signal, Category, SignalType, GitHubRepo } from './types'

// Constants
const SUMMARY_MAX_LENGTH = 150

/**
 * Database schema for the `opportunities` table
 */
export interface OpportunityRow {
  id: string
  source: 'hn_ask' | 'hn_show' | 'producthunt'
  source_id: string
  title: string
  description: string
  url: string
  external_url: string | null
  author: string
  score: number
  comments: number
  github_url: string | null
  github_data: any[] | null
  topics: string[] | null
  created_at: string
  fetched_at: string
}

/**
 * Derives category from title and description keywords
 */
function deriveCategory(title: string, description: string): Category {
  const text = `${title} ${description}`.toLowerCase()

  if (
    text.includes('api') ||
    text.includes('sdk') ||
    text.includes('cli') ||
    text.includes('deploy') ||
    text.includes('devops') ||
    text.includes('ci/cd') ||
    text.includes('testing') ||
    text.includes('debug') ||
    text.includes('code review') ||
    text.includes('developer') ||
    text.includes('open source') ||
    text.includes('github')
  ) {
    return 'Dev Tools'
  }

  if (
    text.includes('ai') ||
    text.includes('ml') ||
    text.includes('llm') ||
    text.includes('gpt') ||
    text.includes('model') ||
    text.includes('neural') ||
    text.includes('machine learning')
  ) {
    return 'AI/ML'
  }

  if (
    text.includes('automat') ||
    text.includes('workflow') ||
    text.includes('zapier') ||
    text.includes('no-code') ||
    text.includes('integration')
  ) {
    return 'Automation'
  }

  if (
    text.includes('content') ||
    text.includes('cms') ||
    text.includes('blog') ||
    text.includes('writing') ||
    text.includes('seo') ||
    text.includes('publish')
  ) {
    return 'Content Tools'
  }

  if (
    text.includes('compliance') ||
    text.includes('soc') ||
    text.includes('gdpr') ||
    text.includes('security') ||
    text.includes('audit') ||
    text.includes('ssl') ||
    text.includes('certificate')
  ) {
    return 'Compliance'
  }

  if (
    text.includes('calendar') ||
    text.includes('scheduling') ||
    text.includes('productivity') ||
    text.includes('time') ||
    text.includes('task') ||
    text.includes('todo') ||
    text.includes('analytics')
  ) {
    return 'Productivity'
  }

  if (
    text.includes('saas') ||
    text.includes('subscription') ||
    text.includes('billing') ||
    text.includes('pricing') ||
    text.includes('startup') ||
    text.includes('b2b')
  ) {
    return 'SaaS'
  }

  return 'SaaS' // Default
}

/**
 * Derives signal type from source and title/description patterns
 */
function deriveSignalType(
  source: string,
  title: string,
  description: string
): SignalType {
  const titleLower = title.toLowerCase()
  const descLower = description.toLowerCase()

  // Direct request
  if (source === 'hn_ask' || titleLower.startsWith('ask hn')) {
    return 'Direct request'
  }

  // Market gap
  if (source === 'hn_show' || titleLower.startsWith('show hn')) {
    return 'Market gap'
  }

  // Frustration
  if (
    descLower.includes('frustrat') ||
    descLower.includes('annoying') ||
    descLower.includes('broken') ||
    descLower.includes('terrible') ||
    descLower.includes('hate')
  ) {
    return 'Frustration'
  }

  // Wish list
  if (
    descLower.includes('wish') ||
    descLower.includes('would be nice') ||
    descLower.includes('want') ||
    descLower.includes('need') ||
    descLower.includes('looking for')
  ) {
    return 'Wish list'
  }

  return 'Pain point' // Default
}

/**
 * Truncates text to max length with ellipsis
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Parses github_data JSONB into typed GitHubRepo array
 */
function parseGitHubData(githubData: any[] | null): GitHubRepo[] | undefined {
  if (!githubData || !Array.isArray(githubData) || githubData.length === 0) {
    return undefined
  }

  return githubData.map(repo => ({
    name: repo.name || '',
    url: repo.url || repo.html_url || '',
    description: repo.description || '',
    stars: repo.stars || repo.stargazers_count || 0,
    language: repo.language || '',
    topics: repo.topics || [],
    updated_at: repo.updated_at || '',
  }))
}

/**
 * Maps a database OpportunityRow to a Signal
 */
export function mapOpportunityToSignal(row: OpportunityRow): Signal {
  const category = deriveCategory(row.title, row.description)
  const signalType = deriveSignalType(row.source, row.title, row.description)
  const githubRepos = parseGitHubData(row.github_data)
  // Note: solution_exists is determined by GitHub repo presence
  // This is a heuristic - a dedicated DB column would be more accurate
  const solutionExists = githubRepos !== undefined && githubRepos.length > 0

  return {
    id: row.id,
    source: row.source,
    title: row.title,
    summary: truncateText(row.description, SUMMARY_MAX_LENGTH),
    description: row.description,
    category,
    signal_type: signalType,
    solution_exists: solutionExists,
    date: row.created_at,
    hn_url: row.url,
    points: row.score,
    comments: row.comments,
    author: row.author,
    external_url: row.external_url || undefined,
    github_repos: githubRepos,
  }
}
