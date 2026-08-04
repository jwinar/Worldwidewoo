import { gsap } from '../core/gsap'

/**
 * Builds the gate-opening sequence as a plain GSAP timeline, paused —
 * the caller (ImperialGateScene) drives it via a scrubbed ScrollTrigger
 * (see createScrollScene), which is what turns the internal eases below
 * into a "heavy" feel: scrub adds lag/catch-up on top of these curves,
 * it doesn't replace them.
 *
 * Relative stage durations approximate the brief's percentage
 * breakdown (light 15%, doors 35%, interior 20%, camera push 15%,
 * settle 15% of a 10-unit timeline) — tune by adjusting these numbers,
 * not by changing how the caller scrubs.
 *
 * @param {Object} refs
 * @param {HTMLElement} refs.doorLeft
 * @param {HTMLElement} refs.doorRight
 * @param {HTMLElement} refs.cameraGroup - wraps frame + doors; scales up for the "camera push forward" beat
 * @param {HTMLElement} refs.glow
 * @param {HTMLElement} refs.mountains
 * @param {HTMLElement} refs.mist
 * @param {HTMLElement} [refs.particles]
 * @param {HTMLElement} [refs.prompt] - the "SCROLL TO ENTER" hint, faded out the instant scroll begins
 * @param {{ reducedMotion?: boolean }} [options]
 */
export function createGateOpeningTimeline(refs, { reducedMotion = false } = {}) {
  const { doorLeft, doorRight, cameraGroup, glow, mountains, mist, particles, prompt } = refs
  const tl = gsap.timeline({ paused: true })

  if (reducedMotion) {
    // No 3D swing, no camera push, no parallax — just enough motion to
    // communicate "opened" without large transforms, per prefers-reduced-motion.
    if (prompt) tl.to(prompt, { autoAlpha: 0, duration: 0.3 })
    tl.to([glow, mountains, mist], { autoAlpha: 1, duration: 1 })
    if (particles) tl.set(particles, { autoAlpha: 0 })
    tl.to([doorLeft, doorRight], { autoAlpha: 0, duration: 1 }, '<')
    return tl
  }

  // Kept safely under 90° so the front (lacquer) face's normal never
  // flips past backface-visibility's cutoff — past 90° the door reads as
  // an all-but-invisible edge-on sliver, which technically matches real
  // door physics but reads as the doors vanishing rather than opening.
  // 75° (plus back.out's small overshoot) still yields a very wide gap:
  // cos(75°) ≈ 0.26, so each door projects to roughly a tenth of its
  // width at full open.
  const doorOpenAngle = 75

  // 0 -> 3%: the entry hint disappears the instant the viewer commits to scrolling.
  if (prompt) tl.to(prompt, { autoAlpha: 0, duration: 0.3, ease: 'none' }, 0)

  // 0 -> 15%: a seam of warm light appears at the threshold. Doors are still shut.
  tl.addLabel('light')
  tl.to(glow, { autoAlpha: 0.5, duration: 1.5, ease: 'sine.in' }, 'light')

  // 15 -> 50%: the doors swing open on their outer hinges. A slight
  // overshoot-and-settle (back.out) reads as mass/momentum rather than
  // a mechanical, linear slide.
  //
  // CSS rotateY(+θ) moves a point at local +X toward -Z (away from the
  // viewer): rotate3d(0,1,0,90deg) is the standard construction for a
  // cube face whose outward normal is +X, i.e. it maps +Z -> +X, which
  // by the same rotation matrix maps +X -> -Z. The left door's free
  // (inner) edge sits at local +X relative to its left-edge hinge, so it
  // needs +θ to recede into the gate; the right door's free edge sits at
  // local -X relative to its right-edge hinge, so it needs -θ.
  tl.addLabel('doors', 'light+=0.3')
  tl.to(
    doorLeft,
    { rotateY: doorOpenAngle, duration: 3.5, ease: 'back.out(0.55)' },
    'doors',
  )
  tl.to(
    doorRight,
    { rotateY: -doorOpenAngle, duration: 3.5, ease: 'back.out(0.55)' },
    'doors',
  )
  tl.to(glow, { autoAlpha: 0.85, duration: 3.5, ease: 'sine.inOut' }, 'doors')

  // 50 -> 70%: the interior environment — mountains and mist — settles into view.
  tl.addLabel('interior', 'doors+=2.5')
  tl.to(mountains, { autoAlpha: 0.9, duration: 2, ease: 'sine.out' }, 'interior')
  tl.to(mist, { autoAlpha: 0.7, x: 40, duration: 2, ease: 'sine.out' }, 'interior')
  if (particles) tl.to(particles, { autoAlpha: 1, duration: 2, ease: 'sine.out' }, 'interior')

  // 70 -> 85%: the camera pushes forward — near layers (the gate itself)
  // scale up faster than far layers (mountains/mist), which is what
  // parallax reads as "moving toward" rather than "zooming."
  tl.addLabel('push', 'interior+=1.2')
  tl.to(cameraGroup, { scale: 1.22, duration: 1.5, ease: 'power2.in' }, 'push')
  tl.to(mountains, { scale: 1.45, duration: 1.5, ease: 'power2.in' }, 'push')
  tl.to(mist, { scale: 1.6, duration: 1.5, ease: 'power2.in' }, 'push')

  // 85 -> 100%: the gate passes the camera and falls away behind it.
  tl.addLabel('behind', 'push+=1')
  tl.to(cameraGroup, { autoAlpha: 0, scale: 1.4, duration: 1.5, ease: 'power1.in' }, 'behind')
  tl.to(glow, { autoAlpha: 0, duration: 1.5, ease: 'power1.in' }, 'behind')
  if (particles) tl.to(particles, { autoAlpha: 0, duration: 1.5 }, 'behind')

  return tl
}
