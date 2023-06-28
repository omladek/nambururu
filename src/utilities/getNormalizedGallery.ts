import settings from '../constants/settings'
import {
  ChildData,
  NormalizedGallery,
  NormalizedGalleryImage,
} from '../types/reddit-api/ThreadsResult.type'
import getImageByContainerWidth from './getImageByContainerWidth'

export default (post: ChildData): NormalizedGallery | null => {
  const { is_gallery, media_metadata } = post

  const hasGallery = is_gallery && media_metadata

  if (hasGallery) {
    const items: NormalizedGalleryImage[] = Object.keys(media_metadata).reduce(
      (acc: NormalizedGalleryImage[], curr) => {
        const image = media_metadata[curr]

        if (image.status !== 'valid') {
          return acc
        }

        const fullSizeImage = image.s
        const responsizeImageStandard = getImageByContainerWidth(
          image.p,
          1,
          settings.IMAGE_CONTAINER_WIDTH,
        )

        const responsizeImageRetina = getImageByContainerWidth(
          image.p,
          2,
          settings.IMAGE_CONTAINER_WIDTH,
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

    return {
      type: 'gallery',
      items,
    }
  }
  return null
}
