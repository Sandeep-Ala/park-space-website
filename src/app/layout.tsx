// src/app/layout.tsx
// Root layout - default metadata, global scripts, site-wide JSON-LD

import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import type { Metadata, Viewport } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/common/WhatsAppFloat'
import {
  SITE_CONFIG,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  jsonLdString,
} from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-0P3FB0C5M2'
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
  'WQ5pp2ZcguVqttTSVh9In061Mv6bDqcHJSqhJFmijdw'

// ============================================================================
// Default metadata for the entire site
// Individual routes can override via their own `layout.tsx` / `page.tsx`.
// The title template allows pages to set short titles (e.g. "Boom Barriers")
// that render as "Boom Barriers | Park Space Hyderabad".
// ============================================================================
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.titleDefault,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.business.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.business.name,
  publisher: SITE_CONFIG.business.name,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'boom barriers Hyderabad',
    'parking automation Hyderabad',
    'CCTV installation Hyderabad',
    'biometric attendance systems',
    'FAAC dealer Hyderabad',
    'automated parking systems',
    'access control systems Hyderabad',
    'security automation Telangana',
    'boom barrier price Hyderabad',
    'CCTV camera dealers Hyderabad',
  ],
  category: 'Security & Automation',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.titleDefault,
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.titleDefault,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitterHandle,
    creator: SITE_CONFIG.twitterHandle,
    title: SITE_CONFIG.titleDefault,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/icon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/images/icon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/images/apple-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  other: {
    'geo.region': 'IN-TG',
    'geo.placename': 'Hyderabad',
    'geo.position': `${SITE_CONFIG.business.geo.latitude};${SITE_CONFIG.business.geo.longitude}`,
    ICBM: `${SITE_CONFIG.business.geo.latitude}, ${SITE_CONFIG.business.geo.longitude}`,
  },
}

export const viewport: Viewport = {
  themeColor: '#ec4899',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationJsonLd = generateOrganizationSchema()
  const localBusinessJsonLd = generateLocalBusinessSchema()
  const websiteJsonLd = generateWebsiteSchema()

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Performance: preconnect to third-party origins used site-wide */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Site-wide structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(websiteJsonLd) }}
        />
      </head>

      <body className={`${inter.className} antialiased`}>
        {/* Accessibility: skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>

        <WhatsAppFloat />

        {/* Google Analytics - loaded after hydration to avoid blocking LCP */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: true, anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  )
}
