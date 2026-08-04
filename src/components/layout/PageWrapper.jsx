import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { CustomCursor } from '../ui/CustomCursor'
import { DebugOverlay } from '../ui/DebugOverlay'

/**
 * The single root of the experience. Owns the things that must exist
 * exactly once for the whole app: the smooth-scroll driver and the
 * custom cursor. Individual scenes should never instantiate either of
 * these themselves.
 */
export function PageWrapper({ children }) {
  useSmoothScroll()

  return (
    <div className="page">
      <CustomCursor />
      {children}
      {import.meta.env.DEV ? <DebugOverlay /> : null}
    </div>
  )
}
