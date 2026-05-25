'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppButton() {
  const phoneNumber = '918214299999'
  const message = encodeURIComponent('Hello! I am interested in learning more about medical treatment options at MedTravel Hub in Mysuru.')
  
  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-accent-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us
      </span>
    </a>
  )
}
