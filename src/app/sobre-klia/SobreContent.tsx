'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Icons } from '@/components/Icons'

// ── Scroll reveal ─────────────────────────────────────────────────────────────
export function useSobreReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.sobre-reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function SobreHero() {
  return (
    <section className="sobre-hero">
      <div className="sobre-grid-bg" aria-hidden />
      <div className="sobre-blob sobre-blob-1" aria-hidden />
      <div className="sobre-blob sobre-blob-2" aria-hidden />
      <div className="container">
        <div className="sobre-hero-inner sobre-reveal">
          <span className="eyebrow sobre-eyebrow">SOBRE KLIA · KLIA.COM.AR</span>
          <h1 className="h-display sobre-h1">
            Una plataforma construida por quienes{' '}
            <span className="serif-it">escucharon el problema.</span>
          </h1>
          <p className="sobre-lead">
            KLIA no nació en una sala de reuniones. Nació en una charla de familia.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Sección 1 — El origen ─────────────────────────────────────────────────────
function SobreOrigen() {
  return (
    <section className="sobre-sec" id="origen">
      <div className="container">
        <div className="sobre-split">
          <div className="sobre-col-head sobre-reveal">
            <span className="eyebrow sobre-eyebrow">EL ORIGEN</span>
            <h2 className="sobre-h2">
              Todo empezó con una pregunta en la{' '}
              <span className="serif-it">mesa familiar.</span>
            </h2>
            <div className="sobre-body">
              <p>
                Norberto Riccitelli es desarrollador de software y fundador de Dibrand LLC,
                una empresa con más de 9 años creando soluciones SaaS. En su familia hay una
                psicóloga, una terapista ocupacional y una médica clínica. En una de esas
                charlas donde la conversación inevitablemente deriva al trabajo, el tema fue
                siempre el mismo: el tiempo que se pierde cada mes con las obras sociales.
              </p>
              <p>
                Cada obra social tiene su propio formulario de presentación, su propia forma
                de facturar, sus propios requisitos. IOMA pide una cosa, OSDE otra, Swiss
                Medical otra distinta. Un profesional independiente que atiende pacientes de
                tres obras sociales distintas tiene que aprender tres sistemas, mantener tres
                planillas y dedicar horas a un proceso que debería ser simple.
              </p>
              <p>
                Lo que más llamó la atención no fue la queja — fue la resignación.{' '}
                <em>&ldquo;Así es, no hay otra.&rdquo;</em>
              </p>
            </div>
          </div>

          <div className="sobre-quote sobre-reveal sd-1">
            <div className="sobre-quote-mark"><Icons.Quote size={36} /></div>
            <p className="sobre-quote-text">&ldquo;Así es, no hay otra.&rdquo;</p>
            <p className="sobre-quote-cap">
              Lo que escuchamos en cada consultorio antes de crear KLIA.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Sección 2 — La encuesta ───────────────────────────────────────────────────
function SobreEncuesta() {
  const stats = [
    { num: '80+', label: 'profesionales encuestados' },
    { num: '84%', label: 'registró un dolor real en tareas administrativas' },
    { num: '9+',  label: 'años de experiencia en desarrollo SaaS' },
  ]
  return (
    <section className="sobre-sec sobre-sec-alt" id="investigacion">
      <div className="container">
        <div className="sobre-split">
          <div className="sobre-col-head sobre-reveal">
            <span className="eyebrow sobre-eyebrow">LA INVESTIGACIÓN</span>
            <h2 className="sobre-h2">
              80 profesionales. Una{' '}
              <span className="serif-it">sola respuesta.</span>
            </h2>
            <div className="sobre-body">
              <p>
                Antes de escribir una sola línea de código, se hizo una encuesta a más de
                80 profesionales de la salud independientes en Argentina — psicólogos,
                kinesiólogos, médicos clínicos, nutricionistas, odontólogos, terapistas
                ocupacionales.
              </p>
              <p>
                El resultado fue contundente: el 84% registró un dolor real a la hora de
                gestionar las tareas administrativas de su consultorio. No una incomodidad
                menor — un problema que consume tiempo, energía y en muchos casos dinero
                que no cobran.
              </p>
              <p>
                La encuesta también reveló algo que los números de mercado no muestran: las
                alternativas existentes están pensadas para clínicas con personal
                administrativo y estructura de soporte. El profesional independiente que
                trabaja solo, alquila un consultorio y atiende entre 15 y 40 pacientes por
                semana no tiene un sistema diseñado para él.
              </p>
              <p>Eso era KLIA.</p>
            </div>
          </div>

          <div className="sobre-stats">
            {stats.map((s, i) => (
              <div key={s.num} className={`sobre-stat sobre-reveal sd-${i + 1}`}>
                <div className="sobre-stat-num">{s.num}</div>
                <div className="sobre-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Sección 3 — KLIA hoy ──────────────────────────────────────────────────────
function SobreHoy() {
  const data = [
    { Icon: Icons.Layers,  num: '20+',  label: 'módulos en producción' },
    { Icon: Icons.Users,   num: '5',    label: 'especialidades activas' },
    { Icon: Icons.MapPin,  num: '4',    label: 'ciudades con usuarios activos' },
    { Icon: Icons.Shield,  num: 'AAIP', label: 'Expediente EX-2026-51700917' },
  ]
  return (
    <section className="sobre-sec" id="hoy">
      <div className="container">
        <div className="sobre-centered sobre-reveal">
          <span className="eyebrow sobre-eyebrow">KLIA HOY</span>
          <h2 className="sobre-h2">
            Construida con los que{' '}
            <span className="serif-it">la usan.</span>
          </h2>
          <div className="sobre-centered-body">
            <p>
              KLIA se lanzó el 25 de mayo de 2026. Desde el primer día, el desarrollo
              estuvo guiado por el feedback de profesionales reales — no por suposiciones
              de producto.
            </p>
            <p>
              Hoy KLIA cuenta con psicólogos, terapistas ocupacionales, nutricionistas,
              odontólogos y médicos clínicos que usan la plataforma a diario y aportan su
              experiencia para mejorarla. Cada nueva función, cada ajuste de flujo, cada
              término que aparece en la interfaz pasó por la mirada de alguien que trabaja
              en un consultorio real.
            </p>
            <p>
              Eso generó algo que no estaba planificado pero que se convirtió en uno de los
              activos más valiosos de KLIA: una comunidad de profesionales con un objetivo
              en común — dedicar más tiempo a sus pacientes y menos al papeleo.
            </p>
          </div>
        </div>

        <div className="sobre-data-grid">
          {data.map(({ Icon, num, label }, i) => (
            <div key={label} className={`sobre-data sobre-reveal sd-${(i % 3) + 1}`}>
              <div className="sobre-data-ico"><Icon size={22} /></div>
              <div className="sobre-data-num">{num}</div>
              <div className="sobre-data-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Sección 4 — El equipo ─────────────────────────────────────────────────────
function SobreEquipo() {
  return (
    <section className="sobre-sec sobre-sec-alt" id="equipo">
      <div className="container">
        <div className="sobre-col-head sobre-reveal" style={{ textAlign: 'center' }}>
          <span className="eyebrow sobre-eyebrow">EL EQUIPO</span>
          <h2 className="sobre-h2" style={{ maxWidth: '18ch', margin: '0 auto 28px' }}>
            Las personas detrás{' '}
            <span className="serif-it">de KLIA.</span>
          </h2>
        </div>

        <div className="sobre-team-grid">
          <div className="sobre-team-card sobre-reveal sd-1">
            <div className="sobre-team-avatar" style={{ padding: 0, overflow: 'hidden' }}>
              <Image src="/norberto-riccitelli.jpg" alt="Norberto Riccitelli" width={64} height={64} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </div>
            <p className="sobre-team-name">Norberto Riccitelli</p>
            <p className="sobre-team-role">Fundador y CEO</p>
            <p className="sobre-team-desc">
              Desarrollador de software con más de 9 años liderando Dibrand LLC. Construyó
              KLIA desde la convicción de que la tecnología para profesionales de salud
              independientes en Argentina estaba atrasada — y que tenía las herramientas para
              cambiar eso.
            </p>
          </div>

          <div className="sobre-team-card sobre-reveal sd-2">
            <div className="sobre-team-avatar" style={{ padding: 0, overflow: 'hidden', background: '#fff' }}>
              <Image src="/dibrand-logo.png" alt="Dibrand LLC" width={64} height={64} style={{ objectFit: 'contain', width: '100%', height: '100%', padding: '4px' }} />
            </div>
            <p className="sobre-team-name">Dibrand LLC</p>
            <p className="sobre-team-role">Empresa desarrolladora</p>
            <p className="sobre-team-desc">
              La empresa detrás de KLIA. Con experiencia en productos digitales para distintos
              sectores, Dibrand aportó la arquitectura técnica, el equipo de desarrollo y la
              metodología para construir un producto que escala sin perder la simplicidad que
              los profesionales de salud necesitan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Sección 5 — Visión ────────────────────────────────────────────────────────
function SobreVision() {
  return (
    <section className="sobre-sec" id="vision">
      <div className="container">
        <div className="sobre-centered sobre-reveal">
          <span className="eyebrow sobre-eyebrow">LA VISIÓN</span>
          <h2 className="sobre-h2">
            Más automatización. Menos{' '}
            <span className="serif-it">papeleo.</span>
          </h2>
          <div className="sobre-centered-body">
            <p>
              KLIA está en sus primeros meses de vida y ya tiene claro hacia dónde va: más
              automatización, menos papeleo, y eventualmente acompañar a los profesionales
              argentinos que quieren expandir su práctica más allá de las fronteras del país.
            </p>
            <p>Los detalles los iremos contando a medida que lleguen.</p>
          </div>

          <div className="sobre-compliance">
            <span className="sobre-pill"><Icons.Lock size={14} /> Ley 25.326</span>
            <span className="sobre-pill"><Icons.Shield size={14} /> AAIP registrado</span>
            <span className="sobre-pill"><Icons.Globe size={14} /> HTTPS / TLS</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── CTA final ─────────────────────────────────────────────────────────────────
function SobreCta() {
  return (
    <section className="sobre-cta">
      <div className="container">
        <div className="sobre-cta-inner sobre-reveal">
          <h2 className="h-display sobre-cta-title" style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
            Probalo vos mismo.{' '}
            <span className="serif-it">21 días gratis.</span>
          </h2>
          <p className="sobre-cta-lead">
            Sin tarjeta de crédito. Sin permanencia. Con todo lo que necesitás para gestionar
            tu consultorio desde el primer día.
          </p>
          <div className="sobre-cta-btns">
            <a href="https://app.klia.com.ar/registro" className="btn btn-coral btn-lg">
              Empezar gratis <Icons.Arrow size={16} />
            </a>
            <a href="mailto:hola@klia.com.ar" className="btn-ghost-light">
              Hablar con el equipo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Root export ───────────────────────────────────────────────────────────────
export default function SobreContent() {
  useSobreReveal()
  return (
    <>
      <SobreHero />
      <SobreOrigen />
      <SobreEncuesta />
      <SobreHoy />
      <SobreEquipo />
      <SobreVision />
      <SobreCta />
    </>
  )
}
