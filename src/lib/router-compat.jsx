'use client'

import NextLink from 'next/link'
import { useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export { useParams } from 'next/navigation'

export function Link({ to, href, ...props }) {
  return <NextLink href={href ?? to} scroll={false} {...props} />
}

export function useNavigate() {
  const router = useRouter()

  return useCallback((href, options = {}) => {
    if (options.replace) {
      router.replace(href, { scroll: options.scroll ?? false })
      return
    }

    router.push(href, { scroll: options.scroll ?? false })
  }, [router])
}

export function useLocation() {
  const pathname = usePathname()
  return useMemo(() => ({ pathname }), [pathname])
}
