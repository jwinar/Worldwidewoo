import { cn } from '../../utils/classNames'
import styles from './ProjectVisual.module.css'

/**
 * Renders a project's visual area for whichever media type it declares
 * (see the `ProjectVisual` type in data/projects.js). 'placeholder' is an
 * abstract accent-colored panel standing in for real imagery — used
 * until a project has an actual asset. 'canvas'/'webgl' aren't modeled
 * yet; add that case when a project actually needs one.
 */
export function ProjectVisual({ visual, accent, className }) {
  const style = accent ? { '--accent': accent } : undefined

  if (!visual || visual.type === 'placeholder') {
    return <div className={cn(styles.placeholder, className)} style={style} />
  }

  if (visual.type === 'image') {
    return <img className={cn(styles.image, className)} src={visual.src} alt="" loading="lazy" />
  }

  if (visual.type === 'video') {
    return (
      <video
        className={cn(styles.video, className)}
        src={visual.src}
        poster={visual.poster}
        autoPlay
        muted
        loop
        playsInline
      />
    )
  }

  return null
}
