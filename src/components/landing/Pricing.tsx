'use client'

import { useState } from 'react'

type Billing = 'monthly' | 'annual'

type PlanFeature = { has: boolean; text: string }

type Plan = {
  id: 'esencial' | 'profesional' | 'premium'
  name: string
  blurb: string
  priceMonthly: number
  priceAnnual: number
  ctaLabel: string
  ctaStyle: 'ghost' | 'accent' | 'primary'
  featured?: boolean
  includes: string
  features: PlanFeature[]
  tag: string
  foot: string
}

type Prices = {
  esencial: number
  profesional: number
  premium: number
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.klia.com.ar'

const formatARS = (n: number) => '$ ' + n.toLocaleString('es-AR')

const Check = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const Dash = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const COMPARE: Array<{ section?: string; f?: string; s?: string; v?: (boolean | string)[] }> = [
  { section: 'Pacientes y agenda' },
  { f: 'Pacientes activos', v: ['Hasta 50', 'Ilimitado', 'Ilimitado'] },
  { f: 'Turnos por mes', v: ['Ilimitado', 'Ilimitado', 'Ilimitado'] },
  { f: 'Sincronización con Google Calendar', v: [true, true, true] },
  { f: 'Recordatorios por WhatsApp y email', v: [true, true, true] },
  { f: 'Historia clínica digital', s: 'Notas evolutivas, archivos adjuntos', v: ['Básica', 'Completa', 'Completa'] },
  { section: 'Facturación y cobros' },
  { f: 'Facturación ARCA (factura C)', v: [true, true, true] },
  { f: 'Cobros con Mercado Pago', v: [false, true, true] },
  { f: 'Liquidación de obras sociales', v: [false, true, true] },
  { f: 'Reportes contables exportables', v: [false, true, true] },
  { section: 'Inteligencia artificial' },
  { f: 'Informes con IA', s: 'Claude + Gemini', v: [false, false, true] },
  { f: 'Transcripción de sesiones', v: [false, false, true] },
  { f: 'Plantillas por especialidad', v: [false, true, 'Avanzadas'] },
  { section: 'Soporte y onboarding' },
  { f: 'Canal de soporte', v: ['Email · 24h', 'WhatsApp · 4h', 'Prioritario · 1h'] },
  { f: 'Onboarding 1:1', v: [false, false, true] },
  { f: 'API para integraciones', v: [false, false, true] },
]

const ADDONS = [
  {
    name: 'Secretaria virtual',
    price: '+ $ 4.900 / mes',
    blurb: 'Confirmación de turnos y derivación de consultas administrativas por WhatsApp, para que vos te dediques 100% al paciente.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    name: 'Migración asistida',
    price: 'Gratis · primeros 100',
    blurb: 'Importamos pacientes, agenda y plantillas desde Excel, Google, Doctoralia. La hace nuestro equipo, no movés un dedo.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp Business',
    price: '+ $ 2.500 / mes',
    blurb: 'Línea verificada con tu nombre, plantillas aprobadas y respuestas automáticas integradas a tu agenda.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
]

function buildPlans(prices: Prices): Plan[] {
  return [
    {
      id: 'esencial',
      name: 'Esencial',
      blurb: 'Para profesionales que empiezan a digitalizar su consultorio.',
      priceMonthly: prices.esencial,
      priceAnnual: Math.round(prices.esencial * 0.8),
      ctaLabel: 'Probar gratis',
      ctaStyle: 'ghost',
      tag: 'Para empezar',
      includes: 'Para 1 profesional · agenda + facturación.',
      foot: '14 días de prueba · cancelás cuando quieras',
      features: [
        { has: true, text: 'Agenda inteligente con sincronización' },
        { has: true, text: 'Hasta 50 pacientes activos' },
        { has: true, text: 'Facturación electrónica ARCA (factura C)' },
        { has: true, text: 'Recordatorios automáticos por WhatsApp' },
        { has: true, text: 'Historia clínica digital básica' },
        { has: false, text: 'Cobros con Mercado Pago' },
        { has: false, text: 'Informes con IA' },
        { has: false, text: 'Multi-profesional' },
      ],
    },
    {
      id: 'profesional',
      name: 'Profesional',
      blurb: 'El más elegido por profesionales con consulta activa.',
      priceMonthly: prices.profesional,
      priceAnnual: Math.round(prices.profesional * 0.8),
      ctaLabel: 'Empezar 21 días gratis',
      ctaStyle: 'accent',
      featured: true,
      tag: '★ Más elegido',
      includes: 'Para 1 profesional · ilimitado.',
      foot: '21 días gratis sin tarjeta · cancelás cuando quieras',
      features: [
        { has: true, text: 'Todo lo de Esencial' },
        { has: true, text: 'Pacientes y turnos ilimitados' },
        { has: true, text: 'Cobros con Mercado Pago (tasa preferencial)' },
        { has: true, text: 'Liquidación de obras sociales y prepagas' },
        { has: true, text: 'Reportes contables exportables' },
        { has: true, text: 'Plantillas por especialidad' },
        { has: true, text: 'Soporte por WhatsApp en 4 horas hábiles' },
        { has: false, text: 'Informes con IA · Multi-profesional' },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      blurb: 'Para profesionales con alta demanda. Incluye IA para informes.',
      priceMonthly: prices.premium,
      priceAnnual: Math.round(prices.premium * 0.8),
      ctaLabel: 'Probar Premium',
      ctaStyle: 'primary',
      tag: 'Práctica avanzada',
      includes: 'Para 1 profesional · todo incluido.',
      foot: 'Onboarding incluido · soporte prioritario',
      features: [
        { has: true, text: 'Todo lo del Plan Profesional' },
        { has: true, text: 'Informes con IA (Claude + Gemini)' },
        { has: true, text: 'Transcripción de sesiones en español' },
        { has: true, text: 'Plantillas avanzadas por especialidad' },
        { has: true, text: 'Asistente clínico personalizado' },
        { has: true, text: 'API para integrar con tu sistema' },
        { has: true, text: 'Soporte prioritario · respuesta 1h' },
        { has: true, text: 'Onboarding personalizado 1:1' },
      ],
    },
  ]
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === 'annual' ? plan.priceAnnual : plan.priceMonthly
  const strike = billing === 'annual' ? plan.priceMonthly : null
  const registerUrl = `${APP_URL}/registro?plan=${plan.id}`

  return (
    <div className={`plan ${plan.featured ? 'plan-featured' : ''}`}>
      <span className="plan-tag">{plan.tag}</span>

      <h3 className="plan-name">{plan.name}</h3>
      <p className="plan-blurb">{plan.blurb}</p>

      <div className="plan-price">
        <span className="plan-price-currency">$</span>
        <span className="plan-price-num">{price.toLocaleString('es-AR')}</span>
        <span className="plan-price-period">/ mes</span>
        {strike && <span className="plan-price-strike">{formatARS(strike)}</span>}
      </div>
      <div className="plan-billed">
        {billing === 'annual'
          ? `Facturado anual · ${formatARS(price * 12)}`
          : 'Facturado mensual · sin permanencia'}
      </div>

      <a href={registerUrl} className={`plan-cta plan-cta-${plan.ctaStyle}`}>
        {plan.ctaLabel}
        <ArrowRight />
      </a>

      <div className="plan-includes">{plan.includes}</div>

      <ul className="plan-features">
        {plan.features.map((f, i) => (
          <li key={i} className={`plan-feature ${!f.has ? 'plan-feature-na' : ''}`}>
            <span className={`plan-feature-ico ${!f.has ? 'plan-feature-ico-na' : ''}`}>
              {f.has ? <Check /> : <Dash />}
            </span>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>

      <div className="plan-foot">{plan.foot}</div>
    </div>
  )
}

function Cell({ v, label, featured }: { v: boolean | string; label: string; featured?: boolean }) {
  let content: React.ReactNode
  if (v === true) {
    content = (
      <span className="compare-yes">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </span>
    )
  } else if (v === false) {
    content = (
      <span className="compare-no">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </span>
    )
  } else {
    content = <span className="compare-value">{v}</span>
  }
  return <td data-label={label} className={featured ? 'is-featured' : ''}>{content}</td>
}

export default function Pricing({ prices }: { prices?: Prices }) {
  const [billing, setBilling] = useState<Billing>('annual')
  const effectivePrices: Prices = prices ?? { esencial: 7900, profesional: 14900, premium: 24900 }
  const plans = buildPlans(effectivePrices)

  return (
    <div className="pricing-shell">
      {/* HERO */}
      <header className="pricing-hero">
        <div className="container">
          <div className="eyebrow eyebrow-center">Precios transparentes · sin sorpresas</div>
          <h1>
            Un precio pensado para <span className="serif-it">tu práctica.</span>
          </h1>
          <p className="pricing-hero-lead">
            Planes diseñados para profesionales de la salud que ejercen de forma independiente. Sin permanencia, sin tarjeta para empezar y 21 días gratis del plan completo. Precios en pesos argentinos, IVA incluido.
          </p>
          <div className="billing-toggle" role="tablist">
            <button
              className={billing === 'monthly' ? 'is-active' : ''}
              onClick={() => setBilling('monthly')}
            >
              Mensual
            </button>
            <button
              className={billing === 'annual' ? 'is-active' : ''}
              onClick={() => setBilling('annual')}
            >
              Anual <span className="billing-save">2 meses gratis</span>
            </button>
          </div>
        </div>
      </header>

      {/* PLANS */}
      <section className="plans">
        <div className="container">
          <div className="plans-grid">
            {plans.map((p) => (
              <PlanCard key={p.id} plan={p} billing={billing} />
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="compare">
        <div className="container">
          <div className="compare-head">
            <div className="eyebrow eyebrow-center">Comparativa completa</div>
            <h2>
              Todo lo que necesitás <span className="serif-it">como profesional.</span>
            </h2>
          </div>

          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: '36%' }}>Funcionalidad</th>
                  <th>
                    Esencial
                    <span className="plan-head-blurb">
                      {billing === 'annual' ? formatARS(plans[0].priceAnnual) : formatARS(plans[0].priceMonthly)} / mes
                    </span>
                  </th>
                  <th className="is-featured">
                    Profesional
                    <span className="plan-head-blurb">
                      {billing === 'annual' ? formatARS(plans[1].priceAnnual) : formatARS(plans[1].priceMonthly)} / mes
                    </span>
                  </th>
                  <th>
                    Premium
                    <span className="plan-head-blurb">
                      {billing === 'annual' ? formatARS(plans[2].priceAnnual) : formatARS(plans[2].priceMonthly)} / mes
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row, i) => {
                  if (row.section) {
                    return (
                      <tr key={i} className="compare-section">
                        <td colSpan={4}>{row.section}</td>
                      </tr>
                    )
                  }
                  return (
                    <tr key={i}>
                      <td className="feature">
                        {row.f}
                        {row.s && <span>{row.s}</span>}
                      </td>
                      <Cell v={row.v![0]} label="Esencial" />
                      <Cell v={row.v![1]} label="Profesional" featured />
                      <Cell v={row.v![2]} label="Premium" />
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="addons">
        <div className="container">
          <div className="compare-head" style={{ marginBottom: 0, textAlign: 'left' }}>
            <div className="eyebrow">Complementos</div>
            <h2 style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '14px 0 0', maxWidth: '20ch', color: '#0E1430' }}>
              Sumá lo que{' '}
              <span style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif', fontStyle: 'italic', fontWeight: 400, color: '#3F519E' }}>necesites</span>
              , cuando lo necesites.
            </h2>
          </div>
          <div className="addons-grid">
            {ADDONS.map((a, i) => (
              <div key={i} className="addon">
                <div className="addon-ico">{a.icon}</div>
                <div>
                  <h3 className="addon-name">{a.name}</h3>
                  <div className="addon-price">{a.price}</div>
                </div>
                <p className="addon-blurb">{a.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <div className="container">
          <h2>
            Volvé a ocuparte <span className="serif-it">de tus pacientes.</span>
          </h2>
          <div className="pricing-cta-row">
            <a href={`${APP_URL}/registro?plan=profesional`} className="btn btn-accent">
              Probar Klia gratis →
            </a>
            <a href="mailto:clinicas@klia.com.ar" className="btn btn-ghost">
              ¿Sos una clínica? Hablemos
            </a>
          </div>
          <div style={{ marginTop: 22, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.06em', color: 'rgba(255,255,255,.5)' }}>
            21 días gratis · sin tarjeta · sin permanencia · soporte humano
          </div>
        </div>
      </section>
    </div>
  )
}
