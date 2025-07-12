// =============================================
// src/app/door-access-controllers/page.tsx (COMPLETE FIX)
// Fixed scrolling, styling, and API calls
// =============================================
'use client'

import React, { useState, useRef } from 'react'
import { Key, Shield, Smartphone, Clock, Lock, Wrench, Building, Banknote, Heart, School, ChevronRight, CreditCard } from 'lucide-react'
// import Header from '@/components/layout/Header'
// import Footer from '@/components/layout/Footer'
import LeadForm from '@/components/forms/LeadForm'
import WhatsAppFloat from '@/components/common/WhatsAppFloat'

const ACCESS_CONTROL_BRANDS = [
  {
    id: 'zkteco',
    name: 'ZKTeco',
    description: 'Advanced access control systems with biometric integration',
    features: [
      'Biometric Access Control',
      'RFID Card Support',
      'Mobile App Control',
      'Cloud Management',
      'Multi-door Control',
      'Real-time Monitoring'
    ],
    priceRange: '₹12,000 - ₹35,000',
    isPopular: true
  },
  {
    id: 'honeywell',
    name: 'Honeywell',
    description: 'Enterprise-grade access control with advanced security features',
    features: [
      'Enterprise Security',
      'Integration Capabilities',
      'Advanced Encryption',
      'Visitor Management',
      'Time & Attendance',
      'Audit Trail'
    ],
    priceRange: '₹15,000 - ₹50,000',
    isPopular: true
  },
  {
    id: 'hikvision-access',
    name: 'Hikvision Access',
    description: 'Professional access control integrated with video surveillance',
    features: [
      'Video Integration',
      'Face Recognition',
      'Anti-passback',
      'Fire Alarm Integration',
      'Elevator Control',
      'Mobile Credentials'
    ],
    priceRange: '₹10,000 - ₹40,000',
    isPopular: false
  },
  {
    id: 'matrix-access',
    name: 'Matrix Access',
    description: 'Comprehensive access control with attendance integration',
    features: [
      'Multi-technology Support',
      'Attendance Integration',
      'Visitor Management',
      'Anti-tailgating',
      'Emergency Override',
      'Centralized Management'
    ],
    priceRange: '₹8,000 - ₹30,000',
    isPopular: false
  },
  {
    id: 'suprema-access',
    name: 'Suprema Access',
    description: 'Premium touchless access control with AI features',
    features: [
      'Touchless Technology',
      'AI-powered Recognition',
      'Mobile Access',
      'Cloud-based Management',
      'Advanced Analytics',
      'Cybersecurity Features'
    ],
    priceRange: '₹20,000 - ₹60,000',
    isPopular: false
  }
]

const APPLICATIONS = [
  { icon: Building, title: 'Corporate Offices', description: 'Secure office areas and conference rooms' },
  { icon: Banknote, title: 'Financial Institutions', description: 'High-security access for banks and ATMs' },
  { icon: Heart, title: 'Healthcare Facilities', description: 'Controlled access to patient and restricted areas' },
  { icon: School, title: 'Educational Institutions', description: 'Campus security and room access control' },
  { icon: Shield, title: 'Government Buildings', description: 'Multi-level security for sensitive areas' },
  { icon: Lock, title: 'Data Centers', description: 'Server room and IT infrastructure protection' },
  { icon: Key, title: 'Residential Complexes', description: 'Building and apartment access management' }
]

export default function DoorAccessControllersPage() {
  const [selectedBrand, setSelectedBrand] = useState(ACCESS_CONTROL_BRANDS[0])
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
                Door Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Controllers</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Advanced door access control systems in Hyderabad. ZKTeco, Honeywell, Hikvision brands with biometric, RFID, and mobile access solutions.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-green-400" />
                  Biometric Access
                </span>
                <span className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-400" />
                  RFID Cards
                </span>
                <span className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-purple-400" />
                  Mobile Access
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-pink-400" />
                  Multi-level Security
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Selection */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your Access Control Brand</h2>
            
            {/* Brand Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {ACCESS_CONTROL_BRANDS.map((brand) => (
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
                  <h4 className="text-lg font-semibold text-white mb-4">Complete Solution Includes:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-purple-400" />
                      Access Control Unit
                    </li>
                    <li className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-blue-400" />
                      Electric Lock Installation
                    </li>
                    <li className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-green-400" />
                      Software & Mobile App
                    </li>
                    <li className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-yellow-400" />
                      RFID Cards/Fobs
                    </li>
                    <li className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-pink-400" />
                      Installation & Training
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
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Access Control Services</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Lock className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Installation & Setup</h3>
                <p className="text-gray-300 mb-4">Complete access control system installation with electric locks and door hardware.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Site survey and planning</li>
                  <li>• Controller and reader installation</li>
                  <li>• Electric lock integration</li>
                  <li>• System testing and configuration</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Smartphone className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Software & Management</h3>
                <p className="text-gray-300 mb-4">User-friendly software for managing access permissions and monitoring entry logs.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• User management system</li>
                  <li>• Access level configuration</li>
                  <li>• Real-time monitoring</li>
                  <li>• Detailed access reports</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Wrench className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Maintenance & Support</h3>
                <p className="text-gray-300 mb-4">Regular maintenance and technical support to ensure reliable access control operation.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Preventive maintenance</li>
                  <li>• Software updates</li>
                  <li>• Emergency repair services</li>
                  <li>• Technical support</li>
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
                <h2 className="text-2xl font-bold text-white text-center mb-8">Get Your Access Control Quote</h2>
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
                      defaultService="door-access-controllers"
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
            <h2 className="text-3xl font-bold text-white mb-4">Secure Your Premises with Smart Access Control</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get advanced door access controllers with biometric and mobile access capabilities.
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