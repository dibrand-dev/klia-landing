export const dynamic = 'force-dynamic'

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

export default function HomePage() {
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
        <Testimonials />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
