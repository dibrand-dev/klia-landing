import Nav from '@/components/landing/Nav'
import Pricing, { type PlanData } from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabase/server'
import './pricing.css'

export const revalidate = 3600

const PLANES_FALLBACK: PlanData[] = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    descripcion: 'Para profesionales que recién formalizan su práctica.',
    precio_mensual: 15000,
    es_ilimitado: false,
    funcionalidades: ['Agenda y turnos', 'Cobros por Mercado Pago', 'Recordatorios por WhatsApp', 'Historia clínica digital'],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    descripcion: 'El plan completo para el profesional independiente.',
    precio_mensual: 28000,
    es_ilimitado: false,
    funcionalidades: ['Todo lo de Esencial', 'Atenciones del Día con IA', 'Informes clínicos con IA', 'Reportes contables', 'Soporte prioritario'],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    descripcion: 'Para clínicas y equipos multi-profesional.',
    precio_mensual: 42000,
    es_ilimitado: true,
    funcionalidades: ['Todo lo de Profesional', 'Multi-profesional ilimitado', 'Panel de administración', 'Integración con obras sociales', 'Onboarding personalizado'],
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
