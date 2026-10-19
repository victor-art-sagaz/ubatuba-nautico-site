import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Rola até a âncora (#id) ao navegar; sem âncora, volta ao topo da página. */
export function ScrollToHash() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}
