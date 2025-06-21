// =============================================
// src/lib/constants.ts (Update this file)
// =============================================

export const COMPANY_INFO = {
  name: 'Park Space',
  tagline: 'Automated Parking Solutions',
  phone: '+919876543210', // Updated format for proper tel: links
  phoneDisplay: '+91 98765 43210', // Display format
  email: 'info@parkspace.in',
  address: 'Hyderabad, Telangana, India',
  whatsapp: '919876543210', // Without + for WhatsApp links
  workingHours: 'Mon-Sat: 9:00 AM - 7:00 PM',
  established: '2019',
  experience: '5+ years'
}

export const SERVICES = [
  {
    id: 'boom-barriers',
    name: 'Boom Barriers',
    slug: 'boom-barriers',
    icon: '🚧',
    shortDesc: 'Automated parking solutions with premium brands',
    priceRange: '₹35,000 - ₹1,50,000'
  },
  {
    id: 'cctv-services',
    name: 'CCTV Services',
    slug: 'cctv-services',
    icon: '📹',
    shortDesc: 'Complete surveillance systems',
    priceRange: '₹15,000 - ₹2,00,000'
  },
  {
    id: 'biometric-attendance',
    name: 'Biometric Attendance',
    slug: 'biometric-attendance',
    icon: '👆',
    shortDesc: 'Advanced time tracking systems',
    priceRange: '₹8,000 - ₹50,000'
  },
  {
    id: 'door-access-controllers',
    name: 'Door Access Controllers',
    slug: 'door-access-controllers',
    icon: '🚪',
    shortDesc: 'Secure entry systems',
    priceRange: '₹12,000 - ₹80,000'
  },
  {
    id: 'fire-alarm-systems',
    name: 'Fire & Alarm Systems',
    slug: 'fire-alarm-systems',
    icon: '🔥',
    shortDesc: 'Fire detection and safety',
    priceRange: '₹20,000 - ₹3,00,000'
  },
  {
    id: 'networking-systems',
    name: 'Networking Systems',
    slug: 'networking-systems',
    icon: '🌐',
    shortDesc: 'Complete IT infrastructure',
    priceRange: '₹10,000 - ₹1,50,000'
  },
  {
    id: 'bollard-barriers',
    name: 'Bollard Barriers',
    slug: 'bollard-barriers',
    icon: '⚡',
    shortDesc: 'Vehicle access control',
    priceRange: '₹25,000 - ₹1,00,000'
  },
  {
    id: 'flap-barriers',
    name: 'Flap Barriers',
    slug: 'flap-barriers',
    icon: '🚶',
    shortDesc: 'Pedestrian access control',
    priceRange: '₹45,000 - ₹1,20,000'
  },
  {
    id: 'swing-gates',
    name: 'Swing Gates',
    slug: 'swing-gates',
    icon: '🚪',
    shortDesc: 'Automated swing systems',
    priceRange: '₹30,000 - ₹80,000'
  },
  {
    id: 'sliding-gate-motors',
    name: 'Sliding Gate Motors',
    slug: 'sliding-gate-motors',
    icon: '↔️',
    shortDesc: 'Heavy-duty automation',
    priceRange: '₹40,000 - ₹1,50,000'
  }
] as const

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
] as const

export const SOCIAL_LINKS = {
  whatsapp: `https://wa.me/${COMPANY_INFO.whatsapp}`,
  phone: `tel:${COMPANY_INFO.phone}`,
  email: `mailto:${COMPANY_INFO.email}`
} as const