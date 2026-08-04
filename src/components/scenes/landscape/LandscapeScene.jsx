import { useRef } from 'react'
import { useGsapContext } from '../../../animations/core/context'
import { createScrollScene } from '../../../animations/scroll/createScrollScene'
import { createLandscapeTimeline } from '../../../animations/transitions/landscape'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { useBreakpoint } from '../../../hooks/useBreakpoint'
import { SceneWrapper } from '../../layout/SceneWrapper'
import { LandscapeAtmosphere } from './LandscapeAtmosphere'
import { LandscapeTypography } from './LandscapeTypography'
import { SilkStrand } from './SilkStrand'
import { AtmosphericParticles } from '../../ui/AtmosphericParticles'
import styles from './LandscapeScene.module.css'

const PARTICLE_COUNT = { mobile: 6, tablet: 12, desktop: 18 }

/**
 * "The world beyond the gate" — the cinematic landscape Project 01's
 * gate opens into. Sits immediately after ImperialGateScene in
 * ProjectDetail with no content between them, so its own pin picks up
 * the instant the gate's pin releases (see LandscapeAtmosphere's
 * REST_OPACITY for how its rest state continues the gate's last frame).
 * Wires LandscapeAtmosphere/LandscapeTypography/SilkStrand to
 * createLandscapeTimeline via a pinned, scrubbed ScrollTrigger — the
 * same authoring pattern as ImperialGateScene.
 */
export function LandscapeScene() {
  const stageRef = useRef(null)
  const silkRef = useRef(null)
  const atmosphereRef = useRef({})
  const typeRef = useRef({})

  const reducedMotion = useReducedMotion()
  const breakpoint = useBreakpoint()
  const particleCount = reducedMotion ? 0 : PARTICLE_COUNT[breakpoint]

  useGsapContext(() => {
    const refs = {
      mountains: atmosphereRef.current.mountains,
      mist: atmosphereRef.current.mist,
      glow: atmosphereRef.current.glow,
      particles: atmosphereRef.current.particles,
      type: typeRef.current,
      silk: silkRef.current,
    }

    const tl = createLandscapeTimeline(refs, { reducedMotion })

    if (reducedMotion) {
      tl.play()
      return
    }

    createScrollScene({
      trigger: stageRef.current,
      start: 'top top',
      end: '+=260%',
      scrub: 1.2,
      pin: true,
      // pinSpacing:false + the .pinHost wrapper's explicit height below
      // — see the matching comment in ImperialGateScene.jsx for why
      // default pinSpacing would otherwise leave a dead, unpinned gap
      // between this scene and the one before it.
      pinSpacing: false,
      animation: tl,
    })
  }, { scope: stageRef, dependencies: [reducedMotion, particleCount] })

  return (
    <div className={styles.pinHost}>
      <SceneWrapper as="section" ref={stageRef} className={styles.stage}>
        <LandscapeAtmosphere elementsRef={atmosphereRef} />
        <AtmosphericParticles
          count={particleCount}
          elementsRef={atmosphereRef}
          color="rgb(216 199 161 / 60%)"
        />
        <SilkStrand ref={silkRef} />
        <LandscapeTypography elementsRef={typeRef} />
      </SceneWrapper>
    </div>
  )
}
