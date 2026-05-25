'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { Building2, Globe, Phone, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SkeletonGrid } from '@/components/skeleton'
import { fetcher } from '@/lib/api'
import { seedHospitals } from '@/lib/data'
import type { Hospital } from '@/lib/types'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HospitalsPage() {
  const { data: hospitals, error, isLoading } = useSWR<Hospital[]>('/api/hospitals', fetcher, {
    fallbackData: seedHospitals.map((h, i) => ({ ...h, _id: String(i + 1) }))
  })

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary/10 via-secondary to-background overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-accent/10 text-accent hover:bg-accent/20">
              <Building2 className="h-3 w-3 mr-1" /> Our Network
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              World-Class Facilities in Mysuru
            </h1>
            <p className="text-lg text-muted-foreground">
              Three premier healthcare institutions offering comprehensive medical services with dedicated international patient support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hospitals Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <SkeletonGrid count={3} />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Failed to load hospitals</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {hospitals?.map((hospital, index) => (
                <motion.div key={hospital._id || index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    {/* Hospital Header with Gradient */}
                    <div className="h-48 bg-gradient-to-br from-primary via-primary/80 to-primary/60 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Building2 className="h-20 w-20 text-primary-foreground/30" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        {hospital.internationalPatientDesk && (
                          <Badge className="bg-accent text-accent-foreground">
                            <Globe className="h-3 w-3 mr-1" /> International Patient Desk
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {hospital.name}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium text-base">
                        {hospital.specialization}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {hospital.description}
                      </p>

                      {/* Key Features */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-foreground">Key Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {hospital.keyFeatures.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                          <Users className="h-4 w-4" /> Languages Supported
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {hospital.languages.map((lang, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 pt-2 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{hospital.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 text-primary" />
                          <a href={`tel:${hospital.contact}`} className="hover:text-primary transition-colors">
                            {hospital.contact}
                          </a>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button asChild variant="outline" className="flex-1">
                          <Link href={`/doctors?hospital=${encodeURIComponent(hospital.name)}`}>
                            View Doctors
                          </Link>
                        </Button>
                        <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Link href="/enquiry">
                            Enquire Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Help Choosing the Right Hospital?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our patient coordinators can help you find the best facility for your specific treatment needs.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/enquiry">
                Get Personalized Recommendation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
