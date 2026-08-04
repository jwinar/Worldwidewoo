import { useRef } from 'react'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import { createScrollScene } from '../../animations/scroll/createScrollScene'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SceneWrapper } from '../layout/SceneWrapper'
import { cn } from '../../utils/classNames'
import styles from './PortfolioHero.module.css'

/**
 * The opening screen. Deliberately empty of biography or "Hi, I'm ___"
 * copy — placeholder-only per CREATIVE_BRIEF.md §4. Its only job is to
 * establish that scrolling is the site's language: the title scales,
 * stretches, and dissolves as the first project is revealed underneath,
 * rather than the hero simply being followed by an ordinary section.
 */
export function PortfolioHero() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useGsapContext(() => {
    if (reducedMotion) return

    const tl = gsap.timeline()
    tl.to(titleRef.current, {
      scale: 1.5,
      letterSpacing: '0.08em',
      autoAlpha: 0,
      ease: 'none',
    })

    createScrollScene({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=70%',
      scrub: 1,
      pin: true,
      animation: tl,
    })
  }, { scope: sectionRef, dependencies: [reducedMotion] })

  return (
    <SceneWrapper ref={sectionRef} className={styles.hero}>
      <h1 ref={titleRef} className={cn('type-display', styles.title)}>
        PORTFOLIO
      </h1>
      <p className={cn('type-ui', styles.eyebrow)}>SCROLL</p>
    </SceneWrapper>
  )
}
