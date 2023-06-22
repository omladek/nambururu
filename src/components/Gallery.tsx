import { JSX } from 'preact'

import { RedditMediaMetadata } from '../types/reddit-api/ThreadsResult.type'
import getImageByContainerWidth from '../utilities/getImageByContainerWidth'
import Thumbnail from './Thumbnail'

interface ThumbnailImage {
  thumbnail: string
  fullSize: string
  height: number
  width: number
  retina: string
}

interface Props {
  items: RedditMediaMetadata
  containerWidth: number
  mediaLoading: 'lazy' | 'eager'
}

function Gallery({
  containerWidth,
  items,
  mediaLoading,
}: Props): JSX.Element | null {
  const thumbnails: ThumbnailImage[] = Object.keys(items).reduce(
    (acc: ThumbnailImage[], curr) => {
      const image = items[curr]

      if (image.status !== 'valid') {
        return acc
      }

      const fullSizeImage = image.s
      const responsizeImageStandard = getImageByContainerWidth(
        image.p,
        1,
        containerWidth,
      )

      const responsizeImageRetina = getImageByContainerWidth(
        image.p,
        2,
        containerWidth,
      )

      return [
        ...acc,
        {
          thumbnail: responsizeImageStandard.u,
          fullSize: fullSizeImage.u,
          retina: responsizeImageRetina.u,
          height: fullSizeImage.y,
          width: fullSizeImage.x,
        },
      ]
    },
    [],
  )

  if (!thumbnails.length) {
    return null
  }

  return (
    <div className="gallery">
      {thumbnails.map((thumbnail) => (
        <Thumbnail
          fullSize={thumbnail.fullSize}
          height={thumbnail.height}
          key={thumbnail.thumbnail}
          loading={mediaLoading}
          retina={thumbnail.retina}
          thumbnail={thumbnail.thumbnail}
          width={thumbnail.width}
        />
      ))}
    </div>
  )
}

export default Gallery
