'use client'

import { useState } from 'react'
import { MessageCircle, Phone, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    service: 'boom-barriers',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState('')

  // Indian phone number validation
  const validateIndianPhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '')
    
    // Check for valid Indian phone number patterns:
    // 1. 10 digits starting with 6,7,8,9
    // 2. 11 digits starting with 0 then 6,7,8,9
    // 3. 12 digits starting with 91 then 6,7,8,9
    // 4. 13 digits starting with +91 then 6,7,8,9
    
    if (cleanPhone.length === 10) {
      return /^[6-9]\d{9}$/.test(cleanPhone)
    } else if (cleanPhone.length === 11) {
      return /^0[6-9]\d{9}$/.test(cleanPhone)
    } else if (cleanPhone.length === 12) {
      return /^91[6-9]\d{9}$/.test(cleanPhone)
    } else if (cleanPhone.length === 13 && phone.startsWith('+')) {
      return /^91[6-9]\d{9}$/.test(cleanPhone)
    }
    
    return false
  }

  const formatPhoneNumber = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '')
    
    if (cleanPhone.length === 10) {
      return `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
      const withoutZero = cleanPhone.slice(1)
      return `+91 ${withoutZero.slice(0, 5)} ${withoutZero.slice(5)}`
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      const number = cleanPhone.slice(2)
      return `+91 ${number.slice(0, 5)} ${number.slice(5)}`
    }
    
    return phone
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      // Allow only numbers, +, spaces, and hyphens
      const sanitizedValue = value.replace(/[^\d+\s-]/g, '')
      setFormData({
        ...formData,
        [name]: sanitizedValue
      })
      
      // Validate phone number on change
      if (sanitizedValue.length > 0) {
        if (validateIndianPhone(sanitizedValue)) {
          setPhoneError('')
        } else {
          setPhoneError('Please enter a valid Indian phone number')
        }
      } else {
        setPhoneError('')
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Final phone validation
    if (!validateIndianPhone(formData.phone)) {
      setPhoneError('Please enter a valid Indian phone number (10 digits starting with 6,7,8,9)')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setPhoneError('')
    
    try {
      // For now, just simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Form submitted:', {
        ...formData,
        phone: formatPhoneNumber(formData.phone)
      })
      setSubmitStatus('success')
      
      // Redirect to WhatsApp after successful submission
      const formattedPhone = formatPhoneNumber(formData.phone)
      const message = `Hi, I submitted a contact form on your website.
Name: ${formData.name}
Phone: ${formattedPhone}
Service: ${formData.service}
Location: ${formData.location}
${formData.message ? `Message: ${formData.message}` : ''}`
      
      setTimeout(() => {
        window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank')
      }, 1500)
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        service: 'boom-barriers',
        message: ''
      })
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold text-white mb-2">Get Free Quote</h3>
        <p className="text-purple-200">Fill the form and we'll contact you within 24 hours</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-pink-500 transition-colors"
            required
            minLength={2}
          />
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number * (e.g., 9876543210 or +91 98765 43210)"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-purple-300 focus:outline-none transition-colors ${
              phoneError ? 'border-red-500 focus:border-red-500' : 'border-purple-500/30 focus:border-pink-500'
            }`}
            required
          />
          {phoneError && (
            <div className="flex items-center space-x-2 mt-2 text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{phoneError}</span>
            </div>
          )}
          <p className="text-purple-300 text-xs mt-1">
            Enter 10-digit mobile number (6,7,8,9 series) or with +91 prefix
          </p>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-pink-500 transition-colors"
          />
        </div>

        <div>
          <input
            type="text"
            name="location"
            placeholder="Location in Hyderabad *"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-pink-500 transition-colors"
            required
            minLength={2}
          />
        </div>

        <div>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
          >
            <option value="boom-barriers">Boom Barriers</option>
            <option value="cctv-services">CCTV Services</option>
            <option value="biometric-attendance">Biometric Attendance</option>
            <option value="door-access-controllers">Door Access Controllers</option>
            <option value="fire-alarm-systems">Fire & Alarm Systems</option>
            <option value="networking-systems">Networking Systems</option>
            <option value="bollard-barriers">Bollard Barriers</option>
            <option value="flap-barriers">Flap Barriers</option>
            <option value="swing-gates">Swing Gates</option>
            <option value="sliding-gate-motors">Sliding Gate Motors</option>
          </select>
        </div>

        <div>
          <textarea
            name="message"
            rows={4}
            placeholder="Message or Requirements (Optional)"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-pink-500 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !!phoneError}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <MessageCircle size={20} />
              <span>Get Free Quote</span>
            </>
          )}
        </button>

        {submitStatus === 'success' && (
          <div className="text-green-400 text-center flex items-center justify-center space-x-2">
            <CheckCircle size={20} />
            <span>Thank you! Redirecting to WhatsApp...</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="text-red-400 text-center flex items-center justify-center space-x-2">
            <AlertCircle size={20} />
            <span>Something went wrong. Please try again or call us directly.</span>
          </div>
        )}
      </form>

      <div className="mt-6 text-center">
        <p className="text-purple-200 text-sm">
          Or contact us directly:
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a 
            href="tel:+919876543210"
            className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors"
          >
            <Phone size={16} />
            <span>+91 98765 43210</span>
          </a>
          <a 
            href="https://wa.me/919876543210"
            target="_blank"
            className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}