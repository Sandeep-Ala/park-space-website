// File: src/app/page.tsx
// Enhanced Homepage with Restructured Layout and Service Images

'use client'

import React, { useState } from 'react'
import { Phone, MessageCircle, Menu, X, Shield, Wrench, Clock, Star, ChevronRight, MapPin, ArrowRight } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Enhanced services array with image paths and detailed information
const services = [
  {
    id: 'boom-barriers',
    name: 'Boom Barriers',
    image: '/images/services/boom-barriers.jpeg',
    shortDesc: 'Automated parking solutions with premium brands like FAAC, Benica, and Roger Technology',
    detailedDesc: 'Professional boom barrier installation with authorized dealer support for FAAC, Benica, Roger, Syrotech, and AGS brands. Complete automation solutions for parking management.',
    priceRange: '₹35,000 - ₹1,50,000',
    brands: ['FAAC', 'Benica', 'Roger Technology', 'Syrotech', 'AGS'],
    applications: ['Residential Complexes', 'Corporate Offices', 'Shopping Malls', 'Hospitals', 'Educational Institutions'],
    route: '/boom-barriers',
    isPrimary: true
  },
  {
    id: 'cctv-services',
    name: 'CCTV Surveillance',
    image: '/images/services/cctv-systems.jpeg',
    shortDesc: 'Complete surveillance systems with HD cameras from Hikvision, Dahua, and CP Plus',
    detailedDesc: 'Professional CCTV installation with premium brands including Hikvision, Dahua, CP Plus, Axis, and Samsung Wisenet. 24/7 monitoring and mobile app integration.',
    priceRange: '₹15,000 - ₹2,00,000',
    brands: ['Hikvision', 'Dahua', 'CP Plus', 'Axis', 'Samsung Wisenet'],
    applications: ['Office Buildings', 'Retail Stores', 'Warehouses', 'Residential Areas', 'Industrial Sites'],
    route: '/cctv-services'
  },
  {
    id: 'biometric-attendance',
    name: 'Biometric Attendance',
    image: '/images/services/biometric-systems.jpeg',
    shortDesc: 'Advanced time tracking and access systems with TIME WATCH and ESSL brands',
    detailedDesc: 'Comprehensive biometric attendance solutions featuring TIME WATCH, ESSL, Realtime, Matrix, and Suprema systems for accurate employee time tracking.',
    priceRange: '₹8,000 - ₹50,000',
    brands: ['TIME WATCH', 'ESSL', 'Realtime', 'Matrix', 'Suprema'],
    applications: ['Corporate Offices', 'Manufacturing Units', 'Educational Institutions', 'Healthcare', 'Government Offices'],
    route: '/biometric-attendance'
  },
  {
    id: 'door-access-controllers',
    name: 'Door Access Control',
    image: '/images/services/door-access-control.jpeg',
    shortDesc: 'Secure entry and access control systems with ZKTeco and Honeywell',
    detailedDesc: 'Advanced door access control systems featuring ZKTeco, Honeywell, and Hikvision Access brands for secure facility management.',
    priceRange: '₹12,000 - ₹80,000',
    brands: ['ZKTeco', 'Honeywell', 'Hikvision Access', 'Matrix', 'Suprema'],
    applications: ['Corporate Offices', 'Data Centers', 'Banks', 'Hotels', 'Residential Buildings'],
    route: '/door-access-controllers'
  },
  {
    id: 'flap-barriers',
    name: 'Flap Barriers',
    image: '/images/services/flap-barriers.jpeg',
    shortDesc: 'Pedestrian access control for offices & metro stations with PARK+ and BFT',
    detailedDesc: 'Professional flap barrier systems from PARK+ and BFT brands for pedestrian access control in high-traffic areas.',
    priceRange: '₹40,000 - ₹2,00,000',
    brands: ['PARK+', 'BFT', 'Magnetic', 'Turnstile', 'Security Plus'],
    applications: ['Metro Stations', 'Corporate Lobbies', 'Airports', 'Shopping Malls', 'Government Buildings'],
    route: '/flap-barriers'
  },
  {
    id: 'bollard-barriers',
    name: 'Bollard Barriers',
    image: '/images/services/bollard-barriers.jpeg',
    shortDesc: 'Heavy-duty vehicle access control systems for high-security areas',
    detailedDesc: 'Robust bollard barrier solutions for vehicle access control in high-security facilities and critical infrastructure.',
    priceRange: '₹80,000 - ₹5,00,000',
    brands: ['Magnetic', 'BFT', 'FAAC', 'Nice', 'Automatic Systems'],
    applications: ['Government Buildings', 'Embassies', 'Airports', 'Military Bases', 'Corporate Headquarters'],
    route: '/bollard-barriers'
  },
  {
    id: 'fire-alarm-systems',
    name: 'Fire & Alarm Systems',
    image: '/images/services/fire-alarm-systems.jpeg',
    shortDesc: 'Fire detection and safety systems for comprehensive facility protection',
    detailedDesc: 'Complete fire detection and alarm systems with advanced sensors and monitoring capabilities for facility safety.',
    priceRange: '₹15,000 - ₹2,50,000',
    brands: ['Honeywell', 'Siemens', 'Johnson Controls', 'Bosch', 'Hochiki'],
    applications: ['Office Buildings', 'Hospitals', 'Hotels', 'Industrial Facilities', 'Educational Institutions'],
    route: '/fire-alarm-systems'
  },
  {
    id: 'networking-systems',
    name: 'Networking Systems',
    image: '/images/services/networking-systems.jpeg',
    shortDesc: 'Complete IT infrastructure solutions for modern business connectivity',
    detailedDesc: 'Professional networking infrastructure setup including routers, switches, WiFi, and complete IT solutions.',
    priceRange: '₹5,000 - ₹1,50,000',
    brands: ['Cisco', 'D-Link', 'TP-Link', 'Ubiquiti', 'Netgear'],
    applications: ['Corporate Offices', 'Data Centers', 'Educational Institutions', 'Hotels', 'Retail Chains'],
    route: '/networking-systems'
  },
  {
    id: 'swing-gates',
    name: 'Swing Gates',
    image: '/images/services/swing-gates.jpeg',
    shortDesc: 'Automated swing gate systems for homes & offices with premium motors',
    detailedDesc: 'Automated swing gate solutions for residential and commercial properties with reliable motor systems.',
    priceRange: '₹22,000 - ₹1,50,000',
    brands: ['FAAC', 'BFT', 'Nice', 'Came', 'V2'],
    applications: ['Residential Villas', 'Corporate Offices', 'Industrial Gates', 'Community Entrances', 'Private Properties'],
    route: '/swing-gates'
  },
  {
    id: 'sliding-gate-motors',
    name: 'Sliding Gate Motors',
    image: '/images/services/sliding-gate-motors.jpg',
    shortDesc: 'Heavy-duty sliding gate automation systems for large installations',
    detailedDesc: 'Powerful sliding gate motor systems for heavy-duty applications with advanced safety features.',
    priceRange: '₹25,000 - ₹1,00,000',
    brands: ['FAAC', 'BFT', 'Nice', 'Came', 'Roger Technology'],
    applications: ['Industrial Facilities', 'Large Residential Complexes', 'Warehouses', 'Corporate Campuses', 'Government Buildings'],
    route: '/sliding-gate-motors'
  }
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in your automated parking solutions. Please provide more information."
    window.open(`https://wa.me/916302789421?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCall = () => {
    window.open('tel:+916302789421', '_self')
  }

  const handleServiceClick = (route: string, serviceName: string) => {
    // Track analytics if needed
    console.log(`Navigating to ${serviceName} service page`)
    router.push(route)
  }

  const handleServiceWhatsApp = (serviceName: string) => {
    const message = `Hi, I'm interested in your ${serviceName} services. Please provide more details and pricing information.`
    window.open(`https://wa.me/916302789421?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Hero Section - Centered Layout */}
      <section id="home" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Hero Content */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Automated Parking
              <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-4xl mx-auto">
              Complete sales, installation, and service solutions for boom barriers, CCTV systems, biometric attendance, and security systems in Hyderabad. Authorized dealers for premium brands with 24/7 support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Now</span>
              </button>
              <button
                onClick={handleCall}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Phone size={20} />
                <span>Call +91 63027 89421</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced with Images */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Complete Service Portfolio</h2>
            <p className="text-purple-200 text-lg max-w-3xl mx-auto">
              From boom barriers to fire safety systems - we provide complete automation solutions with premium brands and exceptional service support across Hyderabad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer ${
                  service.isPrimary 
                    ? 'border-pink-500/50 ring-2 ring-pink-500/20' 
                    : 'border-purple-500/20 hover:border-pink-500/50'
                }`}
                onClick={() => handleServiceClick(service.route, service.name)}
              >
                {/* Service Image */}
                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {service.isPrimary && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Service Content */}
                <h3 className="text-xl font-bold text-white mb-3">{service.name}</h3>
                <p className="text-purple-200 mb-4 text-sm leading-relaxed">{service.shortDesc}</p>
                
                {/* Brands */}
                <div className="mb-4">
                  <p className="text-xs text-purple-300 mb-2">Brands: {service.brands.slice(0, 3).join(', ')}</p>
                </div>

                {/* Price Range */}
                <div className="text-pink-400 font-semibold mb-4 text-sm">{service.priceRange}</div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleServiceClick(service.route, service.name)
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm py-2 px-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleServiceWhatsApp(service.name)
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-300"
                  >
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional CTA after services */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Need Custom Solutions?</h3>
              <p className="text-purple-200 mb-6">
                We provide tailored automation solutions for unique requirements. Get expert consultation for your specific needs with our experienced technical team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={18} />
                  <span>Discuss Requirements</span>
                </button>
                <button
                  onClick={handleCall}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Phone size={18} />
                  <span>Get Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Get Your Free Quote</h2>
            <p className="text-purple-200 text-lg">
              Tell us about your requirements and get a detailed quote within 24 hours
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Park Space?</h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              We don't just sell products - we provide complete solutions with ongoing support and authorized dealer warranties
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-pink-400" />,
                title: "Authorized Dealers",
                description: "Official partnerships with FAAC, Hikvision, TIME WATCH, and other premium brands"
              },
              {
                icon: <Wrench className="w-8 h-8 text-pink-400" />,
                title: "Complete Service",
                description: "Sales, installation, repair, and annual maintenance contracts with trained technicians"
              },
              {
                icon: <Clock className="w-8 h-8 text-pink-400" />,
                title: "24/7 Support",
                description: "Emergency support and fast service response across Hyderabad and surrounding areas"
              },
              {
                icon: <Star className="w-8 h-8 text-pink-400" />,
                title: "Best Pricing",
                description: "Competitive prices in Hyderabad with genuine products and manufacturer warranties"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-purple-200 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <MapPin className="h-12 w-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Service Coverage Area</h2>
            <p className="text-gray-300 mb-6">
              We proudly serve clients across Hyderabad and surrounding areas in Telangana state.
              Our local presence ensures quick response times and personalized service.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Primary Service Areas:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Hyderabad City & Secunderabad</li>
                  <li>• Cyberabad & Gachibowli</li>
                  <li>• Hitec City & Madhapur</li>
                  <li>• Kukatpally & Miyapur</li>
                  <li>• Begumpet & Ameerpet</li>
                  <li>• LB Nagar & Dilsukhnagar</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Extended Coverage:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Ranga Reddy District</li>
                  <li>• Medchal-Malkajgiri</li>
                  <li>• Sangareddy & Vikarabad</li>
                  <li>• Nizamabad & Karimnagar</li>
                  <li>• Warangal & Khammam</li>
                  <li>• Custom locations on request</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Automate Your Facility?</h2>
            <p className="text-purple-200 text-lg mb-8">
              Get a free consultation and quote for your automation needs. We serve all of Hyderabad with quick installation and reliable service support from authorized technicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <MessageCircle size={20} />
                <span>Get Free Quote</span>
              </button>
              <button
                onClick={handleCall}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Phone size={20} />
                <span>Call for Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </section>

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