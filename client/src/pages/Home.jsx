import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listArtworks } from '../api'

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

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
      <div className="carousel">
        <p className="status">Loading artwork…</p>
      </div>
    )
  }

  if (artworks.length === 0) {
    return (
      <div className="carousel">
        <p className="status">No artwork to show yet. Check back soon!</p>
      </div>
    )
  }

  const current = artworks[index]
  const hasMultiple = artworks.length > 1

  return (
    <div className="carousel">
      {hasMultiple && (
        <button className="carousel__arrow" onClick={showPrevious} aria-label="Previous artwork">
          ‹
        </button>
      )}

      <div className="carousel__body">
        <div className="carousel__card">
          <img src={current.image_path} alt={current.name} />
        </div>

        <div className="carousel__lines" aria-live="polite">
          <span className="carousel__title">{current.name}</span>
          {current.date_made && (
            <span className="carousel__meta">{formatDate(current.date_made)}</span>
          )}
          {current.description && (
            <span className="carousel__description">{current.description}</span>
          )}
          {hasMultiple && (
            <div className="carousel__dots">
              {artworks.map((art, i) => (
                <button
                  key={art.id ?? i}
                  className={`carousel__dot${i === index ? ' is-active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Show artwork ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {hasMultiple && (
        <button className="carousel__arrow" onClick={showNext} aria-label="Next artwork">
          ›
        </button>
      )}
    </div>
  )
}

const HIGHLIGHTS = [
  {
    icon: '✿',
    title: 'Original Artwork',
    text: 'All my artworks are original and are guaranteed to be made with NO AI.',
  },
  {
    icon: '♥',
    title: 'Custom Commissions',
    text: 'I deliver custom artworks and illustrations that make your ideas come to life.',
  },
  {
    icon: '★',
    title: 'Made With Care',
    text: 'I take my time with drawing as this is a passion that I have been nurturing for years.',
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero / About */}
      <section className="hero">
        <div className="hero__avatar" aria-hidden="true">
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow">Hello, I'm Kiwissable!</p>
          <h1 className="hero__title">Artist &amp; Illustrator</h1>
          <p className="hero__text">
            I'm a beginner artist who does this as a hobby. I try out different art styles
            and this website was designed to show off the artwork I make as I continue to
            improve in this journey! I like making new artist friends so don't be afraid to
            approach.
          </p>
          <p className="hero__subtext">
            Icon Artist: Lykult
          </p>

          <div className="hero__actions">
            <Link to="/artworks" className="btn btn--primary">
              View Artworks
            </Link>
            <Link to="/commission" className="btn btn--ghost">
              Commission Me
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="highlights">
        {HIGHLIGHTS.map((item) => (
          <article className="highlight" key={item.title}>
            <div className="highlight__icon" aria-hidden="true">
              {item.icon}
            </div>
            <h3 className="highlight__title">{item.title}</h3>
            <p className="highlight__text">{item.text}</p>
          </article>
        ))}
      </section>

      {/* Featured work */}
      <section className="featured">
        <h2 className="section-title">Featured Work</h2>
        <p className="section-subtitle">
          A little peek at what I've been making lately.
        </p>
        <ArtworkCarousel />
      </section>

      {/* Closing call to action */}
      <section className="cta">
        <h2 className="cta__title">Let's make something together</h2>
        <p className="cta__text">
          Want an artwork made in my style? Commissions
          are closed currently, but don't be shy to say hello and tell me about your idea!
        </p>
        <Link to="/contact" className="btn btn--primary">
          Get in Touch
        </Link>
      </section>
    </div>
  )
}