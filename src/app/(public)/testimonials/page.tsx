import type { Metadata } from 'next'
import Testimonials from '@/legacy-pages/Testimonials'
import { createSeoMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = createSeoMetadata({
  title: 'Share Your DCintelix Testimonial',
  description:
    'Tell us about your experience working with DCintelix and share your testimonial.',
  url: '/testimonials',
})

export default function TestimonialsPage() {
  return <Testimonials />
}
