import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import { Icons } from '@/components/Icons'
import './recordatorios.css'

export const metadata: Metadata = {
  title: 'Recordatorios de turnos por WhatsApp · KLIA',
  description: 'Recordatorios automáticos de turnos por WhatsApp y correo para profesionales de la salud. La evidencia clínica muestra que los recordatorios por WhatsApp y las llamadas automáticas reducen entre un 20 % y un 25 % las inasistencias.',
  alternates: { canonical: 'https://www.klia.com.ar/recordatorios' },
  openGraph: {
    url: 'https://www.klia.com.ar/recordatorios',
    title: 'Recordatorios de turnos por WhatsApp · KLIA',
    description: 'Recordatorios automáticos de turnos por WhatsApp y correo para profesionales de la salud. La evidencia clínica muestra que los recordatorios por WhatsApp y las llamadas automáticas reducen entre un 20 % y un 25 % las inasistencias.',
  },
}

const FAQ_ITEMS = [
  {
    q: '¿Los recordatorios por WhatsApp reducen las inasistencias a turnos médicos?',
    a: 'Sí. La evidencia clínica muestra que los recordatorios por WhatsApp y las llamadas automáticas reducen entre un 20 % y un 25 % las inasistencias. Un estudio en el sistema público de salud de Buenos Aires (2026, sobre 475.214 primeros turnos) registró una reducción relativa de aproximadamente 24 % con un recordatorio 24 horas antes, y un ensayo aleatorizado publicado en Am J Med (2010) encontró una reducción de 23,1 % a 17,3 % con un recordatorio automático.',
  },
  {
    q: '¿Cómo funcionan los recordatorios de turnos en KLIA?',
    a: 'KLIA envía un recordatorio automático 24 horas antes de cada turno por WhatsApp y correo, desde un número verificado de KLIA, sin que el profesional tenga que configurar nada. El paciente puede confirmar o cancelar directamente desde el mensaje, lo que le da tiempo al profesional para reasignar el horario.',
  },
  {
    q: '¿Cuántos recordatorios incluye cada plan?',
    a: 'El plan Esencial incluye 30 recordatorios mensuales, el Profesional 100 y el Premium 150. El período de prueba gratuita de 21 días incluye 30 mensajes para evaluar el módulo con pacientes reales.',
  },
  {
    q: '¿El paciente debe dar su consentimiento para recibir mensajes por WhatsApp?',
    a: 'Sí. KLIA solo envía recordatorios por WhatsApp a pacientes que dieron su consentimiento explícito. Si no hay consentimiento registrado, el recordatorio se envía únicamente por correo electrónico.',
  },
]

export default function RecordatoriosPage() {
  return (
    <>
      <Nav />
      <main className="recordatorios-page">
        <section className="rec-hero">
          <div className="rec-grid-bg" aria-hidden />
          <div className="container">
            <div className="rec-hero-inner">
              <span className="rec-eyebrow-wrap">
                <span className="eyebrow">RECORDATORIOS · KLIA.COM.AR</span>
              </span>
              <h1 className="h-display rec-h1" style={{ color: '#0E1430' }}>
                Recordatorios de turnos por WhatsApp{' '}
                <em className="serif-it" style={{ color: 'var(--klia)' }}>para profesionales de la salud.</em>
              </h1>
              <p className="rec-lead">
                KLIA envía un recordatorio automático por WhatsApp y correo antes de cada turno. La evidencia
                clínica muestra que los recordatorios por WhatsApp y las llamadas automáticas reducen entre un
                20 % y un 25 % las inasistencias (Estudio en el sistema público de salud de Buenos Aires, 2026; Am J Med, 2010).
              </p>
            </div>
          </div>
        </section>

        <section className="rec-section">
          <div className="container">
            <h2 className="h-2 rec-section-title">Qué dice la evidencia</h2>
            <p className="rec-section-body">
              Un estudio sobre 475.214 primeros turnos en el sistema público de salud de Buenos Aires encontró
              una inasistencia base de 34,6 %. Un recordatorio por WhatsApp enviado 24 horas antes redujo la
              inasistencia en aproximadamente un 24 % relativo; dos recordatorios (72 hs y 24 hs antes) la
              redujeron en aproximadamente un 20 %. Todos los grupos con recordatorio aumentaron además las
              cancelaciones anticipadas por parte del paciente, lo que le permite al profesional reasignar el
              horario con tiempo.
            </p>
            <p className="rec-section-body">
              Un ensayo aleatorizado publicado en Am J Med (2010) encontró una inasistencia de 23,1 % en el
              grupo sin recordatorio, frente a 17,3 % en el grupo que recibió una llamada automática — una
              reducción relativa de aproximadamente 25 %.
            </p>
            <div className="rec-sources">
              <div className="rec-source">Estudio en el sistema público de salud de Buenos Aires (medRxiv, preprint, 2026).</div>
              <div className="rec-source">Am J Med, 2010 — ensayo aleatorizado sobre recordatorios automáticos de turnos.</div>
            </div>
          </div>
        </section>

        <section className="rec-section">
          <div className="container">
            <h2 className="h-2 rec-section-title">Cómo funciona</h2>
            <ul className="rec-steps">
              {[
                { icon: <Icons.Check size={16} />, title: 'Consentimiento del paciente', desc: 'Al cargar al paciente, el profesional registra si dio su consentimiento para recibir mensajes por WhatsApp.' },
                { icon: <Icons.Bell size={16} />, title: 'Recordatorio automático', desc: 'KLIA envía el recordatorio 24 horas antes del turno, por WhatsApp (con consentimiento) y por correo, desde un número verificado de KLIA.' },
                { icon: <Icons.Mail size={16} />, title: 'Confirmación o cancelación', desc: 'El paciente confirma o cancela directamente desde el mensaje, sin necesidad de llamar ni escribir al profesional.' },
                { icon: <Icons.Calendar size={16} />, title: 'Horario liberado a tiempo', desc: 'Si el paciente cancela, el profesional ve el horario libre con anticipación y puede reasignarlo.' },
              ].map((s, i) => (
                <li key={i} className="rec-step">
                  <div className="rec-step-num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="rec-step-title">{s.title}</div>
                    <div className="rec-step-desc">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rec-section">
          <div className="container">
            <h2 className="h-2 rec-section-title">Qué incluye cada plan</h2>
            <p className="rec-section-body">
              Cada plan incluye un cupo mensual de recordatorios por WhatsApp. El período de prueba gratuita
              de 21 días incluye 30 mensajes de WhatsApp para evaluar el módulo con pacientes reales.
            </p>
            <div className="rec-plans">
              <div className="rec-plan-card">
                <div className="rec-plan-name">Esencial</div>
                <div className="rec-plan-cupo">30</div>
                <div className="rec-plan-label">recordatorios / mes</div>
              </div>
              <div className="rec-plan-card featured">
                <div className="rec-plan-name">Profesional</div>
                <div className="rec-plan-cupo">100</div>
                <div className="rec-plan-label">recordatorios / mes</div>
              </div>
              <div className="rec-plan-card">
                <div className="rec-plan-name">Premium</div>
                <div className="rec-plan-cupo">150</div>
                <div className="rec-plan-label">recordatorios / mes</div>
              </div>
            </div>
          </div>
        </section>

        <section className="rec-section">
          <div className="container">
            <h2 className="h-2 rec-section-title">Consentimiento del paciente</h2>
            <p className="rec-section-body">
              KLIA solo envía recordatorios por WhatsApp a pacientes cuyo consentimiento está registrado en su ficha.
            </p>
          </div>
        </section>

        <section className="rec-section">
          <div className="container">
            <h2 className="h-2 rec-section-title">Preguntas frecuentes</h2>
            <div className="rec-faq-list">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="rec-faq-item">
                  <div className="rec-faq-q">{item.q}</div>
                  <div className="rec-faq-a">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rec-cta">
          <div className="container">
            <div className="rec-cta-inner">
              <h2 className="h-2 rec-cta-title">Probá los recordatorios con tus pacientes reales.</h2>
              <p className="rec-cta-lead">
                21 días gratis, 30 recordatorios incluidos. Sin tarjeta de crédito.
              </p>
              <div className="rec-cta-btns">
                <a href="https://app.klia.com.ar/registro" className="btn btn-coral btn-lg">
                  Empezar gratis <Icons.Arrow size={16} />
                </a>
                <a href="/precios" style={{ background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,.35)', borderRadius: 999, padding: '18px 28px', fontSize: 16, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                  Ver planes
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'KLIA', item: 'https://www.klia.com.ar' },
                  { '@type': 'ListItem', position: 2, name: 'Recordatorios', item: 'https://www.klia.com.ar/recordatorios' },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: FAQ_ITEMS.map(item => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
              },
            ],
          }),
        }}
      />
    </>
  )
}
