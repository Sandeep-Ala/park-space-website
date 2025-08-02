// src/lib/seo.ts
// ✅ ENHANCED: SEO configuration with proper Google verification handling

import { Metadata } from 'next'

// ========================
// SITE CONFIGURATION
// ========================

export const SITE_CONFIG = {
  name: 'Park Space',
  title: 'Park Space - Automated Parking Solutions in Hyderabad',
  description: 'Leading provider of boom barriers, CCTV, biometric systems & parking automation in Hyderabad. FAAC authorized dealer. Expert installation & 24/7 support.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://parkspace.in',
  ogImage: '/images/og-image.jpg',
  author: 'Park Space Automation Solutions',
  
  business: {
    name: 'Park Space Automation Solutions',
    address: {
      streetAddress: 'Hyderabad',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500001',
      addressCountry: 'IN'
    },
    phone: '+91-63027-89421',
    email: 'info@parkspace.in',
    
    // ✅ ENHANCED: Business hours for better local SEO
    openingHours: [
      'Mo-Sa 09:00-18:00'
    ],
    
    // ✅ ENHANCED: Geographic coordinates for local SEO
    geo: {
      latitude: '17.4485',
      longitude: '78.4048'
    }
  },
  
  // ✅ ENHANCED: Social media profiles
  social: {
    facebook: 'https://www.facebook.com/parkspace',
    twitter: 'https://twitter.com/parkspacetech',
    linkedin: 'https://www.linkedin.com/company/parkspace',
    youtube: 'https://www.youtube.com/channel/parkspace',
    instagram: 'https://www.instagram.com/parkspacetech'
  }
}

// ========================
// ENHANCED SEO METADATA GENERATION
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
    ? `${title} | Park Space`
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
  
  // Add default keywords if none provided
  if (finalKeywords.length === 0) {
    finalKeywords = [
      'boom barriers Hyderabad',
      'parking automation solutions',
      'CCTV installation Hyderabad',
      'biometric systems',
      'FAAC dealer Hyderabad',
      'automated parking systems',
      'access control systems',
      'parking management Telangana'
    ]
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
    
    // ✅ ENHANCED: Robots directive for better indexing
    robots: noIndex 
      ? 'noindex,nofollow' 
      : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    
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
    
    // ✅ FIXED: Verification handling - only include if verification codes exist
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && {
        google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
      }),
      ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
        yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
      }),
      ...(process.env.NEXT_PUBLIC_YAHOO_VERIFICATION && {
        yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION
      })
    },
    
    // Category for articles
    ...(type === 'article' && { category: 'Technology' }),
    
    // ✅ ENHANCED: Additional metadata for better SEO
    other: {
      'revisit-after': '7 days',
      'distribution': 'global',
      'rating': 'general',
      'contact': SITE_CONFIG.business.email,
      'copyright': `© ${new Date().getFullYear()} ${SITE_CONFIG.business.name}`,
      
      // Geographic metadata
      'geo.region': 'IN-TG',
      'geo.placename': 'Hyderabad',
      'geo.position': `${SITE_CONFIG.business.geo.latitude};${SITE_CONFIG.business.geo.longitude}`,
      'ICBM': `${SITE_CONFIG.business.geo.latitude}, ${SITE_CONFIG.business.geo.longitude}`,
      
      // Mobile optimization
      'format-detection': 'telephone=yes',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes'
    }
  }
}

// ========================
// SCHEMA.ORG STRUCTURED DATA
// ========================

// ✅ ENHANCED: LocalBusiness schema with complete information
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}#organization`,
    name: SITE_CONFIG.business.name,
    alternateName: 'Park Space',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    image: `${SITE_CONFIG.url}/images/og-image.jpg`,
    
    // Contact information
    telephone: SITE_CONFIG.business.phone,
    email: SITE_CONFIG.business.email,
    
    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.business.address.streetAddress,
      addressLocality: SITE_CONFIG.business.address.addressLocality,
      addressRegion: SITE_CONFIG.business.address.addressRegion,
      postalCode: SITE_CONFIG.business.address.postalCode,
      addressCountry: SITE_CONFIG.business.address.addressCountry
    },
    
    // Geographic coordinates
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.business.geo.latitude,
      longitude: SITE_CONFIG.business.geo.longitude
    },
    
    // Business hours
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00'
    },
    
    // Services offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Parking Automation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Boom Barriers Installation',
            description: 'Professional boom barrier installation and maintenance services'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CCTV Surveillance Systems',
            description: 'Complete CCTV installation and monitoring solutions'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Biometric Access Control',
            description: 'Advanced biometric attendance and access control systems'
          }
        }
      ]
    },
    
    // Social media
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.instagram
    ],
    
    // Additional business information
    foundingDate: '2020',
    numberOfEmployees: '10-50',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'UPI'],
    currenciesAccepted: 'INR',
    areaServed: {
      '@type': 'State',
      name: 'Telangana'
    }
  }
}

// ✅ ENHANCED: Organization schema
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}#organization`,
    name: SITE_CONFIG.business.name,
    alternateName: 'Park Space',
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}/images/logo.png`,
      width: 300,
      height: 100
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.business.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Telugu']
    },
    address: SITE_CONFIG.business.address,
    sameAs: Object.values(SITE_CONFIG.social)
  }
}

// Export all configurations
export default {
  SITE_CONFIG,
  generateMetadata,
  generateLocalBusinessSchema,
  generateOrganizationSchema
}