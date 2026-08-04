import { ScrollTrigger } from '../core/gsap'
import { SCROLL_DEFAULTS } from './scrollConfig'

/**
 * Standard factory for a scroll-driven scene. Every pinned/scrubbed
 * section in the eventual experience (dynasty transitions, the Silk Road
 * path, etc.) should be built by calling this rather than reaching for
 * `ScrollTrigger.create` directly, so defaults, debug markers, and cleanup
 * stay consistent in one place.
 *
 * @param {Object} options
 * @param {string|Element} options.trigger - element that starts the scene
 * @param {string} [options.start] - ScrollTrigger start position
 * @param {string} [options.end] - ScrollTrigger end position
 * @param {boolean|number} [options.scrub] - defaults to SCROLL_DEFAULTS.scrub
 * @param {boolean|string|Element} [options.pin] - element to pin, or true for the trigger itself
 * @param {gsap.core.Timeline|gsap.core.Tween} [options.animation] - a timeline/tween to drive with the scene's scroll progress
 * @param {Object} [options.rest] - any other valid ScrollTrigger vars (onEnter, onLeave, id, markers, ...)
 * @returns {ScrollTrigger}
 */
export function createScrollScene({
  trigger,
  start = 'top top',
  end = '+=100%',
  scrub = SCROLL_DEFAULTS.scrub,
  pin = false,
  animation = null,
  ...rest
}) {
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub,
    pin,
    anticipatePin: pin ? SCROLL_DEFAULTS.anticipatePin : undefined,
    animation: animation ?? undefined,
    ...rest,
  })
}
