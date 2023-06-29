import settings from '../constants/settings'
import {
  ChildData,
  NormalizedPreviewImage,
} from '../types/reddit-api/ThreadsResult.type'
import getImageByContainerWidth from './getImageByContainerWidth'

export default function getNormalizedPreviewImage(
  post: ChildData,
): NormalizedPreviewImage | null {
  const { preview } = post

  if (preview && preview?.images?.length) {
    const image = getImageByContainerWidth(
      preview.images[0].resolutions.map(({ height, url, width }) => ({
        u: url,
        x: width,
        y: height,
      })),
      1,
      settings.IMAGE_CONTAINER_WIDTH,
    )

    return {
      type: 'previewImage',
      width: image.x,
      height: image.y,
      url: image.u,
    }
  }

  return null
}
