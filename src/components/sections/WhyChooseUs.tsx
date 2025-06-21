
// =============================================
// src/components/sections/WhyChooseUs.tsx
// =============================================
import React from 'react'
import { Shield, Wrench, Clock, Star } from 'lucide-react'

const reasons = [
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
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-white mb-4">Why Choose Park Space?</h3>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            We don't just sell products - we provide complete solutions with ongoing support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, index) => (
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
  )
}