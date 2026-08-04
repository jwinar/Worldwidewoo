import { useBreakpoint } from '../../hooks/useBreakpoint'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './DebugOverlay.module.css'

const MARKERS_KEY = 'gates:debug:scrollMarkers'

/**
 * Dev-only HUD for the things that are otherwise invisible while working
 * on scroll/animation code: current breakpoint, reduced-motion state, and
 * a toggle for ScrollTrigger markers. Rendered only when import.meta.env.DEV
 * is true (see PageWrapper) — never shipped to production.
 */
export function DebugOverlay() {
  const breakpoint = useBreakpoint()
  const reducedMotion = useReducedMotion()
  const markersEnabled = localStorage.getItem(MARKERS_KEY) === 'true'

  const toggleMarkers = () => {
    localStorage.setItem(MARKERS_KEY, String(!markersEnabled))
    window.location.reload()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.row}>
        <span>breakpoint</span>
        <span className={styles.value}>{breakpoint}</span>
      </div>
      <div className={styles.row}>
        <span>reduced motion</span>
        <span className={styles.value}>{String(reducedMotion)}</span>
      </div>
      <div className={styles.row}>
        <span>ScrollTrigger markers</span>
        <span className={styles.value}>{String(markersEnabled)}</span>
      </div>
      <button type="button" className={styles.button} onClick={toggleMarkers}>
        toggle markers (reload)
      </button>
    </div>
  )
}
