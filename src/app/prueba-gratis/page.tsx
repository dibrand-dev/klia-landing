import { getPlanes } from '@/lib/planes'
import PruebaGratisContent from './PruebaGratisContent'

export default async function PruebaGratisPage() {
  const planes = await getPlanes()
  const prices = planes
    ? Object.fromEntries(
        planes
          .filter((p): p is typeof p & { slug: string } => p.slug != null)
          .map(p => [p.slug, p.precio_mensual])
      )
    : null
  return <PruebaGratisContent prices={prices} />
}
