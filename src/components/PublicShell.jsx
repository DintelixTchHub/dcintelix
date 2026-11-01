'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import CookieConsent from './CookieConsent'
import StickyWhatsApp from './StickyWhatsApp'

export default function PublicShell({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
      <StickyWhatsApp />
    </div>
  )
}
