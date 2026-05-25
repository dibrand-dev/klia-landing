'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/landing/Nav'
import '@/app/terminos.css'

const PRIVACY_SECTIONS = [
  { id: 'responsable', num: '01', title: 'Responsable del tratamiento' },
  { id: 'datos', num: '02', title: 'Información que recopilamos' },
  { id: 'google', num: '03', title: 'Uso de datos y Google API' },
  { id: 'seguridad', num: '04', title: 'Seguridad y almacenamiento' },
  { id: 'subprocesadores', num: '04b', title: 'Subprocesadores y transferencias' },
  { id: 'ia', num: '05', title: 'Procesamiento con IA' },
  { id: 'derechos', num: '06', title: 'Derechos del usuario (Ley 25.326)' },
]

interface PrivacyTocProps {
  active: string
}

const PrivacyToc = ({ active }: PrivacyTocProps) => (
  <aside className="terms-toc">
    <div className="terms-toc-eyebrow">Índice del documento</div>
    <ul className="terms-toc-list">
      {PRIVACY_SECTIONS.map((s) => (
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
        Ejercer mis derechos
      </a>
      <a className="terms-toc-cta" href="/terminos">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Términos y Condiciones
      </a>
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

export default function PrivacidadPage() {
  const [active, setActive] = useState('responsable')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 600)
      let current = PRIVACY_SECTIONS[0].id
      for (const s of PRIVACY_SECTIONS) {
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
            <h1>Política de <span className="serif-it">privacidad</span>.</h1>
            <p className="terms-hero-lead">
              Cómo cuidamos los datos clínicos de tus pacientes y los tuyos. Sin trucos, sin venta a terceros, con cifrado a nivel base de datos.
            </p>
            <div className="terms-hero-meta">
              <span>Versión<strong>v2.0</strong></span>
              <span>Vigente desde<strong>1 de mayo 2026</strong></span>
              <span>Ley aplicable<strong>25.326 · Argentina</strong></span>
            </div>
          </div>

          {/* Resumen de Privacidad */}
          <div className="terms-tldr">
            <div className="terms-tldr-head">
              <div>
                <div className="terms-tldr-eyebrow">Resumen de privacidad</div>
                <h2 className="terms-tldr-title">Tres promesas <span className="serif-it">en una línea</span>.</h2>
              </div>
              <div className="terms-tldr-time">~ 5 min de lectura</div>
            </div>
            <div className="terms-tldr-grid">
              <div className="terms-tldr-item">
                <div className="terms-tldr-ico" style={{ background: '#E8ECF8', color: '#3F519E' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                </div>
                <div className="terms-tldr-num">01 · No vendemos</div>
                <h3 className="terms-tldr-h">No vendemos tus datos.</h3>
                <p className="terms-tldr-p">
                  Nunca. Ni a redes publicitarias, ni a entrenadores de modelos, ni a obras sociales. Tus datos son tuyos y de tu paciente, punto.
                </p>
              </div>
              <div className="terms-tldr-item">
                <div className="terms-tldr-ico" style={{ background: '#E5F5EC', color: '#3D9C6B' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div className="terms-tldr-num">02 · No leemos tu mail</div>
                <h3 className="terms-tldr-h">No accedemos a tu correo Google.</h3>
                <p className="terms-tldr-p">
                  La integración solo lee eventos de tu calendario para sincronizar turnos. Cumple la política de Uso Limitado de Google.
                </p>
              </div>
              <div className="terms-tldr-item">
                <div className="terms-tldr-ico" style={{ background: '#FFE9E5', color: '#E55A45' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                </div>
                <div className="terms-tldr-num">03 · Cifrado</div>
                <h3 className="terms-tldr-h">Historias clínicas cifradas.</h3>
                <p className="terms-tldr-p">
                  Cada profesional ve sólo lo suyo. Aislamiento garantizado a nivel base de datos con Row Level Security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="terms-body">
        <div className="max-w-container mx-auto px-7">
          <div className="terms-layout">
            <PrivacyToc active={active} />

            <article className="terms-content">
              {/* Transparencia técnica */}
              <div className="terms-section" style={{ paddingBottom: 32 }}>
                <span className="terms-section-num">Transparencia técnica</span>
                <h2 style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.15, color: 'var(--ink)', margin: '0 0 18px' }}>
                  Las garantías técnicas, en chips.
                </h2>

                <div className="transparency">
                  <div className="transparency-item">
                    <div className="transparency-ico">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <span className="transparency-tag">SSL · TLS 1.3</span>
                    <h3 className="transparency-h">Conexión segura</h3>
                    <p className="transparency-p">Todo el tráfico viaja cifrado entre tu dispositivo y nuestros servidores.</p>
                  </div>
                  <div className="transparency-item">
                    <div className="transparency-ico">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                    </div>
                    <span className="transparency-tag">Supabase · RLS</span>
                    <h3 className="transparency-h">Base de datos cifrada</h3>
                    <p className="transparency-p">Row Level Security garantiza que sólo accedas a tus pacientes, a nivel motor.</p>
                  </div>
                  <div className="transparency-item">
                    <div className="transparency-ico">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span className="transparency-tag">Google API · Limited Use</span>
                    <h3 className="transparency-h">Cumplimiento Google</h3>
                    <p className="transparency-p">Acceso restringido a Calendar y prohibición de uso para publicidad o entrenamiento de IA.</p>
                  </div>
                </div>
              </div>

              <Section id="responsable" num="01" title="Responsable del tratamiento">
                <p>
                  El responsable del tratamiento de sus datos personales es <strong>Norberto Patricio Riccitelli</strong>, Monotributista, en su carácter de operador de la plataforma Klia.
                </p>

                <div className="terms-identity">
                  <div className="terms-identity-row">
                    <div className="terms-identity-label">Titular</div>
                    <div className="terms-identity-value">Norberto Patricio Riccitelli</div>
                  </div>
                  <div className="terms-identity-row">
                    <div className="terms-identity-label">Domicilio</div>
                    <div className="terms-identity-value">Avenida de los Lagos 100, Puertos, Araucarias 129, Belén de Escobar, Buenos Aires, Argentina</div>
                  </div>
                  <div className="terms-identity-row">
                    <div className="terms-identity-label">Contacto</div>
                    <div className="terms-identity-value"><a href="mailto:legal@klia.com.ar">legal@klia.com.ar</a></div>
                  </div>
                </div>

                <div className="terms-identity" style={{ marginTop: 24 }}>
                  <div className="terms-identity-row">
                    <div className="terms-identity-label">Registro AAIP</div>
                    <div className="terms-identity-value">EX-2026-51700917--APN-DNPDP#AAIP</div>
                  </div>
                </div>
                <p>
                  Base de datos inscripta ante la Agencia de Acceso a la Información Pública conforme al artículo 21 de la Ley 25.326.
                </p>

                <p>
                  Para consultas relacionadas con la privacidad, ejercicio de derechos o cualquier inquietud sobre el tratamiento de datos, escribinos al correo arriba indicado. Respondemos en un plazo máximo de 10 días hábiles.
                </p>
              </Section>

              <Section id="datos" num="02" title="Información que recopilamos">
                <p>
                  Klia recopila los siguientes tipos de datos, exclusivamente con la finalidad de prestar el servicio contratado:
                </p>

                <h3>Datos del profesional</h3>
                <ul>
                  <li>Nombre y apellido, email profesional y número de teléfono.</li>
                  <li>CUIT y matrícula profesional habilitante.</li>
                  <li>Imagen de firma y sello digitales, cargada voluntariamente para los documentos generados.</li>
                  <li>Datos de facturación y de Mercado Pago necesarios para procesar la suscripción.</li>
                </ul>

                <h3>Datos del paciente</h3>
                <ul>
                  <li>Datos identificatorios: nombre, DNI, fecha de nacimiento, obra social.</li>
                  <li>Notas de evolución clínica cargadas por el profesional tratante.</li>
                  <li>Archivos adjuntos: fotos de producciones terapéuticas, tests o dibujos vinculados a la historia clínica.</li>
                </ul>

                <h3>Datos de Google (opcional)</h3>
                <ul>
                  <li>Dirección de correo electrónico, utilizada únicamente como mecanismo de autenticación.</li>
                  <li>Eventos del calendario, utilizados únicamente para sincronizar la agenda de turnos.</li>
                </ul>

                <div className="terms-callout">
                  <span className="terms-callout-ico">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r=".5" fill="currentColor"/></svg>
                  </span>
                  <span>
                    La vinculación con Google es <strong>siempre opcional</strong>. Klia funciona en su totalidad sin esa integración: simplemente no habrá sincronización de calendario.
                  </span>
                </div>
              </Section>

              <Section id="google" num="03" title="Uso de los datos y Google API Limited Use">
                <p>
                  Klia cumple estrictamente con la <strong>Política de Datos de Usuario de los Servicios de API de Google</strong>, incluidos los requisitos específicos de <strong>Uso Limitado</strong>.
                </p>

                <h3>Finalidad del acceso</h3>
                <p>
                  Los datos obtenidos de Google Calendar se utilizan exclusivamente para la <strong>sincronización bidireccional de la agenda del profesional</strong> dentro de Klia. Ningún otro flujo, módulo o feature de la plataforma consume estos datos.
                </p>

                <h3>Prohibición de transferencia y uso</h3>
                <p>Klia <strong>no</strong>, bajo ninguna circunstancia:</p>
                <ul>
                  <li>Transfiere datos de Google a terceros, excepto cuando sea estrictamente necesario para proveer la funcionalidad o cuando lo exija la ley.</li>
                  <li>Vende datos de Google ni los expone a redes publicitarias.</li>
                  <li>Utiliza datos de Google para publicidad, mercadeo o para entrenar modelos de IA propios o de terceros.</li>
                  <li>Permite que humanos lean datos de Google, salvo: con consentimiento explícito del usuario, por seguridad, para cumplir la ley, o para operaciones internas con datos previamente agregados y anonimizados.</li>
                </ul>

                <p>
                  El usuario puede revocar el acceso a Google en cualquier momento desde su panel de configuración o desde la página de permisos de su cuenta Google.
                </p>
              </Section>

              <Section id="seguridad" num="04" title="Seguridad y almacenamiento">
                <p>
                  Toda la información sensible se almacena en <strong>Supabase</strong>, sobre infraestructura ubicada en regiones con estándares equivalentes o superiores a los exigidos por la legislación argentina.
                </p>

                <h3>Aislamiento por profesional</h3>
                <p>
                  Las bases de datos utilizan <strong>Row Level Security (RLS)</strong>: cada consulta SQL valida automáticamente que el solicitante sea el propietario de la fila. Esto significa que, aunque hubiera un error en la capa de aplicación, el motor de base de datos seguiría impidiendo el acceso cruzado entre profesionales.
                </p>

                <h3>Archivos adjuntos</h3>
                <p>
                  Las fotos de firmas, sellos y producciones de pacientes se guardan en <strong>buckets de Storage privados</strong>, con URLs firmadas de corta duración. El acceso queda restringido únicamente al profesional titular de la cuenta.
                </p>

                <h3>Cifrado en tránsito y en reposo</h3>
                <p>
                  Todo el tráfico viaja sobre TLS 1.2 o superior. Los datos en reposo están cifrados a nivel disco. Las contraseñas se almacenan con algoritmos de hash de un solo sentido (bcrypt) y nunca en texto plano.
                </p>
              </Section>

              <Section id="subprocesadores" num="04b" title="Subprocesadores y transferencias internacionales">
                <p>
                  Klia utiliza los siguientes proveedores externos que procesan datos personales fuera de Argentina, todos con políticas de privacidad y niveles de protección adecuados:
                </p>
                <ul>
                  <li><strong>Supabase Inc.</strong> (Estados Unidos) — almacenamiento de base de datos y archivos. Política: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">supabase.com/privacy</a></li>
                  <li><strong>Vercel Inc.</strong> (Estados Unidos) — infraestructura de hosting y CDN. Política: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a></li>
                  <li><strong>Brevo SAS</strong> (Francia / Unión Europea) — envío de emails transaccionales. Política: <a href="https://www.brevo.com/legal/privacypolicy" target="_blank" rel="noopener noreferrer">brevo.com/legal/privacypolicy</a></li>
                  <li><strong>Google LLC</strong> (Estados Unidos) — autenticación OAuth y sincronización de calendario. Política: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a></li>
                  <li><strong>Mercado Pago S.A.</strong> (Argentina / Brasil) — procesamiento de pagos. Política: <a href="https://www.mercadopago.com.ar/privacidad" target="_blank" rel="noopener noreferrer">mercadopago.com.ar/privacidad</a></li>
                </ul>
                <p>
                  Estas transferencias se realizan conforme al artículo 12 de la Ley 25.326, hacia países u organismos con niveles de protección adecuados.
                </p>
              </Section>

              <Section id="ia" num="05" title="Procesamiento con Inteligencia Artificial">
                <p>
                  Para los suscriptores del <strong>Plan Premium</strong>, las notas clínicas pueden ser procesadas por las APIs de <strong>Anthropic</strong> (Claude) o <strong>Google Gemini</strong> con la única finalidad de generar borradores de informes profesionales.
                </p>

                <h3>Procesamiento transaccional y efímero</h3>
                <p>
                  Klia <strong>no utiliza estos datos para mejorar los modelos</strong> de lenguaje de estos proveedores. El procesamiento es transaccional: la nota se envía, el borrador se genera, y los proveedores no retienen el contenido para fines de entrenamiento, conforme a sus respectivos acuerdos de procesamiento de datos con Klia.
                </p>

                <h3>Control del profesional</h3>
                <p>
                  El uso de IA es opcional dentro del plan: si el profesional prefiere no enviar notas clínicas a proveedores externos, puede desactivarlo desde sus preferencias y seguir utilizando el resto de la plataforma sin restricciones.
                </p>

                <div className="terms-callout">
                  <span className="terms-callout-ico">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </span>
                  <span>
                    Recordatorio clínico: los borradores generados son siempre <strong>responsabilidad del profesional</strong>, quien debe revisarlos y validarlos antes de firmar.
                  </span>
                </div>
              </Section>

              <Section id="derechos" num="06" title="Derechos del usuario (Ley 25.326)">
                <p>
                  De acuerdo con la <strong>Ley 25.326 de Protección de Datos Personales</strong> de la República Argentina, los usuarios pueden ejercer en cualquier momento los siguientes derechos sobre sus datos:
                </p>

                <ul>
                  <li><strong>Acceso</strong> — conocer qué datos personales tratamos sobre vos.</li>
                  <li><strong>Rectificación</strong> — corregir datos inexactos o incompletos.</li>
                  <li><strong>Actualización</strong> — incorporar datos que hayan cambiado.</li>
                  <li><strong>Supresión</strong> — solicitar la eliminación de tus datos cuando no exista una obligación legal de conservarlos.</li>
                  <li><strong>Portabilidad</strong> — recibir una copia exportable de tus datos clínicos.</li>
                </ul>

                <p>
                  Para ejercer cualquiera de estos derechos, enviá un correo a <a href="mailto:legal@klia.com.ar">legal@klia.com.ar</a> desde la dirección registrada en tu cuenta. Respondemos en un plazo máximo de 10 días hábiles, conforme a lo previsto por la normativa.
                </p>
                <h3>Plazos de conservación de datos</h3>
                <p>
                  Conforme al artículo 4° inciso 7 de la Ley 25.326, los datos se conservan por los siguientes plazos:
                </p>
                <ul>
                  <li><strong>Datos clínicos de pacientes</strong> (historias, notas de evolución): 5 años desde la cancelación de la cuenta del profesional.</li>
                  <li><strong>Datos de cuenta del profesional</strong> (perfil, configuración): 2 años desde la cancelación.</li>
                  <li><strong>Datos de pagos y facturación</strong>: 5 años desde la transacción (obligación impositiva AFIP).</li>
                  <li><strong>Backups</strong>: eliminación completa a los 90 días posteriores al vencimiento del período de retención correspondiente.</li>
                </ul>
                <p>
                  Al cancelar su cuenta, el profesional recibirá un aviso para exportar sus datos clínicos antes del cierre definitivo. Transcurrido el plazo de retención, los datos serán eliminados de forma permanente e irrecuperable.
                </p>

                <p>
                  El órgano de control en Argentina es la <strong>Agencia de Acceso a la Información Pública</strong>, ante quien podés presentar un reclamo si considerás que tu solicitud no fue atendida adecuadamente.
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
