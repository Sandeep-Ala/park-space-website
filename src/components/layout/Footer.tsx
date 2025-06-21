// =============================================
// src/components/layout/Footer.tsx
// =============================================

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { COMPANY_INFO, SERVICES } from '@/lib/constants'

export default function Footer() {
  const [logoError, setLogoError] = useState(false)

  return (
    <footer className="bg-black/50 border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
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
                <h4 className="text-white font-bold text-lg">{COMPANY_INFO.name.toUpperCase()}</h4>
                <p className="text-purple-300 text-sm">{COMPANY_INFO.tagline}</p>
              </div>
            </div>
            <p className="text-purple-200 text-sm mb-4">
              Leading provider of automated parking and security solutions in Hyderabad with complete sales and service support.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-purple-200 text-sm">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link 
                    href={service.id === 'boom-barriers' ? `/${service.slug}` : '#'}
                    className="hover:text-pink-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li><Link href="/about" className="hover:text-pink-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-pink-400 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-pink-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3 text-purple-200 text-sm">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-pink-400" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-pink-400" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-pink-400" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-purple-200 text-sm">
          <p>&copy; 2024 {COMPANY_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}