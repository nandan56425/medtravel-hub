'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import {
  Hotel,
  MapPin,
  Phone,
  Star,
  Building2,
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json())

export default function StayRecoveryPage() {

  const [selectedHotel, setSelectedHotel] = useState<any>(null)
  
  const {
    data: hotels,
    error,
    isLoading,
  } = useSWR('/api/hotels', fetcher)
  
  return (
    <ProtectedRoute>
      <>
        <Navbar />

        <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-primary/10 via-secondary to-background overflow-hidden">
          <div className="container mx-auto px-4 text-center">

            <Badge className="mb-6 bg-accent/10 text-accent">
              <Hotel className="h-3 w-3 mr-1" />
              Patient Accommodation
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stay & Recovery
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comfortable accommodation options near our partner hospitals
              for patients and accompanying family members.
            </p>
          </div>
        </section>

        {/* Hotels */}
        <section className="py-20">
          <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {isLoading ? (
  <p className="text-center col-span-full">
    Loading hotels...
  </p>
) : hotels && hotels.length > 0 ? (
  hotels.map((hotel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300">

                    <div className="h-48 bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center">
                      <Hotel className="h-20 w-20 text-white/30" />
                    </div>

                    <CardContent className="p-6 space-y-4">

                      <div>
                        <h2 className="text-xl font-bold mb-2">
                          {hotel.name}
                        </h2>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {hotel.rating} Rating
                        </div>
                      </div>

                      <div className="space-y-2">

                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="h-4 w-4 text-primary" />
                          Near {hotel.hospital}
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          {hotel.distance} away
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-primary" />
                          {hotel.contact}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map((item, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <span className="font-semibold text-primary">
                          {hotel.price}
                        </span>

                        <Button
                          onClick={() => setSelectedHotel(hotel)}
                        >
                          Contact Hotel
                        </Button>
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              ))
) : (
  <p className="text-center col-span-full">
    No hotels found.
  </p>
)}

            </div>
          </div>
        </section>
          {selectedHotel && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-background rounded-xl p-6 w-[90%] max-w-md shadow-xl">

      <h2 className="text-2xl font-bold mb-4">
        {selectedHotel.name}
      </h2>

      <div className="space-y-3">

        <p>
          <strong>Hospital:</strong>{" "}
          {selectedHotel.hospital}
        </p>

        <p>
          <strong>Distance:</strong>{" "}
          {selectedHotel.distance}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {selectedHotel.contact}
        </p>

        <div className="flex gap-2">

          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(
                selectedHotel.contact
              )

              alert(
                'Phone number copied!'
              )
            }}
          >
            Copy Number
          </Button>

          <Button
            asChild
          >
            <a
              href={`tel:${selectedHotel.contact}`}
            >
              Call Now
            </a>
          </Button>

        </div>

      </div>

      <Button
        variant="outline"
        className="w-full mt-6"
        onClick={() =>
          setSelectedHotel(null)
        }
      >
        Close
      </Button>

    </div>

  </div>
)}

        </main>
      </>  
    </ProtectedRoute>
  )
}
