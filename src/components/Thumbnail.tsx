import { JSX } from 'preact'
import { useState } from 'preact/hooks'

import deescapeHtml from '../utilities/deescapeHtml'

interface Props {
  thumbnail: string
  fullSize?: string
  height: number
  width: number
  loading?: 'lazy' | 'eager'
}

function Thumbnail({
  fullSize = '',
  height,
  loading = 'lazy',
  thumbnail,
  width,
}: Props): JSX.Element {
  const [showFullSize, setShowFullSize] = useState(false)
  const safeThumbnail = deescapeHtml(thumbnail)
  const safeFullsize = deescapeHtml(fullSize || '') || safeThumbnail

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
        href={safeFullsize}
        onClick={handleClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt=""
          className="thumbnail"
          decoding="async"
          height={height}
          loading={loading}
          src={showFullSize ? safeFullsize : safeThumbnail}
          width={width}
        />
      </a>
    </div>
  )
}

export default Thumbnail
