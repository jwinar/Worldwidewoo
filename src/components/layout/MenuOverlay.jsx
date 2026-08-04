import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useLenis } from '../../hooks/useLenis'
import { cn } from '../../utils/classNames'
import styles from './MenuOverlay.module.css'

// Placeholder items only — real destinations (About, Experiments, Contact)
// don't exist yet, so only Work is a real link. See CREATIVE_BRIEF.md §12.
const ITEMS = [
  { label: 'WORK', to: '/' },
  { label: 'ABOUT', to: null },
  { label: 'EXPERIMENTS', to: null },
  { label: 'CONTACT', to: null },
]

/**
 * Full-screen menu as a cinematic state change, not a dropdown: dark
 * background, huge staggered typography, GSAP entrance/exit. `open` is
 * owned by PageWrapper; this component only animates in response to it.
 */
export function MenuOverlay({ open, onClose }) {
  const rootRef = useRef(null)
  const timelineRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const lenisRef = useLenis()

  useGsapContext(() => {
    const tl = gsap.timeline({ paused: true })
    const duration = reducedMotion ? 0.01 : 0.5
    const itemDuration = reducedMotion ? 0.01 : 0.6

    tl.to(rootRef.current, { autoAlpha: 1, pointerEvents: 'auto', duration, ease: 'power2.out' })
    tl.fromTo(
      '[data-menu-item]',
      { yPercent: 40, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: itemDuration, stagger: reducedMotion ? 0 : 0.07, ease: 'power3.out' },
      reducedMotion ? 0 : '-=0.2',
    )

    timelineRef.current = tl
  }, { scope: rootRef, dependencies: [reducedMotion] })

  useEffect(() => {
    const tl = timelineRef.current
    if (!tl) return
    if (open) {
      tl.play()
    } else if (tl.progress() > 0) {
      tl.reverse()
    }

    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) {
      lenisRef?.current?.stop()
    } else {
      lenisRef?.current?.start()
    }
  }, [open, lenisRef])

  return (
    <div ref={rootRef} className={styles.overlay} aria-hidden={!open}>
      <button
        type="button"
        className={cn('type-ui', styles.close)}
        onClick={onClose}
        data-cursor="link"
        data-cursor-label="CLOSE"
      >
        CLOSE
      </button>
      <nav className={styles.list}>
        {ITEMS.map((item) =>
          item.to ? (
            <Link
              key={item.label}
              to={item.to}
              className={cn(styles.item, 'type-display')}
              data-menu-item
              onClick={onClose}
              data-cursor="link"
              data-cursor-label="OPEN"
            >
              {item.label}
            </Link>
          ) : (
            <span key={item.label} className={cn(styles.item, 'type-display')} data-menu-item>
              {item.label}
            </span>
          ),
        )}
      </nav>
    </div>
  )
}
