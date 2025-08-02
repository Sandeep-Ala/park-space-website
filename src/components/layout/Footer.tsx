// File: src/components/layout/Footer.tsx
// Updated Footer with All Service Routes Connected

'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

// Complete services array with proper routes
const FOOTER_SERVICES = [
  { id: 'boom-barriers', name: 'Boom Barriers', slug: 'boom-barriers' },
  { id: 'cctv-services', name: 'CCTV Services', slug: 'cctv-services' },
  { id: 'biometric-attendance', name: 'Biometric Attendance', slug: 'biometric-attendance' },
  { id: 'door-access-controllers', name: 'Door Access Controllers', slug: 'door-access-controllers' },
  { id: 'flap-barriers', name: 'Flap Barriers', slug: 'flap-barriers' },
  { id: 'bollard-barriers', name: 'Bollard Barriers', slug: 'bollard-barriers' },
  { id: 'fire-alarm-systems', name: 'Fire & Alarm Systems', slug: 'fire-alarm-systems' },
  { id: 'networking-systems', name: 'Networking Systems', slug: 'networking-systems' },
  { id: 'swing-gates', name: 'Swing Gates', slug: 'swing-gates' },
  { id: 'sliding-gate-motors', name: 'Sliding Gate Motors', slug: 'sliding-gate-motors' }
]

export default function Footer() {
  const [logoError, setLogoError] = useState(false)

  return (
    <footer className="bg-black/50 border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white/10">
                {!logoError ? (
                  <Image 
                    src="/images/logo.png" 
                    alt="Park Space Logo" 
                    width={40}
                    height={40}
                    className="object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">P</span>
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">{COMPANY_INFO?.name?.toUpperCase() || 'PARK SPACE'}</h4>
                <p className="text-purple-300 text-sm">{COMPANY_INFO?.tagline || 'Automation Solutions'}</p>
              </div>
            </div>
            <p className="text-purple-200 text-sm mb-4">
              Leading provider of automated parking and security solutions in Hyderabad with complete sales and service support.
            </p>
          </div>

          {/* Main Services Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Main Services</h4>
            <ul className="space-y-2 text-purple-200 text-sm">
              {FOOTER_SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/${service.slug}`}
                    className="hover:text-pink-400 transition-colors duration-200 hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Services Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">More Services</h4>
            <ul className="space-y-2 text-purple-200 text-sm">
              {FOOTER_SERVICES.slice(5).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/${service.slug}`}
                    className="hover:text-pink-400 transition-colors duration-200 hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Quick Links */}
            <div className="mt-6">
              <h5 className="text-white font-semibold text-base mb-3">Quick Links</h5>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><Link href="/about" className="hover:text-pink-400 transition-colors duration-200 hover:underline">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-pink-400 transition-colors duration-200 hover:underline">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-pink-400 transition-colors duration-200 hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-pink-400 transition-colors duration-200 hover:underline">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-purple-200 text-sm">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-pink-400 flex-shrink-0" />
                <a 
                  href={`tel:${COMPANY_INFO?.phone || '+916302789421'}`}

                  className="hover:text-pink-400 transition-colors duration-200"
                >
                  {COMPANY_INFO?.phoneDisplay || '+91 63027 89421'}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-pink-400 flex-shrink-0" />
                <a 
                  href={`mailto:${COMPANY_INFO?.email || 'info@parkspace.com'}`}
                  className="hover:text-pink-400 transition-colors duration-200"
                >
                  {COMPANY_INFO?.email || 'info@parkspace.com'}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-pink-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {COMPANY_INFO?.address || 'Plot no: 8-93/2/1, Srinivasa Nagar ,Chintal, Qutubullapur,Hyderabad, Telangana, India'}
                </span>
              </div>
            </div>

            {/* Service Areas */}
            <div className="mt-6">
              <h5 className="text-white font-semibold text-base mb-3">Service Areas</h5>
              <p className="text-purple-200 text-sm leading-relaxed">
                Gachibowli, Hitec City, Madhapur, Kukatpally, Secunderabad, Kondapur, Miyapur, and all major areas of Hyderabad.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-500/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-purple-200 text-sm text-center md:text-left">
              &copy; 2024 {COMPANY_INFO?.name || 'Park Space Automation Solutions'}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-purple-200 text-sm">
              <Link href="/privacy" className="hover:text-pink-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-pink-400 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-pink-400 transition-colors">Support</Link>
              <Link href="/about" className="hover:text-pink-400 transition-colors">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}