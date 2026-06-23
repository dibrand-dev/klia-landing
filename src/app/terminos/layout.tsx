import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — KLIA',
  description: 'Términos y condiciones de uso de KLIA, plataforma SaaS para profesionales de salud en Argentina.',
  alternates: { canonical: 'https://www.klia.com.ar/terminos' },
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return children
}
