// src/app/biometric-attendance/layout.tsx

import type { Metadata } from 'next'
import {
  generateMetadata as generateSEOMetadata,
  generateBreadcrumbSchema,
  generateServiceSchema,
  jsonLdString,
} from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Biometric Attendance Systems in Hyderabad - ESSL, Matrix, Suprema',
  description:
    'Biometric attendance and time tracking systems in Hyderabad featuring ESSL, Matrix, Suprema, Realtime and TIME WATCH devices. Fingerprint, face and card-based attendance with payroll integration.',
  keywords: [
    'biometric attendance Hyderabad',
    'ESSL biometric dealer',
    'Matrix biometric Hyderabad',
    'fingerprint attendance machine Hyderabad',
    'face recognition attendance',
    'time attendance system Hyderabad',
    'TIME WATCH attendance',
    'biometric dealer Hyderabad',
  ],
  canonical: '/biometric-attendance',
  ogImage: '/images/services/biometric-systems.jpeg',
})

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Services', url: '/#services' },
  { name: 'Biometric Attendance', url: '/biometric-attendance' },
])

const serviceSchema = generateServiceSchema({
  name: 'Biometric Attendance Systems in Hyderabad',
  description:
    'Supply, installation and integration of biometric attendance systems in Hyderabad — fingerprint, face recognition and RFID card based solutions with payroll integration.',
  slug: '/biometric-attendance',
  image: '/images/services/biometric-systems.jpeg',
  serviceType: 'Biometric Attendance',
  brands: ['ESSL', 'Matrix', 'Suprema', 'Realtime', 'TIME WATCH'],
  priceRange: '₹8,000 - ₹50,000',
})

export default function BiometricAttendanceLayout({
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
