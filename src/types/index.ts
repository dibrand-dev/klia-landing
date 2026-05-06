export type Plan = {
  id: string
  nombre: string
  descripcion: string | null
  precio_mensual: number
  es_publico: boolean
  es_ilimitado: boolean
  plan_funcionalidades: { funcionalidad: string }[]
}
