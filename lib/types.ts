// Hospital type
export interface Hospital {
  _id: string
  name: string
  specialization: string
  description: string
  keyFeatures: string[]
  internationalPatientDesk: boolean
  languages: string[]
  location: string
  contact: string
}

// Doctor type
export interface Doctor {
  _id: string
  name: string
  hospital: string
  specialty: string
  qualifications: string[]
  experience: number
  languages: string[]
  availableForVideo: boolean
  bio: string
}

// Treatment type
export interface Treatment {
  _id: string
  name: string
  category: 'Surgery' | 'Neurosurgery' | 'Ayurveda' | 'Wellness'
  hospital: string
  costInUSD: {
    min: number
    max: number
  }
  costComparison: {
    westernAvgUSD: number
    savingsPercent: number
  }
  waitTime: string
  description: string
  successRate: string
}

// Enquiry type
export interface Enquiry {
  _id?: string
  name: string
  email: string
  phone: string
  country: string
  treatment: string
  hospital: string
  preferredDate: string
  needsVisa: boolean
  needsAirportTransfer: boolean
  needsVideoConsult: boolean
  message: string
  status?: 'new' | 'contacted' | 'booked' | 'completed'
  createdAt?: string
}

// PostCare type
export interface PostCare {
  _id?: string
  patientEmail: string
  treatment: string
  hospital: string
  doctor: string
  dischargeDate: string
  followUpDates: string[]
  videoFollowUpLink: string
  notes: string
  status: 'recovering' | 'completed'
}
