// The simulated backend.
//
// Same function names, same return types, and the same shape of failure as
// httpApi.js, so your components cannot tell the difference. Data lives in the
// visitor's own browser and goes no further.
//
// This exists so the template's GitHub Pages link works on day one and so you
// can build the interface before your API is deployed. It is NOT a finished
// project. See content/extending-your-app page 3.

import seed from './seed.json'
import serviceSeed from './serviceSeed.json'

const KEY = 'final-project:sightings'
const SERVICE_KEY = 'final-project:services'

// A real network is not instant. Keeping this delay is what forces you to build
// a loading state now, while it is cheap, instead of discovering you need one
// the day you switch to the real API.
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

//services

function readServices() {
  const stored = localStorage.getItem(SERVICE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      localStorage.removeItem(SERVICE_KEY)
    }
  }
  localStorage.setItem(SERVICE_KEY, JSON.stringify(serviceSeed))
  return serviceSeed
}

function writeServices(rows) {
  localStorage.setItem(SERVICE_KEY, JSON.stringify(rows))
  return rows
}

export async function listServices() {
  await delay()
  return readServices()
}

export async function getService(id) {
  await delay()
  const found = readServices().find((row) => String(row.id) === String(id))
  if (!found) throw new Error('Not found')
  return found
}

export async function createService(input) {
  await delay()
  const created = { ...input, id: crypto.randomUUID() }
  writeServices([...readServices(), created])
  return created
}

export async function updateService(id, input) {
  await delay()
  const rows = readServices()
  const index = rows.findIndex((row) => String(row.id) === String(id))
  if (index === -1) throw new Error('Not found')
  rows[index] = { ...rows[index], ...input }
  writeServices(rows)
  return rows[index]
}

export async function deleteService(id) {
  await delay()
  writeServices(readServices().filter((row) => String(row.id) !== String(id)))
}

function read() {
  const stored = localStorage.getItem(KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Corrupted storage. Start again rather than crashing the app.
      localStorage.removeItem(KEY)
    }
  }
  localStorage.setItem(KEY, JSON.stringify(seed))
  return seed
}

function write(rows) {
  localStorage.setItem(KEY, JSON.stringify(rows))
  return rows
}

export async function listSightings() {
  await delay()
  return read().slice().sort((a, b) => b.reported_at.localeCompare(a.reported_at))
}

export async function getSighting(id) {
  await delay()
  const found = read().find((row) => String(row.id) === String(id))
  if (!found) throw new Error('Not found')
  return found
}

export async function createSighting(input) {
  await delay()
  const created = {
    ...input,
    id: crypto.randomUUID(),
    reported_at: new Date().toISOString(),
  }
  write([...read(), created])
  return created
}

export async function updateSighting(id, input) {
  await delay()
  const rows = read()
  const index = rows.findIndex((row) => String(row.id) === String(id))
  if (index === -1) throw new Error('Not found')
  rows[index] = { ...rows[index], ...input }
  write(rows)
  return rows[index]
}

export async function deleteSighting(id) {
  await delay()
  write(read().filter((row) => String(row.id) !== String(id)))
}
