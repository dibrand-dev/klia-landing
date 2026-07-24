import { createClient } from '@/lib/supabase/server'

export type TestimonioLanding = {
  quote: string
  nombre: string
  rol: string
  avatar_url: string | null
  color_bg: string | null
  iniciales: string | null
}

export async function getTestimonioRotativo(): Promise<TestimonioLanding | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('testimonios')
      .select('quote, nombre, rol, avatar_url, color_bg, iniciales')
      .eq('activo', true)
      .order('orden')

    if (error || !data || data.length === 0) {
      if (error) console.error('[testimonios] query failed:', error)
      return null
    }

    const idx = Math.floor(Date.now() / 1000) % data.length
    return data[idx] as TestimonioLanding
  } catch (err) {
    console.error('[testimonios] unexpected error:', err)
    return null
  }
}

export type TestimonioItem = {
  id: string
  quote: string
  nombre: string
  rol: string
  color_bg: string
  iniciales: string
  avatar_url: string | null
  orden: number
}

export async function getTestimonios(): Promise<TestimonioItem[]> {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('testimonios')
      .select('id, quote, nombre, rol, color_bg, iniciales, avatar_url, orden')
      .eq('activo', true)
      .order('orden', { ascending: true })

    if (error) {
      console.error('[testimonios] query failed:', error)
      return []
    }

    return (data ?? []) as TestimonioItem[]
  } catch (err) {
    console.error('[testimonios] unexpected error:', err)
    return []
  }
}
