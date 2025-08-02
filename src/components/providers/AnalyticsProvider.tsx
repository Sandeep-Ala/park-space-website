// src/components/providers/AnalyticsProvider.tsx
// Client-side analytics provider for Google Analytics integration
// Updated to work with direct script implementation

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { 
  trackVirtualPageView, 
  hasAnalyticsConsent, 
  setAnalyticsConsent,
  isAnalyticsEnabled,
  initGA
} from '@/lib/analytics'

export default function AnalyticsProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize analytics consent and wait for GA to load
  useEffect(() => {
    const setupAnalytics = async () => {
      // Check if user has given consent (GDPR compliance)
      const hasConsent = hasAnalyticsConsent()
      
      if (!hasConsent) {
        // For now, we'll assume consent (you can add a consent banner later)
        setAnalyticsConsent(true)
      }

      // Wait for GA to be ready (since it's loaded directly in head)
      await initGA()
      
      // Send initial page view
      if (isAnalyticsEnabled()) {
        const pageTitle = document.title || 'Park Space'
        trackVirtualPageView(pathname, pageTitle)
      }
    }

    setupAnalytics()
  }, [pathname]) // Only run when pathname changes or on initial load

  // Track page views when route changes
  useEffect(() => {
    if (isAnalyticsEnabled()) {
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
        const utmContent = searchParams.get('utm_content')
        const utmTerm = searchParams.get('utm_term')
        
        if (utmSource && window.gtag) {
          window.gtag('event', 'campaign_tracking', {
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_content: utmContent,
            utm_term: utmTerm,
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
      if (!isAnalyticsEnabled()) return

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
              event_label: `${milestoneNum}%`,
              value: milestoneNum,
              page_path: pathname
            })
          }
        }
      })
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  // Track time on page
  useEffect(() => {
    const startTime = Date.now()
    
    const handleBeforeUnload = () => {
      if (isAnalyticsEnabled()) {
        const timeSpent = Date.now() - startTime
        
        // Only track if user spent more than 10 seconds on page
        if (timeSpent > 10000) {
          window.gtag('event', 'page_engagement_time', {
            event_category: 'engagement',
            value: Math.round(timeSpent / 1000),
            page_path: pathname
          })
        }
      }
    }

    // Track when user leaves the page
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    // Also track on route change (for SPA navigation)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      
      // Track time spent when component unmounts (route change)
      const timeSpent = Date.now() - startTime
      if (isAnalyticsEnabled() && timeSpent > 10000) {
        window.gtag('event', 'page_engagement_time', {
          event_category: 'engagement',
          value: Math.round(timeSpent / 1000),
          page_path: pathname
        })
      }
    }
  }, [pathname])

  // Track clicks on external links
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!isAnalyticsEnabled()) return

      const target = event.target as HTMLElement
      const link = target.closest('a')
      
      if (link && link.href) {
        const url = new URL(link.href, window.location.href)
        const isExternal = url.hostname !== window.location.hostname
        
        if (isExternal) {
          window.gtag('event', 'outbound_link', {
            event_category: 'external_links',
            event_label: url.hostname,
            link_url: link.href,
            link_text: link.textContent?.trim() || '',
            page_path: pathname
          })
        }
      }
    }

    document.addEventListener('click', handleClick, true)
    
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [pathname])

  // This component doesn't render anything
  return null
}