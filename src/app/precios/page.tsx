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
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
