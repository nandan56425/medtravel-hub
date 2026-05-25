import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata = {
  title: 'Treatments & Costs | MedTravel Hub',
  description: 'Explore transparent pricing for medical treatments in Mysuru. Save up to 90% on surgeries, Ayurveda, and wellness programs compared to Western healthcare.',
}

export default function TreatmentsLayout({
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
