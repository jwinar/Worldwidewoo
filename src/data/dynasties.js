/**
 * Structured data contract for historical periods, kept separate from
 * presentation so Phase 1+ scenes can be generated from this list rather
 * than hardcoded per-dynasty JSX. Intentionally empty in Phase 0 — the
 * timeline itself is out of scope here.
 *
 * @typedef {Object} Dynasty
 * @property {string} id - slug, e.g. 'qin'
 * @property {string} nameCn - display Chinese name, e.g. '秦'
 * @property {string} nameEn - display English name, e.g. 'QIN'
 * @property {string} years - e.g. '221 BC — 206 BC'
 * @property {string} epithet - e.g. 'THE FIRST EMPIRE'
 * @property {string[]} motifs - visual motifs for that era's scene
 *
 * @type {Dynasty[]}
 */
export const dynasties = []
