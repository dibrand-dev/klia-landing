import { createClient } from '@/lib/supabase/server'
import type { PlanData, ModuloItem } from '@/components/landing/Pricing'

const MODULOS_FALLBACK: ModuloItem[] = [
  { modulo_id: 'agenda',            nombre: 'Agenda inteligente',            descripcion: '', planes: ['esencial', 'profesional', 'premium'] },
  { modulo_id: 'historia-clinica',  nombre: 'Historia clínica digital',      descripcion: '', planes: ['esencial', 'profesional', 'premium'] },
  { modulo_id: 'google-calendar',   nombre: 'Google Calendar sync',          descripcion: '', planes: ['esencial', 'profesional', 'premium'] },
  { modulo_id: 'multi-moneda',      nombre: 'Multi-moneda',                  descripcion: '', planes: ['esencial', 'profesional', 'premium'] },
  { modulo_id: 'atenciones-dia',    nombre: 'Atenciones del Día con IA',     descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'notas-voz',         nombre: 'Notas de voz con IA',           descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'cobros-deuda',      nombre: 'Cobros y gestión de deuda',     descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'aviso-deuda',       nombre: 'Aviso automático de deuda',     descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'facturacion',       nombre: 'Facturación a obras sociales',  descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'mercado-pago',      nombre: 'Mercado Pago integrado',        descripcion: '', planes: ['profesional', 'premium'] },
  { modulo_id: 'link-reservas',     nombre: 'Link público de reservas',      descripcion: '', planes: ['premium'] },
  { modulo_id: 'archivos-paciente', nombre: 'Archivos del paciente',         descripcion: '', planes: ['premium'] },
]

export async function getPlanes(): Promise<PlanData[] | null> {
  try {
    const supabase = createClient()

    const { data: planes, error: planesError } = await supabase
      .from('planes')
      .select('id, slug, nombre, descripcion, precio_mensual, precio_anual_mensual, es_ilimitado')
      .eq('es_publico', true)
      .eq('activo', true)
      .order('precio_mensual', { ascending: true })

    if (planesError || !planes || planes.length === 0) {
      console.error('[planes] query failed:', planesError)
      return null
    }

    const { data: modulos, error: modulosError } = await supabase
      .from('modulos_config')
      .select('modulo_id, nombre, descripcion, planes')
      .eq('activo', true)
      .order('modulo_id')

    if (modulosError) {
      console.error('[planes] modulos_config query failed:', modulosError)
    }

    const usandoFallback = !(modulos && modulos.length > 0)
    const todosModulos: ModuloItem[] = usandoFallback ? MODULOS_FALLBACK : modulos!

    console.log('[debug-planes] plan slugs:', planes.map(p => p.slug))
    console.log('[debug-modulos] primer modulo planes:', modulos?.[0]?.planes, 'usó fallback:', usandoFallback)

    return planes.map((p) => ({
      id: p.id,
      slug: p.slug as string | null,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio_mensual: p.precio_mensual,
      precio_anual_mensual: p.precio_anual_mensual as number | null,
      es_ilimitado: p.es_ilimitado,
      modulos: todosModulos,
    }))
  } catch (err) {
    console.error('[planes] unexpected error:', err)
    return null
  }
}
