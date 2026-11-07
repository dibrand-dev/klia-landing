import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import { getWebinarBySlug } from '@/lib/webinars/queries'
import { computeWebinarStatus, formatWebinarDate } from '@/lib/webinars/utils'
import { WbIco } from '../wb-icons'
import { WbChip, WbImg } from '../wb-pieces'
import WebinarDetailClient from './WebinarDetailClient'
import '../webinar.css'

export const revalidate = 60

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const webinar = await getWebinarBySlug(params.slug)
  if (!webinar) {
    return { title: 'Webinar no encontrado · KLIA' }
  }
  const url = `https://www.klia.com.ar/webinar/${webinar.slug}`
  return {
    title: `${webinar.titulo} · Webinars KLIA`,
    description: webinar.bajada,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: webinar.titulo,
      description: webinar.bajada,
      ...(webinar.imagen_url ? { images: [{ url: webinar.imagen_url }] } : {}),
    },
    twitter: {
      card: webinar.imagen_url ? 'summary_large_image' : 'summary',
      title: webinar.titulo,
      description: webinar.bajada,
      ...(webinar.imagen_url ? { images: [webinar.imagen_url] } : {}),
    },
  }
}

export default async function WebinarDetailPage({ params }: Props) {
  const webinar = await getWebinarBySlug(params.slug)
  if (!webinar) notFound()

  const status = computeWebinarStatus(webinar)
  const { full: fechaCompleta } = formatWebinarDate(webinar.fecha_inicio)
  const descParrafos = webinar.bajada.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)

  return (
    <>
      <Nav />
      <div className="wb">
        <main className="wb-detail">
          <div className="wb-container">
            <a href="/webinar" className="wb-back"><WbIco n="back" s={16} />Webinars</a>
            <div className="wb-dgrid">
              <section className="wb-info" aria-labelledby="webinar-title">
                <WbImg title={webinar.titulo} org={webinar.institucion} src={webinar.imagen_url} />
                <div className="wb-badges">
                  <span className="wb-badge-free">Gratis</span>
                  <WbChip org={webinar.institucion} />
                  {status === 'closed' && <span className="wb-badge-muted"><WbIco n="lock" s={13} />Inscripción cerrada</span>}
                  {status === 'ended' && <span className="wb-badge-muted">Finalizado</span>}
                </div>
                <h1 className="wb-h2" id="webinar-title">{webinar.titulo}</h1>
                <ul className="wb-meta">
                  <li><span className="wb-mi"><WbIco n="cal" s={18} /></span><span><b>{fechaCompleta}</b><small>Hora Argentina (GMT-3)</small></span></li>
                  <li><span className="wb-mi"><WbIco n="hour" s={18} /></span><span><b>{webinar.duracion_min} minutos</b><small>Duración</small></span></li>
                  <li><span className="wb-mi"><WbIco n={webinar.institucion ? 'org' : 'globe'} s={18} /></span><span><b>{webinar.institucion || 'Online'}</b><small>{webinar.institucion ? 'Institución' : 'Modalidad'}</small></span></li>
                </ul>
                <div className="wb-desc">{descParrafos.map((p, i) => <p key={i}>{p}</p>)}</div>
              </section>
              <section className="wb-fcard" id="inscripcion" aria-label="Inscripción">
                <WebinarDetailClient
                  slug={webinar.slug}
                  timing={{ fecha_inicio: webinar.fecha_inicio, duracion_min: webinar.duracion_min, cierre_inscripcion: webinar.cierre_inscripcion }}
                  initialStatus={status}
                />
              </section>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
