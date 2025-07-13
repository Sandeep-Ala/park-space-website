// File: /src/app/boom-barriers/page.tsx
// Enhanced Boom Barriers Service Page with Modern Design Theme

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
  Car,
  Settings,
  Wrench,
  Camera,
  Timer,
  Activity,
  Truck
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Enhanced Brand data for Boom Barriers
const boomBarrierBrands = [
  {
    id: 'faac',
    name: 'FAAC',
    logo: '/images/brands/faac-logo.png',
    featured: true,
    priceRange: '₹82,600 - ₹2,50,000',
    description: 'Premium Italian brand with 50+ years of experience in automation technology. Industry leader in high-performance barrier systems.',
    features: [
      '3-second ultra-fast opening speed',
      'Advanced RFID integration',
      'All-weather resistant design',
      'Integrated LED lighting system',
      'Smart anti-crash technology',
      'Remote monitoring capability',
      'Emergency manual override',
      'Traffic light synchronization'
    ],
    specifications: {
      'Opening Speed': '3-6 seconds',
      'Boom Length': '3m - 8m options',
      'Power Supply': '230V AC, 50Hz',
      'Operating Temperature': '-20°C to +55°C',
      'Motor Type': '24V DC Brushless',
      'Duty Cycle': '100% continuous',
      'Integration': 'Access Control & Payment Systems',
      'Warranty': '3 Years Comprehensive'
    },
    applications: ['Premium Residential', 'Corporate Offices', 'Shopping Malls', 'Airports']
  },
  {
    id: 'benica',
    name: 'Benica',
    logo: '/images/brands/benica-logo.png',
    featured: true,
    priceRange: '₹45,000 - ₹1,20,000',
    description: 'Reliable and cost-effective barrier solutions designed for commercial applications with excellent value proposition.',
    features: [
      'Manual backup operation',
      'Loop detector compatibility',
      'Variable speed control',
      'Robust anti-crash system',
      'Local service support network',
      'Cost-effective maintenance',
      'Standard integrations',
      'Quick installation process'
    ],
    specifications: {
      'Opening Speed': '4-7 seconds',
      'Boom Length': '3m - 6m options',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-15°C to +50°C',
      'Motor Type': '220V AC Standard',
      'Duty Cycle': '50% intermittent',
      'Integration': 'Basic Access Control',
      'Warranty': '2 Years Parts & Service'
    },
    applications: ['Mid-range Residential', 'Small Offices', 'Retail Stores', 'Parking Areas']
  },
  {
    id: 'roger',
    name: 'Roger',
    logo: '/images/brands/roger-logo.png',
    featured: false,
    priceRange: '₹65,000 - ₹1,80,000',
    description: 'High-speed barriers engineered for intensive commercial and industrial applications with superior performance.',
    features: [
      'High-speed operation capability',
      'Heavy-duty industrial motor',
      'Traffic light integration ready',
      'Advanced remote monitoring',
      'Industrial grade construction',
      'Weatherproof housing',
      'Multiple access methods',
      'Emergency evacuation mode'
    ],
    specifications: {
      'Opening Speed': '2-4 seconds',
      'Boom Length': '4m - 8m options',
      'Power Supply': '220-240V AC, 50/60Hz',
      'Operating Temperature': '-25°C to +60°C',
      'Motor Type': '24V DC High Torque',
      'Duty Cycle': '80% heavy duty',
      'Integration': 'Industrial Control Systems',
      'Warranty': '2 Years + Extended Options'
    },
    applications: ['Industrial Facilities', 'Logistics Centers', 'Toll Plazas', 'Heavy Traffic Areas']
  },
  {
    id: 'syrotech',
    name: 'Syrotech',
    logo: '/images/brands/syrotech-logo.png',
    featured: true,
    priceRange: '₹55,000 - ₹95,000',
    description: 'Indian brand with excellent nationwide service network and cost-effective spare parts availability.',
    features: [
      'Extensive local service support',
      'Cost-effective spare parts',
      'Customizable configurations',
      'GSM/SMS integration',
      'Easy maintenance design',
      'Indian conditions optimized',
      'Quick service response',
      'Budget-friendly options'
    ],
    specifications: {
      'Opening Speed': '5-8 seconds',
      'Boom Length': '3m - 6m options',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-10°C to +55°C',
      'Motor Type': '220V AC Standard',
      'Duty Cycle': '40% standard',
      'Integration': 'Basic to Moderate Systems',
      'Warranty': '1 Year + Service Contracts'
    },
    applications: ['Budget Residential', 'Small Commercial', 'Educational Institutions', 'Community Centers']
  },
  {
    id: 'ags',
    name: 'AGS',
    logo: '/images/brands/ags-logo.png',
    featured: false,
    priceRange: '₹55,000 - ₹1,50,000',
    description: 'Robust barriers specifically designed for heavy-duty industrial applications with exceptional durability.',
    features: [
      'Heavy-duty construction',
      'Industrial grade materials',
      'Explosion-proof options',
      'Fail-safe operation modes',
      'Corrosion resistant coating',
      'Extreme weather capable',
      'Safety compliance certified',
      'Long service life'
    ],
    specifications: {
      'Opening Speed': '4-6 seconds',
      'Boom Length': '4m - 10m options',
      'Power Supply': '220-440V AC, 50Hz',
      'Operating Temperature': '-30°C to +70°C',
      'Motor Type': 'Heavy Duty Industrial',
      'Duty Cycle': '70% industrial',
      'Integration': 'Industrial Safety Systems',
      'Warranty': '2 Years Industrial Grade'
    },
    applications: ['Heavy Industries', 'Chemical Plants', 'Mining Operations', 'Defense Facilities']
  }
];

// Enhanced Service applications for Boom Barriers
const serviceApplications = [
  {
    title: 'Residential Complexes',
    description: 'Secure vehicle access control for gated communities and apartments',
    icon: Building2,
    features: ['Resident vehicle tracking', 'Visitor management', 'Security integration', 'Remote monitoring']
  },
  {
    title: 'Corporate Offices',
    description: 'Professional vehicle access for business parks and office complexes',
    icon: Users,
    features: ['Employee parking', 'Visitor access', 'Time tracking', 'Multi-level permissions']
  },
  {
    title: 'Shopping Malls',
    description: 'Customer parking management with payment integration',
    icon: Car,
    features: ['Automated payments', 'Parking analytics', 'VIP access', 'Peak hour management']
  },
  {
    title: 'Industrial Facilities',
    description: 'Heavy-duty access control for manufacturing and logistics',
    icon: Truck,
    features: ['Truck access control', 'Safety protocols', 'Load monitoring', 'Emergency procedures']
  },
  {
    title: 'Hospitals & Healthcare',
    description: 'Medical facility vehicle access with emergency protocols',
    icon: Shield,
    features: ['Ambulance priority', 'Staff parking', 'Patient drop-off', 'Emergency access']
  },
  {
    title: 'Educational Institutions',
    description: 'School and college campus vehicle management',
    icon: Users,
    features: ['Student safety', 'Parent access', 'Staff parking', 'Event management']
  },
  {
    title: 'Toll Plazas & Highways',
    description: 'High-speed traffic management for toll collection',
    icon: Activity,
    features: ['Fast lane access', 'Payment integration', 'Traffic monitoring', 'Revenue collection']
  }
];

// Enhanced Services Section
const services = [
  {
    title: 'Sales & Installation',
    description: 'Complete end-to-end installation with professional site preparation and commissioning',
    icon: <Settings className="w-8 h-8 text-purple-400" />,
    included: [
      'Comprehensive site survey & planning',
      'Professional foundation & civil work',
      'Complete electrical installation',
      'System testing & commissioning',
      'Staff training & handover',
      '1-year comprehensive warranty'
    ]
  },
  {
    title: 'Repair & Maintenance',
    description: '24/7 emergency repair services and preventive maintenance programs',
    icon: <Wrench className="w-8 h-8 text-purple-400" />,
    included: [
      '24x7 emergency repair service',
      'Preventive maintenance schedules',
      'Genuine spare parts supply',
      'Annual maintenance contracts',
      'Remote diagnostic support',
      'Performance optimization'
    ]
  },
  {
    title: 'Upgrades & Integration',
    description: 'System upgrades and integration with modern access control technologies',
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    included: [
      'RFID & smart card integration',
      'Mobile app control systems',
      'CCTV & security integration',
      'Payment gateway integration',
      'IoT & cloud connectivity',
      'Advanced analytics dashboard'
    ]
  }
];

export default function BoomBarriersPage() {
  const [selectedBrand, setSelectedBrand] = useState(boomBarrierBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof boomBarrierBrands[0]) => {
    setSelectedBrand(brand);
     };

  const handleCTAClick = (action: string) => {
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} Boom Barriers. Price range: ${selectedBrand.priceRange}. Please provide detailed information and quotation.`;
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
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Boom Barriers in
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Premium vehicle access control systems from leading brands like FAAC, Benica, Roger, and more. 
                Complete sales, installation, repair, and maintenance services with professional expertise.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Timer className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">3-8 second opening</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Anti-crash system</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">24/7 monitoring</span>
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
              <div className="relative rounded-3xl p-8 shadow-2xl">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  ₹35K - ₹2.5L
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Professional Installation</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Site survey & consultation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Foundation & civil work</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Electrical connections</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Testing & commissioning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">1-year warranty included</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-white">10+ Years Experience</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Selection Section */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Premium Boom Barrier Brands
            </h2>
            <p className="text-xl text-purple-100">
              Choose from internationally acclaimed brands with proven reliability and advanced technology
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {boomBarrierBrands.map((brand) => (
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

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Complete Service Solutions
            </h2>
            <p className="text-xl text-purple-100">
              From sales to installation, repair, and maintenance - we provide end-to-end boom barrier services
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-purple-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/30"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-purple-100 mb-6">{service.description}</p>
                <div className="space-y-3">
                  {service.included.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-3">
                      <CheckCircle size={16} className="text-purple-300" />
                      <span className="text-purple-100 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Boom Barrier Applications
            </h2>
            <p className="text-xl text-purple-100">
              Versatile vehicle access control solutions for various industries and facilities
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
            Ready to Install Your Boom Barrier?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get expert consultation and competitive quotes for boom barrier installation in Hyderabad. 
            Professional service with comprehensive warranty and 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCTAClick('get_quote')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Free Site Survey
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
          <div className="mt-8 text-purple-100">
            <p className="flex flex-wrap justify-center gap-4 text-sm">
              <span>✓ Free site survey</span>
              <span>✓ Competitive pricing</span>
              <span>✓ Professional installation</span>
              <span>✓ 1-3 year warranty</span>
              <span>✓ 24/7 support</span>
            </p>
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-purple-500/50 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Get Boom Barrier Quote</h3>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-purple-100 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <LeadForm
              defaultService="boom-barriers"
              defaultSubService={selectedBrand.name}
              onSuccess={() => {
                setIsFormVisible(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleCTAClick('whatsapp')}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}