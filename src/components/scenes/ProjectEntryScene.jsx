import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SceneWrapper } from '../layout/SceneWrapper'
import { cn } from '../../utils/classNames'
import styles from './ProjectEntryScene.module.css'

/**
 * The generic placeholder a project route shows until it has its own
 * real experience — right now that's every project. For china-history
 * this stands in for what Phase 2 replaces with the Imperial Gate; its
 * job here is only to prove the portfolio → project transition lands
 * somewhere real. Background color continues from the entry-transition
 * panel's accent so the reveal reads as one continuous motion.
 */
export function ProjectEntryScene({ project }) {
  const sceneRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(() => {
    const targets = ['[data-entry-eyebrow]', '[data-entry-title]', '[data-entry-note]', '[data-entry-back]']
    if (reducedMotion) {
      gsap.set(targets, { autoAlpha: 1 })
      return
    }

    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 },
    )
  }, { scope: sceneRef, dependencies: [reducedMotion] })

  return (
    <SceneWrapper ref={sceneRef} className={styles.scene} style={{ '--accent': project.accent }}>
      <p className={cn('type-ui', styles.eyebrow)} data-entry-eyebrow>
        {project.category} — {project.year}
      </p>
      <h1 className={cn('type-display', styles.title)} data-entry-title>
        {project.title}
      </h1>
      <p className={cn('type-ui', styles.note)} data-entry-note>
        The full experience for this project arrives in a later phase.
      </p>
      <Link
        to="/"
        className={cn('type-ui', styles.back)}
        data-entry-back
        data-cursor="link"
        data-cursor-label="BACK"
      >
        ← PORTFOLIO
      </Link>
    </SceneWrapper>
  )
}
