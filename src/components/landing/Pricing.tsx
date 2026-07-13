export type ModuloItem = {
  modulo_id: string
  nombre: string
  descripcion: string
  planes: string[]
}

export type PlanData = {
  id: string
  slug: string | null
  nombre: string
  descripcion: string | null
  precio_mensual: number
  es_ilimitado: boolean
  modulos: ModuloItem[]
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.klia.com.ar'

const formatARS = (n: number) => '$ ' + n.toLocaleString('es-AR')

const Check = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
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

type PlanVisuals = {
  tag: string
  ctaStyle: 'ghost' | 'accent' | 'primary'
  ctaLabel: string
  featured: boolean
  foot: string
}

function getVisuals(plan: PlanData, index: number, totalPlans: number, featuredIndex: number): PlanVisuals {
  const isFeatured = index === featuredIndex
  const isLast = index === totalPlans - 1
  const isFree = plan.precio_mensual === 0

  if (isFeatured) {
    return { tag: '★ Más elegido', ctaStyle: 'accent', ctaLabel: 'Empezar 21 días gratis', featured: true, foot: '21 días gratis sin tarjeta · cancelás cuando quieras' }
  }
  if (isFree) {
    return { tag: 'Gratuito', ctaStyle: 'ghost', ctaLabel: 'Crear cuenta', featured: false, foot: 'Sin tarjeta · cancelás cuando quieras' }
  }
  if (isLast) {
    return { tag: 'Práctica avanzada', ctaStyle: 'primary', ctaLabel: 'Empezar gratis', featured: false, foot: 'Onboarding incluido · soporte prioritario' }
  }
  return { tag: 'Para empezar', ctaStyle: 'ghost', ctaLabel: 'Probar gratis', featured: false, foot: '21 días de prueba · cancelás cuando quieras' }
}

function PlanCard({ plan, visuals }: { plan: PlanData; visuals: PlanVisuals }) {
  const registerUrl = `${APP_URL}/registro?plan=${plan.id}`

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
        <span className="plan-price-num">{plan.precio_mensual.toLocaleString('es-AR')}</span>
        <span className="plan-price-period">/ mes</span>
      </div>
      <div className="plan-billed">Facturado mensual · sin permanencia</div>

      <a href={registerUrl} className={`plan-cta plan-cta-${visuals.ctaStyle}`}>
        {visuals.ctaLabel}
        <ArrowRight />
      </a>

      <div className="plan-includes">{includesLine}</div>

      <ul className="plan-features">
        {plan.modulos
          .filter(m => m.planes.includes(plan.id))
          .map(m => (
            <li key={m.modulo_id} className="plan-feature">
              <span className="plan-feature-ico"><Check /></span>
              <span>{m.nombre}</span>
            </li>
          ))
        }
      </ul>

      <div className="plan-foot">{visuals.foot}</div>
    </div>
  )
}

function pickFeaturedIndex(sorted: PlanData[]): number {
  if (sorted.length === 0) return -1
  if (sorted.length === 1) return 0
  return sorted.length - 2
}

function buildComparativa(plans: PlanData[], todosModulos: ModuloItem[]) {
  return todosModulos.map(modulo => {
    const row: Record<string, unknown> = {
      feature: modulo.nombre,
      modulo_id: modulo.modulo_id,
    }
    for (const plan of plans) {
      row[plan.id] = modulo.planes.includes(plan.id)
    }
    return row
  })
}

export default function Pricing({ plans }: { plans: PlanData[] }) {
  const sorted = [...plans].sort((a, b) => a.precio_mensual - b.precio_mensual)
  const total = sorted.length
  const featuredIndex = pickFeaturedIndex(sorted)
  const gridCols = Math.min(Math.max(total, 1), 4)
  const todosModulos = sorted.length > 0 ? sorted[0].modulos : []
  const comparativa = buildComparativa(sorted, todosModulos)

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
        </div>
      </header>

      {/* PLANS */}
      <section className="plans">
        <div className="container">
          {sorted.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.7 }}>
              Estamos actualizando nuestros planes. Volvé a intentar en unos minutos.
            </p>
          ) : (
            <div className="plans-grid" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
              {sorted.map((p, i) => (
                <PlanCard key={p.id} plan={p} visuals={getVisuals(p, i, total, featuredIndex)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* COMPARE */}
      {sorted.length > 0 && comparativa.length > 0 && (
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
                    {sorted.map((p, i) => (
                      <th key={p.id} className={i === featuredIndex ? 'is-featured' : ''}>
                        {p.nombre}
                        <span className="plan-head-blurb">{formatARS(p.precio_mensual)} / mes</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparativa.map((row) => (
                    <tr key={row.modulo_id as string}>
                      <td className="feature">{row.feature as string}</td>
                      {sorted.map((p, i) => (
                        <td key={p.id} data-label={p.nombre} className={i === featuredIndex ? 'is-featured' : ''}>
                          {row[p.id] === true ? <TableCheck /> : <span style={{ color: 'var(--slate)' }}>—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

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
