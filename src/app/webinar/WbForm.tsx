'use client'

import React, { useEffect, useRef, useState } from 'react'
import { WbIco } from './wb-icons'
import { WEBINAR_ESPECIALIDADES } from '@/lib/webinars/especialidades'
import { WB_COUNTRIES, WB_Q1, WB_Q2, WB_Q2_SYS, WB_Q3, WB_Q4 } from '@/lib/webinars/utils'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.klia.com.ar'

type FormValues = {
  name: string
  inst: string
  email: string
  cc: string
  phone: string
  spec: string
  q1: string
  q2: string
  q2txt: string
  q3: string[]
  q3txt: string
  q4: string
  consent: boolean
}

const EMPTY: FormValues = { name: '', inst: '', email: '', cc: '+54', phone: '', spec: '', q1: '', q2: '', q2txt: '', q3: [], q3txt: '', q4: '', consent: false }

const LABELS: Record<string, string> = { name: 'Nombre y apellido', email: 'Correo', phone: 'Teléfono móvil', spec: 'Especialidad', q1: 'Pacientes por mes', q2: 'Herramienta que usás', q2txt: 'Sistema de gestión', q3: 'Dolores de cabeza', q3txt: 'Otro dolor de cabeza', q4: 'Cómo trabajás', consent: 'Política de Privacidad' }

type Errors = Partial<Record<keyof FormValues, string>>

function validate(v: FormValues): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 3) e.name = 'Ingresá tu nombre y apellido'
  if (!v.email.trim()) e.email = 'Ingresá tu correo'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Revisá el formato del correo (ej: nombre@dominio.com)'
  const digits = v.phone.replace(/\D/g, '')
  if (!digits) e.phone = 'Ingresá tu teléfono móvil'
  else if (digits.length < 8) e.phone = 'Revisá el número: ingresalo con código de área'
  if (!v.spec) e.spec = 'Elegí tu especialidad'
  if (!v.q1) e.q1 = 'Elegí una opción'
  if (!v.q2) e.q2 = 'Elegí una opción'
  else if (v.q2 === WB_Q2_SYS && !v.q2txt.trim()) e.q2txt = 'Contanos qué sistema usás'
  if (!v.q3.length) e.q3 = 'Elegí al menos una opción'
  else if (v.q3.includes('Otro') && !v.q3txt.trim()) e.q3txt = 'Contanos cuál es'
  if (!v.q4) e.q4 = 'Elegí una opción'
  if (!v.consent) e.consent = 'Para inscribirte, necesitás aceptar la Política de Privacidad'
  return e
}

function getUtm(): Record<string, string> | undefined {
  if (typeof window === 'undefined') return undefined
  const params = new URLSearchParams(window.location.search)
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
  const utm: Record<string, string> = {}
  let found = false
  for (const k of keys) {
    const val = params.get(k)
    if (val) { utm[k] = val; found = true }
  }
  return found ? utm : undefined
}

function WbErr({ id, msg }: { id: string; msg?: string }) {
  return msg ? <div className="wb-err" id={id}><WbIco n="alert" s={15} /><span>{msg}</span></div> : null
}

function WbCombo({ id, value, onChange, invalid, describedBy, disabled }: {
  id: string; value: string; onChange: (v: string) => void; invalid: boolean; describedBy?: string; disabled?: boolean
}) {
  const [q, setQ] = useState(value)
  const [open, setOpen] = useState(false)
  const [act, setAct] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => { if (!open) setQ(value) }, [value, open])

  const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  const list = WEBINAR_ESPECIALIDADES.filter((s) => norm(s).includes(norm(q === value ? '' : q)))

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const pick = (s: string) => { onChange(s); setQ(s); setOpen(false) }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) setOpen(true); setAct((a) => Math.min(a + 1, list.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setAct((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter' && open) { e.preventDefault(); if (list[act]) pick(list[act]) }
    else if (e.key === 'Escape') { setOpen(false); setQ(value) }
  }

  useEffect(() => {
    const el = ref.current?.querySelector('.is-active')
    if (el && el.parentElement) {
      const p = el.parentElement
      const top = (el as HTMLElement).offsetTop
      const h = (el as HTMLElement).offsetHeight
      if (top < p.scrollTop) p.scrollTop = top
      else if (top + h > p.scrollTop + p.clientHeight) p.scrollTop = top + h - p.clientHeight
    }
  }, [act, open])

  return (
    <div className="wb-combo" ref={ref}>
      <input id={id} className="wb-input" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={id + '-list'}
        aria-activedescendant={open && list[act] ? `${id}-o${act}` : undefined} aria-invalid={invalid || undefined} aria-describedby={describedBy} aria-required="true"
        placeholder="Buscá tu especialidad" autoComplete="off" value={q} disabled={disabled}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setAct(0); if (value) onChange('') }}
        onFocus={() => setOpen(true)} onClick={() => setOpen(true)} onKeyDown={onKey} />
      <button type="button" className="wb-combo-btn" tabIndex={-1} aria-hidden="true" onClick={() => setOpen(!open)} disabled={disabled}><WbIco n="chev" s={18} /></button>
      {open && (
        <ul className="wb-list" id={id + '-list'} role="listbox" aria-label="Especialidades">
          {list.length ? list.map((s, i) => (
            <li key={s} id={`${id}-o${i}`} role="option" aria-selected={s === value} className={i === act ? 'is-active' : ''}
              onMouseDown={(e) => e.preventDefault()} onClick={() => pick(s)} onMouseEnter={() => setAct(i)}>
              <span>{s}</span>{s === value && <WbIco n="check" s={16} />}
            </li>
          )) : <li className="wb-none" role="option" aria-disabled="true" aria-selected="false">Sin resultados para &quot;{q}&quot;</li>}
        </ul>
      )}
    </div>
  )
}

function WbText({ uid, k, label, opt, type = 'text', v, set, err, blur, maxLength }: {
  uid: string; k: keyof FormValues; label: string; opt?: boolean; type?: string
  v: FormValues; set: (k: keyof FormValues, val: string) => void; err: Errors; blur?: (k: keyof FormValues) => void; maxLength?: number
}) {
  return (
    <div className="wb-field">
      <label className="wb-label" htmlFor={`${uid}-${k}`}>{label}{opt && <small>(opcional)</small>}</label>
      <input id={`${uid}-${k}`} className="wb-input" type={type} value={v[k] as string} maxLength={maxLength}
        onChange={(e) => set(k, e.target.value)} onBlur={() => blur && blur(k)}
        aria-invalid={err[k] ? true : undefined} aria-describedby={err[k] ? `${uid}-${k}-err` : undefined} aria-required={opt ? undefined : 'true'} />
      <WbErr id={`${uid}-${k}-err`} msg={err[k]} />
    </div>
  )
}

function WbRadioQ({ uid, k, n, title, opts, v, set, err, pills, children }: {
  uid: string; k: keyof FormValues; n: string; title: string; opts: string[]
  v: FormValues; set: (k: keyof FormValues, val: string) => void; err: Errors; pills?: boolean
  children?: (o: string) => React.ReactNode
}) {
  return (
    <fieldset className="wb-q" aria-invalid={err[k] ? true : undefined} aria-describedby={err[k] ? `${uid}-${k}-err` : undefined} id={`${uid}-${k}`} tabIndex={-1}>
      <legend><span className="n">{n}</span><span>{title}</span></legend>
      <div className={'wb-opts' + (pills ? ' pills' : '')} role="radiogroup" aria-required="true">
        {opts.map((o) => (
          <React.Fragment key={o}>
            <label className="wb-opt"><input type="radio" name={`${uid}-${k}`} value={o} checked={v[k] === o} onChange={() => set(k, o)} /><span>{o}</span></label>
            {children && children(o)}
          </React.Fragment>
        ))}
      </div>
      <WbErr id={`${uid}-${k}-err`} msg={err[k]} />
    </fieldset>
  )
}

export type WbFormDone = { email: string; already: boolean; meetUrl: string; webinar: { titulo: string; fecha_inicio: string; duracion_min: number } }

type Status = 'idle' | 'sending' | 'server' | 'rate_limited'

export default function WbForm({ uid = 'f', slug, onDone, onClosedOrEnded }: {
  uid?: string
  slug: string
  onDone: (d: WbFormDone) => void
  onClosedOrEnded: (kind: 'cerrado' | 'finalizado') => void
}) {
  const [v, setV] = useState<FormValues>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [showAll, setShowAll] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [serverFieldErrors, setServerFieldErrors] = useState<Errors>({})
  const sumRef = useRef<HTMLDivElement>(null)

  const all = { ...validate(v), ...serverFieldErrors }
  const err: Errors = showAll ? all : Object.fromEntries(Object.entries(all).filter(([k]) => touched[k as keyof FormValues])) as Errors
  const set = (k: keyof FormValues, val: string) => { setV((p) => ({ ...p, [k]: val })); setServerFieldErrors((p) => ({ ...p, [k]: undefined })) }
  const blur = (k: keyof FormValues) => setTouched((t) => ({ ...t, [k]: true }))
  const sending = status === 'sending'
  const toggle3 = (o: string) => setV((p) => ({ ...p, q3: p.q3.includes(o) ? p.q3.filter((x) => x !== o) : p.q3.length < 3 ? [...p.q3, o] : p.q3 }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const localErrors = validate(v)
    if (Object.keys(localErrors).length) {
      setShowAll(true); setStatus('idle')
      setTimeout(() => sumRef.current?.focus(), 0)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(`${APP_URL}/api/webinars/${slug}/inscribir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_apellido: v.name.trim(),
          institucion: v.inst.trim() || undefined,
          email: v.email.trim(),
          cc: v.cc,
          telefono: v.phone.trim(),
          especialidad: v.spec,
          q1: v.q1,
          q2: v.q2,
          q2txt: v.q2 === WB_Q2_SYS ? v.q2txt.trim() : undefined,
          q3: v.q3,
          q3txt: v.q3.includes('Otro') ? v.q3txt.trim() : undefined,
          q4: v.q4,
          consentimiento: true,
          hp: '',
          utm: getUtm(),
        }),
      })

      if (res.status === 200) {
        const data = await res.json()
        onDone({ email: v.email.trim(), already: !!data.already, meetUrl: data.meet_url, webinar: data.webinar })
        return
      }
      if (res.status === 400) {
        const data = await res.json()
        setServerFieldErrors(data.campos || {})
        setShowAll(true)
        setStatus('idle')
        setTimeout(() => sumRef.current?.focus(), 0)
        return
      }
      if (res.status === 410) {
        const data = await res.json()
        onClosedOrEnded(data.error === 'finalizado' ? 'finalizado' : 'cerrado')
        return
      }
      if (res.status === 429) { setStatus('rate_limited'); return }
      setStatus('server')
    } catch {
      setStatus('server')
    }
  }

  const errKeys = Object.keys(err) as (keyof FormValues)[]
  const jump = (e: React.MouseEvent, k: keyof FormValues) => {
    e.preventDefault()
    const el = document.getElementById(`${uid}-${k}`)
    if (el) { const f = el.matches('fieldset') ? el.querySelector('input') : el; (f as HTMLElement || el).focus() }
  }

  return (
    <form className="wb-form" onSubmit={submit} noValidate aria-busy={sending}>
      <input type="text" name="hp" value="" onChange={() => {}} tabIndex={-1} autoComplete="off" className="wb-sr" aria-hidden="true" />

      {showAll && errKeys.length > 0 && (
        <div className="wb-alert" role="alert" tabIndex={-1} ref={sumRef}>
          <WbIco n="alert" s={18} />
          <div><b>Revisá {errKeys.length === 1 ? 'el campo marcado' : `los ${errKeys.length} campos marcados`} para continuar</b>
            <ul>{errKeys.map((k) => <li key={k}><a href={`#${uid}-${k}`} onClick={(e) => jump(e, k)}>{LABELS[k]}</a></li>)}</ul></div>
        </div>
      )}

      <fieldset disabled={sending} className="wb-sec">
        <h2 className="wb-sec-h"><span className="n">01</span>Tus datos</h2>
        <div className="wb-row">
          <WbText uid={uid} k="name" label="Nombre y apellido" v={v} set={set} err={err} blur={blur} maxLength={120} />
          <WbText uid={uid} k="inst" label="Institución" opt v={v} set={set} err={err} />
        </div>
        <div className="wb-row">
          <WbText uid={uid} k="email" label="Correo" type="email" v={v} set={set} err={err} blur={blur} />
          <div className="wb-field">
            <label className="wb-label" htmlFor={`${uid}-phone`}>Teléfono móvil</label>
            <div className="wb-phone">
              <select className="wb-select" aria-label="Código de país" value={v.cc} onChange={(e) => set('cc', e.target.value)}>
                {WB_COUNTRIES.map(([iso, c]) => <option key={iso} value={c}>{iso} {c}</option>)}
              </select>
              <input id={`${uid}-phone`} className="wb-input" type="tel" inputMode="tel" placeholder="11 2345 6789" value={v.phone}
                onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} aria-required="true"
                aria-invalid={err.phone ? true : undefined} aria-describedby={err.phone ? `${uid}-phone-err` : undefined} />
            </div>
            <WbErr id={`${uid}-phone-err`} msg={err.phone} />
          </div>
        </div>
        <div className="wb-field">
          <label className="wb-label" htmlFor={`${uid}-spec`}>Especialidad</label>
          <WbCombo id={`${uid}-spec`} value={v.spec} onChange={(s) => { set('spec', s); if (s) blur('spec') }} invalid={!!err.spec} describedBy={err.spec ? `${uid}-spec-err` : undefined} disabled={sending} />
          <WbErr id={`${uid}-spec-err`} msg={err.spec} />
        </div>
      </fieldset>

      <fieldset disabled={sending} className="wb-sec">
        <h2 className="wb-sec-h"><span className="n">02</span>Contanos un poco sobre vos</h2>
        <WbRadioQ uid={uid} k="q1" n="1." title="¿Cuántos pacientes atendés por mes, aproximadamente?" opts={WB_Q1} v={v} set={set} err={err} pills />
        <WbRadioQ uid={uid} k="q2" n="2." title="¿Usás o usaste alguna herramienta para organizar tu consultorio antes de este webinar?" opts={WB_Q2} v={v} set={set} err={err}>
          {(o) => o === WB_Q2_SYS && v.q2 === WB_Q2_SYS && <div className="wb-sub"><WbText uid={uid} k="q2txt" label="¿Cuál?" v={v} set={set} err={err} blur={blur} maxLength={60} /></div>}
        </WbRadioQ>
        <fieldset className="wb-q" id={`${uid}-q3`} tabIndex={-1} aria-invalid={err.q3 ? true : undefined} aria-describedby={`${uid}-q3-hint${err.q3 ? ` ${uid}-q3-err` : ''}`}>
          <legend><span className="n">3.</span><span>¿Cuáles son hoy tus mayores dolores de cabeza en el día a día?</span></legend>
          <div className="wb-qhead">
            <span className="wb-hint" id={`${uid}-q3-hint`}>Elegí hasta 3</span>
            <span className={'wb-count' + (v.q3.length === 3 ? ' is-full' : '')} aria-live="polite">{v.q3.length} de 3</span>
          </div>
          <div className="wb-opts cols2">
            {WB_Q3.map((o) => {
              const on = v.q3.includes(o)
              return (
                <React.Fragment key={o}>
                  <label className="wb-opt"><input type="checkbox" checked={on} disabled={!on && v.q3.length >= 3} onChange={() => toggle3(o)} /><span>{o}</span></label>
                  {o === 'Otro' && on && <div className="wb-sub"><WbText uid={uid} k="q3txt" label="Contanos cuál" v={v} set={set} err={err} blur={blur} maxLength={120} /></div>}
                </React.Fragment>
              )
            })}
          </div>
          <WbErr id={`${uid}-q3-err`} msg={err.q3} />
        </fieldset>
        <WbRadioQ uid={uid} k="q4" n="4." title="¿Cómo trabajás actualmente?" opts={WB_Q4} v={v} set={set} err={err} />
      </fieldset>

      <div className="wb-submit">
        <div>
          <label className="wb-consent">
            <input id={`${uid}-consent`} type="checkbox" checked={v.consent} disabled={sending} onChange={(e) => setV((p) => ({ ...p, consent: e.target.checked }))} aria-required="true"
              aria-invalid={err.consent ? true : undefined} aria-describedby={err.consent ? `${uid}-consent-err` : undefined} />
            <span>Acepto la <a href="/privacidad" target="_blank" rel="noopener">Política de Privacidad</a> y recibir comunicaciones de KLIA sobre este webinar</span>
          </label>
          <div style={{ marginTop: 8 }}><WbErr id={`${uid}-consent-err`} msg={err.consent} /></div>
        </div>
        {status === 'server' && (
          <div className="wb-alert" role="alert"><WbIco n="alert" s={18} />
            <div><b>No pudimos completar tu inscripción</b>Hubo un problema de nuestro lado. Tus datos siguen cargados: probá de nuevo en unos minutos.</div></div>
        )}
        {status === 'rate_limited' && (
          <div className="wb-alert" role="alert"><WbIco n="alert" s={18} />
            <div><b>Demasiados intentos</b>Probá de nuevo en unos minutos.</div></div>
        )}
        <button type="submit" className={'btn btn-accent btn-lg wb-btn-block' + (sending ? ' is-loading' : '')} aria-disabled={sending || undefined}>
          {sending ? <><span className="wb-spin" aria-hidden="true"></span>Enviando…</> : <>Inscribirme gratis <WbIco n="arrow" s={16} /></>}
        </button>
        <span className="wb-sr" aria-live="polite">{sending ? 'Enviando tu inscripción' : ''}</span>
      </div>
    </form>
  )
}
