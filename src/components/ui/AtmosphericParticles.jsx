import { useMemo, useRef } from 'react'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import styles from './AtmosphericParticles.module.css'

function makeMotes(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: 20 + Math.random() * 75,
    size: 2 + Math.random() * 3,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 6,
    drift: 12 + Math.random() * 20,
  }))
}

/**
 * Restrained atmospheric dust/mote field, shared by every scene that
 * needs "the air itself has depth" (introduced for the gate in Phase 2,
 * reused as-is for the landscape in Phase 3 — only the color changes).
 * Near-invisible until noticed; renders nothing when `count` is 0
 * (reduced motion, or a caller that wants it off).
 *
 * The field container's own opacity is driven by the caller's scroll
 * timeline (via `elementsRef.current.particles`) — individual motes only
 * own their own slow idle drift, independent of scroll.
 */
export function AtmosphericParticles({ count, elementsRef, color }) {
  const fieldRef = useRef(null)
  const motes = useMemo(() => makeMotes(count), [count])

  useGsapContext(() => {
    if (!count) return
    gsap.utils.toArray('[data-mote]', fieldRef.current).forEach((el) => {
      const drift = Number(el.dataset.drift)
      const duration = Number(el.dataset.duration)
      const delay = Number(el.dataset.delay)
      gsap.to(el, {
        y: `-=${drift}`,
        x: `+=${drift * 0.3}`,
        opacity: 0.15,
        duration,
        delay,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
  }, { scope: fieldRef, dependencies: [count] })

  if (!count) return null

  return (
    <div
      ref={(node) => {
        fieldRef.current = node
        elementsRef.current.particles = node
      }}
      className={styles.field}
      style={color ? { '--mote-color': color } : undefined}
      aria-hidden="true"
    >
      {motes.map((mote) => (
        <span
          key={mote.id}
          data-mote
          data-drift={mote.drift}
          data-duration={mote.duration}
          data-delay={mote.delay}
          className={styles.mote}
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: mote.size,
            height: mote.size,
            opacity: 0.35,
          }}
        />
      ))}
    </div>
  )
}
