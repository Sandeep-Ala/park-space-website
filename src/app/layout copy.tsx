// src/app/layout.tsx
// Fixed root layout with proper Google verification meta tags

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
      'parking automation solutions',
      'CCTV installation Hyderabad',
      'biometric systems',
      'FAAC dealer Hyderabad',
      'automated parking systems',
      'access control systems',
      'parking management Telangana'
    ],
    canonical: '/'
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
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* ✅ FIXED: Google Site Verification - Proper format */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta 
            name="google-site-verification" 
            content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} 
          />
        )}
        
        {/* Other Search Engine Verifications */}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta 
            name="msvalidate.01" 
            content={process.env.NEXT_PUBLIC_BING_VERIFICATION} 
          />
        )}
        
        {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && (
          <meta 
            name="yandex-verification" 
            content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION} 
          />
        )}

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
        
        {/* ✅ IMPROVED: Geo Location Tags for Local SEO */}
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
        
        {/* ✅ ENHANCED: Crawling Instructions */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* ✅ ADDED: Canonical Link */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />
      </head>
      
      <body className={`${inter.className} antialiased`}>
        {/* Global Analytics Provider */}
        <AnalyticsProvider>
          {/* Structured Data Provider */}
          <SchemaProvider>
            
            {/* Main Layout Structure */}
            <div className="min-h-screen flex flex-col bg-white">
              {/* Header */}
              <Header />
              
              {/* Main Content */}
              <main className="flex-1">
                {children}
              </main>
              
              {/* Footer */}
              <Footer />
              
              {/* Floating WhatsApp Button */}
              <WhatsAppFloat />
            </div>
            
          </SchemaProvider>
        </AnalyticsProvider>
        
        {/* ✅ ADDED: Skip Links for Accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
          Skip to main content
        </a>
      </body>
    </html>
  )
}