// src/app/swing-gates/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Automatic Swing Gate Motors in Hyderabad - FAAC, BFT, Nice',
  description:
    'Automatic swing gate motors in Hyderabad for villas, offices and gated communities. FAAC, BFT, Nice, Came and V2 motors with remote, keypad and app-based operation. Installation and AMC.',
  keywords: [
    'automatic swing gate Hyderabad',
    'swing gate motor Hyderabad',
    'FAAC swing gate dealer',
    'BFT swing gate',
    'Nice swing gate motor',
    'residential gate automation',
    'villa gate motor Hyderabad',
  ],
  canonical: '/swing-gates',
  ogImage: '/images/services/swing-gates.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Swing Gates', url: '/swing-gates' },
])

const serviceSchema = generateServiceSchema({
  name: 'Automatic Swing Gate Motors in Hyderabad',
  description:
    'Supply and installation of automatic swing gate motors in Hyderabad for residential villas, corporate offices and community entrances.',
  slug: '/swing-gates',
  image: '/images/services/swing-gates.jpeg',
  serviceType: 'Gate Automation',
  brands: ['FAAC', 'BFT', 'Nice', 'Came', 'V2'],
  priceRange: '₹22,000 - ₹1,50,000',
})

export default function SwingGatesLayout({
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
