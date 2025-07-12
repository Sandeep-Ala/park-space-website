// File: /src/app/flap-barriers/page.tsx
// Flap Barriers Service Page - Priority #1 - Corrected Theme

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Users, 
  Building2, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Lock
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Brand data for Flap Barriers
const flapBarrierBrands = [
  {
    id: 'park-plus',
    name: 'PARK+',
    logo: '/images/brands/park-plus-logo.png',
    featured: true,
    priceRange: '₹45,000 - ₹1,20,000',
    description: 'Premium pedestrian access control systems with advanced security features and sleek design.',
    features: [
      'Bi-directional access control',
      'RFID card reader integration',
      'Anti-tailgating technology',
      'Emergency break-away',
      'LED status indicators',
      'Weather-resistant design',
      'Remote monitoring capability',
      'Customizable access levels'
    ],
    specifications: {
      'Passage Width': '550mm - 900mm',
      'Throughput': '25-30 persons/minute',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-20°C to +70°C',
      'Material': 'Stainless Steel 304',
      'Integration': 'Access Control Systems',
      'Warranty': '2 Years Comprehensive'
    },
    applications: ['Corporate Offices', 'Metro Stations', 'Airports', 'Shopping Malls']
  },
  {
    id: 'bft',
    name: 'BFT',
    logo: '/images/brands/bft-logo.png',
    featured: true,
    priceRange: '₹60,000 - ₹1,80,000',
    description: 'Italian engineering excellence in pedestrian access control with robust performance.',
    features: [
      'European quality standards',
      'Advanced sensor technology',
      'Multi-card compatibility',
      'Fail-safe operation',
      'Glass panel options',
      'Integrated fire alarm interface',
      'Energy-efficient operation',
      'Modular design flexibility'
    ],
    specifications: {
      'Passage Width': '600mm - 950mm',
      'Throughput': '30-35 persons/minute',
      'Power Supply': '230V AC, 50/60Hz',
      'Operating Temperature': '-25°C to +70°C',
      'Material': 'Brushed Stainless Steel',
      'Integration': 'Multiple Access Systems',
      'Warranty': '3 Years Parts & Service'
    },
    applications: ['Business Centers', 'Government Buildings', 'Educational Institutions', 'Hospitals']
  },
  {
    id: 'gunnebo',
    name: 'Gunnebo',
    logo: '/images/brands/gunnebo-logo.png',
    featured: false,
    priceRange: '₹80,000 - ₹2,00,000',
    description: 'Swedish security technology leader providing high-security pedestrian entrance solutions.',
    features: [
      'High-security applications',
      'Biometric integration ready',
      'Vandal-resistant design',
      'Emergency evacuation mode',
      'Real-time monitoring',
      'Tamper detection',
      'Multiple authentication methods',
      'Scalable architecture'
    ],
    specifications: {
      'Passage Width': '550mm - 900mm',
      'Throughput': '20-25 persons/minute',
      'Power Supply': '220-240V AC',
      'Operating Temperature': '-30°C to +60°C',
      'Material': 'Hardened Steel Construction',
      'Integration': 'Enterprise Security Systems',
      'Warranty': '2 Years + Extended Options'
    },
    applications: ['Data Centers', 'Banks', 'High-Security Facilities', 'Research Centers']
  },
  {
    id: 'boon-edam',
    name: 'Boon Edam',
    logo: '/images/brands/boon-edam-logo.png',
    featured: false,
    priceRange: '₹70,000 - ₹1,90,000',
    description: 'Dutch innovation in entrance solutions with focus on security and user experience.',
    features: [
      'Innovative entrance solutions',
      'Smart detection systems',
      'Aesthetic design options',
      'Energy-saving features',
      'Maintenance-friendly',
      'Custom configurations',
      'Integration flexibility',
      'User-friendly operation'
    ],
    specifications: {
      'Passage Width': '600mm - 1000mm',
      'Throughput': '25-30 persons/minute',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-20°C to +65°C',
      'Material': 'Premium Stainless Steel',
      'Integration': 'Modern Access Control',
      'Warranty': '2 Years Comprehensive'
    },
    applications: ['Office Buildings', 'Retail Centers', 'Transport Hubs', 'Mixed-Use Developments']
  },
  {
    id: 'automatic-systems',
    name: 'Automatic Systems',
    logo: '/images/brands/automatic-systems-logo.png',
    featured: false,
    priceRange: '₹55,000 - ₹1,50,000',
    description: 'Belgian expertise in pedestrian entrance control with reliable and efficient solutions.',
    features: [
      'Proven reliability',
      'Cost-effective solutions',
      'Easy maintenance',
      'Flexible configurations',
      'Safety compliance',
      'Quick installation',
      'Standard integrations',
      'Local support available'
    ],
    specifications: {
      'Passage Width': '550mm - 900mm',
      'Throughput': '20-25 persons/minute',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-15°C to +55°C',
      'Material': 'Stainless Steel',
      'Integration': 'Standard Access Systems',
      'Warranty': '1 Year + Extended Options'
    },
    applications: ['Small Offices', 'Residential Buildings', 'Educational Facilities', 'Community Centers']
  }
];

// Service applications for Flap Barriers
const serviceApplications = [
  {
    title: 'Corporate Offices',
    description: 'Secure employee access control with professional aesthetics',
    icon: Building2,
    features: ['Employee tracking', 'Visitor management', 'Time attendance', 'Multi-level access']
  },
  {
    title: 'Metro Stations & Transport',
    description: 'High-throughput pedestrian flow management',
    icon: Users,
    features: ['Fare collection integration', 'Crowd control', 'Emergency evacuation', 'Real-time monitoring']
  },
  {
    title: 'Shopping Malls',
    description: 'Customer flow control with retail integration',
    icon: Shield,
    features: ['Customer analytics', 'Security zones', 'VIP access', 'Emergency protocols']
  },
  {
    title: 'Residential Complexes',
    description: 'Resident and visitor access management',
    icon: Lock,
    features: ['Resident cards', 'Visitor registration', 'Delivery access', '24/7 monitoring']
  },
  {
    title: 'Educational Institutions',
    description: 'Student and staff access with safety features',
    icon: Users,
    features: ['Student ID integration', 'Parent notifications', 'Emergency lockdown', 'Attendance tracking']
  },
  {
    title: 'Healthcare Facilities',
    description: 'Secure access for patients and medical staff',
    icon: Shield,
    features: ['Patient privacy', 'Staff access levels', 'Emergency access', 'Hygiene compliance']
  },
  {
    title: 'Government Buildings',
    description: 'High-security access for government facilities',
    icon: Building2,
    features: ['Security clearance', 'Audit trails', 'Biometric integration', 'Visitor screening']
  }
];

export default function FlapBarriersPage() {
  const [selectedBrand, setSelectedBrand] = useState(flapBarrierBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof flapBarrierBrands[0]) => {
    setSelectedBrand(brand);
    trackEvent('brand_selection', {
      service: 'flap-barriers',
      brand: brand.name
    });
  };

  const handleCTAClick = (action: string) => {
    trackEvent('cta_click', {
      service: 'flap-barriers',
      action,
      brand: selectedBrand.name
    });
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} Flap Barriers. Price range: ${selectedBrand.priceRange}. Please provide more details.`;
      window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
    } else if (action === 'call') {
      window.open('tel:+919876543210', '_self');
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
                Flap Barriers in
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Premium pedestrian access control systems for offices, metro stations, and high-security facilities. 
                Advanced flap barrier solutions with smart integration capabilities.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">25-35 persons/minute</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Anti-tailgating</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Bi-directional</span>
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
                  ₹40K - ₹2L
              </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl  p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white-900 mb-4">Premium Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                        <span className="text-white-700">RFID & Biometric Integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Emergency Break-away</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Weather Resistant</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Real-time Monitoring</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-white-900">10+ Years Experience</span>
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
              Premium Flap Barrier Brands
            </h2>
            <p className="text-xl text-purple-100">
              Choose from top-quality brands with proven reliability and advanced features
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {flapBarrierBrands.map((brand) => (
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
              Flap Barrier Applications
            </h2>
            <p className="text-xl text-purple-100">
              Versatile pedestrian access control for various industries and facilities
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
            Ready to Secure Your Facility?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get expert consultation and competitive quotes for flap barrier installation in Hyderabad
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