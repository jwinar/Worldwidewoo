import { Navigate, useParams } from 'react-router-dom'
import { getProjectBySlug } from '../data/projects'
import { ProjectEntryScene } from '../components/scenes/ProjectEntryScene'
import { useScrollReset } from '../hooks/useScrollReset'

export function ProjectDetail() {
  useScrollReset()
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return <ProjectEntryScene project={project} />
}
