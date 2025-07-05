// src/app/boom-barriers/page.tsx/
'use client'

import React, { useState } from 'react'
import { Phone, MessageCircle, Menu, X, CheckCircle, Settings, Wrench, Zap, Camera, Shield, Clock, Star } from 'lucide-react'
import ContactForm from '../../components/ContactForm'
import Image from 'next/image'
import Footer from 'src/components/layout/Footer'

// Mock data for brands - later you can connect to Supabase
const brands = [
  {
    name: 'FAAC',
    description: 'Premium Italian brand with 50+ years of experience in automation',
    features: ['3-second opening speed', 'RFID integration', 'Weather resistant', 'LED lighting', 'Anti-crash system'],
    price_starting_from: 82600,
    is_popular: true,
    is_active: true
  },
  {
    name: 'Benica',
    description: 'Reliable and cost-effective barrier solutions for commercial use',
    features: ['Manual backup', 'Loop detector compatible', 'Adjustable speed', 'Anti-crash system', 'Local service support'],
    price_starting_from: 45000,
    is_popular: false,
    is_active: true
  },
  {
    name: 'Roger',
    description: 'High-speed barriers for intensive commercial and industrial use',
    features: ['High-speed operation', 'Heavy-duty motor', 'Traffic light integration', 'Remote monitoring', 'Industrial grade'],
    price_starting_from: 65000,
    is_popular: false,
    is_active: true
  },
  {
    name: 'Syrotech',
    description: 'Indian brand with excellent service network and spare parts availability',
    features: ['Local service support', 'Cost-effective parts', 'Customizable options', 'GSM integration', 'Easy maintenance'],
    price_starting_from: 35000,
    is_popular: false,
    is_active: true
  },
  {
    name: 'AGS',
    description: 'Robust barriers designed for heavy-duty industrial applications',
    features: ['Heavy-duty construction', 'Industrial grade', 'Explosion-proof options', 'Fail-safe operation', 'Corrosion resistant'],
    price_starting_from: 55000,
    is_popular: false,
    is_active: true
  }
]

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function BoomBarriersPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState('FAAC')

  const services = [
    {
      title: 'Sales & Installation',
      description: 'Complete installation with proper foundation and electrical connections',
      icon: <Settings className="w-8 h-8 text-pink-400" />,
      included: ['Site survey', 'Foundation work', 'Electrical installation', 'Testing & commissioning', '1-year warranty']
    },
    {
      title: 'Repair & Maintenance',
      description: '24/7 emergency repair and scheduled maintenance services',
      icon: <Wrench className="w-8 h-8 text-pink-400" />,
      included: ['Emergency repairs', 'Preventive maintenance', 'Spare parts supply', 'Annual contracts', 'Remote support']
    },
    {
      title: 'Upgrades & Integration',
      description: 'Upgrade existing systems with modern features and integrations',
      icon: <Zap className="w-8 h-8 text-pink-400" />,
      included: ['RFID integration', 'Mobile app control', 'CCTV integration', 'Access control', 'Payment systems']
    }
  ]

  const applications = [
    'Residential apartments and gated communities',
    'Corporate offices and IT parks',
    'Shopping malls and commercial complexes',
    'Hospitals and educational institutions',
    'Industrial facilities and warehouses',
    'Parking lots and toll plazas',
    'Government buildings and secured areas'
  ]

  const handleWhatsApp = () => {
    const message = `Hi, I need information about boom barriers in Hyderabad. Interested in ${selectedBrand} brand.`
    window.open(`https://wa.me/916302789421?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCall = () => {
    window.open('tel:+916302789421', '_self')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-white/10">
              <Image 
                src="/images/logo.png" 
                alt="Park Space Logo" 
                width={48}
                height={48}
                className="object-contain"
                priority
                onError={() => {
                  console.log('Logo failed to load from /images/logo.png')
                }}
              />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">PARK SPACE</h1>
              <p className="text-purple-300 text-sm">Automated Parking Solutions</p>
            </div>
          </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white hover:text-pink-400 transition-colors">Home</a>
              <a href="#brands" className="text-white hover:text-pink-400 transition-colors">Brands</a>
              <a href="#services" className="text-white hover:text-pink-400 transition-colors">Services</a>
              <a href="#quote" className="text-white hover:text-pink-400 transition-colors">Get Quote</a>
              <button
                onClick={handleCall}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold"
              >
                Call Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20">
              <div className="flex flex-col space-y-4 mt-4">
                <a href="/" className="text-white hover:text-pink-400 transition-colors">Home</a>
                <a href="#brands" className="text-white hover:text-pink-400 transition-colors">Brands</a>
                <a href="#services" className="text-white hover:text-pink-400 transition-colors">Services</a>
                <a href="#quote" className="text-white hover:text-pink-400 transition-colors">Get Quote</a>
                <button
                  onClick={handleCall}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold w-fit"
                >
                  Call Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Boom Barriers
                <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              <p className="text-xl text-purple-200 mb-8">
                Premium boom barrier systems from leading brands like FAAC, Benica, Roger, and more. Complete sales, installation, repair, and maintenance services in Hyderabad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>Get Free Quote</span>
                </button>
                <button
                  onClick={handleCall}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Phone size={20} />
                  <span>Call +91 63027 89421</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                <div className="text-6xl mb-4 text-center">🚧</div>
                <h3 className="text-2xl font-bold text-white text-center mb-4">Professional Installation</h3>
                <ul className="space-y-3 text-purple-200">
                  <li className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span>Site survey & consultation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span>Foundation & civil work</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span>Electrical connections</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span>Testing & commissioning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span>1-year warranty included</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Premium Brands We Deal With</h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Choose from top international and domestic brands with proven reliability and performance
            </p>
          </div>

          {/* Brand Selection Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {brands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedBrand === brand.name
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                } ${brand.is_popular ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {brand.name}
                {brand.is_popular && <span className="ml-2 text-yellow-400">★</span>}
              </button>
            ))}
          </div>

          {/* Selected Brand Details */}
          {brands.map((brand) => (
            selectedBrand === brand.name && (
              <div key={brand.name} className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="text-6xl">🏭</div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{brand.name}</h3>
                      <p className="text-purple-200">{brand.description}</p>
                      {brand.is_popular && (
                        <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold mt-2">
                          Most Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-pink-400 mb-6">
                    {formatPrice(brand.price_starting_from)} onwards
                  </div>
                  <ul className="space-y-3">
                    {brand.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3 text-purple-200">
                        <CheckCircle size={20} className="text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                  <h4 className="text-2xl font-bold text-white mb-6">Get {brand.name} Quote</h4>
                  <ContactForm />
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Complete Service Solutions</h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              From sales to installation, repair, and maintenance - we provide end-to-end boom barrier services
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/50 transition-all duration-300">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-purple-200 mb-6">{service.description}</p>
                <div className="space-y-3">
                  {service.included.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-3">
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-purple-200 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Applications & Use Cases</h2>
              <p className="text-purple-200 text-lg mb-8">
                Our boom barriers are perfect for various commercial, residential, and industrial applications across Hyderabad.
              </p>
              <div className="grid gap-4">
                {applications.map((app, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-purple-200">{app}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                <Camera size={40} className="text-pink-400 mb-4" />
                <h4 className="text-white font-bold mb-2">CCTV Integration</h4>
                <p className="text-purple-200 text-sm">Integrate with existing CCTV systems for complete security</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                <Shield size={40} className="text-pink-400 mb-4" />
                <h4 className="text-white font-bold mb-2">Access Control</h4>
                <p className="text-purple-200 text-sm">RFID cards, mobile apps, and remote control options</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                <Clock size={40} className="text-pink-400 mb-4" />
                <h4 className="text-white font-bold mb-2">24/7 Support</h4>
                <p className="text-purple-200 text-sm">Round-the-clock emergency repair and maintenance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20">
                <Star size={40} className="text-pink-400 mb-4" />
                <h4 className="text-white font-bold mb-2">Best Warranty</h4>
                <p className="text-purple-200 text-sm">Comprehensive warranty and annual maintenance contracts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="quote" className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Install Your Boom Barrier?</h2>
            <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
              Get a free site survey and detailed quote. We serve all areas of Hyderabad with professional installation and reliable after-sales service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>WhatsApp for Quick Response</span>
              </button>
              <button
                onClick={handleCall}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Call for Site Survey</span>
              </button>
            </div>
            <div className="mt-8 text-purple-200">
              <p>✓ Free site survey ✓ Competitive pricing ✓ Professional installation ✓ 1-year warranty</p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  )
}