import styles from './GateAtmosphere.module.css'

/**
 * Everything revealed behind the doors as they open: a warm glow at the
 * threshold, a distant mountain silhouette (two depth layers), and slow
 * drifting mist. All layers start at opacity 0 — the gate-opening
 * timeline (animations/transitions/gate.js) owns when they appear.
 *
 * `elementsRef` is a plain mutable ref object the parent scene creates;
 * this component populates it with the DOM nodes the timeline needs to
 * target (`.glow`, `.mountains`, `.mist`), rather than exposing an
 * imperative handle for what's fundamentally a flat list of animation
 * targets.
 */
export function GateAtmosphere({ elementsRef }) {
  return (
    <div aria-hidden="true">
      <div ref={(node) => (elementsRef.current.mountains = node)} className={styles.mountains}>
        <svg className={styles.mountainFar} viewBox="0 0 400 100" preserveAspectRatio="none">
          <polygon
            points="0,100 0,62 42,36 82,56 128,22 182,52 232,30 282,58 332,26 400,52 400,100"
            fill="#241412"
          />
        </svg>
        <svg className={styles.mountainNear} viewBox="0 0 400 100" preserveAspectRatio="none">
          <polygon
            points="0,100 0,78 55,50 100,70 150,42 205,68 255,46 310,72 360,50 400,66 400,100"
            fill="#140b09"
          />
        </svg>
      </div>
      <div ref={(node) => (elementsRef.current.mist = node)} className={styles.mist} />
      <div ref={(node) => (elementsRef.current.glow = node)} className={styles.glow} />
    </div>
  )
}
