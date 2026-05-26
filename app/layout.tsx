import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'MedTravel | Where Healing Meets Heritage',
  description: 'Premium medical tourism connecting international patients from 87+ countries to world-class healthcare in Mysuru, India. Experience 90% cost savings with minimal wait times.',
  keywords: ['medical tourism', 'Mysuru healthcare', 'India hospitals', 'affordable surgery', 'ayurveda', 'wellness retreat'],
  openGraph: {
    title: 'MedTravel | Where Healing Meets Heritage',
    description: 'World-class healthcare in Mysuru, India. 90% cost savings vs Western nations.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        <Toaster position="top-right" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
