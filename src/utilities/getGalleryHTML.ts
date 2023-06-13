import { RedditMediaMetadata } from '../types/reddit-api/ThreadsResult.type'
import getImageByContainerWidth from './getImageByContainerWidth'
import getThumbnailHTML from './getThumbnailHTML'

const getGalleryHTML = (
  galleryItems: RedditMediaMetadata | null,
  postSizer: HTMLDivElement,
): string => {
  if (!galleryItems) {
    return ''
  }

  const html = Object.keys(galleryItems).reduce((acc, curr) => {
    const image = galleryItems[curr]
    const fullSizeImage = image.s
    const responsizeImageStandard = getImageByContainerWidth(
      image.p,
      1,
      postSizer,
    )
    const responsizeImageRetina = getImageByContainerWidth(
      image.p,
      2,
      postSizer,
    )

    return (
      acc +
      getThumbnailHTML({
        thumbnail: responsizeImageStandard.u,
        thumbnailRetina: responsizeImageRetina.u,
        fullSize: fullSizeImage.u,
        height: fullSizeImage.y,
        width: fullSizeImage.x,
        loading: 'lazy',
      })
    )
  }, '')

  return html
}

export default getGalleryHTML
