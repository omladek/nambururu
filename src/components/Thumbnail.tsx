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
  const safeThumbnail = deescapeHtml(thumbnail)
  const safeFullsize = deescapeHtml(fullSize || '') || safeThumbnail

  return (
    <div className="thumbnail-wrap">
      <a
        className="thumbnail__link"
        href={safeFullsize}
        rel="noopener noreferrer"
        target="_blank"
      >
        <picture>
          <source media="(max-width: 40em)" srcSet={safeFullsize} />
          <img
            alt=""
            className="thumbnail"
            decoding="async"
            height={height}
            loading={loading}
            src={safeThumbnail}
            width={width}
          />
        </picture>
      </a>
    </div>
  )
}

export default Thumbnail
