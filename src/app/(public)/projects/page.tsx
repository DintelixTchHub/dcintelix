import type { Metadata } from 'next'
import Projects from '@/legacy-pages/Projects'
import { createSeoMetadata } from '@/lib/seo-metadata'

export const metadata: Metadata = createSeoMetadata({
  title: 'Web Design & Software Projects | DCintelix Rwanda',
  description:
    'Explore websites, web applications, e-commerce platforms, and mobile apps built by DCintelix for businesses and organizations.',
  keywords:
    'portfolio, web development projects, case studies, CoRoute, OldFox, TraumaHelp, custom websites',
  url: '/projects',
})

export default function ProjectsPage() {
  return <Projects />
}
