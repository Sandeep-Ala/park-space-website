// File: /src/app/door-access-controllers/page.tsx
// Enhanced Door Access Controllers Page with Modern Design Theme

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, 
  Shield, 
  Smartphone, 
  Clock, 
  Lock, 
  Wrench, 
  Building, 
  Banknote, 
  Heart, 
  School, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  CreditCard,
  Settings,
  Database,
  Monitor,
  Users,
  Eye
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { trackEvent } from '@/lib/analytics';

// Enhanced Brand data for Door Access Controllers
const accessControlBrands = [
  {
    id: 'zkteco',
    name: 'ZKTeco',
    logo: '/images/brands/zkteco-logo.png',
    featured: true,
    priceRange: '₹12,000 - ₹35,000',
    description: 'Advanced access control systems with comprehensive biometric integration and cloud-based management capabilities.',
    features: [
      'Multi-modal biometric access',
      'RFID card reader support',
      'Mobile app control system',
      'Cloud-based management',
      'Multi-door control capability',
      'Real-time monitoring alerts',
      'Anti-passback technology',
      'Integration with CCTV systems'
    ],
    specifications: {
      'Authentication Methods': 'Fingerprint, Face, RFID, PIN',
      'User Capacity': '30,000 - 1,00,000 users',
      'Door Support': '1-4 doors per controller',
      'Communication': 'TCP/IP, WiFi, RS485',
      'Power Supply': '12V DC, Battery Backup',
      'Operating Temperature': '-20°C to +60°C',
      'Software': 'ZKBio Access Management',
      'Warranty': '2 Years Comprehensive'
    },
    applications: ['Corporate Offices', 'Manufacturing Plants', 'Educational Institutions', 'Healthcare Facilities']
  },
  {
    id: 'honeywell',
    name: 'Honeywell',
    logo: '/images/brands/honeywell-logo.png',
    featured: true,
    priceRange: '₹15,000 - ₹50,000',
    description: 'Enterprise-grade access control solutions with advanced security features and seamless integration capabilities.',
    features: [
      'Enterprise security architecture',
      'Advanced system integration',
      'Military-grade encryption',
      'Comprehensive visitor management',
      'Time & attendance integration',
      'Complete audit trail system',
      'Emergency lockdown features',
      'Scalable enterprise platform'
    ],
    specifications: {
      'Authentication Methods': 'Biometric, Smart Cards, Mobile',
      'User Capacity': '50,000 - 10,00,000 users',
      'Door Support': '1-32 doors per panel',
      'Communication': 'Ethernet, Serial, Wireless',
      'Power Supply': '12V DC, UPS Compatible',
      'Operating Temperature': '-40°C to +70°C',
      'Software': 'Honeywell Pro-Watch',
      'Warranty': '3 Years Enterprise Support'
    },
    applications: ['Large Enterprises', 'Government Buildings', 'Financial Institutions', 'Critical Infrastructure']
  },
  {
    id: 'hikvision-access',
    name: 'Hikvision Access',
    logo: '/images/brands/hikvision-access-logo.png',
    featured: false,
    priceRange: '₹10,000 - ₹40,000',
    description: 'Professional access control seamlessly integrated with video surveillance for comprehensive security solutions.',
    features: [
      'Video surveillance integration',
      'Advanced face recognition',
      'Anti-passback protection',
      'Fire alarm system integration',
      'Elevator access control',
      'Mobile credential support',
      'Temperature screening capability',
      'Cloud storage integration'
    ],
    specifications: {
      'Authentication Methods': 'Face, Fingerprint, Card, PIN',
      'User Capacity': '10,000 - 3,00,000 users',
      'Door Support': '1-8 doors per controller',
      'Communication': 'TCP/IP, PoE, WiFi',
      'Power Supply': '12V DC, PoE+',
      'Operating Temperature': '-30°C to +60°C',
      'Software': 'HikCentral Access Control',
      'Warranty': '2 Years Professional'
    },
    applications: ['Office Buildings', 'Retail Centers', 'Industrial Facilities', 'Mixed-Use Developments']
  },
  {
    id: 'matrix-access',
    name: 'Matrix Access',
    logo: '/images/brands/matrix-access-logo.png',
    featured: false,
    priceRange: '₹8,000 - ₹30,000',
    description: 'Comprehensive access control with integrated attendance management and cost-effective deployment options.',
    features: [
      'Multi-technology support',
      'Attendance system integration',
      'Visitor management system',
      'Anti-tailgating technology',
      'Emergency override capability',
      'Centralized management platform',
      'Custom access schedules',
      'Mobile notifications'
    ],
    specifications: {
      'Authentication Methods': 'Fingerprint, RFID, PIN, Face',
      'User Capacity': '5,000 - 50,000 users',
      'Door Support': '1-4 doors per unit',
      'Communication': 'TCP/IP, RS485, USB',
      'Power Supply': '12V DC, Battery Backup',
      'Operating Temperature': '-10°C to +55°C',
      'Software': 'Matrix Access Manager',
      'Warranty': '1 Year + Extended Options'
    },
    applications: ['SME Offices', 'Educational Facilities', 'Healthcare Centers', 'Residential Complexes']
  },
  {
    id: 'suprema-access',
    name: 'Suprema Access',
    logo: '/images/brands/suprema-access-logo.png',
    featured: false,
    priceRange: '₹20,000 - ₹60,000',
    description: 'Premium touchless access control with AI-powered recognition and advanced cybersecurity features.',
    features: [
      'Touchless biometric technology',
      'AI-powered recognition algorithms',
      'Mobile access credentials',
      'Cloud-based management system',
      'Advanced analytics dashboard',
      'Cybersecurity compliance',
      'Facial mask detection',
      'Temperature screening integration'
    ],
    specifications: {
      'Authentication Methods': 'Face, Mobile, RFID, Fingerprint',
      'User Capacity': '1,00,000 - 10,00,000 users',
      'Door Support': '1-16 doors per controller',
      'Communication': 'PoE+, WiFi 6, LTE, Bluetooth',
      'Power Supply': 'PoE+, 12V DC',
      'Operating Temperature': '-25°C to +60°C',
      'Software': 'Suprema BioStar 2',
      'Warranty': '3 Years Premium Support'
    },
    applications: ['Premium Buildings', 'High-Security Facilities', 'Smart Offices', 'Luxury Developments']
  }
];

// Enhanced Service applications for Door Access Controllers
const serviceApplications = [
  {
    title: 'Corporate Offices',
    description: 'Secure office areas, conference rooms, and restricted zones with smart access control',
    icon: Building,
    features: ['Employee access management', 'Conference room booking', 'Visitor access control', 'Executive area security']
  },
  {
    title: 'Financial Institutions',
    description: 'High-security access control for banks, ATMs, and financial service centers',
    icon: Banknote,
    features: ['Vault access control', 'ATM room security', 'Teller area access', 'Customer privacy zones']
  },
  {
    title: 'Healthcare Facilities',
    description: 'Controlled access to patient areas, medical storage, and restricted zones',
    icon: Heart,
    features: ['Patient area access', 'Medicine storage security', 'OR access control', 'Staff zone management']
  },
  {
    title: 'Educational Institutions',
    description: 'Campus security and controlled access to classrooms, labs, and facilities',
    icon: School,
    features: ['Classroom access', 'Laboratory security', 'Library access', 'Administrative areas']
  },
  {
    title: 'Government Buildings',
    description: 'Multi-level security access for sensitive government facilities and offices',
    icon: Shield,
    features: ['Security clearance levels', 'Visitor screening', 'Document storage access', 'Emergency protocols']
  },
  {
    title: 'Data Centers',
    description: 'Server room and IT infrastructure protection with biometric access control',
    icon: Database,
    features: ['Server rack access', 'Network equipment security', 'Environmental monitoring', 'Audit compliance']
  },
  {
    title: 'Residential Complexes',
    description: 'Building and apartment access management for residential developments',
    icon: Key,
    features: ['Building entry control', 'Apartment access', 'Amenity area access', 'Visitor management']
  }
];

// Enhanced Services Section
const services = [
  {
    title: 'Installation & Integration',
    description: 'Complete access control system installation with electric locks and hardware integration',
    icon: <Settings className="w-8 h-8 text-purple-400" />,
    included: [
      'Comprehensive site survey',
      'Controller and reader installation',
      'Electric lock integration',
      'Network configuration & setup',
      'System testing & commissioning',
      'Integration with existing systems'
    ]
  },
  {
    title: 'Software & Management',
    description: 'Advanced software platform for user management, access control, and monitoring',
    icon: <Monitor className="w-8 h-8 text-purple-400" />,
    included: [
      'User management system',
      'Access level configuration',
      'Real-time monitoring dashboard',
      'Comprehensive reporting suite',
      'Mobile app access',
      'Cloud management platform'
    ]
  },
  {
    title: 'Support & Maintenance',
    description: 'Ongoing technical support and maintenance to ensure reliable access control operation',
    icon: <Wrench className="w-8 h-8 text-purple-400" />,
    included: [
      '24/7 technical support',
      'Preventive maintenance schedules',
      'Software updates & patches',
      'Hardware calibration service',
      'Emergency repair support',
      'Performance optimization'
    ]
  }
];

export default function DoorAccessControllersPage() {
  const [selectedBrand, setSelectedBrand] = useState(accessControlBrands[0]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleBrandSelect = (brand: typeof accessControlBrands[0]) => {
    setSelectedBrand(brand);
  };

  const handleCTAClick = (action: string) => {
    
    if (action === 'get_quote') {
      setIsFormVisible(true);
    } else if (action === 'whatsapp') {
      const message = `Hi! I'm interested in ${selectedBrand.name} Door Access Controllers. Price range: ${selectedBrand.priceRange}. Please provide detailed information and quotation.`;
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
                Door Access Controllers in
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Advanced door access control systems from leading brands like ZKTeco, Honeywell, Hikvision, and more. 
                Comprehensive biometric, RFID, and mobile access solutions with cloud management capabilities.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Key className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Biometric Access</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">RFID Cards</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Smartphone className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Mobile Access</span>
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
                  ₹8K - ₹60K
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Complete Access Solution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Access control unit</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Electric lock installation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Software & mobile app</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">RFID cards/fobs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Installation & training</span>
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
              Premium Access Control Brands
            </h2>
            <p className="text-xl text-purple-100">
              Choose from leading door access control brands with proven reliability and advanced security features
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {accessControlBrands.map((brand) => (
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
              From installation to software management and ongoing support - comprehensive access control services
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
              Access Control Applications
            </h2>
            <p className="text-xl text-purple-100">
              Versatile door access control solutions for various industries and security requirements
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
            Streamline Your Attendance Management
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Get advanced biometric attendance systems with real-time tracking, comprehensive analytics, and seamless payroll integration in Hyderabad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCTAClick('get_quote')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get Free Demo & Quote
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
              <span>✓ Free installation</span>
              <span>✓ User training included</span>
              <span>✓ 1-3 year warranty</span>
              <span>✓ 24/7 support</span>
              <span>✓ Payroll integration</span>
            </p>
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-purple-500/50 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Get Biometric Quote</h3>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-purple-100 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>
            <LeadForm
              defaultService="biometric-attendance"
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