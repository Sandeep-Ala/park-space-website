'use client'

import React, { useState } from 'react'
import { Phone, MessageCircle, Menu, X, Shield, Wrench, Clock, Star, ChevronRight } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import Image from 'next/image'
// import Footer from 'src/components/layout/Footer'
const services = [
  {
    id: 'boom-barriers',
    name: 'Boom Barriers',
    icon: '🚧',
    shortDesc: 'Automated parking solutions with premium brands',
    priceRange: '₹35,000 - ₹1,50,000'
  },
  {
    id: 'cctv-services',
    name: 'CCTV Services',
    icon: '📹',
    shortDesc: 'Complete surveillance systems',
    priceRange: '₹15,000 - ₹2,00,000'
  },
  {
    id: 'biometric-attendance',
    name: 'Biometric Attendance',
    icon: '👆',
    shortDesc: 'Advanced time tracking systems',
    priceRange: '₹8,000 - ₹50,000'
  },
  {
    id: 'door-access-controllers',
    name: 'Door Access Controllers',
    icon: '🚪',
    shortDesc: 'Secure entry systems',
    priceRange: '₹12,000 - ₹80,000'
  },
  {
    id: 'fire-alarm-systems',
    name: 'Fire & Alarm Systems',
    icon: '🔥',
    shortDesc: 'Fire detection and safety',
    priceRange: '₹20,000 - ₹3,00,000'
  },
  {
    id: 'networking-systems',
    name: 'Networking Systems',
    icon: '🌐',
    shortDesc: 'Complete IT infrastructure',
    priceRange: '₹10,000 - ₹1,50,000'
  }
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in your automated parking solutions. Please provide more information."
    window.open(`https://wa.me/916302789421?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleCall = () => {
    window.open('tel:+916302789421', '_self')
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
            <h3 className="text-4xl font-bold text-white mb-4">Our Services</h3>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Complete automation solutions with premium brands and exceptional service support
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="text-2xl font-bold text-white mb-3">{service.name}</h4>
                <p className="text-purple-200 mb-4">{service.shortDesc}</p>
                <div className="text-pink-400 font-semibold mb-4">{service.priceRange}</div>
                {service.id === 'boom-barriers' ? (
                  <a
                    href="/boom-barriers"
                    className="flex items-center text-pink-400 hover:text-pink-300 transition-colors group-hover:translate-x-2 duration-300"
                  >
                    Learn More <ChevronRight size={16} className="ml-1" />
                  </a>
                ) : (
                  <button className="flex items-center text-pink-400 hover:text-pink-300 transition-colors group-hover:translate-x-2 duration-300">
                    Learn More <ChevronRight size={16} className="ml-1" />
                  </button>
                )}
              </div>
            ))}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-purple-500/30">
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Automate Your Parking?</h3>
            <p className="text-purple-200 text-lg mb-8">
              Get a free consultation and quote for your parking automation needs. We serve all of Hyderabad with quick installation and reliable service.
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
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  )
}