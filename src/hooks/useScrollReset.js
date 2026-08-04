import { useLayoutEffect } from 'react'
import { useLenis } from './useLenis'

/**
 * Resets scroll to the top on mount. React Router doesn't do this on its
 * own (unlike a traditional multi-page navigation), and each route in
 * this app is a full scene — call this once at the top of every page
 * component so both a scene-transition entry and a plain link/back
 * navigation land at the top consistently.
 */
export function useScrollReset() {
  const lenisRef = useLenis()

  useLayoutEffect(() => {
    lenisRef?.current?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }, [lenisRef])
}
