import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import SobreContent from './SobreContent'
import './sobre.css'

export const metadata: Metadata = {
  title: 'Sobre KLIA — La historia detrás del software para profesionales de salud en Argentina',
  description: 'KLIA nació de una encuesta a 80 profesionales de salud independientes en Argentina. Conocé la historia, el equipo y la visión detrás de la plataforma.',
  alternates: { canonical: 'https://www.klia.com.ar/sobre-klia' },
  openGraph: {
    url: 'https://www.klia.com.ar/sobre-klia',
    title: 'Sobre KLIA — La historia detrás del software para profesionales de salud en Argentina',
    description: 'KLIA nació de una encuesta a 80 profesionales de salud independientes en Argentina. Conocé la historia, el equipo y la visión detrás de la plataforma.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KLIA',
  url: 'https://www.klia.com.ar',
  logo: 'https://www.klia.com.ar/logo.png',
  foundingDate: '2026',
  founder: {
    '@type': 'Person',
    name: 'Norberto Riccitelli',
  },
  description: 'Plataforma SaaS de gestión de consultorio para profesionales de salud independientes en Argentina.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hola@klia.com.ar',
    contactType: 'customer support',
  },
}

export default function SobreKliaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <main className="sobre-page">
        <SobreContent />
      </main>
      <Footer />
    </>
  )
}
