import type { Metadata } from 'next'
import Blogs from '@/legacy-pages/Blogs'
import { createSeoMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = createSeoMetadata({
  title: 'Web Development & Digital Business Insights | DCintelix',
  description:
    'Practical insights on web development, mobile apps, user experience, and digital growth from the DCintelix team.',
  keywords:
    'blog, articles, web development tips, digital marketing, business growth, technology insights',
  url: '/blogs',
})

export default function BlogsPage() {
  return <Blogs />
}
