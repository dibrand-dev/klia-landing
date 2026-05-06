'use client'

import Image from 'next/image'
import { Globe, Shield, ArrowRight } from '@/components/ui/Icons'

const COLS = [
  {
    title: 'Producto',
    links: ['Facturación ARCA', 'Cobros Mercado Pago', 'Informes con IA', 'Agenda inteligente', 'Historia clínica', 'Reportes contables'],
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
              width={120}
              height={36}
              className="h-8 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-sm mt-5 leading-relaxed max-w-[34ch]" style={{ color: 'rgba(255,255,255,.55)' }}>
              La plataforma de gestión para profesionales y clínicas de salud en Argentina. Menos administración, más terapia.
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
                  style={{ color: '#fff', fontFamily: 'Geist, system-ui', letterSpacing: '-0.005em' }}
                >
                  {col.title}
                </div>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
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
            {['IG', 'in', 'X', 'YT'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="footer-social-link w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Watermark */}
        <div
          className="text-center pointer-events-none select-none mt-8"
          style={{
            fontFamily: 'Geist, system-ui',
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
