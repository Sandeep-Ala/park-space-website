// =============================================
// src/components/common/WhatsAppFloat.tsx
// Floating WhatsApp button component
// =============================================
'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '916302789421'
    const message = encodeURIComponent(
      'Hi! I\'m interested in your security and automation services. Could you please provide more information?'
    )
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-50 animate-bounce hover:animate-none"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}