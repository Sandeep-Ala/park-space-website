// src/app/networking-systems/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Networking Solutions in Hyderabad - Cisco, Ubiquiti, TP-Link',
  description:
    'Business networking and IT infrastructure solutions in Hyderabad — structured cabling, routers, switches, firewalls, Wi-Fi and server room setup from Cisco, D-Link, TP-Link, Ubiquiti and Netgear.',
  keywords: [
    'networking solutions Hyderabad',
    'Cisco dealer Hyderabad',
    'Ubiquiti UniFi Hyderabad',
    'structured cabling Hyderabad',
    'office WiFi setup Hyderabad',
    'network switch installation',
    'IT infrastructure Hyderabad',
  ],
  canonical: '/networking-systems',
  ogImage: '/images/services/networking-systems.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Networking Systems', url: '/networking-systems' },
])

const serviceSchema = generateServiceSchema({
  name: 'Networking & IT Infrastructure in Hyderabad',
  description:
    'Networking and IT infrastructure services in Hyderabad including structured cabling, routers, switches, Wi-Fi, firewalls and server room setup.',
  slug: '/networking-systems',
  image: '/images/services/networking-systems.jpeg',
  serviceType: 'Networking & IT Infrastructure',
  brands: ['Cisco', 'D-Link', 'TP-Link', 'Ubiquiti', 'Netgear'],
  priceRange: '₹5,000 - ₹1,50,000',
})

export default function NetworkingSystemsLayout({
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
