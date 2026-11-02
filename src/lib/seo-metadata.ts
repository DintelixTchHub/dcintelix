import type { Metadata } from 'next'

export const socialShareImage = '/dcintelix-team.png'

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
  image = socialShareImage,
}: SeoMetadataInput): Metadata {
  const siteName = 'DCintelix'
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const imageAlt = 'The DCintelix digital solutions team in Rwanda.'

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
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  }
}
