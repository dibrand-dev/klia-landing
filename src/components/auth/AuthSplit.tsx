'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ESPECIALIDADES } from '@/lib/especialidades'
import { track } from '@/lib/analytics'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.klia.com.ar'

type LoginData = {
  email: string
  password: string
  rememberMe: boolean
}

type RegisterData = {
  nombre: string
  apellido: string
  email: string
  especialidad: string
  password: string
  matricula: string
  acceptTerms: boolean
}

// Shared components
const AuthTabs = ({ mode, setMode }: { mode: 'login' | 'register'; setMode: (m: 'login' | 'register') => void }) => (
  <div className="auth-tabs" role="tablist">
    <button
      role="tab"
      aria-selected={mode === 'login'}
      className={`auth-tab ${mode === 'login' ? 'is-active' : ''}`}
      onClick={() => setMode('login')}
    >
      Ingresar
    </button>
    <button
      role="tab"
      aria-selected={mode === 'register'}
      className={`auth-tab ${mode === 'register' ? 'is-active' : ''}`}
      onClick={() => setMode('register')}
    >
      Crear cuenta
    </button>
  </div>
)

interface PasswordFieldProps {
  id: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordField = ({ id, placeholder = 'Tu contraseña', value, onChange }: PasswordFieldProps) => {
  const [show, setShow] = useState(false)
  return (
    <div className="input-with-icon">
      <span className="input-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
      <input id={id} className="input" type={show ? 'text' : 'password'} placeholder={placeholder} value={value} onChange={onChange} autoComplete="current-password" />
      <button type="button" className="input-suffix-btn" aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShow(!show)}>
        {show ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  )
}

interface EmailFieldProps {
  id?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EmailField = ({ id = 'email', value, onChange }: EmailFieldProps) => (
  <div className="input-with-icon">
    <span className="input-icon">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 6l-10 7L2 6" />
      </svg>
    </span>
    <input id={id} className="input" type="email" placeholder="lucia@consultorio.com.ar" value={value} onChange={onChange} autoComplete="email" />
  </div>
)

const OAuthRow = ({ onGoogleClick }: { onGoogleClick: () => void }) => (
  <div className="oauth-row">
    <button type="button" className="oauth-btn" onClick={onGoogleClick}>
      <svg width="16" height="16" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.61z" />
        <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z" />
        <path fill="#FBBC05" d="M3.96 10.71A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3-2.33z" />
        <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" />
      </svg>
      Google
    </button>
    <button type="button" className="oauth-btn" style={{ display: 'none' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
      Apple
    </button>
  </div>
)

const TrustStrip = () => (
  <div className="trust-strip">
    <span className="trust-pill">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      IA · Atenciones del Día
    </span>
    <span className="trust-pill">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      Mercado Pago
    </span>
    <span className="trust-pill">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      Datos cifrados
    </span>
  </div>
)

interface LoginFormProps {
  loading: boolean
  error: string | null
  showResendLink: boolean
  onResend: () => void
  onSubmit: (e: React.FormEvent) => void
  form: LoginData
  setForm: (form: LoginData) => void
  onGoogleClick: () => void
}

// Login form
const LoginForm = ({ loading, error, showResendLink, onResend, onSubmit, form, setForm, onGoogleClick }: LoginFormProps) => (
  <form className="auth-form" onSubmit={onSubmit}>
    {error && (
      <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#991B1B', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>
        {error}
        {showResendLink && (
          <button type="button" onClick={onResend}
            style={{ display: 'block', marginTop: '8px', fontSize: '13px', textDecoration: 'underline', color: '#991B1B', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Reenviar email de confirmación
          </button>
        )}
      </div>
    )}

    <div className="field">
      <label className="field-label" htmlFor="email">
        Email profesional
      </label>
      <EmailField id="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
    </div>

    <div className="field">
      <div className="field-help" style={{ marginBottom: 7, marginTop: 0 }}>
        <label className="field-label" htmlFor="password" style={{ marginBottom: 0 }}>
          Contraseña
        </label>
        <a href="https://app.klia.com.ar/recuperar" style={{ cursor: 'pointer' }}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      <PasswordField id="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
    </div>

    <label className="checkbox" style={{ marginTop: 4 }}>
      <input type="checkbox" checked={form.rememberMe} onChange={(e) => setForm({ ...form, rememberMe: e.target.checked })} />
      <span>Mantenerme conectado en este dispositivo</span>
    </label>

    <button type="submit" className="btn-auth" style={{ marginTop: 6 }} disabled={loading}>
      {loading ? 'Ingresando...' : 'Ingresar al consultorio'}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>

    <div className="auth-divider">
      <span>o continuar con</span>
    </div>
    <OAuthRow onGoogleClick={onGoogleClick} />
  </form>
)

interface RegisterFormProps {
  loading: boolean
  error: string | null
  onSubmit: (e: React.FormEvent) => void
  form: RegisterData
  setForm: (form: RegisterData) => void
  onGoogleClick: () => void
}

// Register form
const RegisterForm = ({ loading, error, onSubmit, form, setForm, onGoogleClick }: RegisterFormProps) => (
  <form className="auth-form" onSubmit={onSubmit}>
    {error && <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#991B1B', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>{error}</div>}

    <div className="row-2">
      <div className="field">
        <label className="field-label" htmlFor="nombre">
          Nombre
        </label>
        <input id="nombre" className="input" type="text" placeholder="Lucía" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
      </div>
      <div className="field">
        <label className="field-label" htmlFor="apellido">
          Apellido
        </label>
        <input id="apellido" className="input" type="text" placeholder="Méndez" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required />
      </div>
    </div>

    <div className="field">
      <label className="field-label" htmlFor="reg-email">
        Email profesional
      </label>
      <EmailField id="reg-email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
    </div>

    <div className="row-2">
      <div className="field">
        <label className="field-label" htmlFor="prof">
          Profesión
        </label>
        <select id="prof" className="select" value={form.especialidad} onChange={(e) => setForm({ ...form, especialidad: e.target.value })} required>
          <option value="">Selecciona una profesión</option>
          {ESPECIALIDADES.map((esp) => (
            <option key={esp} value={esp}>
              {esp}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label className="field-label" htmlFor="mat">
          Matrícula (opcional)
        </label>
        <input id="mat" className="input" type="text" placeholder="MN 12.345" autoComplete="off" onChange={(e) => setForm({ ...form, matricula: e.target.value })} />
      </div>
    </div>

    <div className="field">
      <label className="field-label" htmlFor="reg-pass">
        Contraseña
      </label>
      <PasswordField id="reg-pass" placeholder="Mínimo 8 caracteres" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <div className="field-help">
        <span>Usá al menos 8 caracteres, una mayúscula y un número.</span>
      </div>
    </div>

    <label className="checkbox" style={{ marginTop: 4 }}>
      <input type="checkbox" checked={form.acceptTerms} onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })} required />
      <span>
        Acepto los <a href="/terminos">Términos</a> y la <a href="/privacidad">Política de privacidad</a>. Klia cumple con la Ley 25.326 de protección de datos.
      </span>
    </label>

    <button type="submit" className="btn-auth btn-auth-accent" style={{ marginTop: 6 }} disabled={loading}>
      {loading ? 'Creando cuenta...' : 'Empezar prueba gratis · 21 días'}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>

    <div className="auth-divider">
      <span>o registrarse con</span>
    </div>
    <OAuthRow onGoogleClick={onGoogleClick} />
  </form>
)

// ---- Phone mockup for right panel ----
const PhSvg = ({ children, size = 16 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
)

const PhoneTabBar = ({ active }: { active: string }) => (
  <div className="ph-tabbar">
    <div className={`ph-tab ${active === 'home' ? 'on' : ''}`}>
      <PhSvg size={16}><path d="M3 19h18"/><path d="M5 15l4-5 4 3 6-8"/><path d="M14 5h5v5"/></PhSvg>
    </div>
    <div className={`ph-tab ${active === 'cal' ? 'on' : ''}`}>
      <PhSvg size={16}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/></PhSvg>
    </div>
    <div className={`ph-tab ph-tab-fab ${active === 'ai' ? 'on' : ''}`}>
      <PhSvg size={18}><path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z"/></PhSvg>
    </div>
    <div className={`ph-tab ${active === 'pay' ? 'on' : ''}`}>
      <PhSvg size={16}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none"/></PhSvg>
    </div>
    <div className={`ph-tab ${active === 'users' ? 'on' : ''}`}>
      <PhSvg size={16}><circle cx="9" cy="8" r="3"/><path d="M3 19c.5-3 3-5 6-5s5.5 2 6 5"/></PhSvg>
    </div>
  </div>
)

const PhoneHome = () => (
  <div className="ph-screen ph-home">
    <div className="ph-status">
      <span>9:41</span>
      <span className="ph-status-icons">
        <svg width="12" height="8" viewBox="0 0 14 9" fill="currentColor"><rect x="0" y="6" width="2" height="3" rx=".4"/><rect x="3" y="4" width="2" height="5" rx=".4"/><rect x="6" y="2" width="2" height="7" rx=".4"/><rect x="9" y="0" width="2" height="9" rx=".4"/></svg>
        <svg width="18" height="9" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth=".8"><rect x=".4" y=".4" width="18" height="9.2" rx="2"/><rect x="2" y="2" width="12" height="6" rx="1" fill="currentColor"/></svg>
      </span>
    </div>
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
    <div className="ph-section-title">
      <span>Próximo turno</span>
      <span className="ph-section-link">Ver agenda</span>
    </div>
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
      <div className="ph-quick">
        <div className="ph-quick-ico" style={{ background: '#FFE9E5', color: '#E55A45' }}>
          <PhSvg size={13}><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/></PhSvg>
        </div>
        <div className="ph-quick-label">Facturar</div>
      </div>
      <div className="ph-quick">
        <div className="ph-quick-ico" style={{ background: '#E8ECF8', color: '#3F519E' }}>
          <PhSvg size={13}><path d="M9 5a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8c0 1.2.7 2.2 1.8 2.7A3 3 0 0 0 9 18a3 3 0 0 0 3-1.5"/><path d="M15 5a3 3 0 0 1 3 3v1a3 3 0 0 1 2 2.8c0 1.2-.7 2.2-1.8 2.7A3 3 0 0 1 15 18a3 3 0 0 1-3-1.5"/><path d="M12 5v13"/></PhSvg>
        </div>
        <div className="ph-quick-label">Informe IA</div>
      </div>
      <div className="ph-quick">
        <div className="ph-quick-ico" style={{ background: '#E5F5EC', color: '#3D9C6B' }}>
          <PhSvg size={13}><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none"/></PhSvg>
        </div>
        <div className="ph-quick-label">Cobrar</div>
      </div>
    </div>
    <PhoneTabBar active="home" />
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

// Main Split Editorial component
function AuthSplitInner({ defaultMode = 'login' }: { defaultMode?: 'login' | 'register' }) {
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')

  const [mode, setMode] = useState<'login' | 'register'>(defaultMode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showResendLink, setShowResendLink] = useState(false)

  const [loginForm, setLoginForm] = useState({ email: '', password: '', rememberMe: false })
  const [registerForm, setRegisterForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    especialidad: '',
    password: '',
    matricula: '',
    acceptTerms: false,
  })

  useEffect(() => {
    // Limpiar cualquier sesión/token inválido al cargar el login
    const clearInvalidSession = async () => {
      const supabase = createClient()
      try {
        const { error } = await supabase.auth.getSession()
        if (error) {
          await supabase.auth.signOut()
        }
      } catch {
        // Ignorar errores silenciosamente
      }
    }
    clearInvalidSession()
  }, [])

  async function handleResendConfirmation() {
    const supabase = createClient()
    await supabase.auth.resend({ type: 'signup', email: loginForm.email })
    setError('Te reenviamos el email de confirmación.')
    setShowResendLink(false)
  }

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setShowResendLink(false)
    setLoading(true)

    if (!loginForm.email.trim()) {
      setError('Ingresá tu email.')
      setLoading(false)
      return
    }
    if (!loginForm.password.trim()) {
      setError('Ingresá tu contraseña.')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    })

    if (signInError) {
      if (
        signInError.message?.includes('Email not confirmed') ||
        (signInError as { code?: string }).code === 'email_not_confirmed'
      ) {
        setError('Confirmá tu email antes de ingresar. Revisá tu casilla.')
        setShowResendLink(true)
        setLoading(false)
        return
      }
      setError('Email o contraseña incorrectos.')
      setLoading(false)
      return
    }

    // Wait for session to be established, then redirect
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      window.location.href = `${APP_URL}/`
    } else {
      setError('No se pudo establecer la sesión. Intenta de nuevo.')
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${APP_URL}/auth/callback`,
      },
    })
  }

  async function handleGoogleRegister() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${APP_URL}/auth/callback?new=true`,
      },
    })
  }

  async function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (registerForm.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (!registerForm.acceptTerms) {
      setError('Debes aceptar los términos y la política de privacidad.')
      return
    }

    setLoading(true)
    track('sign_up_attempt', { form_source: 'auth_split', reason: undefined })

    try {
      const response = await fetch('https://app.klia.com.ar/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registerForm.email,
          password: registerForm.password,
          nombre: registerForm.nombre,
          apellido: registerForm.apellido,
          especialidad: registerForm.especialidad || null,
          matricula: registerForm.matricula || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const reason = data.error === 'already_registered'
          ? 'email_already_exists'
          : response.status === 400
          ? 'invalid_password'
          : 'unknown_error'
        track('sign_up_failed', { form_source: 'auth_split', reason })
        setError(
          data.error === 'already_registered'
            ? 'Ya existe una cuenta con ese email. Intentá iniciar sesión.'
            : data.error || 'Error al crear la cuenta. Intentá de nuevo.'
        )
        return
      }

      track('sign_up', { form_source: 'auth_split', reason: undefined })
      setSuccess(true)
    } catch {
      track('sign_up_failed', { form_source: 'auth_split', reason: 'unknown_error' })
      setError('No pudimos conectar con el servidor. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-split">
        {/* LEFT — form */}
        <div className="auth-split-form">
          <div className="auth-split-form-top">
            <Link href="/" className="auth-logo" aria-label="Klia">
              <Image src="/klia-logo.png" alt="Klia" width={120} height={36} style={{ height: '56px', width: 'auto' }} />
            </Link>
            <Link href="/" className="auth-back">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Inicio
            </Link>
          </div>

          <div className="auth-split-form-body">
            {urlError === 'auth_callback_error' && (
              <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', color: '#92400E', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.5', marginBottom: '8px' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>El link de confirmación expiró o ya fue usado.</strong>
                Intentá iniciar sesión con tu email y contraseña. Si no recordás la contraseña,{' '}
                <a href="https://app.klia.com.ar/recuperar" style={{ color: '#92400E', textDecoration: 'underline' }}>
                  recuperala acá
                </a>
                .
              </div>
            )}
            {success ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#D5EFDF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg style={{ color: '#3D9C6B', width: 32, height: 32 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="auth-heading">¡Cuenta creada!</h2>
                <p className="auth-sub" style={{ textAlign: 'center' }}>
                  Te enviamos un email de confirmación a
                </p>
                <p style={{ fontWeight: 600, fontSize: '14px', marginTop: '8px', marginBottom: '16px' }}>{registerForm.email}</p>
                <p className="auth-sub" style={{ textAlign: 'center' }}>
                  Revisá tu bandeja de entrada (y la carpeta de spam). Al confirmar, accedés directo a Klia.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <AuthTabs mode={mode} setMode={setMode} />
                  <h1 className="auth-heading" style={{ marginTop: '18px' }}>
                    {mode === 'login' ? (
                      <>
                        Volvé a tu<span style={{ color: 'var(--klia)', fontFamily: 'var(--font-instrument-serif), Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}> consultorio</span>
                      </>
                    ) : (
                      <>
                        Creá tu cuenta<span style={{ color: 'var(--klia)', fontFamily: 'var(--font-instrument-serif), Georgia, serif', fontStyle: 'italic', fontWeight: 400 }}> gratis</span>
                      </>
                    )}
                  </h1>
                  <p className="auth-sub">
                    {mode === 'login' ? 'Tu agenda, cobros e informes te esperan.' : '21 días gratis. Sin tarjeta. Cancelás cuando quieras.'}
                  </p>
                </div>

                {mode === 'login' ? (
                  <LoginForm loading={loading} error={error} showResendLink={showResendLink} onResend={handleResendConfirmation} onSubmit={handleLoginSubmit} form={loginForm} setForm={setLoginForm} onGoogleClick={handleGoogleLogin} />
                ) : (
                  <RegisterForm loading={loading} error={error} onSubmit={handleRegisterSubmit} form={registerForm} setForm={setRegisterForm} onGoogleClick={handleGoogleRegister} />
                )}

                <div className="auth-footer-text">
                  {mode === 'login' ? (
                    <>
                      ¿Sos nuevo en Klia?{' '}
                      <a href="#" onClick={(e) => { e.preventDefault(); setMode('register') }}>
                        Crear cuenta gratis
                      </a>
                    </>
                  ) : (
                    <>
                      ¿Ya tenés cuenta?{' '}
                      <a href="#" onClick={(e) => { e.preventDefault(); setMode('login') }}>
                        Ingresar
                      </a>
                    </>
                  )}
                </div>

                {mode === 'register' && <TrustStrip />}
              </>
            )}
          </div>

          <div className="auth-split-form-foot">
            <a href="/privacidad">Privacidad</a>
            <a href="/terminos">Términos</a>
          </div>
        </div>

        {/* RIGHT — editorial visual */}
        <div className="auth-split-visual">
          <div className="auth-split-visual-grid" />
          <div className="auth-split-visual-inner">
            <div className="auth-split-eyebrow">Testimonios</div>

            <blockquote className="auth-split-quote">
              «Pasé de facturar a la madrugada a tener todo <span className="serif-it">listo en segundos</span> al cerrar la sesión.»
            </blockquote>

            <div className="auth-split-author">
              <div className="auth-split-author-avatar">MR</div>
              <div>
                <div className="auth-split-author-name">Mariana Rey</div>
                <div className="auth-split-author-role">Psicóloga clínica · MN 47.812</div>
              </div>
            </div>

            <div className="auth-split-stage">
              <div className="auth-split-callout auth-split-callout-1">
                <div className="auth-split-callout-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div>
                  <strong>Factura C emitida</strong>
                  <span>ARCA · 8 segundos</span>
                </div>
              </div>

              <div className="auth-split-callout auth-split-callout-2">
                <div className="auth-split-callout-ico">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <strong>$ 18.500 acreditado</strong>
                  <span>Mercado Pago</span>
                </div>
              </div>

              <div className="auth-split-stage-phone">
                <PhoneFrame scale={0.85}><PhoneHome /></PhoneFrame>
              </div>
            </div>

            <div className="auth-split-stats">
              <div>
                <div className="auth-split-stat-num">1.300+</div>
                <div className="auth-split-stat-lbl">Profesionales</div>
              </div>
              <div>
                <div className="auth-split-stat-num">8 seg</div>
                <div className="auth-split-stat-lbl">Por factura</div>
              </div>
              <div>
                <div className="auth-split-stat-num">4,9 ★</div>
                <div className="auth-split-stat-lbl">Valoración</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AuthSplit({ defaultMode }: { defaultMode?: 'login' | 'register' }) {
  return (
    <Suspense fallback={null}>
      <AuthSplitInner defaultMode={defaultMode} />
    </Suspense>
  )
}
