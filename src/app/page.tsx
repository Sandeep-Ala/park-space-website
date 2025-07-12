// File: src/app/page.tsx
// Updated Homepage with All 10 Services and Proper Routing

'use client'

import React, { useState } from 'react'
import { Phone, MessageCircle, Menu, X, Shield, Wrench, Clock, Star, ChevronRight } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Complete services array with all 10 services
const services = [
  {
    id: 'boom-barriers',
    name: 'Boom Barriers',
    icon: '🚧',
    shortDesc: 'Automated parking solutions with premium brands',
    priceRange: '₹35,000 - ₹1,50,000',
    route: '/boom-barriers'
  },
  {
    id: 'cctv-services',
    name: 'CCTV Services',
    icon: '📹',
    shortDesc: 'Complete surveillance systems with HD cameras',
    priceRange: '₹15,000 - ₹2,00,000',
    route: '/cctv-services'
  },
  {
    id: 'biometric-attendance',
    name: 'Biometric Attendance',
    icon: '👆',
    shortDesc: 'Advanced time tracking and access systems',
    priceRange: '₹8,000 - ₹50,000',
    route: '/biometric-attendance'
  },
  {
    id: 'door-access-controllers',
    name: 'Door Access Controllers',
    icon: '🚪',
    shortDesc: 'Secure entry and access control systems',
    priceRange: '₹12,000 - ₹80,000',
    route: '/door-access-controllers'
  },
  {
    id: 'flap-barriers',
    name: 'Flap Barriers',
    icon: '⚡',
    shortDesc: 'Pedestrian access control for offices & metros',
    priceRange: '₹40,000 - ₹2,00,000',
    route: '/flap-barriers'
  },
  {
    id: 'bollard-barriers',
    name: 'Bollard Barriers',
    icon: '🛡️',
    shortDesc: 'Heavy-duty vehicle access control systems',
    priceRange: '₹80,000 - ₹5,00,000',
    route: '/bollard-barriers'
  },
  {
    id: 'fire-alarm-systems',
    name: 'Fire & Alarm Systems',
    icon: '🔥',
    shortDesc: 'Fire detection and safety systems',
    priceRange: '₹15,000 - ₹2,50,000',
    route: '/fire-alarm-systems'
  },
  {
    id: 'networking-systems',
    name: 'Networking Systems',
    icon: '🌐',
    shortDesc: 'Complete IT infrastructure solutions',
    priceRange: '₹5,000 - ₹1,50,000',
    route: '/networking-systems'
  },
  {
    id: 'swing-gates',
    name: 'Swing Gates',
    icon: '🔄',
    shortDesc: 'Automated swing gate systems for homes & offices',
    priceRange: '₹22,000 - ₹1,50,000',
    route: '/swing-gates'
  },
  {
    id: 'sliding-gate-motors',
    name: 'Sliding Gate Motors',
    icon: '⚙️',
    shortDesc: 'Heavy-duty sliding gate automation systems',
    priceRange: '₹25,000 - ₹1,00,000',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Automated Parking
                <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h2>
              <p className="text-xl text-purple-200 mb-8">
                Complete sales, installation, and service solutions for boom barriers, CCTV systems, biometric attendance, and security systems in Hyderabad
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp Now</span>
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

            {/* Right Side - Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Our Complete Service Portfolio</h3>
            <p className="text-purple-200 text-lg max-w-3xl mx-auto">
              From boom barriers to fire safety systems - we provide complete automation solutions with premium brands and exceptional service support across Hyderabad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer"
                onClick={() => handleServiceClick(service.route, service.name)}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">{service.name}</h4>
                <p className="text-purple-200 mb-4 text-sm">{service.shortDesc}</p>
                <div className="text-pink-400 font-semibold mb-4 text-sm">{service.priceRange}</div>
                <div className="flex items-center text-pink-400 hover:text-pink-300 transition-colors group-hover:translate-x-2 duration-300">
                  Learn More <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Additional CTA after services */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30">
              <h4 className="text-2xl font-bold text-white mb-4">Need Custom Solutions?</h4>
              <p className="text-purple-200 mb-6">
                We provide tailored automation solutions for unique requirements. Get expert consultation for your specific needs.
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

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Why Choose Park Space?</h3>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              We don't just sell products - we provide complete solutions with ongoing support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-pink-400" />,
                title: "Best Quality",
                description: "Premium brands and components with proven reliability"
              },
              {
                icon: <Wrench className="w-8 h-8 text-pink-400" />,
                title: "Complete Service",
                description: "Sales, installation, repair, and annual maintenance contracts"
              },
              {
                icon: <Clock className="w-8 h-8 text-pink-400" />,
                title: "Quick Response",
                description: "24/7 emergency support and fast service response"
              },
              {
                icon: <Star className="w-8 h-8 text-pink-400" />,
                title: "Competitive Pricing",
                description: "Best prices in Hyderabad with no compromise on quality"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-purple-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Service Areas in Hyderabad</h3>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              We provide installation and service across all major areas of Hyderabad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Gachibowli', 'Hitec City', 'Madhapur', 'Kukatpally',
              'Secunderabad', 'Kondapur', 'Begumpet', 'Banjara Hills',
              'Jubilee Hills', 'Miyapur', 'Uppal', 'LB Nagar'
            ].map((area, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-purple-500/20 text-center hover:border-pink-500/50 transition-all duration-300"
              >
                <h5 className="text-white font-semibold">{area}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Automate Your Facility?</h3>
            <p className="text-purple-200 text-lg mb-8">
              Get a free consultation and quote for your automation needs. We serve all of Hyderabad with quick installation and reliable service support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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