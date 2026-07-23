import { getPlanes } from '@/lib/planes'
import PruebaGratisContent from './PruebaGratisContent'

export default async function PruebaGratisPage() {
  const planes = await getPlanes()
  const prices = planes
    ? Object.fromEntries(
        planes
          .filter((p): p is typeof p & { slug: string } => p.slug != null)
          .map(p => [p.slug, {
            mensual: p.precio_mensual,
            anual: p.precio_anual_mensual ?? Math.round(p.precio_mensual * 11 / 12),
          }])
      )
    : null
  return <PruebaGratisContent prices={prices} />
}
