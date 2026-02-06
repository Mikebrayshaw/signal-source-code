import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-accent font-mono animate-pulse">Loading...</div>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <div className="flex items-center gap-2 justify-center mb-4">
          <span className="text-accent font-mono text-2xl">⚡</span>
          <span className="font-display font-bold text-2xl text-gray-100">Build Signals</span>
        </div>
        <p className="text-sm text-muted font-body">Sign in to access your dashboard</p>
      </div>
      <LoginForm />
    </div>
  )
}
