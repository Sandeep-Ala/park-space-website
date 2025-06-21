
// =============================================
// src/components/sections/Hero.tsx
// =============================================
'use client'

import React from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants'

export default function Hero() {
  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in your automated parking solutions. Please provide more information."
    window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCall = () => {
    window.open(SOCIAL_LINKS.phone, '_self')
  }

  return (
    <section className="relative section-padding">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Automated Parking
          <span className="block gradient-text">
            Solutions
          </span>
        </h2>
        <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
          Complete sales, installation, and service solutions for boom barriers, CCTV systems, biometric attendance, and security systems in Hyderabad
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>WhatsApp Now</span>
          </button>
          <button
            onClick={handleCall}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Phone size={20} />
            <span>Call {COMPANY_INFO.phone}</span>
          </button>
        </div>
      </div>
    </section>
  )
}