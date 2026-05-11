'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/landing/Nav'
import '@/app/terminos.css'

const SECTIONS = [
  { id: 'identidad', num: '01', title: 'Identidad y responsabilidad legal' },
  { id: 'servicio', num: '02', title: 'Descripción del servicio' },
  { id: 'pagos', num: '03', title: 'Suscripciones, pagos y bloqueos' },
  { id: 'ia', num: '04', title: 'Responsabilidad profesional y uso de IA' },
  { id: 'integraciones', num: '05', title: 'Integraciones de terceros y datos de Google' },
  { id: 'datos', num: '06', title: 'Protección de datos (Ley 25.326)' },
  { id: 'jurisdiccion', num: '07', title: 'Jurisdicción' },
]

interface TldrItemProps {
  num: string
  title: string
  color: { bg: string; fg: string }
  icon: React.ReactNode
  children: string
}

const TldrItem = ({ num, title, color, icon, children }: TldrItemProps) => (
  <div className="terms-tldr-item">
    <div className="terms-tldr-ico" style={{ background: color.bg, color: color.fg }}>{icon}</div>
    <div className="terms-tldr-num">{num}</div>
    <h3 className="terms-tldr-h">{title}</h3>
    <p className="terms-tldr-p">{children}</p>
  </div>
)

interface TermsTocProps {
  active: string
}

const TermsToc = ({ active }: TermsTocProps) => (
  <aside className="terms-toc">
    <div className="terms-toc-eyebrow">Índice del documento</div>
    <ul className="terms-toc-list">
      {SECTIONS.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            className={`terms-toc-link ${active === s.id ? 'is-active' : ''}`}
          >
            <span className="terms-toc-num">{s.num}</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ul>
    <div className="terms-toc-foot">
      <a className="terms-toc-cta" href="mailto:legal@klia.com.ar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
        legal@klia.com.ar
      </a>
      <button className="terms-toc-cta" onClick={() => window.print()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
        Descargar PDF
      </button>
    </div>
  </aside>
)

interface SectionProps {
  id: string
  num: string
  title: string
  children: React.ReactNode
}

const Section = ({ id, num, title, children }: SectionProps) => (
  <section id={id} className="terms-section">
    <span className="terms-section-num">Sección {num}</span>
    <h2>{title}</h2>
    {children}
  </section>
)

export default function TerminosPage() {
  const [active, setActive] = useState('identidad')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600)
      let current = SECTIONS[0].id
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 140) current = s.id
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="terms-shell">
      <Nav />
      <header className="terms-hero" style={{ marginTop: '80px' }}>
        <div className="max-w-container mx-auto px-7">
          <div className="terms-hero-inner">
            <div className="eyebrow">Documento legal · Klia</div>
            <h1>Términos y <span className="serif-it">condiciones</span> de uso.</h1>
            <p className="terms-hero-lead">
              Las reglas claras de cómo funciona Klia: qué hacemos, qué hacés vos, y cómo cuidamos los datos clínicos de tus pacientes. Sin letra chica.
            </p>
            <div className="terms-hero-meta">
              <span>Versión<strong>v2.0</strong></span>
              <span>Vigente desde<strong>1 de mayo 2026</strong></span>
              <span>Jurisdicción<strong>Buenos Aires, Argentina</strong></span>
            </div>
          </div>

          {/* Resumen para humanos */}
          <div className="terms-tldr">
            <div className="terms-tldr-head">
              <div>
                <div className="terms-tldr-eyebrow">Resumen para humanos</div>
                <h2 className="terms-tldr-title">Lo importante en <span className="serif-it">tres puntos</span>.</h2>
              </div>
              <div className="terms-tldr-time">~ 6 min de lectura</div>
            </div>
            <div className="terms-tldr-grid">
              <TldrItem
                num="01 · Privacidad"
                title="Tus datos son tuyos."
                color={{ bg: '#E8ECF8', fg: '#3F519E' }}
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
              >
                Las historias clínicas se guardan con cifrado y aislamiento por profesional (RLS). Cumplimos la Ley 25.326 y no vendemos datos a terceros.
              </TldrItem>
              <TldrItem
                num="02 · Pagos"
                title="21 días gratis, sin tarjeta."
                color={{ bg: '#E5F5EC', fg: '#3D9C6B' }}
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
              >
                Probás Klia Premium 21 días. Después elegís plan y pagás por Mercado Pago. Si no pagás, la cuenta se bloquea hasta regularizar.
              </TldrItem>
              <TldrItem
                num="03 · Responsabilidad"
                title="La IA escribe, vos validás."
                color={{ bg: '#FFE9E5', fg: '#E55A45' }}
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>}
              >
                Klia es una herramienta de soporte. Los informes generados con IA son borradores: revisás, editás y firmás vos como profesional.
              </TldrItem>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="terms-body">
        <div className="max-w-container mx-auto px-7">
          <div className="terms-layout">
            <TermsToc active={active} />

            <article className="terms-content">
              <Section id="identidad" num="01" title="Identidad y responsabilidad legal">
                <p>
                  El sitio web <strong>klia.com.ar</strong> y la plataforma <strong>app.klia.com.ar</strong> son operados por Norberto Patricio Riccitelli, bajo el régimen de Monotributo de la República Argentina.
                </p>

                <div className="terms-identity">
                  <div className="terms-identity-row">
                    <div className="terms-identity-label">Titular</div>
                    <div className="terms-identity-value">Norberto Patricio Riccitelli</div>
                  </div>
                  <div className="terms-identity-row">
                    <div className="terms-identity-label">Condición fiscal</div>
                    <div className="terms-identity-value">Monotributista</div>
                  </div>
                  <div className="terms-identity-row">
                    <div className="terms-identity-label">Domicilio legal</div>
                    <div className="terms-identity-value">Avenida de los Lagos 100, Puertos, Araucarias 129, Belén de Escobar, Buenos Aires, Argentina</div>
                  </div>
                  <div className="terms-identity-row">
                    <div className="terms-identity-label">Contacto legal</div>
                    <div className="terms-identity-value"><a href="mailto:legal@klia.com.ar">legal@klia.com.ar</a></div>
                  </div>
                </div>

                <p>
                  Al utilizar Klia aceptás expresamente estos Términos. Si no estás de acuerdo con alguna de las cláusulas, te pedimos no utilizar el servicio.
                </p>
              </Section>

              <Section id="servicio" num="02" title="Descripción del servicio">
                <p>
                  Klia es un software bajo la modalidad <strong>SaaS (Software as a Service)</strong> diseñado para la gestión de consultorios de salud en Argentina. Se accede en forma remota desde dispositivos móviles y de escritorio, sin instalación local.
                </p>
                <p>Las funcionalidades disponibles, según el plan contratado, incluyen:</p>
                <ul>
                  <li>Gestión de turnos y agenda profesional.</li>
                  <li>Historia clínica digital con notas evolutivas.</li>
                  <li>Facturación electrónica con ARCA (factura C y monotributo).</li>
                  <li>Liquidación de obras sociales y prepagas.</li>
                  <li>Generación asistida de informes mediante Inteligencia Artificial.</li>
                  <li>Cobros electrónicos integrados con Mercado Pago.</li>
                </ul>
                <p>
                  Klia puede agregar, modificar o discontinuar funcionalidades para mejorar el servicio, comunicándolo con razonable anticipación a través de la plataforma o por correo electrónico.
                </p>
              </Section>

              <Section id="pagos" num="03" title="Suscripciones, pagos y bloqueos">
                <h3>Periodo de prueba</h3>
                <p>
                  El registro otorga <strong>21 días de prueba gratuita</strong> del Plan Premium completo. <strong>No se requiere tarjeta de crédito</strong> para iniciar este periodo, ni se realizan cobros automáticos al finalizarlo.
                </p>

                <h3>Planes disponibles</h3>
                <p>Klia ofrece tres niveles de suscripción, con modalidad de pago mensual o anual:</p>
                <ul>
                  <li><strong>Esencial</strong> — agenda, pacientes y facturación básica.</li>
                  <li><strong>Profesional</strong> — incluye obras sociales, cobros y reportes.</li>
                  <li><strong>Premium</strong> — incluye informes con IA y multi-profesional.</li>
                </ul>

                <h3>Procesamiento de pagos</h3>
                <p>
                  Los pagos se procesan exclusivamente vía <strong>Mercado Pago Checkout Bricks</strong>, integrado dentro de la plataforma. Klia no almacena datos de tarjetas de crédito o débito en sus servidores; esa información queda bajo custodia de Mercado Pago.
                </p>

                <h3>Mora e incumplimiento</h3>
                <div className="terms-callout">
                  <span className="terms-callout-ico">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>
                  </span>
                  <span>
                    Ante la falta de pago al vencimiento del periodo contratado, <strong>el acceso a la cuenta se bloqueará automáticamente sin periodo de gracia</strong>. Los datos permanecen almacenados durante 90 días para permitir la regularización; pasado ese plazo podrán ser eliminados.
                  </span>
                </div>
              </Section>

              <Section id="ia" num="04" title="Responsabilidad profesional y uso de IA">
                <h3>Criterio clínico</h3>
                <p>
                  Klia es una <strong>herramienta de soporte</strong>: no reemplaza al profesional ni emite diagnósticos. El profesional es el único responsable de los diagnósticos, tratamientos, evoluciones y cualquier información clínica cargada en la plataforma.
                </p>

                <h3>Informes generados con IA</h3>
                <p>
                  Los informes producidos mediante las APIs de <strong>Anthropic</strong> y <strong>Google Gemini</strong> son <strong>borradores técnicos</strong>. Es obligación ineludible del profesional revisar, editar y validar dicho contenido antes de su firma y entrega al paciente, obra social u otra parte.
                </p>
                <p>
                  Klia no se responsabiliza por errores, omisiones o interpretaciones derivadas del uso directo de borradores sin la revisión humana correspondiente.
                </p>

                <h3>Firma digital y sello</h3>
                <p>
                  El profesional declara y garantiza que la imagen de su firma y sello cargada en el sistema es fidedigna y lo vincula legalmente en los documentos generados a través de Klia. La custodia y uso de estas credenciales es exclusiva responsabilidad del titular de la cuenta.
                </p>
              </Section>

              <Section id="integraciones" num="05" title="Integraciones de terceros y datos de Google">
                <h3>Google Calendar</h3>
                <p>
                  Klia accede a datos del calendario del profesional <strong>únicamente para la sincronización bidireccional de turnos</strong>. La aplicación cumple con la política de <strong>Uso Limitado de Google</strong>: no vende, transfiere ni utiliza estos datos para fines publicitarios, modelos de IA ni cualquier otro propósito ajeno a la funcionalidad descripta.
                </p>

                <h3>ARCA / AFIP</h3>
                <p>
                  La emisión de facturas electrónicas depende de la disponibilidad del servicio de la API de ARCA. Klia no es responsable por demoras o interrupciones generadas por la indisponibilidad técnica del organismo fiscal.
                </p>

                <h3>Mercado Pago</h3>
                <p>
                  Los cobros son procesados por Mercado Pago bajo sus propios términos y condiciones. La acreditación de fondos, comisiones y plazos están sujetos a las políticas de dicho proveedor.
                </p>
              </Section>

              <Section id="datos" num="06" title="Protección de datos (Ley 25.326)">
                <p>
                  Klia actúa como <strong>encargado del tratamiento de datos</strong> en los términos de la Ley Nacional 25.326 de Protección de los Datos Personales. El profesional, titular de la cuenta, es el responsable del tratamiento de los datos de sus pacientes.
                </p>
                <p>
                  Toda la información clínica se almacena de forma privada mediante <strong>Row Level Security (RLS)</strong> en Supabase, lo que garantiza a nivel de base de datos que cada profesional sea el único con acceso a la información de sus pacientes. Las comunicaciones se realizan sobre canales cifrados (TLS 1.2 o superior).
                </p>
                <p>
                  El titular de los datos puede ejercer sus derechos de acceso, rectificación, actualización y supresión escribiendo a <a href="mailto:legal@klia.com.ar">legal@klia.com.ar</a>.
                </p>
              </Section>

              <Section id="jurisdiccion" num="07" title="Jurisdicción">
                <p>
                  Para cualquier controversia derivada de la interpretación, ejecución o cumplimiento de estos Términos, las partes se someten a la jurisdicción de los <strong>Tribunales Ordinarios de la Provincia de Buenos Aires</strong>, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponder.
                </p>
                <p>
                  La legislación aplicable es la de la República Argentina.
                </p>
              </Section>

              <div className="terms-doc-foot">
                <div>Versión 2.0 · Vigente desde 01/05/2026</div>
                <div>¿Dudas? Escribinos a <a href="mailto:legal@klia.com.ar">legal@klia.com.ar</a></div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <button
        className={`back-top ${showTop ? 'is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
      </button>
    </div>
  )
}
