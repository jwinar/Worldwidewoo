import { Navigate, useParams } from 'react-router-dom'
import { getProjectBySlug } from '../data/projects'
import { ProjectEntryScene } from '../components/scenes/ProjectEntryScene'
import { ProjectContinuation } from '../components/scenes/ProjectContinuation'
import { ImperialGateScene } from '../components/scenes/gate/ImperialGateScene'
import { SceneWrapper } from '../components/layout/SceneWrapper'
import { useScrollReset } from '../hooks/useScrollReset'
import styles from './ProjectDetail.module.css'

// Only china-history has a built experience so far; every other project
// falls back to the generic placeholder until it gets one of its own.
const CUSTOM_EXPERIENCE_SLUGS = new Set(['china-history'])

export function ProjectDetail() {
  useScrollReset()
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  if (CUSTOM_EXPERIENCE_SLUGS.has(project.slug)) {
    return (
      <>
        <ImperialGateScene />
        <SceneWrapper as="section" className={styles.closing}>
          <ProjectContinuation />
        </SceneWrapper>
      </>
    )
  }

  return <ProjectEntryScene project={project} />
}
