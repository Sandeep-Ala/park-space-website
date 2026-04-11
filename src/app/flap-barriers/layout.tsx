// src/app/flap-barriers/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Flap Barriers in Hyderabad - Pedestrian Access Control Gates',
  description:
    'Flap barrier turnstiles in Hyderabad for corporate lobbies, metro stations, malls and airports. Speed gates with RFID and biometric integration from BFT, Magnetic and leading brands.',
  keywords: [
    'flap barrier Hyderabad',
    'speed gate Hyderabad',
    'turnstile dealer Hyderabad',
    'pedestrian access control',
    'office lobby turnstile',
    'BFT flap barrier',
    'tripod turnstile Hyderabad',
  ],
  canonical: '/flap-barriers',
  ogImage: '/images/services/flap-barriers.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Flap Barriers', url: '/flap-barriers' },
])

const serviceSchema = generateServiceSchema({
  name: 'Flap Barriers & Speed Gates in Hyderabad',
  description:
    'Supply and installation of flap barrier speed gates and turnstiles for pedestrian access control in Hyderabad.',
  slug: '/flap-barriers',
  image: '/images/services/flap-barriers.jpeg',
  serviceType: 'Pedestrian Access Control',
  brands: ['BFT', 'Magnetic', 'Turnstile', 'Security Plus'],
  priceRange: '₹40,000 - ₹2,00,000',
})

export default function FlapBarriersLayout({
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
