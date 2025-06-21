
// =============================================
// src/components/sections/Services.tsx
// =============================================
import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'

interface Service {
  id: string
  name: string
  slug: string
  icon: string
  shortDesc: string
  priceRange: string
}

interface ServicesProps {
  services?: Service[]
}

export default function Services({ services = SERVICES }: ServicesProps) {
  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
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
              className="card hover:transform hover:scale-105 group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h4 className="text-2xl font-bold text-white mb-3">{service.name}</h4>
              <p className="text-purple-200 mb-4">{service.shortDesc}</p>
              <div className="text-pink-400 font-semibold mb-4">{service.priceRange}</div>
              <Link
                href={`/${service.slug}`}
                className="flex items-center text-pink-400 hover:text-pink-300 transition-colors group-hover:translate-x-2 duration-300"
              >
                Learn More <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
