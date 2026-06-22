import type { Metadata } from 'next'
import AuthSplit from '@/components/auth/AuthSplit'
import '@/app/auth.css'

export const metadata: Metadata = {
  title: 'Ingresar — Klia',
  description: 'Accedé a tu consultorio en Klia',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return <AuthSplit />
}
