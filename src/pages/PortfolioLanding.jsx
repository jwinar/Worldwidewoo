import { PortfolioHero } from '../components/scenes/PortfolioHero'
import { ProjectShowcase } from '../components/scenes/ProjectShowcase'
import { useScrollReset } from '../hooks/useScrollReset'
import { projects } from '../data/projects'

export function PortfolioLanding() {
  useScrollReset()

  return (
    <main>
      <PortfolioHero />
      <ProjectShowcase projects={projects} />
    </main>
  )
}
