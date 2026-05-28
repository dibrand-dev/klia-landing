import Nav from '@/components/landing/Nav'
import Pricing, { type PlanData } from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabase/server'
import './pricing.css'

export const revalidate = 60

const PLANES_FALLBACK: PlanData[] = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    descripcion: 'Para profesionales que recién formalizan su práctica.',
    precio_mensual: 15000,
    es_ilimitado: false,
    funcionalidades: ['agenda', 'pacientes', 'turnos', 'historial_clinico'],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    descripcion: 'El plan completo para el profesional independiente.',
    precio_mensual: 28000,
    es_ilimitado: false,
    funcionalidades: ['agenda', 'pacientes', 'turnos', 'historial_clinico', 'entrevistas', 'cobros', 'facturacion', 'estadisticas', 'atenciones_ia', 'informes_ia'],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    descripcion: 'Para clínicas y equipos multi-profesional.',
    precio_mensual: 42000,
    es_ilimitado: true,
    funcionalidades: ['agenda', 'pacientes', 'turnos', 'historial_clinico', 'entrevistas', 'google_calendar', 'multi_moneda', 'firmas', 'cobros', 'facturacion', 'liquidacion_os', 'planillas_pdf', 'atenciones_ia', 'informes_ia', 'estadisticas', 'soporte_prioritario'],
  },
]

async function getPlans(): Promise<PlanData[]> {
  try {
    const supabase = createClient()

    const { data: planes, error: planesError } = await supabase
      .from('planes')
      .select('id, nombre, descripcion, precio_mensual, es_ilimitado')
      .eq('es_publico', true)
      .eq('activo', true)
      .order('precio_mensual', { ascending: true })

    if (planesError || !planes || planes.length === 0) {
      if (planesError) console.error('[precios] planes query failed, using fallback:', planesError)
      return PLANES_FALLBACK
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
  } catch (err) {
    console.error('[precios] unexpected error, using fallback:', err)
    return PLANES_FALLBACK
  }
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
