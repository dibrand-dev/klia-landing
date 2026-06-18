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

const MODULOS_FALLBACK: ModuloItem[] = [
  { modulo_id: 'agenda',           nombre: 'Agenda inteligente',           descripcion: '', planes: ['esencial', 'profesional', 'premium'] },
  { modulo_id: 'historia-clinica', nombre: 'Historia clínica digital',     descripcion: '', planes: ['esencial', 'profesional', 'premium'] },
  { modulo_id: 'google-calendar',  nombre: 'Google Calendar sync',         descripcion: '', planes: ['esencial', 'profesional', 'premium'] },
  { modulo_id: 'multi-moneda',     nombre: 'Multi-moneda',                 descripcion: '', planes: ['esencial', 'profesional', 'premium'] },
  { modulo_id: 'atenciones-dia',   nombre: 'Atenciones del Día con IA',   descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'notas-voz',        nombre: 'Notas de voz con IA',         descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'cobros-deuda',     nombre: 'Cobros y gestión de deuda',   descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'aviso-deuda',      nombre: 'Aviso automático de deuda',   descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'facturacion',      nombre: 'Facturación a obras sociales', descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'mercado-pago',     nombre: 'Mercado Pago integrado',       descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'link-reservas',    nombre: 'Link público de reservas',     descripcion: '', planes: ['premium'] },
  { modulo_id: 'archivos-paciente',nombre: 'Archivos del paciente',        descripcion: '', planes: ['premium'] },
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
      return PLANES_FALLBACK.map(p => ({ ...p, modulos: MODULOS_FALLBACK }))
    }

    const { data: modulos, error: modulosError } = await supabase
      .from('modulos_config')
      .select('modulo_id, nombre, descripcion, planes')
      .eq('activo', true)
      .order('modulo_id')

    if (modulosError) {
      console.error('[precios] modulos_config query failed, using fallback:', modulosError)
    }

    const todosModulos: ModuloItem[] = (modulos && modulos.length > 0) ? modulos : MODULOS_FALLBACK

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
