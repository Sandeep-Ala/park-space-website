// src/app/privacy/page.tsx
// Privacy Policy page for Park Space - Legal compliance and data protection

import { Metadata } from 'next'
import { Shield, Lock, Eye, UserCheck, Database, Phone } from 'lucide-react'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Privacy Policy - Park Space Hyderabad | Data Protection & Security',
  description: 'Park Space privacy policy outlines how we collect, use, and protect your personal information when you use our parking automation services in Hyderabad.',
  keywords: 'Park Space privacy policy, data protection, security systems privacy, Hyderabad parking automation privacy',
  canonical: '/privacy'
})

export default function PrivacyPage() {
  const lastUpdated = "July 2025"

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, phone number, email address, and company details when you submit inquiries or request quotes.",
        "Property Information: Address, property type, and specific requirements for our parking automation services.",
        "Communication Records: Records of phone calls, WhatsApp messages, emails, and in-person consultations.",
        "Technical Information: IP address, browser type, device information, and website usage data through cookies.",
        "Service Data: Installation details, maintenance records, and service history for our clients."
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Service Delivery: To provide quotes, schedule installations, and deliver parking automation services.",
        "Communication: To respond to inquiries, provide customer support, and send service updates.",
        "Business Operations: To process payments, maintain service records, and manage client relationships.",
        "Marketing: To send relevant information about our services (with your consent) and improve our offerings.",
        "Legal Compliance: To comply with applicable laws and regulations in Telangana, India."
      ]
    },
    {
      icon: Lock,
      title: "Information Security",
      content: [
        "Data Encryption: All sensitive data is encrypted both in transit and at rest using industry-standard protocols.",
        "Access Control: Only authorized personnel have access to your personal information on a need-to-know basis.",
        "Secure Storage: Customer data is stored on secure servers with regular backups and security updates.",
        "Third-Party Security: We ensure that any third-party service providers maintain appropriate security standards.",
        "Regular Audits: We conduct regular security audits and assessments to protect your information."
      ]
    },
    {
      icon: UserCheck,
      title: "Information Sharing",
      content: [
        "Service Providers: We may share information with trusted partners who help us deliver services (installation teams, suppliers).",
        "Legal Requirements: We may disclose information if required by law or legal proceedings.",
        "Business Transfers: In case of merger, acquisition, or sale, customer information may be transferred to the new entity.",
        "Consent-Based Sharing: We will only share your information with your explicit consent for any other purposes.",
        "No Sale of Data: We do not sell, rent, or trade your personal information to third parties for marketing purposes."
      ]
    },
    {
      icon: Shield,
      title: "Your Rights",
      content: [
        "Access Rights: You can request access to the personal information we hold about you.",
        "Correction Rights: You can request correction of any inaccurate or incomplete information.",
        "Deletion Rights: You can request deletion of your personal information (subject to legal requirements).",
        "Opt-Out Rights: You can opt out of marketing communications at any time.",
        "Data Portability: You can request a copy of your data in a portable format."
      ]
    },
    {
      icon: Phone,
      title: "Contact & Updates",
      content: [
        "Data Controller: Park Space Automation Solutions, Hyderabad, Telangana, India.",
        "Contact Email: privacy@parkspace.com for all privacy-related inquiries.",
        "Phone Contact: +91 98765 43210 for urgent privacy concerns.",
        "Policy Updates: We will notify you of any significant changes to this privacy policy.",
        "Effective Date: This policy is effective from July 2025 and will be reviewed annually."
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Privacy <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Your privacy is important to us. This policy explains how Park Space collects, uses, 
            and protects your personal information when you use our parking automation services.
          </p>
          <div className="inline-flex items-center gap-2 text-purple-400 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Shield className="h-5 w-5" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Park Space Automation Solutions ("we," "our," or "us") is committed to protecting your privacy 
              and ensuring the security of your personal information. This Privacy Policy applies to all 
              users of our website, customers, and anyone who interacts with our parking automation services 
              in Hyderabad, Telangana, and surrounding areas. By using our services, you consent to the 
              practices described in this policy.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
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

      {/* Cookies Policy */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
            <h3 className="text-2xl font-bold text-white mb-6">Cookie Policy</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Our website uses cookies to enhance your browsing experience and improve our services. 
                Cookies are small text files stored on your device that help us:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Remember your preferences and settings</li>
                <li>• Analyze website traffic and user behavior</li>
                <li>• Provide personalized content and recommendations</li>
                <li>• Track the effectiveness of our marketing campaigns</li>
                <li>• Ensure website security and prevent fraud</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences. However, disabling 
                cookies may affect the functionality of our website and your user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Data Retention</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes 
                outlined in this privacy policy, unless a longer retention period is required by law:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Customer Data</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Active customer records: Duration of service relationship</li>
                    <li>• Service history: 7 years after last service</li>
                    <li>• Payment records: 7 years for tax compliance</li>
                    <li>• Warranty information: Duration of warranty period</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Inquiry Data</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Quote requests: 2 years from inquiry date</li>
                    <li>• Marketing communications: Until opt-out</li>
                    <li>• Website analytics: 26 months maximum</li>
                    <li>• Communication logs: 3 years for quality assurance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Transfers */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">International Data Transfers</h3>
            <p className="text-gray-300 leading-relaxed">
              Your personal information is primarily stored and processed in India. However, some of our 
              service providers (such as cloud hosting services) may be located outside India. When we 
              transfer your data internationally, we ensure appropriate safeguards are in place to protect 
              your information in accordance with applicable data protection laws.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Privacy Questions or Concerns?</h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or how we handle your personal information, 
              please don't hesitate to contact us using the methods below.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
                <a href="mailto:privacy@parkspace.com" className="text-purple-100 hover:text-white">
                  privacy@parkspace.com
                </a>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Phone</h4>
                <a href="tel:+919876543210" className="text-purple-100 hover:text-white">
                  +91 98765 43210
                </a>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">Address</h4>
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