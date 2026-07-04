import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { getPlanes } from '@/lib/planes'
import './pricing.css'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Precios — KLIA | Planes para profesionales de salud en Argentina',
  description: 'Planes desde $15.000/mes. Esencial, Profesional y Premium para psicólogos, médicos y kinesiólogos. 21 días gratis, sin tarjeta de crédito.',
  alternates: { canonical: 'https://www.klia.com.ar/precios' },
}

export default async function PreciosPage() {
  const plans = await getPlanes()
  return (
    <>
      <Nav />
      <main>
        {plans ? (
          <Pricing plans={plans} />
        ) : (
          <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 24px' }}>
            <div>
              <p style={{ fontSize: '18px', color: 'var(--muted, #6b7280)', marginBottom: '12px' }}>
                Precios no disponibles en este momento.
              </p>
              <p style={{ fontSize: '15px', color: 'var(--muted, #6b7280)' }}>
                Escribinos a{' '}
                <a href="mailto:hola@klia.com.ar" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  hola@klia.com.ar
                </a>
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
