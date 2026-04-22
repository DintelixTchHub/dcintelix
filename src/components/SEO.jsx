import { useEffect } from 'react'

/**
 * SEO Component - Manages dynamic meta tags for each page
 * @param {Object} props - SEO properties
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords (comma separated)
 * @param {string} props.image - OG/Twitter image URL
 * @param {string} props.url - Canonical URL
 * @param {string} props.type - OG type (website, article, etc.)
 */
function SEO({ 
  title = 'DCintelix - Expert Web Development & Digital Solutions in Rwanda',
  description = 'DCintelix offers professional web development, mobile apps, SEO services, and digital marketing in Rwanda. Transform your business with expert custom software solutions.',
  keywords = 'web development Rwanda, website design Rwanda, mobile app development, SEO services Rwanda, digital marketing Rwanda, custom software development, e-commerce solutions, ui/ux design',
  image = '/logo1.webp',
  url = 'https://www.dcintelix.rw/',
  type = 'website'
}) {
  const siteName = 'DCintelix'
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      let element = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        if (isProperty) {
          element.setAttribute('property', name)
        } else {
          element.setAttribute('name', name)
        }
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // Primary meta tags
    updateMetaTag('title', fullTitle)
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('robots', 'index, follow')

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', siteName, true)
    updateMetaTag('og:locale', 'en_US', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:url', url)

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', url)

    // Cleanup function to reset to default on unmount
    return () => {
      // Optional: Reset to default meta tags when leaving page
    }
  }, [fullTitle, description, keywords, image, url, type])

  return null // This component doesn't render anything
}

export default SEO
