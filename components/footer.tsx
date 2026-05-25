import Link from 'next/link'
import { Phone, Mail, MapPin, Globe } from 'lucide-react'

const quickLinks = [
  { href: '/hospitals', label: 'Hospitals' },
  { href: '/doctors', label: 'Find a Doctor' },
  { href: '/treatments', label: 'Treatments & Costs' },
  { href: '/enquiry', label: 'Make an Enquiry' },
  { href: '/post-care', label: 'Post-Care Support' },
]

const treatments = [
  { href: '/treatments?category=Surgery', label: 'Organ Transplants' },
  { href: '/treatments?category=Surgery', label: 'Cardiac Surgery' },
  { href: '/treatments?category=Neurosurgery', label: 'Neurosurgery' },
  { href: '/treatments?category=Ayurveda', label: 'Ayurveda & Panchakarma' },
  { href: '/treatments?category=Wellness', label: 'Yoga & Wellness' },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">MedTravel Hub</span>
                <span className="text-xs text-background/60">Where Healing Meets Heritage</span>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Premium medical tourism connecting international patients from 87+ countries to world-class healthcare in Mysuru, India.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/70">
              <Globe className="h-4 w-4" />
              <span>English</span>
              <span className="mx-1">|</span>
              <span>Arabic</span>
              <span className="mx-1">|</span>
              <span>French</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Popular Treatments</h4>
            <ul className="space-y-3">
              {treatments.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent mt-0.5" />
                <div className="text-sm">
                  <p className="text-background/70">International Desk</p>
                  <a href="tel:+918214299999" className="hover:text-accent transition-colors">
                    +91-821-4299999
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-accent mt-0.5" />
                <div className="text-sm">
                  <p className="text-background/70">Email</p>
                  <a href="mailto:care@medtravelhub.com" className="hover:text-accent transition-colors">
                    care@medtravelhub.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div className="text-sm">
                  <p className="text-background/70">Location</p>
                  <span>Mysuru, Karnataka, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60">
              {new Date().getFullYear()} MedTravel Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/60">
              <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-accent transition-colors">Medical Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
