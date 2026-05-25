import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata = {
  title: 'Hospitals | MedTravel Hub',
  description: 'Explore world-class healthcare facilities in Mysuru, India. Multi-specialty hospitals, Ayurvedic centers, and wellness retreats with international patient support.',
}

export default function HospitalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}
