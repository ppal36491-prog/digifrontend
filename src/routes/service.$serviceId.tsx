import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import servicesData from '../lib/servicesData.json'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { CursorGlow } from '@/components/CursorGlow'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackToTop } from '@/components/BackToTop'

export const Route = createFileRoute('/service/$serviceId')({
  component: ServiceDetail,
})

function ServiceDetail() {
  const { serviceId } = Route.useParams()
  const service = servicesData.services.find(s => s.id === serviceId)

  if (!service) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <CursorGlow />
        <ParticlesBackground />
        <div className="relative z-10">
          <Navbar />
          <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
            <div className="max-w-md text-center">
              <h1 className="text-5xl font-bold gradient-text">خدمت نہیں ملا</h1>
              <p className="mt-4 text-muted-foreground">معاف کریں، یہ خدمت موجود نہیں ہے۔</p>
              <Link
                to="/#services"
                className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                ← واپس جائیں
              </Link>
            </div>
          </div>
          <Footer />
        </div>
        <BackToTop />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <CursorGlow />
      <ParticlesBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                to="/#services"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Header */}
              <div className="mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl font-bold gradient-text mb-4"
                >
                  {service.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-muted-foreground"
                >
                  {service.shortDesc}
                </motion.p>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-base mb-4">
                  {service.fullDescription}
                </p>
                {(service as any).fullDescription2 && (
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {(service as any).fullDescription2}
                  </p>
                )}
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-semibold mb-6">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Website Types Section */}
              {(service as any).types && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-semibold mb-8">Our Services</h2>
                  <div className="space-y-8">
                    {(service as any).types.map((type: any, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="border border-foreground/10 rounded-2xl p-6 hover:border-foreground/30 transition-colors"
                      >
                        <h3 className="text-xl font-semibold mb-3 gradient-text">{type.title}</h3>
                        <p className="text-muted-foreground mb-4">{type.description}</p>
                        <div className="flex flex-wrap gap-3 mb-4">
                          {type.features.map((feature: string, fi: number) => (
                            <div
                              key={fi}
                              className="inline-flex items-center gap-2 text-sm text-foreground bg-foreground/5 rounded-full px-3 py-1"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm font-semibold text-foreground">{type.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Pricing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-12 p-6 rounded-xl bg-primary/5 border border-primary/20"
              >
                <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                <p className="text-foreground text-lg font-semibold">{service.price}</p>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4"
              >
                <Link
                  to="/#contact"
                  className="inline-flex items-center justify-center rounded-full gradient-primary px-8 py-3 font-medium text-primary-foreground transition-transform hover:scale-105"
                >
                  Get In Touch
                </Link>
                <Link
                  to="/#services"
                  className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-8 py-3 font-medium transition-colors hover:bg-foreground/5"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  )
}
