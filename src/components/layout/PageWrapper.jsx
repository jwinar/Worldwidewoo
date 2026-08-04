import { useState } from 'react'
import { SmoothScrollProvider } from './SmoothScrollProvider'
import { Navigation } from './Navigation'
import { MenuOverlay } from './MenuOverlay'
import { CustomCursor } from '../ui/CustomCursor'
import { DebugOverlay } from '../ui/DebugOverlay'

/**
 * The single root of the experience. Owns the things that must exist
 * exactly once for the whole app: the smooth-scroll driver, navigation
 * chrome, the full-screen menu, and the custom cursor. Individual scenes
 * should never instantiate any of these themselves.
 */
export function PageWrapper({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <SmoothScrollProvider>
      <div className="page">
        <CustomCursor />
        <Navigation menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
        {children}
        {import.meta.env.DEV ? <DebugOverlay /> : null}
      </div>
    </SmoothScrollProvider>
  )
}
