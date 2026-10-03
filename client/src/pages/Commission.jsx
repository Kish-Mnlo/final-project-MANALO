import { useEffect, useState } from 'react'
import { listServices, createService, updateService, deleteService } from '../api'
import { useAuth } from '../AuthContext'

function ServiceCard({ service, onEdit, onDelete, isAdmin }) {
  return (
    <article className="service-card">
      <div className="service-card__main">
        <div className="service-card__text">
          <span className="service-card__title">{service.name}</span>
          <p className="service-card__description">{service.description}</p>
        </div>

        <div className="service-card__output">
          {service.image_path ? (
            <img src={service.image_path} alt={service.name} />
          ) : (
            <span className="service-card__output-hint">No image yet</span>
          )}
        </div>
      </div>

      {isAdmin && (
        <div className="service-card__actions">
          <button className="btn btn--ghost" onClick={() => onEdit(service)}>
            Edit
          </button>
          <button className="btn btn--danger" onClick={() => onDelete(service.id)}>
            Delete
          </button>
        </div>
      )}
    </article>
  )
}

function ServiceForm({ service, onClose, onSubmit }) {
  const isEditing = Boolean(service)
  const [name, setName] = useState(service?.name ?? '')
  const [description, setDescription] = useState(service?.description ?? '')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(service?.image_path ?? null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleFileChange(e) {
    const selected = e.target.files?.[0]
    if (!selected) return
    if (selected.type !== 'image/png') {
      setError('Please choose a .png file.')
      return
    }
    setError('')
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isEditing && !file) return setError('An image (PNG) is required.')
    if (!name.trim()) return setError('Name is required.')
    if (!description.trim()) return setError('Description is required.')

    const formData = new FormData()
    if (file) formData.append('image', file)
    formData.append('name', name.trim())
    formData.append('description', description.trim())

    setSubmitting(true)
    setError('')
    try {
      await onSubmit(formData)
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
          <label className="dropzone">
            {preview ? (
              <img src={preview} alt="Preview" />
            ) : (
              <span className="dropzone__hint">Click to choose a PNG file</span>
            )}
            <input type="file" accept="image/png" onChange={handleFileChange} hidden />
          </label>

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
  const { isAdmin } = useAuth()
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

  async function handleSubmit(formData) {
    if (editingService) {
      const updated = await updateService(editingService.id, formData)
      setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
    } else {
      const created = await createService(formData)
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
        {isAdmin && (
          <button className="btn btn--primary" onClick={openAddForm}>
            + Add service
          </button>
        )}
      </header>

      {loading && <p className="status">Loading services…</p>}
      {loadError && <p className="status status--error">{loadError}</p>}

      <div className="commission-columns">
        <div className="commission-column">
          <span className="commission-column__title">Services</span>

          {!loading && !loadError && services.length === 0 && (
            <p className="status">No services yet{isAdmin ? ' — add the first one.' : '.'}</p>
          )}

          {services.length > 0 && (
            <div className="service-grid">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}
        </div>

        <div className="commission-column">
          <span className="commission-column__title commission-column__title--terms">
            Terms of Service
          </span>
          <ul className="terms-list">
            <li>Placeholder term — replace with your real terms.</li>
            <li>Placeholder term — replace with your real terms.</li>
            <li>Placeholder term — replace with your real terms.</li>
            <li>Placeholder term — replace with your real terms.</li>
          </ul>
        </div>
      </div>

      {isAdmin && formOpen && (
        <ServiceForm
          service={editingService}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  )
}