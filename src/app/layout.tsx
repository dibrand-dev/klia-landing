import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, Instrument_Serif } from 'next/font/google'
import { ClearInvalidSession } from '@/components/auth/ClearInvalidSession'
import './globals.css'

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  weight: '100 900',
  display: 'swap',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Klia — Menos administración, más terapia',
  description: 'La plataforma de gestión clínica y administrativa para profesionales y clínicas de salud en Argentina. Agenda, atenciones del día con IA, cobros por Mercado Pago e informes automáticos.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Klia — Menos administración, más terapia',
    description: 'La gestión de tu consultorio, simplificada.',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <ClearInvalidSession />
        {children}
      </body>
    </html>
  )
}
