// src/app/bollard-barriers/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Bollard Barriers in Hyderabad - Automatic & Fixed Bollards',
  description:
    'Heavy-duty automatic and fixed bollard barriers in Hyderabad for high security areas, embassies, airports and corporate HQs. Authorized dealers for Magnetic, BFT, FAAC, Nice and Automatic Systems.',
  keywords: [
    'bollard barriers Hyderabad',
    'automatic bollard Hyderabad',
    'hydraulic bollard installation',
    'high security bollard',
    'retractable bollard Hyderabad',
    'anti-terror bollards',
    'FAAC bollard dealer',
  ],
  canonical: '/bollard-barriers',
  ogImage: '/images/services/bollard-barriers.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Bollard Barriers', url: '/bollard-barriers' },
])

const serviceSchema = generateServiceSchema({
  name: 'Bollard Barriers in Hyderabad',
  description:
    'Supply and installation of hydraulic, automatic and fixed bollard barriers in Hyderabad for high-security applications.',
  slug: '/bollard-barriers',
  image: '/images/services/bollard-barriers.jpeg',
  serviceType: 'Vehicle Access Control',
  brands: ['Magnetic', 'BFT', 'FAAC', 'Nice', 'Automatic Systems'],
  priceRange: '₹80,000 - ₹5,00,000',
})

export default function BollardBarriersLayout({
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
