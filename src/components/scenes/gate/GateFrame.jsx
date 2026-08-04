import styles from './GateFrame.module.css'

/**
 * The static architrave the doors hang within: side posts with a thin
 * gold inlay, and a top lintel with a restrained upturned eave accent at
 * each outer corner. Doesn't move with the doors — it's the fixed
 * architecture the moving parts open inside of.
 */
export function GateFrame() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <div className={`${styles.post} ${styles.postLeft}`} />
      <div className={`${styles.post} ${styles.postRight}`} />
      <div className={styles.lintel}>
        <svg className={`${styles.eave} ${styles.eaveLeft}`} viewBox="0 0 84 44" preserveAspectRatio="none">
          <path d="M0,0 L84,8 C58,10 26,24 6,32 C1,22 0,10 0,0 Z" />
        </svg>
        <svg className={`${styles.eave} ${styles.eaveRight}`} viewBox="0 0 84 44" preserveAspectRatio="none">
          <path d="M0,0 L84,8 C58,10 26,24 6,32 C1,22 0,10 0,0 Z" />
        </svg>
      </div>
      <div className={styles.threshold} />
    </div>
  )
}
