import Nav from '@/components/landing/Nav'
import Pricing from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabase/server'
import './pricing.css'

const DEFAULT_PRICES = {
  esencial: 7900,
  profesional: 14900,
  premium: 24900,
}

async function getPrices() {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('configuracion')
      .select('clave, valor')
      .in('clave', [
        'precio_esencial_mensual',
        'precio_profesional_mensual',
        'precio_premium_mensual',
      ])

    if (!data || data.length === 0) return DEFAULT_PRICES

    const map: Record<string, string> = {}
    for (const row of data) map[row.clave] = row.valor

    return {
      esencial: Number(map['precio_esencial_mensual']) || DEFAULT_PRICES.esencial,
      profesional: Number(map['precio_profesional_mensual']) || DEFAULT_PRICES.profesional,
      premium: Number(map['precio_premium_mensual']) || DEFAULT_PRICES.premium,
    }
  } catch {
    return DEFAULT_PRICES
  }
}

export default async function PreciosPage() {
  const prices = await getPrices()
  return (
    <>
      <Nav />
      <main>
        <Pricing prices={prices} />
      </main>
      <Footer />
    </>
  )
}
