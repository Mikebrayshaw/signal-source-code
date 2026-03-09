import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

interface SubscriptionContextType {
  isPro: boolean
  loading: boolean
  currentPeriodEnd: string | null
  checkout: () => Promise<void>
  refresh: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [isPro, setIsPro] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null)

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setIsPro(false)
      setLoading(false)
      return
    }

    // Dev bypass
    if (user.id === 'dev-user') {
      setIsPro(true)
      setLoading(false)
      return
    }

    try {
      const { data } = await supabase
        .from('subscriptions')
        .select('status, current_period_end')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setIsPro(data.status === 'active' || data.status === 'trialing')
        setCurrentPeriodEnd(data.current_period_end)
      } else {
        setIsPro(false)
      }
    } catch {
      setIsPro(false)
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchSubscription()
  }, [fetchSubscription])

  // Handle ?checkout=success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('checkout') === 'success') {
      // Give webhook a moment to process
      const timer = setTimeout(() => {
        fetchSubscription()
        // Clean up URL
        const url = new URL(window.location.href)
        url.searchParams.delete('checkout')
        window.history.replaceState({}, '', url.pathname + url.search)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [fetchSubscription])

  const checkout = async () => {
    if (!user) return

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, user_email: user.email }),
    })

    const { url, error } = await res.json()
    if (error) {
      console.error('Checkout error:', error)
      return
    }

    window.location.href = url
  }

  return (
    <SubscriptionContext.Provider
      value={{ isPro, loading, currentPeriodEnd, checkout, refresh: fetchSubscription }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext)
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider')
  return ctx
}
