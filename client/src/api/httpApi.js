// The real client. Every function here talks to YOUR Express API.
//
// This is the file that matters for your finals project. mockApi.js exists so
// you can build the interface before this has anywhere to point.

const BASE = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    // Try to use the API's own message; fall back to the status line.
    let message = `${response.status} ${response.statusText}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {
      // The body was not JSON. The status line is all we have.
    }
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

async function requestForm(path, options) {
  const response = await fetch(`${BASE}${path}`, options)

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {
      // not JSON, status line is all we have
    }
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

// services api

export const listServices = () => request('/api/service')

export const getService = (id) => request(`/api/service/${id}`)

export const createService = (input) =>
  request('/api/service', { method: 'POST', body: JSON.stringify(input) })

export const updateService = (id, input) =>
  request(`/api/service/${id}`, { method: 'PUT', body: JSON.stringify(input) })

export const deleteService = (id) =>
  request(`/api/service/${id}`, { method: 'DELETE' })

// categories api

export const listCategories = () => request('/api/category')

export const getCategory = (id) => request(`/api/category/${id}`)

export const createCategory = (input) =>
  request('/api/category', { method: 'POST', body: JSON.stringify(input) })

export const updateCategory = (id, input) =>
  request(`/api/category/${id}`, { method: 'PUT', body: JSON.stringify(input) })

export const deleteCategory = (id) =>
  request(`/api/category/${id}`, { method: 'DELETE' })

// artworks api

export const listArtworks = () => request('/api/artwork')

export const getArtwork = (id) => request(`/api/artwork/${id}`)

export const createArtwork = (input) =>
  request('/api/artwork', { method: 'POST', body: input })

export const updateArtwork = (id, input) =>
  request(`/api/artwork/${id}`, { method: 'PUT', body: input })

export const deleteArtwork = (id) =>
  request(`/api/artwork/${id}`, { method: 'DELETE' })
