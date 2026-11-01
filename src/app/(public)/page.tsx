import type { Metadata } from 'next'
import Home from '@/legacy-pages/Home'
import { createSeoMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = createSeoMetadata({
  title: 'Web Design & Development in Rwanda | DCintelix',
  description:
    'DCintelix builds websites, mobile apps, and custom software for businesses in Rwanda, with SEO and digital marketing to help you grow online.',
  keywords:
    'web development Rwanda, website design Rwanda, web design Kigali, web development Kigali, software development Rwanda, mobile app development Rwanda, SEO services Rwanda, digital marketing Rwanda, e-commerce website development Rwanda, custom software Rwanda',
  url: '/',
})

export default function HomePage() {
  return <Home />
}
