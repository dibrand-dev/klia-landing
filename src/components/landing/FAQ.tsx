'use client'

import { useState } from 'react'
import { Plus, Minus, Chat } from '@/components/ui/Icons'

const ITEMS = [
  {
    q: '¿Necesito conocimientos contables para usar Klia?',
    a: 'No. Klia se conecta con ARCA y emite los comprobantes según tu condición fiscal.',
  },
  {
    q: '¿Qué pasa con mi información clínica? ¿Es segura?',
    a: 'Sí. Cifrado de extremo a extremo, backups encriptados en Argentina y cumplimiento estricto de la Ley 25.326 de Protección de Datos Personales. Vos sos dueño de tu información: la podés exportar o eliminar cuando quieras.',
  },
  {
    q: '¿Cómo funciona el cobro con Mercado Pago?',
    a: 'Generás un QR dinámico o un link de pago en un toque. El paciente paga desde su celular y vos ves la acreditación al instante. Tenemos tasa preferencial Klia: la más baja del mercado para profesionales independientes.',
  },
  {
    q: '¿Los informes con IA están aprobados para uso clínico?',
    a: 'Klia genera borradores siguiendo el formato de tu colegio profesional. Vos editás y firmás antes de archivar — el informe final siempre es tuyo. Trabajamos con un modelo afinado en lenguaje terapéutico, no IA genérica.',
  },
  {
    q: '¿Puedo migrar desde mi sistema actual?',
    a: 'Sí. Importamos pacientes, agenda y plantillas desde Excel, Google Calendar, Doctoralia y la mayoría de sistemas habituales. La migración es gratis y la hace nuestro equipo, sin que muevas un dedo.',
  },
  {
    q: '¿Funciona si trabajo en clínica con varios profesionales?',
    a: 'Klia tiene plan multi-profesional con roles, agendas compartidas y reportes consolidados. Cada uno mantiene su espacio privado, y la coordinación tiene visibilidad de todo el equipo.',
  },
  {
    q: '¿Cuánto cuesta? ¿Hay permanencia?',
    a: 'Sin permanencia, sin tarjeta para empezar y 21 días gratis. Los planes para clínicas escalan según cantidad de profesionales — escribinos y armamos uno a medida.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="max-w-container mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20 items-start">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow mb-4 reveal">Preguntas frecuentes</div>
            <h2 className="h-2 reveal reveal-d1" style={{ color: '#0E1430', marginTop: 14 }}>
              Lo que solemos responder antes.
            </h2>
            <p className="lead reveal reveal-d2 mt-6">
              ¿No encontrás tu pregunta? Escribinos por WhatsApp y te contestamos en menos de una hora.
            </p>
            <a
              href="https://wa.me/5491100000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-6 reveal reveal-d3 inline-flex"
            >
              <Chat size={16} /> Hablar con el equipo
            </a>
          </div>

          {/* Right accordion */}
          <div>
            {ITEMS.map((it, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  className="border-b border-line reveal"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <button
                    className="w-full flex justify-between items-center gap-6 py-6 text-left"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span
                      style={{
                        fontFamily: 'Geist, system-ui',
                        fontSize: 'clamp(18px, 1.4vw, 22px)',
                        fontWeight: 500,
                        letterSpacing: '-0.015em',
                        color: isOpen ? '#3F519E' : '#0E1430',
                        transition: 'color .2s ease',
                      }}
                    >
                      {it.q}
                    </span>
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        background: isOpen ? '#3F519E' : '#F7F8FB',
                        color: isOpen ? '#fff' : '#3F519E',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                      }}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows .35s cubic-bezier(.2,.8,.2,1)',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <div
                        className="text-slate text-sm leading-relaxed"
                        style={{ paddingBottom: isOpen ? 24 : 0 }}
                      >
                        {it.a}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
