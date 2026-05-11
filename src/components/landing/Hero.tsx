'use client'

import Link from 'next/link'
import { ArrowRight, Play, Star, Brain, Check, Sparkle } from '@/components/ui/Icons'

const MARQUEE_ITEMS = [
  'ARCA · Facturación electrónica',
  'Mercado Pago · Cobros instantáneos',
  'IA · Informes en segundos',
  'Agenda inteligente',
  'WhatsApp · Recordatorios',
  'Historia clínica digital',
  'Reportes contables',
  'Multi-profesional',
]

export default function Hero() {
  return (
    <section className="relative pt-36 pb-0 overflow-hidden bg-white">
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage: `linear-gradient(to right, #EFF1F7 1px, transparent 1px), linear-gradient(to bottom, #EFF1F7 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 35%, transparent 85%)',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 35%, transparent 85%)',
        }}
      />

      {/* Blobs */}
      <div className="absolute -top-44 -left-28 w-[520px] h-[520px] rounded-full opacity-30 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3F519E 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <div className="absolute -bottom-44 -right-20 w-[460px] h-[460px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF7A66 0%, transparent 70%)', filter: 'blur(70px)' }} />

      {/* Content */}
      <div className="max-w-container mx-auto px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* Copy */}
          <div>
            <div className="eyebrow mb-6">PARA PROFESIONALES Y CLÍNICAS DE SALUD EN ARGENTINA</div>

            <h1 className="h-display mb-6" style={{ color: '#0E1430' }}>
              La gestión de tu consultorio,<br />
              <span className="serif-it" style={{ color: '#3F519E' }}>simplificada.</span>
            </h1>

            <p className="lead mb-9">
              Agenda sincronizada, facturación ARCA, cobros por Mercado Pago e informes con IA.
              Todo desde tu teléfono.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/registro" className="btn btn-accent btn-lg">
                Probar 21 días gratis <ArrowRight size={16} />
              </Link>
              <a href="#producto" className="btn btn-ghost btn-lg">
                <Play size={18} /> Ver cómo funciona
              </a>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {[
                  { bg: '#FFD3CC', label: 'MR' },
                  { bg: '#D6E0F5', label: 'JL' },
                  { bg: '#D5EFDF', label: 'SC' },
                  { bg: '#FFF1D6', label: '+' },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-white text-ink"
                    style={{ background: a.bg, marginLeft: i === 0 ? 0 : -8 }}
                  >
                    {a.label}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber" style={{ color: '#F4B860' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} />)}
                  <span className="ml-1.5 text-slate text-sm font-medium">4,9</span>
                </div>
                <div className="text-slate text-xs mt-0.5">
                  Más de 1.300 profesionales ya automatizan su consulta con Klia.
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Phone stack */}
            <div className="relative w-full h-full">
              {/* Back phone */}
              <div className="absolute right-0 top-8 opacity-90 z-10"
                style={{ animation: 'float 7s ease-in-out infinite -2s' }}>
                <PhoneMock variant="pay" scale={0.82} />
              </div>

              {/* Front phone */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ animation: 'float 6s ease-in-out infinite' }}>
                <PhoneMock variant="home" />
              </div>

              {/* Callout 1 */}
              <div className="absolute left-0 z-30" style={{ top: '28%', animation: 'float 5s ease-in-out infinite -1s' }}>
                <Callout
                  icon={<Brain size={16} />}
                  iconBg="#E8ECF8" iconColor="#3F519E"
                  title="Informe listo"
                  meta="Generado en 8s"
                />
              </div>

              {/* Callout 2 */}
              <div className="absolute right-0 z-30" style={{ bottom: '24%', animation: 'float 5s ease-in-out infinite -3s' }}>
                <Callout
                  icon={<Check size={16} />}
                  iconBg="#E5F5EC" iconColor="#3D9C6B"
                  title="Cobro acreditado"
                  meta="$18.500 · Mercado Pago"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrap mt-20">
        <div className="marquee-track-container">
          {[0, 1].map((k) => (
            <div className="marquee-track" key={k}>
              {MARQUEE_ITEMS.map((t, i) => (
                <span className="marquee-item" key={i}>
                  <Sparkle size={14} style={{ color: '#3F519E' }} /> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Callout({ icon, iconBg, iconColor, title, meta }: {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  title: string
  meta: string
}) {
  return (
    <div className="flex items-center gap-3 bg-white border border-line rounded-xl p-3 shadow-lg-klia">
      <div
        className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-ink">{title}</div>
        <div className="text-[11px] text-slate mt-0.5">{meta}</div>
      </div>
    </div>
  )
}

function PhoneMock({ variant, scale = 1 }: { variant: 'home' | 'pay'; scale?: number }) {
  const w = 240 * scale
  const h = 480 * scale

  return (
    <div
      style={{
        width: w, height: h,
        background: '#0E1430',
        borderRadius: 36 * scale,
        border: `${6 * scale}px solid #1A2257`,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 50px 100px -20px rgba(14,20,48,.4), 0 20px 40px -15px rgba(14,20,48,.2)',
      }}
    >
      {/* Notch */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 80 * scale, height: 24 * scale, background: '#0E1430',
        borderBottomLeftRadius: 12 * scale, borderBottomRightRadius: 12 * scale,
        zIndex: 10,
      }} />

      {variant === 'home' ? <PhoneHomeScreen scale={scale} /> : <PhonePayScreen scale={scale} />}
    </div>
  )
}

function PhoneHomeScreen({ scale }: { scale: number }) {
  const s = (v: number) => v * scale
  return (
    <div style={{ padding: `${s(36)}px ${s(16)}px ${s(16)}px`, height: '100%', display: 'flex', flexDirection: 'column', gap: s(10) }}>
      <div style={{ color: 'rgba(255,255,255,.5)', fontSize: s(10), marginTop: s(4) }}>Martes, 6 de mayo</div>
      <div style={{ color: '#fff', fontSize: s(16), fontWeight: 600, lineHeight: 1.2 }}>Buenos días, Dr. García</div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: s(6), marginTop: s(4) }}>
        {[
          { v: '8', l: 'turnos hoy' },
          { v: '$142k', l: 'este mes' },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, background: 'rgba(255,255,255,.07)', borderRadius: s(12),
            padding: `${s(10)}px ${s(10)}px`, border: '1px solid rgba(255,255,255,.1)',
          }}>
            <div style={{ color: '#fff', fontSize: s(18), fontWeight: 700, lineHeight: 1 }}>{stat.v}</div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: s(9), marginTop: s(2) }}>{stat.l}</div>
          </div>
        ))}
      </div>

      {/* Next appointment */}
      <div style={{
        background: 'rgba(63,81,158,.3)', borderRadius: s(12), padding: s(10),
        border: '1px solid rgba(63,81,158,.4)',
      }}>
        <div style={{ color: 'rgba(255,255,255,.6)', fontSize: s(9), marginBottom: s(4) }}>PRÓXIMA SESIÓN</div>
        <div style={{ color: '#fff', fontSize: s(12), fontWeight: 600 }}>Lucía Mendez</div>
        <div style={{ color: 'rgba(255,255,255,.5)', fontSize: s(10) }}>09:30 · Psicología</div>
        <div style={{
          marginTop: s(8), background: '#3F519E', borderRadius: 999, padding: `${s(5)}px ${s(10)}px`,
          display: 'inline-block', color: '#fff', fontSize: s(9), fontWeight: 600,
        }}>Iniciar sesión</div>
      </div>

      {/* Turno list */}
      {[
        { hora: '10:00', nombre: 'Carlos Pérez', tipo: 'Online' },
        { hora: '11:30', nombre: 'Ana Rodríguez', tipo: 'Presencial' },
      ].map((t, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: s(8),
          background: 'rgba(255,255,255,.05)', borderRadius: s(10), padding: s(10),
          border: '1px solid rgba(255,255,255,.06)',
        }}>
          <div style={{ color: 'rgba(255,255,255,.6)', fontSize: s(9), width: s(28), flexShrink: 0 }}>{t.hora}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontSize: s(11), fontWeight: 500 }}>{t.nombre}</div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: s(9) }}>{t.tipo}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PhonePayScreen({ scale }: { scale: number }) {
  const s = (v: number) => v * scale
  return (
    <div style={{ padding: `${s(36)}px ${s(16)}px ${s(16)}px`, height: '100%', display: 'flex', flexDirection: 'column', gap: s(12) }}>
      <div style={{ color: '#fff', fontSize: s(14), fontWeight: 600 }}>Cobros</div>

      <div style={{
        background: 'linear-gradient(135deg, #3F519E, #2F3F82)', borderRadius: s(16),
        padding: s(16), textAlign: 'center',
      }}>
        <div style={{ color: 'rgba(255,255,255,.7)', fontSize: s(9) }}>TOTAL DEL MES</div>
        <div style={{ color: '#fff', fontSize: s(28), fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: s(4) }}>
          $142.500
        </div>
        <div style={{ color: 'rgba(255,255,255,.6)', fontSize: s(9), marginTop: s(4) }}>+12% vs. mes anterior</div>
      </div>

      {[
        { nombre: 'Lucía Mendez', monto: '$18.500', estado: 'Acreditado', color: '#3D9C6B' },
        { nombre: 'Carlos Pérez', monto: '$18.500', estado: 'Pendiente', color: '#F4B860' },
        { nombre: 'Ana Rodríguez', monto: '$18.500', estado: 'Acreditado', color: '#3D9C6B' },
      ].map((p, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(255,255,255,.06)', borderRadius: s(10), padding: s(10),
        }}>
          <div>
            <div style={{ color: '#fff', fontSize: s(11), fontWeight: 500 }}>{p.nombre}</div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: s(9) }}>{p.monto}</div>
          </div>
          <span style={{
            fontSize: s(9), fontWeight: 600, color: p.color,
            background: `${p.color}22`, borderRadius: 999, padding: `${s(3)}px ${s(8)}px`,
          }}>{p.estado}</span>
        </div>
      ))}
    </div>
  )
}
