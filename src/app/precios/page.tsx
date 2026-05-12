import Nav from '@/components/landing/Nav'
import Pricing, { type PlanData } from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabase/server'
import './pricing.css'

const DEFAULT_PLANS: PlanData[] = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    descripcion: 'Para profesionales que empiezan a digitalizar su consultorio.',
    precio_mensual: 7900,
    es_ilimitado: false,
    funcionalidades: ['agenda', 'pacientes', 'turnos', 'historial_clinico'],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    descripcion: 'El plan completo para el profesional independiente.',
    precio_mensual: 14900,
    es_ilimitado: true,
    funcionalidades: ['agenda', 'pacientes', 'turnos', 'historial_clinico', 'facturacion', 'informes'],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    descripcion: 'Todo incluido. Para profesionales con alta demanda.',
    precio_mensual: 24900,
    es_ilimitado: true,
    funcionalidades: ['agenda', 'pacientes', 'turnos', 'historial_clinico', 'objetivos_terapeuticos', 'medicacion', 'interconsultas', 'facturacion', 'informes'],
  },
]

async function getPlans(): Promise<PlanData[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase
      .from('planes')
      .select('id, nombre, descripcion, precio_mensual, es_ilimitado, plan_funcionalidades(funcionalidad)')
      .eq('es_publico', true)
      .eq('activo', true)
      .order('precio_mensual', { ascending: true })

    if (!data || data.length === 0) return DEFAULT_PLANS

    return data.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio_mensual: p.precio_mensual,
      es_ilimitado: p.es_ilimitado,
      funcionalidades: (p.plan_funcionalidades ?? []).map((f: { funcionalidad: string }) => f.funcionalidad),
    }))
  } catch {
    return DEFAULT_PLANS
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
