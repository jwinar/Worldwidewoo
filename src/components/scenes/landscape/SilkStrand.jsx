import { forwardRef, useRef } from 'react'
import { gsap } from '../../../animations/core/gsap'
import { useGsapContext } from '../../../animations/core/context'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import styles from './SilkStrand.module.css'

/**
 * The silk system's first, minimal appearance: one thin strand hanging
 * from the top edge, gently swaying — not the full physics system the
 * brief reserves for a later phase. The sway is a fixed-shape SVG path
 * animated purely by transform (rotate/scaleY oscillation around its
 * top anchor), not path morphing, which keeps it cheap and avoids
 * needing a path-morphing plugin for what should read as tension and
 * air movement, not a rigid swinging pendulum.
 *
 * `ref` is the entrance-opacity target for the landscape timeline; the
 * idle sway runs independently once mounted.
 */
export const SilkStrand = forwardRef(function SilkStrand(_props, ref) {
  const innerRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(() => {
    if (reducedMotion) return
    gsap.to(innerRef.current, {
      rotate: 2.2,
      duration: 6.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
    gsap.to(innerRef.current, {
      scaleY: 1.015,
      duration: 4.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.3,
    })
  }, { scope: innerRef, dependencies: [reducedMotion] })

  return (
    <div ref={ref} className={styles.strand} aria-hidden="true">
      <svg ref={innerRef} viewBox="0 0 60 400" width="100%" height="100%" preserveAspectRatio="none">
        <path
          d="M30,0 C42,70 18,150 33,220 C46,280 22,340 30,400"
          fill="none"
          stroke="var(--color-red)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
})
