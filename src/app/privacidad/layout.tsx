import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad — KLIA',
  description: 'Política de privacidad de KLIA. Cumplimiento Ley 25.326 de Protección de Datos Personales. Expediente AAIP EX-2026-51700917.',
}

export default function PrivacidadLayout({ children }: { children: React.ReactNode }) {
  return children
}
