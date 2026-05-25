import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export const metadata = {
  title: 'Post-Care Support | MedTravel Hub',
  description: 'Comprehensive post-treatment support including video follow-ups, remote prescription management, and Ayurvedic recovery kits.',
}

export default function PostCareLayout({
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
