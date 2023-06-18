import { useState } from 'preact/hooks'
import { JSX } from 'preact'
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
  const [isHD, setIsHD] = useState(false)
  const safeThumbnail = deescapeHtml(thumbnail)
  const safeFullsize = deescapeHtml(fullSize || '')

  return (
    <div className="thumbnail-wrap">
      {!isHD && fullSize ? (
        <button
          className="thumbnail__hd"
          onClick={() => setIsHD((prev) => !prev)}
          type="button"
        >
          HD
        </button>
      ) : null}

      <a href={safeFullsize} rel="noopener noreferrer" target="_blank">
        <img
          alt=""
          className="thumbnail"
          decoding="async"
          height={height}
          loading={loading}
          src={isHD ? safeFullsize : safeThumbnail}
          style={{
            '--ar-width': width,
            '--ar-height': height,
          }}
          width={width}
        />
      </a>
    </div>
  )
}

export default Thumbnail
