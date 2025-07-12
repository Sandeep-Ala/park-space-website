// src/app/terms/page.tsx
// Terms of Service page for Park Space - Legal terms and service conditions

import { Metadata } from 'next'
import { FileText, Scale, Shield, Wrench, CreditCard, AlertTriangle } from 'lucide-react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service - Park Space Hyderabad | Service Agreement & Conditions',
  description: 'Park Space terms of service for parking automation solutions in Hyderabad. Service agreements, warranty terms, and conditions for boom barriers, CCTV, and security systems.',
  keywords: 'Park Space terms of service, parking automation agreement, boom barriers warranty, CCTV service terms Hyderabad',
  canonical: '/terms'
})

export default function TermsPage() {
  const lastUpdated = "July 2025"

  const sections = [
    {
      icon: FileText,
      title: "Service Agreement",
      content: [
        "Scope of Services: Park Space provides automated parking solutions including boom barriers, CCTV systems, biometric attendance, door access controllers, fire & alarm systems, and networking solutions.",
        "Service Area: Our services are primarily available in Hyderabad, Telangana, and surrounding areas within a 100km radius.",
        "Professional Standards: All installations and maintenance work will be performed by certified technicians following industry best practices and safety standards.",
        "Customization: Services can be customized based on client requirements, site conditions, and specific security needs.",
        "Compliance: All installations will comply with local building codes, safety regulations, and applicable laws in Telangana, India."
      ]
    },
    {
      icon: CreditCard,
      title: "Pricing & Payment Terms",
      content: [
        "Quote Validity: Written quotes are valid for 30 days from the date of issue unless otherwise specified.",
        "Payment Schedule: Projects typically require 50% advance payment, 40% on delivery/installation, and 10% after successful commissioning.",
        "Payment Methods: We accept bank transfers, cheques, UPI, and cash payments for amounts as per legal limits.",
        "Price Changes: Prices may be subject to change due to material cost fluctuations or scope modifications with prior notice.",
        "GST Compliance: All prices are inclusive of applicable GST as per current tax regulations.",
        "Late Payment: Interest charges may apply on overdue payments as per the payment agreement."
      ]
    },
    {
      icon: Wrench,
      title: "Installation & Delivery",
      content: [
        "Site Survey: A detailed site survey will be conducted before installation to ensure optimal system design and placement.",
        "Installation Timeline: Standard installations are completed within 3-7 working days, depending on project complexity.",
        "Site Preparation: Client is responsible for providing necessary site preparation, electrical connections, and access permissions.",
        "Quality Assurance: All installations include system testing, calibration, and performance verification before handover.",
        "Training: Basic operation training will be provided to designated personnel upon installation completion.",
        "Commissioning: Systems will be commissioned and certified before final handover to ensure optimal performance."
      ]
    },
    {
      icon: Shield,
      title: "Warranty & Support",
      content: [
        "Product Warranty: Hardware products carry manufacturer warranties ranging from 1-3 years depending on the brand and model.",
        "Installation Warranty: Our installation work is warranted for 12 months against defects in workmanship.",
        "Warranty Coverage: Warranty covers manufacturing defects and installation issues but excludes damage due to misuse, accidents, or natural disasters.",
        "Support Services: Technical support is available during business hours with emergency support for critical systems.",
        "AMC Services: Annual Maintenance Contracts are available for ongoing support, preventive maintenance, and priority service.",
        "Replacement Policy: Defective products will be repaired or replaced as per manufacturer warranty terms."
      ]
    },
    {
      icon: Scale,
      title: "Liability & Limitations",
      content: [
        "Service Liability: Our liability is limited to the value of services provided and excludes consequential or indirect damages.",
        "System Performance: While we ensure quality installation, system performance may be affected by environmental factors beyond our control.",
        "Third-Party Products: Warranty and support for third-party products are governed by respective manufacturer terms.",
        "Force Majeure: We are not liable for delays or failures due to circumstances beyond our reasonable control.",
        "Insurance: Clients are advised to maintain appropriate insurance coverage for their property and installed systems.",
        "Indemnification: Clients agree to indemnify us against claims arising from misuse of installed systems."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Terms & Conditions",
      content: [
        "Agreement Acceptance: Use of our services constitutes acceptance of these terms and conditions.",
        "Modification Rights: We reserve the right to modify these terms with 30 days advance notice to existing clients.",
        "Governing Law: These terms are governed by the laws of Telangana, India, and disputes will be resolved in Hyderabad courts.",
        "Termination: Either party may terminate the service agreement with appropriate notice as per the signed contract.",
        "Intellectual Property: All designs, documentation, and proprietary information remain our intellectual property.",
        "Confidentiality: Both parties agree to maintain confidentiality of sensitive business information shared during the service period."
      ]
    }
  ]

  const warrantyCoverage = [
    { item: "Boom Barriers", period: "2 Years", coverage: "Motor, control unit, mechanical parts" },
    { item: "CCTV Systems", period: "2 Years", coverage: "Cameras, DVR/NVR, power supplies" },
    { item: "Biometric Systems", period: "1 Year", coverage: "Hardware, software, fingerprint reader" },
    { item: "Access Controllers", period: "2 Years", coverage: "Controller, readers, electric locks" },
    { item: "Installation Work", period: "1 Year", coverage: "Workmanship, wiring, mounting" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Terms of <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            These terms govern your use of Park Space parking automation services. Please read 
            carefully to understand your rights and obligations when using our services.
          </p>
          <div className="inline-flex items-center gap-2 text-purple-400 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <FileText className="h-5 w-5" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Service Agreement Overview</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Welcome to Park Space Automation Solutions. These Terms of Service ("Terms") constitute 
              a legal agreement between you ("Client") and Park Space ("Company") for the provision 
              of automated parking and security solutions in Hyderabad, Telangana, and surrounding areas.
            </p>
            <p className="text-gray-300 leading-relaxed">
              By engaging our services, you acknowledge that you have read, understood, and agree to 
              be bound by these terms. If you do not agree with any part of these terms, please do 
              not proceed with our services.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 flex-shrink-0">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-6">{section.title}</h3>
                  <ul className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 leading-relaxed">
                        <span className="inline-block w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Warranty Coverage Table */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-6">Warranty Coverage Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-white font-semibold pb-4">Product/Service</th>
                    <th className="text-white font-semibold pb-4">Warranty Period</th>
                    <th className="text-white font-semibold pb-4">Coverage Includes</th>
                  </tr>
                </thead>
                <tbody>
                  {warrantyCoverage.map((item, index) => (
                    <tr key={index} className="border-b border-white/10">
                      <td className="text-gray-300 py-4 font-medium">{item.item}</td>
                      <td className="text-purple-300 py-4">{item.period}</td>
                      <td className="text-gray-300 py-4">{item.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Service Standards */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Our Service Standards</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Response Times</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Quote requests: Within 24 hours</li>
                  <li>• Site surveys: Within 48 hours</li>
                  <li>• Emergency support: Within 4 hours</li>
                  <li>• Regular maintenance: As per AMC schedule</li>
                  <li>• Warranty claims: Within 24-48 hours</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Quality Assurance</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Certified technician installation</li>
                  <li>• Quality control inspections</li>
                  <li>• Performance testing and validation</li>
                  <li>• Customer training and documentation</li>
                  <li>• Follow-up and feedback collection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dispute Resolution */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Dispute Resolution</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                We are committed to resolving any disputes amicably and efficiently. Our dispute 
                resolution process follows these steps:
              </p>
              <ol className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                  <span><strong>Direct Communication:</strong> Contact our customer service team to discuss the issue and seek immediate resolution.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                  <span><strong>Escalation:</strong> If unresolved, the matter will be escalated to our management team for review and resolution.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                  <span><strong>Mediation:</strong> For complex disputes, we may engage neutral mediation services to find a mutually acceptable solution.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">4</span>
                  <span><strong>Legal Recourse:</strong> As a last resort, disputes will be resolved through appropriate legal channels in Hyderabad, Telangana.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Questions About Our Terms?</h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              If you have any questions about these Terms of Service or need clarification on any 
              aspect of our service agreement, please contact us using the information below.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Legal Department</h4>
                <a href="mailto:legal@parkspace.com" className="text-purple-100 hover:text-white">
                  legal@parkspace.com
                </a>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Customer Service</h4>
                <a href="tel:+916302789421" className="text-purple-100 hover:text-white">
                  +91 63027 89421
                </a>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Office Address</h4>
                <p className="text-purple-100 text-sm">
                  Kukatpally, Hyderabad<br/>
                  Telangana - 500072
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}