// src/pages/Commission.jsx
import { useEffect, useState } from 'react'
import { listServices, createService, updateService, deleteService } from '../api'

function ServiceCard({ service, onEdit, onDelete }) {
  return (
    <article className="service-card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <div className="service-card__actions">
        <button className="btn btn--ghost" onClick={() => onEdit(service)}>
          Edit
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(service.id)}>
          Delete
        </button>
      </div>
    </article>
  )
}

function ServiceForm({ service, onClose, onSubmit }) {
  const [name, setName] = useState(service?.name ?? '')
  const [description, setDescription] = useState(service?.description ?? '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isEditing = Boolean(service)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return setError('Name is required.')

    setSubmitting(true)
    setError('')
    try {
      await onSubmit({ name: name.trim(), description: description.trim() })
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{isEditing ? 'Edit service' : 'Add service'}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={120}
            />
          </label>

          <label className="field">
            <span>Description</span>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          {error && <p className="field-error">{error}</p>}

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Saving…' : isEditing ? 'Save changes' : 'Add service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Commission() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [editingService, setEditingService] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      setServices(await listServices())
      setLoadError('')
    } catch (err) {
      setLoadError("Couldn't load services.")
    } finally {
      setLoading(false)
    }
  }

  function openAddForm() {
    setEditingService(null)
    setFormOpen(true)
  }

  function openEditForm(service) {
    setEditingService(service)
    setFormOpen(true)
  }

  async function handleSubmit(values) {
    if (editingService) {
      const updated = await updateService(editingService.id, values)
      setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
    } else {
      const created = await createService(values)
      setServices((prev) => [created, ...prev])
    }
    setFormOpen(false)
  }

  async function handleDelete(id) {
    const prev = services
    setServices((cur) => cur.filter((s) => s.id !== id))
    try {
      await deleteService(id)
    } catch (err) {
      setServices(prev)
    }
  }

  return (
    <section>
      <header className="topbar">
        <h2>Commission Services</h2>
        <button className="btn btn--primary" onClick={openAddForm}>
          + Add service
        </button>
      </header>

      {loading && <p className="status">Loading services…</p>}
      {loadError && <p className="status status--error">{loadError}</p>}
      {!loading && !loadError && services.length === 0 && (
        <p className="status">No services yet — add the first one.</p>
      )}

      <div className="service-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {formOpen && (
        <ServiceForm
          service={editingService}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  )
}