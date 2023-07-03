import { JSX } from 'preact'

import { NormalizedGalleryImage } from '../types/reddit-api/ThreadsResult.type'
import Thumbnail from './Thumbnail'

interface Props {
  items: NormalizedGalleryImage[]
  mediaLoading: 'lazy' | 'eager'
}

function Gallery({ items, mediaLoading }: Props): JSX.Element | null {
  if (!items.length) {
    return null
  }

  return (
    <div className="gallery">
      {items.map((thumbnail, thumbnailIndex) => (
        <Thumbnail
          fullSize={thumbnail.fullSize}
          height={thumbnail.height}
          key={thumbnail.thumbnail}
          loading={thumbnailIndex < 1 ? mediaLoading : 'lazy'}
          retina={thumbnail.retina}
          thumbnail={thumbnail.thumbnail}
          width={thumbnail.width}
        />
      ))}
    </div>
  )
}

export default Gallery
