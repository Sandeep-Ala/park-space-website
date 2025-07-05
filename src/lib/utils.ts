// src/lib/utils.ts
// Utility functions - Fixed with proper type imports

import { Lead } from '@/types'

// Simple className utility (no external dependencies)
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

// Phone number validation and formatting
export function validateIndianPhone(phone: string): boolean {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  
  // Check for valid Indian mobile number patterns
  // Should start with 6, 7, 8, or 9 and be 10 digits
  // Can also start with +91 or 0
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return true
  }
  if (digits.length === 12 && digits.startsWith('91') && /^91[6-9]/.test(digits)) {
    return true
  }
  if (digits.length === 11 && digits.startsWith('0') && /^0[6-9]/.test(digits)) {
    return true
  }
  
  return false
}

export function formatIndianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    const number = digits.slice(2)
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    const number = digits.slice(1)
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`
  }
  
  return phone
}

// Lead scoring algorithm
export function calculateLeadScore(lead: Partial<Lead>): number {
  let score = 0
  
  // Base score for having required information
  if (lead.name) score += 10
  if (lead.phone) score += 15
  if (lead.email) score += 10
  
  // Company indicates B2B lead (higher value)
  if (lead.company) score += 20
  
  // Location in Hyderabad (our service area)
  if (lead.location?.toLowerCase().includes('hyderabad')) score += 15
  
  // Service type scoring (boom barriers are primary)
  if (lead.service_type === 'boom-barriers') score += 20
  else if (['cctv-services', 'biometric-attendance'].includes(lead.service_type || '')) score += 15
  else score += 10
  
  // Message indicates engagement
  if (lead.message && lead.message.length > 20) score += 10
  
  // Source scoring
  if (lead.source === 'phone') score += 15
  else if (lead.source === 'whatsapp') score += 10
  else if (lead.source === 'website') score += 5
  
  return Math.min(score, 100) // Cap at 100
}

// Generate WhatsApp message
export function generateWhatsAppMessage(lead: Partial<Lead>): string {
  const name = lead.name || 'there'
  const service = lead.service_type?.replace('-', ' ') || 'services'
  const location = lead.location || 'your location'
  
  return `Hi! I'm ${name} and I'm interested in ${service} for ${location}. Could you please provide more details about your services and pricing?`
}

// Format currency for Indian market
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Get client IP address (for lead tracking)
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

// Extract UTM parameters from URL
export function extractUTMParams(url: string): Record<string, string> {
  const urlParams = new URL(url).searchParams
  
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
  }
}