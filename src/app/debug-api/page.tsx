// =============================================
// src/app/debug-api/page.tsx
// Debug page to test API routes step by step
// =============================================
'use client'

import React, { useState } from 'react'

export default function DebugAPIPage() {
  const [results, setResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testAPI = async (url: string, method: string = 'GET', body?: any) => {
    try {
      addResult(`Testing ${method} ${url}`)
      
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      
      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(url, options)
      
      addResult(`Response status: ${response.status} ${response.statusText}`)
      
      const responseText = await response.text()
      addResult(`Response text: ${responseText.substring(0, 200)}...`)
      
      try {
        const jsonData = JSON.parse(responseText)
        addResult(`✅ Valid JSON received`)
        addResult(`Response: ${JSON.stringify(jsonData, null, 2)}`)
      } catch (e) {
        addResult(`❌ Invalid JSON: ${responseText}`)
      }
      
    } catch (error) {
      addResult(`❌ Network error: ${error}`)
    }
  }

  const clearResults = () => setResults([])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">API Debug Console</h1>
          
          <div className="space-y-4 mb-6">
            <h2 className="text-lg font-semibold">Test Individual Endpoints:</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => testAPI('/api/test')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Test GET /api/test
              </button>
              
              <button
                onClick={() => testAPI('/api/test', 'POST')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Test POST /api/test
              </button>
              
              <button
                onClick={() => testAPI('/api/leads')}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Test GET /api/leads
              </button>
              
              <button
                onClick={() => testAPI('/api/leads', 'POST', {
                  name: 'Debug Test',
                  phone: '6302789421',
                  service_type: 'boom-barriers',
                  location: 'Hyderabad'
                })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Test POST /api/leads
              </button>
              
              <button
                onClick={() => testAPI('/api/services')}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Test GET /api/services
              </button>
              
              <button
                onClick={clearResults}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Clear Results
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Debug Output:</h2>
            <div className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto">
              {results.length === 0 ? (
                <p className="text-gray-500">No tests run yet. Click a button above to start testing.</p>
              ) : (
                <pre className="text-sm space-y-1">
                  {results.map((result, index) => (
                    <div key={index} className="border-b border-gray-200 pb-1">
                      {result}
                    </div>
                  ))}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}