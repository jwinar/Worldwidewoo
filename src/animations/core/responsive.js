import { gsap } from './gsap'
import { BREAKPOINTS } from '../scroll/scrollConfig'

/**
 * Responsive animation boundary built on gsap.matchMedia(). This is the
 * mechanism for defining genuinely different behavior per breakpoint
 * (not just scaled-down numbers) — e.g. a pinned horizontal scene on
 * desktop that becomes a simple vertical fade on mobile.
 *
 * Must be called inside the same gsap.context()/useGsapContext scope as
 * the rest of a scene so matchMedia instances get reverted together with
 * everything else on unmount.
 *
 * @param {{
 *   desktop?: (context: gsap.Context) => void,
 *   tablet?: (context: gsap.Context) => void,
 *   mobile?: (context: gsap.Context) => void,
 *   all?: (context: gsap.Context) => void,
 * }} handlers
 * @returns {gsap.MatchMedia}
 */
export function createResponsiveAnimation(handlers = {}) {
  const mm = gsap.matchMedia()

  if (handlers.desktop) mm.add(BREAKPOINTS.desktop, handlers.desktop)
  if (handlers.tablet) mm.add(BREAKPOINTS.tablet, handlers.tablet)
  if (handlers.mobile) mm.add(BREAKPOINTS.mobile, handlers.mobile)
  // Runs regardless of breakpoint — for setup shared across all sizes.
  if (handlers.all) mm.add('all', handlers.all)

  return mm
}
