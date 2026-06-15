import type { Metadata } from 'next';
import React from 'react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import { Icons, type IconName } from '@/components/Icons';
import './producto.css';

export const metadata: Metadata = {
  title: 'Producto · KLIA — Software de gestión para profesionales de salud en Argentina',
  description: 'KLIA integra agenda, historia clínica, cobros, IA y facturación a obras sociales en una sola plataforma. 20+ módulos. 42 especialidades. 21 días gratis.',
  alternates: { canonical: 'https://www.klia.com.ar/producto' },
  openGraph: {
    url: 'https://www.klia.com.ar/producto',
    title: 'Producto · KLIA — Software de gestión para profesionales de salud en Argentina',
    description: 'KLIA integra agenda, historia clínica, cobros, IA y facturación a obras sociales en una sola plataforma.',
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Module {
  ico: IconName;
  ai: boolean;
  badge: 'todos' | 'prof' | 'premium';
  extra: 'unico' | null;
  title: string;
  desc: string;
}

interface Diff {
  title: string;
  desc: string;
}

interface Chip {
  ico: IconName;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { num: '20+', label: 'módulos en producción'     },
  { num: '42',  label: 'especialidades soportadas' },
  { num: '21',  label: 'días de trial completo'    },
  { num: '0',   label: 'instalaciones requeridas'  },
];

const BADGE_LABELS = {
  todos:   'Todos los planes',
  prof:    'Plan Profesional',
  premium: 'Plan Premium',
  unico:   'Único en Argentina',
};

const MODULES: Module[] = [
  { ico:'Calendar', ai:false, badge:'todos',   extra:null,
    title:'Agenda inteligente',
    desc:'Vistas día, semana y mes. Turnos únicos y recurrentes (semanal, quincenal, mensual). Videollamadas con Google Meet generado automáticamente. Horarios configurables por día de la semana. Recordatorio automático por email 24hs antes.' },
  { ico:'Doc',      ai:false, badge:'todos',   extra:null,
    title:'Historia clínica digital',
    desc:'Editor rich text con notas de voz transcritas por IA. Historial completo y consultable. Firma escaneada del paciente. Archivos organizados en Google Drive por categoría: Laboratorio, Imágenes, Documentos.' },
  { ico:'Brain',    ai:true,  badge:'prof',    extra:null,
    title:'Atenciones del Día con IA',
    desc:'Sala de espera con resumen clínico automático (Gemini) antes de cada sesión. Se adapta a tu especialidad. Vista cronológica del día. Caché de resúmenes para optimizar uso.' },
  { ico:'Mic',      ai:true,  badge:'prof',    extra:null,
    title:'Notas de voz con IA',
    desc:'Grabación directa desde la ficha del paciente. Transcripción automática con Whisper large-v3-turbo, el modelo más preciso en español. El texto queda listo para editar y guardar.' },
  { ico:'Wallet',   ai:false, badge:'prof',    extra:null,
    title:'Cobros y gestión de deuda',
    desc:'Panel centralizado de deuda por paciente. Pagos por sesión, mes o a cuenta — distribución automática desde la sesión más antigua. Historial completo. Exportación a CSV.' },
  { ico:'Bell',     ai:false, badge:'prof',    extra:'unico',
    title:'Aviso automático de deuda',
    desc:'KLIA envía un email diario a los pacientes con saldo pendiente, listando exactamente qué deben y por cuánto. El profesional activa o desactiva desde Ajustes. Ningún otro software médico en Argentina tiene esta función.' },
  { ico:'Receipt',  ai:false, badge:'prof',    extra:null,
    title:'Facturación a obras sociales',
    desc:'Planillas PDF para Hospital Italiano, IOMA y motor genérico para cualquier obra social. Firma y sello incluidos. El proceso que llevaba 3 horas en Word tarda 15 minutos.' },
  { ico:'Card',     ai:false, badge:'prof',    extra:null,
    title:'Mercado Pago integrado',
    desc:'OAuth propio por profesional — el dinero va directo a tu cuenta, KLIA no intermedia. Link único de pago por sesión. Confirmación automática por webhook.' },
  { ico:'Link',     ai:false, badge:'premium', extra:null,
    title:'Link público de reservas',
    desc:'URL única para que los pacientes reserven sin WhatsApp ni llamadas. Con pago integrado. Respeta horarios y agenda en tiempo real.' },
  { ico:'Folder',   ai:false, badge:'premium', extra:null,
    title:'Archivos del paciente',
    desc:'Estudios, imágenes y documentos en la ficha del paciente. Almacenados en el Google Drive del profesional. Organizados en KLIA/Pacientes/[Nombre]/[Categoría].' },
  { ico:'Calendar', ai:false, badge:'todos',   extra:null,
    title:'Google Calendar sync',
    desc:'Sincronización bidireccional en tiempo real. Los turnos de KLIA aparecen en Google Calendar y viceversa. Sin doble carga de datos.' },
  { ico:'Coins',    ai:false, badge:'todos',   extra:null,
    title:'Multi-moneda',
    desc:'ARS, USD y EUR configurables por paciente. Reportes separados por moneda. Para profesionales que cobran en dólares a algunos pacientes y en pesos a otros.' },
];

const DIFFS: Diff[] = [
  { title:'Aviso automático de deuda',
    desc:'Ningún competidor argentino lo tiene. El sistema gestiona el cobro por vos, sin conversaciones incómodas con el paciente.' },
  { title:'IA clínica en el flujo de trabajo',
    desc:'No es un link a ChatGPT. El resumen clínico aparece dentro de KLIA, antes de que entre el paciente, listo para usar.' },
  { title:'Terminología adaptada por especialidad',
    desc:'"Sesión" para psicólogos, "Consulta" para médicos. 42 especialidades configuradas. Se asigna automáticamente al registrarte.' },
  { title:'Mercado Pago OAuth directo',
    desc:'Tu cuenta, tu dinero. KLIA no intermedia pagos. La conexión toma un click.' },
];

const CHIPS: Chip[] = [
  { ico:'Calendar', label:'Google Calendar'       },
  { ico:'Folder',   label:'Google Drive'          },
  { ico:'Video',    label:'Google Meet'           },
  { ico:'Card',     label:'Mercado Pago'          },
  { ico:'Brain',    label:'Gemini IA'             },
  { ico:'Mic',      label:'Orchard AI / Whisper'  },
  { ico:'Mail',     label:'Brevo Email'           },
];

const COMPLIANCE_PILLS = ['Ley 25.326', 'AAIP registrado', 'HTTPS / TLS', 'Row Level Security'];

// ─── Sub-components ───────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="prod-hero">
      <div className="hero-grid-bg" aria-hidden />
      <div className="hero-blob hero-blob-1" aria-hidden />
      <div className="hero-blob hero-blob-2" aria-hidden />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="prod-hero-inner">
          <span className="eyebrow">Plataforma · klia.com.ar</span>

          <h1 className="h-display prod-h1">
            Todo lo que necesita tu consultorio,<br />
            en un solo{' '}
            <em className="serif-it" style={{ color: 'var(--klia)' }}>lugar.</em>
          </h1>

          <p className="prod-lead">
            KLIA integra agenda, historia clínica, cobros, facturación a obras sociales
            e inteligencia artificial. Sin cambiar de pestaña. Sin duplicar datos.
            Sin aprender varios sistemas.
          </p>

          <div className="prod-ctas">
            <a href="https://app.klia.com.ar/registro" className="btn btn-accent">
              Empezar gratis 21 días <Icons.Arrow size={14} />
            </a>
            <a href="/precios" className="btn btn-ghost">Ver precios</a>
          </div>

          <p className="prod-note">
            Sin tarjeta de crédito · Sin permanencia · Cancelás cuando querés
          </p>
        </div>

        <div className="prod-stats">
          {STATS.map((s) => (
            <div className="prod-stat" key={s.label}>
              <div className="prod-stat-num">{s.num}</div>
              <div className="prod-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ m }: { m: Module }) {
  const IcoComp = Icons[m.ico];
  return (
    <div className="module-card">
      <div className="module-card-top">
        <div className={`module-ico${m.ai ? ' ai-ico' : ''}`}>
          <IcoComp size={22} stroke={1.6} />
        </div>
        <div className="module-badges">
          <span className={`plan-badge ${m.badge}`}>{BADGE_LABELS[m.badge]}</span>
          {m.extra && (
            <span className={`plan-badge ${m.extra}`}>{BADGE_LABELS[m.extra]}</span>
          )}
        </div>
      </div>
      <div className="module-title">{m.title}</div>
      <p className="module-desc">{m.desc}</p>
    </div>
  );
}

function Modules() {
  return (
    <section className="modules-section">
      <div className="container">
        <div className="prod-section-head">
          <span className="eyebrow">Módulos</span>
          <h2 className="h-2">
            Cada función resuelve un problema{' '}
            <em className="serif-it" style={{ color: 'var(--klia)' }}>real.</em>
          </h2>
          <p className="section-sub">
            No es una lista de features — es el flujo completo de tu consultorio, digitalizado.
          </p>
        </div>
        <div className="modules-grid">
          {MODULES.map((m) => <ModuleCard key={m.title} m={m} />)}
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  return (
    <section className="diff-section">
      <div className="container">
        <div className="diff-inner">
          <div className="diff-header">
            <span className="eyebrow">Lo que solo KLIA tiene</span>
            <h2 className="h-2" style={{ marginTop: 14 }}>
              La competencia cubre agenda e historia clínica.<br />
              KLIA va más{' '}
              <em className="serif-it" style={{ color: 'var(--klia)' }}>lejos.</em>
            </h2>
          </div>
          <div className="diff-grid">
            {DIFFS.map((d) => (
              <div className="diff-item" key={d.title}>
                <div className="diff-check">
                  <Icons.Check size={15} stroke={2.5} />
                </div>
                <div>
                  <div className="diff-title">{d.title}</div>
                  <p className="diff-desc">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section className="integrations-section">
      <div className="container">
        <span className="eyebrow">Integraciones nativas</span>
        <div className="chips-row">
          {CHIPS.map((c) => {
            const ChipIco = Icons[c.ico];
            return (
              <div className="chip" key={c.label}>
                <ChipIco size={16} stroke={1.6} />
                {c.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Compliance() {
  return (
    <div className="compliance-bar">
      <div className="container">
        <div className="compliance-inner">
          <p className="compliance-text">
            Registrado ante la AAIP · Expediente EX-2026-51700917 · Ley 25.326 cumplida
            · Datos alojados en Argentina · Encriptación HTTPS
          </p>
          <div className="compliance-pills">
            {COMPLIANCE_PILLS.map((l) => (
              <span className="compliance-pill" key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CTAFinal() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-inner">
          <h2 className="h-2 cta-title">
            Probalo 21 días sin comprometerte a nada.
          </h2>
          <p className="cta-lead">
            Sin tarjeta de crédito. Sin permanencia. Migramos tus pacientes
            y tu agenda actual sin que muevas un dedo.
          </p>
          <div className="cta-buttons">
            <a href="https://app.klia.com.ar/registro" className="btn btn-coral">
              Empezar gratis <Icons.Arrow size={14} />
            </a>
            <a href="https://wa.me/5491165939115" className="btn-ghost-light">
              Hablar con ventas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductoPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Modules />
        <Differentiators />
        <Integrations />
        <Compliance />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
