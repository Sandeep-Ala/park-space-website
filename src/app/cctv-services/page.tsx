// File: /src/app/cctv-services/page.tsx
// Enhanced CCTV Services Page with Modern Design Theme

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Monitor, 
  Camera, 
  Clock, 
  Wrench, 
  Users, 
  Building2, 
  Car, 
  Home, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Settings,
  Activity,
  School,
  Store,
  Factory
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Enhanced Brand data for CCTV Systems
const cctvBrands = [
  {
    id: 'hikvision',
    name: 'Hikvision',
    logo: '/images/brands/hikvision-logo.png',
    featured: true,
    priceRange: '₹3,000 - ₹25,000',
    description: 'World leader in video surveillance products and solutions with cutting-edge AI technology and superior image quality.',
    features: [
      '4K Ultra HD Resolution',
      'Advanced AI Analytics',
      'Smart Motion Detection',
      'Night Vision Technology',
      'Cloud Storage Integration',
      'Mobile App Remote Access',
      'Weather Resistant Design',
      'Facial Recognition Ready'
    ],
    specifications: {
      'Resolution': '2MP to 8MP (4K)',
      'Night Vision': 'Up to 50m IR Range',
      'Storage': 'Cloud + Local DVR/NVR',
      'Connectivity': 'IP/Analog/Wireless',
      'Power': 'PoE/12V DC/24V AC',
      'Operating Temp': '-30°C to +60°C',
      'Mobile Access': 'iOS/Android App',
      'Warranty': '3 Years Comprehensive'
    },
    applications: ['Commercial Buildings', 'Industrial Sites', 'Smart Cities', 'Critical Infrastructure']
  },
  {
    id: 'dahua',
    name: 'Dahua',
    logo: '/images/brands/dahua-logo.png',
    featured: true,
    priceRange: '₹2,500 - ₹20,000',
    description: 'Advanced surveillance technology with intelligent features and robust performance for various applications.',
    features: [
      'Smart Motion Detection',
      'Perimeter Protection',
      'Two-way Audio Communication',
      'Advanced WDR Technology',
      'Weather Resistant IP67',
      'Remote Monitoring Capability',
      'Easy Installation Design',
      'Smart Alarm Integration'
    ],
    specifications: {
      'Resolution': '2MP to 12MP Options',
      'Night Vision': 'Up to 40m IR Range',
      'Storage': 'Edge + Network Storage',
      'Connectivity': 'IP Network/Analog',
      'Power': 'PoE+/12V DC',
      'Operating Temp': '-40°C to +60°C',
      'Mobile Access': 'DMSS Mobile App',
      'Warranty': '2 Years Standard'
    },
    applications: ['Retail Chains', 'Educational Institutes', 'Healthcare Facilities', 'Transportation']
  },
  {
    id: 'cp-plus',
    name: 'CP Plus',
    logo: '/images/brands/cp-plus-logo.png',
    featured: false,
    priceRange: '₹2,000 - ₹15,000',
    description: 'Leading Indian brand offering cost-effective security solutions with local service support and reliability.',
    features: [
      'HD Resolution Options',
      'Infrared Night Vision',
      'Wide Dynamic Range',
      'Smart Phone Integration',
      'Local Service Support',
      'Cost-effective Solutions',
      'Easy DIY Installation',
      'Multi-language Support'
    ],
    specifications: {
      'Resolution': '1MP to 5MP Options',
      'Night Vision': 'Up to 30m IR Range',
      'Storage': 'Local DVR/Cloud',
      'Connectivity': 'Analog/HD-CVI/IP',
      'Power': '12V DC/PoE',
      'Operating Temp': '-10°C to +50°C',
      'Mobile Access': 'CP Plus Mobile App',
      'Warranty': '2 Years + Service'
    },
    applications: ['Small Businesses', 'Residential Areas', 'Local Offices', 'Budget Projects']
  },
  {
    id: 'axis',
    name: 'Axis Communications',
    logo: '/images/brands/axis-logo.png',
    featured: false,
    priceRange: '₹8,000 - ₹50,000',
    description: 'Premium Swedish brand offering network cameras with cutting-edge technology and enterprise-grade security.',
    features: [
      'Network Camera Pioneer',
      'Advanced Video Analytics',
      'Cybersecurity Features',
      'Edge-to-Edge Solutions',
      'Professional Grade Quality',
      'Open Platform Integration',
      'Advanced Compression',
      'Enterprise Management'
    ],
    specifications: {
      'Resolution': '2MP to 20MP Options',
      'Night Vision': 'Advanced Low Light',
      'Storage': 'Edge Storage/NAS',
      'Connectivity': 'IP Network Only',
      'Power': 'PoE++/High PoE',
      'Operating Temp': '-50°C to +60°C',
      'Mobile Access': 'AXIS Companion',
      'Warranty': '3 Years Enterprise'
    },
    applications: ['Enterprise Buildings', 'Critical Infrastructure', 'High-Security Areas', 'Government']
  },
  {
    id: 'samsung',
    name: 'Samsung Wisenet',
    logo: '/images/brands/samsung-logo.png',
    featured: false,
    priceRange: '₹5,000 - ₹35,000',
    description: 'Enterprise-grade surveillance solutions with AI capabilities and advanced analytics for smart security.',
    features: [
      'AI Object Detection',
      'Facial Recognition Technology',
      'License Plate Recognition',
      'Cloud Integration Ready',
      'Enterprise Features',
      'Advanced Analytics',
      'Tamper Detection',
      'Smart Compression'
    ],
    specifications: {
      'Resolution': '2MP to 8MP AI',
      'Night Vision': 'WiseStream II',
      'Storage': 'Wisenet WAVE VMS',
      'Connectivity': 'IP Network',
      'Power': 'PoE+/24V AC',
      'Operating Temp': '-25°C to +55°C',
      'Mobile Access': 'SmartViewer Mobile',
      'Warranty': '5 Years Limited'
    },
    applications: ['Smart Buildings', 'Retail Analytics', 'City Surveillance', 'Airport Security']
  }
];

// Enhanced Service applications for CCTV
const serviceApplications = [
  {
    title: 'Commercial Buildings',
    description: 'Comprehensive surveillance for offices and business complexes',
    icon: Building2,
    features: ['Entrance monitoring', 'Employee safety', 'Asset protection', 'Visitor management']
  },
  {
    title: 'Residential Complexes',
    description: 'Security solutions for apartments and gated communities',
    icon: Home,
    features: ['Perimeter security', 'Common area monitoring', 'Parking surveillance', 'Visitor tracking']
  },
  {
    title: 'Retail Stores',
    description: 'Loss prevention and customer behavior analytics',
    icon: Store,
    features: ['Theft prevention', 'Customer analytics', 'Staff monitoring', 'Inventory protection']
  },
  {
    title: 'Industrial Facilities',
    description: 'Heavy-duty surveillance for manufacturing and warehouses',
    icon: Factory,
    features: ['Safety monitoring', 'Process surveillance', 'Perimeter security', 'Incident recording']
  },
  {
    title: 'Educational Institutions',
    description: 'Campus security and student safety monitoring',
    icon: School,
    features: ['Campus monitoring', 'Student safety', 'Access control', 'Emergency response']
  },
  {
    title: 'Healthcare Facilities',
    description: 'Patient safety and facility security solutions',
    icon: Store,
    features: ['Patient monitoring', 'Staff safety', 'Equipment security', 'Compliance recording']
  },
  {
    title: 'Parking Areas',
    description: 'Vehicle security and traffic monitoring solutions',
    icon: Car,
    features: ['Vehicle tracking', 'License plate recognition', 'Security monitoring', 'Traffic analysis']
  }
];

// Enhanced Services Section
const services = [
  {
    title: 'Installation & Setup',
    description: 'Professional CCTV system installation with optimal camera positioning and network configuration',
    icon: <Camera className="w-8 h-8 text-purple-400" />,
    included: [
      'Comprehensive site survey & planning',
      'Professional camera mounting',
      'DVR/NVR setup & configuration',
      'Network setup and optimization',
      'Mobile app configuration',
      'System testing & commissioning'
    ]
  },
  {
    title: 'Maintenance & Support',
    description: '24/7 monitoring and maintenance services to ensure optimal system performance',
    icon: <Wrench className="w-8 h-8 text-purple-400" />,
    included: [
      'Regular system health checks',
      'Camera cleaning & adjustment',
      'Software updates & patches',
      'Emergency repair services',
      'Performance optimization',
      'Technical support hotline'
    ]
  },
  {
    title: 'Smart Integration',
    description: 'Advanced integration with access control, alarms, and smart building systems',
    icon: <Zap className="w-8 h-8 text-purple-400" />,
    included: [
      'Access control integration',
      'Alarm system connectivity',
      'Smart building integration',
      'Cloud storage solutions',
      'AI analytics setup',
      'Custom mobile applications'
    ]
  }
];

export default function CCTVServicesPage() {
  const [selectedBrand, setSelectedBrand] = useState(cctvBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof cctvBrands[0]) => {
    setSelectedBrand(brand);
  };

  const handleCTAClick = (action: string) => {
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} CCTV Systems. Price range: ${selectedBrand.priceRange}. Please provide detailed information and quotation.`;
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
                CCTV Systems in
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Professional CCTV surveillance systems from leading brands like Hikvision, Dahua, CP Plus, and more. 
                Complete installation, monitoring, and maintenance services with advanced AI features.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">4K Ultra HD</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">24/7 Monitoring</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">AI Analytics</span>
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
                  ₹2K - ₹50K
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Advanced Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">4K Ultra HD Resolution</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Night Vision Technology</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Mobile App Remote Access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">AI Motion Detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Cloud Storage Options</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-white">Premium Installation</span>
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
              Premium CCTV Brands
            </h2>
            <p className="text-xl text-purple-100">
              Choose from world-leading surveillance brands with proven reliability and cutting-edge technology
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {cctvBrands.map((brand) => (
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
              Complete CCTV Solutions
            </h2>
            <p className="text-xl text-purple-100">
              From installation to monitoring and maintenance - we provide end-to-end CCTV services
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
              CCTV Applications
            </h2>
            <p className="text-xl text-purple-100">
              Comprehensive surveillance solutions for various industries and facilities
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
            Ready to Secure Your Property?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get expert consultation and competitive quotes for CCTV installation in Hyderabad. 
            Professional service with advanced features and 24/7 monitoring support.
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
          <div className="mt-8 text-purple-100">
            <p className="flex flex-wrap justify-center gap-4 text-sm">
              <span>✓ Free site survey</span>
              <span>✓ Professional installation</span>
              <span>✓ 24/7 monitoring</span>
              <span>✓ Mobile app access</span>
              <span>✓ 1-3 year warranty</span>
            </p>
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-purple-500/50 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Get CCTV Quote</h3>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-purple-100 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <LeadForm
              defaultService="cctv-services"
              defaultSubService={selectedBrand.name}
              onSuccess={() => {
                setIsFormVisible(false);
                trackEvent('cctv_lead_submitted', { brand: selectedBrand.name });
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