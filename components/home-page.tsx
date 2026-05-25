'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, PiggyBank, Clock, Flower2, Globe, Award, Users, Building2, Heart, Star, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { seedHospitals, seedTreatments, testimonials, journeySteps, stats } from '@/lib/data'

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

const whyMysuruFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Diagnostics',
    description: 'Cutting-edge artificial intelligence integrated into diagnostic processes for faster, more accurate results.'
  },
  {
    icon: PiggyBank,
    title: 'Cost Efficiency',
    description: 'Save up to 90% compared to Western healthcare costs without compromising on quality or outcomes.'
  },
  {
    icon: Clock,
    title: 'Minimal Wait Times',
    description: 'No lengthy queues. Most treatments can be scheduled within days, not months or years.'
  },
  {
    icon: Flower2,
    title: 'Yoga & Ayurveda Heritage',
    description: 'Access authentic traditional medicine in Mysuru - the yoga capital serving 87+ countries.'
  }
]

export function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-secondary to-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-accent/10 text-accent hover:bg-accent/20">
              <Globe className="h-3 w-3 mr-1" /> Serving 87+ Countries
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              World-Class Healthcare in the{' '}
              <span className="text-primary">Heart of India</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Mysuru — Where Advanced Medicine Meets Ancient Wellness. Experience premium healthcare with 90% cost savings and minimal wait times.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/treatments">
                  Explore Treatments <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link href="/enquiry">Book Free Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Mysuru Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Mysuru for Medical Tourism?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover why thousands of international patients choose Mysuru for their healthcare needs.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {whyMysuruFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-background/70 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Our Network</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Hospitals
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three world-class facilities offering comprehensive healthcare solutions.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {seedHospitals.map((hospital, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <Building2 className="h-7 w-7 text-primary-foreground" />
                      </div>
                      {hospital.internationalPatientDesk && (
                        <Badge variant="secondary" className="text-xs">
                          <Globe className="h-3 w-3 mr-1" /> International Desk
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{hospital.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{hospital.specialization}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{hospital.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hospital.keyFeatures.slice(0, 3).map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{hospital.languages.join(', ')}</span>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button asChild size="sm" variant="outline" className="flex-1">
                        <Link href="/doctors">View Doctors</Link>
                      </Button>
                      <Button asChild size="sm" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/enquiry">Enquire Now</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/hospitals">
                View All Hospitals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Treatments</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Treatments & Costs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing with significant savings compared to Western healthcare.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {seedTreatments.map((treatment, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant="secondary"
                        className={
                          treatment.category === 'Surgery' ? 'bg-blue-100 text-blue-700' :
                          treatment.category === 'Neurosurgery' ? 'bg-purple-100 text-purple-700' :
                          treatment.category === 'Ayurveda' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }
                      >
                        {treatment.category}
                      </Badge>
                      <Badge className="bg-success text-success-foreground">
                        {treatment.costComparison.savingsPercent}% Savings
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{treatment.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">
                        ${treatment.costInUSD.min.toLocaleString()} - ${treatment.costInUSD.max.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Western avg: ${treatment.costComparison.westernAvgUSD.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" /> {treatment.waitTime}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Award className="h-3 w-3" /> {treatment.successRate}
                      </span>
                    </div>
                    <Button asChild size="sm" className="w-full mt-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/enquiry">Get Quote</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/treatments">
                View All Treatments <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Your Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From your first enquiry to full recovery, we guide you every step of the way.
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {journeySteps.map((step, index) => (
                <motion.div key={index} variants={fadeInUp} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4 relative z-10">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Patients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from international patients who trusted us with their healthcare.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                      &ldquo;{testimonial.review}&rdquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.country} • {testimonial.treatment}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Begin Your Healing Journey?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of international patients who have experienced world-class healthcare in Mysuru. Our team is ready to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                <Link href="/enquiry">
                  Book Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8">
                <Link href="/treatments">View All Treatments</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
