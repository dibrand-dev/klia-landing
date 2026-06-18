'use client'

import { useState, useRef, useEffect } from 'react'
import { Icons } from '@/components/Icons'
import { FAQ_BLOCKS, type FaqBlockData, type FaqQuestion } from './faqData'

const PILLS = [
  { label: 'Antes de empezar', anchor: '#antes-de-empezar' },
  { label: 'Planes y precios', anchor: '#planes-y-precios' },
  { label: 'Obras sociales',   anchor: '#obras-sociales' },
  { label: 'Mis datos',        anchor: '#mis-datos' },
  { label: 'Integraciones',    anchor: '#integraciones' },
]

const PlusIcon = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"/>
  </svg>
)

function renderAnswer(text: string) {
  const parts = text.split(/(\S+@\S+\.\S+)/g)
  return parts.map((part, i) => {
    if (/^\S+@\S+\.\S+$/.test(part)) {
      const clean = part.replace(/[.,;]+$/, '')
      const trailing = part.slice(clean.length)
      return (
        <span key={i}>
          <a href={`mailto:${clean}`} className="faq-answer-link">{clean}</a>{trailing}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function FaqItem({ item, isOpen, onToggle }: { item: FaqQuestion; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const [maxH, setMaxH] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (bodyRef.current) setMaxH(bodyRef.current.scrollHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [item.a])

  return (
    <div className={`faq-item${isOpen ? ' faq-item-open' : ''}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-q-text">{item.q}</span>
        <span className="faq-q-icon" aria-hidden="true">
          <PlusIcon size={19} />
        </span>
      </button>
      <div className="faq-a-wrap" style={{ maxHeight: isOpen ? maxH : 0 }}>
        <div className="faq-a" ref={bodyRef}>
          <p className="faq-a-text">{renderAnswer(item.a)}</p>
        </div>
      </div>
    </div>
  )
}

function FaqBlock({ block }: { block: FaqBlockData }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id={block.id} className={`faq-block${block.altBg ? ' faq-block-alt' : ''}`}>
      <div className="container">
        <div className="faq-block-inner">
          <header className="faq-block-head">
            <span className="eyebrow faq-block-eyebrow">{block.eyebrow}</span>
            <h2 className="h-2 faq-block-title">
              {block.title[0]}<span className="serif-it">{block.title[1]}</span>
            </h2>
          </header>

          <div className="faq-list">
            {block.questions.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqHero() {
  const handlePill = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault()
    const el = document.querySelector(anchor)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 92
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <section className="faq-hero">
      <div className="faq-grid-bg" aria-hidden />
      <div className="container">
        <div className="faq-hero-inner">
          <span className="faq-eyebrow-wrap">
            <span className="eyebrow">PREGUNTAS FRECUENTES · KLIA.COM.AR</span>
          </span>
          <h1 className="h-display faq-h1">
            Todo lo que querés saber{' '}
            <span className="serif-it" style={{ color: 'var(--klia)' }}>antes de empezar.</span>
          </h1>
          <p className="faq-lead">
            Reunimos las dudas más comunes de profesionales de la salud que están
            evaluando KLIA. Si tu pregunta no está acá, escribinos a{' '}
            <a href="mailto:hola@klia.com.ar" className="faq-inline-link">hola@klia.com.ar</a>
          </p>
        </div>

        <div className="faq-pills-strip">
          <div className="faq-pills">
            {PILLS.map(p => (
              <a
                key={p.anchor}
                href={p.anchor}
                className="faq-pill"
                onClick={e => handlePill(e, p.anchor)}
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqCTA() {
  return (
    <section className="faq-cta">
      <div className="container">
        <div className="faq-cta-inner">
          <h2 className="h-2 faq-cta-title">¿Todavía tenés dudas? Hablemos.</h2>
          <p className="faq-cta-lead">
            Escribinos a{' '}
            <a href="mailto:hola@klia.com.ar" style={{ color: 'rgba(255,255,255,.85)', textDecoration: 'underline' }}>
              hola@klia.com.ar
            </a>
            {' '}o empezá el trial y lo descubrís vos mismo — 21 días gratis, sin tarjeta.
          </p>
          <div className="faq-cta-btns">
            <a href="https://app.klia.com.ar/registro" className="btn btn-coral btn-lg">
              Empezar gratis <Icons.Arrow size={16} />
            </a>
            <a href="mailto:hola@klia.com.ar" className="btn btn-ghost-light btn-lg">
              Escribirnos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function FaqContent() {
  return (
    <>
      <FaqHero />
      {FAQ_BLOCKS.map(block => (
        <FaqBlock key={block.id} block={block} />
      ))}
      <FaqCTA />
    </>
  )
}
