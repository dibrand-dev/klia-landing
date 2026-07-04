import { getPlanes } from '@/lib/planes'
import PruebaGratisContent from './PruebaGratisContent'

export default async function PruebaGratisPage() {
  const planes = await getPlanes()
  const prices = planes
    ? Object.fromEntries(planes.map(p => [p.id, p.precio_mensual]))
    : null
  return <PruebaGratisContent prices={prices} />
}
