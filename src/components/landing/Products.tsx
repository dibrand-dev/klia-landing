'use client'

import { useState } from 'react'
import { Wallet, Brain, Calendar, Check } from '@/components/ui/Icons'

const TABS = [
  {
    id: 'atenciones',
    label: 'Atenciones del Día',
    Icon: Brain,
    title: 'Tu sala de espera inteligente.',
    body: 'Visualizá todos los turnos del día en orden cronológico y generá un resumen clínico con IA antes de cada sesión. La IA se adapta automáticamente a tu especialidad — psicología, kinesiología, pediatría y más.',
    bullets: ['Turnos del día ordenados por horario', 'Resumen clínico con IA pre-sesión', 'Adaptación automática por especialidad', 'Vista rápida del historial del paciente'],
    accentColor: '#5B6CF9',
  },
  {
    id: 'mp',
    label: 'Cobros Mercado Pago',
    Icon: Wallet,
    title: 'El paciente paga, vos cerrás la sesión.',
    body: 'QR dinámico, link de pago compartible y débito automático. Acreditación instantánea con la tasa preferencial de Klia.',
    bullets: ['QR dinámico por sesión', 'Link de pago por WhatsApp', 'Débito recurrente', 'Conciliación automática'],
    accentColor: '#00B1EA',
  },
  {
    id: 'ia',
    label: 'Informes con IA',
    Icon: Brain,
    title: 'Tu sesión, transcrita y resumida.',
    body: 'Grabá la sesión y Klia genera el informe siguiendo el formato de tu colegio profesional. Editable, exportable y siempre bajo tu firma.',
    bullets: ['Transcripción en español', 'Plantillas por especialidad', 'Edición asistida', 'Cumplimiento Ley 25.326'],
    accentColor: '#8C6ED8',
  },
  {
    id: 'agenda',
    label: 'Agenda inteligente',
    Icon: Calendar,
    title: 'Una agenda que entiende tu práctica.',
    body: 'Visualizá tu semana de un vistazo, evitá conflictos automáticamente y sincronizá con Google Calendar. Todo en un solo lugar.',
    bullets: ['Vistas día, semana y mes', 'Sincronización Google Calendar', 'Videollamadas con Meet automático', 'Turnos recurrentes y entrevistas'],
    accentColor: '#3D9C6B',
  },
]

export default function Products() {
  const [active, setActive] = useState(TABS[0].id)
  const current = TABS.find((t) => t.id === active)!
  const { Icon } = current

  return (
    <section id="producto" className="py-36 bg-white">
      <div className="max-w-container mx-auto px-7">
        <div className="section-head mb-32 max-w-2xl">
          <div className="eyebrow mb-4 reveal">Producto</div>
          <h2 className="h-2 reveal reveal-d1" style={{ color: '#0E1430' }}>
            Una solución integral para cada etapa de tu práctica.
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-bg-alt border border-line rounded-full w-fit mx-auto mb-12 max-w-full reveal">
          {TABS.map((t) => {
            const TabIcon = t.Icon
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={[
                  'flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  active === t.id
                    ? 'bg-white text-klia shadow-sm-klia'
                    : 'text-ink-2 hover:text-klia',
                ].join(' ')}
              >
                <TabIcon size={18} />
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Copy */}
          <div>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
              style={{ background: `${current.accentColor}15`, color: current.accentColor }}
            >
              <Icon size={28} />
            </div>
            <h3
              className="mb-5"
              style={{
                fontFamily: 'var(--font-geist), system-ui, sans-serif',
                fontSize: 'clamp(22px, 2.2vw, 30px)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                maxWidth: '14ch',
                color: '#0E1430',
              }}
            >
              {current.title}
            </h3>
            <p className="lead mb-7">{current.body}</p>

            <ul className="grid grid-cols-2 gap-3 mb-8 p-0 list-none">
              {current.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-2">
                  <Check size={16} className="flex-shrink-0 mt-0.5" style={{ color: current.accentColor }} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

          </div>

          {/* Phone visual */}
          <div className="flex items-center justify-center relative min-h-[520px]">
            <div className="relative z-10">
              <PhoneApp />
            </div>
            <div
              className="absolute w-3/4 h-3/4 rounded-full opacity-25 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${current.accentColor} 0%, transparent 60%)`, filter: 'blur(80px)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneApp() {
  return (
    <div
      style={{
        width: 260,
        height: 530,
        background: '#FFFFFF',
        borderRadius: 40,
        border: '1px solid #E5E7EF',
        overflow: 'hidden',
        boxShadow: '0 40px 80px -20px rgba(14,20,48,.15), 0 10px 30px -10px rgba(14,20,48,.08)',
        position: 'relative',
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: 32,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          position: 'relative',
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: '#0E1430', zIndex: 1, position: 'relative' }}>9:41</span>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 80,
            height: 24,
            background: '#0E1430',
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        />
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', zIndex: 1, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
            {[4, 6, 8, 10].map((h, i) => (
              <div key={i} style={{ width: 2.5, height: h, borderRadius: 1, background: i < 3 ? '#0E1430' : '#CBD0DB' }} />
            ))}
          </div>
          <div style={{ width: 20, height: 10, borderRadius: 2, border: '1.5px solid #0E1430', position: 'relative', marginLeft: 3 }}>
            <div style={{ position: 'absolute', right: -3, top: '50%', transform: 'translateY(-50%)', width: 2, height: 5, background: '#0E1430', borderRadius: 1 }} />
            <div style={{ margin: '1.5px 2px', height: 5, background: '#3D9C6B', borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* App content */}
      <div style={{ padding: '14px 16px 0', background: '#fff', height: 'calc(100% - 32px)', position: 'relative', overflow: 'hidden' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ color: '#5A607A', fontSize: 10, marginBottom: 2 }}>Buen día, Dra.</div>
            <div style={{ color: '#0E1430', fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>Lucía Méndez</div>
          </div>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#FFD3CC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: '#8B4040',
              flexShrink: 0,
            }}
          >
            LM
          </div>
        </div>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>
          {[{ l: 'Hoy', a: true }, { l: 'Semana', a: false }, { l: 'Pacientes', a: false }].map(({ l, a }) => (
            <div
              key={l}
              style={{
                padding: '4px 11px',
                borderRadius: 999,
                background: a ? '#0E1430' : '#F7F8FB',
                color: a ? '#fff' : '#5A607A',
                fontSize: 10,
                fontWeight: a ? 600 : 400,
              }}
            >
              {l}
            </div>
          ))}
        </div>

        {/* Revenue card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3F519E 0%, #2F3F82 100%)',
            borderRadius: 14,
            padding: '12px 14px',
            marginBottom: 14,
          }}
        >
          <div style={{ color: 'rgba(255,255,255,.65)', fontSize: 8, letterSpacing: '.08em', marginBottom: 5 }}>
            COBRADO ESTE MES
          </div>
          <div style={{ color: '#fff', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
            $487.200
          </div>
          <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 8.5, marginTop: 4 }}>+72,4% vs. mes pasado</div>
          <div style={{ display: 'flex', gap: 3, marginTop: 10, alignItems: 'flex-end' }}>
            {[0.35, 0.55, 0.45, 0.65, 0.4, 0.75, 1].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 18 * h,
                  borderRadius: 2,
                  background: i === 6 ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.3)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Próximo turno row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ color: '#0E1430', fontSize: 11, fontWeight: 600 }}>Próximo turno</div>
          <div style={{ color: '#3F519E', fontSize: 9 }}>Ver agenda →</div>
        </div>

        {/* Appointment card */}
        <div
          style={{
            background: '#F7F8FB',
            borderRadius: 10,
            padding: '9px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ color: '#0E1430', fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Carolina Vázquez</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ color: '#5A607A', fontSize: 8.5 }}>10:30 · 41 min</span>
              <span style={{ fontSize: 8, padding: '1.5px 5px', borderRadius: 999, background: '#EFF1F7', color: '#5A607A' }}>
                Sesión 12
              </span>
              <span style={{ fontSize: 8, padding: '1.5px 5px', borderRadius: 999, background: '#E5F5EC', color: '#3D9C6B' }}>
                Pagada
              </span>
            </div>
          </div>
          <svg width={7} height={12} viewBox="0 0 7 12" fill="none">
            <path d="M1 1l5 5-5 5" stroke="#C0C4D0" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Bottom nav */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fff',
            borderTop: '1px solid #EFF1F7',
            padding: '8px 8px 12px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {/* Analytics */}
          <NavBtn>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9097B0" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </NavBtn>
          {/* Calendar */}
          <NavBtn>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9097B0" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </NavBtn>
          {/* Center CTA */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#3F519E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          {/* Receipt / Facturar */}
          <NavBtn>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9097B0" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
            </svg>
          </NavBtn>
          {/* Wallet / Cobrar */}
          <NavBtn>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#9097B0" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
            </svg>
          </NavBtn>
        </div>
      </div>
    </div>
  )
}

function NavBtn({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}
