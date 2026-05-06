import { ArrowRight } from '@/components/ui/Icons'

const CASES = [
  {
    tag: 'Psicología',
    title: 'Consultorios particulares',
    body: 'Liberá la última hora del día: las notas se redactan solas y la facturación se dispara al cerrar la sesión.',
    stat: { v: '4,2 hs', l: 'ahorradas por semana' },
    accent: '#3F519E',
    tagBg: '#E8ECF8',
  },
  {
    tag: 'Kinesiología',
    title: 'Práctica multi-paciente',
    body: 'Gestioná 30+ pacientes por día con cobros por QR, recordatorios automáticos y reportes mensuales listos.',
    stat: { v: '92%', l: 'tasa de cobro en el día' },
    accent: '#3D9C6B',
    tagBg: '#D5EFDF',
  },
  {
    tag: 'Clínicas',
    title: 'Equipos multi-profesional',
    body: 'Roles, agendas compartidas y reportes consolidados. Cada profesional con su espacio, la clínica con visibilidad total.',
    stat: { v: '+30%', l: 'capacidad gestionada' },
    accent: '#E55A45',
    tagBg: '#FFD3CC',
  },
  {
    tag: 'Nutrición & coaching',
    title: 'Sesiones a distancia',
    body: 'Link de pago directo por WhatsApp, plan terapéutico digital y seguimiento entre sesiones sin papeleo.',
    stat: { v: '0', l: 'sesiones perdidas por cobro' },
    accent: '#C98A2C',
    tagBg: '#FFF1D6',
  },
]

export default function Cases() {
  return (
    <section id="casos" className="py-32" style={{ background: '#FBFAF7' }}>
      <div className="max-w-container mx-auto px-7">
        <div className="mb-20 max-w-2xl">
          <div className="eyebrow mb-4 reveal">Casos de uso</div>
          <h2 className="h-2 reveal reveal-d1" style={{ color: '#0E1430', maxWidth: '20ch' }}>
            Una herramienta para cada especialidad.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CASES.map((c, i) => (
            <div
              key={i}
              className="card p-9 flex flex-col reveal group relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Hover glow */}
              <div
                className="absolute w-60 h-60 rounded-full -top-20 -right-20 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ background: c.accent, filter: 'blur(80px)' }}
              />

              <div
                className="tag inline-flex mb-5"
                style={{ background: c.tagBg, color: c.accent, borderColor: `${c.accent}33` }}
              >
                {c.tag}
              </div>

              <div className="h-3 mb-2.5" style={{ color: '#0E1430' }}>{c.title}</div>
              <p className="text-slate text-sm leading-relaxed mb-7 flex-1">{c.body}</p>

              <div className="border-t border-dashed border-line pt-6">
                <div className="flex items-baseline gap-3">
                  <span
                    className="h-display"
                    style={{ fontSize: 38, fontWeight: 600, color: c.accent, letterSpacing: '-0.02em' }}
                  >
                    {c.stat.v}
                  </span>
                  <span className="text-slate text-xs max-w-[18ch]">{c.stat.l}</span>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-medium mt-5 hover:gap-3.5 transition-all"
                style={{ color: c.accent }}
              >
                Ver caso completo <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
