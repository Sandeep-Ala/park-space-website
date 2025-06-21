
// =============================================
// src/components/common/WhatsAppFloat.tsx
// =============================================
'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'

export default function WhatsAppFloat() {
  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in your services. Please provide more information."
    window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40 whatsapp-float"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  )
}
