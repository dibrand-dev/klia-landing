import { MetadataRoute } from 'next'
import { getWebinarsPublicados } from '@/lib/webinars/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const webinars = await getWebinarsPublicados()
  const webinarEntries: MetadataRoute.Sitemap = webinars.map((w) => ({
    url: `https://www.klia.com.ar/webinar/${w.slug}`,
    lastModified: new Date(w.fecha_inicio),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    {
      url: 'https://www.klia.com.ar',
      lastModified: new Date('2026-06-17'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.klia.com.ar/producto',
      lastModified: new Date('2026-06-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.klia.com.ar/beneficios',
      lastModified: new Date('2026-06-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.klia.com.ar/casos',
      lastModified: new Date('2026-06-17'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.klia.com.ar/precios',
      lastModified: new Date('2026-06-17'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.klia.com.ar/faq',
      lastModified: new Date('2026-06-17'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.klia.com.ar/recordatorios',
      lastModified: new Date('2026-10-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.klia.com.ar/nutricionistas',
      lastModified: new Date('2026-11-09'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.klia.com.ar/sobre-klia',
      lastModified: new Date('2026-06-21'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.klia.com.ar/privacidad',
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.klia.com.ar/terminos',
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.klia.com.ar/webinar',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...webinarEntries,
  ]
}
