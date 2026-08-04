import { useState } from 'react'

const COARSE_POINTER_QUERY = '(pointer: coarse)'

/**
 * One-time (non-reactive) touch/coarse-pointer check, read once at mount.
 * Used to skip hover-only interactions (custom cursor, project parallax)
 * on touch devices rather than reacting live to pointer-type changes
 * mid-session, which no supported device does in practice.
 */
export function useIsCoarsePointer() {
  const [isCoarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(COARSE_POINTER_QUERY).matches,
  )
  return isCoarse
}
