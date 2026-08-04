import { Link, useLocation } from 'react-router-dom'
import { projects, projectPath } from '../../data/projects'
import { cn } from '../../utils/classNames'
import styles from './Navigation.module.css'

/**
 * Minimal, always-present navigation chrome: brand/home link (top-left),
 * menu toggle (top-right), and — only on a project detail page, where it
 * adds positional context a panel itself can't — a "0X / 0Y" indicator
 * (bottom). On the landing page each project panel already carries its
 * own index, so showing this too would be redundant and would collide
 * with the panel's own bottom-center "SCROLL TO EXPLORE" cue. Deliberately
 * not a conventional navbar — see CREATIVE_BRIEF.md section 14.
 */
export function Navigation({ menuOpen, onToggleMenu }) {
  const location = useLocation()
  const activeIndex = projects.findIndex((project) => location.pathname === projectPath(project))

  return (
    <>
      <header className={styles.nav}>
        <Link
          to="/"
          className={cn('type-ui', styles.brand)}
          data-cursor="link"
          data-cursor-label="HOME"
        >
          PORTFOLIO
        </Link>
        <button
          type="button"
          className={cn('type-ui', styles.menuButton)}
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          data-cursor="menu"
          data-cursor-label={menuOpen ? 'CLOSE' : 'MENU'}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </header>
      {activeIndex >= 0 ? (
        <div className={cn('type-ui', styles.indicator)}>
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </div>
      ) : null}
    </>
  )
}
