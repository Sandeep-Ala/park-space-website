// =============================================
// src/components/sections/CTA.tsx
// =============================================
'use client'

import React from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'

export default function CTA() {
  const handleWhatsApp = () => {
    const message = "Hi, I need a free consultation for automated parking solutions."
    window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCall = () => {
    window.open(SOCIAL_LINKS.phone, '_self')
  }

  return (
    <section className="section-padding">
      <div className="container mx-auto text-center">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-purple-500/30">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Automate Your Parking?</h3>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Get a free consultation and quote for your parking automation needs. We serve all of Hyderabad with quick installation and reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Get Free Quote</span>
            </button>
            <button
              onClick={handleCall}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>Call for Consultation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
