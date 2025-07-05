// src/lib/analytics.ts
// Google Analytics 4 integration for Park Space website

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// ========================
// CONFIGURATION
// ========================

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Check if analytics is enabled
export const isAnalyticsEnabled = (): boolean => {
  return !!GA_TRACKING_ID && typeof window !== 'undefined'
}

// ========================
// PAGE TRACKING
// ========================

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!isAnalyticsEnabled()) return
  
  window.gtag('config', GA_TRACKING_ID, {
    page_title: title,
    page_location: url,
    send_page_view: true
  })
}

// Track virtual page views (for SPA navigation)
export const trackVirtualPageView = (pagePath: string, pageTitle: string) => {
  if (!isAnalyticsEnabled()) return
  
  window.gtag('event', 'page_view', {
    page_title: pageTitle,
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath
  })
}

// ========================
// EVENT TRACKING
// ========================

interface EventParams {
  action: string
  category?: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Generic event tracking
export const trackEvent = ({ 
  action, 
  category = 'general', 
  label, 
  value, 
  custom_parameters = {} 
}: EventParams) => {
  if (!isAnalyticsEnabled()) return
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters
  })
}

// ========================
// LEAD TRACKING EVENTS
// ========================

// Track lead form submissions
export const trackLeadSubmission = (formData: {
  service_type: string
  lead_source: string
  phone_number?: string
  lead_score?: number
  form_location: string
}) => {
  trackEvent({
    action: 'lead_submission',
    category: 'leads',
    label: formData.service_type,
    value: formData.lead_score || 0,
    custom_parameters: {
      service_type: formData.service_type,
      lead_source: formData.lead_source,
      form_location: formData.form_location,
      has_phone: !!formData.phone_number,
      timestamp: new Date().toISOString()
    }
  })
  
  // Also track as conversion
  window.gtag('event', 'conversion', {
    send_to: GA_TRACKING_ID,
    value: 1,
    currency: 'INR',
    transaction_id: `lead_${Date.now()}`
  })
}

// Track WhatsApp redirects
export const trackWhatsAppClick = (source: string, service?: string) => {
  trackEvent({
    action: 'whatsapp_click',
    category: 'engagement',
    label: source,
    custom_parameters: {
      contact_method: 'whatsapp',
      source_page: source,
      service_interest: service || 'general',
      timestamp: new Date().toISOString()
    }
  })
}

// Track phone calls
export const trackPhoneCall = (source: string, phone_number: string) => {
  trackEvent({
    action: 'phone_call',
    category: 'engagement',
    label: source,
    custom_parameters: {
      contact_method: 'phone',
      phone_number: phone_number.replace(/\D/g, ''), // Store only digits
      source_page: source,
      timestamp: new Date().toISOString()
    }
  })
}

// Track email clicks
export const trackEmailClick = (source: string, email_type: string = 'general') => {
  trackEvent({
    action: 'email_click',
    category: 'engagement',
    label: source,
    custom_parameters: {
      contact_method: 'email',
      email_type: email_type,
      source_page: source,
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// USER BEHAVIOR TRACKING
// ========================

// Track service page views
export const trackServiceView = (serviceName: string, source?: string) => {
  trackEvent({
    action: 'service_view',
    category: 'services',
    label: serviceName,
    custom_parameters: {
      service_name: serviceName,
      referrer_source: source,
      timestamp: new Date().toISOString()
    }
  })
}

// Track quote button clicks
export const trackQuoteRequest = (serviceName: string, brand?: string) => {
  trackEvent({
    action: 'quote_request',
    category: 'engagement',
    label: serviceName,
    custom_parameters: {
      service_name: serviceName,
      selected_brand: brand,
      timestamp: new Date().toISOString()
    }
  })
}

// Track brand selection on service pages
export const trackBrandSelection = (serviceName: string, brandName: string) => {
  trackEvent({
    action: 'brand_selection',
    category: 'product_interaction',
    label: `${serviceName}_${brandName}`,
    custom_parameters: {
      service_name: serviceName,
      brand_name: brandName,
      timestamp: new Date().toISOString()
    }
  })
}

// Track scroll depth
export const trackScrollDepth = (percentage: number, pagePath: string) => {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
    custom_parameters: {
      page_path: pagePath,
      scroll_percentage: percentage,
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// ERROR TRACKING
// ========================

// Track JavaScript errors
export const trackError = (error: Error, context?: string) => {
  console.error('Application Error:', error, context)
  
  if (!isAnalyticsEnabled()) return
  
  window.gtag('event', 'exception', {
    description: error.message,
    fatal: false,
    custom_parameters: {
      error_context: context,
      error_stack: error.stack?.substring(0, 150), // Limit stack trace length
      timestamp: new Date().toISOString()
    }
  })
}

// Track form errors
export const trackFormError = (formName: string, errorType: string, errorMessage?: string) => {
  trackEvent({
    action: 'form_error',
    category: 'errors',
    label: `${formName}_${errorType}`,
    custom_parameters: {
      form_name: formName,
      error_type: errorType,
      error_message: errorMessage,
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// SEARCH TRACKING
// ========================

// Track internal search (if you add search functionality)
export const trackInternalSearch = (searchTerm: string, resultCount: number) => {
  trackEvent({
    action: 'search',
    category: 'search',
    label: searchTerm,
    value: resultCount,
    custom_parameters: {
      search_term: searchTerm,
      result_count: resultCount,
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// E-COMMERCE TRACKING (for future quote tracking)
// ========================

// Track quote generation (when implemented)
export const trackQuoteGeneration = (quoteData: {
  quote_id: string
  service_type: string
  quote_value: number
  customer_type: string
}) => {
  trackEvent({
    action: 'quote_generated',
    category: 'ecommerce',
    label: quoteData.service_type,
    value: quoteData.quote_value,
    custom_parameters: {
      quote_id: quoteData.quote_id,
      service_type: quoteData.service_type,
      quote_value: quoteData.quote_value,
      customer_type: quoteData.customer_type,
      currency: 'INR',
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// CUSTOM DIMENSIONS & METRICS
// ========================

// Set custom user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (!isAnalyticsEnabled()) return
  
  window.gtag('config', GA_TRACKING_ID, {
    custom_map: properties
  })
}

// Track user engagement time
export const trackEngagementTime = (pagePath: string, timeSpent: number) => {
  trackEvent({
    action: 'engagement_time',
    category: 'engagement',
    label: pagePath,
    value: Math.round(timeSpent / 1000), // Convert to seconds
    custom_parameters: {
      page_path: pagePath,
      time_spent_seconds: Math.round(timeSpent / 1000),
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// UTILITY FUNCTIONS
// ========================

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return
  
  // Create gtag script
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  script.async = true
  document.head.appendChild(script)
  
  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  
  window.gtag('js', new Date())
  window.gtag('config', GA_TRACKING_ID, {
    send_page_view: false, // We'll handle page views manually
    anonymize_ip: true, // GDPR compliance
    allow_google_signals: false, // Disable ads features for privacy
    cookie_flags: 'SameSite=None;Secure' // Modern cookie settings
  })
}

// Check if user has consented to analytics
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('analytics_consent') === 'true'
}

// Set analytics consent
export const setAnalyticsConsent = (consent: boolean) => {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('analytics_consent', consent.toString())
  
  if (consent && GA_TRACKING_ID) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    })
  } else {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied'
    })
  }
}

// Track outbound links
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent({
    action: 'outbound_link',
    category: 'engagement',
    label: url,
    custom_parameters: {
      link_url: url,
      link_text: linkText,
      timestamp: new Date().toISOString()
    }
  })
}

// Track file downloads
export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent({
    action: 'file_download',
    category: 'engagement',
    label: fileName,
    custom_parameters: {
      file_name: fileName,
      file_type: fileType,
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// BUSINESS-SPECIFIC TRACKING
// ========================

// Track service area interest
export const trackServiceAreaInterest = (area: string) => {
  trackEvent({
    action: 'service_area_interest',
    category: 'location',
    label: area,
    custom_parameters: {
      interested_area: area,
      timestamp: new Date().toISOString()
    }
  })
}

// Track emergency support requests
export const trackEmergencySupport = (contactMethod: string) => {
  trackEvent({
    action: 'emergency_support',
    category: 'support',
    label: contactMethod,
    custom_parameters: {
      contact_method: contactMethod,
      priority: 'high',
      timestamp: new Date().toISOString()
    }
  })
}

export default {
  initGA,
  trackPageView,
  trackVirtualPageView,
  trackEvent,
  trackLeadSubmission,
  trackWhatsAppClick,
  trackPhoneCall,
  trackEmailClick,
  trackServiceView,
  trackQuoteRequest,
  trackBrandSelection,
  trackScrollDepth,
  trackError,
  trackFormError,
  trackInternalSearch,
  trackQuoteGeneration,
  trackEngagementTime,
  trackOutboundLink,
  trackFileDownload,
  trackServiceAreaInterest,
  trackEmergencySupport,
  hasAnalyticsConsent,
  setAnalyticsConsent,
  isAnalyticsEnabled
}