'use client'

import { useState } from 'react'
import { ESPECIALIDADES } from '@/lib/especialidades'
import { track } from '@/lib/analytics'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.klia.com.ar'

type FormData = {
  nombre: string
  apellido: string
  email: string
  especialidad: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const [form, setForm] = useState<FormData>({
    nombre: '', apellido: '', email: '', especialidad: '', password: '', confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (form.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    setLoading(true)
    track('sign_up_attempt', { form_source: 'register_form' })

    try {
      const response = await fetch('https://app.klia.com.ar/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          nombre: form.nombre,
          apellido: form.apellido,
          especialidad: form.especialidad || null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const reason = data.error === 'already_registered'
          ? 'email_already_exists'
          : response.status === 400
          ? 'invalid_password'
          : 'unknown_error'
        track('sign_up_failed', { form_source: 'register_form', reason })
        setError(
          data.error === 'already_registered'
            ? 'Ya existe una cuenta con ese email. Intentá iniciar sesión.'
            : data.error || 'Error al crear la cuenta. Intentá de nuevo.'
        )
        return
      }

      track('sign_up', { form_source: 'register_form' })
      setSuccess(true)
    } catch {
      track('sign_up_failed', { form_source: 'register_form', reason: 'unknown_error' })
      setError('No pudimos conectar con el servidor. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: '#D5EFDF' }}
        >
          <svg className="w-8 h-8" style={{ color: '#3D9C6B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', color: '#0E1430', letterSpacing: '-0.015em' }}>
          ¡Cuenta creada!
        </h2>
        <p className="text-sm mb-1" style={{ color: '#5A607A' }}>
          Te enviamos un email de confirmación a
        </p>
        <p className="font-semibold text-sm mb-6" style={{ color: '#0E1430' }}>{form.email}</p>
        <p className="text-sm" style={{ color: '#5A607A' }}>
          Revisá tu bandeja de entrada (y la carpeta de spam). Al confirmar, accedés directo a Klia.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1.5" style={{ color: '#0E1430' }}>
            Nombre
          </label>
          <input
            id="nombre" name="nombre" type="text" required
            value={form.nombre} onChange={handleChange}
            placeholder="María"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="apellido" className="block text-sm font-medium mb-1.5" style={{ color: '#0E1430' }}>
            Apellido
          </label>
          <input
            id="apellido" name="apellido" type="text" required
            value={form.apellido} onChange={handleChange}
            placeholder="García"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="especialidad" className="block text-sm font-medium mb-1.5" style={{ color: '#0E1430' }}>
          Especialidad
        </label>
        <select
          id="especialidad" name="especialidad" required
          value={form.especialidad} onChange={handleChange}
          className="input-field"
        >
          <option value="">Seleccioná tu especialidad…</option>
          {ESPECIALIDADES.map((esp) => (
            <option key={esp} value={esp}>{esp}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: '#0E1430' }}>
          Email profesional
        </label>
        <input
          id="email" name="email" type="email" required
          value={form.email} onChange={handleChange}
          placeholder="tu@email.com"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: '#0E1430' }}>
          Contraseña
        </label>
        <input
          id="password" name="password" type="password" required
          value={form.password} onChange={handleChange}
          placeholder="Mínimo 8 caracteres"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5" style={{ color: '#0E1430' }}>
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword" name="confirmPassword" type="password" required
          value={form.confirmPassword} onChange={handleChange}
          placeholder="Repetí la contraseña"
          className="input-field"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-accent w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontSize: 15 }}
      >
        {loading ? 'Creando cuenta…' : 'Crear cuenta gratis'}
      </button>

      <p className="text-center text-sm" style={{ color: '#5A607A' }}>
        ¿Ya tenés cuenta?{' '}
        <a
          href={`${APP_URL}/login`}
          className="font-medium hover:underline"
          style={{ color: '#3F519E' }}
        >
          Iniciá sesión
        </a>
      </p>
    </form>
  )
}
