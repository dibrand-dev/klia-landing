export type SystemFeature = {
  key: string
  label: string
  description: string
  categoria: string
}

export const SYSTEM_FEATURES: SystemFeature[] = [
  { key: 'agenda', label: 'Agenda y calendario', description: 'Gestión visual de la agenda semanal', categoria: 'Core' },
  { key: 'pacientes', label: 'Gestión de pacientes', description: 'Alta, edición y archivo de pacientes', categoria: 'Core' },
  { key: 'turnos', label: 'Turnos y citas', description: 'Creación y gestión de turnos', categoria: 'Core' },
  { key: 'historial_clinico', label: 'Historial clínico', description: 'Registro de notas clínicas por sesión', categoria: 'Clínico' },
  { key: 'objetivos_terapeuticos', label: 'Objetivos terapéuticos', description: 'Seguimiento de objetivos del paciente', categoria: 'Clínico' },
  { key: 'medicacion', label: 'Medicación', description: 'Registro de medicación activa del paciente', categoria: 'Clínico' },
  { key: 'interconsultas', label: 'Interconsultas', description: 'Visualización de otros profesionales del paciente', categoria: 'Clínico' },
  { key: 'facturacion', label: 'Facturación', description: 'Cobros, pagos y comprobantes', categoria: 'Administración' },
  { key: 'informes', label: 'Informes y estadísticas', description: 'Reportes de actividad del consultorio', categoria: 'Administración' },
]

export const CATEGORIAS = ['Core', 'Clínico', 'Administración']
