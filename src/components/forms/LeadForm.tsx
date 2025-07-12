// =============================================
// src/components/forms/LeadForm.tsx
// Enhanced lead form with database integration
// =============================================
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Building, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { validateIndianPhone, formatIndianPhone, generateWhatsAppMessage } from '@/lib/utils'

// Form validation schema
const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().refine(validateIndianPhone, {
    message: 'Please enter a valid Indian mobile number',
  }),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  company: z.string().optional(),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  service_type: z.string().min(1, 'Please select a service'),
  sub_service: z.string().optional(),
  message: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadFormSchema>

interface LeadFormProps {
  defaultService?: string
  defaultSubService?: string
  onSuccess?: (leadId: string) => void
  className?: string
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

export default function LeadForm({ 
  defaultService, 
  defaultSubService, 
  onSuccess,
  className = '' 
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      service_type: defaultService || '',
      sub_service: defaultSubService || '',
    }
  })

  const phoneValue = watch('phone')
  const formData = watch()

  const onSubmit = async (data: LeadFormData) => {
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
        company: data.company || undefined,
        sub_service: data.sub_service || undefined,
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
        throw new Error(result.error || 'Failed to submit lead')
      }

      // Success handling
      setSubmitStatus('success')
      reset()

      // Call success callback
      if (onSuccess && result.data?.id) {
        onSuccess(result.data.id)
      }

      // Redirect to WhatsApp after a short delay
      setTimeout(() => {
        const whatsappMessage = generateWhatsAppMessage(leadData)
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '916302789421'
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
        window.open(whatsappUrl, '_blank')
      }, 1500)

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-6 ${className}`}>
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium text-white-700 mb-2">
          Name *
        </label>
        <div className="relative">
          <input
            {...register('name')}
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-white-300'
            }`}
            placeholder="Your full name"
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-white-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-white-400" />
          <input
            {...register('phone')}
            type="tel"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.phone ? 'border-red-500' : 'border-white-300'
            }`}
            placeholder="9876543210"
          />
        </div>
        {phoneValue && !errors.phone && (
          <p className="mt-1 text-sm text-green-600">
            ✓ {formatIndianPhone(phoneValue)}
          </p>
        )}
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
        <p className="mt-1 text-xs text-white-500">
          Format: 9876543210 or +91 9876543210
        </p>
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-white-700 mb-2">
          Email (Optional)
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-white-400" />
          <input
            {...register('email')}
            type="email"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-white-300'
            }`}
            placeholder="your@email.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Company Field */}
      <div>
        <label className="block text-sm font-medium text-white-700 mb-2">
          Company (Optional)
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-5 w-5 text-white-400" />
          <input
            {...register('company')}
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-white-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="Your company name"
          />
        </div>
      </div>

      {/* Location Field */}
      <div>
        <label className="block text-sm font-medium text-white-700 mb-2">
          Location *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-white-400" />
          <input
            {...register('location')}
            type="text"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
              errors.location ? 'border-red-500' : 'border-white-300'
            }`}
            placeholder="e.g., Hyderabad, Gachibowli"
          />
        </div>
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      {/* Service Type Field */}
      <div>
        <label className="block text-sm font-medium text-white-700 mb-2">
          Service Required *
        </label>
        <select
          {...register('service_type')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
            errors.service_type ? 'border-red-500' : 'border-grey-300'
          }`}
        >
          <option value="">Select a service</option>
          {SERVICES.map((service) => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
        {errors.service_type && (
          <p className="mt-1 text-sm text-red-600">{errors.service_type.message}</p>
        )}
      </div>

      {/* Sub Service Field */}
      <div>
        <label className="block text-sm font-medium text-white-700 mb-2">
          Specific Brand/Type (Optional)
        </label>
        <input
          {...register('sub_service')}
          type="text"
          className="w-full px-4 py-3 border border-white-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          placeholder="e.g., FAAC, Benica, Roger"
        />
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-white-700 mb-2">
          Message (Optional)
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-white-400" />
          <textarea
            {...register('message')}
            rows={4}
            className="w-full pl-10 pr-4 py-3 border border-white-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
            placeholder="Tell us about your requirements..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>Get Quote Now</span>
          )}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Request submitted successfully!</p>
            <p className="text-green-700 text-sm">Redirecting to WhatsApp...</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-red-800 font-medium">Submission failed</p>
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <p className="text-xs text-white-500 text-center">
        By submitting this form, you agree to our privacy policy. We'll contact you via WhatsApp or phone within 24 hours.
      </p>
    </form>
  )
}