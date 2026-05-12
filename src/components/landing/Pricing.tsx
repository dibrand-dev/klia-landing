import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Check, ArrowRight } from '@/components/ui/Icons'
import type { Plan } from '@/types'

// Feature display labels
const FEATURE_LABELS: Record<string, string> = {
  agenda:               'Agenda y calendario',
  pacientes:            'Gestión de pacientes',
  turnos:               'Turnos y citas',
  historial_clinico:    'Historial clínico',
  objetivos_terapeuticos:'Objetivos terapéuticos',
  medicacion:           'Medicación',
  interconsultas:       'Interconsultas',
  facturacion:          'Facturación ARCA',
  informes:             'Informes con IA',
}

// Highlight plan name for visual treatment
const FEATURED_PLAN = 'Profesional'

function formatPrecio(precio: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio)
}

async function getPlanes(): Promise<Plan[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('planes')
    .select('*, plan_funcionalidades(funcionalidad)')
    .eq('es_publico', true)
    .order('precio_mensual', { ascending: true })
  return (data ?? []) as Plan[]
}

export default async function Pricing() {
  const planes = await getPlanes()

  // Fallback if DB is empty
  const displayPlans = planes.length > 0 ? planes : FALLBACK_PLANS

  return (
    <section id="precios" className="py-32 bg-white">
      <div className="max-w-container mx-auto px-7">
        <div className="mb-20 text-center">
          <div className="eyebrow mb-4 reveal" style={{ justifyContent: 'center' }}>Precios</div>
          <h2 className="h-2 reveal reveal-d1 mx-auto" style={{ color: '#0E1430', maxWidth: '35ch' }}>
            Sin permanencia. Sin sorpresas.{' '}
            <span className="serif-it" style={{ color: '#3F519E' }}>21 días gratis.</span>
          </h2>
          <p className="lead reveal reveal-d2 mx-auto mt-4 text-center">
            Empezá el trial sin tarjeta. Al vencer, elegís el plan que mejor se adapta a tu práctica.
          </p>
        </div>

        <div className={`grid gap-6 ${displayPlans.length === 3 ? 'md:grid-cols-3' : displayPlans.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-2 max-w-3xl mx-auto'}`}>
          {displayPlans.map((plan, i) => {
            const featured = plan.nombre === FEATURED_PLAN
            const features = plan.plan_funcionalidades.map((f) => f.funcionalidad)

            return (
              <div
                key={plan.id ?? i}
                className={[
                  'relative flex flex-col rounded-xl reveal',
                  featured
                    ? 'bg-ink p-8 shadow-xl-klia scale-[1.02]'
                    : 'bg-white border border-line p-8',
                ].join(' ')}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-klia text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      Más popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: featured ? 'rgba(255,255,255,.6)' : '#5A607A', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {plan.nombre}
                  </div>
                  {plan.descripcion && (
                    <p className="text-sm mb-4" style={{ color: featured ? 'rgba(255,255,255,.6)' : '#5A607A' }}>
                      {plan.descripcion}
                    </p>
                  )}
                  <div className="flex items-end gap-1">
                    <span
                      className="font-bold leading-none"
                      style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontSize: 42, letterSpacing: '-0.03em', color: featured ? '#fff' : '#0E1430' }}
                    >
                      {formatPrecio(plan.precio_mensual)}
                    </span>
                    <span className="text-sm mb-2" style={{ color: featured ? 'rgba(255,255,255,.5)' : '#5A607A' }}>/mes</span>
                  </div>
                </div>

                <ul className="flex-1 space-y-3 mb-8">
                  {features.map((key) => (
                    <li key={key} className="flex items-center gap-2.5 text-sm">
                      <Check
                        size={16}
                        className="flex-shrink-0"
                        style={{ color: featured ? '#6FCF97' : '#3F519E' }}
                      />
                      <span style={{ color: featured ? 'rgba(255,255,255,.85)' : '#2A2F4A' }}>
                        {FEATURE_LABELS[key] ?? key}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/registro"
                  className={[
                    'btn justify-center text-center',
                    featured ? 'btn-coral' : 'btn-ghost',
                  ].join(' ')}
                >
                  Empezar gratis <ArrowRight size={14} />
                </Link>
              </div>
            )
          })}
        </div>

        <p className="text-center text-sm text-slate mt-10 reveal">
          ¿Tenés una clínica o equipo grande?{' '}
          <a href="mailto:hola@klia.com.ar" className="text-klia font-medium hover:underline">
            Hablemos y armamos un plan a medida.
          </a>
        </p>
      </div>
    </section>
  )
}

// Shown while DB has no public plans yet
const FALLBACK_PLANS: Plan[] = [
  {
    id: 'esencial',
    nombre: 'Esencial',
    descripcion: 'Para profesionales que recién formalizan su práctica.',
    precio_mensual: 9900,
    es_publico: true,
    es_ilimitado: false,
    plan_funcionalidades: [
      { funcionalidad: 'agenda' },
      { funcionalidad: 'pacientes' },
      { funcionalidad: 'turnos' },
      { funcionalidad: 'historial_clinico' },
    ],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    descripcion: 'El plan completo para el profesional independiente.',
    precio_mensual: 14900,
    es_publico: true,
    es_ilimitado: false,
    plan_funcionalidades: [
      { funcionalidad: 'agenda' },
      { funcionalidad: 'pacientes' },
      { funcionalidad: 'turnos' },
      { funcionalidad: 'historial_clinico' },
      { funcionalidad: 'facturacion' },
      { funcionalidad: 'informes' },
    ],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    descripcion: 'Para clínicas y equipos multi-profesional.',
    precio_mensual: 24900,
    es_publico: true,
    es_ilimitado: false,
    plan_funcionalidades: [
      { funcionalidad: 'agenda' },
      { funcionalidad: 'pacientes' },
      { funcionalidad: 'turnos' },
      { funcionalidad: 'historial_clinico' },
      { funcionalidad: 'objetivos_terapeuticos' },
      { funcionalidad: 'medicacion' },
      { funcionalidad: 'interconsultas' },
      { funcionalidad: 'facturacion' },
      { funcionalidad: 'informes' },
    ],
  },
]
