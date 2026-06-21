import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
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
  ]
}
