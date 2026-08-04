import { cn } from '../../../utils/classNames'
import styles from './LandscapeTypography.module.css'

/**
 * The scene's typographic arrival: a small marker, then the Chinese
 * character (behind, larger, its own depth) with the large English
 * statement in front of it, then a short editorial line. All elements
 * start hidden/collapsed via inline style — see REST_STYLE — and are
 * driven entirely by animations/transitions/landscape.js; this
 * component only lays them out and hands back refs via `elementsRef`.
 * Placeholder copy throughout, per the brief.
 */
export function LandscapeTypography({ elementsRef }) {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={(node) => (elementsRef.current.eyebrow = node)} className={cn('type-ui', styles.eyebrow)}>
        <span className={styles.eyebrowLine} />
        <span>PROJECT 01 — CHINA</span>
      </div>

      <span ref={(node) => (elementsRef.current.char = node)} className={cn('type-cn', styles.char)}>
        中
      </span>

      <div className={styles.lines}>
        <span ref={(node) => (elementsRef.current.lineOne = node)} className={cn('type-display', styles.line)}>
          5000 YEARS
        </span>
        <span ref={(node) => (elementsRef.current.lineTwo = node)} className={cn('type-display', styles.line)}>
          OF CIVILIZATION
        </span>
      </div>

      <p ref={(node) => (elementsRef.current.editorial = node)} className={cn('type-ui', styles.editorial)}>
        A JOURNEY THROUGH FIVE THOUSAND YEARS OF HISTORY, CULTURE AND CIVILIZATION.
      </p>
    </div>
  )
}
