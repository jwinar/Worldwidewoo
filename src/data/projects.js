/**
 * Structured, presentation-agnostic project data. Every project-facing
 * component (showcase panel, detail page, navigation index) reads from
 * this list rather than hardcoding project content, so adding Project 02
 * later means adding an entry here, not touching component code.
 *
 * @typedef {Object} ProjectVisual
 * @property {'placeholder'|'image'|'video'} type - 'placeholder' renders
 *   an abstract textured panel in the project's accent color when no real
 *   asset exists yet. 'canvas'/'webgl' scenes are intentionally not
 *   modeled yet — a future project can extend this union once a real
 *   interactive/WebGL visual exists to design the contract around.
 * @property {string} [src] - image/video source
 * @property {string} [poster] - video poster frame
 *
 * @typedef {Object} Project
 * @property {string} id - stable identifier
 * @property {string} slug - URL segment, e.g. 'china-history' -> /projects/china-history
 * @property {string} title - display title, e.g. 'CHINA / 5000 YEARS'
 * @property {string} category - e.g. 'INTERACTIVE EXPERIENCE'
 * @property {string} year
 * @property {string} accent - CSS color for this project's entry-transition panel
 * @property {ProjectVisual} visual
 *
 * @type {Project[]}
 */
export const projects = [
  {
    id: 'china-history',
    slug: 'china-history',
    title: 'CHINA / 5000 YEARS',
    category: 'INTERACTIVE EXPERIENCE',
    year: '2026',
    accent: 'var(--color-red-dark)',
    visual: { type: 'placeholder' },
  },
]

/** Route path for a project, e.g. '/projects/china-history'. */
export function projectPath(project) {
  return `/projects/${project.slug}`
}

/** Looks up a project by its URL slug (the :slug route param, no prefix). */
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
