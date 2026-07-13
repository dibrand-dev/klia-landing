'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ESPECIALIDADES } from '@/lib/especialidades'
import { createClient } from '@/lib/supabase/client'
import { track } from '@/lib/analytics'
import './cro.css'

const APP_URL = 'https://app.klia.com.ar'

async function handleGoogleSignup() {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${APP_URL}/auth/callback?new=true` },
  })
}

/* ---- SVG Icon primitives ---- */
const Icon = ({ children, size = 22, stroke = 1.6, className = '' }: { children: React.ReactNode; size?: number; stroke?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
)

const Icons = {
  Receipt: (p: { size?: number }) => <Icon {...p}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/></Icon>,
  Clock:   (p: { size?: number }) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></Icon>,
  Doc:     (p: { size?: number }) => <Icon {...p}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M10 12h6M10 16h4"/></Icon>,
  Shield:  (p: { size?: number }) => <Icon {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2.2 2.2L15 10.5"/></Icon>,
  Wallet:  (p: { size?: number }) => <Icon {...p}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none"/></Icon>,
  Sparkle: (p: { size?: number }) => <Icon {...p}><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z"/><path d="M19 4v3M19 16v3M5 17v3"/></Icon>,
  Check:   (p: { size?: number }) => <Icon {...p}><path d="M5 12.5l4 4 10-10"/></Icon>,
  Globe:   (p: { size?: number }) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.7 3 4 6 4 9s-1.3 6-4 9c-2.7-3-4-6-4-9s1.3-6 4-9z"/></Icon>,
  Plus:    (p: { size?: number }) => <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>,
  Arrow:   (p: { size?: number }) => <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Icon>,
  Brain:   (p: { size?: number }) => <Icon {...p}><path d="M9 5a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8c0 1.2.7 2.2 1.8 2.7A3 3 0 0 0 9 18a3 3 0 0 0 3-1.5"/><path d="M15 5a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8c0 1.2-.7 2.2-1.8 2.7A3 3 0 0 1 15 18a3 3 0 0 1-3-1.5"/><path d="M12 5v13"/></Icon>,
  ChartUp: (p: { size?: number }) => <Icon {...p}><path d="M3 19h18"/><path d="M5 15l4-5 4 3 6-8"/><path d="M14 5h5v5"/></Icon>,
  Calendar:(p: { size?: number }) => <Icon {...p}><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="12" cy="14.5" r="1.2" fill="currentColor" stroke="none"/></Icon>,
  Phone:   (p: { size?: number }) => <Icon {...p}><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></Icon>,
  Card:    (p: { size?: number }) => <Icon {...p}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><path d="M7 15h3"/></Icon>,
  Users:   (p: { size?: number }) => <Icon {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3 19c.5-3.3 3-5.5 6-5.5s5.5 2.2 6 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M21 18c-.3-2.2-1.7-3.7-3.5-4.2"/></Icon>,
  Lock:    (p: { size?: number }) => <Icon {...p}><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><circle cx="12" cy="15.5" r="1.2" fill="currentColor" stroke="none"/></Icon>,
}

/* ---- Google G SVG ---- */
const GoogleG = () => (
  <svg className="g-ico" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
)

/* ---- Phone tab bar ---- */
const PhoneTabBar = ({ active }: { active: string }) => (
  <div className="ph-tabbar">
    <div className={`ph-tab ${active === 'home' ? 'on' : ''}`}><Icons.ChartUp size={18} /></div>
    <div className={`ph-tab ${active === 'cal' ? 'on' : ''}`}><Icons.Calendar size={18} /></div>
    <div className={`ph-tab ph-tab-fab ${active === 'ai' ? 'on' : ''}`}><Icons.Sparkle size={20} /></div>
    <div className={`ph-tab ${active === 'pay' ? 'on' : ''}`}><Icons.Wallet size={18} /></div>
    <div className={`ph-tab ${active === 'users' ? 'on' : ''}`}><Icons.Users size={18} /></div>
  </div>
)

/* ---- Status bar ---- */
const StatusBar = () => (
  <div className="ph-status">
    <span>9:41</span>
    <span className="ph-status-icons">
      <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor"><rect x="0" y="6" width="2" height="3" rx=".4"/><rect x="3" y="4" width="2" height="5" rx=".4"/><rect x="6" y="2" width="2" height="7" rx=".4"/><rect x="9" y="0" width="2" height="9" rx=".4"/></svg>
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" stroke="currentColor" strokeWidth="1"><path d="M5.5 1.5C3.5 1.5 1.8 2.3.8 3.6"/><path d="M5.5 4C4.4 4 3.4 4.5 2.7 5.2"/><circle cx="5.5" cy="6.7" r=".8" fill="currentColor"/></svg>
      <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth=".8"><rect x=".4" y=".4" width="18" height="9.2" rx="2"/><rect x="2" y="2" width="13.5" height="6" rx="1" fill="currentColor"/><rect x="19.5" y="3.5" width="1.5" height="3" rx=".5" fill="currentColor"/></svg>
    </span>
  </div>
)

/* ---- Phone screens ---- */
const PhoneHome = () => (
  <div className="ph-screen ph-home">
    <StatusBar />
    <div className="ph-app-bar">
      <div>
        <div className="ph-greeting muted">Buen día, Dra.</div>
        <div className="ph-name">Lucía Méndez</div>
      </div>
      <div className="ph-avatar">LM</div>
    </div>
    <div className="ph-pill-row">
      <div className="ph-pill ph-pill-active">Hoy</div>
      <div className="ph-pill">Semana</div>
      <div className="ph-pill">Pacientes</div>
    </div>
    <div className="ph-summary">
      <div className="ph-summary-label">Cobrado este mes</div>
      <div className="ph-summary-amount">$ 487.200</div>
      <div className="ph-summary-trend"><span className="trend-up">↑ 12,4%</span> vs. mes pasado</div>
      <div className="ph-summary-bars">
        {[40, 65, 50, 80, 70, 92, 60].map((h, i) => (
          <div key={i} className="ph-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }} />
        ))}
      </div>
    </div>
    <div className="ph-section-title"><span>Próximo turno</span><span className="ph-section-link">Ver agenda</span></div>
    <div className="ph-appt">
      <div className="ph-appt-time">
        <div className="ph-appt-hour">10:30</div>
        <div className="ph-appt-mins">45 min</div>
      </div>
      <div className="ph-appt-body">
        <div className="ph-appt-name">Carolina Vázquez</div>
        <div className="ph-appt-tags">
          <span className="ph-tag ph-tag-blue">Sesión 12</span>
          <span className="ph-tag ph-tag-mint">Pagado</span>
        </div>
      </div>
      <div className="ph-appt-cta">›</div>
    </div>
    <div className="ph-quick-row">
      <div className="ph-quick"><div className="ph-quick-ico" style={{ background: '#FFE9E5', color: '#E55A45' }}><Icons.Receipt size={16} /></div><div className="ph-quick-label">Facturar</div></div>
      <div className="ph-quick"><div className="ph-quick-ico" style={{ background: '#E8ECF8', color: '#3F519E' }}><Icons.Brain size={16} /></div><div className="ph-quick-label">Informe IA</div></div>
      <div className="ph-quick"><div className="ph-quick-ico" style={{ background: '#E5F5EC', color: '#3D9C6B' }}><Icons.Wallet size={16} /></div><div className="ph-quick-label">Cobrar</div></div>
    </div>
    <PhoneTabBar active="home" />
  </div>
)

const PhoneAI = () => (
  <div className="ph-screen ph-ai">
    <StatusBar />
    <div className="ph-app-bar">
      <div className="ph-back">‹</div>
      <div className="ph-page-title">Informe con IA</div>
      <div />
    </div>
    <div className="ph-ai-pulse">
      <div className="pulse-ring" /><div className="pulse-ring pulse-ring-2" />
      <div className="pulse-core"><Icons.Sparkle size={28} /></div>
    </div>
    <div className="ph-ai-status">Transcribiendo sesión…</div>
    <div className="ph-ai-time">02:14</div>
    <div className="ph-ai-card">
      <div className="ph-ai-card-label">RESUMEN GENERADO</div>
      <div className="ph-ai-line" /><div className="ph-ai-line" style={{ width: '92%' }} />
      <div className="ph-ai-line" style={{ width: '78%' }} /><div className="ph-ai-line" style={{ width: '85%' }} />
    </div>
    <div className="ph-ai-actions">
      <div className="ph-ai-action ph-ai-action-secondary">Pausar</div>
      <div className="ph-ai-action ph-ai-action-primary">Finalizar</div>
    </div>
    <PhoneTabBar active="ai" />
  </div>
)

const PhonePay = () => (
  <div className="ph-screen ph-pay">
    <StatusBar />
    <div className="ph-app-bar">
      <div className="ph-back">‹</div>
      <div className="ph-page-title">Cobrar sesión</div>
      <div />
    </div>
    <div className="ph-pay-amount-block">
      <div className="ph-pay-label">Monto a cobrar</div>
      <div className="ph-pay-amount"><span className="ph-pay-currency">$</span>18.500</div>
      <div className="ph-pay-meta"><span>Carolina V.</span><span className="ph-dot" /><span>Sesión 12</span></div>
    </div>
    <div className="ph-pay-qr">
      <div className="qr-grid">
        {Array.from({ length: 81 }).map((_, i) => {
          const filled = ((i * 7 + 13) % 100) % 3 !== 0
          return <div key={i} className={`qr-cell ${filled ? 'on' : ''}`} />
        })}
      </div>
      <div className="qr-logo"><Icons.Wallet size={20} /></div>
    </div>
    <div className="ph-pay-meta-text">Mercado Pago · Escaneá con la app</div>
    <div className="ph-pay-methods">
      <div className="ph-pay-method ph-pay-method-active"><div className="ph-pay-method-ico"><Icons.Phone size={14} /></div>QR</div>
      <div className="ph-pay-method"><div className="ph-pay-method-ico"><Icons.Card size={14} /></div>Link de pago</div>
      <div className="ph-pay-method"><div className="ph-pay-method-ico"><Icons.Receipt size={14} /></div>Efectivo</div>
    </div>
    <PhoneTabBar active="pay" />
  </div>
)

const PhoneFrame = ({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) => (
  <div className="phone" style={{ transform: `scale(${scale})` }}>
    <div className="phone-bezel">
      <div className="phone-notch" />
      <div className="phone-screen">{children}</div>
    </div>
  </div>
)

/* ---- Localization card ---- */
const LocalizationMock = () => (
  <div className="cro-loc-card">
    <div className="cro-loc-head"><Icons.Globe size={16} /> Especialidad y localización</div>
    <div className="cro-loc-block">
      <div className="cro-loc-label">Terminología detectada</div>
      <div className="cro-loc-terms">
        <span className="cro-loc-term on">Psicólogo → «Sesión»</span>
        <span className="cro-loc-term">Médico → «Consulta»</span>
      </div>
    </div>
    <div className="cro-loc-curr">{['ARS', 'USD', 'EUR'].map((c) => <span key={c} className="cro-loc-coin">{c}</span>)}</div>
    <div className="cro-loc-foot"><Icons.Check size={14} /> 42 especialidades · feriados AR bloqueados automáticamente</div>
  </div>
)

/* ---- Registration form ---- */
function RegistroForm() {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', especialidad: '', matricula: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [terms, setTerms] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.nombre || !form.apellido || !form.email || !form.especialidad || !form.password) {
      setError('Completá todos los campos requeridos')
      return
    }
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }
    if (!terms) {
      setError('Aceptá los términos para continuar')
      return
    }
    setLoading(true)
    setError('')
    track('sign_up_attempt', { form_source: 'prueba_gratis' })
    try {
      const res = await fetch('https://app.klia.com.ar/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          especialidad: form.especialidad,
          matricula: form.matricula || null,
          password: form.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        const reason = data.error === 'already_registered'
          ? 'email_already_exists'
          : res.status === 400
          ? 'invalid_password'
          : 'unknown_error'
        track('sign_up_failed', { form_source: 'prueba_gratis', reason })
        setError(data.error || 'Error al crear la cuenta')
        return
      }
      track('sign_up', { form_source: 'prueba_gratis' })
      setSuccess(true)
    } catch {
      track('sign_up_failed', { form_source: 'prueba_gratis', reason: 'unknown_error' })
      setError('No pudimos conectar con el servidor. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="cro-form-success">
        <div className="cro-form-success-ico">✅</div>
        <h3>¡Ya casi estás!</h3>
        <p>Revisá tu email <strong>{form.email}</strong> para confirmar tu cuenta y empezar tu prueba de 21 días gratis.</p>
      </div>
    )
  }

  return (
    <div className="cro-form-wrap">
      <div className="cro-form-row">
        <div className="cro-form-field">
          <label className="cro-form-label">Nombre</label>
          <input type="text" placeholder="Lucía" value={form.nombre} onChange={set('nombre')} autoComplete="given-name" />
        </div>
        <div className="cro-form-field">
          <label className="cro-form-label">Apellido</label>
          <input type="text" placeholder="Méndez" value={form.apellido} onChange={set('apellido')} autoComplete="family-name" />
        </div>
      </div>
      <div className="cro-form-field">
        <label className="cro-form-label">Email profesional</label>
        <input type="email" placeholder="lucia@consultorio.com.ar" value={form.email} onChange={set('email')} autoComplete="email" />
      </div>
      <div className="cro-form-row">
        <div className="cro-form-field">
          <label className="cro-form-label">Profesión</label>
          <select value={form.especialidad} onChange={set('especialidad')}>
            <option value="">Seleccioná</option>
            {ESPECIALIDADES.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div className="cro-form-field">
          <label className="cro-form-label">Matrícula <span className="cro-form-optional">(opcional)</span></label>
          <input type="text" placeholder="MN 12.345" value={form.matricula} onChange={set('matricula')} autoComplete="off" />
        </div>
      </div>
      <div className="cro-form-field">
        <label className="cro-form-label">Contraseña</label>
        <div className="cro-form-pass-wrap">
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChange={set('password')}
            autoComplete="new-password"
          />
          <button type="button" className="cro-form-pass-toggle" onClick={() => setShowPass(v => !v)} aria-label="Mostrar contraseña">
            {showPass
              ? <Icon size={15}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></Icon>
              : <Icon size={15}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Icon>
            }
          </button>
        </div>
        <div className="cro-form-hint">Usá al menos 8 caracteres, una mayúscula y un número.</div>
      </div>
      <label className="cro-form-check">
        <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} />
        <span>Acepto los <a href="https://www.klia.com.ar/terminos" target="_blank" rel="noopener noreferrer">Términos</a> y la <a href="https://www.klia.com.ar/privacidad" target="_blank" rel="noopener noreferrer">Política de privacidad</a>. Klia cumple con la Ley 25.326.</span>
      </label>
      <button className="cro-form-submit" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Creando tu cuenta…' : 'Crear cuenta gratis — 21 días Premium'}
      </button>
      {error && <div className="cro-form-error">{error}</div>}
    </div>
  )
}

/* ---- Nav ---- */
function CroNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`cro-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container cro-nav-inner">
        <div className="cro-nav-logo" aria-label="KLIA">
          <Image src="/klia-logo.png" alt="KLIA" width={235} height={80} style={{ height: 40, width: 'auto' }} priority />
        </div>
        <div className="cro-nav-right">
          <a href="https://app.klia.com.ar/login" className="cro-login">Iniciar sesión</a>
        </div>
      </div>
    </header>
  )
}

/* ---- Hero ---- */
function CroHero() {
  return (
    <section className="cro-hero" id="registro">
      <div className="container">
        <div className="cro-hero-inner">
          <div className="cro-hero-badge cro-reveal">
            <span className="bdot" />
            Software de gestión de consultorios · Argentina
          </div>
          <h1 className="cro-h1 cro-reveal">
            Generá las planillas de tus Obras Sociales <span className="hl">en segundos</span> y sin errores de tipeo.
          </h1>
          <p className="cro-hero-sub cro-reveal">
            KLIA es la plataforma integral para profesionales de la salud en
            Argentina. Automatizá tu agenda, gestioná historias clínicas y exportá liquidaciones
            listas para presentar.
          </p>

          <div className="cro-cta-zone cro-reveal">
            <button type="button" onClick={handleGoogleSignup} className="cro-google-btn">
              <GoogleG />
              <span>Registrate gratis con Google <span className="g-tap">(En 1 click)</span></span>
            </button>

            <div className="cro-divider">
              <span className="cro-divider-line" />
              <span className="cro-divider-text">o creá una cuenta con tu correo</span>
              <span className="cro-divider-line" />
            </div>

            <RegistroForm />

            <p className="cro-trust">
              ⚡ <span><b>21 días</b> de prueba Plan Premium gratis. Sin ingresar tarjetas de crédito. Cancelás cuando querés.</span>
            </p>
          </div>

          <div className="cro-hero-proof cro-reveal">
            <span className="cro-hero-proof-item"><Icons.Shield size={15} /> Ley 25.326 · datos protegidos</span>
            <span className="sep" />
            <span className="cro-hero-proof-item"><Icons.Wallet size={15} /> Cobros con Mercado Pago</span>
            <span className="sep" />
            <span className="cro-hero-proof-item"><Icons.Sparkle size={15} /> Historias clínicas con IA</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Problem section ---- */
function CroProblem() {
  const cards = [
    {
      ico: <Icons.Receipt size={24} />,
      stat: '84%',
      title: 'Planillas rechazadas',
      body: 'El 84% de los profesionales de la salud sufre retrasos en sus pagos u obras sociales caídas por un simple error de tipeo en los DNI o números de afiliado.',
    },
    {
      ico: <Icons.Clock size={24} />,
      stat: 'Fines de semana',
      title: 'Horas de trabajo administrativo',
      body: 'Tardes enteras del fin de semana arrastrando datos de pacientes de forma manual entre cuadernos, Excel y WhatsApp para armar cierres de mes.',
    },
    {
      ico: <Icons.Doc size={24} />,
      stat: 'Datos dispersos',
      title: 'Falta de historial clínico integrado',
      body: 'Notas de sesión desordenadas o estudios médicos (imágenes, laboratorios) perdidos en carpetas locales, arriesgando el seguimiento del paciente.',
    },
  ]
  return (
    <section id="problema" className="cro-section cro-section-alt">
      <div className="container">
        <div className="cro-section-head">
          <span className="cro-eyebrow cro-reveal">El día a día en el consultorio</span>
          <h2 className="cro-h2 cro-reveal">Gestionar un consultorio en Argentina no debería costarte el doble de trabajo.</h2>
          <p className="cro-section-lead cro-reveal">Estos son los tres focos de desgaste que más plata y energía te consumen — y que KLIA resuelve de raíz.</p>
        </div>
        <div className="cro-problem-grid">
          {cards.map((c, i) => (
            <article key={i} className="cro-prob-card cro-reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="cro-prob-ico">{c.ico}</div>
              <div className="cro-prob-stat">{c.stat}</div>
              <h3 className="cro-prob-title">{c.title}</h3>
              <p className="cro-prob-body">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Features section ---- */
function CroFeatures() {
  const benefits = [
    {
      n: '01',
      media: <PhoneFrame scale={0.92}><PhonePay /></PhoneFrame>,
      title: 'Liquidación y planillas de asistencia automatizadas',
      body: 'KLIA cuenta con un motor genérico y plantillas preconfiguradas con los formatos oficiales exigidos en Argentina (Plan de Salud del Hospital Italiano, IOMA, Swiss Medical). Exportá en un clic el PDF o Excel mensual cruzando números de autorización con las firmas digitalizadas del profesional y del paciente cargadas en el sistema.',
      list: ['Plantillas oficiales: Hospital Italiano, IOMA, Swiss Medical', 'Firmas digitalizadas del profesional y del paciente', 'PDF + Excel oficial'],
      tags: ['Motor de planillas', 'Firmas digitalizadas', 'PDF + Excel'],
    },
    {
      n: '02',
      reverse: true,
      media: <PhoneFrame scale={0.92}><PhoneAI /></PhoneFrame>,
      title: 'Historias clínicas con Inteligencia Artificial',
      body: 'Editor de texto enriquecido potenciado con notas de voz grabadas directamente desde KLIA. El sistema transcribe automáticamente el audio a texto en español usando inteligencia artificial de transcripción de alta precisión. Adjuntá estudios y órdenes médicas que se almacenan de forma segura y privada.',
      list: ['Notas de voz transcriptas a texto con IA de alta precisión', 'Editor de texto enriquecido inteligente', 'Estudios y órdenes guardados de forma segura y privada'],
      tags: ['Transcripción IA', 'Editor enriquecido', 'Almacenamiento seguro'],
    },
    {
      n: '03',
      media: <PhoneFrame scale={0.92}><PhoneHome /></PhoneFrame>,
      title: 'Agenda coordinada y Consultorio Autónomo',
      body: 'Sincronización bidireccional inteligente con Google Calendar y recordatorios automáticos de turnos por email 24 hs antes de forma automatizada. Tus pacientes particulares pueden reservar turnos de forma independiente mediante tu URL pública única con cobro previo integrado a través de Mercado Pago.',
      list: ['Sincronización bidireccional con Google Calendar', 'Recordatorios automáticos por email 24 hs antes', 'Reservas en tu URL pública única con cobro previo por Mercado Pago'],
      tags: ['Google Calendar 2-way', 'Recordatorios automáticos', 'Reservas + Mercado Pago'],
    },
    {
      n: '04',
      reverse: true,
      media: <LocalizationMock />,
      title: 'Especialización y Localización Absoluta',
      body: 'Olvidate de sistemas genéricos. KLIA detecta tu especialidad (soporta 42 ramas de la medicina y rehabilitación) y adapta la terminología de toda la interfaz: muestra «Sesión» para psicólogos o terapeutas y «Consulta» para médicos. Cuenta con soporte multi-moneda (ARS, USD, EUR) y bloquea automáticamente los días feriados nacionales y provinciales de Argentina para que nadie reserve un día no laborable por error.',
      list: ['42 ramas de la medicina y rehabilitación soportadas', 'Terminología adaptativa: «Sesión» vs «Consulta»', 'Multi-moneda (ARS, USD, EUR) y feriados AR automáticos'],
      tags: ['42 especialidades', 'Multi-moneda', 'Feriados AR automáticos'],
    },
  ]
  return (
    <section id="caracteristicas" className="cro-section">
      <div className="container">
        <div className="cro-section-head">
          <span className="cro-eyebrow cro-reveal">Módulos activos en producción · Junio 2026</span>
          <h2 className="cro-h2 cro-reveal">Todo tu consultorio, en una sola plataforma.</h2>
          <p className="cro-section-lead cro-reveal">Liquidaciones de obras sociales, historia clínica con IA, agenda y cobros — pensados desde cero para profesionales de la salud en Argentina.</p>
        </div>
        {benefits.map((b) => (
          <div key={b.n} className={`cro-feature cro-reveal ${b.reverse ? 'cro-feature-reverse' : ''}`}>
            <div className="cro-feature-media">{b.media}</div>
            <div className="cro-feature-copy">
              <div className="cro-feature-num">{b.n}</div>
              <h3 className="cro-feature-title">{b.title}</h3>
              <p className="cro-feature-body">{b.body}</p>
              <ul className="cro-feature-list">
                {b.list.map((li, i) => (
                  <li key={i}><span className="chk"><Icons.Check size={13} /></span> {li}</li>
                ))}
              </ul>
              <div className="cro-feature-tags">
                {b.tags.map((t) => <span key={t} className="cro-feature-tag">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---- Pricing section ---- */
function CroPricing({ prices }: { prices: Record<string, number> | null }) {
  const [annual, setAnnual] = useState(false)
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' })
  }

  if (!prices) {
    return (
      <section id="precios" className="cro-section cro-section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: '16px', color: 'var(--muted)' }}>
              Precios no disponibles en este momento. Escribinos a{' '}
              <a href="mailto:hola@klia.com.ar" style={{ color: 'inherit', textDecoration: 'underline' }}>hola@klia.com.ar</a>
            </p>
          </div>
        </div>
      </section>
    )
  }

  const plans = [
    {
      name: 'Esencial',
      desc: 'Lo necesario para ordenar tu consultorio y dejar el papel atrás.',
      monthly: prices.esencial, annual: Math.round(prices.esencial * 11 / 12),
      cta: 'Empezar gratis', featured: false,
      footer: '21 días de prueba · cancelás cuando quieras',
      feats: [
        { t: 'Agenda y calendario', prev: false },
        { t: 'Gestión de pacientes', prev: false },
        { t: 'Turnos y citas', prev: false },
        { t: 'Historial clínico', prev: false },
        { t: 'Entrevistas de evaluación', prev: false },
        { t: 'Sincronización Google Calendar', prev: false },
        { t: 'Multi-moneda ARS / USD / EUR', prev: false },
        { t: 'Firmas escaneadas', prev: false },
      ],
    },
    {
      name: 'Profesional',
      desc: 'Para quien factura, cobra y presenta a obras sociales todos los meses.',
      monthly: prices.profesional, annual: Math.round(prices.profesional * 11 / 12),
      cta: 'Probar 21 días gratis', featured: true,
      footer: '21 días gratis sin tarjeta · cancelás cuando quieras',
      feats: [
        { t: 'Todo lo del Plan Esencial', prev: true },
        { t: 'Gestión de cobros', prev: false },
        { t: 'Facturación', prev: false },
        { t: 'Liquidación de obras sociales', prev: false },
        { t: 'Planillas PDF por obra social', prev: false },
        { t: 'Atenciones del Día con IA ✨', prev: false },
        { t: 'Notas de voz con transcripción IA 🎤', prev: false },
      ],
    },
    {
      name: 'Premium',
      desc: 'La práctica completamente automatizada, de la reserva al informe.',
      monthly: prices.premium, annual: Math.round(prices.premium * 11 / 12),
      cta: 'Probar 21 días gratis', featured: false,
      footer: 'Onboarding incluido · soporte prioritario',
      feats: [
        { t: 'Todo lo del Plan Profesional', prev: true },
        { t: 'Informes clínicos con IA ✨', prev: false },
        { t: 'Estadísticas del consultorio', prev: false },
        { t: 'Soporte prioritario', prev: false },
      ],
    },
  ]

  const fmt = (n: number) => '$' + n.toLocaleString('es-AR')

  return (
    <section id="precios" className="cro-section cro-section-alt">
      <div className="container">
        <div className="cro-section-head">
          <span className="cro-eyebrow cro-reveal">Precios</span>
          <h2 className="cro-h2 cro-reveal">Planes claros, sin letra chica.</h2>
          <p className="cro-section-lead cro-reveal">Elegí según lo que tu práctica necesita hoy. Cambiás o cancelás cuando quieras.</p>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }} className="cro-reveal">
            <div className="cro-price-toggle">
              <button className={!annual ? 'on' : ''} onClick={() => setAnnual(false)}>Mensual</button>
              <button className={annual ? 'on' : ''} onClick={() => setAnnual(true)}>
                Anual <span className="save-badge">1 mes gratis</span>
              </button>
            </div>
          </div>
        </div>
        <div className="cro-price-grid">
          {plans.map((p, i) => (
            <div key={p.name} className={`cro-plan ${p.featured ? 'cro-plan-featured' : ''} cro-reveal`} style={{ transitionDelay: `${i * 80}ms` }}>
              {p.featured && <div className="cro-plan-flag">Más elegido</div>}
              <div className="cro-plan-name">{p.name}</div>
              <p className="cro-plan-desc">{p.desc}</p>
              <div className="cro-plan-price">
                <span className="cro-plan-currency">$</span>
                <span className="cro-plan-amount">{(annual ? p.annual : p.monthly).toLocaleString('es-AR')}</span>
                <span className="cro-plan-period">ARS/mes</span>
              </div>
              <div className="cro-plan-annual-note">
                {annual ? `Facturado anual · ${fmt(p.annual * 12)}/año` : 'Facturación mensual · sin permanencia'}
              </div>
              <div className="cro-plan-cta">
                <button
                  onClick={scrollToForm}
                  className={`cro-plan-btn ${p.featured ? 'cro-plan-btn-accent' : 'cro-plan-btn-ghost'}`}
                >
                  {p.cta}
                </button>
              </div>
              <ul className="cro-plan-feats">
                {p.feats.map((f, j) => (
                  <li key={j}>
                    <span className="chk"><Icons.Check size={11} /></span>
                    <span className={f.prev ? 'inc-prev' : ''}>{f.t}</span>
                  </li>
                ))}
              </ul>
              {p.footer && <div className="cro-plan-footer">{p.footer}</div>}
            </div>
          ))}
        </div>
        <div className="cro-price-note cro-reveal">
          Todos los registros nuevos acceden a <b>21 días completos del Plan Premium gratis</b> para probar el sistema sin límites.
        </div>
      </div>
    </section>
  )
}

/* ---- FAQ section ---- */
const FAQ_ITEMS = [
  {
    q: '¿Cómo funciona el motor de planillas para Obras Sociales?',
    a: <>KLIA procesa los turnos marcados como <strong>«Atendidos»</strong> durante el mes. El sistema toma los datos de cobertura del paciente, el número de afiliado, el código de práctica y el número de autorización médica. Luego genera automáticamente el archivo Excel o PDF con el formato exacto requerido por obras sociales como el <strong>Hospital Italiano</strong> o <strong>IOMA</strong>, incluyendo la firma del profesional y la imagen de firma escaneada del paciente o tutor para evitar rechazos administrativos.</>,
  },
  {
    q: '¿Mis datos clínicos están protegidos por ley en Argentina?',
    a: <>Totalmente. KLIA opera con <strong>Row Level Security (RLS)</strong> en Supabase (PostgreSQL), lo que garantiza de forma estricta por código que ningún otro usuario o administrador pueda leer las notas clínicas de tus pacientes. Además, la plataforma cumple con la <strong>Ley 25.326 de Protección de Datos Personales</strong> en Argentina y sus bases de datos están registradas ante la <strong>AAIP</strong> bajo el expediente <strong>EX-2026-51700917--APN-DNPDP#AAIP</strong>.</>,
  },
  {
    q: '¿Cómo se maneja el cobro de planes de KLIA y el dinero de mis pacientes?',
    a: <>El cobro mensual de tu suscripción a KLIA es automático a través de <strong>Mercado Pago Suscripciones</strong>. Por otro lado, para cobrar las sesiones a tus pacientes particulares, integrás tu propia cuenta de Mercado Pago vía <strong>OAuth</strong> desde el panel de Ajustes. El dinero va directamente desde el paciente hacia tu cuenta: <strong>KLIA no retiene ni intermedia tus fondos</strong> en ningún momento.</>,
  },
]

function CroFAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="cro-section">
      <div className="container">
        <div className="cro-section-head">
          <span className="cro-eyebrow cro-reveal">Preguntas frecuentes</span>
          <h2 className="cro-h2 cro-reveal">Lo que todo profesional pregunta antes de empezar.</h2>
        </div>
        <div className="cro-faq-wrap">
          {FAQ_ITEMS.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={i} className={`cro-faq-item cro-reveal ${isOpen ? 'open' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                <button className="cro-faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>{it.q}</span>
                  <span className="cro-faq-toggle"><Icons.Plus size={17} /></span>
                </button>
                <div className="cro-faq-a-wrap">
                  <div className="cro-faq-a">{it.a}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---- Final CTA ---- */
function CroFinalCTA() {
  return (
    <section className="cro-final">
      <div className="container">
        <h2 className="cro-reveal">Empezá hoy. Tu primera liquidación automática está a 2 minutos.</h2>
        <p className="cro-reveal">Sumate a los profesionales de la salud que ya gestionan su consultorio sin planillas ni papeles.</p>
        <div className="cro-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button type="button" onClick={handleGoogleSignup} className="cro-google-btn">
            <GoogleG />
            <span>Registrate gratis con Google <span className="g-tap">(En 1 click)</span></span>
          </button>
          <p className="cro-trust">
            ⚡ <span><b>21 días</b> de prueba Plan Premium gratis. Sin tarjeta. Cancelás cuando querés.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---- Footer (simplified — no exit points) ---- */
function CroFooter() {
  return (
    <footer className="cro-footer">
      <div className="container cro-footer-inner">
        <div className="cro-footer-logo">
          <Image src="/klia-logo.png" alt="KLIA" width={100} height={34} style={{ height: 28, width: 'auto', opacity: 0.6 }} />
        </div>
        <a href="https://app.klia.com.ar/login" className="cro-footer-login">
          Ya tengo cuenta — Iniciar sesión
        </a>
        <div className="cro-footer-copy">
          © 2026 KLIA Health Tech · Ley 25.326 · AAIP EX-2026-51700917
        </div>
      </div>
    </footer>
  )
}

/* ---- Reveal on scroll ---- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.cro-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

/* ---- Main page ---- */
export default function PruebaGratisContent({ prices }: { prices: Record<string, number> | null }) {
  useReveal()
  return (
    <div className="cro">
      <CroNav />
      <main>
        <CroHero />
        <CroProblem />
        <CroFeatures />
        <CroPricing prices={prices} />
        <CroFAQ />
        <CroFinalCTA />
      </main>
      <CroFooter />
    </div>
  )
}
