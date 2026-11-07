import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import { getWebinarsPublicados, type WebinarRow } from '@/lib/webinars/queries'
import { computeWebinarStatus, formatWebinarDate } from '@/lib/webinars/utils'
import { WbIco } from './wb-icons'
import { WbChip, WbImg } from './wb-pieces'
import './webinar.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Webinars · KLIA',
  description: 'Webinars gratuitos de KLIA para profesionales de la salud en Argentina.',
  alternates: { canonical: 'https://www.klia.com.ar/webinar' },
  openGraph: {
    url: 'https://www.klia.com.ar/webinar',
    title: 'Webinars · KLIA',
    description: 'Webinars gratuitos de KLIA para profesionales de la salud en Argentina.',
  },
}

function WbCard({ w }: { w: WebinarRow }) {
  const closed = computeWebinarStatus(w) === 'closed'
  const href = `/webinar/${w.slug}`
  return (
    <article className="wb-card" aria-labelledby={`t-${w.slug}`}>
      <div className="wb-card-top"><WbChip org={w.institucion} /></div>
      <WbImg title={w.titulo} org={w.institucion} src={w.imagen_url} />
      <div className="wb-card-body">
        {closed
          ? <button className="btn btn-accent wb-btn-block" disabled>Inscripción cerrada</button>
          : <a href={href + '#inscripcion'} className="btn btn-accent wb-btn-block" aria-describedby={`t-${w.slug}`}>Inscribirme gratis</a>}
        <div className="wb-date"><WbIco n="cal" s={15} /><time>{formatWebinarDate(w.fecha_inicio).full}</time></div>
        <h3 className="wb-card-title" id={`t-${w.slug}`}><a href={href}>{w.titulo}</a></h3>
        <p className="wb-card-desc">{w.bajada}</p>
      </div>
    </article>
  )
}

export default async function WebinarListPage() {
  const items = await getWebinarsPublicados()

  return (
    <>
      <Nav />
      <div className="wb">
        <main>
          <section className="wb-lhero">
            <div className="wb-dots" aria-hidden></div>
            <div className="wb-container"><h1 className="wb-h1">Próximos <em>webinars</em></h1></div>
          </section>
          <section className="wb-container" aria-label="Listado de webinars">
            {items.length
              ? <div className="wb-grid">{items.map((w) => <WbCard key={w.slug} w={w} />)}</div>
              : <div className="wb-empty" role="status"><div className="wb-ibox"><WbIco n="cal" s={22} /></div><p>Pronto anunciaremos nuevos webinars</p></div>}
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}
