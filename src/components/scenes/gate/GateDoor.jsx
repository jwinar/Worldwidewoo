import { forwardRef } from 'react'
import { cn } from '../../../utils/classNames'
import styles from './GateDoor.module.css'

function DoorRing() {
  return (
    <svg className={styles.ring} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="14" r="6.5" fill="var(--color-bronze)" stroke="var(--color-bronze-dark)" strokeWidth="1" />
      <path
        d="M14 20 C14 30 16 34 22 38 C28 34 30 30 30 20"
        stroke="var(--color-bronze-dark)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 19 C14 29 16 33 22 37 C28 33 30 29 30 19"
        stroke="var(--color-bronze)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/** A single restrained cloud-scroll corner accent — one curl, not a repeating motif. */
function CornerMotif({ position }) {
  return (
    <svg
      className={cn(styles.corner, styles[position])}
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 30 C4 18 8 10 20 8"
        stroke="var(--color-gold-muted)"
        strokeWidth="1.25"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="21" cy="7" r="2" fill="var(--color-gold-muted)" />
    </svg>
  )
}

/**
 * One gate door leaf. `side` controls hinge/edge geometry: it hinges on
 * its outer edge (left door hinges left, right door hinges right) and
 * carries a thin `.edge` face rotated into the Z axis so the door reads
 * as having physical thickness once it swings open — not a flat panel.
 * `ref` is the element GSAP applies `rotateY` to.
 */
export const GateDoor = forwardRef(function GateDoor({ side }, ref) {
  return (
    <div ref={ref} className={cn(styles.door, styles[side])}>
      <div className={styles.face}>
        <CornerMotif position="tl" />
        <CornerMotif position="tr" />
        <CornerMotif position="bl" />
        <CornerMotif position="br" />
        <DoorRing />
      </div>
      <div className={styles.edge} />
    </div>
  )
})
