'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { Stethoscope, Video, Building2, GraduationCap, Clock, Globe, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SkeletonGrid } from '@/components/skeleton'
import { fetcher } from '@/lib/api'
import { seedDoctors, seedHospitals } from '@/lib/data'
import type { Doctor } from '@/lib/types'

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

const specialties = [
  'All Specialties',
  'Cardiothoracic Surgery',
  'Neurosurgery',
  'Orthopedic & Reconstructive Surgery',
  'Oncology',
  'Ayurvedic Medicine & Panchakarma',
  'Holistic Wellness'
]

const languages = ['All Languages', 'English', 'Hindi', 'Arabic', 'French', 'German', 'Kannada']

export default function DoctorsPage() {
  const searchParams = useSearchParams()
  const initialHospital = searchParams.get('hospital') || ''
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHospital, setSelectedHospital] = useState(initialHospital)
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [videoOnly, setVideoOnly] = useState(false)

  const { data: doctors, error, isLoading } = useSWR<Doctor[]>('/api/doctors', fetcher, {
    fallbackData: seedDoctors.map((d, i) => ({ ...d, _id: String(i + 1) }))
  })

  const filteredDoctors = useMemo(() => {
    if (!doctors) return []
    
    return doctors.filter(doctor => {
      const matchesSearch = searchQuery === '' || 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesHospital = selectedHospital === '' || 
        selectedHospital === 'All Hospitals' ||
        doctor.hospital === selectedHospital
      
      const matchesSpecialty = selectedSpecialty === '' || 
        selectedSpecialty === 'All Specialties' ||
        doctor.specialty === selectedSpecialty
      
      const matchesLanguage = selectedLanguage === '' || 
        selectedLanguage === 'All Languages' ||
        doctor.languages.includes(selectedLanguage)
      
      const matchesVideo = !videoOnly || doctor.availableForVideo

      return matchesSearch && matchesHospital && matchesSpecialty && matchesLanguage && matchesVideo
    })
  }, [doctors, searchQuery, selectedHospital, selectedSpecialty, selectedLanguage, videoOnly])

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
              <Stethoscope className="h-3 w-3 mr-1" /> Expert Specialists
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Our Doctors
            </h1>
            <p className="text-lg text-muted-foreground">
              World-renowned specialists with decades of experience, dedicated to providing exceptional care for international patients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Hospital Filter */}
            <Select value={selectedHospital} onValueChange={setSelectedHospital}>
              <SelectTrigger className="w-full lg:w-[220px]">
                <Building2 className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Hospital" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Hospitals">All Hospitals</SelectItem>
                {seedHospitals.map((hospital, i) => (
                  <SelectItem key={i} value={hospital.name}>{hospital.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Specialty Filter */}
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full lg:w-[220px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty, i) => (
                  <SelectItem key={i} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Language Filter */}
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang, i) => (
                  <SelectItem key={i} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Video Consult Toggle */}
            <Button
              variant={videoOnly ? 'default' : 'outline'}
              onClick={() => setVideoOnly(!videoOnly)}
              className="gap-2"
            >
              <Video className="h-4 w-4" />
              Video Consult
            </Button>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredDoctors.length}</span> doctors
              {selectedHospital && selectedHospital !== 'All Hospitals' && (
                <span> at <span className="font-semibold text-foreground">{selectedHospital}</span></span>
              )}
            </p>
          </div>

          {isLoading ? (
            <SkeletonGrid count={6} />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Failed to load doctors</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">No doctors found matching your criteria</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('')
                setSelectedHospital('')
                setSelectedSpecialty('')
                setSelectedLanguage('')
                setVideoOnly(false)
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredDoctors.map((doctor, index) => (
                <motion.div key={doctor._id || index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0">
                          <span className="text-xl font-bold text-primary-foreground">
                            {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {doctor.name}
                            </CardTitle>
                            {doctor.availableForVideo && (
                              <Badge className="bg-success text-success-foreground shrink-0">
                                <Video className="h-3 w-3 mr-1" /> Video
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-primary font-medium">
                            {doctor.specialty}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Hospital */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4 text-primary" />
                        <span>{doctor.hospital}</span>
                      </div>

                      {/* Experience */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{doctor.experience} years experience</span>
                      </div>

                      {/* Qualifications */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span>Qualifications</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doctor.qualifications.map((qual, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {qual}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Globe className="h-4 w-4 text-primary" />
                          <span>Languages</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doctor.languages.map((lang, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-muted-foreground line-clamp-3 pt-2 border-t border-border">
                        {doctor.bio}
                      </p>

                      {/* Action Button */}
                      <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href={`/enquiry?doctor=${encodeURIComponent(doctor.name)}`}>
                          {doctor.availableForVideo ? 'Book Video Consult' : 'Request Appointment'}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
