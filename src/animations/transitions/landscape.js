import { gsap } from '../core/gsap'
import { mountainLayers } from '../../data/landscapeLayers'

/**
 * Builds the "world beyond the gate" sequence as a paused GSAP timeline,
 * scrubbed by the caller's pinned ScrollTrigger (see LandscapeScene) —
 * exactly the same authoring pattern as animations/transitions/gate.js.
 *
 * The scene's rest state (see LandscapeAtmosphere's REST_OPACITY) already
 * continues the gate's ending frame — near/mid mountains and low mist
 * partially visible, a residual glow — so this timeline only needs to
 * deepen and evolve what's already on screen, not build it from zero.
 *
 * @param {Object} refs
 * @param {Record<string,HTMLElement>} refs.mountains - { far, mid, near }
 * @param {Record<string,HTMLElement>} refs.mist - { low, mid, high }
 * @param {HTMLElement} refs.glow
 * @param {HTMLElement} [refs.particles]
 * @param {Object} refs.type - { eyebrow, char, lineOne, lineTwo, editorial }
 * @param {HTMLElement} refs.silk
 * @param {{ reducedMotion?: boolean }} [options]
 */
export function createLandscapeTimeline(refs, { reducedMotion = false } = {}) {
  const { mountains, mist, glow, particles, type, silk } = refs
  const tl = gsap.timeline({ paused: true })

  if (reducedMotion) {
    tl.to(mountains.far, { opacity: mountainLayers[0].opacity, duration: 1 })
    tl.to(mountains.mid, { opacity: mountainLayers[1].opacity, duration: 1 }, '<')
    tl.to([mist.mid, mist.high], { opacity: 0.3, duration: 1 }, '<')
    tl.to(glow, { opacity: 0.15, duration: 1 }, '<')
    tl.to(type.eyebrow, { autoAlpha: 1, duration: 0.6 }, '+=0.2')
    tl.to(type.char, { autoAlpha: 0.28, scale: 1, filter: 'blur(0px)', duration: 0.6 }, '<')
    tl.to(
      [type.lineOne, type.lineTwo],
      { autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', y: 0, filter: 'blur(0px)', duration: 0.6 },
      '<',
    )
    tl.to(type.editorial, { autoAlpha: 1, y: 0, duration: 0.6 }, '+=0.1')
    if (silk) tl.to(silk, { autoAlpha: 1, duration: 0.6 }, '<')
    return tl
  }

  // 0 -> 20%: mist deepens — the immediate aftermath of crossing the threshold.
  tl.addLabel('mist')
  tl.to(mist.low, { opacity: 0.68, duration: 2, ease: 'sine.out' }, 'mist')
  tl.to(mist.mid, { opacity: 0.4, duration: 2, ease: 'sine.out' }, 'mist')
  tl.to(glow, { opacity: 0.18, duration: 2, ease: 'sine.inOut' }, 'mist')

  // 20 -> 35%: the far range — new ground the gate never showed — appears through the mist.
  tl.addLabel('farMountains', 'mist+=1.3')
  tl.to(mountains.far, { opacity: mountainLayers[0].opacity, duration: 1.5, ease: 'sine.out' }, 'farMountains')
  tl.to(mountains.mid, { opacity: mountainLayers[1].opacity, duration: 1.5, ease: 'sine.out' }, 'farMountains')
  tl.to(mist.high, { opacity: 0.22, duration: 1.5, ease: 'sine.out' }, 'farMountains')

  // 35 -> 55%: the landscape expands — a gentle pull-back (not a hard
  // cut) plus the palette evolving from the gate's imperial red/gold
  // toward charcoal/parchment/misty gray, via direct SVG fill tweens.
  tl.addLabel('expand', 'farMountains+=1')
  tl.to(mountains.near, { y: '-=2%', scale: 1.04, opacity: mountainLayers[2].opacity, duration: 2, ease: 'sine.inOut' }, 'expand')
  tl.to(mountains.mid, { y: '-=1.2%', duration: 2, ease: 'sine.inOut' }, 'expand')
  mountainLayers.forEach((layer) => {
    const el = mountains[layer.id]?.querySelector('polygon')
    if (el) tl.to(el, { fill: layer.fillEvolved, duration: 3, ease: 'sine.inOut' }, 'expand')
    const pagoda = mountains[layer.id]?.querySelector('path')
    if (pagoda) tl.to(pagoda, { fill: layer.fillEvolved, duration: 3, ease: 'sine.inOut' }, 'expand')
  })
  tl.to(mist.low, { opacity: 0.4, duration: 2, ease: 'sine.inOut' }, 'expand')

  // 55 -> 65%: the character emerges behind everything — a compositional
  // object, not decoration, so it stays subtle and never competes with the type in front of it.
  tl.addLabel('character', 'expand+=1.5')
  tl.to(type.char, {
    autoAlpha: 0.3,
    scale: 1.05,
    filter: 'blur(0px)',
    duration: 1.8,
    ease: 'power2.out',
  }, 'character')

  // 65 -> 80%: the large statement rises out of the mist — a marker first, then the two lines,
  // offset from each other so they read as sitting at slightly different depths.
  tl.addLabel('type', 'character+=0.6')
  tl.to(type.eyebrow, { autoAlpha: 1, duration: 0.8, ease: 'power1.out' }, 'type')
  tl.to(
    type.lineOne,
    { clipPath: 'inset(0 0 0% 0)', y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' },
    'type+=0.3',
  )
  tl.to(
    type.lineTwo,
    { clipPath: 'inset(0 0 0% 0)', y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' },
    'type+=0.65',
  )

  // 80 -> 92%: the composition settles — editorial line and the silk's first appearance.
  tl.addLabel('settle', 'type+=2.2')
  tl.to(type.editorial, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, 'settle')
  if (silk) tl.to(silk, { autoAlpha: 0.85, duration: 1.4, ease: 'sine.out' }, 'settle+=0.2')
  if (particles) tl.to(particles, { opacity: 1, duration: 1.4 }, 'settle')

  return tl
}
