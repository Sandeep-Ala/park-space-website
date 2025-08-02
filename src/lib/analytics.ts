// src/lib/analytics.ts
// Google Analytics 4 integration for Park Space website
// Updated to work with direct script implementation

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// ========================
// CONFIGURATION
// ========================

export const GA_TRACKING_ID = 'G-0P3FB0C5M2' // Updated with the new measurement ID

// Check if analytics is enabled and loaded
export const isAnalyticsEnabled = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

// ========================
// PAGE TRACKING
// ========================

// Track page views (for manual page view tracking)
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
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_TRACKING_ID,
      value: 1,
      currency: 'INR',
      transaction_id: `lead_${Date.now()}`
    })
  }
}

// Track WhatsApp redirects
export const trackWhatsAppClick = (source: string, service?: string) => {
  trackEvent({
    action: 'whatsapp_click',
    category: 'contact',
    label: service || 'general',
    custom_parameters: {
      contact_method: 'whatsapp',
      click_source: source,
      service_type: service,
      timestamp: new Date().toISOString()
    }
  })
}

// Track phone call clicks
export const trackPhoneClick = (source: string, service?: string) => {
  trackEvent({
    action: 'phone_click',
    category: 'contact',
    label: service || 'general',
    custom_parameters: {
      contact_method: 'phone',
      click_source: source,
      service_type: service,
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// BUSINESS TRACKING EVENTS
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

// Since GA is now loaded directly in HTML head, we just need to check if it's ready
export const initGA = () => {
  // GA is already initialized via direct script tag in layout.tsx
  // This function now just waits for gtag to be available
  return new Promise<void>((resolve) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      resolve()
    } else {
      // Wait for gtag to load
      const checkGtag = () => {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          resolve()
        } else {
          setTimeout(checkGtag, 100)
        }
      }
      checkGtag()
    }
  })
}

// Check if user has consented to analytics (GDPR compliance)
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('analytics_consent') !== 'false' // Default to true unless explicitly denied
}

// Set analytics consent
export const setAnalyticsConsent = (consent: boolean) => {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('analytics_consent', consent.toString())
  
  if (window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: consent ? 'granted' : 'denied'
    })
  }
}

// Track outbound links
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent({
    action: 'outbound_link',
    category: 'external_links',
    label: url,
    custom_parameters: {
      link_url: url,
      link_text: linkText,
      timestamp: new Date().toISOString()
    }
  })
}

// ========================
// PARKSPACE SPECIFIC TRACKING
// ========================

// Track specific business events for Park Space
export const trackBusinessEvent = (eventType: 'demo_request' | 'catalog_download' | 'price_inquiry', serviceType: string) => {
  trackEvent({
    action: eventType,
    category: 'business_conversion',
    label: serviceType,
    custom_parameters: {
      event_type: eventType,
      service_type: serviceType,
      timestamp: new Date().toISOString()
    }
  })
}

// Track competitor comparison views
export const trackCompetitorComparison = (serviceName: string, competitorBrand: string) => {
  trackEvent({
    action: 'competitor_comparison',
    category: 'product_research',
    label: `${serviceName}_vs_${competitorBrand}`,
    custom_parameters: {
      service_name: serviceName,
      competitor_brand: competitorBrand,
      timestamp: new Date().toISOString()
    }
  })
}

// Track installation location interest
export const trackLocationInterest = (location: string, serviceType: string) => {
  trackEvent({
    action: 'location_interest',
    category: 'geographic',
    label: `${serviceType}_${location}`,
    custom_parameters: {
      service_type: serviceType,
      target_location: location,
      timestamp: new Date().toISOString()
    }
  })
}