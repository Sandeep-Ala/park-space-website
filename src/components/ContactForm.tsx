// =============================================
// src/components/ContactForm.tsx
// Updated contact form with database integration
// =============================================
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { validateIndianPhone, formatIndianPhone, generateWhatsAppMessage } from '@/lib/utils'

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().refine(validateIndianPhone, {
    message: 'Please enter a valid Indian mobile number',
  }),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  service_type: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  className?: string
  onSuccess?: () => void
}

const SERVICES = [
  { value: 'boom-barriers', label: 'Boom Barriers' },
  { value: 'cctv-services', label: 'CCTV Services' },
  { value: 'biometric-attendance', label: 'Biometric Attendance' },
  { value: 'door-access-controllers', label: 'Door Access Controllers' },
  { value: 'fire-alarm-systems', label: 'Fire & Alarm Systems' },
  { value: 'networking-systems', label: 'Networking Systems' },
  { value: 'bollard-barriers', label: 'Bollard Barriers' },
  { value: 'flap-barriers', label: 'Flap Barriers' },
  { value: 'swing-gates', label: 'Swing Gates' },
  { value: 'sliding-gate-motors', label: 'Sliding Gate Motors' },
]

export default function ContactForm({ className = '', onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const phoneValue = watch('phone')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Format phone number
      const formattedPhone = formatIndianPhone(data.phone)

      // Prepare lead data
      const leadData = {
        ...data,
        phone: formattedPhone,
        email: data.email || undefined,
        message: data.message || undefined,
        source: 'website',
        landing_page: window.location.pathname,
      }

      // Submit to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit contact form')
      }

      // Success handling
      setSubmitStatus('success')
      reset()

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }

      // Redirect to WhatsApp after a short delay
      setTimeout(() => {
        const whatsappMessage = generateWhatsAppMessage(leadData)
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
        window.open(whatsappUrl, '_blank')
      }, 1500)

    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Get Free Quote</h3>
        <p className="text-white/80">Fill the form below and we'll contact you within 24 hours</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Name *
          </label>
          <input
            {...register('name')}
            type="text"
            className={`w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-400' : ''
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-300">{errors.name.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-white/60" />
            <input
              {...register('phone')}
              type="tel"
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                errors.phone ? 'border-red-400' : ''
              }`}
              placeholder="9876543210"
            />
          </div>
          {phoneValue && !errors.phone && (
            <p className="mt-1 text-sm text-green-300">
              ✓ {formatIndianPhone(phoneValue)}
            </p>
          )}
          {errors.phone && (
            <p className="mt-1 text-sm text-red-300">{errors.phone.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Email (Optional)
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-white/60" />
            <input
              {...register('email')}
              type="email"
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                errors.email ? 'border-red-400' : ''
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
          )}
        </div>

        {/* Location Field */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Location *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-white/60" />
            <input
              {...register('location')}
              type="text"
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                errors.location ? 'border-red-400' : ''
              }`}
              placeholder="e.g., Hyderabad, Gachibowli"
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-sm text-red-300">{errors.location.message}</p>
          )}
        </div>

        {/* Service Type Field */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Service Required *
          </label>
          <select
            {...register('service_type')}
            className={`w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
              errors.service_type ? 'border-red-400' : ''
            }`}
          >
            <option value="" className="bg-gray-800">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service.value} value={service.value} className="bg-gray-800">
                {service.label}
              </option>
            ))}
          </select>
          {errors.service_type && (
            <p className="mt-1 text-sm text-red-300">{errors.service_type.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Message (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-white/60" />
            <textarea
              {...register('message')}
              rows={3}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors resize-none"
              placeholder="Tell us about your requirements..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Get Free Quote</span>
          )}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-3 bg-green-500/20 border border-green-400/30 rounded-lg flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-300" />
            <div>
              <p className="text-green-100 font-medium text-sm">Quote request submitted!</p>
              <p className="text-green-200 text-xs">Redirecting to WhatsApp...</p>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-300" />
            <div>
              <p className="text-red-100 font-medium text-sm">Submission failed</p>
              <p className="text-red-200 text-xs">{errorMessage}</p>
            </div>
          </div>
        )}
      </form>

      {/* Privacy Notice */}
      <p className="text-xs text-white/60 text-center mt-4">
        By submitting this form, you agree to our privacy policy. We'll contact you via WhatsApp or phone within 24 hours.
      </p>
    </div>
  )
}