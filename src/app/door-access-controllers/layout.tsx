// src/app/door-access-controllers/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Door Access Control Systems in Hyderabad - ZKTeco, Honeywell',
  description:
    'Door access control systems in Hyderabad from ZKTeco, Honeywell, Hikvision Access, Matrix and Suprema. RFID, card, PIN and biometric door locks for offices, data centres and residential buildings.',
  keywords: [
    'door access control Hyderabad',
    'ZKTeco dealer Hyderabad',
    'Honeywell access control',
    'RFID access system Hyderabad',
    'card access reader Hyderabad',
    'access control installation',
    'biometric door lock Hyderabad',
  ],
  canonical: '/door-access-controllers',
  ogImage: '/images/services/door-access-control.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Door Access Controllers', url: '/door-access-controllers' },
])

const serviceSchema = generateServiceSchema({
  name: 'Door Access Control Systems in Hyderabad',
  description:
    'Design, supply and installation of door access control systems in Hyderabad — RFID, card, PIN and biometric locks with centralized management.',
  slug: '/door-access-controllers',
  image: '/images/services/door-access-control.jpeg',
  serviceType: 'Access Control',
  brands: ['ZKTeco', 'Honeywell', 'Hikvision Access', 'Matrix', 'Suprema'],
  priceRange: '₹12,000 - ₹80,000',
})

export default function DoorAccessControllersLayout({
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
