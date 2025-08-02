// src/app/test-analytics/page.tsx
// Analytics testing page to verify Google Analytics integration

import { Metadata } from 'next'
import AnalyticsTest from '@/components/analytics/AnalyticsTest'

export const metadata: Metadata = {
  title: 'Analytics Test - Park Space',
  description: 'Test Google Analytics integration and tracking events',
  robots: 'noindex, nofollow' // Don't index this test page
}

export default function AnalyticsTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <AnalyticsTest />
        
        {/* Additional Instructions */}
        <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📝 Setup Instructions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">1. Verify Environment Variables</h3>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                <div>NEXT_PUBLIC_GA_ID=G-0P3FB0C5M2</div>
                <div>NEXT_PUBLIC_SITE_URL=https://www.parkspace.in</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">2. Check Google Analytics</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Stream Name: <strong>parkspace</strong></li>
                <li>Stream URL: <strong>https://www.parkspace.in</strong></li>
                <li>Stream ID: <strong>11445960396</strong></li>
                <li>Measurement Id: <strong>G-0P3FB0C5M2</strong></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">3. Verification Steps</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-600">
                <li>Click test buttons above</li>
                <li>Open browser console to see event logs</li>
                <li>Go to Google Analytics Real-time reports</li>
                <li>Verify events appear within 1-2 minutes</li>
                <li>Check that page views are being tracked</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">4. Common Issues & Solutions</h3>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                  <p className="text-yellow-800">
                    <strong>Issue:</strong> Analytics not working in development
                    <br />
                    <strong>Solution:</strong> GA works on localhost, but events may be delayed. Use Chrome DevTools to verify events are being sent.
                  </p>
                </div>
                
                <div className="p-3 bg-red-50 border-l-4 border-red-400">
                  <p className="text-red-800">
                    <strong>Issue:</strong> "gtag is not a function" error
                    <br />
                    <strong>Solution:</strong> Ensure the Google Analytics script in layout.tsx is loading correctly. Check network tab for any blocked requests.
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
                  <p className="text-blue-800">
                    <strong>Issue:</strong> Events not appearing in GA dashboard
                    <br />
                    <strong>Solution:</strong> Events can take 24-48 hours to appear in standard reports. Use Real-time reports for immediate verification.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">5. Important Links</h3>
              <div className="space-y-2">
                <a 
                  href="https://analytics.google.com/analytics/web/#/p11445960396/realtime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 underline"
                >
                  📊 Google Analytics Real-time Reports
                </a>
                <a 
                  href="https://analytics.google.com/analytics/web/#/p11445960396/reports/intelligenthome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 underline"
                >
                  📈 Google Analytics Dashboard
                </a>
                <a 
                  href="https://tagassistant.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 underline"
                >
                  🔍 Google Tag Assistant (for debugging)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}