// src/components/providers/AnalyticsProvider.tsx
// Client-side analytics provider for Google Analytics integration

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, trackPageView, trackVirtualPageView, hasAnalyticsConsent, setAnalyticsConsent } from '@/lib/analytics'

export default function AnalyticsProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize Google Analytics on component mount
  useEffect(() => {
    // Check if user has given consent (GDPR compliance)
    const hasConsent = hasAnalyticsConsent()
    
    if (hasConsent) {
      initGA()
    } else {
      // Show consent banner or initialize with consent denied
      // For now, we'll initialize with consent granted (you can add a consent banner later)
      setAnalyticsConsent(true)
      initGA()
    }
  }, [])

  // Track page views when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
      
      // Get page title
      const pageTitle = document.title || 'Park Space'
      
      // Track the page view
      trackVirtualPageView(url, pageTitle)
      
      // Track UTM parameters if present
      if (searchParams.toString()) {
        const utmSource = searchParams.get('utm_source')
        const utmMedium = searchParams.get('utm_medium')
        const utmCampaign = searchParams.get('utm_campaign')
        
        if (utmSource && window.gtag) {
          window.gtag('event', 'campaign_tracking', {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            page_path: pathname
          })
        }
      }
    }
  }, [pathname, searchParams])

  // Track scroll depth
  useEffect(() => {
    let scrollTracked: Record<number, boolean> = {
      25: false,
      50: false,
      75: false,
      90: false
    }

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

      // Track scroll milestones
      Object.keys(scrollTracked).forEach(milestone => {
        const milestoneNum = parseInt(milestone)
        if (scrollPercentage >= milestoneNum && !scrollTracked[milestoneNum]) {
          scrollTracked[milestoneNum] = true
          
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${milestone}%`,
              value: milestoneNum,
              page_path: pathname
            })
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  // Track engagement time
  useEffect(() => {
    const startTime = Date.now()
    
    const trackEngagementTime = () => {
      const engagementTime = Date.now() - startTime
      
      // Only track if user spent more than 10 seconds on page
      if (engagementTime > 10000 && window.gtag) {
        window.gtag('event', 'engagement_time', {
          event_category: 'engagement',
          value: Math.round(engagementTime / 1000), // Convert to seconds
          page_path: pathname,
          custom_parameter_1: 'time_spent_seconds'
        })
      }
    }

    // Track engagement time when user leaves the page
    const handleBeforeUnload = () => {
      trackEngagementTime()
    }

    // Track engagement time when user becomes inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEngagementTime()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      trackEngagementTime() // Track when component unmounts
    }
  }, [pathname])

  // Track outbound link clicks
  useEffect(() => {
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLAnchorElement
      
      if (target.tagName === 'A' && target.href) {
        const isOutbound = !target.href.includes(window.location.hostname)
        const isWhatsApp = target.href.includes('wa.me') || target.href.includes('whatsapp.com')
        const isPhone = target.href.startsWith('tel:')
        const isEmail = target.href.startsWith('mailto:')
        
        if (isOutbound && window.gtag) {
          window.gtag('event', 'outbound_link', {
            event_category: 'engagement',
            event_label: target.href,
            page_path: pathname
          })
        }
        
        if (isWhatsApp && window.gtag) {
          window.gtag('event', 'whatsapp_click', {
            event_category: 'engagement',
            event_label: 'whatsapp_link',
            page_path: pathname
          })
        }
        
        if (isPhone && window.gtag) {
          window.gtag('event', 'phone_click', {
            event_category: 'engagement',
            event_label: target.href,
            page_path: pathname
          })
        }
        
        if (isEmail && window.gtag) {
          window.gtag('event', 'email_click', {
            event_category: 'engagement',
            event_label: target.href,
            page_path: pathname
          })
        }
      }
    }

    document.addEventListener('click', handleLinkClick)
    
    return () => {
      document.removeEventListener('click', handleLinkClick)
    }
  }, [pathname])

  // This component doesn't render anything visible
  return null
}