import { createClient } from '@/lib/supabase/server'

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
