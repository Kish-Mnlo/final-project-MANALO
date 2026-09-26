import express from 'express'
import cors from 'cors'
import { pool } from './db/pool.js'
import * as category from './categoryRepo.js'
import * as artwork from './artworksRepo.js'
import * as service from './serviceRepo.js'

const app = express()

// CORS before the routes. Middleware registered after a route never sees that
// route's requests, which is the m4 lesson showing up in production.
//
// Name your origins. app.use(cors()) with no options sends
// Access-Control-Allow-Origin: *, which lets any site on the internet call this
// API from a visitor's browser, and is incompatible with cookies.
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '100kb' }))

// Is the process alive?
app.get('/healthz', (request, response) => {
  response.json({ ok: true })
})

// Is the database reachable? A different question, and the one that tells you
// in two seconds which half of a problem you have.
app.get('/readyz', async (request, response) => {
  try {
    await pool.query('SELECT 1')
    response.json({ ok: true, db: 'up' })
  } catch (error) {
    console.error('readyz failed:', error.message)
    response.status(503).json({ ok: false, db: 'down' })
  }
})

// Validation lives on the server because the client can be bypassed. The
// browser form is for a fast, friendly message; this is for correctness.
async function validateCategory(body) {
  const errors = []
  const category_name = typeof body.category_name === 'string' ? body.category_name.trim() : ''

  const existing = await category.getByName(pool, body.category_name)
  if (existing.rows.length > 0) errors.push('Category name already exists.')
  if (!category_name) errors.push('Name is required.')

    return { errors, value: { category_name } }
}

async function validateArtwork(body) {
  const errors = []
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const category_id = Number(body.category_id)
  const date_made = typeof body.date_made === 'string' ? /^\d{4}-\d{2}-\d{2}$/.test(date_made) : ''
  const description =
    typeof body.description === 'string' ? body.description.trim() : ''
  
  if (!name) errors.push('Name of Artwork is required.')
  if (!Number.isInteger(category_id)) errors.push('Category ID must be an integer.')
  if (!date_made) errors.push('Date is required.')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date_made)) errors.push('Date must be in YYYY-MM-DD format.')
  if (new Date(date_made) > new Date()) errors.push('Date cannot be in the future.')

  return { errors, value: { name, category_id, date_made, description } }
}

async function validateService(body) {
  const errors = []
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const description = typeof body.description == 'string' ? body.description.trim() : ''

  if (!name) errors.push('Name is required.')
  if (!description) errors.push('Description is required.')

    return { errors, value: { name, description } }
}

// category routes

app.get('/api/category', async (req, res, next) => {
  try {
    res.json(await category.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.get('/api/category/:id', async (req, res, next) => {
  try {
    const row = await category.getById(pool, req.params.id)
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json(row)
  } catch (error) {
    next(error)
  }
})

app.post('/api/category', async (req, res, next) => {
  const { errors, value } = validateCategory(request.body ?? {})
  if (errors.length > 0) return res.status(400).json({ error: errors.join('; ') })

  try {
    res.status(201).json(await category.create(pool, value))
  } catch (error) {
    next(error)
  }
})

app.put('/api/category/:id', async (req, res, next) => {
  const { errors, value } = validateCategory(req.body ?? {})
  if (errors.length > 0) return res.status(400).json({ error: errors.join('; ') })

  try {
    const row = await category.update(pool, req.params.id, value)
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json(row)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/category/:id', async (req, res, next) => {
  try {
    const removed = await category.remove(pool, req.params.id)
    if (!removed) return res.status(404).json({ error: 'Not found' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// service routes

app.get('/api/service', async (req, res, next) => {
  try {
    res.json(await service.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.get('/api/service/:id', async (req, res, next) => {
  try {
    const row = await service.getById(pool, req.params.id)
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json(row)
  } catch (error) {
    next(error)
  }
})

app.post('/api/service', async (req, res, next) => {
  const { errors, value } = validateService(request.body ?? {})
  if (errors.length > 0) return res.status(400).json({ error: errors.join('; ') })

  try {
    res.status(201).json(await service.create(pool, value))
  } catch (error) {
    next(error)
  }
})

app.put('/api/service/:id', async (req, res, next) => {
  const { errors, value } = validateService(req.body ?? {})
  if (errors.length > 0) return res.status(400).json({ error: errors.join('; ') })

  try {
    const row = await service.update(pool, req.params.id, value)
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json(row)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/service/:id', async (req, res, next) => {
  try {
    const removed = await service.remove(pool, req.params.id)
    if (!removed) return res.status(404).json({ error: 'Not found' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// artwork routes

app.get('/api/artwork', async (req, res, next) => {
  try {
    res.json(await artwork.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.get('/api/artwork/:id', async (req, res, next) => {
  try {
    const row = await artwork.getById(pool, req.params.id)
    if (!row) return res.status(404).json({ error: 'Not found' })
    res.json(row)
  } catch (error) {
    next(error)
  }
})

app.post('/api/artwork', async (req, res, next) => {
  const { errors, value } = validateArtwork(req.body ?? {})
  if (errors.length > 0) return res.status(400).json({ error: errors.join('; ') })

  try {
    res.status(201).json(await artwork.create(pool, value))
  } catch (error) {
    next(error)
  }
})

app.put('/api/artwork/:id', async (req, res, next) => {
  const { errors, value } = validateArtwork(req.body ?? {})
  if (errors.length > 0) return res.status(400).json({ error: errors.join('; ') })

  try {
    const row = await artwork.update(pool, req.params.id, value)
    if (!row) return res.status(404).json({ error: 'Not found' })
    response.json(row)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/artwork/:id', async (req, res, next) => {
  try {
    const removed = await artwork.remove(pool, req.params.id)
    if (!removed) return res.status(404).json({ error: 'Not found' })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use((req, res) => {
  res.status(404).json({ error: 'No such route' })
})

// The detail goes in your logs; the visitor gets a plain message. Sending a
// stack trace to a stranger tells them about your file layout and dependencies.
app.use((error, request, response, next) => {
  console.error(error)
  response.status(500).json({ error: 'Something went wrong on the server' })
})

// The host chooses the port and tells you through PORT. Hardcoding 3000 is the
// commonest reason a first deploy is marked unhealthy and killed.
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
  console.log(`CORS allows: ${allowedOrigins.join(', ')}`)
})
