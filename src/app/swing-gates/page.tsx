// File: /src/app/swing-gates/page.tsx
// Swing Gates Service Page - 5th Priority

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Building, 
  Shield, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Lock,
  Timer
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Brand data for Swing Gates
const swingGateBrands = [
  {
    id: 'faac',
    name: 'FAAC',
    logo: '/images/brands/faac-logo.png',
    featured: true,
    priceRange: '₹35,000 - ₹1,50,000',
    description: 'Italian excellence in swing gate automation with robust performance and elegant design.',
    features: [
      'Electromechanical operation',
      'Obstacle detection system',
      'Emergency manual override',
      'Weather-resistant housing',
      'Integrated control electronics',
      'Remote control capability',
      'Safety photocells included',
      'Professional installation'
    ],
    specifications: {
      'Gate Weight': 'Up to 500kg per leaf',
      'Gate Width': '1.5m - 6m per leaf',
      'Opening Speed': '15-20 seconds',
      'Power Supply': '220V AC, 50Hz',
      'Motor Type': '24V DC electromechanical',
      'Operating Temperature': '-20°C to +55°C',
      'Safety Features': 'Photocells, Edges, Encoder',
      'Warranty': '3 Years Comprehensive'
    },
    applications: ['Residential Villas', 'Corporate Offices', 'Industrial Gates', 'Parking Areas']
  },
  {
    id: 'bft',
    name: 'BFT',
    logo: '/images/brands/bft-logo.png',
    featured: true,
    priceRange: '₹30,000 - ₹1,20,000',
    description: 'Advanced swing gate automation with smart technology and reliable safety systems.',
    features: [
      'Smart control technology',
      'Soft start/stop operation',
      'Integrated LED lighting',
      'Anti-crushing protection',
      'Remote diagnostics',
      'Multiple remote controls',
      'Timer-to-close function',
      'Easy maintenance access'
    ],
    specifications: {
      'Gate Weight': 'Up to 400kg per leaf',
      'Gate Width': '1.2m - 5m per leaf',
      'Opening Speed': '12-18 seconds',
      'Power Supply': '230V AC, 50/60Hz',
      'Motor Type': '24V DC brushless',
      'Operating Temperature': '-20°C to +60°C',
      'Safety Features': 'Multiple sensors, Edges',
      'Warranty': '2 Years + Extended'
    },
    applications: ['Luxury Homes', 'Commercial Properties', 'Gated Communities', 'Office Complexes']
  },
  {
    id: 'nice',
    name: 'Nice',
    logo: '/images/brands/nice-logo.png',
    featured: false,
    priceRange: '₹28,000 - ₹1,00,000',
    description: 'Smart gate automation with IoT connectivity and mobile app control.',
    features: [
      'IoT connectivity ready',
      'Mobile app control',
      'Voice command support',
      'Energy-efficient motors',
      'Predictive maintenance',
      'Cloud-based monitoring',
      'Integration with home automation',
      'Solar power compatible'
    ],
    specifications: {
      'Gate Weight': 'Up to 350kg per leaf',
      'Gate Width': '1m - 4m per leaf',
      'Opening Speed': '10-15 seconds',
      'Power Supply': '220V AC, 12V/24V DC',
      'Motor Type': 'Brushless DC motor',
      'Operating Temperature': '-10°C to +55°C',
      'Safety Features': 'Smart sensors, AI detection',
      'Warranty': '2 Years Parts & Service'
    },
    applications: ['Smart Homes', 'Tech-Savvy Properties', 'Modern Developments', 'Automated Buildings']
  },
  {
    id: 'came',
    name: 'Came',
    logo: '/images/brands/came-logo.png',
    featured: false,
    priceRange: '₹25,000 - ₹90,000',
    description: 'Reliable swing gate solutions with aesthetic appeal and user-friendly operation.',
    features: [
      'Sleek design options',
      'Quiet operation',
      'User-friendly controls',
      'Multiple safety features',
      'Easy programming',
      'Durable construction',
      'Various finish options',
      'Quick installation'
    ],
    specifications: {
      'Gate Weight': 'Up to 300kg per leaf',
      'Gate Width': '1m - 3.5m per leaf',
      'Opening Speed': '15-25 seconds',
      'Power Supply': '220V AC, 24V DC',
      'Motor Type': 'Electromechanical',
      'Operating Temperature': '-10°C to +50°C',
      'Safety Features': 'Standard safety devices',
      'Warranty': '2 Years Standard'
    },
    applications: ['Residential Gates', 'Small Commercial', 'Community Entrances', 'Garden Gates']
  },
  {
    id: 'roger-technology',
    name: 'Roger Technology',
    logo: '/images/brands/roger-logo.png',
    featured: false,
    priceRange: '₹22,000 - ₹80,000',
    description: 'Cost-effective swing gate automation with reliable performance and basic features.',
    features: [
      'Cost-effective solution',
      'Simple operation',
      'Basic safety features',
      'Standard remote controls',
      'Easy maintenance',
      'Reliable performance',
      'Local service support',
      'Budget-friendly options'
    ],
    specifications: {
      'Gate Weight': 'Up to 250kg per leaf',
      'Gate Width': '1m - 3m per leaf',
      'Opening Speed': '20-30 seconds',
      'Power Supply': '220V AC',
      'Motor Type': 'AC motor with gearbox',
      'Operating Temperature': '0°C to +45°C',
      'Safety Features': 'Basic photocells',
      'Warranty': '1 Year + Extended Options'
    },
    applications: ['Budget Homes', 'Basic Commercial', 'Simple Applications', 'Standard Gates']
  }
];

// Service applications for Swing Gates
const serviceApplications = [
  {
    title: 'Residential Villas',
    description: 'Elegant automated entrances for luxury homes and villas',
    icon: Home,
    features: ['Aesthetic appeal', 'Security enhancement', 'Convenience', 'Property value increase']
  },
  {
    title: 'Gated Communities',
    description: 'Controlled access for residential developments and societies',
    icon: Building,
    features: ['Resident access cards', 'Visitor management', 'Security monitoring', 'Community safety']
  },
  {
    title: 'Commercial Properties',
    description: 'Professional entrance solutions for offices and businesses',
    icon: Shield,
    features: ['Employee access', 'Visitor control', 'Brand image', 'Security protocols']
  },
  {
    title: 'Industrial Facilities',
    description: 'Heavy-duty gate automation for manufacturing and warehouses',
    icon: Zap,
    features: ['Vehicle access', 'Load management', 'Security zones', 'Operational efficiency']
  },
  {
    title: 'Parking Areas',
    description: 'Efficient vehicle flow management for parking facilities',
    icon: Timer,
    features: ['Traffic control', 'Payment integration', 'Space management', 'User convenience']
  },
  {
    title: 'Healthcare Facilities',
    description: 'Secure and accessible entrances for hospitals and clinics',
    icon: Lock,
    features: ['Emergency access', 'Patient safety', 'Staff convenience', 'Ambulance priority']
  },
  {
    title: 'Educational Institutions',
    description: 'Safe and controlled access for schools and colleges',
    icon: Building,
    features: ['Student safety', 'Visitor screening', 'Emergency protocols', 'Campus security']
  }
];

export default function SwingGatesPage() {
  const [selectedBrand, setSelectedBrand] = useState(swingGateBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof swingGateBrands[0]) => {
    setSelectedBrand(brand);

  };

  const handleCTAClick = (action: string) => {
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} Swing Gates. Price range: ${selectedBrand.priceRange}. Please provide more details.`;
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
                Swing Gates in
                 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                    Automated swing gate solutions for residential and commercial properties. 
                    Premium gate automation with advanced safety features and elegant design.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                           <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium">Up to 500kg</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium">Safety Sensors</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                    <Zap className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium">Remote Control</span>
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
                  <h3 className="text-2xl font-bold text-white-900 mb-4">Automation Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                        <span className="text-white-700">Automatic Operation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Safety Protection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Manual Override</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white-700">Weather Resistant</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-white-900">Premium Quality</span>
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
              Premium Swing Gate Brands
                </h2>
                <p className="text-xl text-gray-100">
                Leading automation brands with proven reliability and superior performance
                </p>
            </div>

            {/* Brand Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {swingGateBrands.map((brand) => (
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
              Swing Gate Applications
                </h2>
                <p className="text-xl text-gray-100">
                Versatile automated gate solutions for residential and commercial properties
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
                  Automate Your Property Entrance

          </h2>
          <p className="text-xl text-purple-100 mb-8">
                           Get expert consultation and professional swing gate installation in Hyderabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCTAClick('get_quote')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
                          Get Installation Quote
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
                defaultService="swing-gates"
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
