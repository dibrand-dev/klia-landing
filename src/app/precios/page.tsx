import Nav from '@/components/landing/Nav'
import Pricing, { type PlanData } from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabase/server'
import './pricing.css'

async function getPlans(): Promise<PlanData[]> {
  const supabase = createClient()

  const { data: planes, error: planesError } = await supabase
    .from('planes')
    .select('id, nombre, descripcion, precio_mensual, es_ilimitado')
    .eq('es_publico', true)
    .eq('activo', true)
    .order('precio_mensual', { ascending: true })

  if (planesError || !planes || planes.length === 0) {
    if (planesError) console.error('[precios] planes query failed', planesError)
    return []
  }

  const planIds = planes.map((p) => p.id)
  const { data: funcs, error: funcsError } = await supabase
    .from('plan_funcionalidades')
    .select('plan_id, funcionalidad')
    .in('plan_id', planIds)

  if (funcsError) {
    console.error('[precios] plan_funcionalidades query failed', funcsError)
  }

  const byPlan = new Map<string, string[]>()
  for (const row of funcs ?? []) {
    const list = byPlan.get(row.plan_id) ?? []
    list.push(row.funcionalidad)
    byPlan.set(row.plan_id, list)
  }

  return planes.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio_mensual: p.precio_mensual,
    es_ilimitado: p.es_ilimitado,
    funcionalidades: byPlan.get(p.id) ?? [],
  }))
}

export default async function PreciosPage() {
  const plans = await getPlans()
  return (
    <>
      <Nav />
      <main>
        <Pricing plans={plans} />
      </main>
      <Footer />
    </>
  )
}
