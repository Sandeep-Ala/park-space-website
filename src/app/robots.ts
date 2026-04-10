// src/app/robots.ts
// Dynamic robots.txt for Park Space. Allows search engines to crawl everything
// under / except server/internal paths. Blocks scraping/AI bots that don't
// respect site owners.

import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
      },
      // Google and Bing need full access to static Next.js assets for rendering
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/', '/_next/image'],
        disallow: ['/api/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/_next/static/', '/_next/image'],
        disallow: ['/api/', '/admin/', '/private/'],
      },
      // Block AI training / scraper bots
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Claude-Web', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'PerplexityBot', disallow: '/' },
      // Block aggressive backlink crawlers
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
