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
  const [showFullSize, setShowFullSize] = useState(!fullSize)
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
        onClick={fullSize ? handleClick : undefined}
        rel="noopener noreferrer"
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
          src={showFullSize && fullSize ? safeFullsize : safeThumbnail}
          width={width}
        />
      </a>
    </div>
  )
}

export default Thumbnail
