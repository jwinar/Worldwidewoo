import { useRef } from 'react'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import { createScrollScene } from '../../animations/scroll/createScrollScene'
import { createResponsiveAnimation } from '../../animations/core/responsive'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SceneWrapper } from '../layout/SceneWrapper'
import styles from './TestScene.module.css'

/**
 * Phase 0 engineering test scene — intentionally plain. It exists to prove
 * the animation engine (GSAP + ScrollTrigger + Lenis, React-safe context,
 * responsive matchMedia branching, reduced-motion fallback) works end to
 * end, not to demonstrate the eventual visual design. Real dynasty scenes
 * replace this in later phases.
 */
export function TestScene() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const boxRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(() => {
    const track = trackRef.current
    const box = boxRef.current
    if (!track || !box) return

    if (reducedMotion) {
      // Minimal, non-spatial feedback: no pin, no translate/rotate travel.
      gsap.fromTo(
        box,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        },
      )
      return
    }

    createResponsiveAnimation({
      desktop: () => {
        const distance = track.offsetWidth - box.offsetWidth
        const tl = gsap.timeline()
        tl.to(box, { x: distance, rotation: 360, ease: 'none' })

        createScrollScene({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          animation: tl,
        })
      },
      mobile: () => {
        const distance = track.offsetWidth - box.offsetWidth
        const tl = gsap.timeline()
        tl.to(box, { x: distance, ease: 'none' })

        createScrollScene({
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          pin: false,
          animation: tl,
        })
      },
    })
  }, { scope: sectionRef, dependencies: [reducedMotion] })

  return (
    <SceneWrapper ref={sectionRef} className={styles.scene}>
      <div className={styles.copy}>
        <p className={`type-ui ${styles.eyebrow}`}>Phase 0 — Engineering Test</p>
        <h2 className={`type-display ${styles.heading}`}>
          Scroll to move the marker. This scene proves the engine, not the design.
        </h2>
      </div>
      <div ref={trackRef} className={styles.track}>
        <div ref={boxRef} className={styles.box} data-cursor="hover" data-cursor-label="Engine" />
      </div>
    </SceneWrapper>
  )
}
