// src/app/robots.ts
// ✅ FIXED: SEO-optimized robots.txt for better Google indexing

import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url

  return {
    rules: [
      {
        // ✅ ENHANCED: Main crawling rules for search engines
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
          '/_vercel/', // Vercel internal routes
          '/node_modules/', // Dependencies
        ],
      },
      {
        // ✅ IMPROVED: Specific rules for Googlebot
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/test-api/',
          '/debug-api/',
          '/_next/',
          '/private/',
          '*.json$',
          '/dashboard/'
        ],
        crawlDelay: 1, // 1 second delay between requests
      },
      {
        // ✅ IMPROVED: Specific rules for Bingbot
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/test-api/',
          '/debug-api/',
          '/_next/',
          '/private/',
          '*.json$',
          '/dashboard/'
        ],
        crawlDelay: 2, // 2 second delay for Bing
      },
      {
        // Block AI training bots (keep this)
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        // Block aggressive crawlers
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

// ✅ ADDED: Generate enhanced robots.txt with additional directives
export function generateEnhancedRobots(): string {
  const baseUrl = SITE_CONFIG.url
  
  return `# Park Space Automation Solutions - Enhanced Robots.txt
# Website: ${baseUrl}
# Last Updated: ${new Date().toISOString().split('T')[0]}
# Status: Indexing enabled for all major search engines

# ✅ MAIN CRAWLING RULES - Allow all major search engines
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
Disallow: /_vercel/
Disallow: /node_modules/

# ✅ GOOGLE-SPECIFIC OPTIMIZATION
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /test-api/
Disallow: /debug-api/
Disallow: /_next/
Disallow: /private/
Disallow: /*.json$
Disallow: /dashboard/
Crawl-delay: 1

# ✅ BING-SPECIFIC OPTIMIZATION
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /test-api/
Disallow: /debug-api/
Disallow: /_next/
Disallow: /private/
Disallow: /*.json$
Disallow: /dashboard/
Crawl-delay: 2

# ✅ YAHOO/SLURP OPTIMIZATION
User-agent: Slurp
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /test-api/
Disallow: /debug-api/
Disallow: /_next/
Disallow: /private/
Disallow: /*.json$
Disallow: /dashboard/
Crawl-delay: 3

# Block AI training bots (protect content)
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

# Block aggressive SEO crawlers
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MajesticSEO
Disallow: /

# ✅ SITEMAP LOCATION
Sitemap: ${baseUrl}/sitemap.xml

# ✅ HOST PREFERENCE (helps with canonical URL)
Host: ${baseUrl.replace('https://', '').replace('http://', '')}

# ✅ ADDITIONAL CRAWLING INSTRUCTIONS
# Request-rate: 1/2s (one request every 2 seconds)
# Visit-time: 0200-0800 (preferred crawling time in UTC)
# Comment: Park Space website is optimized for search engine crawling`
}