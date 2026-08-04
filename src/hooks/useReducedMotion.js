import { useSyncExternalStore } from 'react'
import { REDUCED_MOTION_QUERY } from '../animations/scroll/scrollConfig'

function subscribe(callback) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/**
 * Live-updating `prefers-reduced-motion` flag. Read this at the top of any
 * scene/hook that decides how much motion to run — do not hardcode motion
 * choices without checking it, per the project's accessibility baseline.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
