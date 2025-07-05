// src/app/robots.ts
// SEO-optimized robots.txt for Park Space website

import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // Protect API routes
          '/admin/', // Protect admin routes (future)
          '/test-api/', // Protect testing pages
          '/debug-api/', // Protect debug pages
          '/_next/', // Next.js internal files
          '/private/', // Private content
          '*.json$', // Configuration files
          '/dashboard/', // Future dashboard routes
        ],
      },
      {
        userAgent: 'GPTBot', // OpenAI's web crawler
        disallow: '/', // Prevent AI training on content
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl bot
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Claude's web crawler
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web', // Claude web browsing
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

// Alternative robots.txt generation for custom rules
export function generateCustomRobots(): string {
  const baseUrl = SITE_CONFIG.url
  
  return `# Park Space Automation Solutions - Robots.txt
# Website: ${baseUrl}
# Last Updated: ${new Date().toISOString().split('T')[0]}

# Allow all search engines
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /test-api/
Disallow: /debug-api/
Disallow: /_next/
Disallow: /private/
Disallow: /*.json$
Disallow: /dashboard/

# Prevent AI training bots
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

# Search engine specific optimizations
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 2

# Block aggressive crawlers
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Host preference
Host: ${baseUrl.replace('https://', '').replace('http://', '')}

# Additional crawling instructions
# Request-rate: 1/5s (one request every 5 seconds)
# Visit-time: 0400-0800 (preferred crawling time in UTC)`
}