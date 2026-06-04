import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Probá KLIA gratis 21 días — Software para profesionales de salud en Argentina',
  description: 'Gestión de turnos, historia clínica, cobros con Mercado Pago e IA. Sin tarjeta de crédito. Empezá hoy.',
  robots: { index: false, follow: false },
}

export default function PruebaGratisLayout({ children }: { children: React.ReactNode }) {
  return children
}
