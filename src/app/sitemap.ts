import type { MetadataRoute } from 'next'

const publicRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blogs', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.64, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.64, changeFrequency: 'monthly' },
  { path: '/testimonials', priority: 0.64, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.64, changeFrequency: 'monthly' },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return publicRoutes.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, 'https://www.dcintelix.rw').toString(),
    lastModified,
    changeFrequency,
    priority,
  }))
}
