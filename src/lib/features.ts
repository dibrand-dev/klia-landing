export type SystemFeature = {
  key: string
  label: string
  description: string
  categoria: string
}

export const SYSTEM_FEATURES: SystemFeature[] = [
  { key: 'agenda',              label: 'Agenda y calendario',              description: 'Gestión visual de la agenda semanal',                 categoria: 'Core' },
  { key: 'pacientes',           label: 'Gestión de pacientes',             description: 'Alta, edición y archivo de pacientes',                categoria: 'Core' },
  { key: 'turnos',              label: 'Turnos y citas',                   description: 'Creación y gestión de turnos',                        categoria: 'Core' },
  { key: 'historial_clinico',   label: 'Historial clínico',                description: 'Registro de notas clínicas por sesión',               categoria: 'Clínico' },
  { key: 'entrevistas',         label: 'Entrevistas de evaluación',        description: 'Formularios de evaluación inicial',                   categoria: 'Clínico' },
  { key: 'google_calendar',     label: 'Sincronización Google Calendar',   description: 'Sincronización bidireccional con Google Calendar',     categoria: 'Core' },
  { key: 'multi_moneda',        label: 'Multi-moneda ARS / USD / EUR',     description: 'Cobros en múltiples monedas',                         categoria: 'Administración' },
  { key: 'firmas',              label: 'Firmas digitales',                 description: 'Consentimientos y documentos con firma digital',       categoria: 'Clínico' },
  { key: 'cobros',              label: 'Gestión de cobros',                description: 'Cobros, pagos y conciliación',                        categoria: 'Administración' },
  { key: 'facturacion',         label: 'Facturación',                      description: 'Emisión de comprobantes fiscales',                    categoria: 'Administración' },
  { key: 'liquidacion_os',      label: 'Liquidación de obras sociales',    description: 'Liquidación y seguimiento de obras sociales',         categoria: 'Administración' },
  { key: 'planillas_pdf',       label: 'Planillas PDF por obra social',    description: 'Generación de planillas PDF por obra social',         categoria: 'Administración' },
  { key: 'atenciones_ia',       label: 'Atenciones del Día con IA ✨',     description: 'Resúmenes clínicos con IA antes de cada sesión',      categoria: 'IA' },
  { key: 'nota_voz',            label: 'Notas de voz con transcripción IA 🎤', description: 'Grabá y transcribí notas clínicas por voz',         categoria: 'IA' },
  { key: 'informes_ia',         label: 'Informes clínicos con IA ✨',      description: 'Generación automática de informes con IA',            categoria: 'IA' },
  { key: 'estadisticas',        label: 'Estadísticas del consultorio',     description: 'Reportes de actividad y rendimiento',                 categoria: 'Administración' },
  { key: 'soporte_prioritario', label: 'Soporte prioritario',              description: 'Atención prioritaria por chat y email',               categoria: 'Core' },
]

export const CATEGORIAS = ['Core', 'Clínico', 'IA', 'Administración']
