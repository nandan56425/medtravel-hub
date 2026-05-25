'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { Heart, Clock, Award, Building2, ArrowRight, Calculator, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SkeletonGrid } from '@/components/skeleton'
import { fetcher } from '@/lib/api'
import { seedTreatments } from '@/lib/data'
import type { Treatment } from '@/lib/types'

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

const categories = ['All', 'Surgery', 'Neurosurgery', 'Ayurveda', 'Wellness']

const countries = [
  { name: 'United States', multiplier: 1 },
  { name: 'United Kingdom', multiplier: 0.9 },
  { name: 'Germany', multiplier: 0.85 },
  { name: 'Australia', multiplier: 0.95 },
  { name: 'Canada', multiplier: 0.88 },
  { name: 'UAE', multiplier: 0.75 },
  { name: 'Saudi Arabia', multiplier: 0.78 },
]

function getCategoryColor(category: string) {
  switch (category) {
    case 'Surgery':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'Neurosurgery':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    case 'Ayurveda':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    case 'Wellness':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export default function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null)

  const { data: treatments, error, isLoading } = useSWR<Treatment[]>('/api/treatments', fetcher, {
    fallbackData: seedTreatments.map((t, i) => ({ ...t, _id: String(i + 1) }))
  })

  const filteredTreatments = useMemo(() => {
    if (!treatments) return []
    if (selectedCategory === 'All') return treatments
    return treatments.filter(t => t.category === selectedCategory)
  }, [treatments, selectedCategory])

  const calculateSavings = (treatment: Treatment) => {
    const westernCost = treatment.costComparison.westernAvgUSD * selectedCountry.multiplier
    const avgCost = (treatment.costInUSD.min + treatment.costInUSD.max) / 2
    const savings = westernCost - avgCost
    return { westernCost, savings, percent: Math.round((savings / westernCost) * 100) }
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
              <Heart className="h-3 w-3 mr-1" /> Treatments & Costs
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Transparent Pricing, Exceptional Care
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive range of treatments with clear pricing and significant savings compared to Western healthcare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cost Calculator Widget */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Calculator className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">Cost Calculator</h3>
                <p className="text-sm text-primary-foreground/80">Compare costs with your country</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Your Country:</span>
              <Select 
                value={selectedCountry.name} 
                onValueChange={(value) => setSelectedCountry(countries.find(c => c.name === value) || countries[0])}
              >
                <SelectTrigger className="w-[180px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="px-6">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredTreatments.length}</span> treatments
              {selectedCategory !== 'All' && (
                <span> in <span className="font-semibold text-foreground">{selectedCategory}</span></span>
              )}
            </p>
          </div>

          {isLoading ? (
            <SkeletonGrid count={8} />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Failed to load treatments</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredTreatments.map((treatment, index) => {
                const { westernCost, savings, percent } = calculateSavings(treatment)
                
                return (
                  <motion.div key={treatment._id || index} variants={fadeInUp}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className={getCategoryColor(treatment.category)}>
                            {treatment.category}
                          </Badge>
                          <Badge className="bg-success text-success-foreground">
                            <TrendingDown className="h-3 w-3 mr-1" />
                            {percent}% Savings
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {treatment.name}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 flex-1 flex flex-col">
                        {/* Hospital */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4 text-primary" />
                          <span className="truncate">{treatment.hospital}</span>
                        </div>

                        {/* Cost */}
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-primary">
                            ${treatment.costInUSD.min.toLocaleString()} - ${treatment.costInUSD.max.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <span className="line-through">{selectedCountry.name}: ${Math.round(westernCost).toLocaleString()}</span>
                            <span className="ml-2 text-success font-medium">
                              Save ${Math.round(savings).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" /> {treatment.waitTime}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Award className="h-3 w-3" /> {treatment.successRate}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                          {treatment.description}
                        </p>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2 mt-auto">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => setSelectedTreatment(treatment)}
                          >
                            Details
                          </Button>
                          <Button asChild size="sm" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Link href={`/enquiry?treatment=${encodeURIComponent(treatment.name)}`}>
                              Get Quote
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Treatment Detail Modal */}
      {selectedTreatment && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={() => setSelectedTreatment(null)}
        >
          <motion.div 
            className="bg-background rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className={getCategoryColor(selectedTreatment.category)}>
                    {selectedTreatment.category}
                  </Badge>
                  <h2 className="text-2xl font-bold text-foreground mt-2">{selectedTreatment.name}</h2>
                  <p className="text-muted-foreground">{selectedTreatment.hospital}</p>
                </div>
                <button 
                  onClick={() => setSelectedTreatment(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Cost in Mysuru</div>
                  <div className="text-2xl font-bold text-primary">
                    ${selectedTreatment.costInUSD.min.toLocaleString()} - ${selectedTreatment.costInUSD.max.toLocaleString()}
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Western Average</div>
                  <div className="text-2xl font-bold text-muted-foreground line-through">
                    ${selectedTreatment.costComparison.westernAvgUSD.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="bg-success/10 rounded-lg p-4 flex items-center justify-between">
                <span className="text-success font-semibold">Your Savings</span>
                <span className="text-2xl font-bold text-success">
                  {selectedTreatment.costComparison.savingsPercent}% (${(selectedTreatment.costComparison.westernAvgUSD - (selectedTreatment.costInUSD.min + selectedTreatment.costInUSD.max) / 2).toLocaleString()})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Wait Time</div>
                    <div className="font-medium">{selectedTreatment.waitTime}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="font-medium">{selectedTreatment.successRate}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">About This Treatment</h3>
                <p className="text-muted-foreground leading-relaxed">{selectedTreatment.description}</p>
              </div>

              <div className="flex gap-4">
                <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={`/enquiry?treatment=${encodeURIComponent(selectedTreatment.name)}`}>
                    Get Free Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setSelectedTreatment(null)}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Not Sure Which Treatment You Need?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our medical coordinators can review your reports and recommend the best treatment options for your condition.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/enquiry">
                Get Expert Recommendation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
