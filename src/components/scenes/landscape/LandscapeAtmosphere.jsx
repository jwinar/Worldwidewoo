import { useRef } from 'react'
import { gsap } from '../../../animations/core/gsap'
import { useGsapContext } from '../../../animations/core/context'
import { mountainLayers, mistLayers } from '../../../data/landscapeLayers'
import styles from './LandscapeAtmosphere.module.css'

// A single small tiered-roof silhouette on the midground ridge — "distant
// architecture" per the brief, kept as one compositional accent rather
// than a scattered decoration. Positioned within the mid layer's own SVG
// so it always shares that layer's fill color and parallax.
const PAGODA_PATH =
  'M182,120 L198,120 L198,108 L188,108 L188,100 L192,100 L190,92 L188,100 L186,92 L184,100 L188,100 L188,108 L182,108 Z'

// Rest-state (0% scroll) opacities — deliberately not 0 for near/mid
// mountains and the low mist/glow, so the scene's first frame continues
// the gate's own ending state rather than starting from a blank slate.
const REST_OPACITY = {
  mountains: { far: 0, mid: 0.4, near: 0.85 },
  mist: { low: 0.5, mid: 0.15, high: 0 },
  glow: 0.35,
}

/**
 * The environment beyond the gate: three parallax mountain layers
 * (shanshui-inspired — soft distant hills through to a tall, dramatic
 * near ridge), layered drifting mist, and a glow that continues the
 * gate's warmth before the palette evolves. Mountain fill colors and
 * mist/glow opacity are scroll-driven (via `elementsRef`, populated here
 * and animated externally by animations/transitions/landscape.js); mist
 * layers additionally own a slow, continuous idle drift independent of
 * scroll, registered once here.
 */
export function LandscapeAtmosphere({ elementsRef }) {
  const rootRef = useRef(null)

  useGsapContext(() => {
    mistLayers.forEach((layer) => {
      const el = rootRef.current.querySelector(`[data-mist="${layer.id}"] > div`)
      if (!el) return
      gsap.to(el, {
        xPercent: layer.id === 'low' ? -6 : 6,
        duration: layer.driftDuration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
  }, { scope: rootRef })

  return (
    <div ref={rootRef} aria-hidden="true">
      {mountainLayers.map((layer) => (
        <div
          key={layer.id}
          ref={(node) => {
            elementsRef.current.mountains = elementsRef.current.mountains || {}
            elementsRef.current.mountains[layer.id] = node
          }}
          className={styles.mountain}
          // The near/mid layers continue visually from the gate's own
          // ending mountain silhouette (opacity ~0.9) — only the far
          // layer, which the gate never revealed, starts hidden and
          // fades in as "the first new mountains appear."
          style={{ opacity: REST_OPACITY.mountains[layer.id] }}
        >
          <svg className={styles.mountainSvg} viewBox="0 0 400 200" preserveAspectRatio="none">
            <polygon points={layer.points} fill={layer.fill} />
            {layer.id === 'mid' ? <path className={styles.pagoda} d={PAGODA_PATH} fill={layer.fill} /> : null}
          </svg>
        </div>
      ))}

      {mistLayers.map((layer) => (
        <div
          key={layer.id}
          data-mist={layer.id}
          ref={(node) => {
            elementsRef.current.mist = elementsRef.current.mist || {}
            elementsRef.current.mist[layer.id] = node
          }}
          className={styles.mist}
          style={{ top: `${layer.top}%`, height: `${layer.height}%`, opacity: REST_OPACITY.mist[layer.id] }}
        >
          <div className={styles.mistInner} />
        </div>
      ))}

      <div
        ref={(node) => (elementsRef.current.glow = node)}
        className={styles.glow}
        style={{ opacity: REST_OPACITY.glow }}
      />
    </div>
  )
}
