// The simulated backend.
//
// Same function names, same return types, and the same shape of failure as
// httpApi.js, so your components cannot tell the difference. Data lives in the
// visitor's own browser and goes no further.
//
// This exists so the template's GitHub Pages link works on day one and so you
// can build the interface before your API is deployed. It is NOT a finished
// project. See content/extending-your-app page 3.

import artworkSeed from './artworkSeed.json'
import categorySeed from './categorySeed.json'
import serviceSeed from './serviceSeed.json'

const ARTWORK_KEY = 'final-project:artwork'
const CATEGORY_KEY = 'final-project:category'
const SERVICE_KEY = 'final-project:services'

// A real network is not instant. Keeping this delay is what forces you to build
// a loading state now, while it is cheap, instead of discovering you need one
// the day you switch to the real API.
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

// --- generic read/write helpers, one localStorage key per resource ---

function read(key, seed) {
  const stored = localStorage.getItem(key)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      localStorage.removeItem(key)
    }
  }
  localStorage.setItem(key, JSON.stringify(seed))
  return seed
}

function write(key, rows) {
  localStorage.setItem(key, JSON.stringify(rows))
  return rows
}

function nextId(rows) {
  return rows.length ? Math.max(...rows.map((r) => Number(r.id))) + 1 : 1
}

// A File can't go into localStorage directly, so it's converted to a base64
// data URL — that's a string, which JSON.stringify/localStorage can hold,
// and it works directly as an <img src> just like a real /uploads/... URL.
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Could not read the image file'))
    reader.readAsDataURL(file)
  })
}

// --- artwork ---

export async function listArtworks() {
  await delay()
  return read(ARTWORK_KEY, artworkSeed)
    .slice()
    .sort((a, b) => b.date_made.localeCompare(a.date_made))
}

export async function getArtwork(id) {
  await delay()
  const found = read(ARTWORK_KEY, artworkSeed).find((row) => String(row.id) === String(id))
  if (!found) throw new Error('Not found')
  return found
}

// formData mirrors what httpApi.js expects: an "image" File plus the text
// fields, so Artworks.jsx doesn't need to know which implementation is running.
export async function createArtwork(formData) {
  await delay()
  const rows = read(ARTWORK_KEY, artworkSeed)

  const file = formData.get('image')
  if (!file) throw new Error('image is required')

  const image_path = await fileToDataUrl(file)

  const created = {
    id: nextId(rows),
    name: formData.get('name'),
    category_id: Number(formData.get('category_id')),
    date_made: formData.get('date_made'),
    description: formData.get('description') ?? '',
    image_path,
  }

  write(ARTWORK_KEY, [...rows, created])
  return created
}

export async function updateArtwork(id, formData) {
  await delay()
  const rows = read(ARTWORK_KEY, artworkSeed)
  const index = rows.findIndex((row) => String(row.id) === String(id))
  if (index === -1) throw new Error('Not found')

  const file = formData.get('image')
  const image_path = file && file.size > 0 ? await fileToDataUrl(file) : rows[index].image_path

  rows[index] = {
    ...rows[index],
    name: formData.get('name'),
    category_id: Number(formData.get('category_id')),
    date_made: formData.get('date_made'),
    description: formData.get('description') ?? '',
    image_path,
  }

  write(ARTWORK_KEY, rows)
  return rows[index]
}

export async function deleteArtwork(id) {
  await delay()
  write(ARTWORK_KEY, read(ARTWORK_KEY, artworkSeed).filter((row) => String(row.id) !== String(id)))
}

// --- category ---

export async function listCategories() {
  await delay()
  return read(CATEGORY_KEY, categorySeed)
}

export async function createCategory({ category_name }) {
  await delay()
  const rows = read(CATEGORY_KEY, categorySeed)
  const created = { id: nextId(rows), category_name }
  write(CATEGORY_KEY, [...rows, created])
  return created
}

export async function updateCategory(id, { category_name }) {
  await delay()
  const rows = read(CATEGORY_KEY, categorySeed)
  const index = rows.findIndex((row) => String(row.id) === String(id))
  if (index === -1) throw new Error('Not found')
  rows[index] = { ...rows[index], category_name }
  write(CATEGORY_KEY, rows)
  return rows[index]
}

// Mirrors ON DELETE CASCADE from the real schema: removing a category also
// removes every artwork that referenced it, so mock and real behavior match.
export async function deleteCategory(id) {
  await delay()
  write(CATEGORY_KEY, read(CATEGORY_KEY, categorySeed).filter((row) => String(row.id) !== String(id)))
  write(
    ARTWORK_KEY,
    read(ARTWORK_KEY, artworkSeed).filter((row) => String(row.category_id) !== String(id))
  )
}

// --- services ---

export async function listServices() {
  await delay()
  return read(SERVICE_KEY, serviceSeed)
}

export async function getService(id) {
  await delay()
  const found = read(SERVICE_KEY, serviceSeed).find((row) => String(row.id) === String(id))
  if (!found) throw new Error('Not found')
  return found
}

export async function createService(formData) {
  await delay()
  const rows = read(SERVICE_KEY, serviceSeed)

  const file = formData.get('image')
  if (!file || file.size === 0) throw new Error('image is required')

  const image_path = await fileToDataUrl(file)

  const created = {
    id: nextId(rows),
    name: formData.get('name'),
    description: formData.get('description') ?? '',
    image_path,
  }

  write(SERVICE_KEY, [...rows, created])
  return created
}

export async function updateService(id, formData) {
  await delay()
  const rows = read(SERVICE_KEY, serviceSeed)
  const index = rows.findIndex((row) => String(row.id) === String(id))
  if (index === -1) throw new Error('Not found')

  const file = formData.get('image')
  const image_path = file && file.size > 0 ? await fileToDataUrl(file) : rows[index].image_path

  rows[index] = {
    ...rows[index],
    name: formData.get('name'),
    description: formData.get('description') ?? '',
    image_path,
  }

  write(SERVICE_KEY, rows)
  return rows[index]
}

export async function deleteService(id) {
  await delay()
  write(SERVICE_KEY, read(SERVICE_KEY, serviceSeed).filter((row) => String(row.id) !== String(id)))
}