import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { projectPath } from '../../data/projects'
import { SceneTransitionCtx } from './SceneTransitionContext'
import styles from './SceneTransitionProvider.module.css'

/**
 * Owns the "enter a project" cinematic transition: an accent-colored
 * panel expands (transform-only — x/y/scaleX/scaleY, never width/height)
 * from the clicked project visual's exact screen position to fill the
 * viewport, covering the UI before the route swaps underneath it, then
 * fades away to reveal the project page. This provider sits above
 * `<Routes>` (see App.jsx) so the overlay survives the navigation instead
 * of unmounting with the page that triggered it.
 *
 * Renders nothing visible at rest; `useSceneTransition()` is the only way
 * scenes should trigger project navigation.
 */
export function SceneTransitionProvider({ children }) {
  const rootRef = useRef(null)
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  const { contextSafe } = useGsapContext({ scope: rootRef })

  const enterProject = useCallback(
    (project, originEl) => {
      const path = projectPath(project)
      const overlay = overlayRef.current
      const panel = panelRef.current

      if (reducedMotion || !overlay || !panel || !originEl) {
        navigate(path)
        return
      }

      contextSafe(() => {
        const rect = originEl.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight

        gsap.set(overlay, { autoAlpha: 1, pointerEvents: 'auto' })
        gsap.set(panel, {
          backgroundColor: project.accent,
          transformOrigin: 'top left',
          x: rect.left,
          y: rect.top,
          scaleX: rect.width / vw,
          scaleY: rect.height / vh,
          autoAlpha: 1,
        })

        gsap
          .timeline({
            onComplete: () => {
              gsap.set(overlay, { autoAlpha: 0, pointerEvents: 'none' })
              gsap.set(panel, { clearProps: 'all' })
            },
          })
          .to(panel, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.9, ease: 'power4.inOut' })
          .call(() => navigate(path))
          .to(panel, { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, '+=0.2')
      })()
    },
    [contextSafe, navigate, reducedMotion],
  )

  return (
    // display: contents — this element only anchors the GSAP scope, it must not affect layout.
    <div ref={rootRef} style={{ display: 'contents' }}>
      <SceneTransitionCtx.Provider value={enterProject}>{children}</SceneTransitionCtx.Provider>
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true">
        <div ref={panelRef} className={styles.panel} />
      </div>
    </div>
  )
}
