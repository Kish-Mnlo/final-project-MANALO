import { useState } from 'react'
import { useAuth } from './AuthContext'

export default function AdminLoginModal({ onClose }) {
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

 
  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      let token

      const useMockAPI =
        import.meta.env.VITE_USE_MOCK_API !== 'false'

      if (useMockAPI) {
        // Demo login: no backend or database required.
        const DEMO_PASSWORD = 'admin123'

        if (password !== DEMO_PASSWORD) {
          throw new Error('Incorrect password')
        }

        token = 'demo-admin-token'
      } else {
        // Real login: requires your Express API.
        const API_BASE =
          import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

        const res = await fetch(`${API_BASE}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        })

        const body = await res.json().catch(() => ({}))

        if (!res.ok) {
          throw new Error(body.error || 'Incorrect password')
        }

        token = body.token
      }

      login(token)
      onClose()
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Admin login</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </label>

          {error && <p className="field-error">{error}</p>}

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Logging in…' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}