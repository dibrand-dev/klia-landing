'use client'

import Image from 'next/image'
import { Globe, Shield, ArrowRight } from '@/components/ui/Icons'

const COLS = [
  {
    title: 'Producto',
    links: ['Atenciones del Día', 'Cobros Mercado Pago', 'Informes con IA', 'Agenda inteligente', 'Historia clínica', 'Reportes contables'],
  },
  {
    title: 'Soluciones',
    links: ['Para psicólogos', 'Para kinesiólogos', 'Para nutricionistas', 'Para clínicas', 'Para equipos médicos'],
  },
  {
    title: 'Recursos',
    links: ['Centro de ayuda', 'Blog', 'Guías y plantillas', 'Comunidad'],
  },
  {
    title: 'Empresa',
    links: ['Sobre Klia', 'Carreras', 'Prensa', 'Privacidad', 'Términos'],
  },
]

function getLinkHref(link: string): string {
  switch (link) {
    case 'Sobre Klia':
      return '/sobre-klia'
    case 'Privacidad':
      return '/privacidad'
    case 'Términos':
      return '/terminos'
    default:
      return '#'
  }
}

export default function Footer() {
  return (
    <footer style={{ background: '#0E1430', color: 'rgba(255,255,255,.7)', position: 'relative', overflow: 'hidden' }}>
      <div className="max-w-container mx-auto px-7 pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2.5fr] gap-20 pb-16 border-b" style={{ borderColor: 'rgba(255,255,255,.1)' }}>
          {/* Brand */}
          <div>
            <Image
              src="/klia-logo.png"
              alt="Klia"
              width={235}
              height={80}
              className="h-20 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm mt-5 leading-relaxed max-w-[34ch]" style={{ color: 'rgba(255,255,255,.55)' }}>
              La plataforma de gestión para profesionales y clínicas de salud en Argentina. Menos papeleo, más atención.
            </p>

            {/* Newsletter */}
            <div
              className="flex mt-8 max-w-sm"
              style={{
                background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)',
                borderRadius: 999, padding: 4,
              }}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-transparent border-0 outline-none px-5 py-3 text-sm"
                style={{ color: '#fff', fontFamily: 'inherit' }}
              />
              <button
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium text-white transition-colors"
                style={{ background: '#3F519E' }}
              >
                Suscribirme <ArrowRight size={13} />
              </button>
            </div>

            <div className="flex gap-6 mt-6 text-xs" style={{ color: 'rgba(255,255,255,.55)' }}>
              <span className="flex items-center gap-1.5"><Globe size={13} /> Argentina · Español</span>
              <span className="flex items-center gap-1.5"><Shield size={13} /> Ley 25.326 cumplida</span>
            </div>
          </div>

          {/* Cols */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <div
                  className="text-sm font-semibold mb-4"
                  style={{ color: '#fff', fontFamily: 'var(--font-geist), system-ui, sans-serif', letterSpacing: '-0.005em' }}
                >
                  {col.title}
                </div>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href={getLinkHref(link)}
                    className="footer-link block py-1.5 text-sm transition-all hover:translate-x-1"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 text-xs" style={{ color: 'rgba(255,255,255,.5)' }}>
          <div>© 2026 Klia. Hecho con cuidado en Argentina.</div>
          <div className="flex gap-2">
            <a href="https://www.instagram.com/klia_app/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link w-9 h-9 rounded-full flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/kliaapp" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link w-9 h-9 rounded-full flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/klia-app/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link w-9 h-9 rounded-full flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@klia_app" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer-social-link w-9 h-9 rounded-full flex items-center justify-center transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Watermark */}
        <div
          className="text-center pointer-events-none select-none mt-8"
          style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: 'clamp(120px, 22vw, 280px)',
            fontWeight: 600,
            color: 'rgba(255,255,255,.04)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          klia
        </div>
      </div>
    </footer>
  )
}
