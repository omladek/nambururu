import { RedditMediaMetadata } from '../types/reddit-api/ThreadsResult.type'
import getImageByContainerWidth from '../utilities/getImageByContainerWidth'
import Thumbnail from './Thumbnail'

interface ThumbnailImage {
  thumbnail: string
  thumbnailRetina: string
  fullSize: string
  height: number
  width: number
}

interface Props {
  containerWidth: number
  items: RedditMediaMetadata
}

const Gallery = ({ items, containerWidth }: Props): JSX.Element => {
  const thumbnails: ThumbnailImage[] = Object.keys(items).reduce(
    (acc: ThumbnailImage[], curr) => {
      const image = items[curr]
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
          thumbnailRetina: responsizeImageRetina.u,
          fullSize: fullSizeImage.u,
          height: fullSizeImage.y,
          width: fullSizeImage.x,
        },
      ]
    },
    [],
  )

  if (!thumbnails.length) {
    return <></>
  }

  return (
    <>
      {thumbnails.map((thumbnail) => (
        <Thumbnail {...thumbnail} key={thumbnail.thumbnail} />
      ))}
    </>
  )
}

export default Gallery
