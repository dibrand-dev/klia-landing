import type { Metadata } from 'next'
import AuthSplit from '@/components/auth/AuthSplit'
import { getTestimonioRotativo } from '@/lib/testimonios'
import '@/app/auth.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ingresar — Klia',
  description: 'Accedé a tu consultorio en Klia',
  robots: { index: false, follow: false },
}

export default async function LoginPage() {
  const testimonio = await getTestimonioRotativo()
  return <AuthSplit testimonio={testimonio} />
}
