import type { Metadata } from 'next'
import AuthSplit from '@/components/auth/AuthSplit'
import '@/app/auth.css'

export const metadata: Metadata = {
  title: 'Crear cuenta — Klia',
  description: 'Empezá tu período de prueba de 21 días. Sin tarjeta, sin permanencia.',
}

export default function RegistroPage() {
  return <AuthSplit defaultMode="register" />
}
