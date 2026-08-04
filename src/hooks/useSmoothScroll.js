import { useEffect } from 'react'
import { createSmoothScroll } from '../animations/scroll/smoothScroll'
import { useReducedMotion } from './useReducedMotion'

/**
 * Initializes the app-wide smooth scroll driver exactly once. Mount this
 * a single time near the root (see App.jsx) — individual scenes should
 * never create their own Lenis instance.
 */
export function useSmoothScroll() {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const { destroy } = createSmoothScroll({ reducedMotion })
    return destroy
  }, [reducedMotion])
}
