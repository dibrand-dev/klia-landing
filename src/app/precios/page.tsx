import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Pricing, { type PlanData, type PlanFeature } from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabase/server'
import './pricing.css'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Precios — KLIA | Planes para profesionales de salud en Argentina',
  description: 'Planes desde $15.000/mes. Esencial, Profesional y Premium para psicólogos, médicos y kinesiólogos. 21 días gratis, sin tarjeta de crédito.',
}

const PLANES_FALLBACK: PlanData[] = [
  { id: 'esencial',    nombre: 'Esencial',    descripcion: 'Para profesionales que recién formalizan su práctica.', precio_mensual: 15000, es_ilimitado: false, features: [] },
  { id: 'profesional', nombre: 'Profesional', descripcion: 'El plan completo para el profesional independiente.',   precio_mensual: 28000, es_ilimitado: false, features: [] },
  { id: 'premium',     nombre: 'Premium',     descripcion: 'Para clínicas y equipos multi-profesional.',            precio_mensual: 42000, es_ilimitado: true,  features: [] },
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
    const { data: features, error: featuresError } = await supabase
      .from('plan_features')
      .select('id, plan_id, texto, incluido, orden, categoria')
      .in('plan_id', planIds)
      .eq('activo', true)
      .order('orden', { ascending: true })

    if (featuresError) {
      console.error('[precios] plan_features query failed', featuresError)
    }

    const byPlan = new Map<string, PlanFeature[]>()
    for (const feat of features ?? []) {
      const list = byPlan.get(feat.plan_id) ?? []
      list.push(feat)
      byPlan.set(feat.plan_id, list)
    }

    return planes.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio_mensual: p.precio_mensual,
      es_ilimitado: p.es_ilimitado,
      features: byPlan.get(p.id) ?? [],
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
