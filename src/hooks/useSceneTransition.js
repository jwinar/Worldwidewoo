import { useContext } from 'react'
import { SceneTransitionCtx } from '../components/layout/SceneTransitionContext'

/** Returns `enterProject(project, originEl)` — call it from a project's click handler. */
export function useSceneTransition() {
  const ctx = useContext(SceneTransitionCtx)
  if (!ctx) {
    throw new Error('useSceneTransition must be used within SceneTransitionProvider')
  }
  return ctx
}
