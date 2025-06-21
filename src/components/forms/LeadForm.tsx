
// =============================================
// src/components/forms/LeadForm.tsx
// =============================================
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SERVICES, SOCIAL_LINKS } from '@/lib/constants'

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  company: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  service_type: z.string().min(1, 'Service type is required'),
  sub_service: z.string().optional(),
  message: z.string().optional()
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadFormProps {
  service_type?: string
  sub_service?: string
  onSuccess?: () => void
  className?: string
}

export default function LeadForm({ 
  service_type, 
  sub_service, 
  onSuccess,
  className = '' 
}: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      service_type: service_type || '',
      sub_service: sub_service || ''
    }
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        onSuccess?.()
        
        // Redirect to WhatsApp after successful submission
        const message = `Hi, I submitted a lead form on your website.
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service_type}
Location: ${data.location}
${data.message ? `Message: ${data.message}` : ''}`
        
        setTimeout(() => {
          window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
        }, 1000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      <div>
        <input
          {...register('name')}
          type="text"
          placeholder="Your Name *"
          className="form-input"
        />
        {errors.name && (
          <p className="error-text">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('phone')}
          type="tel"
          placeholder="Phone Number *"
          className="form-input"
        />
        {errors.phone && (
          <p className="error-text">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          placeholder="Email (Optional)"
          className="form-input"
        />
        {errors.email && (
          <p className="error-text">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('company')}
          type="text"
          placeholder="Company/Organization (Optional)"
          className="form-input"
        />
      </div>

      <div>
        <input
          {...register('location')}
          type="text"
          placeholder="Location in Hyderabad *"
          className="form-input"
        />
        {errors.location && (
          <p className="error-text">{errors.location.message}</p>
        )}
      </div>

      {!service_type && (
        <div>
          <select
            {...register('service_type')}
            className="form-select"
          >
            <option value="">Select Service *</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.slug}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.service_type && (
            <p className="error-text">{errors.service_type.message}</p>
          )}
        </div>
      )}

      <div>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Message or Requirements (Optional)"
          className="form-textarea"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
      </button>

      {submitStatus === 'success' && (
        <div className="success-text text-center">
          ✓ Thank you! We'll contact you shortly. You'll be redirected to WhatsApp.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="error-text text-center">
          ✗ Something went wrong. Please try again or call us directly.
        </div>
      )}
    </form>
  )
}
