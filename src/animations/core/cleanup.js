import { gsap, ScrollTrigger } from './gsap'

/**
 * Manual gsap.context() creator for animation code that runs outside a
 * React component (e.g. imperative helpers in animations/scroll or
 * animations/transitions). Always pair this with `.revert()` in whatever
 * lifecycle owns it. Inside components, prefer `useGsapContext` instead.
 */
export function createAnimationContext(scope) {
  return gsap.context(() => {}, scope)
}

/**
 * Kills every ScrollTrigger whose `trigger` element is (or is contained by)
 * the given element. Useful when a scene needs to imperatively tear down
 * scroll-linked animations outside of the normal context revert path.
 */
export function killScrollTriggersFor(element) {
  if (!element) return
  ScrollTrigger.getAll().forEach((trigger) => {
    const el = trigger.trigger
    if (el && (el === element || element.contains(el))) {
      trigger.kill()
    }
  })
}

/** Recalculates all ScrollTrigger positions. Call after layout-affecting changes (fonts loading, images loading, viewport resize outside GSAP's own listeners). */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}
