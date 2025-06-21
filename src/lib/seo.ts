export const siteConfig = {
  name: 'Park Space - Automated Parking Solutions Hyderabad',
  description: 'Leading provider of boom barriers, CCTV systems, biometric attendance, and security solutions in Hyderabad. FAAC authorized dealer with best prices and service.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://parkspace.vercel.app',
  ogImage: '/og-image.jpg',
  keywords: [
    'boom barriers hyderabad',
    'FAAC dealers hyderabad',
    'CCTV installation hyderabad',
    'biometric attendance system',
    'gate automation hyderabad',
    'parking solutions',
    'security systems hyderabad',
    'door access control',
    'fire alarm systems',
    'networking solutions'
  ],
  author: 'Park Space',
  creator: 'Park Space'
}

export const generateMetadata = (
  title: string,
  description: string,
  keywords?: string[],
  image?: string
) => {
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: keywords ? [...siteConfig.keywords, ...keywords] : siteConfig.keywords,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image || siteConfig.ogImage],
    },
  }
}