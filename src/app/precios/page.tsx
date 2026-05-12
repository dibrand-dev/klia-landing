import Nav from '@/components/landing/Nav'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'

export default function PreciosPage() {
  return (
    <>
      <Nav />
      <main style={{ marginTop: '80px' }}>
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
