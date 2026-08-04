/**
 * Structured description of the landscape's depth layers — colors,
 * silhouette geometry, and parallax weight — kept separate from the
 * components that render them so the placeholder SVG silhouettes here
 * can later be swapped for real artwork without touching animation
 * code. Each mountain layer's `fill`/`fillEvolved` are animated by
 * animations/transitions/landscape.js as a direct SVG fill-color tween
 * (no gradient interpolation needed) to carry the scene from the gate's
 * imperial red/gold toward the landscape's charcoal/parchment palette.
 *
 * `parallax` is a relative speed multiplier: 1 = moves with the camera
 * push baseline, <1 = slower/farther, >1 = faster/nearer.
 *
 * @typedef {Object} MountainLayer
 * @property {string} id
 * @property {string} points - SVG polygon points, viewBox "0 0 400 200"
 * @property {string} fill - starting color (continues the gate's palette)
 * @property {string} fillEvolved - color the layer settles into
 * @property {number} parallax
 * @property {number} opacity - target opacity once fully revealed
 */

/** @type {MountainLayer[]} */
export const mountainLayers = [
  {
    id: 'far',
    points: '0,200 0,140 40,120 90,135 150,110 210,130 270,105 330,125 400,115 400,200',
    fill: '#241412',
    fillEvolved: '#3d3d42',
    parallax: 0.35,
    opacity: 0.75,
  },
  {
    id: 'mid',
    points: '0,200 0,110 50,70 100,95 160,55 220,90 280,50 340,85 400,70 400,200',
    fill: '#2e1210',
    fillEvolved: '#3a3428',
    parallax: 0.65,
    opacity: 0.88,
  },
  {
    id: 'near',
    points: '0,200 0,90 40,40 80,75 130,20 180,65 240,15 300,60 350,25 400,55 400,200',
    fill: '#1a0d0a',
    fillEvolved: '#201d1a',
    parallax: 1,
    opacity: 1,
  },
]

/**
 * @typedef {Object} MistLayer
 * @property {string} id
 * @property {number} top - % from top of stage
 * @property {number} height - % of stage height
 * @property {number} parallax
 * @property {number} driftDuration - seconds for one idle drift cycle
 */

/** @type {MistLayer[]} */
export const mistLayers = [
  { id: 'low', top: 55, height: 40, parallax: 1.1, driftDuration: 34 },
  { id: 'mid', top: 30, height: 35, parallax: 0.7, driftDuration: 46 },
  { id: 'high', top: 8, height: 30, parallax: 0.4, driftDuration: 58 },
]
