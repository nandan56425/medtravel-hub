'use client'

import Image from "next/image";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/hospitals', label: 'Hospitals' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/treatments', label: 'Treatments' },
  { href: '/enquiry', label: 'Contact' },
  { href: '/post-care', label: 'Post-Care' },
  { href: '/stay-recovery', label: 'Stay & Recovery' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const loggedIn =
      localStorage.getItem("isLoggedIn")

    setIsLoggedIn(!!loggedIn)

    window.addEventListener('scroll', handleScroll)

    return () =>
      window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="MedTravel Logo"
              width={180}
              height={60}
              priority
              className="object-contain"
            />

            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">
                MedTravel
              </span>

              <span className="text-xs text-muted-foreground hidden sm:block">
                Where Healing Meets Heritage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">

            <Link
              href="tel:+918214299999"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span>+91-821-4299999</span>
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn")
                  localStorage.removeItem("token")
                  window.location.href = "/login"
                }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <User className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}

            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="/enquiry">
                Book Consultation
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">

            <div className="flex flex-col gap-4">

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                >
                  {link.label}
                </Link>
              ))}

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn")
                    localStorage.removeItem("token")
                    window.location.href = "/login"
                  }}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-2"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                >
                  <User className="h-4 w-4" />
                  Login / Sign Up
                </Link>
              )}

              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-full mt-2"
              >
                <Link href="/enquiry">
                  Book Consultation
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
