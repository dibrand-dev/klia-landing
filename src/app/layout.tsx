import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Klia — Menos administración, más terapia',
  description: 'La plataforma de gestión clínica y administrativa para profesionales y clínicas de salud en Argentina. Agenda, facturación ARCA, cobros por Mercado Pago e informes con IA.',
  openGraph: {
    title: 'Klia — Menos administración, más terapia',
    description: 'La gestión de tu consultorio, simplificada.',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
