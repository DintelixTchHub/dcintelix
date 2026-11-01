import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import ClientProviders from '../components/ClientProviders'
import './globals.css'

const siteTitle = 'Web Design & Development in Rwanda | DCintelix'
const siteDescription =
  'DCintelix builds websites, mobile apps, and custom software for businesses in Rwanda, with SEO and digital marketing to help you grow online.'
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebService',
  name: 'DCintelix',
  alternateName: 'DCintelix Ltd',
  url: 'https://www.dcintelix.rw',
  logo: 'https://www.dcintelix.rw/logo1.png',
  description:
    'Web design, web development, mobile app development, custom software, SEO, and digital marketing services for businesses in Rwanda.',
  serviceType: [
    'Web design',
    'Web development',
    'Mobile app development',
    'Custom software development',
    'Search engine optimization',
    'Digital marketing',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kigali',
    addressCountry: 'RW',
  },
  areaServed: 'RW',
  priceRange: 'RW',
  sameAs: [
    'https://www.linkedin.com/company/dcintelix',
    'https://twitter.com/dcintelix',
    'https://www.facebook.com/dcintelix',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+250 789 356 233',
    email: 'info@dcintelix.rw',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.dcintelix.rw/contact',
    'query-input': 'required name=search_term_string',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dcintelix.rw'),
  title: siteTitle,
  description: siteDescription,
  keywords:
    'web development Rwanda, website design Rwanda, web design Kigali, web development Kigali, software development Rwanda, mobile app development Rwanda, SEO services Rwanda, digital marketing Rwanda, e-commerce website development Rwanda, custom software Rwanda',
  authors: [{ name: 'DCintelix - Digital Solutions Company' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://www.dcintelix.rw/',
    title: siteTitle,
    description: siteDescription,
    siteName: 'DCintelix',
    locale: 'en_US',
    images: ['/logo2.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/logo2.png'],
  },
  icons: {
    icon: '/logo2.png',
    apple: '/logo2.png',
  },
  other: {
    'geo.region': 'RW',
    'geo.country': 'Rwanda',
    'geo.placename': 'Kigali',
    'theme-color': '#2563eb',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TRT0S53R78"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-TRT0S53R78');`}
        </Script>
      </body>
    </html>
  )
}
