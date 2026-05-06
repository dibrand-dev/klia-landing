import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Crear cuenta — Klia',
  description: 'Empezá tu período de prueba de 21 días. Sin tarjeta, sin permanencia.',
}

export default function RegistroPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-[440px] flex-shrink-0 p-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A2257 0%, #2F3F82 60%, #3F519E 100%)' }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.07) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10">
          <Link href="/">
            <Image
              src="/klia-logo.png"
              alt="Klia"
              width={120}
              height={36}
              className="h-8 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
        </div>

        <div className="relative z-10">
          <blockquote className="mb-8">
            <p
              className="text-xl leading-snug mb-5"
              style={{ color: 'rgba(255,255,255,.92)', fontFamily: 'Geist, system-ui', fontWeight: 500, letterSpacing: '-0.015em' }}
            >
              &ldquo;Pasé de dedicar dos tardes por mes a la administración a cero. Klia me devolvió tiempo para mis pacientes.&rdquo;
            </p>
            <footer>
              <div className="font-semibold text-sm text-white">Dra. Lucía Méndez</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,.6)' }}>Psicóloga clínica · Buenos Aires</div>
            </footer>
          </blockquote>

          <div className="flex gap-4 text-xs" style={{ color: 'rgba(255,255,255,.6)' }}>
            <span>✓ Sin tarjeta de crédito</span>
            <span>✓ 21 días gratis</span>
            <span>✓ Sin permanencia</span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-white">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/">
            <Image src="/klia-logo.png" alt="Klia" width={120} height={36} className="h-8 w-auto" />
          </Link>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1
              className="text-2xl font-semibold mb-2"
              style={{ fontFamily: 'Geist, system-ui', letterSpacing: '-0.02em', color: '#0E1430' }}
            >
              Creá tu cuenta gratis
            </h1>
            <p className="text-sm" style={{ color: '#5A607A' }}>
              21 días de prueba sin tarjeta. Al vencer, elegís si continuás.
            </p>
          </div>

          <RegisterForm />

          <p className="text-xs text-center mt-6" style={{ color: '#8990AA' }}>
            Al registrarte aceptás los{' '}
            <a href="/terminos" className="underline hover:text-klia">Términos y Condiciones</a>
            {' '}y la{' '}
            <a href="/privacidad" className="underline hover:text-klia">Política de Privacidad</a>
            {' '}de Klia.
          </p>
        </div>
      </div>
    </div>
  )
}
