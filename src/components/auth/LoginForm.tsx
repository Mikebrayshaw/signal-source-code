import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginForm() {
  const { signIn, signInWithMagicLink } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'password' | 'magic'>('magic')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    if (mode === 'password') {
      const { error } = await signIn(email, password)
      if (error) setError(error)
    } else {
      const { error } = await signInWithMagicLink(email)
      if (error) setError(error)
      else setSuccess('Check your email for a magic link!')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div>
        <label className="block text-xs text-muted font-body uppercase tracking-wider mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-gray-200 font-body placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
          placeholder="you@company.com"
        />
      </div>

      {mode === 'password' && (
        <div>
          <label className="block text-xs text-muted font-body uppercase tracking-wider mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-gray-200 font-body placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
            placeholder="••••••••"
          />
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm font-body">{error}</p>
      )}
      {success && (
        <p className="text-accent text-sm font-body">{success}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-bg font-body font-semibold py-2.5 rounded-lg hover:bg-accent-dim transition-colors disabled:opacity-50"
      >
        {loading ? 'Loading...' : mode === 'password' ? 'Sign In' : 'Send Magic Link'}
      </button>

      <button
        type="button"
        onClick={() => { setMode(mode === 'password' ? 'magic' : 'password'); setError(null); setSuccess(null) }}
        className="w-full text-center text-xs text-muted hover:text-gray-300 font-body transition-colors"
      >
        {mode === 'password' ? 'Use magic link instead' : 'Use password instead'}
      </button>
    </form>
  )
}
