import { useEffect, useRef } from 'react'
import { createSmoothScroll } from '../../animations/scroll/smoothScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { LenisRefContext } from './LenisContext'

/**
 * Initializes the app-wide smooth scroll driver exactly once and exposes
 * the live Lenis instance (via `useLenis`, in hooks/useLenis.js) to
 * anything that needs to imperatively stop/start it — e.g. the
 * full-screen menu locking background scroll while open. Individual
 * scenes should never create their own Lenis instance.
 */
export function SmoothScrollProvider({ children }) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef(null)

  useEffect(() => {
    const { lenis, destroy } = createSmoothScroll({ reducedMotion })
    lenisRef.current = lenis
    return () => {
      lenisRef.current = null
      destroy()
    }
  }, [reducedMotion])

  return <LenisRefContext.Provider value={lenisRef}>{children}</LenisRefContext.Provider>
}
