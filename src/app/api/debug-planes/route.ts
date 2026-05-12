import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createClient()

  const planes = await supabase
    .from('planes')
    .select('id, nombre, precio_mensual, es_publico, activo')

  const funcs = await supabase
    .from('plan_funcionalidades')
    .select('plan_id, funcionalidad')

  return NextResponse.json({
    env: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    planes: {
      count: planes.data?.length ?? 0,
      error: planes.error,
      data: planes.data,
    },
    plan_funcionalidades: {
      count: funcs.data?.length ?? 0,
      error: funcs.error,
      data: funcs.data,
    },
  })
}
