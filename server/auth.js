// src/auth.js
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev-only-secret-change-me'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'secret'

export function login(req, res) {
  const { password } = req.body ?? {}
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' })
  }
  const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '12h' })
  res.json({ token })
}

// Blocks the request unless a valid admin token is present
export function requireAdmin(req, res, next) {
  const header = req.headers.authorization ?? ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Login required' })

  try {
    const payload = jwt.verify(token, SECRET)
    if (payload.role !== 'admin') throw new Error('not admin')
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' })
  }
}