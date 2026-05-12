import Nav from '@/components/landing/Nav'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import RevealObserver from '@/components/landing/RevealObserver'

export default async function PreciosPage() {
  return (
    <>
      <RevealObserver />
      <Nav />
      <main style={{ marginTop: '80px' }}>
        <section className="pt-24 pb-16 text-center">
          <p className="eyebrow mb-4">• PRECIOS •</p>
          <h1 className="h-2" style={{ color: '#0E1430', maxWidth: '19ch', margin: '0 auto 6px' }}>
            Sin permanencia. Sin sorpresas.
          </h1>
          <p className="lead" style={{ maxWidth: '55ch', margin: '0 auto' }}>
            Empezá el trial sin tarjeta. Al vencer, elegís el plan que mejor se adapta a tu práctica.
          </p>
          <p className="serif-it" style={{ color: '#3F519E', marginTop: '8px' }}>21 días gratis.</p>
        </section>
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
