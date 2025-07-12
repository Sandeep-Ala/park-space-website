// =============================================
// src/app/biometric-attendance/page.tsx (COMPLETE FIX)
// Fixed scrolling, styling, and API calls
// =============================================
'use client'

import React, { useState, useRef } from 'react'
import { Fingerprint, Clock, Users, BarChart3, Shield, Wrench, Building, School, Factory, Heart, ChevronRight } from 'lucide-react'
// import Header from '@/components/layout/Header'
// import Footer from '@/components/layout/Footer'
import LeadForm from '@/components/forms/LeadForm'
import WhatsAppFloat from '@/components/common/WhatsAppFloat'

const BIOMETRIC_BRANDS = [
  {
    id: 'timewatch',
    name: 'TIME WATCH',
    description: 'Advanced biometric solutions with cloud integration and analytics',
    features: [
      'Fingerprint Recognition',
      'Face Recognition',
      'RFID Card Support',
      'Cloud-based Reporting',
      'Mobile App Access',
      'Real-time Sync'
    ],
    priceRange: '₹8,000 - ₹25,000',
    isPopular: true
  },
  {
    id: 'essl',
    name: 'ESSL Security',
    description: 'Reliable biometric attendance systems for all business sizes',
    features: [
      'Multi-biometric Technology',
      'TCP/IP Connectivity',
      'Large User Capacity',
      'Backup Battery',
      'Access Control Integration'
    ],
    priceRange: '₹6,000 - ₹20,000',
    isPopular: true
  },
  {
    id: 'realtime',
    name: 'Realtime',
    description: 'Professional grade biometric systems with advanced features',
    features: [
      'High-speed Recognition',
      'Weather Resistant',
      'Multiple Authentication',
      'Advanced Reports',
      'API Integration'
    ],
    priceRange: '₹7,000 - ₹22,000',
    isPopular: false
  },
  {
    id: 'matrix',
    name: 'Matrix',
    description: 'Enterprise biometric solutions with comprehensive software',
    features: [
      'Enterprise Software',
      'Centralized Management',
      'Multi-location Support',
      'Payroll Integration',
      'Advanced Analytics'
    ],
    priceRange: '₹10,000 - ₹35,000',
    isPopular: false
  },
  {
    id: 'suprema',
    name: 'Suprema',
    description: 'Premium biometric technology with AI-powered features',
    features: [
      'AI-based Recognition',
      'Touchless Technology',
      'High Security Level',
      'Mobile Credentials',
      'Premium Build Quality'
    ],
    priceRange: '₹15,000 - ₹50,000',
    isPopular: false
  }
]

const APPLICATIONS = [
  { icon: Building, title: 'Corporate Offices', description: 'Employee time tracking and access control for offices' },
  { icon: Factory, title: 'Manufacturing', description: 'Worker attendance and shift management in factories' },
  { icon: School, title: 'Educational Institutions', description: 'Student and staff attendance in schools/colleges' },
  { icon: Heart, title: 'Healthcare', description: 'Staff attendance and patient area access control' },
  { icon: Users, title: 'Retail Chains', description: 'Multi-location employee attendance management' },
  { icon: Shield, title: 'Security Agencies', description: 'Guard attendance and patrol tracking' },
  { icon: BarChart3, title: 'Government Offices', description: 'Public sector employee attendance systems' }
]

export default function BiometricAttendancePage() {
  const [selectedBrand, setSelectedBrand] = useState(BIOMETRIC_BRANDS[0])
  const [showLeadForm, setShowLeadForm] = useState(false)
  const leadFormRef = useRef<HTMLElement>(null)

  const handleGetQuote = (brandName?: string) => {
    setShowLeadForm(true)
    // Scroll to form after it's shown
    setTimeout(() => {
      leadFormRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      })
    }, 100)
  }

  const handleLeadFormSuccess = (leadId: string) => {
    setShowLeadForm(false)
    // Optional: You can add success notification here
  }

  return (
    <>
      {/* <Header /> */}
      <WhatsAppFloat />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Biometric <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Attendance</span> Systems
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Advanced biometric attendance solutions in Hyderabad. TIME WATCH, ESSL, Realtime brands with fingerprint, face recognition, and cloud integration.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-green-400" />
                  Fingerprint Recognition
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  Face Recognition
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-400" />
                  Real-time Tracking
                </span>
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-pink-400" />
                  Analytics & Reports
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Selection */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your Biometric Brand</h2>
            
            {/* Brand Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {BIOMETRIC_BRANDS.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    selectedBrand.id === brand.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  } ${brand.isPopular ? 'ring-2 ring-yellow-400' : ''}`}
                >
                  {brand.name}
                  {brand.isPopular && <span className="ml-2 text-yellow-400">⭐</span>}
                </button>
              ))}
            </div>

            {/* Selected Brand Details */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedBrand.name}</h3>
                  <p className="text-gray-300 mb-6">{selectedBrand.description}</p>
                  
                  <h4 className="text-lg font-semibold text-white mb-4">Key Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedBrand.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-300">
                        <div className="h-2 w-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Price Range</p>
                      <p className="text-xl font-bold text-white">{selectedBrand.priceRange}</p>
                    </div>
                    <button
                      onClick={() => handleGetQuote(selectedBrand.name)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Complete Package Includes:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <Fingerprint className="h-5 w-5 text-purple-400" />
                      Biometric Device & Installation
                    </li>
                    <li className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5 text-blue-400" />
                      Attendance Software
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-green-400" />
                      User Training & Setup
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      1 Year Warranty
                    </li>
                    <li className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-pink-400" />
                      Annual Maintenance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Biometric Services</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Fingerprint className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Installation & Configuration</h3>
                <p className="text-gray-300 mb-4">Complete biometric system setup with software configuration and user enrollment.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Device installation & mounting</li>
                  <li>• Software setup & configuration</li>
                  <li>• Employee enrollment & testing</li>
                  <li>• Network integration</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <BarChart3 className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Reports & Analytics</h3>
                <p className="text-gray-300 mb-4">Comprehensive attendance reports with analytics and payroll integration capabilities.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Daily/Monthly attendance reports</li>
                  <li>• Late arrival & early departure tracking</li>
                  <li>• Overtime calculations</li>
                  <li>• Payroll integration support</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Wrench className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Maintenance & Support</h3>
                <p className="text-gray-300 mb-4">Regular maintenance and technical support to ensure smooth operation of your biometric system.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Regular device maintenance</li>
                  <li>• Software updates & backup</li>
                  <li>• Technical support</li>
                  <li>• Emergency repair services</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Applications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {APPLICATIONS.map((app, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
                  <app.icon className="h-10 w-10 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{app.title}</h3>
                  <p className="text-gray-300 text-sm">{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        {showLeadForm && (
          <section ref={leadFormRef} className="py-16 px-4 bg-white/5">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white text-center mb-8">Get Your Biometric Quote</h2>
                {/* Custom styled form wrapper */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <style jsx>{`
                    .lead-form input,
                    .lead-form select,
                    .lead-form textarea {
                      background: rgba(255, 255, 255, 0.1) !important;
                      border: 1px solid rgba(255, 255, 255, 0.3) !important;
                      color: white !important;
                    }
                    .lead-form input::placeholder,
                    .lead-form textarea::placeholder {
                      color: rgba(255, 255, 255, 0.6) !important;
                    }
                    .lead-form label {
                      color: white !important;
                    }
                    .lead-form .text-gray-700 {
                      color: white !important;
                    }
                    .lead-form .text-gray-300 {
                      color: rgba(255, 255, 255, 0.8) !important;
                    }
                    .lead-form .text-gray-400 {
                      color: rgba(255, 255, 255, 0.6) !important;
                    }
                    .lead-form .text-gray-500 {
                      color: rgba(255, 255, 255, 0.5) !important;
                    }
                  `}</style>
                  <div className="lead-form">
                    <LeadForm
                      defaultService="biometric-attendance"
                      defaultSubService={selectedBrand.name}
                      onSuccess={handleLeadFormSuccess}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Streamline Your Attendance Management</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get advanced biometric attendance systems with real-time tracking and comprehensive reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleGetQuote()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Get Free Quote
                <ChevronRight className="h-5 w-5" />
              </button>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '916302789421'}`}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Call Now: +91 98765 43210
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* <Footer /> */}
    </>
  )
}