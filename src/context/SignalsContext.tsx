import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import type {
  Signal,
  NavFilter,
  SortOption,
  ViewMode,
  Category,
  SignalType,
  DateRange,
} from '../lib/types'
import { mockSignals } from '../lib/mockData'
import { PAGE_SIZE, INITIAL_FETCH_LIMIT } from '../lib/constants'
import { supabase } from '../lib/supabase'
import { mapOpportunityToSignal } from '../lib/mappers'

interface SignalsContextType {
  // Data
  allSignals: Signal[]
  filteredSignals: Signal[]
  displayedSignals: Signal[]
  loading: boolean
  error: string | null
  // Nav
  navFilter: NavFilter
  setNavFilter: (f: NavFilter) => void
  // Filters
  selectedCategories: Set<Category>
  toggleCategory: (c: Category) => void
  selectedSignalTypes: Set<SignalType>
  toggleSignalType: (t: SignalType) => void
  dateRange: DateRange
  setDateRange: (d: DateRange) => void
  solutionFilter: 'all' | 'exists' | 'none'
  setSolutionFilter: (f: 'all' | 'exists' | 'none') => void
  // Search & Sort
  searchQuery: string
  setSearchQuery: (q: string) => void
  sortOption: SortOption
  setSortOption: (s: SortOption) => void
  // View
  viewMode: ViewMode
  setViewMode: (v: ViewMode) => void
  // Pagination
  page: number
  hasMore: boolean
  loadMore: () => void
  // Save/Archive
  savedIds: Set<string>
  archivedIds: Set<string>
  toggleSave: (id: string) => void
  toggleArchive: (id: string) => void
  // Stats
  totalCount: number
  openCount: number
  savedCount: number
}

const SignalsContext = createContext<SignalsContextType | null>(null)

function loadSet(key: string): Set<string> {
  try {
    const raw = localStorage.getItem(key)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveSet(key: string, set: Set<string>) {
  localStorage.setItem(key, JSON.stringify([...set]))
}

export function SignalsProvider({ children }: { children: ReactNode }) {
  const [allSignals, setAllSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [navFilter, setNavFilter] = useState<NavFilter>('all')
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set())
  const [selectedSignalTypes, setSelectedSignalTypes] = useState<Set<SignalType>>(new Set())
  const [dateRange, setDateRange] = useState<DateRange>('all')
  const [solutionFilter, setSolutionFilter] = useState<'all' | 'exists' | 'none'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('feed')
  const [page, setPage] = useState(1)
  const [savedIds, setSavedIds] = useState<Set<string>>(() => loadSet('savedIds'))
  const [archivedIds, setArchivedIds] = useState<Set<string>>(() => loadSet('archivedIds'))

  // Fetch signals from Supabase on mount
  useEffect(() => {
    async function fetchSignals() {
      try {
        const { data, error } = await supabase
          .from('opportunities')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(INITIAL_FETCH_LIMIT)

        if (error) throw error

        const signals = (data || []).map(mapOpportunityToSignal)
        setAllSignals(signals)
      } catch (err) {
        console.error('Failed to fetch signals:', err)
        setAllSignals(mockSignals) // Fallback to mock data
        setError('Failed to load live data. Showing sample signals.')
      } finally {
        setLoading(false)
      }
    }
    fetchSignals()
  }, [])

  // Persist save/archive
  useEffect(() => saveSet('savedIds', savedIds), [savedIds])
  useEffect(() => saveSet('archivedIds', archivedIds), [archivedIds])

  // Reset page on any filter change
  useEffect(() => { setPage(1) }, [navFilter, selectedCategories, selectedSignalTypes, dateRange, solutionFilter, searchQuery, sortOption])

  const toggleCategory = useCallback((c: Category) => {
    setSelectedCategories(prev => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })
  }, [])

  const toggleSignalType = useCallback((t: SignalType) => {
    setSelectedSignalTypes(prev => {
      const next = new Set(prev)
      next.has(t) ? next.delete(t) : next.add(t)
      return next
    })
  }, [])

  const toggleSave = useCallback((id: string) => {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const toggleArchive = useCallback((id: string) => {
    setArchivedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const filteredSignals = useMemo(() => {
    let result = allSignals

    // Nav filter
    if (navFilter === 'saved') {
      result = result.filter(s => savedIds.has(s.id))
    } else if (navFilter === 'archived') {
      result = result.filter(s => archivedIds.has(s.id))
    } else if (navFilter === 'open') {
      result = result.filter(s => !s.solution_exists)
    } else {
      // 'all' — hide archived unless viewing archive
      result = result.filter(s => !archivedIds.has(s.id))
    }

    // Category filter
    if (selectedCategories.size > 0) {
      result = result.filter(s => selectedCategories.has(s.category))
    }

    // Signal type filter
    if (selectedSignalTypes.size > 0) {
      result = result.filter(s => selectedSignalTypes.has(s.signal_type))
    }

    // Date filter
    if (dateRange !== 'all') {
      const now = Date.now()
      const ms = dateRange === '24h' ? 86400000 : dateRange === '7d' ? 604800000 : 2592000000
      result = result.filter(s => now - new Date(s.date).getTime() <= ms)
    }

    // Solution filter
    if (solutionFilter === 'exists') {
      result = result.filter(s => s.solution_exists)
    } else if (solutionFilter === 'none') {
      result = result.filter(s => !s.solution_exists)
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        s =>
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'most-points':
          return (b.points ?? 0) - (a.points ?? 0)
        case 'most-comments':
          return (b.comments ?? 0) - (a.comments ?? 0)
      }
    })

    return result
  }, [allSignals, navFilter, selectedCategories, selectedSignalTypes, dateRange, solutionFilter, searchQuery, sortOption, savedIds, archivedIds])

  const displayedSignals = useMemo(
    () => filteredSignals.slice(0, page * PAGE_SIZE),
    [filteredSignals, page]
  )

  const hasMore = displayedSignals.length < filteredSignals.length
  const loadMore = useCallback(() => setPage(p => p + 1), [])

  const totalCount = allSignals.filter(s => !archivedIds.has(s.id)).length
  const openCount = allSignals.filter(s => !s.solution_exists && !archivedIds.has(s.id)).length
  const savedCount = allSignals.filter(s => savedIds.has(s.id)).length

  return (
    <SignalsContext.Provider
      value={{
        allSignals,
        filteredSignals,
        displayedSignals,
        loading,
        error,
        navFilter,
        setNavFilter,
        selectedCategories,
        toggleCategory,
        selectedSignalTypes,
        toggleSignalType,
        dateRange,
        setDateRange,
        solutionFilter,
        setSolutionFilter,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        viewMode,
        setViewMode,
        page,
        hasMore,
        loadMore,
        savedIds,
        archivedIds,
        toggleSave,
        toggleArchive,
        totalCount,
        openCount,
        savedCount,
      }}
    >
      {children}
    </SignalsContext.Provider>
  )
}

export function useSignals() {
  const ctx = useContext(SignalsContext)
  if (!ctx) throw new Error('useSignals must be used within SignalsProvider')
  return ctx
}
