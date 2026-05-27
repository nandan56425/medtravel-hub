'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Globe,
  CheckCircle2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Switch } from '@/components/ui/switch'

import { seedTreatments, seedHospitals } from '@/lib/data'

const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  country: z.string().min(1),
  treatment: z.string().min(1),
  hospital: z.string().min(1),
  preferredDate: z.string().optional(),
  needsVisa: z.boolean(),
  needsAirportTransfer: z.boolean(),
  needsVideoConsult: z.boolean(),
  message: z.string().optional(),
})

type EnquiryFormData = z.infer<typeof enquirySchema>

const countries = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Canada',
  'UAE',
  'Saudi Arabia',
  'India',
  'Singapore',
]

export default function EnquiryPage() {
  const searchParams = useSearchParams()

  const initialTreatment =
    searchParams.get('treatment') || ''

  const initialDoctor =
    searchParams.get('doctor') || ''

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [isSubmitted, setIsSubmitted] =
    useState(false)

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
      message: initialDoctor
        ? `I would like to consult with ${initialDoctor}.`
        : '',
    },
  })

  const onSubmit = async (
  data: EnquiryFormData
) => {

  setIsSubmitting(true)

  try {

    const response = await fetch(
      '/api/enquiries',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          ...data,

          preferredDate:
            data.preferredDate ||
            new Date().toISOString(),
        }),
      }
    )

    if (response.ok) {

      setIsSubmitted(true)

      toast.success(
        'Enquiry submitted successfully!'
      )

      reset()

    } else {

      toast.error(
        'Failed to submit enquiry'
      )

    }

  } catch (error) {

    console.error(error)

    toast.error(
      'Something went wrong'
    )

  } finally {

    setIsSubmitting(false)

  }
}
  const needsVisa = watch('needsVisa')
  const needsAirportTransfer = watch(
    'needsAirportTransfer'
  )

  const needsVideoConsult = watch(
    'needsVideoConsult'
  )

  if (isSubmitted) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen flex items-center justify-center py-32 bg-gradient-to-br from-primary/10 via-secondary to-background">
          <motion.div
            className="max-w-lg mx-auto text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>

            <h1 className="text-3xl font-bold mb-4">
              Thank You!
            </h1>

            <p className="text-muted-foreground mb-8">
              Your enquiry has been submitted successfully.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

  <Button
    onClick={() => setIsSubmitted(false)}
    variant="outline"
  >
    Submit Another Enquiry
  </Button>

  <Button asChild>
    <a href="/my-enquiries">
      My Enquiries
    </a>
  </Button>

</div>
          </motion.div>
        </main>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen">
        <section className="relative py-32 bg-gradient-to-br from-primary/10 via-secondary to-background overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge className="mb-6 bg-accent/10 text-accent">
                <Send className="h-3 w-3 mr-1" />
                Get in Touch
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Start Your Healthcare Journey
              </h1>

              <p className="text-lg text-muted-foreground">
                Fill out the form below and our
                patient coordinator will contact
                you within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Enquiry Form
                </CardTitle>

                <CardDescription>
                  All fields marked with * are
                  required
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Full Name"
                      {...register('name')}
                    />

                    <Input
                      placeholder="Email"
                      {...register('email')}
                    />

                    <Input
                      placeholder="Phone"
                      {...register('phone')}
                    />

                    <Select
                      onValueChange={(value) =>
                        setValue('country', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>

                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem
                            key={country}
                            value={country}
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Textarea
                    placeholder="Additional message..."
                    {...register('message')}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'Submitting...'
                      : 'Send My Enquiry'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  )
}
