import { useRef } from 'react'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsCoarsePointer } from '../../hooks/useIsCoarsePointer'
import { useSceneTransition } from '../../hooks/useSceneTransition'
import { ProjectVisual } from '../ui/ProjectVisual'
import { cn } from '../../utils/classNames'
import styles from './ProjectPanel.module.css'

/**
 * A single full-viewport, cinematic project presentation — not a card.
 * The visual dominates; metadata is minimal. Hovering (desktop only)
 * gives the visual a subtle cursor-following parallax + scale, tuned to
 * read as expensive rather than gimmicky. Clicking hands off to
 * `useSceneTransition` rather than navigating instantly.
 */
export function ProjectPanel({ project, index, total }) {
  const panelRef = useRef(null)
  const visualRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const isTouch = useIsCoarsePointer()
  const enterProject = useSceneTransition()

  useGsapContext(() => {
    if (reducedMotion || isTouch) return

    const panel = panelRef.current
    const visual = visualRef.current
    if (!panel || !visual) return

    const moveX = gsap.quickTo(visual, 'x', { duration: 0.6, ease: 'power3' })
    const moveY = gsap.quickTo(visual, 'y', { duration: 0.6, ease: 'power3' })
    // 'scale' (shorthand) isn't eligible for quickTo's fast-reset path in
    // GSAP; scaleX/scaleY individually are, per GSAP's own warning.
    const scaleXTo = gsap.quickTo(visual, 'scaleX', { duration: 0.6, ease: 'power3' })
    const scaleYTo = gsap.quickTo(visual, 'scaleY', { duration: 0.6, ease: 'power3' })

    const handleMove = (event) => {
      const rect = panel.getBoundingClientRect()
      const relX = (event.clientX - rect.left) / rect.width - 0.5
      const relY = (event.clientY - rect.top) / rect.height - 0.5
      moveX(relX * 24)
      moveY(relY * 24)
      scaleXTo(1.04)
      scaleYTo(1.04)
    }

    const handleLeave = () => {
      moveX(0)
      moveY(0)
      scaleXTo(1)
      scaleYTo(1)
    }

    panel.addEventListener('pointermove', handleMove)
    panel.addEventListener('pointerleave', handleLeave)
    return () => {
      panel.removeEventListener('pointermove', handleMove)
      panel.removeEventListener('pointerleave', handleLeave)
    }
  }, { scope: panelRef, dependencies: [reducedMotion, isTouch] })

  return (
    <article ref={panelRef} className={styles.panel}>
      <button
        type="button"
        className={styles.hitArea}
        onClick={() => enterProject(project, visualRef.current)}
        data-cursor="project"
        data-cursor-label="VIEW"
        aria-label={`View project: ${project.title}`}
      >
        <div ref={visualRef} className={styles.visualWrap}>
          <ProjectVisual visual={project.visual} accent={project.accent} />
          <div className={styles.scrim} />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <span className={cn('type-ui', styles.index)}>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <span className={cn('type-display', styles.title)}>{project.title}</span>
            <span className={cn('type-ui', styles.meta)}>
              {project.category} — {project.year}
            </span>
          </div>
          <span className={cn('type-ui', styles.cue)}>SCROLL TO EXPLORE</span>
        </div>
      </button>
    </article>
  )
}
