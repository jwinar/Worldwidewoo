import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../core/gsap'

/**
 * Wires Lenis (smooth scroll) into GSAP's own ticker instead of running a
 * second requestAnimationFrame loop, and keeps ScrollTrigger in sync with
 * Lenis's virtual scroll position. This is the one and only rAF driver for
 * scroll in the app:
 *
 *   native scroll → Lenis smoothing → gsap.ticker → ScrollTrigger.update → scenes
 *
 * When `reducedMotion` is true, Lenis is not created at all — the browser's
 * native (instant) scroll behavior is preserved, which is both more
 * predictable for accessibility and removes an entire animation system for
 * users who asked for less motion.
 *
 * @returns {{ lenis: Lenis|null, destroy: () => void }}
 */
export function createSmoothScroll({ reducedMotion = false } = {}) {
  if (reducedMotion) {
    return { lenis: null, destroy: () => {} }
  }

  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const onTick = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(onTick)
  // Lenis already smooths motion; let GSAP hand it every frame without
  // its own lag-smoothing compensation fighting that.
  gsap.ticker.lagSmoothing(0)

  const destroy = () => {
    gsap.ticker.remove(onTick)
    lenis.destroy()
  }

  return { lenis, destroy }
}
