import { useRef } from 'react'
import { gsap } from '../../../animations/core/gsap'
import { useGsapContext } from '../../../animations/core/context'
import { createScrollScene } from '../../../animations/scroll/createScrollScene'
import { createGateOpeningTimeline } from '../../../animations/transitions/gate'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { useBreakpoint } from '../../../hooks/useBreakpoint'
import { SceneWrapper } from '../../layout/SceneWrapper'
import { GateFrame } from './GateFrame'
import { GateDoor } from './GateDoor'
import { GateAtmosphere } from './GateAtmosphere'
import { AtmosphericParticles } from '../../ui/AtmosphericParticles'
import { cn } from '../../../utils/classNames'
import styles from './ImperialGateScene.module.css'

const PARTICLE_COUNT = { mobile: 8, tablet: 14, desktop: 22 }

/**
 * Project 01's opening: an ancient imperial gate, closed and still, that
 * the viewer opens by scrolling. See CREATIVE_BRIEF.md and the Phase 2
 * brief for the full creative direction — this component wires the
 * pieces (GateFrame/GateDoor/GateAtmosphere/AtmosphericParticles) to the
 * gate-opening timeline (animations/transitions/gate.js) via a pinned,
 * scrubbed ScrollTrigger.
 */
export function ImperialGateScene() {
  const stageRef = useRef(null)
  const cameraGroupRef = useRef(null)
  const doorLeftRef = useRef(null)
  const doorRightRef = useRef(null)
  const promptRef = useRef(null)
  const atmosphereRef = useRef({})

  const reducedMotion = useReducedMotion()
  const breakpoint = useBreakpoint()
  const particleCount = reducedMotion ? 0 : PARTICLE_COUNT[breakpoint]

  // Intro: the title appears slowly, holds, then clears the way for the
  // (already-visible, closed) gate and its entry prompt. Independent of
  // scroll — plays once on mount.
  useGsapContext(() => {
    const titles = gsap.utils.toArray('[data-gate-title]', stageRef.current)
    const prompt = promptRef.current

    if (reducedMotion) {
      gsap.set(titles, { autoAlpha: 1 })
      gsap.set(prompt, { autoAlpha: 1 })
      return
    }

    gsap.timeline({ delay: 0.3 })
      .fromTo(titles, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.25, ease: 'power2.out' })
      .to(titles, { autoAlpha: 0, y: -18, duration: 0.8, stagger: 0.05, ease: 'power2.in' }, '+=1.4')
      .call(
        () => {
          // The scroll-driven gate timeline owns the prompt once the
          // viewer has started opening the gate — don't fade it back in
          // over that if they scrolled during the intro sequence.
          if (window.scrollY < 4) {
            gsap.to(prompt, { autoAlpha: 1, duration: 0.8, ease: 'power2.out' })
          }
        },
        [],
        '-=0.3',
      )
  }, { scope: stageRef, dependencies: [reducedMotion] })

  // The gate itself. Under reduced motion this plays once automatically
  // (no scroll-jacking pin); otherwise scroll scrubs it.
  useGsapContext(() => {
    const refs = {
      doorLeft: doorLeftRef.current,
      doorRight: doorRightRef.current,
      cameraGroup: cameraGroupRef.current,
      glow: atmosphereRef.current.glow,
      mountains: atmosphereRef.current.mountains,
      mist: atmosphereRef.current.mist,
      particles: atmosphereRef.current.particles,
      prompt: promptRef.current,
    }

    const tl = createGateOpeningTimeline(refs, { reducedMotion })

    if (reducedMotion) {
      gsap.delayedCall(2.2, () => tl.play())
      return
    }

    createScrollScene({
      trigger: stageRef.current,
      start: 'top top',
      end: '+=280%',
      scrub: 1.35,
      pin: true,
      // Default pinSpacing reserves room for BOTH the scroll distance
      // (280% of the trigger's own height) AND the trigger's own
      // natural height again, so the very next section in the document
      // would start one extra viewport-height later than the pin
      // actually ends — a dead, unpinned "coast" gap right where the
      // brief demands a seamless handoff into LandscapeScene. The
      // `.pinHost` wrapper below already reserves exactly the scroll
      // distance we want (280svh, matching `end`), so pinSpacing must
      // be off or that reservation doubles up.
      pinSpacing: false,
      animation: tl,
    })
  }, { scope: stageRef, dependencies: [reducedMotion, particleCount] })

  return (
    <div className={styles.pinHost}>
      <SceneWrapper as="section" ref={stageRef} className={styles.stage}>
        <GateAtmosphere elementsRef={atmosphereRef} />
        <AtmosphericParticles count={particleCount} elementsRef={atmosphereRef} />

        <div ref={cameraGroupRef} className={styles.cameraGroup}>
          <div className={styles.architecture}>
            <GateFrame />
            <div className={styles.doorsGroup}>
              <GateDoor ref={doorLeftRef} side="left" />
              <GateDoor ref={doorRightRef} side="right" />
            </div>
          </div>
        </div>

        <div className={styles.titleGroup}>
          <p className={cn('type-cn', styles.titleCn)} data-gate-title>
            中国历史
          </p>
          <h1 className={cn('type-display', styles.titleEn)} data-gate-title>
            CHINA / 5000 YEARS
          </h1>
          <p className={cn('type-ui', styles.titleSub)} data-gate-title>
            INTERACTIVE EXPERIENCE
          </p>
        </div>

        <div ref={promptRef} className={styles.prompt}>
          <span className="type-ui">SCROLL TO ENTER</span>
          <span className={styles.promptLine} />
        </div>
      </SceneWrapper>
    </div>
  )
}
