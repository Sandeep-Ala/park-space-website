// src/app/fire-alarm-systems/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Fire Alarm Systems in Hyderabad - Honeywell, Siemens, Bosch',
  description:
    'Fire alarm and detection systems in Hyderabad from Honeywell, Siemens, Johnson Controls, Bosch and Hochiki. Conventional and addressable panels, smoke detectors and fire safety compliance.',
  keywords: [
    'fire alarm system Hyderabad',
    'Honeywell fire alarm',
    'Siemens fire alarm dealer',
    'addressable fire alarm panel',
    'smoke detector installation Hyderabad',
    'fire safety systems Hyderabad',
    'fire alarm AMC Hyderabad',
  ],
  canonical: '/fire-alarm-systems',
  ogImage: '/images/services/fire-alarm-systems.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Fire & Alarm Systems', url: '/fire-alarm-systems' },
])

const serviceSchema = generateServiceSchema({
  name: 'Fire & Alarm Systems in Hyderabad',
  description:
    'Design, supply, installation and AMC of fire alarm and detection systems across Hyderabad — conventional and addressable panels with smoke, heat and beam detectors.',
  slug: '/fire-alarm-systems',
  image: '/images/services/fire-alarm-systems.jpeg',
  serviceType: 'Fire Safety',
  brands: ['Honeywell', 'Siemens', 'Johnson Controls', 'Bosch', 'Hochiki'],
  priceRange: '₹15,000 - ₹2,50,000',
})

export default function FireAlarmSystemsLayout({
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
