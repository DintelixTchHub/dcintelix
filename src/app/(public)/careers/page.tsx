import type { Metadata } from 'next'
import Careers from '@/legacy-pages/Careers'
import { createSeoMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = createSeoMetadata({
  title: 'Careers at DCintelix',
  description:
    'Explore training opportunities at DCintelix and gain practical experience working on digital products for businesses.',
  url: '/careers',
})

export default function CareersPage() {
  return <Careers />
}
