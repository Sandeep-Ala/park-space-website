// src/app/about/page.tsx
// About Us page for Park Space - Company information and trust building

import { Metadata } from 'next'
import { Shield, Users, MapPin, Award, Clock, CheckCircle } from 'lucide-react'
import LeadForm from '@/components/forms/LeadForm'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'About Park Space - Leading Parking Automation Company in Hyderabad',
  description: 'Park Space is Hyderabad\'s trusted provider of automated parking solutions. 10+ years experience in boom barriers, CCTV, biometric systems. Expert installation & maintenance.',
  keywords: 'Park Space Hyderabad, parking automation company, boom barriers Hyderabad, CCTV installation Hyderabad, automated parking solutions',
  canonical: '/about'
})

export default function AboutPage() {
  const stats = [
    { number: '500+', label: 'Projects Completed', icon: CheckCircle },
    { number: '10+', label: 'Years Experience', icon: Clock },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '24/7', label: 'Support Available', icon: Shield }
  ]

  const services = [
    'Boom Barriers Installation',
    'CCTV Surveillance Systems', 
    'Biometric Attendance Systems',
    'Door Access Controllers',
    'Fire & Alarm Systems',
    'Networking Solutions'
  ]

  const certifications = [
    'Authorized FAAC Dealer',
    'Certified Security Systems Provider',
    'Government Approved Contractor',
    'ISO Quality Certified',
    'Trained Technical Team',
    'Warranty & AMC Support'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Park Space</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Leading provider of automated parking solutions in Hyderabad, specializing in boom barriers, 
            CCTV systems, and comprehensive security automation for businesses and residential complexes.
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">Serving Hyderabad, Telangana & Surrounding Areas</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Story & Mission
              </h2>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  Park Space was founded with a vision to revolutionize parking and security automation 
                  in Hyderabad. We specialize in providing cutting-edge automated parking solutions 
                  that enhance security, efficiency, and convenience for our clients.
                </p>
                <p>
                  With over a decade of experience in the security and automation industry, we have 
                  successfully completed 500+ projects across Hyderabad, serving businesses, 
                  residential complexes, hospitals, educational institutions, and government facilities.
                </p>
                <p>
                  Our mission is to make parking and security management effortless through innovative 
                  technology solutions, backed by exceptional customer service and technical expertise.
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Park Space?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Expert installation by certified technicians</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Authorized dealer of premium brands like FAAC, Hikvision</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">24/7 customer support and maintenance services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Competitive pricing with transparent quotes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Comprehensive warranty and AMC packages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Services
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive automation solutions for all your parking and security needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <CheckCircle className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{service}</h3>
                <p className="text-gray-400 text-sm">Professional installation and maintenance services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Certifications & Partnerships
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Authorized partnerships and certifications that ensure quality and reliability
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 text-center">
                <Award className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-16 px-4">
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
                  <li>• Hyderabad City</li>
                  <li>• Secunderabad</li>
                  <li>• Cyberabad</li>
                  <li>• Gachibowli</li>
                  <li>• Hitec City</li>
                  <li>• Madhapur</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Extended Coverage:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Ranga Reddy District</li>
                  <li>• Medchal-Malkajgiri</li>
                  <li>• Sangareddy</li>
                  <li>• Vikarabad</li>
                  <li>• Nizamabad</li>
                  <li>• Custom locations on request</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Automate Your Parking?
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Get a free consultation and quote for your parking automation needs. 
              Our experts will design the perfect solution for your requirements.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-3 text-purple-100">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-semibold">📞 Phone:</span>
                    <a href="tel:+919876543210" className="hover:text-white">
                      +91 98765 43210
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-semibold">📧 Email:</span>
                    <a href="mailto:info@parkspace.com" className="hover:text-white">
                      info@parkspace.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-semibold">📍 Location:</span>
                    <span>Hyderabad, Telangana</span>
                  </div>
                </div>
              </div>
              <div>
                <LeadForm 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}