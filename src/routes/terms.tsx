import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { CursorGlow } from '@/components/CursorGlow'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackToTop } from '@/components/BackToTop'

export const Route = createFileRoute('/terms')({
  component: TermsAndConditions,
})

function TermsAndConditions() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <CursorGlow />
      <ParticlesBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/#home"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="prose prose-invert max-w-none"
            >
              <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-4">Terms and Conditions</h1>
              
              <p className="text-muted-foreground mb-8">
                <strong>Last Updated: 21/05/2026</strong>
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                Welcome to Digi Mate Tech Digital Private Limited. By accessing our website www.digimatetechdigital.com, you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use our services.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6">1. Definitions</h2>
              <ul className="text-muted-foreground space-y-3 mb-8 list-disc list-inside">
                <li><strong>"Company," "we," "us," or "our"</strong> refers to Digi Mate Tech Digital Private Limited, located at 2 Ground Floor, Pr Plaza, Vaishali Nagar, Jaipur, Rajasthan 302021.</li>
                <li><strong>"You"</strong> refers to the user or visitor of our website and services.</li>
                <li><strong>"Services"</strong> refer to all offerings provided by our company, including but not limited to:
                  <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                    <li>Website Development</li>
                    <li>WhatsApp Marketing Software</li>
                    <li>Facebook Marketing Software</li>
                    <li>CRM Services</li>
                    <li>SEO Plans</li>
                    <li>SMM Plans</li>
                    <li>Digital Marketing</li>
                    <li>YouTube Advertising</li>
                    <li>Advertisement Services</li>
                    <li>Google Ads</li>
                    <li>Meta Ads</li>
                    <li>Poster Making</li>
                    <li>Graphic Design</li>
                    <li>Game Development</li>
                    <li>Profile Management Services</li>
                  </ul>
                </li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">2. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                By accessing and using our website and services, you acknowledge that you have read, understood, and agreed to these terms. We reserve the right to modify these terms at any time. Continued use of our services after changes constitute acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6">3. User Obligations</h2>
              <ul className="text-muted-foreground space-y-3 mb-8 list-disc list-inside">
                <li>You must be at least 18 years old to use our services.</li>
                <li>You agree not to use our website or services for any unlawful purpose.</li>
                <li>You will provide accurate and complete information when required.</li>
                <li>You agree not to copy, reproduce, or exploit any part of our services without our written permission.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">4. Service Terms</h2>
              <ul className="text-muted-foreground space-y-3 mb-8 list-disc list-inside">
                <li>We strive to provide accurate and high-quality services, but we do not guarantee uninterrupted availability.</li>
                <li>Prices and service offerings may change without prior notice.</li>
                <li>Refunds and cancellations are subject to our refund policy.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">5. Intellectual Property Rights</h2>
              <ul className="text-muted-foreground space-y-3 mb-8 list-disc list-inside">
                <li>All content, logos, graphics, and materials on our website are the intellectual property of Digi Mate Tech Digital Private Limited.</li>
                <li>Unauthorized use, reproduction, or distribution of our content is strictly prohibited.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">6. Limitation of Liability</h2>
              <ul className="text-muted-foreground space-y-3 mb-8 list-disc list-inside">
                <li>We shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services.</li>
                <li>We do not guarantee specific results from our digital marketing, SEO, or advertising services.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">7. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our website may contain links to third-party websites. We are not responsible for the content or practices of these external sites.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6">8. Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your use of our website is also governed by our <Link to="/privacy" className="text-foreground hover:gradient-text">Privacy Policy</Link>. Please review it to understand how we collect and use your data.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6">9. Termination of Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We reserve the right to suspend or terminate your access to our services at any time for violations of these terms.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                These terms shall be governed and construed in accordance with the laws of India.
              </p>

              <h2 className="text-2xl font-bold mt-12 mb-6">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For any questions regarding these Terms and Conditions, please contact us at:
              </p>
              <ul className="text-muted-foreground space-y-2 mb-8 list-disc list-inside">
                <li><strong>Email:</strong> info@digimatetechdigital.com</li>
                <li><strong>Phone:</strong> +91 78773 22809</li>
                <li><strong>Address:</strong> 2 Ground Floor, Pr Plaza, Vaishali Nagar, Jaipur, Rajasthan 302021</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed mt-10 pt-10 border-t border-white/10">
                By using our website and services, you acknowledge and agree to these Terms and Conditions.
              </p>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
      <BackToTop />
    </div>
  )
}
