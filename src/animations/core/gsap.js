import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

let registered = false

/**
 * Registers GSAP plugins exactly once, regardless of how many modules
 * import this file (Vite/React fast-refresh can otherwise re-run it).
 */
export function registerGsap() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger, useGSAP)

  // ScrollTrigger markers are opt-in via a dev-only debug flag (toggled from
  // DebugOverlay, persisted in localStorage), never shown in production.
  ScrollTrigger.defaults({
    markers: import.meta.env.DEV && localStorage.getItem('gates:debug:scrollMarkers') === 'true',
  })

  registered = true
}

registerGsap()

export { gsap, ScrollTrigger, useGSAP }
