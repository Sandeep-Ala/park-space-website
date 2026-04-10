// src/lib/seo.ts
// Central SEO configuration: metadata helpers + Schema.org structured data

import type { Metadata } from 'next'

// ============================================================================
// SITE CONFIGURATION (single source of truth)
// ============================================================================

export const SITE_CONFIG = {
  name: 'Park Space',
  legalName: 'Park Space Automation Solutions',
  titleDefault:
    'Park Space - Boom Barriers, CCTV & Parking Automation in Hyderabad',
  titleTemplate: '%s | Park Space Hyderabad',
  description:
    'Hyderabad based provider of boom barriers, CCTV surveillance, biometric attendance, access control and parking automation. FAAC authorized dealer with expert installation, AMC and 24x7 support.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://parkspace.in',
  locale: 'en_IN',
  ogImage: '/images/og-image.jpg',
  twitterHandle: '@parkspacetech',

  business: {
    name: 'Park Space Automation Solutions',
    foundingDate: '2019',
    phone: '+91-63027-89421',
    phoneTel: '+916302789421',
    email: 'info@parkspace.in',
    address: {
      streetAddress:
        'Plot No: 8-93/2/1, Srinivasa Nagar, Chintal, Qutubullapur',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500054',
      addressCountry: 'IN',
    },
    geo: {
      latitude: '17.4948',
      longitude: '78.4296',
    },
    openingHours: ['Mo-Sa 09:00-19:00'],
    priceRange: '₹₹',
    areaServed: ['Hyderabad', 'Secunderabad', 'Cyberabad', 'Telangana'],
  },

  social: {
    facebook: 'https://www.facebook.com/parkspace',
    linkedin: 'https://www.linkedin.com/company/parkspace',
    instagram: 'https://www.instagram.com/parkspacetech',
  },
} as const

// ============================================================================
// METADATA GENERATOR
// ============================================================================

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string | string[]
  canonical?: string
  ogImage?: string
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

const DEFAULT_KEYWORDS = [
  'boom barriers Hyderabad',
  'parking automation Hyderabad',
  'CCTV installation Hyderabad',
  'biometric attendance systems',
  'FAAC dealer Hyderabad',
  'automated parking systems',
  'access control systems Hyderabad',
  'security automation Telangana',
]

export const generateMetadata = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps = {}): Metadata => {
  const finalDescription = description ?? SITE_CONFIG.description

  // Normalize keywords
  let finalKeywords: string[] = DEFAULT_KEYWORDS
  if (typeof keywords === 'string') {
    finalKeywords = keywords.split(',').map((k) => k.trim()).filter(Boolean)
  } else if (Array.isArray(keywords) && keywords.length > 0) {
    finalKeywords = keywords
  }

  // Canonical URL
  const canonicalPath = canonical?.startsWith('http')
    ? canonical
    : `${SITE_CONFIG.url}${canonical ?? '/'}`

  const ogImageUrl = (ogImage ?? SITE_CONFIG.ogImage).startsWith('http')
    ? (ogImage ?? SITE_CONFIG.ogImage)
    : `${SITE_CONFIG.url}${ogImage ?? SITE_CONFIG.ogImage}`

  return {
    title: title ?? { absolute: SITE_CONFIG.titleDefault },
    description: finalDescription,
    keywords: finalKeywords,
    authors: [{ name: SITE_CONFIG.business.name }],
    creator: SITE_CONFIG.business.name,
    publisher: SITE_CONFIG.business.name,
    category: 'Security & Automation',

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
      url: canonicalPath,
      title: title ?? SITE_CONFIG.titleDefault,
      description: finalDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title ?? SITE_CONFIG.titleDefault,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: title ?? SITE_CONFIG.titleDefault,
      description: finalDescription,
      images: [ogImageUrl],
    },

    other: {
      'geo.region': 'IN-TG',
      'geo.placename': 'Hyderabad',
      'geo.position': `${SITE_CONFIG.business.geo.latitude};${SITE_CONFIG.business.geo.longitude}`,
      ICBM: `${SITE_CONFIG.business.geo.latitude}, ${SITE_CONFIG.business.geo.longitude}`,
    },
  }
}

// ============================================================================
// SCHEMA.ORG STRUCTURED DATA HELPERS
// ============================================================================

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_CONFIG.url}#organization`,
  name: SITE_CONFIG.business.name,
  alternateName: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_CONFIG.url}/images/logo.png`,
    width: 300,
    height: 100,
  },
  foundingDate: SITE_CONFIG.business.foundingDate,
  description: SITE_CONFIG.description,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.business.phone,
    email: SITE_CONFIG.business.email,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi', 'Telugu'],
  },
  address: {
    '@type': 'PostalAddress',
    ...SITE_CONFIG.business.address,
  },
  sameAs: Object.values(SITE_CONFIG.social),
})

export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_CONFIG.url}#localbusiness`,
  name: SITE_CONFIG.business.name,
  image: `${SITE_CONFIG.url}/images/og-image.jpg`,
  logo: `${SITE_CONFIG.url}/images/logo.png`,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.business.phone,
  email: SITE_CONFIG.business.email,
  priceRange: SITE_CONFIG.business.priceRange,
  address: {
    '@type': 'PostalAddress',
    ...SITE_CONFIG.business.address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE_CONFIG.business.geo.latitude,
    longitude: SITE_CONFIG.business.geo.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  areaServed: SITE_CONFIG.business.areaServed.map((name) => ({
    '@type': 'City',
    name,
  })),
  sameAs: Object.values(SITE_CONFIG.social),
})

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.url}#website`,
  url: SITE_CONFIG.url,
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  publisher: { '@id': `${SITE_CONFIG.url}#organization` },
  inLanguage: 'en-IN',
})

export interface BreadcrumbItem {
  name: string
  url: string
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url.startsWith('http')
      ? item.url
      : `${SITE_CONFIG.url}${item.url}`,
  })),
})

export interface ServiceSchemaProps {
  name: string
  description: string
  slug: string
  image?: string
  serviceType?: string
  brands?: string[]
  priceRange?: string
}

export const generateServiceSchema = ({
  name,
  description,
  slug,
  image,
  serviceType,
  brands,
  priceRange,
}: ServiceSchemaProps) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_CONFIG.url}${slug}#service`,
  name,
  description,
  serviceType: serviceType ?? name,
  provider: { '@id': `${SITE_CONFIG.url}#organization` },
  areaServed: SITE_CONFIG.business.areaServed.map((locality) => ({
    '@type': 'City',
    name: locality,
  })),
  url: `${SITE_CONFIG.url}${slug}`,
  ...(image && {
    image: image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`,
  }),
  ...(priceRange && { offers: { '@type': 'Offer', priceCurrency: 'INR', priceRange } }),
  ...(brands && brands.length > 0 && {
    brand: brands.map((brandName) => ({ '@type': 'Brand', name: brandName })),
  }),
})

export interface FAQItem {
  question: string
  answer: string
}

export const generateFAQSchema = (faqs: FAQItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
})

// Helper to stringify JSON-LD safely for dangerouslySetInnerHTML
export const jsonLdString = (data: unknown): string =>
  JSON.stringify(data).replace(/</g, '\\u003c')
