import type { Metadata } from 'next';
import React from 'react';
import Nav from '@/components/landing/Nav';
import Footer from '@/components/landing/Footer';
import { Icons, type IconName } from '@/components/Icons';
import './beneficios.css';

export const metadata: Metadata = {
  title: 'Beneficios · KLIA — Menos administración, más tiempo con tus pacientes',
  description: 'Cada función de KLIA elimina una tarea que hoy hacés a mano: cobros, facturación a obras sociales, IA clínica, notas de voz, agenda y archivos. Tiempo devuelto a tu práctica.',
  alternates: { canonical: 'https://www.klia.com.ar/beneficios' },
  openGraph: {
    url: 'https://www.klia.com.ar/beneficios',
    title: 'Beneficios · KLIA — Menos administración, más tiempo con tus pacientes',
    description: 'Cada función de KLIA elimina una tarea que hoy hacés a mano. No es un software más — es tiempo devuelto a tu práctica.',
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface BenefitCard {
  icon: IconName;
  iconColor: string;
  iconBg: string;
  cardGlow: string;
  strike: string | null;
  num: string;
  numColor: string;
  label: string;
  subtext: string;
}

interface Benefit {
  num: string;
  module: string;
  flip: boolean;
  headingBefore: string;
  headingItalic: string;
  desc: string[];
  badge: 'todos' | 'prof' | 'premium';
  badgeLabel: string;
  badgeIcon: 'spark' | null;
  card: BenefitCard;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const BENEFITS: Benefit[] = [
  {
    num: '01',
    module: 'COBROS Y DEUDA',
    flip: false,
    headingBefore: 'Tus cobros, en orden. Sin conversaciones ',
    headingItalic: 'incómodas.',
    desc: [
      'Preguntarle a un paciente si pagó es una de las situaciones más difíciles del consultorio. La mayoría de los profesionales evitan el tema y acumulan deuda sin darse cuenta.',
      'KLIA registra cada sesión y envía un email diario al paciente con el detalle exacto de lo que debe. Vos no intervenís — el sistema gestiona el cobro por vos. Funciona tanto para pacientes particulares como para los que tienen cobertura de obra social: IOMA, OSDE, Swiss Medical, Medifé, Galeno, PAMI y cualquier otra.',
    ],
    badge: 'prof',
    badgeLabel: 'Plan Profesional',
    badgeIcon: null,
    card: {
      icon: 'Wallet',
      iconColor: 'var(--klia)',
      iconBg: 'var(--klia-50)',
      cardGlow: 'rgba(63,81,158,.07)',
      strike: null,
      num: '92%',
      numColor: 'var(--klia)',
      label: 'tasa de cobro en el mes',
      subtext: 'vs. 67% sin sistema',
    },
  },
  {
    num: '02',
    module: 'FACTURACIÓN A OBRAS SOCIALES',
    flip: true,
    headingBefore: 'Las planillas del mes, listas en ',
    headingItalic: '15 minutos.',
    desc: [
      'Cerrar el mes con IOMA, OSDE, Swiss Medical, PAMI, Galeno, Medifé, APROSS o cualquier otra obra social significa buscar sesiones, construir planillas en Word o Excel y correr contra el vencimiento. Un proceso tedioso que se repite cada 30 días.',
      'KLIA toma todas las sesiones del mes, las organiza por obra social y genera el PDF con tu firma y sello incluidos. Tiene generadores específicos para Hospital Italiano e IOMA, y un motor genérico para el resto. Para los profesionales que atienden solo de forma particular, el módulo de cobros tiene su propio historial y exportación a CSV.',
    ],
    badge: 'prof',
    badgeLabel: 'Plan Profesional',
    badgeIcon: null,
    card: {
      icon: 'Receipt',
      iconColor: 'var(--klia)',
      iconBg: 'var(--klia-50)',
      cardGlow: 'rgba(63,81,158,.07)',
      strike: '3hs',
      num: '15 min',
      numColor: 'var(--green)',
      label: 'por liquidación mensual',
      subtext: 'sin errores de transcripción',
    },
  },
  {
    num: '03',
    module: 'ATENCIONES DEL DÍA CON IA',
    flip: false,
    headingBefore: 'Sabés cómo viene cada paciente ',
    headingItalic: 'antes de que entre.',
    desc: [
      'Entre sesión y sesión pasan días. Antes de atender hay que revisar notas, recordar evoluciones y ubicar el contexto del paciente — todo eso consume tiempo de consulta real.',
      'El módulo Atenciones del Día genera un resumen clínico automático con Google Gemini antes de cada sesión. Se adapta a tu especialidad: no es lo mismo un informe evolutivo para psicología que un resumen de consulta para kinesiología, clínica médica o nutrición. Aplica a todos los pacientes, con o sin obra social.',
    ],
    badge: 'prof',
    badgeLabel: 'Plan Profesional',
    badgeIcon: 'spark',
    card: {
      icon: 'Brain',
      iconColor: 'var(--purple)',
      iconBg: 'var(--purple-50)',
      cardGlow: 'rgba(140,110,216,.08)',
      strike: null,
      num: '8 seg',
      numColor: 'var(--purple)',
      label: 'para leer el resumen pre-sesión',
      subtext: 'generado por Gemini IA',
    },
  },
  {
    num: '04',
    module: 'NOTAS DE VOZ CON IA',
    flip: true,
    headingBefore: 'Notas clínicas completas. Sin tipear ',
    headingItalic: 'desde cero.',
    desc: [
      'Escribir notas de evolución después de cada sesión consume entre 10 y 20 minutos. Multiplicado por 30 sesiones al mes, son horas que no agregan valor clínico real.',
      'El módulo de Notas de voz permite dictar durante o después de la sesión. Whisper large-v3-turbo transcribe el audio en español con alta precisión. El texto queda en la historia clínica listo para revisar y guardar — sin importar si el paciente es particular o tiene cobertura de obra social.',
    ],
    badge: 'prof',
    badgeLabel: 'Plan Profesional',
    badgeIcon: 'spark',
    card: {
      icon: 'Mic',
      iconColor: 'var(--purple)',
      iconBg: 'var(--purple-50)',
      cardGlow: 'rgba(140,110,216,.08)',
      strike: null,
      num: '8hs',
      numColor: 'var(--klia)',
      label: 'devueltas por mes (40 sesiones)',
      subtext: 'de 15 min a 3 min por nota',
    },
  },
  {
    num: '05',
    module: 'AGENDA Y RECORDATORIOS',
    flip: false,
    headingBefore: 'Cero ausencias ',
    headingItalic: 'inesperadas.',
    desc: [
      'El turno sin confirmar es el turno que no se presenta. La confirmación manual por WhatsApp consume tiempo, se olvida y genera roces innecesarios con el paciente.',
      'KLIA envía un recordatorio automático por email 24 horas antes de cada turno, con los datos de la sesión y el link de Google Meet si es videollamada. Sin intervención del profesional. Funciona para pacientes particulares y para los que asisten por obra social — cualquiera con email cargado en su ficha.',
    ],
    badge: 'todos',
    badgeLabel: 'Todos los planes',
    badgeIcon: null,
    card: {
      icon: 'Bell',
      iconColor: 'var(--klia)',
      iconBg: 'var(--klia-50)',
      cardGlow: 'rgba(63,81,158,.07)',
      strike: null,
      num: '24hs',
      numColor: 'var(--klia)',
      label: 'antes del turno, automático',
      subtext: 'sin intervención manual',
    },
  },
  {
    num: '06',
    module: 'MERCADO PAGO INTEGRADO',
    flip: true,
    headingBefore: 'Tu dinero, en tu cuenta. Sin ',
    headingItalic: 'intermediarios.',
    desc: [
      'Muchos sistemas de cobro online retienen el dinero o cobran comisiones adicionales por transferirlo. El profesional no sabe cuándo va a cobrar ni cuánto le van a descontar.',
      'KLIA conecta Mercado Pago directamente a tu cuenta via OAuth. El paciente paga, el dinero va a vos — KLIA no retiene nada ni cobra comisión adicional. Cada sesión tiene un link único de pago. El sistema confirma el cobro automáticamente. Es el canal principal de cobro online para pacientes particulares.',
    ],
    badge: 'prof',
    badgeLabel: 'Plan Profesional',
    badgeIcon: null,
    card: {
      icon: 'Card',
      iconColor: 'var(--green)',
      iconBg: 'var(--green-50)',
      cardGlow: 'rgba(61,156,107,.08)',
      strike: null,
      num: '0%',
      numColor: 'var(--green)',
      label: 'comisión adicional de KLIA',
      subtext: 'el dinero va directo a tu cuenta',
    },
  },
  {
    num: '07',
    module: 'ARCHIVOS DEL PACIENTE',
    flip: false,
    headingBefore: 'Los estudios de tus pacientes, ',
    headingItalic: 'siempre a mano.',
    desc: [
      'Los estudios llegan por WhatsApp, email o en papel. No hay un lugar centralizado donde guardarlos asociados a la ficha de cada paciente, y encontrarlos antes de una consulta lleva minutos que no tenés.',
      'El módulo de Archivos sube los estudios al Google Drive del profesional, organizados automáticamente en KLIA/Pacientes/[Nombre]/[Categoría] — Laboratorio, Imágenes, Documentos. Están dentro de la misma plataforma, a un click desde la ficha. Aplica a todos los pacientes, con o sin obra social.',
    ],
    badge: 'premium',
    badgeLabel: 'Plan Premium',
    badgeIcon: null,
    card: {
      icon: 'Folder',
      iconColor: 'var(--klia)',
      iconBg: 'var(--klia-50)',
      cardGlow: 'rgba(63,81,158,.07)',
      strike: null,
      num: '1 click',
      numColor: 'var(--klia)',
      label: 'para acceder a cualquier estudio',
      subtext: 'organizado en tu Google Drive',
    },
  },
];

// ─── Spark icon for AI badge ──────────────────────────────────────────────────
function SparkSm() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6z" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="benef-hero">
      <div className="benef-grid-bg" aria-hidden />

      <div className="container">
        <div className="benef-hero-inner">
          <span className="eyebrow benef-eyebrow-hero">Beneficios · klia.com.ar</span>

          <h1 className="h-display benef-h1">
            Menos tiempo administrando.<br />
            Más tiempo{' '}
            <em className="serif-it" style={{ color: 'var(--klia)' }}>atendiendo.</em>
          </h1>

          <p className="benef-lead">
            Cada función de KLIA está diseñada para eliminar una tarea que hoy hacés a mano.
            No es un software más — es tiempo devuelto a tu práctica.
          </p>
        </div>
      </div>
    </section>
  );
}

function BenefCard({ data }: { data: BenefitCard }) {
  const IconComp = Icons[data.icon];
  return (
    <div className="benef-card" style={{ '--card-glow': data.cardGlow } as React.CSSProperties}>
      <div className="benef-card-ico" style={{ background: data.iconBg, color: data.iconColor }}>
        <IconComp size={38} stroke={1.5} />
      </div>

      {data.strike && <div className="benef-card-num-strike">{data.strike}</div>}

      {data.strike ? (
        <div className="benef-card-num-new" style={{ color: data.numColor }}>{data.num}</div>
      ) : (
        <div className="benef-card-num" style={{ color: data.numColor }}>{data.num}</div>
      )}

      <div className="benef-card-label">{data.label}</div>
      <div className="benef-card-subtext">{data.subtext}</div>
    </div>
  );
}

function BenefRow({ b }: { b: Benefit }) {
  return (
    <div className={`benef-row${b.flip ? ' flip' : ''}`}>
      <div className="benef-text b-reveal">
        <span className="eyebrow benef-row-eyebrow">{b.num} · {b.module}</span>

        <h2 className="h-2 benef-heading">
          {b.headingBefore}
          <em className="serif-it" style={{ color: 'var(--klia)' }}>{b.headingItalic}</em>
        </h2>

        <div className="benef-desc">
          {b.desc.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        <span className={`plan-badge ${b.badge}`}>
          {b.badgeIcon === 'spark' && <SparkSm />}
          {b.badgeLabel}
        </span>
      </div>

      <div className="benef-visual b-reveal">
        <BenefCard data={b.card} />
      </div>
    </div>
  );
}

function BenefCTA() {
  return (
    <section className="benef-cta">
      <div className="container">
        <div className="benef-cta-inner">
          <h2 className="h-2 benef-cta-title">
            Probalo 21 días sin comprometerte a nada.
          </h2>
          <p className="benef-cta-lead">
            Sin tarjeta de crédito. Sin permanencia. Todo lo que ves en esta página
            disponible desde el primer día.
          </p>
          <div className="benef-cta-buttons">
            <a href="https://app.klia.com.ar/registro" className="btn btn-coral btn-lg">
              Empezar gratis <Icons.Arrow size={14} />
            </a>
            <a href="/precios" className="btn btn-ghost-light btn-lg">
              Ver planes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BeneficiosPage() {
  return (
    <>
      <Nav />
      <main className="beneficios-page">
        <Hero />
        <section className="benefits-section">
          <div className="container">
            {BENEFITS.map((b) => <BenefRow key={b.num} b={b} />)}
          </div>
        </section>
        <BenefCTA />
      </main>
      <Footer />
    </>
  );
}
