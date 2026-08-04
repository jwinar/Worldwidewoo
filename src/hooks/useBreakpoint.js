import { useSyncExternalStore } from 'react'
import { BREAKPOINTS } from '../animations/scroll/scrollConfig'

const queries = {
  mobile: () => window.matchMedia(BREAKPOINTS.mobile),
  tablet: () => window.matchMedia(BREAKPOINTS.tablet),
  desktop: () => window.matchMedia(BREAKPOINTS.desktop),
}

function getSnapshot() {
  if (queries.mobile().matches) return 'mobile'
  if (queries.tablet().matches) return 'tablet'
  return 'desktop'
}

function subscribe(callback) {
  const mqls = Object.values(queries).map((getMql) => getMql())
  mqls.forEach((mql) => mql.addEventListener('change', callback))
  return () => mqls.forEach((mql) => mql.removeEventListener('change', callback))
}

/**
 * Plain-JS breakpoint name for React/UI code (nav layout, dev overlay).
 * Animation code should use `createResponsiveAnimation` (gsap.matchMedia)
 * instead so tweens are defined and reverted per breakpoint correctly —
 * this hook is not a substitute for that.
 */
export function useBreakpoint() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'desktop')
}
