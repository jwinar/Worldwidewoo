/**
 * Central, shared scroll/animation configuration. Scenes should read from
 * here instead of hard-coding breakpoints or easing so the whole
 * experience stays consistent as new sections are added in later phases.
 */

/** Breakpoints for gsap.matchMedia(), mirrored by the CSS breakpoint tokens in styles/tokens.css. */
export const BREAKPOINTS = {
  mobile: '(max-width: 599px)',
  tablet: '(min-width: 600px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  // Convenience query for "anything that isn't desktop", handy for scenes
  // that only need a binary simple/complex split.
  reducedComplexity: '(max-width: 1023px)',
}

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export const SCROLL_DEFAULTS = {
  scrub: 1,
  ease: 'none',
  anticipatePin: 1,
}
