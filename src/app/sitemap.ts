// =============================================
// src/app/sitemap.ts
// =============================================
import { MetadataRoute } from 'next'
import { getServices } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://parkspace.vercel.app'
  
  // Get all services for dynamic routes
  const services = await getServices()

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: new Date(service.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...serviceUrls,
  ]
}