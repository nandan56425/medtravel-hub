'use client'

import ProtectedRoute from '@/components/ProtectedRoute'
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

const hotels = [
  {
    name: 'Grand Mercure Mysore',
    hospital: 'Apollo BGS Hospital',
    distance: '1.2 km',
    contact: '+91 821 402 1212',
    price: '₹4,500/night',
    amenities: ['WiFi', 'Airport Pickup', 'Room Service'],
    rating: 4.5,
  },

  {
    name: 'Royal Orchid Metropole',
    hospital: 'Manipal Hospital',
    distance: '2 km',
    contact: '+91 821 525 5566',
    price: '₹5,000/night',
    amenities: ['Breakfast', 'WiFi', 'Medical Assistance'],
    rating: 4.6,
  },

  {
    name: 'Sandesh The Prince',
    hospital: 'Narayana Multispeciality Hospital',
    distance: '1.8 km',
    contact: '+91 821 243 6777',
    price: '₹3,800/night',
    amenities: ['24/7 Support', 'WiFi', 'Restaurant'],
    rating: 4.4,
  },

  {
    name: 'The Atrium Boutique Hotel',
    hospital: 'Manipal Hospital',
    distance: '1 km',
    contact: '+91 76761 39092',
    price: '₹3,200/night',
    amenities: ['WiFi', 'Parking', 'Breakfast'],
    rating: 3.9,
  },

  {
    name: 'Radisson Blu Plaza Hotel',
    hospital: 'Apollo BGS Hospital',
    distance: '3.5 km',
    contact: '+91 821 710 1234',
    price: '₹7,800/night',
    amenities: ['Luxury Rooms', 'Pool', 'Spa'],
    rating: 4.5,
  },

  {
    name: 'Hotel Continental Inn & Suites',
    hospital: 'Narayana Multispeciality Hospital',
    distance: '2.4 km',
    contact: '+91 81053 79846',
    price: '₹3,000/night',
    amenities: ['Free WiFi', 'Room Service', 'Parking'],
    rating: 4.5,
  },

  {
    name: 'The Quorum Hotel',
    hospital: 'Apollo BGS Hospital',
    distance: '2.8 km',
    contact: '+91 821 429 2777',
    price: '₹3,600/night',
    amenities: ['Restaurant', 'Conference Hall', 'WiFi'],
    rating: 3.9,
  },

  {
    name: 'Regenta Central Herald',
    hospital: 'Manipal Hospital',
    distance: '2.1 km',
    contact: '+91 91489 99012',
    price: '₹4,100/night',
    amenities: ['Gym', 'Restaurant', 'Airport Pickup'],
    rating: 4.2,
  },

  {
    name: 'The Mysore Grand',
    hospital: 'Apollo BGS Hospital',
    distance: '2.7 km',
    contact: '+91 821 000 0000',
    price: '₹3,400/night',
    amenities: ['Family Rooms', 'WiFi', 'Parking'],
    rating: 4.6,
  },

  {
    name: 'Hotel Shine International',
    hospital: 'Manipal Hospital',
    distance: '1.5 km',
    contact: '+91 98453 44888',
    price: '₹2,900/night',
    amenities: ['Budget Stay', 'AC Rooms', 'WiFi'],
    rating: 4.7,
  },
]

export default function StayRecoveryPage() {
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

              {hotels.map((hotel, index) => (
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

                        <Button>
                          Contact Hotel
                        </Button>
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            </div>
          </div>
        </section>

        </main>
      </>  
    </ProtectedRoute>
  )
}
