// src/app/sitemap.ts
// Dynamic sitemap for Park Space. Lists every real route with priorities
// tuned for SEO (homepage + service pages highest, legal pages lowest).

import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const serviceSlugs = [
    'boom-barriers',
    'cctv-services',
    'biometric-attendance',
    'door-access-controllers',
    'fire-alarm-systems',
    'networking-systems',
    'bollard-barriers',
    'flap-barriers',
    'swing-gates',
    'sliding-gate-motors',
  ]

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
