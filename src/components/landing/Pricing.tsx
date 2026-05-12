'use client'

import { useState } from 'react'
import { SYSTEM_FEATURES, CATEGORIAS } from '@/lib/features'

type Billing = 'monthly' | 'annual'

export type PlanData = {
  id: string
  nombre: string
  descripcion: string | null
  precio_mensual: number
  es_ilimitado: boolean
  funcionalidades: string[]
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

const TableCheck = () => (
  <span className="compare-yes">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  </span>
)

const TableDash = () => (
  <span className="compare-no">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </span>
)

// Visual treatment per plan based on its position in the sorted list.
// 0 (cheapest)  → ghost CTA  · "Para empezar"
// 1 (middle)    → accent CTA · "★ Más elegido"  (featured)
// 2 (highest)   → primary CTA · "Práctica avanzada"
type PlanVisuals = {
  tag: string
  ctaStyle: 'ghost' | 'accent' | 'primary'
  ctaLabel: string
  featured: boolean
  foot: string
}

function getVisuals(index: number, totalPlans: number): PlanVisuals {
  if (totalPlans === 1) {
    return { tag: '★ Único plan', ctaStyle: 'accent', ctaLabel: 'Empezar gratis', featured: true, foot: '21 días gratis · sin tarjeta' }
  }
  // Middle position is featured
  const isMiddle = totalPlans >= 3 && index === Math.floor(totalPlans / 2)
  const isLast = index === totalPlans - 1
  const isFirst = index === 0

  if (isMiddle) {
    return { tag: '★ Más elegido', ctaStyle: 'accent', ctaLabel: 'Empezar 21 días gratis', featured: true, foot: '21 días gratis sin tarjeta · cancelás cuando quieras' }
  }
  if (isLast) {
    return { tag: 'Práctica avanzada', ctaStyle: 'primary', ctaLabel: 'Empezar gratis', featured: false, foot: 'Onboarding incluido · soporte prioritario' }
  }
  if (isFirst) {
    return { tag: 'Para empezar', ctaStyle: 'ghost', ctaLabel: 'Probar gratis', featured: false, foot: '14 días de prueba · cancelás cuando quieras' }
  }
  return { tag: 'Plan', ctaStyle: 'ghost', ctaLabel: 'Empezar gratis', featured: false, foot: '14 días de prueba · cancelás cuando quieras' }
}

function PlanCard({
  plan,
  visuals,
  billing,
}: {
  plan: PlanData
  visuals: PlanVisuals
  billing: Billing
}) {
  const priceMonthly = plan.precio_mensual
  const priceAnnual = Math.round(plan.precio_mensual * 0.8)
  const price = billing === 'annual' ? priceAnnual : priceMonthly
  const strike = billing === 'annual' ? priceMonthly : null
  const registerUrl = `${APP_URL}/registro?plan=${plan.id}`
  const planFeatureSet = new Set(plan.funcionalidades)

  const includesLine = plan.es_ilimitado
    ? 'Para 1 profesional · ilimitado'
    : 'Para 1 profesional · agenda + facturación'

  return (
    <div className={`plan ${visuals.featured ? 'plan-featured' : ''}`}>
      <span className="plan-tag">{visuals.tag}</span>

      <h3 className="plan-name">{plan.nombre}</h3>
      <p className="plan-blurb">{plan.descripcion ?? ''}</p>

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

      <a href={registerUrl} className={`plan-cta plan-cta-${visuals.ctaStyle}`}>
        {visuals.ctaLabel}
        <ArrowRight />
      </a>

      <div className="plan-includes">{includesLine}</div>

      <ul className="plan-features">
        {SYSTEM_FEATURES.map((feat) => {
          const has = planFeatureSet.has(feat.key)
          return (
            <li key={feat.key} className={`plan-feature ${!has ? 'plan-feature-na' : ''}`}>
              <span className={`plan-feature-ico ${!has ? 'plan-feature-ico-na' : ''}`}>
                {has ? <Check /> : <Dash />}
              </span>
              <span>{feat.label}</span>
            </li>
          )
        })}
      </ul>

      <div className="plan-foot">{visuals.foot}</div>
    </div>
  )
}

export default function Pricing({ plans }: { plans: PlanData[] }) {
  const [billing, setBilling] = useState<Billing>('annual')
  const sorted = [...plans].sort((a, b) => a.precio_mensual - b.precio_mensual)
  const total = sorted.length
  const featuredIndex = total >= 3 ? Math.floor(total / 2) : -1

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
            {sorted.map((p, i) => (
              <PlanCard key={p.id} plan={p} visuals={getVisuals(i, total)} billing={billing} />
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
                  {sorted.map((p, i) => {
                    const price = billing === 'annual' ? Math.round(p.precio_mensual * 0.8) : p.precio_mensual
                    return (
                      <th key={p.id} className={i === featuredIndex ? 'is-featured' : ''}>
                        {p.nombre}
                        <span className="plan-head-blurb">{formatARS(price)} / mes</span>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {CATEGORIAS.map((cat) => {
                  const featuresInCat = SYSTEM_FEATURES.filter((f) => f.categoria === cat)
                  if (featuresInCat.length === 0) return null
                  return (
                    <>
                      <tr key={`section-${cat}`} className="compare-section">
                        <td colSpan={sorted.length + 1}>{cat}</td>
                      </tr>
                      {featuresInCat.map((feat) => (
                        <tr key={feat.key}>
                          <td className="feature">
                            {feat.label}
                            <span>{feat.description}</span>
                          </td>
                          {sorted.map((p, i) => {
                            const has = p.funcionalidades.includes(feat.key)
                            return (
                              <td
                                key={p.id}
                                data-label={p.nombre}
                                className={i === featuredIndex ? 'is-featured' : ''}
                              >
                                {has ? <TableCheck /> : <TableDash />}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </>
                  )
                })}
              </tbody>
            </table>
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
            <a href={`${APP_URL}/registro`} className="btn btn-accent">
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
