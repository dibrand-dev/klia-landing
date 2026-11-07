const TZ = 'America/Argentina/Buenos_Aires'

export type WebinarStatus = 'open' | 'closed' | 'ended'

export type WebinarTiming = {
  fecha_inicio: string
  duracion_min: number
  cierre_inscripcion: string
}

export function computeWebinarStatus(w: WebinarTiming): WebinarStatus {
  const now = Date.now()
  const inicio = new Date(w.fecha_inicio).getTime()
  const fin = inicio + w.duracion_min * 60000
  const cierre = new Date(w.cierre_inscripcion).getTime()
  if (now >= fin) return 'ended'
  if (now >= cierre) return 'closed'
  return 'open'
}

function capitalize(s: string): string {
  return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s
}

export function formatWebinarDate(fechaInicioISO: string): { full: string; dateOnly: string } {
  const d = new Date(fechaInicioISO)
  const weekday = capitalize(new Intl.DateTimeFormat('es-AR', { timeZone: TZ, weekday: 'long' }).format(d))
  const day = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, day: 'numeric' }).format(d)
  const month = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, month: 'long' }).format(d)
  const year = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, year: 'numeric' }).format(d)
  const time = new Intl.DateTimeFormat('es-AR', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false }).format(d)
  const dateOnly = `${weekday} ${day} de ${month} de ${year}`
  return { full: `${dateOnly}, ${time}hs`, dateOnly }
}

function toUtcStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function icsEscape(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

export type WebinarCalendarInfo = {
  slug: string
  titulo: string
  fecha_inicio: string
  duracion_min: number
}

export function buildGoogleCalendarUrl(w: WebinarCalendarInfo, meetUrl: string): string {
  const inicio = new Date(w.fecha_inicio)
  const fin = new Date(inicio.getTime() + w.duracion_min * 60000)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: w.titulo,
    dates: `${toUtcStamp(inicio)}/${toUtcStamp(fin)}`,
    details: `Webinar gratuito de KLIA.\nLink: ${meetUrl}`,
    location: meetUrl,
    ctz: TZ,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function buildIcs(w: WebinarCalendarInfo, meetUrl: string): string {
  const inicio = new Date(w.fecha_inicio)
  const fin = new Date(inicio.getTime() + w.duracion_min * 60000)
  const now = new Date()
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//KLIA//Webinars//ES',
    'BEGIN:VEVENT',
    `UID:${w.slug}@klia.com.ar`,
    `DTSTAMP:${toUtcStamp(now)}`,
    `DTSTART:${toUtcStamp(inicio)}`,
    `DTEND:${toUtcStamp(fin)}`,
    `SUMMARY:${icsEscape(w.titulo)}`,
    `DESCRIPTION:${icsEscape(`Link: ${meetUrl}`)}`,
    `LOCATION:${icsEscape(meetUrl)}`,
    `URL:${meetUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export const WB_COUNTRIES: [string, string, string][] = [
  ['AR', '+54', 'Argentina'],
  ['UY', '+598', 'Uruguay'],
  ['CL', '+56', 'Chile'],
  ['PY', '+595', 'Paraguay'],
  ['BO', '+591', 'Bolivia'],
  ['BR', '+55', 'Brasil'],
  ['PE', '+51', 'Perú'],
  ['CO', '+57', 'Colombia'],
  ['MX', '+52', 'México'],
  ['ES', '+34', 'España'],
  ['US', '+1', 'Estados Unidos'],
]

export const WB_Q1 = ['Menos de 20', '20 a 50', '51 a 100', '101 a 200', 'Más de 200']
export const WB_Q2 = ['No, lo manejaba en papel/cuaderno', 'Excel o Google Sheets', 'Agenda de Google o del celular + WhatsApp', 'Un sistema de gestión (¿cuál?)', 'Ninguna']
export const WB_Q2_SYS = 'Un sistema de gestión (¿cuál?)'
export const WB_Q3 = ['Cobrar y hacer seguimiento de deudas', 'Cancelaciones y ausencias de pacientes', 'Gestionar pacientes nuevos', 'Tareas administrativas manuales', 'Historias clínicas en papel o desordenadas', 'Facturación a obras sociales o prepagas', 'Facturación electrónica (ARCA)', 'Conseguir más pacientes', 'Otro']
export const WB_Q4 = ['Independiente, con consultorio propio', 'En una clínica o centro de salud', 'En ambos']
