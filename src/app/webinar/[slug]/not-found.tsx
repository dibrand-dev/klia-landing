import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import { WbIco } from '../wb-icons'
import '../webinar.css'

export default function WebinarNotFound() {
  return (
    <>
      <Nav />
      <div className="wb">
        <main className="wb-404">
          <div className="wb-dots" aria-hidden></div>
          <div className="wb-container">
            <div className="wb-404-in">
              <span className="wb-eyebrow">Error 404</span>
              <h1 className="wb-h1">No encontramos <em>este webinar</em></h1>
              <p>Puede que el link esté mal escrito o que el webinar ya no esté publicado.</p>
              <a href="/webinar" className="btn btn-accent btn-lg">Ver próximos webinars <WbIco n="arrow" s={16} /></a>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
