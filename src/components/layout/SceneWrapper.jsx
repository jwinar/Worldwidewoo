import { forwardRef } from 'react'
import { cn } from '../../utils/classNames'
import styles from './SceneWrapper.module.css'

/**
 * Base container every full-viewport scene should render into. Keeps
 * sizing/positioning concerns (min-height, overflow) out of individual
 * scenes so they only need to worry about their own content and
 * animation. `ref` is forwarded so scenes can hand it straight to
 * ScrollTrigger as the `trigger`/`pin` target.
 */
export const SceneWrapper = forwardRef(function SceneWrapper(
  { as: Tag = 'section', className = '', children, ...rest },
  ref,
) {
  return (
    <Tag ref={ref} className={cn(styles.scene, className)} {...rest}>
      {children}
    </Tag>
  )
})
