'use client'

import { useRef, useState, useEffect } from 'react'
import { Quote, ArrowRight } from '@/components/ui/Icons'
import type { TestimonioItem } from '@/lib/testimonios'

const ITEMS_FALLBACK: TestimonioItem[] = [
  {
    id: '1',
    quote: 'Pasé de dedicar dos tardes por mes a la administración a cero. Klia me devolvió tiempo para mí y para más pacientes.',
    nombre: 'Dra. Lucía Méndez', rol: 'Psicóloga clínica · Buenos Aires',
    color_bg: '#FFD3CC', iniciales: 'LM', avatar_url: null, orden: 1,
  },
  {
    id: '2',
    quote: 'Antes llegaba a cada sesión sin contexto. Ahora Klia me genera el resumen clínico antes de que entre el paciente. Es un cambio enorme.',
    nombre: 'Lic. Martín Rodríguez', rol: 'Kinesiólogo · Córdoba',
    color_bg: '#D6E0F5', iniciales: 'MR', avatar_url: null, orden: 2,
  },
  {
    id: '3',
    quote: 'Cobramos el 92% de las sesiones en el día. Antes corríamos atrás de transferencias. Klia cambió cómo trabajamos.',
    nombre: 'Sofía Castro', rol: 'Directora · Centro Equilibrio',
    color_bg: '#D5EFDF', iniciales: 'SC', avatar_url: null, orden: 3,
  },
  {
    id: '4',
    quote: 'Los informes con IA son sorprendentemente buenos. Edito menos del 10% y tengo todo el formato profesional listo.',
    nombre: 'Dra. Julieta Lema', rol: 'Nutricionista · Rosario',
    color_bg: '#FFF1D6', iniciales: 'JL', avatar_url: null, orden: 4,
  },
  {
    id: '5',
    quote: 'Migrar fue un día. Soporte humano, sin scripts. Hoy mis cinco profesionales trabajan desde la misma plataforma.',
    nombre: 'Diego Paredes', rol: 'Coordinador · Clínica Vivere',
    color_bg: '#E8DAFF', iniciales: 'DP', avatar_url: null, orden: 5,
  },
]

export default function Testimonials({ items }: { items?: TestimonioItem[] }) {
  const data = (items && items.length > 0) ? items : ITEMS_FALLBACK

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
        const next = (prev + 1) % data.length
        const card = railRef.current?.children[next] as HTMLElement | undefined
        if (card && railRef.current) {
          railRef.current.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
        }
        return next
      })
    }, 5500)
    return () => clearInterval(id)
  }, [data.length])

  return (
    <section className="py-32 bg-bg-alt border-y border-line">
      {/* Header in container */}
      <div className="max-w-container mx-auto px-7">
        <div className="flex justify-between items-end mb-16">
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
              onClick={() => scrollTo(Math.min(data.length - 1, idx + 1))}
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
        {data.map((it, i) => (
          <div
            key={it.id}
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
              {it.avatar_url ? (
                <img
                  src={it.avatar_url}
                  alt={it.nombre}
                  width={44}
                  height={44}
                  className="rounded-full object-cover flex-shrink-0"
                  style={{ width: 44, height: 44 }}
                />
              ) : (
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-ink font-semibold text-sm flex-shrink-0"
                  style={{ background: it.color_bg }}
                >
                  {it.iniciales}
                </div>
              )}
              <div>
                <div className="text-sm font-semibold text-ink">{it.nombre}</div>
                <div className="text-xs text-slate mt-0.5">{it.rol}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="max-w-container mx-auto px-7">
        <div className="flex gap-2 justify-center mt-6">
          {data.map((_, i) => (
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
