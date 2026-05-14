import { ArrowRight } from '@/components/ui/Icons'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.klia.com.ar'

export default function CTAFinal() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-container mx-auto px-7">
        <div
          className="relative rounded-[32px] overflow-hidden isolate reveal"
          style={{ background: 'linear-gradient(135deg, #1A2257 0%, #2F3F82 60%, #3F519E 100%)' }}
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 100% at 30% 50%, black 30%, transparent 80%)',
              maskImage: 'radial-gradient(ellipse 80% 100% at 30% 50%, black 30%, transparent 80%)',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 p-16 lg:p-20 lg:pb-0 items-end">
            <div className="relative z-10 pb-16 lg:pb-20">
              <div
                className="eyebrow mb-5"
                style={{ color: 'rgba(255,255,255,.85)', borderColor: 'transparent' }}
              >
                <span style={{ background: 'rgba(255,255,255,.6)' }} />
                Empezá hoy
              </div>

              <h2
                className="h-display mb-6"
                style={{ color: '#fff', maxWidth: '14ch', lineHeight: 0.96 }}
              >
                Recuperá tu tiempo.{' '}
                <span className="serif-it" style={{ color: '#FFC8BD' }}>Empezá hoy.</span>
              </h2>

              <p className="lead mb-9" style={{ color: 'rgba(255,255,255,.78)', maxWidth: '52ch' }}>
                21 días de prueba sin tarjeta. Sin permanencia. Migramos tus pacientes y tu agenda actual sin que muevas un dedo.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href={`${APP_URL}/registro`} className="btn btn-coral btn-lg">
                  Empezar gratis <ArrowRight size={16} />
                </a>
                <a
                  href="https://wa.me/5491165939115"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg"
                  style={{
                    background: 'rgba(255,255,255,.1)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Hablar con ventas
                </a>
              </div>
            </div>

            {/* Phone visual */}
            <div className="relative z-10 flex items-end justify-center">
              <div
                style={{
                  width: 200, height: 380,
                  background: '#0E1430',
                  borderRadius: 32,
                  border: '5px solid #1A2257',
                  overflow: 'hidden',
                  boxShadow: '0 -20px 60px rgba(0,0,0,.3)',
                }}
              >
                <div style={{ height: 24, background: '#0E1430', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: 70, height: 20, background: '#0E1430',
                    borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                  }} />
                </div>
                <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>Informe generado</div>
                  <div style={{
                    background: 'rgba(140,110,216,.25)', border: '1px solid rgba(140,110,216,.4)',
                    borderRadius: 10, padding: 10,
                  }}>
                    <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 8, marginBottom: 4 }}>IA · 8 segundos</div>
                    <div style={{ color: 'rgba(255,255,255,.85)', fontSize: 9, lineHeight: 1.5 }}>
                      Sesión N° 14. La paciente reporta avances en regulación emocional. Se observa mayor tolerancia...
                    </div>
                  </div>
                  <div style={{
                    background: '#3F519E', borderRadius: 8, padding: '8px 10px',
                    color: '#fff', fontSize: 10, fontWeight: 600, textAlign: 'center',
                  }}>Exportar informe PDF</div>
                  <div style={{ color: 'rgba(255,255,255,.6)', fontSize: 8, textAlign: 'center' }}>
                    Bajo tu firma · Listo para presentar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
