// src/app/boom-barriers/layout.tsx
// Server layout that provides metadata + structured data for the
// (client-component) Boom Barriers page.

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Boom Barriers in Hyderabad - FAAC, Benica, Roger Dealers',
  description:
    'Buy and install boom barriers in Hyderabad from authorized dealers of FAAC, Benica, Roger, Syrotech and AGS. Sales, installation, repair and AMC for residential, commercial and industrial properties. Get a free quote.',
  keywords: [
    'boom barriers Hyderabad',
    'FAAC boom barrier dealer Hyderabad',
    'automatic boom barrier price Hyderabad',
    'boom barrier installation',
    'Benica boom barrier',
    'Roger boom barrier',
    'parking boom barrier Hyderabad',
    'boom barrier AMC Hyderabad',
  ],
  canonical: '/boom-barriers',
  ogImage: '/images/services/boom-barriers.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Boom Barriers', url: '/boom-barriers' },
])

const serviceSchema = generateServiceSchema({
  name: 'Boom Barriers Installation in Hyderabad',
  description:
    'Professional sales, installation, repair and AMC of automatic boom barriers in Hyderabad from authorized dealers of FAAC, Benica, Roger, Syrotech and AGS.',
  slug: '/boom-barriers',
  image: '/images/services/boom-barriers.jpeg',
  serviceType: 'Vehicle Access Control',
  brands: ['FAAC', 'Benica', 'Roger Technology', 'Syrotech', 'AGS'],
  priceRange: '₹35,000 - ₹2,50,000',
})

export default function BoomBarriersLayout({
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
