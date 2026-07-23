export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getPlanes } from '@/lib/planes'
import { getTestimonios } from '@/lib/testimonios'
import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import Products from '@/components/landing/Products'
import Benefits from '@/components/landing/Benefits'
import Cases from '@/components/landing/Cases'
import Testimonials from '@/components/landing/Testimonials'
import FAQ from '@/components/landing/FAQ'
import CTAFinal from '@/components/landing/CTAFinal'
import Footer from '@/components/landing/Footer'
import RevealObserver from '@/components/landing/RevealObserver'

export const metadata: Metadata = {
  title: 'KLIA — Software de gestión para profesionales de salud en Argentina',
  description: 'Plataforma SaaS para psicólogos, médicos y kinesiólogos en Argentina. Agenda, historia clínica digital, cobros con Mercado Pago e IA. 21 días gratis.',
  alternates: { canonical: 'https://www.klia.com.ar' },
  openGraph: {
    title: 'KLIA — Software de gestión para profesionales de salud en Argentina',
    description: 'Plataforma SaaS para psicólogos, médicos y kinesiólogos en Argentina.',
    locale: 'es_AR',
    type: 'website',
    url: 'https://www.klia.com.ar',
  },
}

export default async function HomePage() {
  const [planes, testimonios] = await Promise.all([getPlanes(), getTestimonios()])
  const offers = planes
    ? planes.map(p => ({
        '@type': 'Offer',
        name: `Plan ${p.nombre}`,
        price: String(p.precio_mensual),
        priceCurrency: 'ARS',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
      }))
    : []
  return (
    <>
      <RevealObserver />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Products />
        <Benefits />
        <Cases />
        <Testimonials items={testimonios} />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'KLIA',
                applicationCategory: 'HealthApplication',
                operatingSystem: 'Web, iOS, Android',
                description: 'Plataforma SaaS para profesionales de la salud en Argentina. Gestión de agenda, historia clínica digital, cobros con Mercado Pago e inteligencia artificial.',
                url: 'https://www.klia.com.ar',
                offers,
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '5' },
              },
              {
                '@type': 'Organization',
                name: 'KLIA',
                url: 'https://www.klia.com.ar',
                logo: 'https://www.klia.com.ar/klia-logo.png',
                contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'hola@klia.com.ar', availableLanguage: 'Spanish' },
                sameAs: ['https://www.instagram.com/klia_app/', 'https://www.facebook.com/kliaapp', 'https://www.linkedin.com/company/klia-app/'],
                areaServed: 'AR',
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  { '@type': 'Question', name: '¿Tengo que preparar algo antes de cada sesión?', acceptedAnswer: { '@type': 'Answer', text: 'No. KLIA organiza automáticamente los turnos del día y genera resúmenes clínicos con IA antes de cada sesión, sin que tengas que configurar nada.' } },
                  { '@type': 'Question', name: '¿Qué pasa con mi información clínica? ¿Es segura?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Cifrado de extremo a extremo, backups encriptados y cumplimiento estricto de la Ley 25.326 de Protección de Datos Personales de Argentina. Vos sos dueño de tu información.' } },
                  { '@type': 'Question', name: '¿Cómo funciona el cobro con Mercado Pago?', acceptedAnswer: { '@type': 'Answer', text: 'Generás un link de pago en un toque. El paciente paga desde su celular y vos ves la acreditación al instante en tu cuenta de Mercado Pago.' } },
                  { '@type': 'Question', name: '¿Cuánto cuesta KLIA?', acceptedAnswer: { '@type': 'Answer', text: 'KLIA tiene tres planes: Esencial ($15.000/mes), Profesional ($28.000/mes) y Premium ($48.000/mes). Todos incluyen 21 días de prueba gratis sin tarjeta de crédito.' } },
                  { '@type': 'Question', name: '¿Funciona para médicos además de psicólogos?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. KLIA está diseñado para todas las especialidades de salud: psicólogos, médicos clínicos, kinesiólogos, nutricionistas, odontólogos y más.' } },
                ],
              },
            ],
          }),
        }}
      />
    </>
  )
}
