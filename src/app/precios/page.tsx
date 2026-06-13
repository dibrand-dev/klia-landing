import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Pricing, { type PlanData } from '@/components/landing/Pricing'
import Footer from '@/components/landing/Footer'
import { createClient } from '@/lib/supabase/server'
import './pricing.css'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Precios — KLIA | Planes para profesionales de salud en Argentina',
  description: 'Planes desde $15.000/mes. Esencial, Profesional y Premium para psicólogos, médicos y kinesiólogos. 21 días gratis, sin tarjeta de crédito.',
}

type ModuloItem = {
  modulo_id: string
  nombre: string
  descripcion: string
  planes: string[]
}

const PLANES_FALLBACK: PlanData[] = [
  { id: 'esencial',    nombre: 'Esencial',    descripcion: 'Para profesionales que recién formalizan su práctica.', precio_mensual: 15000, es_ilimitado: false, modulos: [] },
  { id: 'profesional', nombre: 'Profesional', descripcion: 'El plan completo para el profesional independiente.',   precio_mensual: 28000, es_ilimitado: false, modulos: [] },
  { id: 'premium',     nombre: 'Premium',     descripcion: 'Para clínicas y equipos multi-profesional.',            precio_mensual: 42000, es_ilimitado: true,  modulos: [] },
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

    const { data: modulos, error: modulosError } = await supabase
      .from('modulos_config')
      .select('modulo_id, nombre, descripcion, planes')
      .eq('activo', true)
      .order('modulo_id')

    if (modulosError) {
      console.error('[precios] modulos_config query failed', modulosError)
    }

    const todosModulos: ModuloItem[] = modulos ?? []

    return planes.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio_mensual: p.precio_mensual,
      es_ilimitado: p.es_ilimitado,
      modulos: todosModulos,
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
