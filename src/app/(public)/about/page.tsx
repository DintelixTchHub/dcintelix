import type { Metadata } from 'next'
import About from '@/legacy-pages/About'
import { createSeoMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = createSeoMetadata({
  title: 'About DCintelix | Rwanda Digital Solutions Team',
  description:
    'Meet the DCintelix team in Rwanda. We build websites, mobile apps, and custom software to help businesses serve customers and work more efficiently.',
  keywords:
    'about DCintelix, web development company Rwanda, digital agency, our team, company mission, values, Rwanda technology company',
  url: '/about',
})

export default function AboutPage() {
  return <About />
}
