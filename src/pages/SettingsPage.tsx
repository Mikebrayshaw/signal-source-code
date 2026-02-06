import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { ALL_CATEGORIES } from '../lib/constants'
import { cn } from '../lib/utils'
import type { Category } from '../lib/types'

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const [emailDigest, setEmailDigest] = useState(true)
  const [digestFrequency, setDigestFrequency] = useState<'daily' | 'weekly'>('daily')
  const [preferredCategories, setPreferredCategories] = useState<Set<Category>>(new Set())

  const toggleCategory = (cat: Category) => {
    setPreferredCategories(prev => {
      const next = new Set(prev)
      next.has(cat) ? next.delete(cat) : next.add(cat)
      return next
    })
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display font-bold text-xl text-gray-100 mb-6">Settings</h1>

      {/* Account */}
      <section className="bg-surface border border-border rounded-xl p-5 mb-4">
        <h2 className="font-body font-semibold text-sm text-gray-200 mb-3">Account</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-300 font-body">{user?.email}</p>
            <p className="text-xs text-muted font-body mt-0.5">Lifetime access</p>
          </div>
          <button
            onClick={signOut}
            className="px-4 py-2 text-sm font-body text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </section>

      {/* Email Digest */}
      <section className="bg-surface border border-border rounded-xl p-5 mb-4">
        <h2 className="font-body font-semibold text-sm text-gray-200 mb-3">Email Digest</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              onClick={() => setEmailDigest(!emailDigest)}
              className={cn(
                'w-10 h-5 rounded-full transition-colors relative',
                emailDigest ? 'bg-accent' : 'bg-white/10'
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform',
                  emailDigest ? 'translate-x-5' : 'translate-x-0.5'
                )}
              />
            </button>
            <span className="text-sm text-gray-300 font-body">
              Receive email digests of new signals
            </span>
          </label>

          {emailDigest && (
            <div className="flex gap-2 ml-[52px]">
              {(['daily', 'weekly'] as const).map(freq => (
                <button
                  key={freq}
                  onClick={() => setDigestFrequency(freq)}
                  className={cn(
                    'px-3 py-1 rounded text-xs font-body capitalize transition-colors',
                    digestFrequency === freq
                      ? 'bg-accent/15 text-accent'
                      : 'bg-white/5 text-gray-400 hover:text-gray-200'
                  )}
                >
                  {freq}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Preferences */}
      <section className="bg-surface border border-border rounded-xl p-5">
        <h2 className="font-body font-semibold text-sm text-gray-200 mb-1">Category Preferences</h2>
        <p className="text-xs text-muted font-body mb-3">Select categories you're most interested in</p>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-body transition-colors',
                preferredCategories.has(cat)
                  ? 'bg-accent/15 text-accent ring-1 ring-accent/30'
                  : 'bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
