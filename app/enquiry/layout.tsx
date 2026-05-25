import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata = {
  title: 'Contact Us | MedTravel Hub',
  description: 'Submit your enquiry for medical treatment in Mysuru. Get a free consultation and personalized treatment plan within 24 hours.',
}

export default function EnquiryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        {children}
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
