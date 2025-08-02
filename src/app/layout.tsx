// src/app/layout.tsx
// ✅ STANDALONE SOLUTION: No external dependencies, hard-coded indexing

import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/common/WhatsAppFloat'

const inter = Inter({ subsets: ['latin'] })

// ✅ HARD-CODED metadata with FORCED indexing (no external dependencies)
export const metadata: Metadata = {
  metadataBase: new URL('https://parkspace.in'),
  title: 'Park Space - Automated Parking Solutions in Hyderabad | Boom Barriers, CCTV, Biometric Systems',
  description: 'Leading provider of boom barriers, CCTV, biometric systems & parking automation in Hyderabad. FAAC authorized dealer. Expert installation & 24/7 support. Get free quote.',
  keywords: 'boom barriers Hyderabad, parking automation solutions, CCTV installation Hyderabad, biometric systems, FAAC dealer Hyderabad, automated parking systems, access control systems, parking management Telangana',
  authors: [{ name: 'Park Space Automation Solutions' }],
  creator: 'Park Space Automation Solutions',
  publisher: 'Park Space Automation Solutions',
  
  // ✅ CRITICAL: FORCE indexing with explicit robots directive
  robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  
  // Open Graph
  openGraph: {
    type: 'website',
    url: 'https://parkspace.in',
    title: 'Park Space - Automated Parking Solutions in Hyderabad',
    description: 'Leading provider of boom barriers, CCTV, biometric systems & parking automation in Hyderabad. FAAC authorized dealer.',
    siteName: 'Park Space',
    images: [
      {
        url: 'https://parkspace.in/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Park Space - Automated Parking Solutions in Hyderabad'
      }
    ],
    locale: 'en_IN'
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@parkspacetech',
    creator: '@parkspacetech',
    title: 'Park Space - Automated Parking Solutions in Hyderabad',
    description: 'Leading provider of boom barriers, CCTV, biometric systems & parking automation in Hyderabad.',
    images: ['https://parkspace.in/images/og-image.jpg']
  },
  
  // Additional metadata
  alternates: {
    canonical: 'https://parkspace.in'
  },
  
  // Verification - HARD-CODED
  verification: {
    google: 'WQ5pp2ZcguVqttTSVh9In061Mv6bDqcHJSqhJFmijdw'
  },
  
  // Enhanced metadata
  other: {
    'revisit-after': '7 days',
    'distribution': 'global',
    'rating': 'general',
    'contact': 'info@parkspace.in',
    'copyright': '© 2025 Park Space Automation Solutions',
    'geo.region': 'IN-TG',
    'geo.placename': 'Hyderabad',
    'geo.position': '17.4485;78.4048',
    'ICBM': '17.4485, 78.4048',
    'format-detection': 'telephone=yes',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ CRITICAL: Multiple robots directives to ensure indexing */}
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow,max-video-preview:-1,max-image-preview:large,max-snippet:-1" />
        <meta name="bingbot" content="index,follow" />
        
        {/* ✅ HARD-CODED Google verification */}
        <meta name="google-site-verification" content="WQ5pp2ZcguVqttTSVh9In061Mv6bDqcHJSqhJFmijdw" />
        
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
        <meta name="contact" content="info@parkspace.in" />
        <meta name="author" content="Park Space Automation Solutions" />
        <meta name="copyright" content="© 2025 Park Space Automation Solutions" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://parkspace.in" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0P3FB0C5M2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0P3FB0C5M2', {
                send_page_view: true,
                anonymize_ip: true
              });
            `
          }}
        />

        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://parkspace.in#organization",
              "name": "Park Space Automation Solutions",
              "alternateName": "Park Space",
              "description": "Leading provider of boom barriers, CCTV, biometric systems & parking automation in Hyderabad",
              "url": "https://parkspace.in",
              "logo": "https://parkspace.in/images/logo.png",
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+91-63027-89421",
                "contactType": "customer service",
                "email": "info@parkspace.in",
                "areaServed": "Hyderabad",
                "availableLanguage": ["English", "Hindi", "Telugu"]
              }],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana", 
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.facebook.com/parkspace",
                "https://www.linkedin.com/company/parkspace"
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
              "@id": "https://parkspace.in#business",
              "name": "Park Space Automation Solutions",
              "description": "Professional installation of boom barriers, CCTV systems, biometric attendance, and parking automation solutions in Hyderabad. Authorized FAAC dealer.",
              "url": "https://parkspace.in",
              "telephone": "+91-63027-89421",
              "email": "info@parkspace.in",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "17.4485",
                "longitude": "78.4048"
              },
              "areaServed": {
                "@type": "City",
                "name": "Hyderabad"
              },
              "serviceType": "Parking Automation & Security Systems",
              "priceRange": "$$"
            })
          }}
        />
      </head>
      
      <body className={`${inter.className} antialiased`}>
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
        
        
      </body>
    </html>
  )
}