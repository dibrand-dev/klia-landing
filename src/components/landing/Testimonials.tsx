'use client'

import { useRef, useState, useEffect } from 'react'
import { Quote, ArrowRight } from '@/components/ui/Icons'

const ITEMS = [
  {
    quote: 'Pasé de dedicar dos tardes por mes a la administración a cero. Klia me devolvió tiempo para mí y para más pacientes.',
    name: 'Dra. Lucía Méndez', role: 'Psicóloga clínica · Buenos Aires',
    bg: '#FFD3CC', ini: 'LM',
  },
  {
    quote: 'La facturación ARCA siempre fue mi pesadilla. Hoy la hago sin pensar: la sesión termina y la factura ya está enviada.',
    name: 'Lic. Martín Rodríguez', role: 'Kinesiólogo · Córdoba',
    bg: '#D6E0F5', ini: 'MR',
  },
  {
    quote: 'Cobramos el 92% de las sesiones en el día. Antes corríamos atrás de transferencias. Klia cambió cómo trabajamos.',
    name: 'Sofía Castro', role: 'Directora · Centro Equilibrio',
    bg: '#D5EFDF', ini: 'SC',
  },
  {
    quote: 'Los informes con IA son sorprendentemente buenos. Edito menos del 10% y tengo todo el formato profesional listo.',
    name: 'Dra. Julieta Lema', role: 'Nutricionista · Rosario',
    bg: '#FFF1D6', ini: 'JL',
  },
  {
    quote: 'Migrar fue un día. Soporte humano, sin scripts. Hoy mis cinco profesionales trabajan desde la misma plataforma.',
    name: 'Diego Paredes', role: 'Coordinador · Clínica Vivere',
    bg: '#E8DAFF', ini: 'DP',
  },
]

export default function Testimonials() {
  const railRef = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)

  const scrollTo = (i: number) => {
    if (!railRef.current) return
    const card = railRef.current.children[i] as HTMLElement
    if (!card) return
    railRef.current.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
    setIdx(i)
  }

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % ITEMS.length
        const card = railRef.current?.children[next] as HTMLElement | undefined
        if (card && railRef.current) {
          railRef.current.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
        }
        return next
      })
    }, 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="py-32 bg-bg-alt border-y border-line">
      {/* Header in container */}
      <div className="max-w-container mx-auto px-7">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="eyebrow mb-4 reveal">Testimonios</div>
            <h2 className="h-2 reveal reveal-d1" style={{ color: '#0E1430', maxWidth: '18ch' }}>
              Profesionales que ya volvieron a tener tardes libres.
            </h2>
          </div>
          <div className="hidden md:flex gap-2 flex-shrink-0">
            <button
              onClick={() => scrollTo(Math.max(0, idx - 1))}
              className="w-11 h-11 rounded-full border border-line bg-white flex items-center justify-center text-ink hover:bg-klia hover:text-white hover:border-klia transition-colors"
              aria-label="Anterior"
            >
              <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button
              onClick={() => scrollTo(Math.min(ITEMS.length - 1, idx + 1))}
              className="w-11 h-11 rounded-full border border-line bg-white flex items-center justify-center text-ink hover:bg-klia hover:text-white hover:border-klia transition-colors"
              aria-label="Siguiente"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed rail */}
      <div
        ref={railRef}
        className="flex gap-5 px-7 pb-7 overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        {ITEMS.map((it, i) => (
          <div
            key={i}
            className="card flex-none w-[460px] max-w-[86vw] p-9 flex flex-col reveal"
            style={{ transitionDelay: `${i * 40}ms`, scrollSnapAlign: 'center' }}
          >
            <div style={{ color: '#3F519E', opacity: .85 }}><Quote size={26} /></div>
            <p
              className="mt-4 mb-7 flex-1"
              style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontSize: 22, fontWeight: 500, lineHeight: 1.35, letterSpacing: '-0.015em', color: '#0E1430' }}
            >
              {it.quote}
            </p>
            <div className="flex items-center gap-3.5 mt-auto">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-ink font-semibold text-sm flex-shrink-0"
                style={{ background: it.bg }}
              >
                {it.ini}
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{it.name}</div>
                <div className="text-xs text-slate mt-0.5">{it.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="max-w-container mx-auto px-7">
        <div className="flex gap-2 justify-center mt-6">
          {ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: idx === i ? 24 : 8,
                background: idx === i ? '#3F519E' : '#E5E7EF',
                border: 'none',
              }}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
