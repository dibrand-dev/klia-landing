import { Clock, Shield, Bolt, Brain, Phone, Lock } from '@/components/ui/Icons'

const BENEFITS = [
  { Icon: Clock,  title: 'Recuperá horas cada semana',
    body: 'Automatizamos la facturación y la redacción de borradores técnicos.' },
  { Icon: Shield, title: 'Cumplimiento sin fricción',
    body: 'Facturación ARCA integrada y backups encriptados según Ley 25.326.' },
  { Icon: Bolt,   title: 'Cobrá en el momento',
    body: 'La sesión se cierra con el pago acreditado en tu cuenta de Mercado Pago.' },
  { Icon: Brain,  title: 'IA entrenada para salud',
    body: 'Informes generados con un modelo afinado en lenguaje técnico-clínico, no genérico.' },
  { Icon: Phone,  title: '100% desde el teléfono',
    body: 'Pensado mobile-first. Andá del consultorio al kiosko sin perder un cobro ni un turno.' },
  { Icon: Lock,   title: 'Tus datos, tu control',
    body: 'Cifrado en reposo y en tránsito. Cumplimos con la Ley 25.326 de Protección de Datos Personales.' },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="py-32 bg-white">
      <div className="max-w-container mx-auto px-7">
        <div className="mb-16 max-w-2xl">
          <div className="eyebrow mb-4 reveal">Beneficios</div>
          <h2 className="h-2 reveal reveal-d1" style={{ color: '#0E1430', maxWidth: '18ch' }}>
            Construido para devolverte{' '}
            <span className="serif-it" style={{ color: '#3F519E' }}>tiempo</span> y certezas.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map(({ Icon, title, body }, i) => (
            <div
              key={i}
              className="card p-8 reveal group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6 bg-klia-50 text-klia transition-transform group-hover:scale-105 group-hover:-rotate-2"
                style={{ width: 52, height: 52, background: '#F4F6FC', color: '#3F519E' }}>
                <Icon size={22} />
              </div>
              <div className="h-3 mb-2" style={{ color: '#0E1430' }}>{title}</div>
              <div className="text-slate text-sm leading-relaxed">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
