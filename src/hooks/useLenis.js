import { useContext } from 'react'
import { LenisRefContext } from '../components/layout/LenisContext'

/**
 * Returns a ref to the current Lenis instance (`.current` is `null` under
 * `prefers-reduced-motion`, where Lenis is never created). Read
 * `.current` at the moment you need it — do not destructure at render
 * time, since the instance is created/destroyed outside React's render
 * cycle.
 */
export function useLenis() {
  return useContext(LenisRefContext)
}
