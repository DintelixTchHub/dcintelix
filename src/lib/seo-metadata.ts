import type { Metadata } from 'next'

type SeoMetadataInput = {
  title: string
  description: string
  url: string
  keywords?: string
  image?: string
}

export function createSeoMetadata({
  title,
  description,
  url,
  keywords,
  image = '/logo2.png',
}: SeoMetadataInput): Metadata {
  const siteName = 'DCintelix'
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`

  return {
    title: fullTitle,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: fullTitle,
      description,
      url,
      siteName,
      locale: 'en_US',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}
