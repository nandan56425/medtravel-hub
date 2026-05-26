'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send, Phone, Mail, MapPin, MessageCircle, Globe, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { seedTreatments, seedHospitals } from '@/lib/data'
import { enquiryAPI } from '@/lib/api'

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  country: z.string().min(1, 'Please select your country'),
  treatment: z.string().min(1, 'Please select a treatment'),
  hospital: z.string().min(1, 'Please select a hospital'),
  preferredDate: z.string().optional(),
  needsVisa: z.boolean(),
  needsAirportTransfer: z.boolean(),
  needsVideoConsult: z.boolean(),
  message: z.string().optional(),
})

type EnquiryFormData = z.infer<typeof enquirySchema>

const countries = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia',
  'Canada', 'UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Oman', 'Bahrain',
  'Russia', 'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Indonesia',
  'Nigeria', 'Kenya', 'South Africa', 'Other'
]

export default function EnquiryPage() {
  const searchParams = useSearchParams()
  const initialTreatment = searchParams.get('treatment') || ''
  const initialDoctor = searchParams.get('doctor') || ''
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      treatment: initialTreatment,
      hospital: '',
      preferredDate: '',
      needsVisa: false,
      needsAirportTransfer: false,
      needsVideoConsult: false,
      message: initialDoctor ? `I would like to consult with ${initialDoctor}.` : '',
    },
  })

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true)
    try {
      await enquiryAPI.submit({
        ...data,
        preferredDate: data.preferredDate || new Date().toISOString(),
      })
      setIsSubmitted(true)
      toast.success('Enquiry submitted successfully! We will contact you within 24 hours.')
      reset()
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      toast.error('Failed to submit enquiry. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const needsVisa = watch('needsVisa')
  const needsAirportTransfer = watch('needsAirportTransfer')
  const needsVideoConsult = watch('needsVideoConsult')

  if (isSubmitted) {
    return (
      <ProtectedRoute>
       <main className="min-h-screen flex items-center justify-center py-32 bg-gradient-to-br from-primary/10 via-secondary to-background">
         <motion.div 
          className="max-w-lg mx-auto text-center px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-8">
            Your enquiry has been submitted successfully. Our patient coordinator will contact you within 24 hours to discuss your healthcare needs.
          </p>
          <div className="space-y-4">
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Submit Another Enquiry
            </Button>
          </div>
        </motion.div>
      </main>
    )
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
              <Send className="h-3 w-3 mr-1" /> Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Start Your Healthcare Journey
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our patient coordinator will contact you within 24 hours with a personalized treatment plan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Enquiry Form</CardTitle>
                  <CardDescription>All fields marked with * are required</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            {...register('name')}
                            className={errors.name ? 'border-destructive' : ''}
                          />
                          {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
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
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            placeholder="+1 234 567 8900"
                            {...register('phone')}
                            className={errors.phone ? 'border-destructive' : ''}
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive">{errors.phone.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country of Origin *</Label>
                          <Select
                            onValueChange={(value) => setValue('country', value)}
                            defaultValue=""
                          >
                            <SelectTrigger className={errors.country ? 'border-destructive' : ''}>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.country && (
                            <p className="text-sm text-destructive">{errors.country.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Treatment Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Treatment Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="treatment">Treatment Interested In *</Label>
                          <Select
                            onValueChange={(value) => setValue('treatment', value)}
                            defaultValue={initialTreatment}
                          >
                            <SelectTrigger className={errors.treatment ? 'border-destructive' : ''}>
                              <SelectValue placeholder="Select treatment" />
                            </SelectTrigger>
                            <SelectContent>
                              {seedTreatments.map((treatment) => (
                                <SelectItem key={treatment.name} value={treatment.name}>
                                  {treatment.name}
                                </SelectItem>
                              ))}
                              <SelectItem value="Other">Other / Not Sure</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.treatment && (
                            <p className="text-sm text-destructive">{errors.treatment.message}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hospital">Preferred Hospital *</Label>
                          <Select
                            onValueChange={(value) => setValue('hospital', value)}
                            defaultValue=""
                          >
                            <SelectTrigger className={errors.hospital ? 'border-destructive' : ''}>
                              <SelectValue placeholder="Select hospital" />
                            </SelectTrigger>
                            <SelectContent>
                              {seedHospitals.map((hospital) => (
                                <SelectItem key={hospital.name} value={hospital.name}>
                                  {hospital.name}
                                </SelectItem>
                              ))}
                              <SelectItem value="No Preference">No Preference</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.hospital && (
                            <p className="text-sm text-destructive">{errors.hospital.message}</p>
                          )}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="preferredDate">Preferred Treatment Date</Label>
                          <Input
                            id="preferredDate"
                            type="date"
                            {...register('preferredDate')}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Additional Services */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Additional Services</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                          <div className="space-y-0.5">
                            <Label htmlFor="needsVisa">Need Medical Visa Assistance?</Label>
                            <p className="text-sm text-muted-foreground">
                              We can guide you through the Ayush Portal process
                            </p>
                          </div>
                          <Switch
                            id="needsVisa"
                            checked={needsVisa}
                            onCheckedChange={(checked) => setValue('needsVisa', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                          <div className="space-y-0.5">
                            <Label htmlFor="needsAirportTransfer">Need Airport Transfer?</Label>
                            <p className="text-sm text-muted-foreground">
                              Complimentary pickup from Mysuru airport
                            </p>
                          </div>
                          <Switch
                            id="needsAirportTransfer"
                            checked={needsAirportTransfer}
                            onCheckedChange={(checked) => setValue('needsAirportTransfer', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                          <div className="space-y-0.5">
                            <Label htmlFor="needsVideoConsult">Want a Video Consultation First?</Label>
                            <p className="text-sm text-muted-foreground">
                              Speak with a specialist before traveling
                            </p>
                          </div>
                          <Switch
                            id="needsVideoConsult"
                            checked={needsVideoConsult}
                            onCheckedChange={(checked) => setValue('needsVideoConsult', checked)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your condition or any specific requirements..."
                        {...register('message')}
                        rows={4}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          Send My Enquiry <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Us Directly</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a 
                    href="https://wa.me/918214299999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <div>
                      <div className="font-medium">WhatsApp</div>
                      <div className="text-sm">+91-821-4299999</div>
                    </div>
                  </a>
                  <a 
                    href="tel:+918214299999"
                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">International Desk</div>
                      <div className="text-sm text-muted-foreground">+91-821-4299999</div>
                    </div>
                  </a>
                  <a 
                    href="mailto:care@medtravelhub.com"
                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <div className="text-sm text-muted-foreground">care@medtravelhub.com</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Location</div>
                      <div className="text-sm text-muted-foreground">
                        Mysuru, Karnataka, India
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Language Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Language Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our patient coordinators speak multiple languages to assist you better.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Arabic', 'French', 'German', 'Hindi'].map((lang) => (
                      <Badge key={lang} variant="secondary">{lang}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">24h</div>
                    <div className="text-sm text-primary-foreground/80">
                      Average Response Time
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
     </main>
   </ProtectedRoute>
  )
}
