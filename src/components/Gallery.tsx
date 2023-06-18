import { useElementSize } from 'usehooks-ts'

import { RedditMediaMetadata } from '../types/reddit-api/ThreadsResult.type'
import getImageByContainerWidth from '../utilities/getImageByContainerWidth'
import Thumbnail from './Thumbnail'

interface ThumbnailImage {
  thumbnail: string
  fullSize: string
  height: number
  width: number
}

interface Props {
  items: RedditMediaMetadata
}

function Gallery({ items }: Props): JSX.Element {
  const [squareRef, { width: containerWidth }] = useElementSize()

  const thumbnails: ThumbnailImage[] = Object.keys(items).reduce(
    (acc: ThumbnailImage[], curr) => {
      const image = items[curr]
      const fullSizeImage = image.s
      const responsizeImageStandard = getImageByContainerWidth(
        image.p,
        1,
        containerWidth,
      )

      return [
        ...acc,
        {
          thumbnail: responsizeImageStandard.u,
          fullSize: fullSizeImage.u,
          height: fullSizeImage.y,
          width: fullSizeImage.x,
        },
      ]
    },
    [],
  )

  if (!thumbnails.length) {
    return <> </>
  }

  return (
    <div className="gallery" ref={squareRef}>
      {thumbnails.map((thumbnail) => (
        <Thumbnail
          fullSize={thumbnail.fullSize}
          height={thumbnail.height}
          key={thumbnail.thumbnail}
          thumbnail={thumbnail.thumbnail}
          width={thumbnail.width}
        />
      ))}
    </div>
  )
}

export default Gallery
