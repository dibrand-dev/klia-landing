import { createClient } from '@supabase/supabase-js'
import { computeWebinarStatus } from './utils'

export type WebinarRow = {
  id: string
  slug: string
  titulo: string
  bajada: string
  institucion: string | null
  imagen_url: string | null
  fecha_inicio: string
  duracion_min: number
  cierre_inscripcion: string
  estado: string
}

const WEBINAR_COLUMNS = 'id, slug, titulo, bajada, institucion, imagen_url, fecha_inicio, duracion_min, cierre_inscripcion, estado'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function getWebinarsPublicados(): Promise<WebinarRow[]> {
  try {
    const supabase = getClient()
    const { data, error } = await supabase
      .from('webinars')
      .select(WEBINAR_COLUMNS)
      .eq('estado', 'publicado')
      .order('fecha_inicio', { ascending: true })

    if (error || !data) {
      console.error('[webinars] getWebinarsPublicados failed:', error)
      return []
    }

    return data.filter((w) => computeWebinarStatus(w) !== 'ended')
  } catch (err) {
    console.error('[webinars] unexpected error in getWebinarsPublicados:', err)
    return []
  }
}

export async function getWebinarBySlug(slug: string): Promise<WebinarRow | null> {
  try {
    const supabase = getClient()
    const { data, error } = await supabase
      .from('webinars')
      .select(WEBINAR_COLUMNS)
      .eq('slug', slug)
      .eq('estado', 'publicado')
      .maybeSingle()

    if (error) {
      console.error('[webinars] getWebinarBySlug failed:', error)
      return null
    }
    return data
  } catch (err) {
    console.error('[webinars] unexpected error in getWebinarBySlug:', err)
    return null
  }
}
