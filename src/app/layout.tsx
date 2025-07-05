// src/app/layout.tsx
// Enhanced root layout with SEO, Analytics, and Schema.org integration

import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/common/WhatsAppFloat'
import AnalyticsProvider from '@/components/providers/AnalyticsProvider'
import SchemaProvider from '@/components/providers/SchemaProvider'
import { generateMetadata as generateSEOMetadata, SITE_CONFIG } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

// Root metadata using enhanced SEO system
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  ...generateSEOMetadata({
    title: 'Park Space - Automated Parking Solutions in Hyderabad | Boom Barriers, CCTV, Biometric Systems',
    description: 'Leading provider of boom barriers, CCTV, biometric systems & parking automation in Hyderabad. FAAC authorized dealer. Expert installation & 24/7 support. Get free quote.',
    keywords: [
      'boom barriers Hyderabad',
      'parking automation Hyderabad',
      'FAAC dealers Hyderabad',
      'CCTV installation Hyderabad',
      'biometric attendance systems',
      'automated parking solutions',
      'gate automation Hyderabad',
      'security systems Hyderabad'
    ]
  })
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#ec4899" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        
        {/* Mobile App Capability */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Geo Location Tags for Local SEO */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad" />
        <meta name="geo.position" content="17.4485;78.4048" />
        <meta name="ICBM" content="17.4485, 78.4048" />
        
        {/* Business Information */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Contact Information */}
        <meta name="contact" content="info@parkspace.com" />
        <meta name="author" content="Park Space Automation Solutions" />
        <meta name="copyright" content="© 2025 Park Space Automation Solutions" />
        
        {/* Verification Tags (add your verification codes) */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_CONFIG.url}#organization`,
              "name": SITE_CONFIG.business.name,
              "alternateName": SITE_CONFIG.name,
              "description": SITE_CONFIG.description,
              "url": SITE_CONFIG.url,
              "logo": `${SITE_CONFIG.url}/images/logo.png`,
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": SITE_CONFIG.business.phone,
                "contactType": "customer service",
                "email": SITE_CONFIG.business.email,
                "availableLanguage": ["English", "Hindi", "Telugu"],
                "areaServed": "IN",
                "hoursAvailable": [{
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "19:00"
                }]
              }],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONFIG.business.address.streetAddress,
                "addressLocality": SITE_CONFIG.business.address.addressLocality,
                "addressRegion": SITE_CONFIG.business.address.addressRegion,
                "postalCode": SITE_CONFIG.business.address.postalCode,
                "addressCountry": SITE_CONFIG.business.address.addressCountry
              },
              "sameAs": [
                SITE_CONFIG.social.facebook,
                SITE_CONFIG.social.twitter,
                SITE_CONFIG.social.linkedin,
                SITE_CONFIG.social.youtube
              ]
            })
          }}
        />
        
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${SITE_CONFIG.url}#business`,
              "name": SITE_CONFIG.business.name,
              "description": SITE_CONFIG.description,
              "url": SITE_CONFIG.url,
              "telephone": SITE_CONFIG.business.phone,
              "email": SITE_CONFIG.business.email,
              "priceRange": SITE_CONFIG.business.priceRange,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": SITE_CONFIG.business.address.streetAddress,
                "addressLocality": SITE_CONFIG.business.address.addressLocality,
                "addressRegion": SITE_CONFIG.business.address.addressRegion,
                "postalCode": SITE_CONFIG.business.address.postalCode,
                "addressCountry": SITE_CONFIG.business.address.addressCountry
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "17.4485",
                "longitude": "78.4048"
              },
              "areaServed": {
                "@type": "City",
                "name": "Hyderabad",
                "sameAs": "https://en.wikipedia.org/wiki/Hyderabad"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "17.4485",
                  "longitude": "78.4048"
                },
                "geoRadius": "100000"
              },
              "openingHours": [
                "Mo-Fr 09:00-19:00",
                "Sa 09:00-17:00",
                "Su 10:00-16:00"
              ],
              "sameAs": [
                SITE_CONFIG.social.facebook,
                SITE_CONFIG.social.twitter,
                SITE_CONFIG.social.linkedin,
                SITE_CONFIG.social.youtube
              ]
            })
          }}
        />
        
        {/* Service Schema for Primary Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${SITE_CONFIG.url}/boom-barriers#service`,
              "name": "Boom Barrier Installation Services",
              "description": "Professional boom barrier installation and maintenance services in Hyderabad. Authorized FAAC dealer with expert technicians.",
              "url": `${SITE_CONFIG.url}/boom-barriers`,
              "category": "Security Systems",
              "provider": {
                "@type": "LocalBusiness",
                "@id": `${SITE_CONFIG.url}#business`
              },
              "areaServed": {
                "@type": "City",
                "name": "Hyderabad"
              },
              "serviceType": "Installation and Maintenance",
              "serviceOutput": "Automated parking and vehicle access control systems"
            })
          }}
        />
      </head>
      
      <body className={`${inter.className} antialiased`}>
        {/* Analytics Provider */}
        <AnalyticsProvider />
        
        {/* Schema Provider for dynamic schemas */}
        <SchemaProvider />
        
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main Layout Structure */}
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main id="main-content" className="flex-1">
            {children}
          </main>
          
          <Footer />
        </div>
        
        {/* Floating WhatsApp Button */}
        <WhatsAppFloat />
        
        {/* Performance Monitoring Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Simple performance monitoring
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  setTimeout(function() {
                    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    if (window.gtag && loadTime > 0) {
                      gtag('event', 'page_load_time', {
                        value: Math.round(loadTime),
                        event_category: 'performance'
                      });
                    }
                  }, 0);
                }
              });
              
              // Error tracking
              window.addEventListener('error', function(e) {
                if (window.gtag) {
                  gtag('event', 'exception', {
                    description: e.message,
                    fatal: false
                  });
                }
              });
            `
          }}
        />
      </body>
    </html>
  )
}