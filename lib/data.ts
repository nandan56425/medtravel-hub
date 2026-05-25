import type { Hospital, Doctor, Treatment } from './types'

// Seed data for hospitals
export const seedHospitals: Omit<Hospital, '_id'>[] = [
  {
    name: 'Manipal Hospitals Mysuru',
    specialization: 'Multi-specialty',
    description: 'One of India\'s leading healthcare providers offering world-class medical services with cutting-edge AI-powered diagnostics, organ transplant programs, and comprehensive international patient support.',
    keyFeatures: [
      'AI-Powered Diagnostics',
      'Organ Transplant Center',
      'Robotic Surgery',
      'Comprehensive Cancer Care',
      '24/7 Emergency Services',
      'International Patient Lounge'
    ],
    internationalPatientDesk: true,
    languages: ['English', 'Arabic', 'Hindi', 'Kannada'],
    location: 'KRS Road, Mysuru, Karnataka 570004',
    contact: '+91-821-4299999'
  },
  {
    name: 'JSS Ayurvedic Hospital',
    specialization: 'Ayurveda & Holistic Wellness',
    description: 'A premier institution combining ancient Ayurvedic wisdom with modern diagnostic facilities. Specializing in Panchakarma therapy, we serve patients from Europe and the Middle East seeking authentic holistic healing.',
    keyFeatures: [
      'Authentic Panchakarma',
      'Modern Diagnostics',
      'Herbal Medicine Lab',
      'Yoga & Meditation Center',
      'Specialized Diet Kitchen',
      'Residential Treatment Facility'
    ],
    internationalPatientDesk: true,
    languages: ['English', 'Arabic', 'Hindi', 'German'],
    location: 'Mysuru-Ooty Road, Mysuru, Karnataka 570025',
    contact: '+91-821-2548400'
  },
  {
    name: 'Mysuru Yoga & Wellness Centre',
    specialization: 'Yoga & Rejuvenation',
    description: 'Located in the yoga capital of the world, our center welcomes guests from 87+ countries for transformative wellness experiences. We blend traditional Ashtanga yoga with modern wellness practices.',
    keyFeatures: [
      'Ashtanga Yoga Programs',
      'Meditation Retreats',
      'Naturopathy Treatments',
      'Detox Programs',
      'Wellness Consultation',
      'Long-term Stay Options'
    ],
    internationalPatientDesk: true,
    languages: ['English', 'Arabic', 'French', 'German', 'Spanish'],
    location: 'Gokulam, Mysuru, Karnataka 570002',
    contact: '+91-821-4266666'
  }
]

// Seed data for doctors
export const seedDoctors: Omit<Doctor, '_id'>[] = [
  {
    name: 'Dr. Rajesh Kumar',
    hospital: 'Manipal Hospitals Mysuru',
    specialty: 'Cardiothoracic Surgery',
    qualifications: ['MBBS', 'MS (General Surgery)', 'MCh (Cardiothoracic Surgery)', 'Fellowship - Cleveland Clinic'],
    experience: 22,
    languages: ['English', 'Hindi', 'Kannada'],
    availableForVideo: true,
    bio: 'Dr. Rajesh Kumar is a renowned cardiothoracic surgeon with over two decades of experience in complex cardiac procedures including bypass surgeries, valve replacements, and minimally invasive cardiac surgery.'
  },
  {
    name: 'Dr. Priya Nair',
    hospital: 'Manipal Hospitals Mysuru',
    specialty: 'Neurosurgery',
    qualifications: ['MBBS', 'MS (Neurosurgery)', 'Fellowship - Johns Hopkins', 'DBS Certification'],
    experience: 18,
    languages: ['English', 'Hindi', 'Malayalam'],
    availableForVideo: true,
    bio: 'Dr. Priya Nair specializes in conscious brain stimulation and advanced neurosurgical procedures. She has pioneered minimally invasive techniques for movement disorders and chronic pain management.'
  },
  {
    name: 'Dr. Suresh Rao',
    hospital: 'Manipal Hospitals Mysuru',
    specialty: 'Orthopedic & Reconstructive Surgery',
    qualifications: ['MBBS', 'MS (Orthopedics)', 'Fellowship - Royal College of Surgeons'],
    experience: 15,
    languages: ['English', 'Hindi', 'Kannada', 'Tulu'],
    availableForVideo: true,
    bio: 'Dr. Suresh Rao is an expert in limb reconstruction, joint replacement, and complex trauma surgery. He has successfully performed numerous limb re-fixation surgeries with excellent outcomes.'
  },
  {
    name: 'Dr. Anitha Sharma',
    hospital: 'Manipal Hospitals Mysuru',
    specialty: 'Oncology',
    qualifications: ['MBBS', 'MD (Medicine)', 'DM (Medical Oncology)', 'Fellowship - MD Anderson'],
    experience: 20,
    languages: ['English', 'Hindi', 'Arabic', 'Kannada'],
    availableForVideo: true,
    bio: 'Dr. Anitha Sharma is a leading oncologist specializing in personalized cancer treatment. Fluent in Arabic, she has helped numerous patients from the Middle East navigate their cancer journey.'
  },
  {
    name: 'Dr. Venkatesh Murthy',
    hospital: 'JSS Ayurvedic Hospital',
    specialty: 'Ayurvedic Medicine & Panchakarma',
    qualifications: ['BAMS', 'MD (Ayurveda)', 'PhD (Panchakarma)', 'WHO Fellowship'],
    experience: 25,
    languages: ['English', 'Hindi', 'Kannada', 'Sanskrit'],
    availableForVideo: true,
    bio: 'Dr. Venkatesh Murthy is a master of traditional Panchakarma with 25 years of experience. He has treated patients from over 40 countries and is recognized for his authentic approach to Ayurvedic healing.'
  },
  {
    name: 'Dr. Meera Iyer',
    hospital: 'JSS Ayurvedic Hospital',
    specialty: 'Holistic Wellness',
    qualifications: ['BAMS', 'MSc (Yoga Therapy)', 'Certification in Naturopathy'],
    experience: 14,
    languages: ['English', 'Hindi', 'French', 'Kannada'],
    availableForVideo: true,
    bio: 'Dr. Meera Iyer combines Ayurveda with yoga therapy and naturopathy for comprehensive wellness. Fluent in French, she specializes in treating European patients seeking holistic recovery programs.'
  }
]

// Seed data for treatments
export const seedTreatments: Omit<Treatment, '_id'>[] = [
  {
    name: 'Liver Transplant',
    category: 'Surgery',
    hospital: 'Manipal Hospitals Mysuru',
    costInUSD: { min: 25000, max: 35000 },
    costComparison: { westernAvgUSD: 300000, savingsPercent: 90 },
    waitTime: '2-5 days',
    description: 'State-of-the-art liver transplantation program with living and deceased donor options. Our team includes specialized hepatologists, transplant surgeons, and dedicated post-operative care units.',
    successRate: '92%'
  },
  {
    name: 'Lung Transplant',
    category: 'Surgery',
    hospital: 'Manipal Hospitals Mysuru',
    costInUSD: { min: 30000, max: 45000 },
    costComparison: { westernAvgUSD: 400000, savingsPercent: 91 },
    waitTime: '3-7 days',
    description: 'Comprehensive lung transplant program for end-stage lung diseases. Features advanced ECMO support, pulmonary rehabilitation, and long-term follow-up care.',
    successRate: '88%'
  },
  {
    name: 'Limb Re-fixation Surgery',
    category: 'Surgery',
    hospital: 'Manipal Hospitals Mysuru',
    costInUSD: { min: 8000, max: 15000 },
    costComparison: { westernAvgUSD: 120000, savingsPercent: 88 },
    waitTime: 'Immediate',
    description: 'Emergency and elective limb reconstruction using advanced microsurgical techniques. Includes Ilizarov method, bone grafting, and soft tissue reconstruction.',
    successRate: '94%'
  },
  {
    name: 'Conscious Brain Stimulation',
    category: 'Neurosurgery',
    hospital: 'Manipal Hospitals Mysuru',
    costInUSD: { min: 12000, max: 20000 },
    costComparison: { westernAvgUSD: 150000, savingsPercent: 89 },
    waitTime: '3-5 days',
    description: 'Deep Brain Stimulation (DBS) for Parkinson\'s disease, essential tremor, and dystonia. Performed with awake craniotomy for precise electrode placement.',
    successRate: '90%'
  },
  {
    name: 'Advanced Cardiac Surgery',
    category: 'Surgery',
    hospital: 'Manipal Hospitals Mysuru',
    costInUSD: { min: 7000, max: 12000 },
    costComparison: { westernAvgUSD: 100000, savingsPercent: 88 },
    waitTime: '2-4 days',
    description: 'Comprehensive cardiac surgery including CABG, valve repair/replacement, and minimally invasive procedures. Features hybrid operating rooms and advanced monitoring.',
    successRate: '96%'
  },
  {
    name: 'Panchakarma Therapy',
    category: 'Ayurveda',
    hospital: 'JSS Ayurvedic Hospital',
    costInUSD: { min: 1500, max: 4000 },
    costComparison: { westernAvgUSD: 10000, savingsPercent: 85 },
    waitTime: '1-2 days',
    description: 'Authentic 21-day Panchakarma detoxification program including Vamana, Virechana, Basti, Nasya, and Raktamokshana. Personalized treatment based on Prakriti analysis.',
    successRate: '95%'
  },
  {
    name: 'Ayurvedic Post-op Recovery',
    category: 'Ayurveda',
    hospital: 'JSS Ayurvedic Hospital',
    costInUSD: { min: 2000, max: 5000 },
    costComparison: { westernAvgUSD: 15000, savingsPercent: 87 },
    waitTime: '1-2 days',
    description: 'Specialized Ayurvedic recovery program for post-surgical patients. Combines herbal medicines, Abhyanga massage, and therapeutic yoga for faster healing.',
    successRate: '93%'
  },
  {
    name: 'Yoga & Rejuvenation Retreat',
    category: 'Wellness',
    hospital: 'Mysuru Yoga & Wellness Centre',
    costInUSD: { min: 500, max: 2000 },
    costComparison: { westernAvgUSD: 5000, savingsPercent: 82 },
    waitTime: 'Same day',
    description: '7-21 day immersive wellness retreat featuring Ashtanga yoga, meditation, pranayama, organic meals, and personalized wellness consultations.',
    successRate: '98%'
  }
]

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al-Rashid',
    country: 'UAE',
    treatment: 'Cardiac Surgery',
    hospital: 'Manipal Hospitals Mysuru',
    review: 'The care I received at Manipal was exceptional. From the moment I arrived, the international patient desk handled everything - visa assistance, airport pickup, and accommodation for my family. The surgery was successful, and I saved over $80,000 compared to Dubai.',
    rating: 5
  },
  {
    id: 2,
    name: 'Hans Mueller',
    country: 'Germany',
    treatment: 'Panchakarma Therapy',
    hospital: 'JSS Ayurvedic Hospital',
    review: 'I came to Mysuru skeptical about Ayurveda, but left as a believer. Dr. Murthy\'s personalized Panchakarma program helped me manage my chronic pain better than years of Western medication. The authentic approach and peaceful environment were exactly what I needed.',
    rating: 5
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    country: 'United Kingdom',
    treatment: 'Yoga Retreat & Wellness',
    hospital: 'Mysuru Yoga & Wellness Centre',
    review: 'Mysuru truly is the yoga capital of the world. My 21-day retreat was transformative - not just physically, but mentally and spiritually. The combination of traditional practices with modern amenities made it comfortable yet authentic.',
    rating: 5
  }
]

// Journey steps
export const journeySteps = [
  {
    step: 1,
    title: 'Enquire Online',
    description: 'Fill out our simple enquiry form with your medical details. Our team responds within 24 hours.'
  },
  {
    step: 2,
    title: 'Video Consultation',
    description: 'Connect with our specialists via video call to discuss your treatment options and get a personalized plan.'
  },
  {
    step: 3,
    title: 'Medical Visa',
    description: 'We assist with your medical visa application through the Ayush Portal for a smooth travel experience.'
  },
  {
    step: 4,
    title: 'Airport Transfer',
    description: 'Our team greets you at Mysuru airport with comfortable transport to your accommodation or hospital.'
  },
  {
    step: 5,
    title: 'Treatment & Recovery',
    description: 'Receive world-class treatment with dedicated post-operative care and follow-up support.'
  }
]

// Why Mysuru features
export const whyMysuruFeatures = [
  {
    icon: 'brain',
    title: 'AI-Powered Diagnostics',
    description: 'Cutting-edge artificial intelligence integrated into diagnostic processes for faster, more accurate results.'
  },
  {
    icon: 'piggyBank',
    title: 'Cost Efficiency',
    description: 'Save up to 90% compared to Western healthcare costs without compromising on quality or outcomes.'
  },
  {
    icon: 'clock',
    title: 'Minimal Wait Times',
    description: 'No lengthy queues. Most treatments can be scheduled within days, not months or years.'
  },
  {
    icon: 'lotus',
    title: 'Yoga & Ayurveda Heritage',
    description: 'Access authentic traditional medicine in Mysuru - the yoga capital serving 87+ countries.'
  }
]

// Stats
export const stats = [
  { value: '87+', label: 'Countries Served' },
  { value: '90%', label: 'Cost Savings vs Western Nations' },
  { value: '2-5', label: 'Days Average Wait Time' },
  { value: '3', label: 'World-Class Facilities' }
]
