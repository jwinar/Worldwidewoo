import { ProjectPanel } from './ProjectPanel'
import styles from './ProjectShowcase.module.css'

/** Renders the data-driven project list as a stack of full-viewport panels. */
export function ProjectShowcase({ projects }) {
  return (
    <section className={styles.showcase}>
      {projects.map((project, index) => (
        <ProjectPanel key={project.id} project={project} index={index} total={projects.length} />
      ))}
    </section>
  )
}
