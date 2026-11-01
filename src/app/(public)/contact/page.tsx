import type { Metadata } from 'next'
import Contact from '@/legacy-pages/Contact'
import { createSeoMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = createSeoMetadata({
  title: 'Contact DCintelix | Web Design & Development Rwanda',
  description:
    'Talk to DCintelix about your website, mobile app, or software project. Contact our Kigali team to discuss your goals and next steps.',
  keywords:
    'contact DCintelix, web development inquiry, get a quote, digital agency contact, free consultation, Rwanda web development',
  url: '/contact',
})

export default function ContactPage() {
  return <Contact />
}
