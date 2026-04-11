// src/app/sliding-gate-motors/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Sliding Gate Motors in Hyderabad - FAAC, BFT, Nice, Came',
  description:
    'Heavy duty sliding gate motors in Hyderabad for industrial, commercial and large residential gates. FAAC, BFT, Nice, Came and Roger Technology motors with installation, service and AMC.',
  keywords: [
    'sliding gate motor Hyderabad',
    'FAAC sliding gate dealer',
    'BFT sliding gate motor',
    'industrial sliding gate automation',
    'heavy duty gate motor Hyderabad',
    'sliding gate installation Hyderabad',
    'gate automation Hyderabad',
  ],
  canonical: '/sliding-gate-motors',
  ogImage: '/images/services/sliding-gate-motors.jpg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Sliding Gate Motors', url: '/sliding-gate-motors' },
])

const serviceSchema = generateServiceSchema({
  name: 'Sliding Gate Motors in Hyderabad',
  description:
    'Heavy duty sliding gate motor supply and installation in Hyderabad for industrial, commercial and large residential applications.',
  slug: '/sliding-gate-motors',
  image: '/images/services/sliding-gate-motors.jpg',
  serviceType: 'Gate Automation',
  brands: ['FAAC', 'BFT', 'Nice', 'Came', 'Roger Technology'],
  priceRange: '₹25,000 - ₹1,00,000',
})

export default function SlidingGateMotorsLayout({
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
