import { useGSAP } from './gsap'

/**
 * The single entry point for creating GSAP animations inside React
 * components. It is a thin, intention-revealing wrapper around GSAP's
 * official `useGSAP` hook, which already solves the problems the rest
 * of the app must not reinvent:
 *
 *  - all tweens/timelines/ScrollTriggers created inside the callback are
 *    tracked in a `gsap.context()` and reverted automatically on unmount
 *  - safe under React 18 StrictMode's mount → unmount → remount cycle
 *  - `scope` lets you use plain selector strings ('.box') instead of refs,
 *    scoped to a container so they never collide with another scene
 *
 * Usage:
 *
 *   const container = useRef(null)
 *   useGsapContext(() => {
 *     gsap.to('.box', { x: 100 })
 *   }, { scope: container, dependencies: [someValue] })
 */
export const useGsapContext = useGSAP
