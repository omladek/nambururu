import { JSX } from 'preact'

interface Props {
  size?: 'xs' | 'md' | 'lg'
}

function Loader({ size = 'lg' }: Props): JSX.Element {
  return <div className={`loader loader--${size}`}>loading&hellip;</div>
}

export default Loader
