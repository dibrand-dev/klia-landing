'use client'

import { useState } from 'react'
import { Receipt, Wallet, Brain, Calendar, Check, ArrowRight } from '@/components/ui/Icons'

const TABS = [
  {
    id: 'fact',
    label: 'Facturación ARCA',
    Icon: Receipt,
    title: 'Facturación electrónica, sin abrir ARCA.',
    body: 'Klia genera y envía tus comprobantes de forma automática al cerrar la sesión. Monotributistas y responsables inscriptos. Reporte mensual descargable para tu contador.',
    bullets: ['Factura A, B, C automáticas', 'Notas de crédito y débito', 'Reporte para contador', 'Multi-CUIT en clínicas'],
    accentColor: '#3F519E',
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
    body: 'Recordatorios por WhatsApp, lista de espera con auto-confirmación y bloques recurrentes. Menos huecos, más sesiones.',
    bullets: ['Recordatorios WhatsApp', 'Lista de espera inteligente', 'Sincronización Google Calendar', 'Reagendado en 1 clic'],
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
        <div className="section-head mb-16 max-w-2xl">
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
        <div key={current.id} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center animate-fade-up reveal">
          {/* Copy */}
          <div>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
              style={{ background: `${current.accentColor}15`, color: current.accentColor }}
            >
              <Icon size={28} />
            </div>
            <h3 className="mb-5" style={{ fontFamily: 'Geist, system-ui', fontSize: 'clamp(22px, 2.2vw, 30px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, maxWidth: '14ch', color: '#0E1430' }}>
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

            <a href="#" className="inline-flex items-center gap-2 text-klia font-medium border-b border-current pb-0.5 hover:gap-3.5 transition-all">
              Ver detalle del módulo <ArrowRight size={14} />
            </a>
          </div>

          {/* Phone visual */}
          <div className="flex items-center justify-center relative min-h-[520px]">
            <div className="relative z-10">
              <MiniPhone variant={current.id as 'fact' | 'mp' | 'ia' | 'agenda'} color={current.accentColor} />
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

function MiniPhone({ variant, color }: { variant: string; color: string }) {
  return (
    <div style={{
      width: 260, height: 520,
      background: '#0E1430',
      borderRadius: 40,
      border: '6px solid #1A2257',
      overflow: 'hidden',
      boxShadow: '0 50px 100px -20px rgba(14,20,48,.4)',
      position: 'relative',
    }}>
      {/* Status bar */}
      <div style={{ height: 28, background: '#0E1430', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 88, height: 24, background: '#0E1430',
          borderBottomLeftRadius: 14, borderBottomRightRadius: 14,
        }} />
      </div>

      <div style={{ padding: '12px 16px', height: 'calc(100% - 28px)', overflow: 'hidden' }}>
        <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 10, marginBottom: 8 }}>Klia</div>

        {variant === 'fact' && <ScreenARCA color={color} />}
        {variant === 'mp' && <ScreenPago color={color} />}
        {variant === 'ia' && <ScreenIA color={color} />}
        {variant === 'agenda' && <ScreenAgenda color={color} />}
      </div>
    </div>
  )
}

function ScreenARCA({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Facturación ARCA</div>
      <div style={{
        background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 12, padding: 12,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/></svg>
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>Factura B emitida</div>
          <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 9 }}>$18.500 · Lucía Mendez</div>
        </div>
      </div>
      {['Carlos Pérez · $18.500', 'Ana Rodríguez · $18.500', 'Diego López · $22.000'].map((item, i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(255,255,255,.05)', borderRadius: 10, padding: '8px 10px',
        }}>
          <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 10 }}>{item.split(' · ')[0]}</div>
          <div style={{ color: color, fontSize: 10, fontWeight: 600 }}>{item.split(' · ')[1]}</div>
        </div>
      ))}
    </div>
  )
}

function ScreenPago({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Cobrar sesión</div>
      <div style={{
        background: `linear-gradient(135deg, #3F519E, #2F3F82)`, borderRadius: 16, padding: 16, textAlign: 'center',
      }}>
        <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 9 }}>TOTAL A COBRAR</div>
        <div style={{ color: '#fff', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>$18.500</div>
      </div>
      <div style={{
        background: 'rgba(255,255,255,.07)', borderRadius: 10, padding: 12,
        display: 'flex', justifyContent: 'space-around',
      }}>
        {['QR', 'Link', 'Débito'].map((opt, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: i === 0 ? color : 'rgba(255,255,255,.1)', margin: '0 auto 4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 16, height: 16, border: i === 0 ? 'none' : '2px solid rgba(255,255,255,.3)', borderRadius: 4 }} />
            </div>
            <div style={{ color: i === 0 ? '#fff' : 'rgba(255,255,255,.4)', fontSize: 9 }}>{opt}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScreenIA({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Informe IA</div>
      <div style={{
        background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 12, padding: 10,
      }}>
        <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 9, marginBottom: 6 }}>TRANSCRIPCIÓN EN PROCESO</div>
        <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 10, lineHeight: 1.5 }}>
          La paciente refiere mejoras significativas en el manejo de la ansiedad. Se observa mayor...
        </div>
      </div>
      <div style={{
        background: color, borderRadius: 10, padding: 10, textAlign: 'center',
        color: '#fff', fontSize: 11, fontWeight: 600,
      }}>Generar informe completo</div>
    </div>
  )
}

function ScreenAgenda({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Agenda</div>
      {['09:00 · Lucía Mendez', '10:30 · Carlos Pérez', '12:00 · Ana Rodríguez', '15:00 · Diego López'].map((item, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: i === 0 ? `${color}22` : 'rgba(255,255,255,.05)',
          border: i === 0 ? `1px solid ${color}44` : '1px solid rgba(255,255,255,.06)',
          borderRadius: 10, padding: 10,
        }}>
          <div style={{ width: 3, height: 32, borderRadius: 99, background: i === 0 ? color : 'rgba(255,255,255,.15)', flexShrink: 0 }} />
          <div>
            <div style={{ color: i === 0 ? '#fff' : 'rgba(255,255,255,.6)', fontSize: 10, fontWeight: i === 0 ? 600 : 400 }}>
              {item.split(' · ')[1]}
            </div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 9 }}>{item.split(' · ')[0]}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
