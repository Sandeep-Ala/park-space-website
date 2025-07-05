// src/lib/seo.ts
// Enhanced SEO system with keyword management for Park Space website

import { Metadata } from 'next'

// ========================
// KEYWORD MANAGEMENT SYSTEM
// ========================

interface KeywordSet {
  primary: string[]
  secondary: string[]
  local: string[]
  service: string[]
  brand: string[]
  longTail: string[]
}

export const SITE_KEYWORDS: KeywordSet = {
  // Primary high-value keywords
  primary: [
    'boom barriers Hyderabad',
    'parking automation Hyderabad',
    'automated parking solutions',
    'CCTV installation Hyderabad',
    'biometric attendance systems'
  ],
  
  // Secondary supporting keywords
  secondary: [
    'FAAC dealers Hyderabad',
    'gate automation Hyderabad',
    'security systems Hyderabad',
    'door access control',
    'parking management systems',
    'vehicle access control'
  ],
  
  // Local SEO keywords
  local: [
    'Hyderabad parking solutions',
    'Telangana security systems',
    'Gachibowli boom barriers',
    'Hitec City CCTV',
    'Kukatpally gate automation',
    'Secunderabad parking automation'
  ],
  
  // Service-specific keywords
  service: [
    'boom barrier installation',
    'CCTV surveillance setup',
    'biometric system installation',
    'fire alarm systems',
    'networking solutions',
    'bollard barriers'
  ],
  
  // Brand-specific keywords
  brand: [
    'FAAC boom barriers',
    'Hikvision CCTV',
    'TIME WATCH biometric',
    'ZKTeco access control',
    'CP Plus cameras',
    'Matrix systems'
  ],
  
  // Long-tail keywords for specific needs
  longTail: [
    'boom barrier installation cost Hyderabad',
    'best CCTV company in Hyderabad',
    'biometric attendance system price',
    'automated parking gate Hyderabad',
    'security camera installation near me',
    'parking automation for apartments'
  ]
}

// ========================
// DYNAMIC KEYWORD FUNCTIONS
// ========================

// Add new keywords to specific categories
export const addKeywords = (category: keyof KeywordSet, keywords: string[]) => {
  SITE_KEYWORDS[category] = [...SITE_KEYWORDS[category], ...keywords]
}

// Get keywords by priority
export const getKeywordsByPriority = (maxCount: number = 10): string[] => {
  return [
    ...SITE_KEYWORDS.primary,
    ...SITE_KEYWORDS.secondary,
    ...SITE_KEYWORDS.local
  ].slice(0, maxCount)
}

// Get service-specific keywords
export const getServiceKeywords = (serviceName: string): string[] => {
  const serviceMap: Record<string, string[]> = {
    'boom-barriers': [
      'boom barriers Hyderabad',
      'FAAC boom barriers',
      'automatic boom barriers',
      'parking gate barriers',
      'vehicle access barriers'
    ],
    'cctv-services': [
      'CCTV installation Hyderabad',
      'Hikvision CCTV',
      'security cameras',
      'surveillance systems',
      'IP cameras Hyderabad'
    ],
    'biometric-attendance': [
      'biometric attendance Hyderabad',
      'TIME WATCH systems',
      'fingerprint attendance',
      'face recognition systems',
      'employee attendance tracking'
    ],
    'door-access-controllers': [
      'door access control Hyderabad',
      'ZKTeco access control',
      'biometric door locks',
      'RFID access systems',
      'smart door automation'
    ]
  }
  
  return serviceMap[serviceName] || SITE_KEYWORDS.service
}

// ========================
// SITE CONFIGURATION
// ========================

export const SITE_CONFIG = {
  name: 'Park Space',
  title: 'Park Space - Automated Parking Solutions in Hyderabad',
  description: 'Leading provider of boom barriers, CCTV, biometric systems & parking automation in Hyderabad. FAAC authorized dealer. Expert installation & 24/7 support.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://parkspace.com',
  ogImage: '/images/og-image.jpg',
  author: 'Park Space Automation Solutions',
  
  // Business Information
  business: {
    name: 'Park Space Automation Solutions',
    type: 'LocalBusiness',
    address: {
      streetAddress: 'Plot No. 123, Industrial Area',
      addressLocality: 'Kukatpally',
      addressRegion: 'Telangana',
      postalCode: '500072',
      addressCountry: 'IN'
    },
    phone: '+91-98765-43210',
    email: 'info@parkspace.com',
    priceRange: '₹₹₹',
    areaServed: 'Hyderabad, Telangana, India'
  },
  
  // Social Media
  social: {
    facebook: 'https://facebook.com/parkspacehyderabad',
    twitter: 'https://twitter.com/parkspacetech',
    linkedin: 'https://linkedin.com/company/parkspace',
    youtube: 'https://youtube.com/@parkspacehyderabad'
  }
}

// ========================
// SEO METADATA GENERATION
// ========================

interface SEOProps {
  title?: string
  description?: string
  keywords?: string | string[]
  canonical?: string
  ogImage?: string
  noIndex?: boolean
  type?: 'website' | 'article' | 'service'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  service?: string
}

export const generateMetadata = ({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  service
}: SEOProps = {}): Metadata => {
  
  // Construct final title
  const finalTitle = title 
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.title
  
  // Construct description
  const finalDescription = description || SITE_CONFIG.description
  
  // Handle keywords
  let finalKeywords: string[] = []
  if (typeof keywords === 'string') {
    finalKeywords = keywords.split(',').map(k => k.trim())
  } else if (Array.isArray(keywords)) {
    finalKeywords = keywords
  }
  
  // Add service-specific keywords if service is provided
  if (service) {
    finalKeywords = [...finalKeywords, ...getServiceKeywords(service)]
  }
  
  // Add default keywords if none provided
  if (finalKeywords.length === 0) {
    finalKeywords = getKeywordsByPriority(15)
  }
  
  // Construct canonical URL
  const canonicalUrl = canonical 
    ? `${SITE_CONFIG.url}${canonical}`
    : SITE_CONFIG.url
  
  // Construct OG image URL - use relative path, metadataBase will resolve it
  const ogImagePath = ogImage || SITE_CONFIG.ogImage
  
  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    authors: [{ name: author || SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.business.name,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    
    // Open Graph - use relative paths, metadataBase will resolve them
    openGraph: {
      type: type === 'website' ? 'website' : 'article',
      url: canonicalUrl,
      title: finalTitle,
      description: finalDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImagePath, // This will be resolved by metadataBase
          width: 1200,
          height: 630,
          alt: finalTitle
        }
      ],
      locale: 'en_IN',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },
    
    // Twitter - use relative paths
    twitter: {
      card: 'summary_large_image',
      site: '@parkspacetech',
      creator: '@parkspacetech',
      title: finalTitle,
      description: finalDescription,
      images: [ogImagePath] // This will be resolved by metadataBase
    },
    
    // Additional metadata
    alternates: {
      canonical: canonicalUrl
    },
    
    // Verification (add your codes here)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION
    },
    
    // Category for articles
    ...(type === 'article' && { category: 'Technology' })
  }
}

// ========================
// SCHEMA.ORG STRUCTURED DATA
// ========================

// Generate LocalBusiness schema
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}#business`,
    name: SITE_CONFIG.business.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.business.phone,
    email: SITE_CONFIG.business.email,
    priceRange: SITE_CONFIG.business.priceRange,
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.business.address.streetAddress,
      addressLocality: SITE_CONFIG.business.address.addressLocality,
      addressRegion: SITE_CONFIG.business.address.addressRegion,
      postalCode: SITE_CONFIG.business.address.postalCode,
      addressCountry: SITE_CONFIG.business.address.addressCountry
    },
    
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '17.4485', // Kukatpally coordinates
      longitude: '78.4048'
    },
    
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
      sameAs: 'https://en.wikipedia.org/wiki/Hyderabad'
    },
    
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '17.4485',
        longitude: '78.4048'
      },
      geoRadius: '100000' // 100km radius
    },
    
    openingHours: [
      'Mo-Fr 09:00-19:00',
      'Sa 09:00-17:00',
      'Su 10:00-16:00'
    ],
    
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.youtube
    ]
  }
}

// Generate Service schema for specific services
export const generateServiceSchema = (service: {
  name: string
  description: string
  url: string
  price?: string
  category: string
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_CONFIG.url}${service.url}#service`,
    name: service.name,
    description: service.description,
    url: `${SITE_CONFIG.url}${service.url}`,
    category: service.category,
    ...(service.price && { price: service.price }),
    
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE_CONFIG.url}#business`
    },
    
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad'
    },
    
    serviceType: service.category,
    serviceOutput: service.description
  }
}

// Generate Organization schema
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}#organization`,
    name: SITE_CONFIG.business.name,
    alternateName: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.business.phone,
        contactType: 'customer service',
        email: SITE_CONFIG.business.email,
        availableLanguage: ['English', 'Hindi', 'Telugu'],
        areaServed: 'IN',
        hoursAvailable: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '19:00'
          }
        ]
      }
    ],
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.business.address.streetAddress,
      addressLocality: SITE_CONFIG.business.address.addressLocality,
      addressRegion: SITE_CONFIG.business.address.addressRegion,
      postalCode: SITE_CONFIG.business.address.postalCode,
      addressCountry: SITE_CONFIG.business.address.addressCountry
    },
    
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.youtube
    ]
  }
}

// ========================
// BREADCRUMB SCHEMA
// ========================

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`
    }))
  }
}

// ========================
// FAQ SCHEMA
// ========================

export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// ========================
// UTILITY FUNCTIONS
// ========================

// Generate page-specific keywords
export const generatePageKeywords = (
  baseKeywords: string[],
  pageType: string,
  location: string = 'Hyderabad'
): string[] => {
  const locationVariations = [location, `${location} ${pageType}`, `${pageType} in ${location}`]
  return [...baseKeywords, ...locationVariations, ...SITE_KEYWORDS.local]
}

// Get trending keywords (you can update this based on search trends)
export const getTrendingKeywords = (): string[] => {
  return [
    'smart parking solutions',
    'contactless access control',
    'AI-powered security systems',
    'IoT parking management',
    'automated vehicle recognition',
    'cloud-based CCTV'
  ]
}

// Export default SEO configuration for easier imports
export default {
  SITE_CONFIG,
  SITE_KEYWORDS,
  generateMetadata,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  addKeywords,
  getKeywordsByPriority,
  getServiceKeywords,
  generatePageKeywords,
  getTrendingKeywords
}