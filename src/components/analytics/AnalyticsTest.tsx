// src/components/analytics/AnalyticsTest.tsx
// Testing component to verify Google Analytics is working correctly

'use client'

import React, { useState, useEffect } from 'react'
import { 
  trackEvent, 
  trackLeadSubmission, 
  trackWhatsAppClick, 
  trackPhoneClick,
  trackServiceView,
  trackQuoteRequest,
  trackBusinessEvent,
  isAnalyticsEnabled
} from '@/lib/analytics'

export default function AnalyticsTest() {
  const [analyticsStatus, setAnalyticsStatus] = useState<'loading' | 'enabled' | 'disabled'>('loading')
  const [lastEvent, setLastEvent] = useState<string>('')

  useEffect(() => {
    // Check analytics status after component mounts
    const checkStatus = () => {
      if (isAnalyticsEnabled()) {
        setAnalyticsStatus('enabled')
      } else {
        setAnalyticsStatus('disabled')
      }
    }

    // Check immediately
    checkStatus()

    // Check again after a delay to allow GA to load
    const timer = setTimeout(checkStatus, 2000)

    return () => clearTimeout(timer)
  }, [])

  const testEvent = (eventName: string, eventFunction: () => void) => {
    eventFunction()
    setLastEvent(eventName)
    console.log(`🎯 Analytics Test: ${eventName} fired`)
  }

  const getStatusColor = () => {
    switch (analyticsStatus) {
      case 'enabled': return 'text-green-600 bg-green-50'
      case 'disabled': return 'text-red-600 bg-red-50'
      default: return 'text-yellow-600 bg-yellow-50'
    }
  }

  const getStatusText = () => {
    switch (analyticsStatus) {
      case 'enabled': return '✅ Google Analytics is working'
      case 'disabled': return '❌ Google Analytics not detected'
      default: return '⏳ Checking Google Analytics...'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🔍 Google Analytics Testing Dashboard
        </h2>
        <p className="text-gray-600">
          Test all analytics events and verify tracking is working correctly.
        </p>
      </div>

      {/* Analytics Status */}
      <div className={`p-4 rounded-lg mb-6 ${getStatusColor()}`}>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{getStatusText()}</span>
          {analyticsStatus === 'enabled' && (
            <span className="text-sm">
              (Measurement ID: G-0P3FB0C5M2)
            </span>
          )}
        </div>
        {lastEvent && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Last Event:</span> {lastEvent}
          </div>
        )}
      </div>

      {/* Event Testing Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        
        {/* Lead Events */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-3">📋 Lead Events</h3>
          <div className="space-y-2">
            <button
              onClick={() => testEvent('Lead Submission', () => 
                trackLeadSubmission({
                  service_type: 'boom-barriers',
                  lead_source: 'test-form',
                  phone_number: '9876543210',
                  lead_score: 85,
                  form_location: 'test-page'
                })
              )}
              className="w-full bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700"
            >
              Test Lead Submission
            </button>
            
            <button
              onClick={() => testEvent('Quote Request', () => 
                trackQuoteRequest('boom-barriers', 'FAAC')
              )}
              className="w-full bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700"
            >
              Test Quote Request
            </button>
          </div>
        </div>

        {/* Contact Events */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-3">📞 Contact Events</h3>
          <div className="space-y-2">
            <button
              onClick={() => testEvent('WhatsApp Click', () => 
                trackWhatsAppClick('test-button', 'boom-barriers')
              )}
              className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
            >
              Test WhatsApp Click
            </button>
            
            <button
              onClick={() => testEvent('Phone Click', () => 
                trackPhoneClick('test-button', 'cctv-services')
              )}
              className="w-full bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
            >
              Test Phone Click
            </button>
          </div>
        </div>

        {/* Service Events */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">🛠️ Service Events</h3>
          <div className="space-y-2">
            <button
              onClick={() => testEvent('Service View', () => 
                trackServiceView('boom-barriers', 'direct-traffic')
              )}
              className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
            >
              Test Service View
            </button>
            
            <button
              onClick={() => testEvent('Demo Request', () => 
                trackBusinessEvent('demo_request', 'biometric-attendance')
              )}
              className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
            >
              Test Demo Request
            </button>
          </div>
        </div>

        {/* Custom Events */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="font-semibold text-orange-800 mb-3">🎯 Custom Events</h3>
          <div className="space-y-2">
            <button
              onClick={() => testEvent('Custom Event', () => 
                trackEvent({
                  action: 'test_button_click',
                  category: 'testing',
                  label: 'analytics-dashboard',
                  value: 1,
                  custom_parameters: {
                    test_type: 'manual',
                    timestamp: new Date().toISOString()
                  }
                })
              )}
              className="w-full bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700"
            >
              Test Custom Event
            </button>
            
            <button
              onClick={() => testEvent('Price Inquiry', () => 
                trackBusinessEvent('price_inquiry', 'door-access-controllers')
              )}
              className="w-full bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700"
            >
              Test Price Inquiry
            </button>
          </div>
        </div>

        {/* Error Events */}
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-3">🚨 Error Events</h3>
          <div className="space-y-2">
            <button
              onClick={() => testEvent('Test Error', () => {
                const testError = new Error('Test analytics error')
                if (window.gtag) {
                  window.gtag('event', 'exception', {
                    description: testError.message,
                    fatal: false,
                    custom_parameters: {
                      error_context: 'analytics-test',
                      test_mode: true
                    }
                  })
                }
              })}
              className="w-full bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
            >
              Test Error Tracking
            </button>
          </div>
        </div>

        {/* Performance Events */}
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800 mb-3">⚡ Performance</h3>
          <div className="space-y-2">
            <button
              onClick={() => testEvent('Page Load Time', () => {
                if (window.gtag) {
                  window.gtag('event', 'page_load_time', {
                    value: 1500, // 1.5 seconds
                    event_category: 'performance',
                    page_path: '/analytics-test'
                  })
                }
              })}
              className="w-full bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700"
            >
              Test Load Time
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Monitoring */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">
          📊 Real-time Monitoring
        </h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>How to verify events:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Open Chrome DevTools (F12) → Console tab</li>
            <li>Click any test button above</li>
            <li>Check console for "🎯 Analytics Test" messages</li>
            <li>
              Go to{' '}
              <a 
                href="https://analytics.google.com/analytics/web/#/p11445960396/realtime" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Google Analytics Real-time Reports
              </a>
            </li>
            <li>Verify events appear in real-time (may take 1-2 minutes)</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-100 rounded border-l-4 border-blue-400">
            <p className="text-blue-800">
              <strong>💡 Pro Tip:</strong> Events may take 1-2 minutes to appear in Google Analytics. 
              Check the browser console immediately for confirmation that events are being sent.
            </p>
          </div>
        </div>
      </div>

      {/* Debug Information */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">🔧 Debug Information</h3>
        <div className="text-sm font-mono text-gray-600 space-y-1">
          <div>Analytics Status: <span className="font-bold">{analyticsStatus}</span></div>
          <div>GA Tracking ID: <span className="font-bold">G-0P3FB0C5M2</span></div>
          <div>Current URL: <span className="font-bold">{typeof window !== 'undefined' ? window.location.href : 'Loading...'}</span></div>
          <div>User Agent: <span className="font-bold">{typeof window !== 'undefined' ? navigator.userAgent.slice(0, 60) + '...' : 'Loading...'}</span></div>
        </div>
      </div>
    </div>
  )
}