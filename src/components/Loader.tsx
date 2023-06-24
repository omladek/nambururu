import { JSX } from 'preact'

interface Props {
  size?: 'xs' | 'md' | 'lg'
  isFullScreen?: boolean
}

function Loader({ isFullScreen, size = 'lg' }: Props): JSX.Element {
  const classNames = [
    'loader',
    `loader--${size}`,
    isFullScreen && 'loader--fullscreen',
  ]
    .filter(Boolean)
    .join(' ')

  return <span className={classNames}>loading&hellip;</span>
}

export default Loader
