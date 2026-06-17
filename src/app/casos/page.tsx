import type { Metadata } from 'next'
import Nav from '@/components/landing/Nav'
import Footer from '@/components/landing/Footer'
import { Icons } from '@/components/Icons'
import './casos.css'

export const metadata: Metadata = {
  title: 'Casos de uso · KLIA — Software para psicólogos, kinesiólogos, médicos y más',
  description: 'Descubrí cómo KLIA se adapta a tu especialidad. Casos reales de psicólogos, kinesiólogos, médicos clínicos, nutricionistas, odontólogos y terapistas ocupacionales en Argentina.',
  alternates: { canonical: 'https://www.klia.com.ar/casos' },
  openGraph: {
    url: 'https://www.klia.com.ar/casos',
    title: 'Casos de uso · KLIA — Software para psicólogos, kinesiólogos, médicos y más',
    description: 'Descubrí cómo KLIA se adapta a tu especialidad. Casos reales de psicólogos, kinesiólogos, médicos clínicos, nutricionistas, odontólogos y terapistas ocupacionales en Argentina.',
  },
}

// ─── Extra icons (page-specific) ─────────────────────────────────────────────
const Ico = ({ children, size = 22, stroke = 1.6 }: { children: React.ReactNode; size?: number; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const IconActivity = ({ size = 22 }: { size?: number }) => (
  <Ico size={size}><path d="M3 12h4l3-9 4 18 3-9h4"/></Ico>
)
const IconApple = ({ size = 22 }: { size?: number }) => (
  <Ico size={size}><path d="M12 20.5C8.1 20.5 5 17.4 5 13.4c0-3.9 3.1-7 7-7s7 3.1 7 7c0 4-3.1 7.1-7 7.1z"/><path d="M12 6.4c0-2.4 1.6-4 3.8-4.4"/></Ico>
)
const IconSmile = ({ size = 22 }: { size?: number }) => (
  <Ico size={size}><circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c.8 1.5 2 2.2 3.5 2.2s2.7-.7 3.5-2.2"/><circle cx="9.5" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="10" r="1" fill="currentColor" stroke="none"/></Ico>
)
const IconPuzzle = ({ size = 22 }: { size?: number }) => (
  <Ico size={size}><path d="M4 4h6v1.5a2 2 0 0 0 4 0V4h6v6h-1.5a2 2 0 0 0 0 4H20v6h-6v-1.5a2 2 0 0 0-4 0V20H4v-6h1.5a2 2 0 0 0 0-4H4z"/></Ico>
)

// ─── Types ────────────────────────────────────────────────────────────────────
interface CasoData {
  id: string
  numero: string
  specialty: string
  icon: React.ReactNode
  altBg: boolean
  profile: string
  sinKlia: string[]
  conKlia: string[]
  plan: 'prof' | 'premium'
  planLabel: string
  terminologia: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CASOS_DATA: CasoData[] = [
  {
    id: 'psicologia',
    numero: '01',
    specialty: 'Psicólogos y psiquiatras',
    icon: <Icons.Brain size={22} />,
    altBg: false,
    profile: 'Valentina — psicóloga clínica, 35 pacientes semanales, consultorio propio. Atiende OSDE y Swiss Medical; el resto particulares. Cobra en ARS y USD según el paciente.',
    sinKlia: [
      'Agenda en Google Calendar, notas en cuaderno físico',
      'Tres pacientes deben más de dos meses — no sabe cómo pedirles que paguen',
      'Escribe las notas de sesión de memoria al final del día',
      'Los cobros en USD los registra aparte en una planilla',
    ],
    conKlia: [
      'Aviso automático de deuda: el email le llega al paciente sin que ella intervenga — recuperó tres meses de deuda en las primeras semanas',
      'Dicta notas de voz al terminar cada sesión; Whisper las transcribe en español',
      'Lee el resumen clínico generado por Gemini antes de cada sesión en 8 segundos',
      'OSDE, Swiss Medical y particulares con circuitos de cobro separados',
      'Multi-moneda: ARS y USD registrados en la moneda correcta, sin mezclar',
    ],
    plan: 'prof',
    planLabel: 'Plan Profesional',
    terminologia: '"Sesión" — configurado automáticamente para psicología',
  },
  {
    id: 'kinesiologia',
    numero: '02',
    specialty: 'Kinesiólogos y fisioterapeutas',
    icon: <IconActivity size={22} />,
    altBg: true,
    profile: 'Martín — kinesiólogo, 32 sesiones semanales en Belgrano. Trabaja con IOMA, OSDE y Hospital Italiano. La mayoría de sus pacientes tienen turnos recurrentes semanales y quincenales.',
    sinKlia: [
      'Secretaria part-time maneja la agenda en papel',
      'Las planillas de IOMA y Hospital Italiano le consumen una tarde entera a fin de mes',
      'Los turnos recurrentes los carga manualmente cada vez',
      'Sin visibilidad clara de qué pacientes tienen deuda',
    ],
    conKlia: [
      'Turnos recurrentes (semanal, quincenal) creados una vez y replicados automáticamente',
      'Planilla de IOMA en 15 minutos con datos pre-cargados y firma incluida; igual para Hospital Italiano',
      'Motor genérico cubre OSDE y cualquier otra obra social que incorpore',
      'Recordatorios automáticos 24 hs antes redujeron sus inasistencias',
      'Cobros de particulares vía Mercado Pago, todo registrado',
    ],
    plan: 'prof',
    planLabel: 'Plan Profesional',
    terminologia: '"Sesión" — configurado automáticamente para kinesiología',
  },
  {
    id: 'medicina',
    numero: '03',
    specialty: 'Médicos clínicos y especialistas',
    icon: <Icons.Stethoscope size={22} />,
    altBg: false,
    profile: 'Claudia — médica clínica, 30 consultas semanales en consultorio compartido. Trabaja con PAMI, Galeno y Medifé. Necesita adjuntar estudios de laboratorio e imágenes a cada paciente.',
    sinKlia: [
      'Sistema viejo heredado del consultorio anterior',
      'Los estudios llegan por WhatsApp y los reenvía a su email para no perderlos',
      'Historia clínica en carpetas físicas',
      'PAMI, Galeno y Medifé liquidados por separado, cada uno con su propio proceso manual',
    ],
    conKlia: [
      'Historia clínica digital: evolución, diagnóstico y medicación en un solo lugar',
      'Estudios subidos desde la ficha al Google Drive de Claudia, organizados por categoría (Laboratorio, Imágenes, Documentos)',
      'PAMI, Galeno y Medifé liquidados con motor genérico — PDF con firma y sello',
      'Resumen clínico pre-consulta de Gemini adaptado al lenguaje médico',
      'Google Calendar sincronizado en ambas direcciones — consultas y compromisos personales en una vista',
    ],
    plan: 'prof',
    planLabel: 'Plan Profesional',
    terminologia: '"Consulta" — configurado automáticamente para clínica médica',
  },
  {
    id: 'nutricion',
    numero: '04',
    specialty: 'Nutricionistas',
    icon: <IconApple size={22} />,
    altBg: true,
    profile: 'Sofía — nutricionista, 25 pacientes activos. Atiende presencial y online; muchos son de otras provincias. Cobra sólo de forma particular, sin obras sociales.',
    sinKlia: [
      'Coordina turnos por WhatsApp, genera el link de Meet manualmente para cada sesión',
      'A veces olvida enviar el link antes de la videollamada',
      'Seguimiento de pagos en una libreta',
      'Sin forma de que pacientes de otras provincias reserven y paguen online',
    ],
    conKlia: [
      'Link público de reservas: pacientes de cualquier provincia agendan y pagan online sin intermediarios',
      'Google Meet generado automáticamente para cada sesión online — el link va en el recordatorio 24 hs antes',
      'Mercado Pago integrado: el paciente paga al reservar, el dinero va directo a la cuenta de Sofía',
      'Historial clínico centraliza la evolución entre sesiones',
      'Multi-moneda: pacientes del exterior pagan en USD',
    ],
    plan: 'premium',
    planLabel: 'Plan Premium',
    terminologia: '"Sesión" — configurado automáticamente para nutrición',
  },
  {
    id: 'odontologia',
    numero: '05',
    specialty: 'Odontólogos',
    icon: <IconSmile size={22} />,
    altBg: false,
    profile: 'Diego — odontólogo, consultorio propio en Rosario. 20 pacientes semanales, mix de particulares y Swiss Medical. Sus pacientes frecuentemente necesitan certificados de asistencia.',
    sinKlia: [
      'Agenda en papel, cobros anotados en el celular',
      'Certificados de asistencia escritos a mano o en Word cada vez',
      'Pacientes llaman para reservar turno — no hay opción online',
      'Sin separación clara entre cobros de Swiss Medical y particulares',
    ],
    conKlia: [
      'Link público de reservas muestra disponibilidad real — los pacientes reservan sin llamar',
      'Certificados de asistencia en PDF con membrete, datos del paciente y firma escaneada en segundos',
      'Cobros de Swiss Medical y particulares registrados por separado',
      'Mercado Pago para cobro online con link único por consulta',
      'Google Meet para consultas de seguimiento a distancia',
    ],
    plan: 'prof',
    planLabel: 'Plan Profesional',
    terminologia: '"Consulta" — configurado automáticamente para odontología',
  },
  {
    id: 'terapia-ocupacional',
    numero: '06',
    specialty: 'Terapistas Ocupacionales',
    icon: <IconPuzzle size={22} />,
    altBg: true,
    profile: 'Laura — terapista ocupacional, 20 pacientes activos en Mar del Plata. Trabaja principalmente con niños con trastornos del desarrollo. Coberturas: OSDE, Medifé y APROSS. Los padres coordinan los turnos y realizan los pagos.',
    sinKlia: [
      'Coordina turnos por WhatsApp con los padres — cambian seguido por horarios escolares',
      'Planillas de OSDE, Medifé y APROSS completadas a mano cada mes',
      'Sin registro ordenado de la evolución longitudinal de cada niño',
      'Padres sin opción de reservar ni pagar online',
    ],
    conKlia: [
      'Link público de reservas: los padres agendan según disponibilidad real, sin ir y venir por WhatsApp',
      'Turnos recurrentes semanales creados una vez y replicados automáticamente',
      'Historial clínico con editor rich text y notas de voz transcritas — seguimiento longitudinal ordenado',
      'Planillas de OSDE, Medifé y APROSS generadas con motor genérico en minutos',
      'Recordatorios 24 hs antes van al email de los padres — menos ausencias',
      'Mercado Pago: los padres pagan desde el celular',
    ],
    plan: 'prof',
    planLabel: 'Plan Profesional',
    terminologia: '"Sesión" — configurado automáticamente para terapia ocupacional',
  },
]

const PILLS = [
  { label: 'Psicología',          anchor: '#psicologia' },
  { label: 'Kinesiología',        anchor: '#kinesiologia' },
  { label: 'Medicina',            anchor: '#medicina' },
  { label: 'Nutrición',           anchor: '#nutricion' },
  { label: 'Odontología',         anchor: '#odontologia' },
  { label: 'Terapia Ocupacional', anchor: '#terapia-ocupacional' },
]

// ─── Components ───────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="casos-hero">
      <div className="casos-grid-bg" aria-hidden />
      <div className="container">
        <div className="casos-hero-inner">
          <span className="casos-eyebrow-wrap">
            <span className="eyebrow">CASOS DE USO · KLIA.COM.AR</span>
          </span>
          <h1 className="h-display casos-h1">
            KLIA se adapta a tu especialidad,{' '}
            <em className="serif-it" style={{ color: 'var(--klia)' }}>no al revés.</em>
          </h1>
          <p className="casos-lead">
            Psicólogos, kinesiólogos, médicos, nutricionistas, odontólogos y terapistas
            ocupacionales ya usan KLIA para gestionar su consultorio. Cada especialidad
            tiene su propio flujo, su propia terminología y sus propios módulos activos.
          </p>
        </div>

        <div className="casos-pills-strip">
          <div className="casos-pills">
            {PILLS.map(p => (
              <a key={p.anchor} href={p.anchor} className="casos-pill">
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CasoCard({ caso }: { caso: CasoData }) {
  return (
    <article id={caso.id} className={`caso-card${caso.altBg ? ' caso-card-alt' : ''}`}>
      <div className="caso-card-body">
        <div className="caso-top">
          <div className="caso-ico">{caso.icon}</div>
          <div className="caso-top-meta">
            <span className="caso-numero">Caso {caso.numero}</span>
            <h2 className="h-3 caso-specialty">{caso.specialty}</h2>
          </div>
        </div>

        <p className="caso-profile">{caso.profile}</p>

        <div className="caso-cols">
          <div className="caso-col caso-col-sin">
            <div className="caso-col-header">
              <Icons.X size={14} />
              <span className="caso-col-label">Sin KLIA</span>
            </div>
            <ul className="caso-list">
              {caso.sinKlia.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div className="caso-col caso-col-con">
            <div className="caso-col-header">
              <Icons.Check size={14} />
              <span className="caso-col-label">Con KLIA</span>
            </div>
            <ul className="caso-list">
              {caso.conKlia.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="caso-card-footer">
        <span className={`caso-plan-badge ${caso.plan}`}>{caso.planLabel}</span>
        <span className="caso-terminologia">Terminología: {caso.terminologia}</span>
      </div>
    </article>
  )
}

function CasosCTA() {
  return (
    <section className="casos-cta">
      <div className="container">
        <div className="casos-cta-inner">
          <h2 className="h-2 casos-cta-title">
            Tu especialidad ya tiene un lugar en KLIA.
          </h2>
          <p className="casos-cta-lead">
            21 días gratis para probarlo con tus pacientes reales.<br />
            Sin tarjeta de crédito. Sin permanencia.
          </p>
          <div className="casos-cta-btns">
            <a href="https://app.klia.com.ar/registro" className="btn btn-coral btn-lg">
              Empezar gratis <Icons.Arrow size={16} />
            </a>
            <a href="/precios" className="casos-btn-ghost-light">
              Ver planes
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CasosPage() {
  return (
    <>
      <Nav />
      <main className="casos-page">
        <Hero />
        <section className="casos-section">
          <div className="container">
            <div className="casos-stack">
              {CASOS_DATA.map(caso => (
                <CasoCard key={caso.id} caso={caso} />
              ))}
            </div>
          </div>
        </section>
        <CasosCTA />
      </main>
      <Footer />
    </>
  )
}
