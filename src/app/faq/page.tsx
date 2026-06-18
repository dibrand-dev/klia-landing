import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import FaqContent from './FaqContent'
import { FAQ_BLOCKS } from './faqData'
import './faq.css'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes · KLIA — Todo lo que necesitás saber antes de empezar',
  description: 'Resolvé tus dudas sobre KLIA: planes, obras sociales, privacidad, integraciones y más. Software de gestión para profesionales de la salud en Argentina.',
  alternates: { canonical: 'https://www.klia.com.ar/faq' },
  openGraph: {
    url: 'https://www.klia.com.ar/faq',
    title: 'Preguntas frecuentes · KLIA — Todo lo que necesitás saber antes de empezar',
    description: 'Resolvé tus dudas sobre KLIA: planes, obras sociales, privacidad, integraciones y más. Software de gestión para profesionales de la salud en Argentina.',
  },
}

export default function FaqPage() {
  const mainEntity = FAQ_BLOCKS.flatMap(b =>
    b.questions.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }))
  )
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <main className="faq-page">
        <FaqContent />
      </main>
      <Footer />
    </>
  )
}
