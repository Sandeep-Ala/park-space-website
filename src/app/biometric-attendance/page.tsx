// File: /src/app/biometric-attendance/page.tsx
// Enhanced Biometric Attendance Page with Modern Design Theme

'use client';

import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Fingerprint, 
  Clock, 
  Users, 
  BarChart3, 
  Shield, 
  Wrench, 
  Building, 
  School, 
  Factory, 
  Heart, 
  CheckCircle, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Star,
  Zap,
  Monitor,
  Settings,
  Database,
  Smartphone
} from 'lucide-react';
import LeadForm from '@/components/forms/LeadForm';
import { 
  trackServiceView,
  trackBrandSelection,
  trackWhatsAppClick,
  trackPhoneClick,
  trackQuoteRequest,
  trackEvent,
  trackLeadSubmission,
  trackBusinessEvent
} from '@/lib/analytics';

// Enhanced Brand data for Biometric Attendance Systems
const biometricBrands = [
  {
    id: 'timewatch',
    name: 'TIME WATCH',
    logo: '/images/brands/timewatch-logo.png',
    featured: true,
    priceRange: '₹8,000 - ₹25,000',
    description: 'Advanced biometric solutions with cloud integration, real-time analytics, and comprehensive attendance management capabilities.',
    features: [
      'Multi-modal biometric recognition',
      'Cloud-based data synchronization',
      'Advanced analytics dashboard',
      'Mobile app integration',
      'Real-time attendance tracking',
      'Payroll system integration',
      'Multi-location management',
      'Comprehensive reporting suite'
    ],
    specifications: {
      'Recognition Types': 'Fingerprint, Face, RFID',
      'User Capacity': '3,000 - 50,000 users',
      'Recognition Speed': '< 1 second',
      'Operating Temperature': '-10°C to +60°C',
      'Connectivity': 'TCP/IP, WiFi, USB',
      'Display': '2.8" TFT Color Screen',
      'Storage': 'Cloud + Local Backup',
      'Warranty': '2 Years Comprehensive'
    },
    applications: ['Large Enterprises', 'Multi-location Businesses', 'Manufacturing', 'Healthcare']
  },
  {
    id: 'essl',
    name: 'ESSL Security',
    logo: '/images/brands/essl-logo.png',
    featured: true,
    priceRange: '₹6,000 - ₹20,000',
    description: 'Reliable and cost-effective biometric attendance systems designed for businesses of all sizes with robust performance.',
    features: [
      'High-accuracy fingerprint recognition',
      'TCP/IP network connectivity',
      'Large user storage capacity',
      'Backup battery support',
      'Access control integration',
      'Multiple authentication modes',
      'Easy software integration',
      'Durable construction design'
    ],
    specifications: {
      'Recognition Types': 'Fingerprint, RFID, Password',
      'User Capacity': '2,000 - 30,000 users',
      'Recognition Speed': '< 1.5 seconds',
      'Operating Temperature': '-10°C to +55°C',
      'Connectivity': 'TCP/IP, RS485, USB',
      'Display': '2.4" LCD Display',
      'Storage': 'Local Database',
      'Warranty': '1 Year + Extended Support'
    },
    applications: ['SME Businesses', 'Retail Chains', 'Educational Institutions', 'Government Offices']
  },
  {
    id: 'realtime',
    name: 'Realtime',
    logo: '/images/brands/realtime-logo.png',
    featured: false,
    priceRange: '₹7,000 - ₹22,000',
    description: 'Professional grade biometric systems engineered for high-traffic environments with advanced security features.',
    features: [
      'High-speed recognition technology',
      'Weather-resistant housing',
      'Multiple authentication methods',
      'Advanced reporting capabilities',
      'API integration support',
      'Tamper detection alerts',
      'Energy-efficient operation',
      'Scalable architecture'
    ],
    specifications: {
      'Recognition Types': 'Fingerprint, Face, Card',
      'User Capacity': '5,000 - 80,000 users',
      'Recognition Speed': '< 0.8 seconds',
      'Operating Temperature': '-15°C to +60°C',
      'Connectivity': 'TCP/IP, WiFi, 4G',
      'Display': '3.5" Touch Screen',
      'Storage': 'Hybrid Cloud-Local',
      'Warranty': '2 Years Professional'
    },
    applications: ['High-Traffic Areas', 'Industrial Facilities', 'Corporate Campuses', 'Security Agencies']
  },
  {
    id: 'matrix',
    name: 'Matrix',
    logo: '/images/brands/matrix-logo.png',
    featured: false,
    priceRange: '₹10,000 - ₹35,000',
    description: 'Enterprise-grade biometric solutions with comprehensive software suite and centralized management capabilities.',
    features: [
      'Enterprise management software',
      'Centralized control system',
      'Multi-location synchronization',
      'Advanced payroll integration',
      'Comprehensive analytics suite',
      'Role-based access control',
      'Audit trail management',
      'Scalable enterprise architecture'
    ],
    specifications: {
      'Recognition Types': 'Fingerprint, Face, RFID, PIN',
      'User Capacity': '10,000 - 1,00,000 users',
      'Recognition Speed': '< 1 second',
      'Operating Temperature': '-20°C to +70°C',
      'Connectivity': 'Enterprise Network, Cloud',
      'Display': '4.3" Color Touch Screen',
      'Storage': 'Enterprise Database',
      'Warranty': '3 Years Enterprise Support'
    },
    applications: ['Large Corporations', 'Multi-site Operations', 'Enterprise Facilities', 'Government Departments']
  },
  {
    id: 'suprema',
    name: 'Suprema',
    logo: '/images/brands/suprema-logo.png',
    featured: false,
    priceRange: '₹15,000 - ₹50,000',
    description: 'Premium biometric technology with AI-powered recognition and cutting-edge security features for high-end applications.',
    features: [
      'AI-enhanced recognition algorithms',
      'Touchless biometric technology',
      'Military-grade security protocols',
      'Mobile credential support',
      'Premium build quality materials',
      'Advanced anti-spoofing technology',
      'Facial mask detection',
      'Temperature screening integration'
    ],
    specifications: {
      'Recognition Types': 'Face, Fingerprint, Mobile, RFID',
      'User Capacity': '50,000 - 5,00,000 users',
      'Recognition Speed': '< 0.5 seconds',
      'Operating Temperature': '-30°C to +60°C',
      'Connectivity': 'PoE+, WiFi 6, LTE',
      'Display': '5" HD Touch Screen',
      'Storage': 'Encrypted Cloud Storage',
      'Warranty': '3 Years Premium Support'
    },
    applications: ['Premium Facilities', 'High-Security Areas', 'Luxury Buildings', 'Defense Establishments']
  }
];

// Enhanced Service applications for Biometric Attendance
const serviceApplications = [
  {
    title: 'Corporate Offices',
    description: 'Professional employee time tracking and access control for modern workplaces',
    icon: Building,
    features: ['Employee time tracking', 'Overtime calculations', 'Leave management', 'Payroll integration']
  },
  {
    title: 'Manufacturing Units',
    description: 'Shift management and worker attendance for industrial facilities',
    icon: Factory,
    features: ['Shift scheduling', 'Production tracking', 'Safety compliance', 'Worker analytics']
  },
  {
    title: 'Educational Institutions',
    description: 'Student and staff attendance management for schools and colleges',
    icon: School,
    features: ['Student attendance', 'Staff tracking', 'Parent notifications', 'Academic integration']
  },
  {
    title: 'Healthcare Facilities',
    description: 'Medical staff attendance and patient area access control',
    icon: Heart,
    features: ['Staff scheduling', 'Department access', 'Emergency protocols', 'Compliance tracking']
  },
  {
    title: 'Retail Chains',
    description: 'Multi-location employee management and performance tracking',
    icon: Users,
    features: ['Multi-store management', 'Sales tracking', 'Performance metrics', 'Centralized reporting']
  },
  {
    title: 'Security Agencies',
    description: 'Guard attendance tracking and patrol management systems',
    icon: Shield,
    features: ['Guard scheduling', 'Patrol tracking', 'Incident reporting', 'Client reporting']
  },
  {
    title: 'Government Offices',
    description: 'Public sector employee attendance and compliance management',
    icon: BarChart3,
    features: ['Compliance tracking', 'Audit trails', 'Performance monitoring', 'Policy enforcement']
  }
];

// Enhanced Services Section
const services = [
  {
    title: 'Installation & Setup',
    description: 'Complete biometric system installation with professional configuration and user enrollment',
    icon: <Settings className="w-8 h-8 text-purple-400" />,
    included: [
      'Professional device installation',
      'Network configuration & setup',
      'Software installation & licensing',
      'Employee enrollment & training',
      'System testing & validation',
      'Integration with existing systems'
    ]
  },
  {
    title: 'Software & Analytics',
    description: 'Advanced reporting and analytics with payroll integration capabilities',
    icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
    included: [
      'Real-time attendance dashboard',
      'Comprehensive reporting suite',
      'Payroll system integration',
      'Leave management system',
      'Performance analytics',
      'Custom report generation'
    ]
  },
  {
    title: 'Support & Maintenance',
    description: 'Ongoing technical support and maintenance to ensure optimal system performance',
    icon: <Wrench className="w-8 h-8 text-purple-400" />,
    included: [
      '24/7 technical support',
      'Regular system maintenance',
      'Software updates & patches',
      'Device calibration service',
      'Emergency repair support',
      'Performance optimization'
    ]
  }
];

export default function BiometricAttendancePage() {
   const [selectedBrand, setSelectedBrand] = useState(biometricBrands[0]);
   const [isFormVisible, setIsFormVisible] = useState(false);
 
   // =============================
   // ANALYTICS TRACKING
   // =============================
 
   // Track page view when component mounts
   useEffect(() => {
     trackServiceView('biometric-attendance', 'direct-traffic');
   }, []);
 
   // Track brand selection with analytics
   const handleBrandSelect = (brand: typeof biometricBrands[0]) => {
     setSelectedBrand(brand);
     
     // Track brand selection event
     trackBrandSelection('biometric-attendance', brand.name);
     
     // Track brand interest event
     trackEvent({
       action: 'brand_interest',
       category: 'product_interaction',
       label: `biometric-attendance-${brand.name.toLowerCase()}`,
       custom_parameters: {
         brand_name: brand.name,
         price_range: brand.priceRange,
         featured: brand.featured,
         service_type: 'biometric-attendance'
       }
     });
   };
 
   // Track CTA clicks with detailed analytics
   const handleCTAClick = (action: string, source?: string) => {
     const baseParams = {
       service_type: 'biometric-attendance',
       selected_brand: selectedBrand.name,
       brand_price_range: selectedBrand.priceRange,
       click_source: source || 'unknown',
       page_section: source || 'general'
     };
 
     if (action === 'get_quote') {
       // Track quote request
       trackQuoteRequest('biometric-attendance', selectedBrand.name);
       
       // Track business conversion event
       trackBusinessEvent('demo_request', 'biometric-attendance');
       
       // Track detailed quote event
       trackEvent({
         action: 'quote_form_opened',
         category: 'lead_generation',
         label: `biometric-attendance-${selectedBrand.name}`,
         custom_parameters: {
           ...baseParams,
           form_type: 'quote_request',
           conversion_step: 'form_opened'
         }
       });
       
       setIsFormVisible(true);
       
     } else if (action === 'whatsapp') {
       // Track WhatsApp click
       trackWhatsAppClick('biometric-attendance-page', 'biometric-attendance');
       
       // Track messaging engagement
       trackEvent({
         action: 'whatsapp_engagement',
         category: 'contact',
         label: 'biometric-attendance-whatsapp',
         custom_parameters: {
           ...baseParams,
           contact_method: 'whatsapp',
           engagement_type: 'instant_messaging'
         }
       });
       
       const message = `Hi! I'm interested in ${selectedBrand.name} Boom Barriers. Price range: ${selectedBrand.priceRange}. Please provide detailed information and quotation.`;
       window.open(`https://wa.me/916302789421?text=${encodeURIComponent(message)}`, '_blank');
       
     } else if (action === 'call') {
       // Track phone click
       trackPhoneClick('biometric-attendance-page', 'biometric-attendance');
       
       // Track call engagement
       trackEvent({
         action: 'phone_engagement',
         category: 'contact',
         label: 'biometric-attendance-call',
         custom_parameters: {
           ...baseParams,
           contact_method: 'phone',
           engagement_type: 'voice_call'
         }
       });
       
       window.open('tel:+916302789421', '_self');
     }
   };
 
   // Track service interest events
   const handleServiceClick = (serviceTitle: string) => {
     trackEvent({
       action: 'service_interest',
       category: 'service_exploration',
       label: `biometric-attendance-${serviceTitle.toLowerCase().replace(/\s+/g, '-')}`,
       custom_parameters: {
         service_type: 'biometric-attendance',
         service_category: serviceTitle,
         selected_brand: selectedBrand.name
       }
     });
   };
 
   // Track application interest
   const handleApplicationClick = (applicationTitle: string) => {
     trackEvent({
       action: 'application_interest',
       category: 'use_case_exploration',
       label: `biometric-attendance-${applicationTitle.toLowerCase().replace(/\s+/g, '-')}`,
       custom_parameters: {
         service_type: 'biometric-attendance',
         application_type: applicationTitle,
         selected_brand: selectedBrand.name
       }
     });
   };
 
   // Track specification views
   const handleSpecificationView = () => {
     trackEvent({
       action: 'specification_view',
       category: 'product_research',
       label: `biometric-attendance-${selectedBrand.name}`,
       custom_parameters: {
         brand_name: selectedBrand.name,
         service_type: 'biometric-attendance',
         research_depth: 'technical_specifications'
       }
     });
   };
 
   // Track successful form submission
   const handleFormSuccess = (formData: any) => {
     // Track lead submission
     trackLeadSubmission({
       service_type: 'biometric-attendance',
       lead_source: 'biometric-attendance-page-form',
       phone_number: formData.phone,
       form_location: 'biometric-attendance-service-page'
     });
 
     // Track conversion completion
     trackEvent({
       action: 'lead_conversion_complete',
       category: 'conversion',
       label: 'biometric-attendance-form-success',
       value: 1,
       custom_parameters: {
         service_type: 'biometric-attendance',
         selected_brand: selectedBrand.name,
         lead_quality: 'hot',
         conversion_path: 'service-page-form'
       }
     });
 
     setIsFormVisible(false);
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
                Biometric Attendance in
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hyderabad</span>
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Advanced biometric attendance solutions from leading brands like TIME WATCH, ESSL, Realtime, and more. 
                Comprehensive fingerprint and face recognition systems with cloud integration and analytics.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Fingerprint className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Fingerprint Recognition</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Face Recognition</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium">Analytics & Reports</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleCTAClick('get_quote', 'hero-section')}

                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Free Quote
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleCTAClick('whatsapp', 'hero-section')}

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
                  ₹6K - ₹50K
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Complete Solution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Biometric device & installation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Attendance software</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">User training & setup</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">Real-time analytics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                      <span className="text-white">1-3 years warranty</span>
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
              Premium Biometric Brands
            </h2>
            <p className="text-xl text-purple-100">
              Choose from leading biometric attendance system brands with proven reliability and advanced features
            </p>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {biometricBrands.map((brand) => (
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
                        onClick={() => handleApplicationClick(app)}
                      
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
              From installation to analytics and ongoing support - comprehensive biometric attendance services
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
                onClick={() => handleServiceClick(service.title)}
              
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
              Biometric Attendance Applications
            </h2>
            <p className="text-xl text-purple-100">
              Versatile attendance management solutions for various industries and business types
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
                onClick={() => handleApplicationClick(application.title)}
              
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
                onClick={() => {
                  setIsFormVisible(false);
                  // Track form close event
                  trackEvent({
                    action: 'form_closed',
                    category: 'lead_generation',
                    label: 'Bio-metric-Attendance-quote-form',
                    custom_parameters: {
                      service_type: 'biometric-attendance',
                      selected_brand: selectedBrand.name,
                      close_method: 'close_button'
                    }
                  });
                }}
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
        onClick={() => handleCTAClick('whatsapp', 'floating-button')}

        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}