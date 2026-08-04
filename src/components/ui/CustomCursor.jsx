import { useRef, useState } from 'react'
import { gsap } from '../../animations/core/gsap'
import { useGsapContext } from '../../animations/core/context'
import styles from './CustomCursor.module.css'

const COARSE_POINTER_QUERY = '(pointer: coarse)'

/**
 * Custom cursor foundation.
 *
 * States: 'default' | 'hover' | 'interactive' | 'drag' | 'disabled'.
 * Any element can opt in by setting `data-cursor="hover"` (and optionally
 * `data-cursor-label="VIEW"`); this component listens for those attributes
 * via event delegation rather than requiring every interactive component
 * to know about the cursor.
 *
 * Automatically disabled on coarse-pointer (touch) devices, where a
 * custom cursor has no meaning and would just be dead markup.
 */
export function CustomCursor() {
  const cursorRef = useRef(null)
  const [state, setState] = useState('default')
  const [label, setLabel] = useState('')
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(COARSE_POINTER_QUERY).matches,
  )

  useGsapContext(() => {
    if (isTouch) return

    const cursor = cursorRef.current
    if (!cursor) return

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3' })
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3' })

    const handleMove = (event) => {
      moveX(event.clientX)
      moveY(event.clientY)
    }

    const handleOver = (event) => {
      const target = event.target.closest('[data-cursor]')
      if (!target) return
      setState(target.dataset.cursor)
      setLabel(target.dataset.cursorLabel ?? '')
    }

    const handleOut = (event) => {
      const target = event.target.closest('[data-cursor]')
      if (!target) return
      setState('default')
      setLabel('')
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <div ref={cursorRef} className={styles.cursor} data-state={state} aria-hidden="true">
      <div className={styles.visual}>{label ? <span className={styles.label}>{label}</span> : null}</div>
    </div>
  )
}
