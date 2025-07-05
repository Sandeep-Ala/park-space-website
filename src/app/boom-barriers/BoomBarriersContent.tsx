
// =============================================
// src/app/boom-barriers/BoomBarriersContent.tsx
// =============================================
'use client'

import React, { useState } from 'react'
import { Phone, MessageCircle, CheckCircle, Settings, Wrench, Zap, Camera, Shield, Clock, Star } from 'lucide-react'
import LeadForm from '@/components/forms/LeadForm'
import { Service, Brand } from '@/types'
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

interface BoomBarriersContentProps {
  service: Service
  brands: Brand[]
}
  const [showLeadForm, setShowLeadForm] = useState(false)
export default function BoomBarriersContent({ service, brands }: BoomBarriersContentProps) {
  const [selectedBrand, setSelectedBrand] = useState(brands[0]?.name || 'FAAC')

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
    window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCall = () => {
    window.open(SOCIAL_LINKS.phone, '_self')
  }
  const handleLeadFormSuccess = (leadId: string) => {
    setShowLeadForm(false)
    // Optional: You can add success notification here
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Boom Barriers
                <span className="block gradient-text">Solutions</span>
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
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Phone size={20} />
                  <span>Call {COMPANY_INFO.phone}</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="card">
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
      <section id="brands" className="section-padding bg-black/30">
        <div className="container mx-auto">
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
                  {brand.price_starting_from && (
                    <div className="text-3xl font-bold text-pink-400 mb-6">
                      {formatPrice(brand.price_starting_from)} onwards
                    </div>
                  )}
                  <ul className="space-y-3">
                    {brand.features?.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3 text-purple-200">
                        <CheckCircle size={20} className="text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card">
                  <h4 className="text-2xl font-bold text-white mb-6">Get {brand.name} Quote</h4>
                  <LeadForm
                    defaultService="boom-barriers"
                    defaultSubService={brand.name}
                    onSuccess={handleLeadFormSuccess}
                  />
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Complete Service Solutions</h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              From sales to installation, repair, and maintenance - we provide end-to-end boom barrier services
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card">
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
      <section className="section-padding bg-black/30">
        <div className="container mx-auto">
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
              <div className="card">
                <Camera size={40} className="text-pink-400 mb-4" />
                <h4 className="text-white font-bold mb-2">CCTV Integration</h4>
                <p className="text-purple-200 text-sm">Integrate with existing CCTV systems for complete security</p>
              </div>
              <div className="card">
                <Shield size={40} className="text-pink-400 mb-4" />
                <h4 className="text-white font-bold mb-2">Access Control</h4>
                <p className="text-purple-200 text-sm">RFID cards, mobile apps, and remote control options</p>
              </div>
              <div className="card">
                <Clock size={40} className="text-pink-400 mb-4" />
                <h4 className="text-white font-bold mb-2">24/7 Support</h4>
                <p className="text-purple-200 text-sm">Round-the-clock emergency repair and maintenance</p>
              </div>
              <div className="card">
                <Star size={40} className="text-pink-400 mb-4" />
                <h4 className="text-white font-bold mb-2">Best Warranty</h4>
                <p className="text-purple-200 text-sm">Comprehensive warranty and annual maintenance contracts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="quote" className="section-padding">
        <div className="container mx-auto text-center">
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
                className="btn-primary flex items-center justify-center space-x-2"
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
    </>
  )
}
