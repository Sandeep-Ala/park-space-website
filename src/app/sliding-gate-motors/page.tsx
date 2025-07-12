// File: /src/app/sliding-gate-motors/page.tsx
// Sliding Gate Motors Service Page - Complete Version

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, 
  Truck, 
  Shield, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Settings,
  Timer,
  Building2,
  Home
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Brand data for Sliding Gate Motors
const slidingMotorBrands = [
  {
    id: 'faac',
    name: 'FAAC',
    logo: '/images/brands/faac-logo.png',
    featured: true,
    priceRange: '₹40,000 - ₹1,00,000',
    description: 'Heavy-duty sliding gate motors with Italian engineering for industrial and residential applications.',
    features: [
      'Heavy-duty rack & pinion drive',
      'Soft start/stop technology',
      'Obstacle detection system',
      'Emergency manual release',
      'Integrated control electronics',
      'Weather-resistant housing',
      'Self-locking mechanism',
      'Professional-grade reliability'
    ],
    specifications: {
      'Gate Weight': 'Up to 2000kg',
      'Gate Width': 'Up to 20m',
      'Opening Speed': '12-20m/minute',
      'Power Supply': '220V AC, 50Hz',
      'Motor Power': '550W - 1100W',
      'Operating Temperature': '-25°C to +70°C',
      'Protection Rating': 'IP44/IP54',
      'Warranty': '3 Years Comprehensive'
    },
    applications: ['Industrial Gates', 'Warehouse Entrances', 'Heavy Commercial', 'Security Perimeters']
  },
  {
    id: 'bft',
    name: 'BFT',
    logo: '/images/brands/bft-logo.png',
    featured: true,
    priceRange: '₹35,000 - ₹90,000',
    description: 'Advanced sliding gate automation with smart controls and reliable performance.',
    features: [
      'Smart control technology',
      'Variable speed control',
      'Anti-crushing safety',
      'Encoder feedback system',
      'Remote diagnostics ready',
      'LED status indicators',
      'Multiple safety inputs',
      'Easy maintenance access'
    ],
    specifications: {
      'Gate Weight': 'Up to 1500kg',
      'Gate Width': 'Up to 15m',
      'Opening Speed': '15-25m/minute',
      'Power Supply': '230V AC, 50/60Hz',
      'Motor Power': '370W - 750W',
      'Operating Temperature': '-20°C to +60°C',
      'Protection Rating': 'IP44',
      'Warranty': '2 Years + Extended'
    },
    applications: ['Commercial Properties', 'Residential Complexes', 'Office Buildings', 'Parking Areas']
  },
  {
    id: 'nice',
    name: 'Nice',
    logo: '/images/brands/nice-logo.png',
    featured: false,
    priceRange: '₹30,000 - ₹80,000',
    description: 'Smart sliding gate motors with IoT connectivity and energy-efficient operation.',
    features: [
      'IoT connectivity ready',
      'Mobile app integration',
      'Energy-efficient motors',
      'Predictive maintenance',
      'Solar power compatible',
      'Cloud monitoring',
      'Voice control support',
      'Smart home integration'
    ],
    specifications: {
      'Gate Weight': 'Up to 1200kg',
      'Gate Width': 'Up to 12m',
      'Opening Speed': '18-30m/minute',
      'Power Supply': '220V AC, 24V DC',
      'Motor Power': '300W - 600W',
      'Operating Temperature': '-15°C to +55°C',
      'Protection Rating': 'IP44',
      'Warranty': '2 Years Parts & Service'
    },
    applications: ['Smart Homes', 'Modern Developments', 'Tech Properties', 'Automated Buildings']
  },
  {
    id: 'came',
    name: 'Came',
    logo: '/images/brands/came-logo.png',
    featured: false,
    priceRange: '₹28,000 - ₹70,000',
    description: 'Reliable sliding gate solutions with user-friendly operation and aesthetic design.',
    features: [
      'Compact design',
      'Quiet operation',
      'User-friendly controls',
      'Standard safety features',
      'Easy installation',
      'Multiple programming options',
      'Durable construction',
      'Cost-effective solution'
    ],
    specifications: {
      'Gate Weight': 'Up to 1000kg',
      'Gate Width': 'Up to 10m',
      'Opening Speed': '12-18m/minute',
      'Power Supply': '220V AC',
      'Motor Power': '250W - 500W',
      'Operating Temperature': '-10°C to +50°C',
      'Protection Rating': 'IP44',
      'Warranty': '2 Years Standard'
    },
    applications: ['Residential Gates', 'Small Commercial', 'Community Entrances', 'Standard Applications']
  },
  {
    id: 'roger-technology',
    name: 'Roger Technology',
    logo: '/images/brands/roger-logo.png',
    featured: false,
    priceRange: '₹25,000 - ₹60,000',
    description: 'Budget-friendly sliding gate motors with reliable performance for basic applications.',
    features: [
      'Cost-effective solution',
      'Simple installation',
      'Basic safety features',
      'Standard remote controls',
      'Easy maintenance',
      'Reliable operation',
      'Local service support',
      'Value for money'
    ],
    specifications: {
      'Gate Weight': 'Up to 800kg',
      'Gate Width': 'Up to 8m',
      'Opening Speed': '10-15m/minute',
      'Power Supply': '220V AC',
      'Motor Power': '200W - 400W',
      'Operating Temperature': '0°C to +45°C',
      'Protection Rating': 'IP44',
      'Warranty': '1 Year + Extended Options'
    },
    applications: ['Budget Solutions', 'Basic Residential', 'Simple Commercial', 'Standard Gates']
  }
];

// Service applications for Sliding Gate Motors
const serviceApplications = [
  {
    title: 'Industrial Facilities',
    description: 'Heavy-duty automation for manufacturing and logistics',
    icon: Factory,
    features: ['Heavy gate support', 'Continuous operation', 'Industrial protocols', 'High security']
  },
  {
    title: 'Warehouses & Distribution',
    description: 'Efficient vehicle access for cargo and delivery operations',
    icon: Truck,
    features: ['Large gate capacity', 'Fast operation', 'Vehicle detection', 'Loading dock integration']
  },
  {
    title: 'Residential Complexes',
    description: 'Secure automated entrances for gated communities',
    icon: Home,
    features: ['Resident access', 'Visitor management', 'Security integration', 'Quiet operation']
  },
  {
    title: 'Commercial Properties',
    description: 'Professional entrance solutions for offices and businesses',
    icon: Building2,
    features: ['Employee access', 'Professional appearance', 'Reliability', 'Integration ready']
  },
  {
    title: 'Parking Facilities',
    description: 'Automated access control for parking areas and garages',
    icon: Timer,
    features: ['Payment integration', 'Traffic management', 'Space optimization', 'User convenience']
  },
  {
    title: 'Security Perimeters',
    description: 'High-security access control for sensitive facilities',
    icon: Shield,
    features: ['Security protocols', 'Access logging', 'Emergency override', 'Monitoring integration']
  },
  {
    title: 'Agricultural Properties',
    description: 'Robust gate automation for farms and rural properties',
    icon: Settings,
    features: ['Weather resistance', 'Heavy-duty operation', 'Remote locations', 'Low maintenance']
  }
];

export default function SlidingGateMotorsPage() {
  const [selectedBrand, setSelectedBrand] = useState(slidingMotorBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof slidingMotorBrands[0]) => {
    setSelectedBrand(brand);

  };

  const handleCTAClick = (action: string) => {
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} Sliding Gate Motors. Price range: ${selectedBrand.priceRange}. Please provide more details.`;
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
                Sliding Gate Motors in
               <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Heavy-duty sliding gate automation for industrial and commercial applications. 
                Robust motor systems with advanced safety features and reliable performance.
               </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Up to 2000kg</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Self-Locking</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Rack & Pinion</span>
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
                  ₹25K - ₹1L
                     </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl  p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white-900 mb-4">Premium Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Heavy-Duty Drive</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Obstacle Detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Manual Release</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Weather Protection</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-white-900">Industrial Grade</span>
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
                            Premium Sliding Motor Brands            </h2>
            <p className="text-xl text-purple-100">
              Industry-leading motor systems with heavy-duty performance and reliability
            </p>
          </div>

         {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {slidingMotorBrands.map((brand) => (
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
              Sliding Gate Motor Applications
            </h2>
            <p className="text-xl text-purple-100">
              Heavy-duty automation solutions for industrial and commercial gate systems
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
            Automate Your Sliding Gates
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get expert consultation and professional sliding gate motor installation in Hyderabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCTAClick('get_quote')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Motor Quote
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