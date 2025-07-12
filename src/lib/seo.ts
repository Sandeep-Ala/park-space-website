// File: src/lib/seo.ts
// Enhanced SEO system with keyword management for Park Space website - Complete 10 Services

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
    'biometric attendance systems',
    'gate automation Hyderabad',
    'security systems Hyderabad',
    'fire alarm systems Hyderabad'
  ],
  
  // Secondary supporting keywords
  secondary: [
    'FAAC dealers Hyderabad',
    'flap barriers Hyderabad',
    'bollard barriers Hyderabad',
    'door access control',
    'parking management systems',
    'vehicle access control',
    'networking systems Hyderabad',
    'sliding gate motors',
    'swing gate automation'
  ],
  
  // Local SEO keywords
  local: [
    'Hyderabad parking solutions',
    'Telangana security systems',
    'Gachibowli boom barriers',
    'Hitec City CCTV',
    'Kukatpally gate automation',
    'Secunderabad parking automation',
    'Madhapur access control',
    'Kondapur security systems',
    'Miyapur gate barriers',
    'Begumpet fire alarms'
  ],
  
  // Service-specific keywords
  service: [
    'boom barrier installation',
    'CCTV surveillance setup',
    'biometric system installation',
    'fire alarm systems',
    'networking solutions',
    'bollard barriers',
    'flap barrier installation',
    'swing gate automation',
    'sliding gate motors',
    'door access controllers'
  ],
  
  // Brand-specific keywords
  brand: [
    'FAAC boom barriers',
    'Hikvision CCTV',
    'TIME WATCH biometric',
    'ZKTeco access control',
    'CP Plus cameras',
    'Matrix systems',
    'BFT barriers',
    'Nice automation',
    'Came gates',
    'Honeywell fire systems',
    'Siemens fire alarms',
    'Cisco networking',
    'D-Link systems'
  ],
  
  // Long-tail keywords for specific needs
  longTail: [
    'boom barrier installation cost Hyderabad',
    'best CCTV company in Hyderabad',
    'biometric attendance system price',
    'automated parking gate Hyderabad',
    'security camera installation near me',
    'parking automation for apartments',
    'flap barrier price in Hyderabad',
    'bollard barrier installation cost',
    'fire alarm system for offices',
    'networking setup for business',
    'swing gate motor price',
    'sliding gate automation cost'
  ]
}

// ========================
// COMPLETE SERVICE MAPPING
// ========================

// Get service-specific keywords for all 10 services
export const getServiceKeywords = (serviceName: string): string[] => {
  const serviceMap: Record<string, string[]> = {
    'boom-barriers': [
      'boom barriers Hyderabad',
      'FAAC boom barriers',
      'automatic boom barriers',
      'parking gate barriers',
      'vehicle access barriers',
      'boom barrier price Hyderabad',
      'parking automation gates'
    ],
    'cctv-services': [
      'CCTV installation Hyderabad',
      'Hikvision CCTV',
      'security cameras',
      'surveillance systems',
      'IP cameras Hyderabad',
      'CCTV camera price',
      'security camera installation'
    ],
    'biometric-attendance': [
      'biometric attendance Hyderabad',
      'TIME WATCH systems',
      'fingerprint attendance',
      'face recognition systems',
      'employee attendance tracking',
      'biometric system price',
      'attendance management'
    ],
    'door-access-controllers': [
      'door access control Hyderabad',
      'ZKTeco access control',
      'biometric door locks',
      'RFID access systems',
      'smart door automation',
      'access control price',
      'door security systems'
    ],
    'flap-barriers': [
      'flap barriers Hyderabad',
      'pedestrian access control',
      'metro flap barriers',
      'office flap barriers',
      'PARK+ flap barriers',
      'BFT flap barriers',
      'turnstile barriers'
    ],
    'bollard-barriers': [
      'bollard barriers Hyderabad',
      'security bollards',
      'vehicle access bollards',
      'hydraulic bollards',
      'anti-terrorism barriers',
      'FAAC bollards',
      'heavy duty bollards'
    ],
    'fire-alarm-systems': [
      'fire alarm systems Hyderabad',
      'Honeywell fire alarms',
      'Siemens fire detection',
      'fire safety systems',
      'smoke detectors',
      'fire protection systems',
      'fire alarm installation'
    ],
    'networking-systems': [
      'networking systems Hyderabad',
      'Cisco networking',
      'D-Link systems',
      'IT infrastructure',
      'network installation',
      'business networking',
      'WiFi installation'
    ],
    'swing-gates': [
      'swing gates Hyderabad',
      'automated swing gates',
      'FAAC swing gates',
      'residential gate automation',
      'swing gate motors',
      'automatic gates',
      'gate automation systems'
    ],
    'sliding-gate-motors': [
      'sliding gate motors Hyderabad',
      'sliding gate automation',
      'gate motor installation',
      'industrial gate motors',
      'heavy duty gate motors',
      'automatic sliding gates',
      'gate motor price'
    ]
  }
  
  return serviceMap[serviceName] || SITE_KEYWORDS.service
}

// ========================
// SITE CONFIGURATION
// ========================

export const SITE_CONFIG = {
  name: 'Park Space',
  title: 'Park Space - Complete Automation Solutions in Hyderabad | Boom Barriers, CCTV, Security Systems',
  description: 'Leading provider of boom barriers, CCTV, biometric systems, fire alarms, networking & complete automation solutions in Hyderabad. FAAC authorized dealer. Expert installation & 24/7 support.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://parkspace.com',
  ogImage: 'public/images/icon-192x192.png',
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
    phone: '+91-63027-89421',
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
// SERVICE-SPECIFIC SEO DATA
// ========================

export const SERVICE_SEO_DATA = {
  'boom-barriers': {
    title: 'Boom Barriers in Hyderabad | FAAC Authorized Dealer | Park Space',
    description: 'Premium boom barriers in Hyderabad. FAAC, BFT, Nice authorized dealer. ₹35,000-₹1,50,000. Professional installation, 24/7 support. Call +91-63027-89421',
    keywords: getServiceKeywords('boom-barriers'),
    schema: {
      name: 'Boom Barrier Installation Services',
      category: 'Parking Automation',
      priceRange: '₹35,000 - ₹1,50,000'
    }
  },
  'cctv-services': {
    title: 'CCTV Installation in Hyderabad | Hikvision, CP Plus Dealer | Park Space',
    description: 'Professional CCTV installation in Hyderabad. Hikvision, CP Plus, Dahua cameras. ₹15,000-₹2,00,000. HD surveillance, remote monitoring. Expert installation.',
    keywords: getServiceKeywords('cctv-services'),
    schema: {
      name: 'CCTV Installation Services',
      category: 'Security Systems',
      priceRange: '₹15,000 - ₹2,00,000'
    }
  },
  'biometric-attendance': {
    title: 'Biometric Attendance Systems in Hyderabad | TIME WATCH Dealer | Park Space',
    description: 'Biometric attendance systems in Hyderabad. TIME WATCH, ESSL, Matrix systems. ₹8,000-₹50,000. Fingerprint, face recognition. Professional installation.',
    keywords: getServiceKeywords('biometric-attendance'),
    schema: {
      name: 'Biometric Attendance Systems',
      category: 'Access Control',
      priceRange: '₹8,000 - ₹50,000'
    }
  },
  'door-access-controllers': {
    title: 'Door Access Control Systems in Hyderabad | ZKTeco Dealer | Park Space',
    description: 'Door access control systems in Hyderabad. ZKTeco, Honeywell systems. ₹12,000-₹80,000. RFID, biometric door locks. Secure access solutions.',
    keywords: getServiceKeywords('door-access-controllers'),
    schema: {
      name: 'Door Access Control Systems',
      category: 'Security Systems',
      priceRange: '₹12,000 - ₹80,000'
    }
  },
  'flap-barriers': {
    title: 'Flap Barriers in Hyderabad | Pedestrian Access Control | Park Space',
    description: 'Flap barriers in Hyderabad for offices, metros. PARK+, BFT, Gunnebo systems. ₹40,000-₹2,00,000. Pedestrian access control, anti-tailgating.',
    keywords: getServiceKeywords('flap-barriers'),
    schema: {
      name: 'Flap Barrier Systems',
      category: 'Access Control',
      priceRange: '₹40,000 - ₹2,00,000'
    }
  },
  'bollard-barriers': {
    title: 'Bollard Barriers in Hyderabad | High Security Vehicle Control | Park Space',
    description: 'Bollard barriers in Hyderabad for high security. FAAC, BFT hydraulic bollards. ₹80,000-₹5,00,000. K4/K8/K12 rated. Anti-terrorism protection.',
    keywords: getServiceKeywords('bollard-barriers'),
    schema: {
      name: 'Bollard Barrier Systems',
      category: 'High Security',
      priceRange: '₹80,000 - ₹5,00,000'
    }
  },
  'fire-alarm-systems': {
    title: 'Fire Alarm Systems in Hyderabad | Honeywell, Siemens Dealer | Park Space',
    description: 'Fire alarm systems in Hyderabad. Honeywell, Siemens, Johnson Controls. ₹15,000-₹2,50,000. Fire detection, voice evacuation. IS 2189 certified.',
    keywords: getServiceKeywords('fire-alarm-systems'),
    schema: {
      name: 'Fire Alarm Systems',
      category: 'Fire Safety',
      priceRange: '₹15,000 - ₹2,50,000'
    }
  },
  'networking-systems': {
    title: 'Networking Systems in Hyderabad | Cisco, D-Link Solutions | Park Space',
    description: 'Networking systems in Hyderabad. Cisco, D-Link, TP-Link solutions. ₹5,000-₹1,50,000. IT infrastructure, WiFi installation. Enterprise networking.',
    keywords: getServiceKeywords('networking-systems'),
    schema: {
      name: 'Networking Systems',
      category: 'IT Infrastructure',
      priceRange: '₹5,000 - ₹1,50,000'
    }
  },
  'swing-gates': {
    title: 'Swing Gates in Hyderabad | Automated Gate Systems | Park Space',
    description: 'Swing gates in Hyderabad. FAAC, BFT, Nice automation. ₹22,000-₹1,50,000. Residential, commercial gate automation. Professional installation.',
    keywords: getServiceKeywords('swing-gates'),
    schema: {
      name: 'Swing Gate Automation',
      category: 'Gate Automation',
      priceRange: '₹22,000 - ₹1,50,000'
    }
  },
  'sliding-gate-motors': {
    title: 'Sliding Gate Motors in Hyderabad | Heavy Duty Automation | Park Space',
    description: 'Sliding gate motors in Hyderabad. FAAC, BFT, Nice motors. ₹25,000-₹1,00,000. Heavy duty automation, industrial gates. Rack & pinion drive.',
    keywords: getServiceKeywords('sliding-gate-motors'),
    schema: {
      name: 'Sliding Gate Motors',
      category: 'Gate Automation',
      priceRange: '₹25,000 - ₹1,00,000'
    }
  }
}

// ========================
// DYNAMIC KEYWORD FUNCTIONS
// ========================

// Add new keywords to specific categories
export const addKeywords = (category: keyof KeywordSet, keywords: string[]) => {
  SITE_KEYWORDS[category] = [...SITE_KEYWORDS[category], ...keywords]
}

// Get keywords by priority
export const getKeywordsByPriority = (maxCount: number = 15): string[] => {
  return [
    ...SITE_KEYWORDS.primary,
    ...SITE_KEYWORDS.secondary,
    ...SITE_KEYWORDS.local
  ].slice(0, maxCount)
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
  
  // Use service-specific SEO data if service is provided
  if (service && SERVICE_SEO_DATA[service as keyof typeof SERVICE_SEO_DATA]) {
    const serviceData = SERVICE_SEO_DATA[service as keyof typeof SERVICE_SEO_DATA]
    title = title || serviceData.title
    description = description || serviceData.description
    keywords = keywords.length ? keywords : serviceData.keywords
  }
  
  // Construct final title
  const finalTitle = title 
    ? title
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
    finalKeywords = getKeywordsByPriority(20)
  }
  
  // Construct canonical URL
  const canonicalUrl = canonical 
    ? `${SITE_CONFIG.url}${canonical}`
    : SITE_CONFIG.url
  
  // Construct OG image URL
  const ogImagePath = ogImage || SITE_CONFIG.ogImage
  
  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    authors: [{ name: author || SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.business.name,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    
    // Open Graph
    openGraph: {
      type: type === 'website' ? 'website' : 'article',
      url: canonicalUrl,
      title: finalTitle,
      description: finalDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImagePath,
          width: 1200,
          height: 630,
          alt: finalTitle
        }
      ],
      locale: 'en_IN',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: '@parkspacetech',
      creator: '@parkspacetech',
      title: finalTitle,
      description: finalDescription,
      images: [ogImagePath]
    },
    
    // Additional metadata
    alternates: {
      canonical: canonicalUrl
    },
    
    // Verification
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
      latitude: '17.4485',
      longitude: '78.4048'
    },
    
    areaServed: [
      {
        '@type': 'City',
        name: 'Hyderabad',
        sameAs: 'https://en.wikipedia.org/wiki/Hyderabad'
      },
      {
        '@type': 'State',
        name: 'Telangana',
        sameAs: 'https://en.wikipedia.org/wiki/Telangana'
      }
    ],
    
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '17.4485',
        longitude: '78.4048'
      },
      geoRadius: '100000'
    },
    
    openingHours: [
      'Mo-Fr 09:00-19:00',
      'Sa 09:00-17:00',
      'Su 10:00-16:00'
    ],
    
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Automation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Boom Barriers',
            description: 'Automated parking gate barriers'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CCTV Systems',
            description: 'Security camera installation and monitoring'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Biometric Systems',
            description: 'Attendance and access control systems'
          }
        }
      ]
    },
    
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
    serviceOutput: service.description,
    
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: service.price,
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01',
      areaServed: {
        '@type': 'City',
        name: 'Hyderabad'
      }
    }
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

// Get trending keywords
export const getTrendingKeywords = (): string[] => {
  return [
    'smart parking solutions',
    'contactless access control',
    'AI-powered security systems',
    'IoT parking management',
    'automated vehicle recognition',
    'cloud-based CCTV',
    'touchless biometric systems',
    'smart city solutions'
  ]
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

// Export default SEO configuration
export default {
  SITE_CONFIG,
  SITE_KEYWORDS,
  SERVICE_SEO_DATA,
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