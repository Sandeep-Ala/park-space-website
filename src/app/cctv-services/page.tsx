// =============================================
// src/app/cctv-services/page.tsx
// CCTV Services page with complete functionality
// =============================================
'use client'

import React, { useState } from 'react'
import { Shield, Eye, Monitor, Camera, Clock, Wrench, Users, Building, Car, Home, ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import LeadForm from '@/components/forms/LeadForm'
import WhatsAppFloat from '@/components/common/WhatsAppFloat'

const CCTV_BRANDS = [
  {
    id: 'hikvision',
    name: 'Hikvision',
    description: 'World leader in video surveillance products and solutions',
    features: [
      '4K Ultra HD Resolution',
      'AI-powered Analytics',
      'Night Vision Technology',
      'Cloud Storage Support',
      'Mobile App Access'
    ],
    priceRange: '₹3,000 - ₹25,000',
    isPopular: true
  },
  {
    id: 'dahua',
    name: 'Dahua',
    description: 'Advanced surveillance technology with smart features',
    features: [
      'Smart Motion Detection',
      'Two-way Audio',
      'Weather Resistant',
      'Remote Monitoring',
      'Easy Installation'
    ],
    priceRange: '₹2,500 - ₹20,000',
    isPopular: true
  },
  {
    id: 'cp-plus',
    name: 'CP Plus',
    description: 'Indian brand offering cost-effective security solutions',
    features: [
      'HD Resolution',
      'Infrared Night Vision',
      'Wide Dynamic Range',
      'Smart Phone Support',
      'Local Service Support'
    ],
    priceRange: '₹2,000 - ₹15,000',
    isPopular: false
  },
  {
    id: 'axis',
    name: 'Axis Communications',
    description: 'Premium network cameras with cutting-edge technology',
    features: [
      'Network Camera Technology',
      'Advanced Analytics',
      'Cybersecurity Features',
      'Edge Storage',
      'Professional Grade'
    ],
    priceRange: '₹8,000 - ₹50,000',
    isPopular: false
  },
  {
    id: 'samsung',
    name: 'Samsung Wisenet',
    description: 'Enterprise-grade surveillance with AI capabilities',
    features: [
      'AI Object Detection',
      'Facial Recognition',
      'License Plate Recognition',
      'Cloud Integration',
      'Enterprise Features'
    ],
    priceRange: '₹5,000 - ₹35,000',
    isPopular: false
  }
]

const APPLICATIONS = [
  { icon: Building, title: 'Office Buildings', description: 'Monitor office premises, entrances, and workspaces' },
  { icon: Home, title: 'Residential Complexes', description: 'Secure apartments, villas, and gated communities' },
  { icon: Car, title: 'Parking Areas', description: 'Surveillance for parking lots and vehicle security' },
  { icon: Users, title: 'Retail Stores', description: 'Monitor customer areas and prevent theft' },
  { icon: Shield, title: 'Industrial Sites', description: 'Heavy-duty surveillance for factories and warehouses' },
  { icon: Monitor, title: 'Educational Institutions', description: 'Campus security and student safety monitoring' },
  { icon: Eye, title: 'Healthcare Facilities', description: 'Patient safety and facility security' }
]

export default function CCTVServicesPage() {
  const [selectedBrand, setSelectedBrand] = useState(CCTV_BRANDS[0])
  const [showLeadForm, setShowLeadForm] = useState(false)

  const handleGetQuote = (brandName?: string) => {
    setShowLeadForm(true)
  }

  return (
    <>
      <Header />
      <WhatsAppFloat />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                CCTV <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Surveillance</span> Systems
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Professional CCTV installation and monitoring services in Hyderabad. Premium brands like Hikvision, Dahua, CP Plus with 24/7 support and maintenance.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  24/7 Monitoring
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  HD/4K Resolution
                </span>
                <span className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-purple-400" />
                  Remote Access
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-pink-400" />
                  Night Vision
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Selection */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your CCTV Brand</h2>
            
            {/* Brand Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {CCTV_BRANDS.map((brand) => (
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
                  <h4 className="text-lg font-semibold text-white mb-4">What's Included:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <Camera className="h-5 w-5 text-purple-400" />
                      Professional Installation
                    </li>
                    <li className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-blue-400" />
                      DVR/NVR Setup
                    </li>
                    <li className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-green-400" />
                      Mobile App Configuration
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-yellow-400" />
                      1 Year Warranty
                    </li>
                    <li className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-pink-400" />
                      Free Maintenance
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
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our CCTV Services</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Camera className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Installation & Setup</h3>
                <p className="text-gray-300 mb-4">Complete CCTV system installation with professional cable management and optimal camera positioning.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Site survey and planning</li>
                  <li>• Camera mounting and alignment</li>
                  <li>• DVR/NVR configuration</li>
                  <li>• Network setup and testing</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Wrench className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Maintenance & Repair</h3>
                <p className="text-gray-300 mb-4">Regular maintenance and quick repair services to ensure your CCTV system works perfectly.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Regular system health checks</li>
                  <li>• Camera cleaning and adjustment</li>
                  <li>• Software updates</li>
                  <li>• Emergency repair services</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Monitor className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Monitoring Solutions</h3>
                <p className="text-gray-300 mb-4">24/7 monitoring services with cloud storage and remote access capabilities.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• 24/7 monitoring center</li>
                  <li>• Cloud storage solutions</li>
                  <li>• Mobile app access</li>
                  <li>• Alert notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">CCTV Applications</h2>
            
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
          <section className="py-16 px-4 bg-white/5">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white text-center mb-8">Get Your CCTV Quote</h2>
                <div className="bg-white rounded-lg p-6">
                  <LeadForm
                    defaultService="cctv-services"
                    defaultSubService={selectedBrand.name}
                    onSuccess={() => setShowLeadForm(false)}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Secure Your Property?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get professional CCTV installation with premium brands and 24/7 support in Hyderabad.
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
                href={`tel:${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}`}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Call Now: +91 98765 43210
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}