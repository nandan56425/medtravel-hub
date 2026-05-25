import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { HomePage } from '@/components/home-page'

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
