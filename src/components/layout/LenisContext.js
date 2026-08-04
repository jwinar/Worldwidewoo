import { createContext } from 'react'

/** Ref to the live Lenis instance (`.current` is `null` under reduced motion). */
export const LenisRefContext = createContext(null)
