'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Heart, Video, Pill, Package, LogIn, Calendar, ClipboardList, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { postCareAPI } from '@/lib/api'
import type { PostCare } from '@/lib/types'

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

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  enquiryId: z.string().min(1, 'Please enter your enquiry ID'),
})

type LoginFormData = z.infer<typeof loginSchema>

const postCareFeatures = [
  {
    icon: Video,
    title: 'Video Follow-up Consultations',
    description: 'Connect with your treating doctor via secure video calls for post-operative checkups and consultations.',
  },
  {
    icon: Pill,
    title: 'Remote Prescription Management',
    description: 'Receive prescriptions and medication guidance remotely, with options for international shipping.',
  },
  {
    icon: Package,
    title: 'Ayurvedic Home Recovery Kits',
    description: 'Custom-curated recovery kits with Ayurvedic supplements and healing products delivered to your doorstep.',
  },
]

const timelineSteps = [
  {
    step: 1,
    title: 'Discharge',
    description: 'Receive detailed discharge summary and care instructions',
  },
  {
    step: 2,
    title: 'Video Follow-up',
    description: 'Scheduled video calls with your doctor at 1 week and 1 month',
  },
  {
    step: 3,
    title: 'Remote Monitoring',
    description: 'Regular check-ins and support via WhatsApp and email',
  },
  {
    step: 4,
    title: 'Full Recovery',
    description: 'Final assessment and clearance from your medical team',
  },
]

export default function PostCarePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [postCareData, setPostCareData] = useState<PostCare[] | null>(null)
  const [showLoginForm, setShowLoginForm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const result = await postCareAPI.getByEmail(data.email)
      if (result && result.length > 0) {
        setPostCareData(result)
        toast.success('Post-care records found!')
      } else {
        toast.error('No post-care records found for this email. Please contact our support team.')
      }
    } catch (error) {
      console.error('Error fetching post-care data:', error)
      toast.error('Unable to fetch records. Please try again or contact support.')
    } finally {
      setIsLoading(false)
    }
  }

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
              <Heart className="h-3 w-3 mr-1" /> Continued Care
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Your Care Doesn&apos;t End When You Leave Mysuru
            </h1>
            <p className="text-lg text-muted-foreground">
              We provide comprehensive post-treatment support including video follow-ups, remote prescription management, and Ayurvedic recovery kits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Post-Care Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {postCareFeatures.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow text-center">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
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

      {/* Patient Portal */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {postCareData ? (
              // Show patient data
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      Your Post-Care Dashboard
                    </CardTitle>
                    <CardDescription>Welcome back! Here are your care details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {postCareData.map((record, index) => (
                      <div key={index} className="space-y-4 p-4 bg-background rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Treatment</div>
                            <div className="font-medium">{record.treatment}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Hospital</div>
                            <div className="font-medium">{record.hospital}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Doctor</div>
                            <div className="font-medium">{record.doctor}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Status</div>
                            <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                              {record.status === 'completed' ? 'Completed' : 'Recovering'}
                            </Badge>
                          </div>
                        </div>
                        {record.videoFollowUpLink && (
                          <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                            <a href={record.videoFollowUpLink} target="_blank" rel="noopener noreferrer">
                              <Video className="mr-2 h-4 w-4" /> Join Video Follow-up
                            </a>
                          </Button>
                        )}
                        {record.notes && (
                          <div className="p-3 bg-secondary/50 rounded-lg">
                            <div className="text-sm text-muted-foreground mb-1">Doctor&apos;s Notes</div>
                            <div className="text-sm">{record.notes}</div>
                          </div>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setPostCareData(null)} className="w-full">
                      Log Out
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : showLoginForm ? (
              // Show login form
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <LogIn className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Patient Portal Login</CardTitle>
                    <CardDescription>
                      Enter your email and enquiry ID to access your post-care dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          {...register('email')}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="enquiryId">Enquiry ID</Label>
                        <Input
                          id="enquiryId"
                          placeholder="MTH-2024-XXXXX"
                          {...register('enquiryId')}
                          className={errors.enquiryId ? 'border-destructive' : ''}
                        />
                        {errors.enquiryId && (
                          <p className="text-sm text-destructive">{errors.enquiryId.message}</p>
                        )}
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Checking...' : 'Access My Dashboard'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        className="w-full"
                        onClick={() => setShowLoginForm(false)}
                      >
                        Back
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              // Show login prompt
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <Card>
                  <CardHeader>
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <ClipboardList className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Patient Portal</CardTitle>
                    <CardDescription>
                      Access your post-care dashboard to view follow-up schedules, video consultation links, and recovery notes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setShowLoginForm(true)}
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <LogIn className="mr-2 h-4 w-4" /> Access Patient Portal
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Don&apos;t have an account? Your portal access will be created after your treatment at MedTravel Hub.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* How Post-Care Works */}
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
              How Post-Care Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From discharge to full recovery, we&apos;re with you every step of the way.
            </p>
          </motion.div>

          <motion.div 
            className="relative max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {timelineSteps.map((step, index) => (
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions About Post-Care?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Our patient support team is available 24/7 to assist with any concerns about your recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="https://wa.me/918214299999" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href="mailto:care@medtravelhub.com">
                  Email Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
