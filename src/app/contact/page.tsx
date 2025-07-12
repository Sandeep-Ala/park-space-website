// src/app/contact/page.tsx
// Contact page for Park Space - Multiple contact methods and lead capture

import { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle, HeadphonesIcon } from 'lucide-react'
import LeadForm from '@/components/forms/LeadForm'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Contact Park Space - Get Quote for Parking Automation in Hyderabad',
  description: 'Contact Park Space for boom barriers, CCTV, biometric systems in Hyderabad. Call +91-98765-43210 or WhatsApp for instant quote. 24/7 support available.',
  keywords: 'contact Park Space, boom barriers quote Hyderabad, CCTV installation contact, parking automation Hyderabad phone number',
  canonical: '/contact'
})

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our experts',
      value: '+91 98765 43210',
      action: 'tel:+916302789421',
      actionText: 'Call Now',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Quick quotes and instant support',
      value: '+91 98765 43210',
      action: 'https://wa.me/916302789421?text=Hi%20Park%20Space,%20I%20need%20information%20about%20parking%20automation%20solutions.',
      actionText: 'WhatsApp',
      color: 'from-green-600 to-green-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Detailed inquiries and documentation',
      value: 'info@parkspace.com',
      action: 'mailto:info@parkspace.com?subject=Parking%20Automation%20Inquiry',
      actionText: 'Send Email',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      description: 'Emergency support and maintenance',
      value: '+91 98765 43211',
      action: 'tel:+919876543211',
      actionText: 'Support Line',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const workingHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 5:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 4:00 PM' },
    { day: 'Emergency Support', time: '24/7 Available' }
  ]

  const services = [
    'Boom Barriers Installation',
    'CCTV System Setup',
    'Biometric Attendance',
    'Door Access Control',
    'Fire & Alarm Systems',
    'Maintenance & AMC'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Park Space</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get expert consultation for your parking automation needs. Our team is ready to provide 
            customized solutions for boom barriers, CCTV, and security systems in Hyderabad.
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <Clock className="h-5 w-5" />
            <span className="text-lg">Available 24/7 for Emergency Support</span>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-gray-400">Choose your preferred way to reach us</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${method.color} rounded-full mb-4`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                <p className="text-purple-300 font-medium mb-4">{method.value}</p>
                <a 
                  href={method.action}
                  className={`inline-block px-6 py-2 bg-gradient-to-r ${method.color} text-white rounded-lg hover:opacity-90 transition-opacity`}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {method.actionText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Request a Quote</h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and our experts will contact you within 24 hours with a 
                customized solution and competitive pricing for your requirements.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <LeadForm 
                />
              </div>
            </div>

            {/* Company Information */}
            <div className="space-y-8">
              {/* Office Address */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Office Address</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Park Space Automation Solutions<br/>
                      Plot No. 123, Industrial Area<br/>
                      Kukatpally, Hyderabad - 500072<br/>
                      Telangana, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-4">Working Hours</h3>
                    <div className="space-y-3">
                      {workingHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-300">{schedule.day}</span>
                          <span className="text-purple-300 font-medium">{schedule.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Available */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Services Available</h3>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Emergency Support</h3>
                <p className="text-purple-100 mb-4">24/7 available for urgent repairs</p>
                <a 
                  href="tel:+919876543211"
                  className="inline-block px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  Call Emergency: +91 98765 43211
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp Support</h3>
                <p className="text-purple-100 mb-4">Instant quotes and quick replies</p>
                <a 
                  href="https://wa.me/916302789421?text=Hi%20Park%20Space,%20I%20need%20urgent%20support."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  WhatsApp Now
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                <p className="text-purple-100 mb-4">Detailed technical inquiries</p>
                <a 
                  href="mailto:support@parkspace.com"
                  className="inline-block px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  Email: support@parkspace.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Service Coverage Areas</h2>
          <p className="text-gray-300 mb-8">
            We provide installation and maintenance services across Hyderabad and surrounding areas
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Central Hyderabad</h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Banjara Hills</li>
                  <li>• Jubilee Hills</li>
                  <li>• Somajiguda</li>
                  <li>• Ameerpet</li>
                  <li>• Punjagutta</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">IT Corridor</h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Gachibowli</li>
                  <li>• Hitec City</li>
                  <li>• Madhapur</li>
                  <li>• Kondapur</li>
                  <li>• Miyapur</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Extended Areas</h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Secunderabad</li>
                  <li>• Kukatpally</li>
                  <li>• Uppal</li>
                  <li>• LB Nagar</li>
                  <li>• Shamshabad</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}