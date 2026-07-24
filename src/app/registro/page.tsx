import type { Metadata } from 'next'
import AuthSplit from '@/components/auth/AuthSplit'
import { getTestimonioRotativo } from '@/lib/testimonios'
import '@/app/auth.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Crear cuenta — Klia',
  description: 'Empezá tu período de prueba de 21 días. Sin tarjeta, sin permanencia.',
  robots: { index: false, follow: false },
}

export default async function RegistroPage() {
  const testimonio = await getTestimonioRotativo()
  return <AuthSplit defaultMode="register" testimonio={testimonio} />
}
