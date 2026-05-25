import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { SkeletonGrid } from '@/components/skeleton'

export const metadata = {
  title: 'Doctors | MedTravel Hub',
  description: 'Meet our world-renowned specialists in Mysuru. Expert surgeons, Ayurvedic practitioners, and wellness consultants with decades of experience.',
}

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="pt-32 container mx-auto px-4"><SkeletonGrid count={6} /></div>}>
        {children}
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
