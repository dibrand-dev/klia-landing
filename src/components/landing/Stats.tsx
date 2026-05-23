const STATS = [
  { num: '84%',  label: 'de los profesionales pierden cobros por errores en liquidaciones de Obras Sociales.' },
  { num: '79%',  label: 'del tiempo extra se consume redactando informes evolutivos y pericias.' },
  { num: '63%',  label: 'de los especialistas dedican más de una hora mensual a preparar resúmenes clínicos antes de cada sesión.' },
  { num: '8 seg',label: 'promedio para generar un borrador técnico de informe con nuestra IA.' },
]

export default function Stats() {
  return (
    <section className="py-20 border-y border-line bg-bg-alt">
      <div className="max-w-container mx-auto px-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="reveal"
              style={{ transitionDelay: `${i * 80}ms`, borderLeft: i === 0 ? 'none' : '1px solid var(--line)', paddingLeft: i === 0 ? 0 : 24 }}
            >
              <div
                className="h-display mb-3.5"
                style={{ fontSize: 'clamp(40px, 4.4vw, 64px)', color: '#3F519E', lineHeight: 1 }}
              >
                {s.num}
              </div>
              <div className="text-sm text-slate leading-snug max-w-[24ch]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
