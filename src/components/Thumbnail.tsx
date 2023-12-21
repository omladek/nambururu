import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import isOnWiFi from '../utilities/isOnWiFi'

interface Props {
  thumbnail: string
  fullSize?: string
  height: number
  width: number
  loading?: 'lazy' | 'eager'
  retina?: string
}

function Thumbnail({
  fullSize = '',
  height,
  loading = 'lazy',
  retina,
  thumbnail,
  width,
}: Props): JSX.Element {
  const [showFullSize, setShowFullSize] = useState(!fullSize)

  const srcSetSD = showFullSize && fullSize ? fullSize : thumbnail
  let srcSetHD = showFullSize && fullSize ? fullSize : retina

  if (!retina) {
    srcSetHD = ''
  } else if (isOnWiFi()) {
    srcSetHD = `, ${srcSetHD} 2x`
  } else {
    srcSetHD = ''
  }

  const handleClick: JSX.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!showFullSize) {
      event.preventDefault()

      setShowFullSize((prev) => !prev)
    }
  }

  return (
    <div className="thumbnail-wrap">
      <a
        className="thumbnail__link"
        href={fullSize || thumbnail}
        onClick={fullSize ? handleClick : undefined}
        rel="noopener noreferrer"
        style={{
          '--ar-width': width,
          '--ar-height': height,
        }}
        target="_blank"
      >
        {fullSize && (
          <span className="thumbnail__hd">{showFullSize ? 'HD' : 'SD'}</span>
        )}
        <img
          alt=""
          className="thumbnail"
          decoding="async"
          height={height}
          loading={loading}
          srcSet={`${srcSetSD} 1x${srcSetHD}`}
          width={width}
        />
      </a>
    </div>
  )
}

export default Thumbnail
