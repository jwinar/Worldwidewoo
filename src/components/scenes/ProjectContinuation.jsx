import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../utils/classNames'
import styles from './ProjectContinuation.module.css'

/**
 * The "that's all for now" note every project detail page ends on, until
 * it has a real conclusion: a note plus a way back. Reused as-is by
 * ProjectEntryScene (the generic placeholder) and appended after
 * ImperialGateScene's pinned gate sequence — content only, no wrapping
 * section, so each caller controls its own surrounding layout/background.
 * Animates in via ScrollTrigger rather than on mount, since callers may
 * render it well below the fold (e.g. after a pinned scene).
 */
export function ProjectContinuation({ note = 'The full experience for this project arrives in a later phase.' }) {
  const rootRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(() => {
    const targets = rootRef.current.children
    if (reducedMotion) {
      gsap.set(targets, { autoAlpha: 1 })
      return
    }

    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
      },
    )
  }, { scope: rootRef, dependencies: [reducedMotion] })

  return (
    <div ref={rootRef} className={styles.continuation}>
      <p className={cn('type-ui', styles.note)}>{note}</p>
      <Link to="/" className={cn('type-ui', styles.back)} data-cursor="link" data-cursor-label="BACK">
        ← PORTFOLIO
      </Link>
    </div>
  )
}
