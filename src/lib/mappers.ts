import type { Signal, Category, EvidenceBucket, ValidatedOpportunityRow } from './types'

/**
 * Safely parse a JSONB field that may be a string or already an object
 */
function parseJsonField<T>(field: any): T | null {
  if (!field) return null
  if (typeof field === 'string') {
    try {
      return JSON.parse(field) as T
    } catch {
      return null
    }
  }
  return field as T
}

/**
 * Parse slash-separated opportunity_type into Category array
 */
function parseCategories(opportunityType: string | null): Category[] {
  if (!opportunityType) return ['emerging-category']

  const validCategories: Category[] = [
    'developer-tooling',
    'demographic-market-gap',
    'infrastructure-need',
    'workflow-inefficiency',
    'emerging-category',
  ]

  const parsed = opportunityType
    .split('/')
    .map(s => s.trim().toLowerCase().replace(/\s+/g, '-'))
    .filter((s): s is Category => validCategories.includes(s as Category))

  return parsed.length > 0 ? parsed : ['emerging-category']
}

/**
 * Parse an evidence bucket from JSONB
 */
function parseEvidence(raw: any): EvidenceBucket | undefined {
  const parsed = parseJsonField<EvidenceBucket>(raw)
  if (!parsed) return undefined
  return {
    status: parsed.status || 'unknown',
    results: Array.isArray(parsed.results) ? parsed.results : [],
    summary: parsed.summary || '',
    supporting: parsed.supporting ?? false,
  }
}

/**
 * Maps a validated_opportunities DB row to a Signal
 */
export function mapValidatedOpportunityToSignal(row: ValidatedOpportunityRow): Signal {
  return {
    id: row.id,
    signal_id: row.signal_id,
    source: row.signal_source,
    title: row.signal_title,
    narrative: row.narrative || '',
    one_line_hook: row.one_line_hook || '',
    key_insight: row.key_insight || '',
    categories: parseCategories(row.opportunity_type),
    confidence: (row.confidence?.toLowerCase() as Signal['confidence']) || 'low',
    relevance_score: row.relevance_score ?? 0,
    content_potential: row.content_potential ?? 0,
    sources_confirming: row.sources_confirming ?? 0,
    date: row.validated_at,
    signal_url: row.signal_url || '',
    points: row.signal_score ?? undefined,
    comments: row.signal_comments ?? undefined,
    evidence: {
      google_trends: parseEvidence(row.evidence_google_trends),
      product_hunt: parseEvidence(row.evidence_producthunt),
      github: parseEvidence(row.evidence_github),
    },
  }
}
