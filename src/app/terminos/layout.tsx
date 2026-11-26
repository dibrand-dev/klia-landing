import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — Klia',
  description: 'Términos y condiciones de uso de Klia, plataforma SaaS para profesionales de salud en Argentina.',
  alternates: { canonical: 'https://www.klia.com.ar/terminos' },
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return children
}
