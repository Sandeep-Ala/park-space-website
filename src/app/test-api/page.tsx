// =============================================
// src/app/test-api/page.tsx (FIXED)
// API Testing page with better error handling
// =============================================
'use client'

import React, { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react'

interface TestResult {
  name: string
  status: 'pending' | 'success' | 'error'
  message: string
  data?: any
  error?: any
  expanded?: boolean
}

export default function TestAPIPage() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'GET /api/services', status: 'pending', message: 'Not tested', expanded: false },
    { name: 'GET /api/services?slug=boom-barriers', status: 'pending', message: 'Not tested', expanded: false },
    { name: 'POST /api/leads', status: 'pending', message: 'Not tested', expanded: false },
    { name: 'GET /api/leads', status: 'pending', message: 'Not tested', expanded: false },
    { name: 'GET /api/analytics', status: 'pending', message: 'Not tested', expanded: false },
  ])

  const [isRunning, setIsRunning] = useState(false)

  const updateTest = (name: string, status: 'success' | 'error', message: string, data?: any, error?: any) => {
    setTests(prev => prev.map(test => 
      test.name === name ? { ...test, status, message, data, error } : test
    ))
  }

  const toggleExpanded = (name: string) => {
    setTests(prev => prev.map(test => 
      test.name === name ? { ...test, expanded: !test.expanded } : test
    ))
  }

  const runTest = async (testName: string, url: string, options?: RequestInit) => {
    try {
      console.log(`Testing ${testName}:`, url, options)
      
      const response = await fetch(url, options)
      const responseText = await response.text()
      
      console.log(`Response for ${testName}:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText.substring(0, 1000) // First 1000 chars
      })

      let result
      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}...`)
      }
      
      if (response.ok && result.success) {
        updateTest(testName, 'success', `✅ ${result.message || 'Success'}`, result.data)
      } else {
        updateTest(testName, 'error', `❌ ${result.error || `HTTP ${response.status}`}`, result, {
          status: response.status,
          statusText: response.statusText,
          responseText: responseText.substring(0, 500)
        })
      }
    } catch (error) {
      console.error(`Error in ${testName}:`, error)
      updateTest(testName, 'error', `❌ ${error instanceof Error ? error.message : 'Unknown error'}`, null, error)
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    
    // Test 1: GET /api/services
    await runTest('GET /api/services', '/api/services')
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 2: GET /api/services with slug
    await runTest('GET /api/services?slug=boom-barriers', '/api/services?slug=boom-barriers&brands=true')
    
    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 3: POST /api/leads
    const testLead = {
      name: 'Test User',
      phone: '6302789421',
      email: 'test@example.com',
      location: 'Hyderabad',
      service_type: 'boom-barriers',
      message: 'Test lead from API testing',
      source: 'api-test'
    }

    await runTest('POST /api/leads', '/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testLead)
    })

    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 4: GET /api/leads
    await runTest('GET /api/leads', '/api/leads?limit=5')

    await new Promise(resolve => setTimeout(resolve, 500))

    // Test 5: GET /api/analytics
    await runTest('GET /api/analytics', '/api/analytics?period=30')

    setIsRunning(false)
  }

  const resetTests = () => {
    setTests(prev => prev.map(test => ({ 
      ...test, 
      status: 'pending' as const, 
      message: 'Not tested',
      data: undefined,
      error: undefined,
      expanded: false
    })))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Testing Dashboard</h1>
          <p className="text-gray-600 mb-8">Test all API endpoints to ensure proper functionality</p>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={runAllTests}
              disabled={isRunning}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Running Tests...</span>
                </>
              ) : (
                <span>Run All Tests</span>
              )}
            </button>
            
            <button
              onClick={resetTests}
              disabled={isRunning}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              Reset Tests
            </button>
          </div>

          <div className="space-y-4">
            {tests.map((test, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{test.name}</h3>
                  <div className="flex items-center space-x-2">
                    {test.status === 'pending' && (
                      <span className="text-gray-500 text-sm">Pending</span>
                    )}
                    {test.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                    {test.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
                
                <p className={`text-sm mb-2 ${
                  test.status === 'success' ? 'text-green-700' : 
                  test.status === 'error' ? 'text-red-700' : 'text-gray-600'
                }`}>
                  {test.message}
                </p>

                {(test.data || test.error) && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleExpanded(test.name)}
                      className="flex items-center space-x-1 text-blue-600 text-sm hover:text-blue-800"
                    >
                      {test.expanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <span>
                        {test.expanded ? 'Hide' : 'Show'} Details
                      </span>
                    </button>
                    
                    {test.expanded && (
                      <div className="mt-2 space-y-2">
                        {test.data && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Response Data:</h4>
                            <pre className="p-3 bg-green-50 rounded text-xs overflow-x-auto border">
                              {JSON.stringify(test.data, null, 2)}
                            </pre>
                          </div>
                        )}
                        {test.error && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Error Details:</h4>
                            <pre className="p-3 bg-red-50 rounded text-xs overflow-x-auto border">
                              {JSON.stringify(test.error, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Manual Test Section */}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Manual API Testing</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Test Individual Endpoints:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <a 
                    href="/api/services" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm hover:bg-blue-200"
                  >
                    GET /api/services
                  </a>
                  <a 
                    href="/api/services?slug=boom-barriers&brands=true" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm hover:bg-blue-200"
                  >
                    GET /api/services?slug=boom-barriers
                  </a>
                  <a 
                    href="/api/leads?limit=5" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm hover:bg-blue-200"
                  >
                    GET /api/leads
                  </a>
                  <a 
                    href="/api/analytics" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm hover:bg-blue-200"
                  >
                    GET /api/analytics
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Test Form Integration:</h3>
                <div className="flex space-x-4">
                  <a 
                    href="/" 
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Test Homepage Form
                  </a>
                  <a 
                    href="/boom-barriers" 
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Test Boom Barriers Form
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}