import { useEffect, useState } from 'react'
import {
  listArtworks, createArtwork, updateArtwork, deleteArtwork,
  listCategories, createCategory, updateCategory, deleteCategory
} from '../api'
import { useAuth } from '../AuthContext'

function ArtworkCard({ artwork, onOpen }) {
  return (
    <button className="artwork-card" onClick={() => onOpen(artwork)}>
      <img src={artwork.image_path} alt={artwork.name} />
    </button>
  )
}

function ArtworkDetailModal({ artwork, category, onClose, onEdit, onDelete, isAdmin }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{artwork.name}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <img className="modal__image" src={artwork.image_path} alt={artwork.name} />

        <dl className="modal__details">
          <dt>Category</dt>
          <dd>{category?.category_name ?? 'Unknown'}</dd>
          <dt>Date made</dt>
          <dd>{artwork.date_made}</dd>
          {artwork.description && (
            <>
              <dt>Description</dt>
              <dd>{artwork.description}</dd>
            </>
          )}
        </dl>

        {isAdmin && (
          <div className="modal__actions">
            <button className="btn btn--danger" onClick={() => onDelete(artwork.id)}>
              Delete
            </button>
            <button className="btn btn--primary" onClick={() => onEdit(artwork)}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ArtworkForm({ artwork, categories, onClose, onSubmit }) {
  const isEditing = Boolean(artwork)
  const [name, setName] = useState(artwork?.name ?? '')
  const [categoryId, setCategoryId] = useState(artwork?.category_id ?? categories[0]?.id ?? '')
  const [dateMade, setDateMade] = useState(artwork?.date_made ?? '')
  const [description, setDescription] = useState(artwork?.description ?? '')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(artwork?.image_path ?? null)
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
    if (!isEditing && !file) return setError('An artwork image (PNG) is required.')
    if (!name.trim()) return setError('Give the piece a name.')
    if (!categoryId) return setError('Choose a category.')
    if (!dateMade) return setError('Pick the date it was made.')

    const formData = new FormData()
    if (file) formData.append('image', file)
    formData.append('name', name.trim())
    formData.append('category_id', categoryId)
    formData.append('date_made', dateMade)
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
          <h2>{isEditing ? 'Edit artwork' : 'Add artwork'}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form">
          <label className="dropzone">
            {preview ? <img src={preview} alt="Preview" /> : <span className="dropzone__hint">Click to choose a PNG file</span>}
            <input type="file" accept="image/png" onChange={handleFileChange} hidden />
          </label>

          <label className="field">
            <span>Title</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} />
          </label>

          <label className="field">
            <span>Category</span>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.category_name}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Date made</span>
            <input
              type="date"
              value={dateMade}
              onChange={(e) => setDateMade(e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
            />
          </label>

          <label className="field">
            <span>Description</span>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>

          {error && <p className="field-error">{error}</p>}

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Saving…' : isEditing ? 'Save changes' : 'Add artwork'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CategoryManagerModal({ categories, onClose, onAdd, onUpdate, onDelete }) {
  const [selectedId, setSelectedId] = useState('')
  const [editName, setEditName] = useState('')
  const [newName, setNewName] = useState('')
  const [error, setError] = useState('')

  function selectCategory(id) {
    setSelectedId(id)
    const found = categories.find((c) => String(c.id) === String(id))
    setEditName(found?.category_name ?? '')
    setError('')
  }

  async function handleUpdate() {
    if (!editName.trim()) return setError('Category name is required.')
    try {
      await onUpdate(selectedId, { category_name: editName.trim() })
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete() {
    if (!selectedId) return
    try {
      await onDelete(selectedId)
      setSelectedId('')
      setEditName('')
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleAdd(e) {
    e.preventDefault()
    if (!newName.trim()) return setError('Category name is required.')
    try {
      await onAdd({ category_name: newName.trim() })
      setNewName('')
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>Manage categories</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="modal__form">
          <label className="field">
            <span>Select a category to edit or delete</span>
            <select value={selectedId} onChange={(e) => selectCategory(e.target.value)}>
              <option value="">— choose —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.category_name}</option>
              ))}
            </select>
          </label>

          {selectedId && (
            <>
              <label className="field">
                <span>Name</span>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
              </label>
              <div className="modal__actions">
                <button type="button" className="btn btn--danger" onClick={handleDelete}>Delete</button>
                <button type="button" className="btn btn--primary" onClick={handleUpdate}>Save changes</button>
              </div>
            </>
          )}

          <hr />

          <form onSubmit={handleAdd} className="field">
            <span>Add a new category</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Category name" />
              <button type="submit" className="btn btn--primary">Add</button>
            </div>
          </form>

          {error && <p className="field-error">{error}</p>}
        </div>
      </div>
    </div>
  )
}

const ALL_CATEGORIES = 'all'

export default function Artworks() {
  const { isAdmin } = useAuth()
  const [artworks, setArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)

  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [artworkFormOpen, setArtworkFormOpen] = useState(false)
  const [editingArtwork, setEditingArtwork] = useState(null)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      const [artworkRows, categoryRows] = await Promise.all([listArtworks(), listCategories()])
      setArtworks(artworkRows)
      setCategories(categoryRows)
      setLoadError('')
    } catch (err) {
      setLoadError("Couldn't load the gallery.")
    } finally {
      setLoading(false)
    }
  }

  function categoryFor(artwork) {
    return categories.find((c) => c.id === artwork.category_id)
  }

  const visibleArtworks =
    activeCategory === ALL_CATEGORIES
      ? artworks
      : artworks.filter((a) => String(a.category_id) === String(activeCategory))

  function openAddArtwork() {
    setEditingArtwork(null)
    setArtworkFormOpen(true)
  }

  function openEditArtwork(artwork) {
    setEditingArtwork(artwork)
    setSelectedArtwork(null)
    setArtworkFormOpen(true)
  }

  async function handleArtworkSubmit(formData) {
    if (editingArtwork) {
      const updated = await updateArtwork(editingArtwork.id, formData)
      setArtworks((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
    } else {
      const created = await createArtwork(formData)
      setArtworks((prev) => [created, ...prev])
    }
    setArtworkFormOpen(false)
  }

  async function handleDeleteArtwork(id) {
    const prev = artworks
    setArtworks((cur) => cur.filter((a) => a.id !== id))
    setSelectedArtwork(null)
    try {
      await deleteArtwork(id)
    } catch (err) {
      setArtworks(prev)
    }
  }

  async function handleAddCategory(input) {
    const created = await createCategory(input)
    setCategories((prev) => [...prev, created])
  }

  async function handleUpdateCategory(id, input) {
    const updated = await updateCategory(id, input)
    setCategories((prev) => prev.map((c) => (String(c.id) === String(updated.id) ? updated : c)))
  }

  async function handleDeleteCategory(id) {
    await deleteCategory(id)
    setCategories((prev) => prev.filter((c) => String(c.id) !== String(id)))
    if (String(activeCategory) === String(id)) setActiveCategory(ALL_CATEGORIES)
  }

  return (
    <section>
      <header className="topbar">
        <h2>Artworks</h2>
        {isAdmin && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn--ghost" onClick={() => setCategoryModalOpen(true)}>
              Edit categories
            </button>
            <button className="btn btn--primary" onClick={openAddArtwork}>
              + Add artwork
            </button>
          </div>
        )}
      </header>

      <nav className="filters">
        <button
          className={`filters__pill ${activeCategory === ALL_CATEGORIES ? 'is-active' : ''}`}
          onClick={() => setActiveCategory(ALL_CATEGORIES)}
        >
          all
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={`filters__pill ${String(activeCategory) === String(c.id) ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.category_name}
          </button>
        ))}
      </nav>

      {loading && <p className="status">Loading the wall…</p>}
      {loadError && <p className="status status--error">{loadError}</p>}
      {!loading && !loadError && visibleArtworks.length === 0 && (
        <p className="status">Nothing here yet.</p>
      )}

      {visibleArtworks.length > 0 && (
        <div className="artwork-grid">
          {visibleArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} onOpen={setSelectedArtwork} />
          ))}
        </div>
      )}

      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          category={categoryFor(selectedArtwork)}
          onClose={() => setSelectedArtwork(null)}
          onEdit={openEditArtwork}
          onDelete={handleDeleteArtwork}
          isAdmin={isAdmin}
        />
      )}

      {isAdmin && artworkFormOpen && (
        <ArtworkForm
          artwork={editingArtwork}
          categories={categories}
          onClose={() => setArtworkFormOpen(false)}
          onSubmit={handleArtworkSubmit}
        />
      )}

      {isAdmin && categoryModalOpen && (
        <CategoryManagerModal
          categories={categories}
          onClose={() => setCategoryModalOpen(false)}
          onAdd={handleAddCategory}
          onUpdate={handleUpdateCategory}
          onDelete={handleDeleteCategory}
        />
      )}
    </section>
  )
}