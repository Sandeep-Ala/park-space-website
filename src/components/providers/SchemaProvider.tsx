// src/components/providers/SchemaProvider.tsx
// Dynamic Schema.org structured data provider for different page types

'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { SITE_CONFIG } from '@/lib/seo'

interface SchemaData {
  [key: string]: any
}

export default function SchemaProvider() {
  const pathname = usePathname()

  useEffect(() => {
    // Remove existing dynamic schemas
    const existingSchemas = document.querySelectorAll('script[data-schema="dynamic"]')
    existingSchemas.forEach(schema => schema.remove())

    // Generate page-specific schemas
    const schemas = generatePageSchemas(pathname)
    
    // Inject schemas into the page
    schemas.forEach(schema => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-schema', 'dynamic')
      script.innerHTML = JSON.stringify(schema)
      document.head.appendChild(script)
    })
  }, [pathname])

  return null
}

function generatePageSchemas(pathname: string): SchemaData[] {
  const schemas: SchemaData[] = []
  const baseUrl = SITE_CONFIG.url

  // Service page schemas
  if (pathname.includes('/boom-barriers') || pathname === '/boom-barriers') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/boom-barriers#service`,
      "name": "Boom Barrier Installation Services",
      "description": "Professional boom barrier installation and maintenance services in Hyderabad. Authorized FAAC dealer with expert technicians and 24/7 support.",
      "url": `${baseUrl}/boom-barriers`,
      "category": "Security Systems",
      "provider": {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}#business`
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      },
      "serviceType": "Installation and Maintenance",
      "serviceOutput": "Automated parking and vehicle access control systems"
    })

    // Product schema for boom barriers
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "FAAC Boom Barriers",
      "description": "High-quality FAAC boom barriers for automated parking and vehicle access control in Hyderabad.",
      "brand": {
        "@type": "Brand",
        "name": "FAAC"
      },
      "category": "Security Equipment",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "25000",
        "priceRange": "₹15,000 - ₹80,000",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "LocalBusiness",
          "@id": `${baseUrl}#business`
        }
      }
    })
  }

  if (pathname.includes('/cctv-services') || pathname === '/cctv-services') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/cctv-services#service`,
      "name": "CCTV Installation Services",
      "description": "Professional CCTV camera installation and surveillance system setup in Hyderabad. Hikvision, Dahua, CP Plus authorized dealer.",
      "url": `${baseUrl}/cctv-services`,
      "category": "Security Systems",
      "provider": {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}#business`
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      },
      "serviceType": "Installation and Maintenance",
      "serviceOutput": "Complete surveillance and security monitoring systems"
    })
  }

  if (pathname.includes('/biometric-attendance') || pathname === '/biometric-attendance') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/biometric-attendance#service`,
      "name": "Biometric Attendance System Installation",
      "description": "Advanced biometric attendance systems with fingerprint and face recognition. TIME WATCH authorized dealer in Hyderabad.",
      "url": `${baseUrl}/biometric-attendance`,
      "category": "Access Control Systems",
      "provider": {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}#business`
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      },
      "serviceType": "Installation and Support",
      "serviceOutput": "Automated employee attendance tracking and management systems"
    })
  }

  if (pathname.includes('/door-access-controllers') || pathname === '/door-access-controllers') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/door-access-controllers#service`,
      "name": "Door Access Control Systems",
      "description": "Smart door access control systems with biometric, RFID, and mobile access. ZKTeco and Honeywell authorized dealer.",
      "url": `${baseUrl}/door-access-controllers`,
      "category": "Access Control Systems",
      "provider": {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}#business`
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      },
      "serviceType": "Installation and Configuration",
      "serviceOutput": "Secure and automated door entry systems"
    })
  }

  // About page schema
  if (pathname === '/about') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${baseUrl}/about#webpage`,
      "name": "About Park Space - Leading Parking Automation Company",
      "description": "Learn about Park Space, Hyderabad's trusted provider of automated parking solutions with 10+ years experience.",
      "url": `${baseUrl}/about`,
      "mainEntity": {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}#business`
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": `${baseUrl}/about`
          }
        ]
      }
    })
  }

  // Contact page schema
  if (pathname === '/contact') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${baseUrl}/contact#webpage`,
      "name": "Contact Park Space - Get Quote for Parking Automation",
      "description": "Contact Park Space for boom barriers, CCTV, biometric systems in Hyderabad. Multiple contact methods available.",
      "url": `${baseUrl}/contact`,
      "mainEntity": {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}#business`
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact",
            "item": `${baseUrl}/contact`
          }
        ]
      }
    })
  }

  // Homepage schema
  if (pathname === '/') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}#website`,
      "name": SITE_CONFIG.name,
      "alternateName": SITE_CONFIG.business.name,
      "description": SITE_CONFIG.description,
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`
      }
    })

    // FAQ Schema for homepage
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Park Space provide in Hyderabad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Park Space provides boom barriers, CCTV installation, biometric attendance systems, door access controllers, fire & alarm systems, networking solutions, bollard barriers, flap barriers, swing gates, and sliding gate motors in Hyderabad and surrounding areas."
          }
        },
        {
          "@type": "Question",
          "name": "Are you authorized dealers for FAAC boom barriers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Park Space is an authorized dealer for FAAC boom barriers, along with other premium brands like Hikvision, TIME WATCH, ZKTeco, and CP Plus in Hyderabad."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide 24/7 support for parking automation systems?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide 24/7 emergency support for all our installed parking automation systems and security equipment in Hyderabad. Our technical team is available for urgent repairs and maintenance."
          }
        },
        {
          "@type": "Question",
          "name": "What areas do you serve in Hyderabad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve all areas of Hyderabad including Gachibowli, Hitec City, Kukatpally, Secunderabad, Banjara Hills, Jubilee Hills, and surrounding areas within 100km radius."
          }
        }
      ]
    })
  }

  // Service listing schema for service pages
  const servicePages = [
    '/boom-barriers', '/cctv-services', '/biometric-attendance', 
    '/door-access-controllers', '/fire-alarm-systems', '/networking-systems',
    '/bollard-barriers', '/flap-barriers', '/swing-gates', '/sliding-gate-motors'
  ]

  if (servicePages.some(page => pathname.includes(page))) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Park Space Services",
      "description": "Complete range of parking automation and security services in Hyderabad",
      "itemListElement": [
        {
          "@type": "Service",
          "position": 1,
          "name": "Boom Barriers",
          "url": `${baseUrl}/boom-barriers`
        },
        {
          "@type": "Service",
          "position": 2,
          "name": "CCTV Services",
          "url": `${baseUrl}/cctv-services`
        },
        {
          "@type": "Service",
          "position": 3,
          "name": "Biometric Attendance",
          "url": `${baseUrl}/biometric-attendance`
        },
        {
          "@type": "Service",
          "position": 4,
          "name": "Door Access Controllers",
          "url": `${baseUrl}/door-access-controllers`
        }
      ]
    })
  }

  // Breadcrumb schema for all pages except homepage
  if (pathname !== '/') {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]

    pathSegments.forEach((segment, index) => {
      const segmentPath = '/' + pathSegments.slice(0, index + 1).join('/')
      const segmentName = segment.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')

      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segmentName,
        "item": `${baseUrl}${segmentPath}`
      })
    })

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    })
  }

  return schemas
}