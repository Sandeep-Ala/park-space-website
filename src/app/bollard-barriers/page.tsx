// File: /src/app/bollard-barriers/page.tsx
// Bollard Barriers Service Page - Priority #2

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Truck, 
  Building2, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Lock,
  AlertTriangle
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Brand data for Bollard Barriers
const bollardBarrierBrands = [
  {
    id: 'faac',
    name: 'FAAC',
    logo: '/images/brands/faac-logo.png',
    featured: true,
    priceRange: '₹1,20,000 - ₹5,00,000',
    description: 'Italian engineering excellence in heavy-duty vehicle access control with hydraulic precision.',
    features: [
      'Hydraulic operation system',
      'K4/K8/K12 crash rating options',
      'Emergency fast operation',
      'Anti-crush safety system',
      'Weather-resistant design',
      'Remote control capability',
      'LED status indicators',
      'Modular installation'
    ],
    specifications: {
      'Bollard Diameter': '219mm - 273mm',
      'Lifting Height': '600mm - 800mm',
      'Operating Speed': '3-6 seconds',
      'Crash Rating': 'K4/K8/K12 available',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-25°C to +70°C',
      'Material': 'Galvanized Steel',
      'Warranty': '3 Years Comprehensive'
    },
    applications: ['Government Buildings', 'Embassies', 'Corporate HQ', 'Critical Infrastructure']
  },
  {
    id: 'bft',
    name: 'BFT',
    logo: '/images/brands/bft-logo.png',
    featured: true,
    priceRange: '₹1,00,000 - ₹4,50,000',
    description: 'Robust vehicle access control solutions with advanced safety features and reliable performance.',
    features: [
      'Electro-hydraulic operation',
      'Obstacle detection system',
      'Manual override capability',
      'Corrosion-resistant coating',
      'Integration with access control',
      'Emergency stop function',
      'Visual warning lights',
      'Flexible programming options'
    ],
    specifications: {
      'Bollard Diameter': '200mm - 250mm',
      'Lifting Height': '600mm - 700mm',
      'Operating Speed': '4-7 seconds',
      'Crash Rating': 'K4/K8 certified',
      'Power Supply': '230V AC, 50/60Hz',
      'Operating Temperature': '-20°C to +65°C',
      'Material': 'Stainless Steel 316',
      'Warranty': '2 Years + Service'
    },
    applications: ['Shopping Centers', 'Hotels', 'Residential Complexes', 'Office Buildings']
  },
  {
    id: 'nice',
    name: 'Nice',
    logo: '/images/brands/nice-logo.png',
    featured: false,
    priceRange: '₹95,000 - ₹4,00,000',
    description: 'Smart vehicle access solutions with IoT integration and energy-efficient operation.',
    features: [
      'Smart control technology',
      'Energy-efficient operation',
      'IoT connectivity ready',
      'Predictive maintenance',
      'Mobile app control',
      'Real-time diagnostics',
      'Customizable access levels',
      'Cloud-based monitoring'
    ],
    specifications: {
      'Bollard Diameter': '219mm - 273mm',
      'Lifting Height': '600mm - 800mm',
      'Operating Speed': '3-5 seconds',
      'Crash Rating': 'K4/K8 available',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-20°C to +60°C',
      'Material': 'Hot-dip Galvanized Steel',
      'Warranty': '2 Years Parts & Labor'
    },
    applications: ['Smart Cities', 'Industrial Parks', 'Logistics Centers', 'Technology Campuses']
  },
  {
    id: 'came',
    name: 'Came',
    logo: '/images/brands/came-logo.png',
    featured: false,
    priceRange: '₹85,000 - ₹3,50,000',
    description: 'Italian innovation in automatic bollard systems with focus on reliability and aesthetics.',
    features: [
      'Sleek design options',
      'Quiet operation',
      'Advanced safety sensors',
      'Multiple finish options',
      'Easy maintenance access',
      'Integrated lighting options',
      'Vandal-resistant design',
      'Flexible installation'
    ],
    specifications: {
      'Bollard Diameter': '200mm - 270mm',
      'Lifting Height': '600mm - 750mm',
      'Operating Speed': '4-6 seconds',
      'Crash Rating': 'K4 certified',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-15°C to +55°C',
      'Material': 'Powder-coated Steel',
      'Warranty': '2 Years Comprehensive'
    },
    applications: ['Retail Areas', 'Public Spaces', 'Parking Areas', 'Mixed-Use Developments']
  },
  {
    id: 'automatic-systems',
    name: 'Automatic Systems',
    logo: '/images/brands/automatic-systems-logo.png',
    featured: false,
    priceRange: '₹80,000 - ₹3,00,000',
    description: 'Proven vehicle access control solutions with robust construction and reliable performance.',
    features: [
      'Heavy-duty construction',
      'Simple operation',
      'Cost-effective solution',
      'Standard integrations',
      'Local service support',
      'Quick installation',
      'Proven reliability',
      'Basic safety features'
    ],
    specifications: {
      'Bollard Diameter': '219mm',
      'Lifting Height': '600mm',
      'Operating Speed': '5-8 seconds',
      'Crash Rating': 'K4 standard',
      'Power Supply': '220V AC, 50Hz',
      'Operating Temperature': '-10°C to +50°C',
      'Material': 'Galvanized Steel',
      'Warranty': '1 Year + Extended Options'
    },
    applications: ['Small Commercial', 'Residential Gates', 'Service Areas', 'Basic Security Zones']
  }
];

// Service applications for Bollard Barriers
const serviceApplications = [
  {
    title: 'Government & Embassies',
    description: 'High-security vehicle access control for critical facilities',
    icon: Shield,
    features: ['K12 crash rating', 'Anti-terrorism protection', 'Emergency protocols', 'Perimeter security']
  },
  {
    title: 'Corporate Headquarters',
    description: 'Executive vehicle access with professional aesthetics',
    icon: Building2,
    features: ['VIP access control', 'Employee parking', 'Visitor management', 'Brand integration']
  },
  {
    title: 'Critical Infrastructure',
    description: 'Protection for power plants, data centers, and utilities',
    icon: Zap,
    features: ['Fail-safe operation', 'Backup power systems', 'Remote monitoring', 'Emergency override']
  },
  {
    title: 'Shopping Centers',
    description: 'Controlled vehicle access for retail environments',
    icon: Building2,
    features: ['Customer flow control', 'Delivery access', 'Security zones', 'Emergency evacuation']
  },
  {
    title: 'Hotels & Hospitality',
    description: 'Elegant vehicle access control for luxury properties',
    icon: Star,
    features: ['Guest experience', 'Valet integration', 'Event access', 'Service vehicle control']
  },
  {
    title: 'Industrial Facilities',
    description: 'Heavy-duty access control for manufacturing and logistics',
    icon: Truck,
    features: ['Truck access control', 'Loading dock security', 'Shift management', 'Cargo protection']
  },
  {
    title: 'Public Spaces',
    description: 'Pedestrian-friendly vehicle control in urban areas',
    icon: AlertTriangle,
    features: ['Crowd protection', 'Event security', 'Traffic management', 'Emergency access']
  }
];

export default function BollardBarriersPage() {
  const [selectedBrand, setSelectedBrand] = useState(bollardBarrierBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof bollardBarrierBrands[0]) => {
    setSelectedBrand(brand);
  };

  const handleCTAClick = (action: string) => {
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} Bollard Barriers. Price range: ${selectedBrand.priceRange}. Please provide more details.`;
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
                Bollard Barriers in
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Heavy-duty vehicle access control systems for high-security facilities. 
                Crash-rated bollard barriers with hydraulic precision and anti-terrorism protection.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-white">K4/K8/K12 Rated</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-white">Anti-Terrorism</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-white">3-6 Seconds</span>
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
                  ₹80K - ₹5L
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Security Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white">Hydraulic Operation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white">Crash Rating Certified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white">Emergency Override</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-white">Remote Monitoring</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-white">High Security Certified</span>
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
              Premium Bollard Barrier Brands
            </h2>
            <p className="text-xl text-purple-100">
              Industry-leading brands with proven crash ratings and security certifications
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {bollardBarrierBrands.map((brand) => (
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
              Bollard Barrier Applications
            </h2>
            <p className="text-xl text-purple-100">
              Heavy-duty vehicle access control for critical infrastructure and high-security facilities
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
            Secure Your Critical Infrastructure
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get expert consultation and competitive quotes for bollard barrier installation in Hyderabad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCTAClick('get_quote')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Security Assessment
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
      