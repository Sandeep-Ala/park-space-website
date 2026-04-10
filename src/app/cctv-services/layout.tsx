// src/app/cctv-services/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'CCTV Installation in Hyderabad - Hikvision, Dahua, CP Plus Dealers',
  description:
    'Professional CCTV camera installation in Hyderabad with Hikvision, Dahua, CP Plus, Axis and Samsung Wisenet. HD / 4K IP cameras, DVR/NVR, remote mobile access and AMC. Free site survey and quote.',
  keywords: [
    'CCTV installation Hyderabad',
    'Hikvision dealer Hyderabad',
    'Dahua CCTV Hyderabad',
    'CP Plus CCTV dealer',
    'IP camera Hyderabad',
    'CCTV camera price Hyderabad',
    'CCTV AMC Hyderabad',
    'security camera installation Hyderabad',
  ],
  canonical: '/cctv-services',
  ogImage: '/images/services/cctv-systems.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'CCTV Services', url: '/cctv-services' },
])

const serviceSchema = generateServiceSchema({
  name: 'CCTV Surveillance Systems in Hyderabad',
  description:
    'End-to-end CCTV surveillance solutions in Hyderabad: site survey, supply, installation, configuration and AMC of HD and 4K IP cameras from leading brands.',
  slug: '/cctv-services',
  image: '/images/services/cctv-systems.jpeg',
  serviceType: 'CCTV Surveillance',
  brands: ['Hikvision', 'Dahua', 'CP Plus', 'Axis', 'Samsung Wisenet'],
  priceRange: '₹15,000 - ₹2,00,000',
})

export default function CCTVServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(serviceSchema) }}
      />
      {children}
    </>
  )
}
