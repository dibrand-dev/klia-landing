'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { ESPECIALIDADES } from '@/lib/especialidades'

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
    <button type="button" className="oauth-btn">
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
      ARCA · facturación
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
  onSubmit: (e: React.FormEvent) => void
  form: LoginData
  setForm: (form: LoginData) => void
  onGoogleClick: () => void
}

// Login form
const LoginForm = ({ loading, error, onSubmit, form, setForm, onGoogleClick }: LoginFormProps) => (
  <form className="auth-form" onSubmit={onSubmit}>
    {error && <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#991B1B', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>{error}</div>}

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
        <a href="#recuperar" style={{ cursor: 'pointer' }}>
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
        <input id="mat" className="input" type="text" placeholder="MN 12.345" onChange={(e) => setForm({ ...form, matricula: e.target.value })} />
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

// Main Split Editorial component
export default function AuthSplit() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    })

    if (signInError) {
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
    setLoading(false)

    if (!response.ok) {
      setError(
        data.error === 'already_registered'
          ? 'Ya existe una cuenta con ese email. Intentá iniciar sesión.'
          : data.error || 'Error al crear la cuenta. Intentá de nuevo.'
      )
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="auth-shell">
        <div className="auth-split">
          <div className="auth-split-form">
            <div className="auth-split-form-top">
              <Link href="/" className="auth-logo" aria-label="Klia">
                <Image src="/klia-logo.png" alt="Klia" width={120} height={36} style={{ height: '56px', width: 'auto' }} />
              </Link>
            </div>
            <div className="auth-split-form-body" style={{ margin: '0 auto' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#D5EFDF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg className="w-8 h-8" style={{ color: '#3D9C6B', width: '32px', height: '32px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="auth-heading">¡Cuenta creada!</h2>
                <p className="auth-sub" style={{ textAlign: 'center' }}>
                  Te enviamos un email de confirmación a
                </p>
                <p style={{ fontWeight: 600, fontSize: '14px', marginTop: '8px' }}>{registerForm.email}</p>
                <p className="auth-sub" style={{ textAlign: 'center', marginTop: '16px' }}>
                  Revisá tu bandeja de entrada (y la carpeta de spam). Al confirmar, accedés directo a Klia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
              <LoginForm loading={loading} error={error} onSubmit={handleLoginSubmit} form={loginForm} setForm={setLoginForm} onGoogleClick={handleGoogleLogin} />
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
