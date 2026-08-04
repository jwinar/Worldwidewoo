/** Joins truthy class name fragments, skipping falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
