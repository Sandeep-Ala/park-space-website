// File: /src/app/fire-alarm-systems/page.tsx
// Fire & Alarm Systems Service Page - 3rd Priority

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Building2, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Bell,
  Flame
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Brand data for Fire & Alarm Systems
const fireAlarmBrands = [
  {
    id: 'honeywell',
    name: 'Honeywell',
    logo: '/images/brands/honeywell-logo.png',
    featured: true,
    priceRange: '₹25,000 - ₹2,00,000',
    description: 'World-leading fire safety technology with intelligent detection and advanced notification systems.',
    features: [
      'Intelligent fire detection',
      'Addressable system technology',
      'Multi-criteria detection',
      'Voice evacuation capability',
      'Remote monitoring ready',
      'Easy maintenance access',
      'Integration with building systems',
      'Compliant with Indian standards'
    ],
    specifications: {
      'Detection Type': 'Smoke, Heat, CO, Multi-sensor',
      'System Capacity': '1-3200 addressable points',
      'Response Time': '10-30 seconds',
      'Communication': 'RS485, Ethernet, Wireless',
      'Power Supply': '220V AC with backup',
      'Operating Temperature': '-10°C to +55°C',
      'Compliance': 'IS 2189, EN54 certified',
      'Warranty': '3 Years Comprehensive'
    },
    applications: ['Corporate Offices', 'Hospitals', 'Hotels', 'Manufacturing']
  },
  {
    id: 'siemens',
    name: 'Siemens',
    logo: '/images/brands/siemens-logo.png',
    featured: true,
    priceRange: '₹30,000 - ₹2,50,000',
    description: 'German engineering excellence in fire safety with cutting-edge detection algorithms.',
    features: [
      'Advanced smoke algorithms',
      'Wireless system options',
      'Building automation integration',
      'Predictive maintenance',
      'Mobile monitoring apps',
      'Cloud connectivity',
      'Multi-language support',
      'Scalable architecture'
    ],
    specifications: {
      'Detection Type': 'ASA, Multi-sensor, Beam',
      'System Capacity': '1-6300 addressable points',
      'Response Time': '5-25 seconds',
      'Communication': 'Ethernet, BACnet, Wireless',
      'Power Supply': '220V AC, 24V DC backup',
      'Operating Temperature': '-20°C to +60°C',
      'Compliance': 'VdS, EN54, IS standards',
      'Warranty': '2 Years + Extended'
    },
    applications: ['High-rise Buildings', 'Industrial Plants', 'Data Centers', 'Infrastructure']
  },
  {
    id: 'johnson-controls',
    name: 'Johnson Controls',
    logo: '/images/brands/johnson-controls-logo.png',
    featured: false,
    priceRange: '₹20,000 - ₹1,80,000',
    description: 'Comprehensive fire protection solutions with integrated building safety systems.',
    features: [
      'Integrated safety solutions',
      'Conventional & addressable',
      'Mass notification systems',
      'Emergency communication',
      'Central monitoring capability',
      'Energy-efficient operation',
      'User-friendly interfaces',
      'Flexible system design'
    ],
    specifications: {
      'Detection Type': 'Smoke, Heat, Flame, Gas',
      'System Capacity': '1-1600 addressable points',
      'Response Time': '15-30 seconds',
      'Communication': 'RS485, ModBus, IP',
      'Power Supply': '220V AC with UPS',
      'Operating Temperature': '-5°C to +50°C',
      'Compliance': 'UL, FM, IS certified',
      'Warranty': '2 Years Parts & Service'
    },
    applications: ['Educational Institutions', 'Retail Spaces', 'Residential Buildings', 'Warehouses']
  },
  {
    id: 'notifier',
    name: 'Notifier',
    logo: '/images/brands/notifier-logo.png',
    featured: false,
    priceRange: '₹18,000 - ₹1,50,000',
    description: 'Reliable fire alarm systems with proven performance in critical applications.',
    features: [
      'Proven reliability',
      'Advanced graphics display',
      'Network capability',
      'Smoke control integration',
      'Easy programming',
      'Comprehensive reporting',
      'Multi-protocol support',
      'Cost-effective solutions'
    ],
    specifications: {
      'Detection Type': 'Photoelectric, Ionization, Heat',
      'System Capacity': '1-1200 addressable points',
      'Response Time': '10-40 seconds',
      'Communication': 'RS232/485, Ethernet',
      'Power Supply': '220V AC, battery backup',
      'Operating Temperature': '0°C to +45°C',
      'Compliance': 'UL, EN54, local standards',
      'Warranty': '2 Years Standard'
    },
    applications: ['Small-Medium Offices', 'Schools', 'Healthcare Clinics', 'Retail Stores']
  },
  {
    id: 'edwards',
    name: 'Edwards',
    logo: '/images/brands/edwards-logo.png',
    featured: false,
    priceRange: '₹15,000 - ₹1,20,000',
    description: 'Innovative fire detection technology with focus on reducing false alarms.',
    features: [
      'False alarm reduction',
      'Intelligent sensors',
      'Easy installation',
      'Flexible programming',
      'Standard protocols',
      'Local support available',
      'Basic integration options',
      'Reliable performance'
    ],
    specifications: {
      'Detection Type': 'Optical, Heat, Combined',
      'System Capacity': '1-800 addressable points',
      'Response Time': '20-45 seconds',
      'Communication': 'RS485, Basic IP',
      'Power Supply': '220V AC, 12V backup',
      'Operating Temperature': '5°C to +40°C',
      'Compliance': 'CE, EN54, IS basic',
      'Warranty': '1 Year + Extended Options'
    },
    applications: ['Small Buildings', 'Residential Complexes', 'Local Businesses', 'Basic Applications']
  }
];

// Service applications for Fire & Alarm Systems
const serviceApplications = [
  {
    title: 'Commercial Buildings',
    description: 'Comprehensive fire protection for office and business environments',
    icon: Building2,
    features: ['Multi-zone detection', 'Evacuation systems', 'Central monitoring', 'Emergency lighting']
  },
  {
    title: 'Healthcare Facilities',
    description: 'Specialized fire safety for hospitals and medical centers',
    icon: Shield,
    features: ['Patient safety protocols', 'Medical gas monitoring', 'Area-specific detection', 'Emergency communication']
  },
  {
    title: 'Educational Institutions',
    description: 'Student and staff safety with comprehensive coverage',
    icon: Bell,
    features: ['Mass notification', 'Evacuation planning', 'Dormitory protection', 'Laboratory safety']
  },
  {
    title: 'Industrial Facilities',
    description: 'Heavy-duty fire protection for manufacturing environments',
    icon: Flame,
    features: ['Hazardous area detection', 'Process monitoring', 'Suppression integration', 'Equipment protection']
  },
  {
    title: 'Residential Buildings',
    description: 'Family safety with residential fire alarm solutions',
    icon: Building2,
    features: ['Apartment monitoring', 'Common area coverage', 'Individual unit alerts', 'Emergency services notification']
  },
  {
    title: 'Hotels & Hospitality',
    description: 'Guest safety with advanced fire detection systems',
    icon: Star,
    features: ['Guest room monitoring', 'Kitchen fire protection', 'Public area coverage', 'Staff notification']
  },
  {
    title: 'Data Centers',
    description: 'Critical infrastructure protection with early detection',
    icon: Zap,
    features: ['Very early detection', 'Clean agent ready', 'Equipment monitoring', 'Business continuity']
  }
];

export default function FireAlarmSystemsPage() {
  const [selectedBrand, setSelectedBrand] = useState(fireAlarmBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof fireAlarmBrands[0]) => {
    setSelectedBrand(brand);

  };

  const handleCTAClick = (action: string) => {
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} Fire & Alarm Systems. Price range: ${selectedBrand.priceRange}. Please provide more details.`;
      window.open(`https://wa.me/916302789421?text=${encodeURIComponent(message)}`, '_blank');
    } else if (action === 'call') {
      window.open('tel:+916302789421', '_self');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-white-900 mb-6">
                Fire & Alarm Systems in
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Advanced fire detection and alarm systems for complete life safety protection. 
                Intelligent fire safety solutions with early detection and emergency response capabilities.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Early Detection</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">IS 2189 Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">24/7 Monitoring</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleCTAClick('get_quote')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Free Quote
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCTAClick('whatsapp')}
                  className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative  rounded-3xl p-8 shadow-2xl">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ₹15K - ₹2.5L
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl  p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white-900 mb-4">Premium Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Intelligent Detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Voice Evacuation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Remote Monitoring</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Emergency Response</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-white-900">Life Safety Certified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Selection Tabs */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Premium Fire Safety Brands
            </h2>
            <p className="text-xl text-purple-600">
              World-class fire detection systems with proven reliability and compliance
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {fireAlarmBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleBrandSelect(brand)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedBrand.id === brand.id
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                {brand.name}
                {brand.featured && (
                  <span className="ml-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Selected Brand Details */}
          <motion.div
            key={selectedBrand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-700/50 to-purple-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-purple-500/30"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">{selectedBrand.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedBrand.name}</h3>
                    <p className="text-xl text-purple-200 font-semibold">{selectedBrand.priceRange}</p>
                  </div>
                </div>
                
                <p className="text-purple-100 mb-6 leading-relaxed">{selectedBrand.description}</p>
                
                <div className="space-y-3 mb-8">
                  {selectedBrand.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-300 flex-shrink-0" />
                      <span className="text-purple-100">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleCTAClick('get_quote')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Get Quote for {selectedBrand.name}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleCTAClick('call')}
                    className="border-2 border-purple-300 text-purple-200 px-6 py-3 rounded-xl font-semibold hover:bg-purple-700/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </button>
                </div>
              </div>

              <div>
                <div className="bg-purple-400/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg space-y-4 border border-purple-500/30">
                <h4 className="text-2xl font-bold text-white mb-6">Technical Specifications</h4>

                  {Object.entries(selectedBrand.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-purple-500/30 last:border-b-0">
                      <span className="font-medium text-purple-200">{key}:</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h5 className="text-lg font-bold text-white mb-3">Ideal Applications</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrand.applications.map((app, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-purple-100 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Applications */}
      <section className="py-16 bg-gradient-to-br from-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
               Fire Safety Applications
            </h2>
            <p className="text-xl text-purple-100">
              Comprehensive fire protection solutions for various building types and industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {serviceApplications.map((application, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-purple-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/30"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <application.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{application.title}</h3>
                <p className="text-purple-100 mb-4 text-sm">{application.description}</p>
                <div className="space-y-2">
                  {application.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 bg-purple-300 rounded-full"></div>
                      <span className="text-sm text-purple-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Protect Lives with Advanced Fire Safety
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get expert fire safety consultation and certified system installation in Hyderabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCTAClick('get_quote')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Free Consultation
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleCTAClick('whatsapp')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Now
            </button>
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-purple-500/50 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Get Quote</h3>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-purple-100 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <LeadForm
              defaultService="fire-alarm-systems"
              defaultSubService={selectedBrand.name}
              onSuccess={() => {
                setIsFormVisible(false);

              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}