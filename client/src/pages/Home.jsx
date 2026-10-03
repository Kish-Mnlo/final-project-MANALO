import { useEffect, useState } from 'react'
import { listArtworks } from '../api'

function ArtworkCarousel() {
  const [artworks, setArtworks] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listArtworks()
      .then(setArtworks)
      .catch(() => setArtworks([]))
      .finally(() => setLoading(false))
  }, [])

  function showPrevious() {
    setIndex((i) => (i === 0 ? artworks.length - 1 : i - 1))
  }

  function showNext() {
    setIndex((i) => (i === artworks.length - 1 ? 0 : i + 1))
  }

  if (loading) {
    return (
      <section className="carousel">
        <p className="status">Loading artwork…</p>
      </section>
    )
  }

  if (artworks.length === 0) {
    return (
      <section className="carousel">
        <p className="status">No artwork to show yet.</p>
      </section>
    )
  }

  const current = artworks[index]

  return (
    <section className="carousel">
      <button className="carousel__arrow" onClick={showPrevious} aria-label="Previous">
        ‹
      </button>

      <div className="carousel__card">
        <img src={current.image_path} alt={current.name} />
      </div>

      <div className="carousel__lines">
        <span className="carousel__title">{current.name}</span>
        <span className="carousel__meta">{current.date_made}</span>
        {current.description && (
          <span className="carousel__description">{current.description}</span>
        )}
      </div>

      <button className="carousel__arrow" onClick={showNext} aria-label="Next">
        ›
      </button>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__avatar" />
        <div className="hero__text-block">
          <div className="hero__text hero__text--wide" />
        </div>
      </section>

      <ArtworkCarousel />
    </>
  )
}