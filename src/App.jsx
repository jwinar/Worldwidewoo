import { Routes, Route } from 'react-router-dom'
import { PageWrapper } from './components/layout/PageWrapper'
import { SceneTransitionProvider } from './components/layout/SceneTransitionProvider'
import { PortfolioLanding } from './pages/PortfolioLanding'
import { ProjectDetail } from './pages/ProjectDetail'

function App() {
  return (
    <PageWrapper>
      <SceneTransitionProvider>
        <Routes>
          <Route path="/" element={<PortfolioLanding />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </SceneTransitionProvider>
    </PageWrapper>
  )
}

export default App
