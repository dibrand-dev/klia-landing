import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import { Phone } from '@/components/ui/Icons'
import NutriCta from './NutriCta'
import {
  IconBowl, IconChart, IconShare, IconCalendarGreen, IconWallet,
  IconMic, IconSparkle, IconReceipt, IconCheckSmall, IconSearch,
} from './nutri-icons'
import './nutricionistas.css'

const TITLE = 'Klia para nutricionistas: planes alimentarios, antropometría y agenda'
const DESCRIPTION = 'Armá planes alimentarios por comidas, seguí la antropometría de tus pacientes y gestioná turnos, cobros y obras sociales en un solo lugar, con 21 días gratis.'
const OG_IMAGE = {
  url: 'https://www.klia.com.ar/nutricionistas/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Klia para nutricionistas — Planes alimentarios, antropometría y agenda',
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.klia.com.ar/nutricionistas' },
  openGraph: {
    url: 'https://www.klia.com.ar/nutricionistas',
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="nutri-list-ico"><IconCheckSmall /></span>
      <span>{children}</span>
    </li>
  )
}

export default function NutricionistasPage() {
  return (
    <>
      <Nav />
      <main className="nutri-page">

        {/* Hero */}
        <section className="nutri-hero">
          <div className="container">
            <div className="nutri-row">
              <div className="nutri-col">
                <div className="eyebrow">Para nutricionistas en Argentina</div>
                <h1 className="h-display" style={{ color: '#0E1430' }}>
                  Planes alimentarios listos para tu paciente, <em className="serif-it">sin planillas.</em>
                </h1>
                <p className="lead">
                  Armá el plan por comidas, seguí la antropometría y la evolución de cada paciente, y compartilo en PDF o por link. Además de agenda, cobros y obras sociales en el mismo lugar.
                </p>
                <div className="nutri-cta-row">
                  <NutriCta source="hero" className="btn btn-accent btn-lg">Probar 21 días gratis</NutriCta>
                  <a href="#modulos" className="btn btn-ghost btn-lg">Ver los módulos</a>
                </div>
                <div className="nutri-fineprint">21 días gratis, sin tarjeta de crédito.</div>
              </div>
              <div className="nutri-visual">
                <div className="nutri-mock">
                  <div className="nutri-mock-head">
                    <div>
                      <div className="nutri-mock-eyebrow">PLAN ALIMENTARIO</div>
                      <div className="nutri-mock-title">Plan semanal de ejemplo</div>
                    </div>
                    <span className="nutri-sample-tag">Datos de ejemplo</span>
                  </div>
                  <div className="nutri-macro-row">
                    <div className="nutri-macro">
                      <div className="nutri-macro-label"><span>Proteínas</span><span>25%</span></div>
                      <div className="nutri-macro-bar"><div className="nutri-macro-fill" style={{ width: '25%', background: '#3F519E' }} /></div>
                    </div>
                    <div className="nutri-macro">
                      <div className="nutri-macro-label"><span>Carbohidratos</span><span>50%</span></div>
                      <div className="nutri-macro-bar"><div className="nutri-macro-fill" style={{ width: '50%', background: '#FF7A66' }} /></div>
                    </div>
                    <div className="nutri-macro">
                      <div className="nutri-macro-label"><span>Grasas</span><span>25%</span></div>
                      <div className="nutri-macro-bar"><div className="nutri-macro-fill" style={{ width: '25%', background: '#8C6ED8' }} /></div>
                    </div>
                  </div>
                  {[
                    ['Desayuno', 'Yogur natural, avena, banana', '320 kcal'],
                    ['Almuerzo', 'Pollo grillado, arroz integral, ensalada', '610 kcal'],
                    ['Merienda', 'Tostada integral con palta', '240 kcal'],
                    ['Cena', 'Tortilla de verduras, ensalada mixta', '480 kcal'],
                  ].map(([name, detail, kcal]) => (
                    <div className="nutri-meal" key={name}>
                      <div style={{ minWidth: 0 }}>
                        <div className="nutri-meal-name">{name}</div>
                        <div className="nutri-meal-detail">{detail}</div>
                      </div>
                      <div className="nutri-meal-kcal">{kcal}</div>
                    </div>
                  ))}
                  <div className="nutri-total-row"><span>Total del día</span><span>1.650 kcal</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Módulos de nutrición */}
        <section className="nutri-section" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <div id="modulos" className="nutri-head">
              <div className="eyebrow">Módulos de nutrición</div>
              <h2 className="h-2" style={{ color: '#0E1430' }}>
                Todo lo que usás en la consulta, <em className="serif-it">conectado.</em>
              </h2>
            </div>
            <div className="nutri-grid">
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: 'var(--klia-50)', color: 'var(--klia)' }}><IconBowl /></div>
                <h3>Plan alimentario por comidas</h3>
                <p>Cargá alimentos desde el vademécum y obtené macros y calorías automáticos por comida, por día y en promedio.</p>
              </div>
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: 'var(--klia-50)', color: 'var(--klia)' }}><IconChart /></div>
                <h3>Antropometría y evolución</h3>
                <p>Registrá peso, pliegues y perímetros. Calculá IMC y gasto energético basal y mirá la evolución en gráficos.</p>
              </div>
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: '#FFF1EE', color: 'var(--coral)' }}><IconShare /></div>
                <h3>Plan en PDF y link compartible</h3>
                <p>Exportá el plan con tu logo y matrícula, o compartí un link con vencimiento por WhatsApp.</p>
              </div>
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: '#F1EBFC', color: '#8C6ED8' }}><Phone size={22} /></div>
                <h3>Portal del paciente</h3>
                <p>Tu paciente ve su plan, registra cada comida con foto y recibe tus comentarios.</p>
              </div>
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: '#E5F5EC', color: '#3D9C6B' }}><IconCalendarGreen /></div>
                <h3>Agenda que no pierde pacientes</h3>
                <p>Klia avisa a tus pacientes antes de cada turno con recordatorios automáticos por email y por WhatsApp, para que no se olviden y no pierdas consultas. Turnos sincronizados con Google Calendar y link público de reservas.</p>
              </div>
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: 'var(--klia-50)', color: 'var(--klia)' }}><IconWallet /></div>
                <h3>Cobros y obras sociales</h3>
                <p>Cobrá con Mercado Pago, llevá la deuda por paciente y liquidá tus sesiones a obras sociales.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Plan alimentario */}
        <section className="nutri-section" style={{ background: '#fff' }}>
          <div className="container">
            <div className="nutri-row">
              <div className="nutri-col">
                <div className="eyebrow">Plan alimentario</div>
                <h2 className="h-2" style={{ color: '#0E1430' }}>
                  Armalo una vez, <em className="serif-it">ajustalo </em>cuando haga falta.
                </h2>
                <p className="lead">
                  El editor organiza el plan por comidas y calcula los macronutrientes mientras cargás. Elegí alimentos del vademécum, definí cantidades y mirá el total por día y el promedio de la semana.
                </p>
                <ul className="nutri-list">
                  <CheckItem>Vademécum de alimentos con calorías y macronutrientes</CheckItem>
                  <CheckItem>Distribución de macros y calorías por comida y por día</CheckItem>
                  <CheckItem>Plan exportable en PDF con tu logo y matrícula</CheckItem>
                </ul>
              </div>
              <div className="nutri-visual">
                <div className="nutri-mock secondary">
                  <div className="nutri-mock-head">
                    <div className="nutri-mock-title" style={{ marginTop: 0 }}>Agregar alimento</div>
                    <span className="nutri-sample-tag">Datos de ejemplo</span>
                  </div>
                  <div className="nutri-food-search"><IconSearch />Buscar en el vademécum</div>
                  {[
                    ['Avena arrollada', 'P 17 g · C 66 g · G 7 g', '100 g', '389 kcal'],
                    ['Yogur natural', 'P 3 g · C 5 g · G 3 g', '100 g', '61 kcal'],
                    ['Banana', 'P 1 g · C 23 g · G 0 g', '1 unidad', '89 kcal'],
                  ].map(([name, macros, qty, kcal]) => (
                    <div className="nutri-food-row" key={name}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="nutri-food-name">{name}</div>
                        <div className="nutri-food-macros">{macros}</div>
                      </div>
                      <div className="nutri-food-qty">{qty}</div>
                      <div className="nutri-food-kcal">{kcal}</div>
                      <span className="nutri-food-add" aria-hidden="true">+</span>
                    </div>
                  ))}
                  <div className="nutri-food-foot">Los macros y las calorías se suman al plan mientras cargás.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Antropometría */}
        <section className="nutri-section" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <div className="nutri-row reverse">
              <div className="nutri-col">
                <div className="eyebrow">Antropometría</div>
                <h2 className="h-2" style={{ color: '#0E1430' }}>
                  La evolución de tu paciente, <em className="serif-it">visible.</em>
                </h2>
                <p className="lead">
                  Cada consulta suma un registro. Klia calcula IMC y gasto energético basal con las fórmulas que ya usás y arma los gráficos para que compares consultas sin tocar una planilla.
                </p>
                <ul className="nutri-list">
                  <CheckItem>IMC y gasto energético basal (Mifflin y Harris-Benedict)</CheckItem>
                  <CheckItem>Pliegues, perímetros y composición corporal</CheckItem>
                  <CheckItem>Gráficos de evolución por paciente</CheckItem>
                </ul>
              </div>
              <div className="nutri-visual">
                <div className="nutri-mock secondary">
                  <div className="nutri-mock-head">
                    <div className="nutri-mock-title" style={{ marginTop: 0 }}>Composición corporal</div>
                    <span className="nutri-sample-tag">Datos de ejemplo</span>
                  </div>
                  <div className="nutri-stat-row">
                    <div className="nutri-stat-tile">
                      <div className="nutri-stat-label">IMC</div>
                      <div className="nutri-stat-value">24,1</div>
                    </div>
                    <div className="nutri-stat-tile">
                      <div className="nutri-stat-label">GEB</div>
                      <div className="nutri-stat-value">1.480<span className="nutri-stat-unit"> kcal</span></div>
                    </div>
                    <div className="nutri-stat-tile">
                      <div className="nutri-stat-label">Peso</div>
                      <div className="nutri-stat-value">68,5<span className="nutri-stat-unit"> kg</span></div>
                    </div>
                  </div>
                  <svg viewBox="0 0 440 150" width="100%" role="img" aria-label="Gráfico de evolución del peso de ejemplo" style={{ display: 'block' }}>
                    <g stroke="var(--line)" strokeWidth="1"><path d="M0 30h440M0 75h440M0 120h440" /></g>
                    <path d="M10 40C70 48 110 62 170 70S290 96 340 100 410 112 430 114" fill="none" stroke="var(--klia)" strokeWidth="3" strokeLinecap="round" />
                    <g fill="#fff" stroke="var(--klia)" strokeWidth="2.5">
                      <circle cx="10" cy="40" r="5" /><circle cx="170" cy="70" r="5" /><circle cx="340" cy="100" r="5" /><circle cx="430" cy="114" r="5" />
                    </g>
                  </svg>
                  <div className="nutri-chart-labels"><span>Consulta 1</span><span>Consulta 2</span><span>Consulta 3</span><span>Consulta 4</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portal del paciente */}
        <section className="nutri-section" style={{ background: '#fff' }}>
          <div className="container">
            <div className="nutri-row">
              <div className="nutri-col">
                <div className="eyebrow nutri-eyebrow-purple">Portal del paciente</div>
                <h2 className="h-2" style={{ color: '#0E1430' }}>
                  Tu paciente registra, <em className="serif-it" style={{ color: '#8C6ED8' }}>vos acompañás.</em>
                </h2>
                <p className="lead">
                  Desde el celular, tu paciente ve el plan del día y registra cada comida con foto, incluso sin conexión. Vos ves cómo viene y le dejás comentarios.
                </p>
                <ul className="nutri-list">
                  <CheckItem>Registro de comidas con foto</CheckItem>
                  <CheckItem>Comentarios del profesional sobre cada registro</CheckItem>
                  <CheckItem>Disponible en los planes Profesional y Premium</CheckItem>
                </ul>
              </div>
              <div className="nutri-visual">
                <div className="nutri-phone">
                  <div className="nutri-phone-inner">
                    <div className="nutri-phone-eyebrow">HOY</div>
                    <div className="nutri-phone-title">Tu plan de hoy</div>
                    <div className="nutri-meal-row">
                      <div className="nutri-meal-icon"><IconBowl size={18} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="nutri-meal-row-name">Desayuno</div>
                        <div className="nutri-meal-row-status">Registrado con foto</div>
                      </div>
                      <IconCheckSmall size={16} />
                    </div>
                    <div className="nutri-meal-row">
                      <div className="nutri-meal-icon"><IconBowl size={18} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="nutri-meal-row-name">Almuerzo</div>
                        <div className="nutri-meal-row-status">Registrado con foto</div>
                      </div>
                      <IconCheckSmall size={16} />
                    </div>
                    <div className="nutri-meal-row pending">
                      <div className="nutri-meal-icon"><IconBowl size={18} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="nutri-meal-row-name">Merienda</div>
                        <div className="nutri-meal-row-status">Pendiente de registro</div>
                      </div>
                    </div>
                    <div className="nutri-comment-box"><b style={{ fontWeight: 600 }}>Comentario de tu nutricionista</b><br />Ejemplo de mensaje que ves acá.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gestión del consultorio */}
        <section className="nutri-section" style={{ background: 'var(--bg-alt)' }}>
          <div className="container">
            <div className="nutri-head">
              <div className="eyebrow">Gestión del consultorio</div>
              <h2 className="h-2" style={{ color: '#0E1430' }}>
                Menos administración, <em className="serif-it">más consulta.</em>
              </h2>
            </div>
            <div className="nutri-grid">
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: '#F1EBFC', color: '#8C6ED8' }}><IconMic /></div>
                <h3>Notas de voz con IA</h3>
                <p>Dictá la consulta y obtené la transcripción para tu historia clínica.</p>
              </div>
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: '#F1EBFC', color: '#8C6ED8' }}><IconSparkle /></div>
                <h3>Atenciones del día con IA</h3>
                <p>Un resumen de tus atenciones del día, listo para revisar.</p>
              </div>
              <div className="card nutri-card">
                <div className="nutri-card-ico" style={{ background: 'var(--klia-50)', color: 'var(--klia)' }}><IconReceipt /></div>
                <h3>Liquidación de obras sociales</h3>
                <p>Declará tus sesiones y generá la liquidación para tus obras sociales.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Cómo empezar */}
        <section className="nutri-section" style={{ background: '#fff' }}>
          <div className="container">
            <div className="nutri-head tight">
              <div className="eyebrow">Cómo empezar</div>
              <h2 className="h-2" style={{ color: '#0E1430' }}>
                Probalo <em className="serif-it">21 días</em> sin costo.
              </h2>
            </div>
            <div className="nutri-steps">
              <div className="nutri-step">
                <div className="nutri-step-num">01</div>
                <h3>Creá tu cuenta</h3>
                <p>Registrate con tu email y elegí Nutrición como especialidad.</p>
              </div>
              <div className="nutri-step">
                <div className="nutri-step-num">02</div>
                <h3>Cargá tu primer paciente</h3>
                <p>Sumá sus datos y registrá la primera antropometría.</p>
              </div>
              <div className="nutri-step">
                <div className="nutri-step-num">03</div>
                <h3>Armá y compartí el plan</h3>
                <p>Generá el plan alimentario y envialo en PDF o por link.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="nutri-cta">
          <div className="container">
            <div className="nutri-cta-inner">
              <h2 className="nutri-cta-title">
                Dedicale tu tiempo a tus pacientes, <em className="serif-it" style={{ color: 'var(--coral)' }}>no a las planillas.</em>
              </h2>
              <p className="nutri-cta-lead">Empezá con 21 días gratis y armá tu primer plan alimentario hoy.</p>
              <NutriCta source="cta_final" className="btn btn-coral btn-lg">Probar 21 días gratis</NutriCta>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
