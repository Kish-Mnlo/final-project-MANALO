export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__avatar" />
        <div className="hero__text-block">
          <div className="hero__text hero__text--wide" />
        </div>
      </section>

      <section className="carousel">
        <button className="carousel__arrow" aria-label="Previous">‹</button>
        <div className="carousel__card">Artwork carousel</div>
        <div className="carousel__lines">
          <span />
          <span />
          <span />
        </div>
        <button className="carousel__arrow" aria-label="Next">›</button>
      </section>
    </>
  )
}