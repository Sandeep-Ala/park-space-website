// File: /src/app/networking-systems/page.tsx
// Networking Systems Service Page - 4th Priority

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  Router, 
  Building2, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Network,
  Server
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Brand data for Networking Systems
const networkingBrands = [
  {
    id: 'cisco',
    name: 'Cisco',
    logo: '/images/brands/cisco-logo.png',
    featured: true,
    priceRange: '₹15,000 - ₹1,50,000',
    description: 'World-leading networking technology with enterprise-grade security and reliability.',
    features: [
      'Enterprise-grade performance',
      'Advanced security features',
      'Scalable architecture',
      'Cloud management ready',
      'High availability design',
      'Quality of Service (QoS)',
      'Network analytics',
      'Professional support'
    ],
    specifications: {
      'Network Speed': '1Gbps - 100Gbps',
      'Port Density': '8-48 ports per switch',
      'Management': 'CLI, Web, SNMP, Cloud',
      'Security': 'ACL, 802.1X, VPN ready',
      'Power': 'PoE+, PoE++, AC/DC',
      'Operating Temperature': '0°C to +45°C',
      'Warranty': '3 Years + Smartnet',
      'Standards': 'IEEE 802.11ac/ax, IPv6'
    },
    applications: ['Enterprise Networks', 'Data Centers', 'Campus Networks', 'WAN Connectivity']
  },
  {
    id: 'd-link',
    name: 'D-Link',
    logo: '/images/brands/d-link-logo.png',
    featured: true,
    priceRange: '₹8,000 - ₹80,000',
    description: 'Reliable networking solutions with cost-effective performance for business environments.',
    features: [
      'Cost-effective solutions',
      'Easy management interface',
      'Business-grade reliability',
      'VLAN support',
      'Link aggregation',
      'Network monitoring',
      'Energy-efficient design',
      'Flexible deployment'
    ],
    specifications: {
      'Network Speed': '100Mbps - 10Gbps',
      'Port Density': '5-28 ports per device',
      'Management': 'Web-based, SNMP',
      'Security': 'Access Control, VPN',
      'Power': 'PoE, External adapter',
      'Operating Temperature': '0°C to +40°C',
      'Warranty': '2 Years Standard',
      'Standards': 'IEEE 802.11n/ac, IPv4/IPv6'
    },
    applications: ['Small-Medium Business', 'Branch Offices', 'Retail Networks', 'Education']
  },
  {
    id: 'netgear',
    name: 'Netgear',
    logo: '/images/brands/netgear-logo.png',
    featured: false,
    priceRange: '₹6,000 - ₹60,000',
    description: 'High-performance networking gear with business-focused features and easy setup.',
    features: [
      'High-performance wireless',
      'Smart managed switches',
      'Business VPN routers',
      'Cloud management',
      'Mobile app control',
      'Guest network support',
      'Bandwidth monitoring',
      'Easy installation'
    ],
    specifications: {
      'Network Speed': '150Mbps - 6Gbps',
      'Port Density': '4-24 ports per device',
      'Management': 'Web UI, Mobile app',
      'Security': 'WPA3, Firewall, VPN',
      'Power': 'PoE, AC adapter',
      'Operating Temperature': '0°C to +40°C',
      'Warranty': '2 Years Limited',
      'Standards': 'Wi-Fi 6, Gigabit Ethernet'
    },
    applications: ['SMB Networks', 'Home Offices', 'Hospitality', 'Wireless Deployment']
  },
  {
    id: 'tp-link',
    name: 'TP-Link',
    logo: '/images/brands/tp-link-logo.png',
    featured: false,
    priceRange: '₹5,000 - ₹50,000',
    description: 'Affordable networking solutions with reliable performance for growing businesses.',
    features: [
      'Budget-friendly options',
      'Reliable connectivity',
      'Easy configuration',
      'Omada cloud management',
      'Mesh network support',
      'Basic security features',
      'Energy-saving modes',
      'Wide coverage area'
    ],
    specifications: {
      'Network Speed': '100Mbps - 2.4Gbps',
      'Port Density': '4-16 ports per device',
      'Management': 'Web interface, App',
      'Security': 'WPA2/WPA3, Basic firewall',
      'Power': 'PoE, Power adapter',
      'Operating Temperature': '0°C to +40°C',
      'Warranty': '1 Year Standard',
      'Standards': 'IEEE 802.11ac/ax'
    },
    applications: ['Small Business', 'Residential', 'Basic Office Networks', 'Budget Solutions']
  },
  {
    id: 'ubiquiti',
    name: 'Ubiquiti',
    logo: '/images/brands/ubiquiti-logo.png',
    featured: false,
    priceRange: '₹7,000 - ₹70,000',
    description: 'Enterprise-grade networking at accessible prices with unified management platform.',
    features: [
      'Enterprise features at low cost',
      'UniFi cloud management',
      'Scalable deployment',
      'Professional wireless',
      'Network analytics',
      'Zero-touch provisioning',
      'Advanced routing',
      'Centralized monitoring'
    ],
    specifications: {
      'Network Speed': '300Mbps - 4.8Gbps',
      'Port Density': '4-48 ports per switch',
      'Management': 'UniFi Controller, Cloud',
      'Security': 'Advanced firewall, DPI',
      'Power': 'PoE++, DC power',
      'Operating Temperature': '-10°C to +70°C',
      'Warranty': '1 Year Limited',
      'Standards': 'Wi-Fi 6, 10Gb Ethernet'
    },
    applications: ['Enterprise Deployment', 'Service Providers', 'Large Campuses', 'Managed Services']
  }
];

// Service applications for Networking Systems
const serviceApplications = [
  {
    title: 'Corporate Offices',
    description: 'Reliable network infrastructure for business operations',
    icon: Building2,
    features: ['Employee connectivity', 'Guest networks', 'VoIP support', 'File sharing']
  },
  {
    title: 'Data Centers',
    description: 'High-speed backbone networking for critical applications',
    icon: Server,
    features: ['10Gb+ connections', 'Redundancy', 'Low latency', 'High availability']
  },
  {
    title: 'Educational Institutions',
    description: 'Campus-wide networking for students and faculty',
    icon: Network,
    features: ['Student access', 'Research networks', 'E-learning support', 'Content filtering']
  },
  {
    title: 'Healthcare Facilities',
    description: 'Secure networking for medical systems and patient data',
    icon: Zap,
    features: ['HIPAA compliance', 'Medical device support', 'Telemedicine', 'Secure access']
  },
  {
    title: 'Retail & Hospitality',
    description: 'Customer-focused networking with point-of-sale support',
    icon: Wifi,
    features: ['Customer Wi-Fi', 'POS systems', 'Inventory management', 'Guest services']
  },
  {
    title: 'Manufacturing',
    description: 'Industrial networking for automation and monitoring',
    icon: Router,
    features: ['Industrial protocols', 'Equipment monitoring', 'SCADA systems', 'Remote access']
  },
  {
    title: 'Residential Complexes',
    description: 'Building-wide internet and smart home connectivity',
    icon: Building2,
    features: ['Resident internet', 'Smart building', 'Security systems', 'Common area Wi-Fi']
  }
];

export default function NetworkingSystemsPage() {
  const [selectedBrand, setSelectedBrand] = useState(networkingBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof networkingBrands[0]) => {
    setSelectedBrand(brand);

  };

  const handleCTAClick = (action: string) => {
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} Networking Systems. Price range: ${selectedBrand.priceRange}. Please provide more details.`;
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
                Networking Systems in
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                 Enterprise-grade networking infrastructure for reliable connectivity and business growth. 
                Professional network design, installation, and support services for all business sizes.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Gigabit Speed</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Wifi className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Wi-Fi 6 Ready</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Zap className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">24/7 Support</span>
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
                   ₹5K - ₹1.5L
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl  p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white-900 mb-4">Premium Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">Enterprise Security</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">Cloud Management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">Scalable Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">Professional Support</span>
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
               Premium Networking Brands
            </h2>
            <p className="text-xl text-purple-100">
              Industry-leading networking equipment with proven reliability and performance
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {networkingBrands.map((brand) => (
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
              Networking Applications
            </h2>
            <p className="text-xl text-purple-100">
             Professional networking solutions for diverse industries and business requirements
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
            Build Your Network Infrastructure
          </h2>
          <p className="text-xl text-purple-100 mb-8">
           Get expert network design consultation and professional installation in Hyderabad
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
              defaultService="networking-systems"
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